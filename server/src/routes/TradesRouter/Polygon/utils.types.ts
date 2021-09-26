import type { DBPolygonDailyOpenCloseModel, PolygonDailyOpenClose } from './types';

export type CreateNoDataDailyOpenCloseProps = {
  date: string;
};

export type CreateDBModelFromPolygonDailyOpenCloseProps = {
  polygonDailyOpenClose: PolygonDailyOpenClose;
  date: string;
};

export type CreateMarketDailyOpenCloseEntryFromDBModelProps = {
  dbPolygonDailyOpenCloseModel: DBPolygonDailyOpenCloseModel;
};

export type ParseDateStringWithNewYorkTzProps = {
  date: string;
};
