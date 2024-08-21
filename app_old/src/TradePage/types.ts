import type { Last365CalendarDays, MarketDailyOpenClose } from './common/types';

export enum NavTab {
  Overview = 'overview',
  OpenPositions = 'openpositions',
  TradeHistory = 'tradehistory',
  StockTwits = 'stocktwits',
}

export type State = {
  last365CalendarDays: Last365CalendarDays | null;
  marketDailyOpenClose: MarketDailyOpenClose | null;
  currentNavTab: NavTab;
  loading: boolean;
  error: boolean;
};
