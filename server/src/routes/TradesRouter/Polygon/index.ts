import fs from 'fs';
import cron from 'node-cron';
import { StatusCodes } from 'http-status-codes';
import { knex } from 'knex';
import { getPrivatePath } from '@shared/utils/GetPrivatePath';
import { getKnexConfig } from '@shared/utils/GetKnexConfig';
import { Request, Response } from 'express';
import Router from 'express-promise-router';
import Axios, { AxiosError } from 'axios';
import moment from 'moment';
import logger from '@shared/components/Logger';
import type { TradesConfig } from '../shared/types';
import type {
  PolygonDailyOpenClose,
  DBPolygonDailyOpenCloseModel,
  BackfillDateProps,
  StoreInDatabaseProps,
} from './types';
import {
  SPY_SYMBOL,
  POLYGON_API_URL,
  POLYGON_API_MAX_REQUESTS_PER_MINUTE,
  BACKFILL_START_DATE,
  POLYGON_API_DATE_FORMAT,
  UTC_TIMEZONE,
  NEW_YORK_TIMEZONE,
} from './constants';
import {
  createNoDataDailyOpenClose,
  createDBModelFromPolygonDailyOpenClose,
  createMarketDailyOpenCloseEntryFromDBModel,
} from './utils';

const router = Router();
const config = JSON.parse(fs.readFileSync(`${getPrivatePath()}/trades/config.json`).toString()) as TradesConfig;
const { OK, NOT_FOUND, BAD_REQUEST } = StatusCodes;
const knexConfig = getKnexConfig();

cron
  //TODO: Remove lint error
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .schedule('45 */1 * * *', async () => {
    logger.info('Starting syncSpyDailyOpenClose Cron Job');
    await syncSpyDailyOpenClose();
    logger.info('Finsihed syncSpyDailyOpenClose Cron Job');
  })
  .start();

export const syncSpyDailyOpenClose = async (): Promise<void> => {
  // Check to see which days need to be backfilled from database
  const knexInstance = knex(knexConfig);
  const tradesPolygonDailyopenclose = await knexInstance<DBPolygonDailyOpenCloseModel>(
    'trades_polygon_dailyopenclose'
  ).select('from_date');

  const tradesPolygonDailyopencloseArray = tradesPolygonDailyopenclose.map(
    (entry) => moment.tz(entry.from_date, UTC_TIMEZONE).tz(NEW_YORK_TIMEZONE).format(POLYGON_API_DATE_FORMAT) // UTC to NY format
  );

  const requiredDataDateRange = getRequiredDataDateRange();
  const datesToBackFill = requiredDataDateRange.filter((date) => !tradesPolygonDailyopencloseArray.includes(date));

  if (datesToBackFill.length === 0) {
    logger.info('syncSpyDailyOpenClose: No outstanding dates to backfill.');
    return;
  }

  // Backfill date
  for (const date of datesToBackFill) {
    await backfillDate({ date });
    // Delay between requsts to conform to rate limiting
    await new Promise((resolve) => setTimeout(resolve, 60000 / POLYGON_API_MAX_REQUESTS_PER_MINUTE));
  }
};

const getRequiredDataDateRange = () => {
  const dateArray = [];
  let currentDate = moment(BACKFILL_START_DATE);
  const endDate = moment.tz(NEW_YORK_TIMEZONE).subtract(1, 'day').endOf('day'); // We want to backfill upto the last completed day
  while (currentDate <= endDate) {
    dateArray.push(moment(currentDate).tz(NEW_YORK_TIMEZONE).format(POLYGON_API_DATE_FORMAT)); // UTC to NY format
    currentDate = moment(currentDate).add(1, 'days');
  }
  return dateArray;
};

