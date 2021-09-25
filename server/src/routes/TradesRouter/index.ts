import fs from 'fs';
import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { StatusCodes } from 'http-status-codes';
import parser from 'xml2json';
import moment from 'moment';
import 'moment-timezone';
import Axios from 'axios';
import cron from 'node-cron';
import logger from '@shared/components/Logger';
import { getPrivatePath } from '@shared/utils/GetPrivatePath';
import type {
  RequestEndpointProps,
  TransformLast365CalendarDaysDataProps,
  FlexStatementResponseType,
  SendRequestEndpointResponse,
  FlexQueryResponseType,
  TradeType,
  TransformedTradeType,
  OpenPositionType,
  TransformedOpenPositionType,
  CashTransactionType,
  TransformedDepositsWithdrawalsType,
  EquitySummaryInBaseType,
  TransformedEquitySummaryInBaseType,
  GetStatementRequestResponse,
} from './types';
import type { TradesConfig } from './shared/types';
import { nullableDataToFlatArray, convertDateFromNewYorkTzToLocal } from './utils';
import Polygon from './Polygon';

const router = Router();
router.use('/polygon', Polygon);

const { OK, NOT_FOUND } = StatusCodes;

const FILE_NAME = 'Last365CalendarDays.xml';
const CONFIG = JSON.parse(fs.readFileSync(`${getPrivatePath()}/trades/config.json`).toString()) as TradesConfig;
const TOKEN = CONFIG.token;
const LAST_365_CALENDAR_DAYS_FLEX_QUERY_ID = CONFIG.Last365CalendarDaysFlexQueryId;
const FLEX_STATEMENT_SENDREQUEST_ENDPOINT =
  'https://ndcdyn.interactivebrokers.com/Universal/servlet/FlexStatementService.SendRequest';
const MAX_RETRIES = 5;
const RETRY_TIMEOUT = 60000;

// New report is only generated past midnight NY time
// Prior to this a cached report is returned which does not contain new (daily) trades
cron
  //TODO: Remove lint error
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .schedule('15 */1 * * *', async () => {
    logger.info('Starting updateLast365CalendarDaysXmlFile Cron Job');
    const status = await updateLast365CalendarDaysXmlFile();
    logger.info(`Completed updateLast365CalendarDaysXmlFile Cron Job. Status: ${status.toString()}`);
  })
  .start();

export const updateLast365CalendarDaysXmlFile = async (): Promise<boolean> => {
  const sendRequestResponse = await sendRequestEndpoint({
    endpointUrl: FLEX_STATEMENT_SENDREQUEST_ENDPOINT,
    queryId: LAST_365_CALENDAR_DAYS_FLEX_QUERY_ID,
    apiVersion: 3,
  });
  if (sendRequestResponse.status) {
    const sendRequestResponseJson = sendRequestResponse.data;
    for (let retryCount = 1; retryCount <= MAX_RETRIES; retryCount++) {
      const getStatementResponse = await getStatementRequest({
        endpointUrl: sendRequestResponseJson['FlexStatementResponse']['Url'],
        queryId: sendRequestResponseJson['FlexStatementResponse']['ReferenceCode'],
        apiVersion: 3,
      });
      if (getStatementResponse.status) {
        fs.writeFileSync(`${getPrivatePath()}/trades/${FILE_NAME}`, getStatementResponse.data);
        logger.info('updateLast365CalendarDaysXmlFile: Successfully updated ' + FILE_NAME);
        return true;
      } else {
        // Delay before retry
        logger.warn(`updateLast365CalendarDaysXmlFile: Retry attempt ${retryCount}`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_TIMEOUT));
        continue;
      }
    }
  }

  return false;
};

const sendRequestEndpoint = async ({
  endpointUrl,
  queryId,
  apiVersion,
}: RequestEndpointProps): Promise<SendRequestEndpointResponse> => {
  const sendRequestResponse = (await Axios.get(endpointUrl, { params: { t: TOKEN, q: queryId, v: apiVersion } })
    .then((response) => {
      if (response.status === OK) {
        const sendRequestJson = parser.toJson(response.data, { object: true }) as FlexStatementResponseType;

        if (sendRequestJson['FlexStatementResponse']['Status'] === 'Success') {
          return { status: true, data: sendRequestJson };
        } else {
          logger.err(`FlexStatementResponse.Status: Received non-success status 
          ${JSON.stringify(sendRequestJson.FlexStatementResponse)}`);
          return { status: false, data: null };
        }
      } else {
        logger.err(`SendRequest: Received status code of ${response.status}`);
        return { status: false, data: null };
      }
    })
    .catch((error: string) => {
      logger.err(`SendRequest: Caught error during request. ${error}`);
      return { status: false, data: null };
    })) as SendRequestEndpointResponse;

  return sendRequestResponse;
};

const getStatementRequest = async ({ endpointUrl, queryId, apiVersion }: RequestEndpointProps) => {
  const getStatementResponse = (await Axios.get(endpointUrl, { params: { t: TOKEN, q: queryId, v: apiVersion } })
    .then((response) => {
      if (response.status === OK) {
        const getStatementJson = parser.toJson(response.data, { object: true }) as FlexQueryResponseType;
        if (getStatementJson['FlexQueryResponse']) {
          return { status: true, data: response.data as string };
        } else {
          return { status: false, data: null };
        }
      } else {
        logger.err(`GetStatement: Received status code of ${response.status}`);
        return { status: false, data: null };
      }
    })
    .catch((error: string) => {
      logger.err(`GetStatement: Caught error during request. ${error}`);
      return { status: false, data: null };
    })) as GetStatementRequestResponse;

  return getStatementResponse;
};

