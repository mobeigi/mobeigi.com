export type MarketDailyOpenClose = {
  marketDailyOpenClose: MarketDailyOpenCloseEntry[];
};

export type MarketDailyOpenCloseEntry = {
  from: Date;
  symbol: string;
  afterHours: number;
  close: number;
  high: number;
  low: number;
  open: number;
  preMarket: number;
  volume: number;
};