const backfillDate = async ({ date }: BackfillDateProps) => {
  const endpointUrl = `${POLYGON_API_URL}/open-close/${SPY_SYMBOL}/${date}?adjusted=true&apiKey=${config.polygonApiKey}`;
  await Axios.get(endpointUrl)
    .then(async (response) => {
      if (response.status === OK) {
        const polygonDailyOpenClose = response.data as PolygonDailyOpenClose;
        if (polygonDailyOpenClose.status === 'OK') {
          const polygonDailyOpenCloseModel = createDBModelFromPolygonDailyOpenClose({ polygonDailyOpenClose, date });
          await storeInDatabase({ polygonDailyOpenCloseModel });
        } else {
          logger.err(
            `backfillDate: Received ${OK} status code but 'status' field was not 'OK'. Received: ${JSON.stringify(
              polygonDailyOpenClose
            )}`
          );
        }
      } else {
        logger.err(`backfillDate: Received non ${OK} status code. Received: ${response.status}.`);
      }
    })
    .catch(async (error: AxiosError) => {
      const response = error.response;

      if (!response) {
        logger.err(`backfillDate: Received unsuccessful status code with no response body.`);
        logger.err(error.message);
        return;
      }

      // NOT_FOUND is actually a successful result for us
      if (response.status === NOT_FOUND) {
        const polygonDailyOpenClose = response.data as PolygonDailyOpenClose;
        if (polygonDailyOpenClose.status === 'NOT_FOUND') {
          if (polygonDailyOpenClose.message === 'Data not found.') {
            // No date found. Likely a weekend or trading holiday
            // We will persist this as a day with no data
            const noDataDailyOpenClose = createNoDataDailyOpenClose({ date });
            await storeInDatabase({ polygonDailyOpenCloseModel: noDataDailyOpenClose });
          } else {
            logger.err(
              `backfillDate: Unexpected message for status 'NOT_FOUND'. Received: ${JSON.stringify(
                polygonDailyOpenClose
              )}`
            );
          }
        } else {
          logger.err(
            `backfillDate: Received ${NOT_FOUND} status code but 'status' field was not 'NOT_FOUND'. Received: ${JSON.stringify(
              polygonDailyOpenClose
            )}`
          );
        }
      } else if (response.status === BAD_REQUEST) {
        logger.err(`backfillDate: Received ${BAD_REQUEST} status code. Received: ${JSON.stringify(response.data)}`);
      } else {
        logger.err(`backfillDate: Received unexpected status code. Received: ${JSON.stringify(response.data)}`);
      }
    });
};

const storeInDatabase = async ({ polygonDailyOpenCloseModel }: StoreInDatabaseProps) => {
  const knexInstance = knex(knexConfig);
  await knexInstance<DBPolygonDailyOpenCloseModel>('trades_polygon_dailyopenclose')
    .insert(polygonDailyOpenCloseModel)
    .then(() => {
      logger.info(
        `storeInDatabase: Inserted entry into database. Entry: ${JSON.stringify(polygonDailyOpenCloseModel)}}`
      );
    })
    .catch((reason) => {
      logger.err(
        `storeInDatabase: Error when attempting insertion into database. Entry: ${JSON.stringify(
          polygonDailyOpenCloseModel
        )}}`
      );
      logger.err(reason);
    });
};

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/marketdailyopenclose', async (req: Request, res: Response) => {
  // Query database for data
  const knexInstance = knex(knexConfig);
  const tradesPolygonDailyopenclose = await knexInstance<DBPolygonDailyOpenCloseModel>('trades_polygon_dailyopenclose')
    .select('from_date', 'symbol', 'after_hours', 'close', 'high', 'low', 'open', 'pre_market', 'volume')
    .where('has_data', '=', true);

  const marketDailyOpenClose = tradesPolygonDailyopenclose.map((dbEntry) =>
    createMarketDailyOpenCloseEntryFromDBModel({
      dbPolygonDailyOpenCloseModel: dbEntry as DBPolygonDailyOpenCloseModel,
    })
  );
  const responseObject = { marketDailyOpenClose };
  res.status(OK).contentType('json').send(JSON.stringify(responseObject));
});

export default router;