const transformLast365CalendarDaysData = ({ json }: TransformLast365CalendarDaysDataProps) => {
  const trades = nullableDataToFlatArray({
    data: json.FlexQueryResponse.FlexStatements.FlexStatement.Trades.Trade,
  }) as TradeType[];
  let transformedTrades = [] as TransformedTradeType[];
  if (trades.length > 0) {
    transformedTrades = trades.map((trade) => ({
      // Transform data
      ...trade,
      strike: trade.strike || null, // TODO: change to number in transformed
      dateTime: moment(trade.dateTime, 'YYYYMMDD;HHmmss').toDate(), // This dateTime is reported in local time already and does not need timezone convertion
      expiry: trade.expiry
        ? convertDateFromNewYorkTzToLocal({
            date: trade.expiry,
            format: 'YYYYMMDD',
          })
            .endOf('day') // Options expire at end of the day on expiry day
            .toDate()
        : null,
      putCall: trade.putCall || null,
      underlyingListingExchange: trade.underlyingListingExchange || null,
    }));

    transformedTrades.sort(
      (a: TransformedTradeType, b: TransformedTradeType) => a.dateTime.getTime() - b.dateTime.getTime()
    ); // ascending date
  }

  const openPositions = nullableDataToFlatArray({
    data: json.FlexQueryResponse.FlexStatements.FlexStatement.OpenPositions.OpenPosition,
  }) as OpenPositionType[];
  let transformedOpenPositions = [] as TransformedOpenPositionType[];
  if (openPositions.length > 0) {
    transformedOpenPositions = openPositions.map((position) => ({
      // Transform data
      ...position,
      strike: position['strike'] || null, // TODO: change to number in transformed
      expiry: position['expiry']
        ? convertDateFromNewYorkTzToLocal({
            date: position['expiry'],
            format: 'YYYYMMDD',
          })
            .endOf('day') // Options expire at end of the day on expiry day
            .toDate()
        : null,
      putCall: position['putCall'] || null,
      position: position['position'] || null, // TODO: change to number in transformed
      markPrice: position['markPrice'] || null, // TODO: change to number in transformed
      underlyingListingExchange: position['underlyingListingExchange'] || null,
    }));
    transformedOpenPositions.sort(
      (a, b) => Number(b.position) * Number(b.markPrice) - Number(a.position) * Number(a.markPrice)
    ); // decending total price
  }

  const cashTransactions = nullableDataToFlatArray({
    data: json.FlexQueryResponse.FlexStatements.FlexStatement.CashTransactions.CashTransaction,
  }) as CashTransactionType[];
  let transformedDepositsWithdrawals = [] as TransformedDepositsWithdrawalsType[];
  if (cashTransactions.length > 0) {
    transformedDepositsWithdrawals = cashTransactions
      .filter((cashTransaction) => cashTransaction.type === 'Deposits/Withdrawals')
      .map((cashTransaction) => ({
        // Transform data
        amount: cashTransaction.amount, // TODO: change to number in transformed
        currency: cashTransaction.currency,
        dateTime: convertDateFromNewYorkTzToLocal({
          date: cashTransaction.dateTime,
          format: 'YYYYMMDD;HHmmss',
        }).toDate(),
        fxRateToBase: cashTransaction.fxRateToBase, // TODO: change to number in transformed
        type: cashTransaction.type,
      }));
  }

  const equitySummaryInBase = nullableDataToFlatArray({
    data: json.FlexQueryResponse.FlexStatements.FlexStatement.EquitySummaryInBase.EquitySummaryByReportDateInBase,
  }) as EquitySummaryInBaseType[];
  let transformedEquitySummaryInBase = [] as TransformedEquitySummaryInBaseType[];
  if (equitySummaryInBase.length > 0) {
    transformedEquitySummaryInBase = equitySummaryInBase.map((equitySummaryByReportDateInBase) => ({
      // Transform data
      reportDate: equitySummaryByReportDateInBase.reportDate
        ? convertDateFromNewYorkTzToLocal({
            date: equitySummaryByReportDateInBase.reportDate,
            format: 'YYYYMMDD',
          })
            .endOf('day') // Equity summary reportDate is for the end of the day
            .toDate()
        : null,
      total: equitySummaryByReportDateInBase.total,
      totalLong: equitySummaryByReportDateInBase.totalLong,
      totalShort: equitySummaryByReportDateInBase.totalShort,
    }));
  }

  const whenGenerated = convertDateFromNewYorkTzToLocal({
    date: json.FlexQueryResponse.FlexStatements.FlexStatement.whenGenerated,
    format: 'YYYYMMDD;HHmmss',
  });

  return {
    whenGenerated,
    timezone: 'Australia/Sydney',
    trades: transformedTrades,
    openPositions: transformedOpenPositions,
    depositsWithdrawals: transformedDepositsWithdrawals,
    equitySummaryInBase: transformedEquitySummaryInBase,
  };
};

router.get('/Last365CalendarDays', (req: Request, res: Response) => {
  // Check if file exists on disk
  const exists = fs.existsSync(`${getPrivatePath()}/trades/${FILE_NAME}`);

  if (!exists) {
    return res
      .status(NOT_FOUND)
      .contentType('json')
      .send(JSON.stringify({ error: "File '" + FILE_NAME + "' not found." }));
  }

  // Parse stored file
  const xml = fs.readFileSync(`${getPrivatePath()}/trades/${FILE_NAME}`).toString();
  const json = parser.toJson(xml, { object: true }) as FlexQueryResponseType;
  const transformedData = transformLast365CalendarDaysData({ json });

  return res.status(OK).contentType('json').send(JSON.stringify(transformedData));
});

export default router;
