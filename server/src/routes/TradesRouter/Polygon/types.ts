export type PolygonDailyOpenClose = {
  from: string;
  symbol: string;
  afterHours: number;
  close: number;
  high: number;
  low: number;
  open: number;
  preMarket: number;
  volume: number;
  status: string;
  message?: string;
  request_id: string;
};

export type DBPolygonDailyOpenCloseModel = {
  from_date: Date;
  symbol: string;
  has_data: boolean;
  after_hours?: number;
  close?: number;
  high?: number;
  low?: number;
  open?: number;
  pre_market?: number;
  volume?: number;
};

export type BackfillDateProps = {
  date: string;
};

export type StoreInDatabaseProps = {
  polygonDailyOpenCloseModel: DBPolygonDailyOpenCloseModel;
};

export type CreateNoDataDailyOpenCloseProps = {
  date: string;
};

export type CreateDBModelFromPolygonDailyOpenCloseProps = {
  polygonDailyOpenClose: PolygonDailyOpenClose;
  date: string;
};

export type ParseDateStringWithNewYorkTzProps = {
  date: string;
};
