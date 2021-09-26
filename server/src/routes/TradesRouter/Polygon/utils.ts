import moment from 'moment';
import type {
  DBPolygonDailyOpenCloseModel,
  CreateNoDataDailyOpenCloseProps,
  CreateDBModelFromPolygonDailyOpenCloseProps,
  ParseDateStringWithNewYorkTzProps,
  MarketDailyOpenCloseEntry,
  CreateMarketDailyOpenCloseEntryFromDBModelProps,
} from './types';
import { SPY_SYMBOL, POLYGON_API_DATE_FORMAT, NEW_YORK_TIMEZONE } from './constants';

export const createNoDataDailyOpenClose = ({ date }: CreateNoDataDailyOpenCloseProps): DBPolygonDailyOpenCloseModel => {
  const from_date = convertDate({ date });
  return {
    from_date,
    symbol: SPY_SYMBOL,
    has_data: false,
  };
};

export const createDBModelFromPolygonDailyOpenClose = ({
  polygonDailyOpenClose,
  date,
}: CreateDBModelFromPolygonDailyOpenCloseProps): DBPolygonDailyOpenCloseModel => {
  const from_date = convertDate({ date });
  return {
    from_date,
    symbol: polygonDailyOpenClose.symbol,
    has_data: true,
    after_hours: polygonDailyOpenClose.afterHours,
    close: polygonDailyOpenClose.close,
    high: polygonDailyOpenClose.high,
    low: polygonDailyOpenClose.low,
    open: polygonDailyOpenClose.open,
    pre_market: polygonDailyOpenClose.preMarket,
    volume: polygonDailyOpenClose.volume,
  };
};

export const createMarketDailyOpenCloseEntryFromDBModel = ({
  dbPolygonDailyOpenCloseModel,
}: CreateMarketDailyOpenCloseEntryFromDBModelProps): MarketDailyOpenCloseEntry => {
  return {
    from: dbPolygonDailyOpenCloseModel.from_date,
    symbol: dbPolygonDailyOpenCloseModel.symbol,
    afterHours: dbPolygonDailyOpenCloseModel.after_hours,
    close: dbPolygonDailyOpenCloseModel.close,
    high: dbPolygonDailyOpenCloseModel.high,
    low: dbPolygonDailyOpenCloseModel.low,
    open: dbPolygonDailyOpenCloseModel.open,
    preMarket: dbPolygonDailyOpenCloseModel.pre_market,
    volume: dbPolygonDailyOpenCloseModel.volume,
  };
};

const convertDate = ({ date }: ParseDateStringWithNewYorkTzProps) => {
  // Data is accurate only for the end of the day
  return moment.tz(date, POLYGON_API_DATE_FORMAT, NEW_YORK_TIMEZONE).endOf('day').toDate();
};
