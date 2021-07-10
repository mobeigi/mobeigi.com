import type { Last365CalendarDays } from './common/types';

export enum NavTab {
  Overview = 'overview',
  OpenPositions = 'openpositions',
  TradeHistory = 'tradehistory',
  StockTwits = 'stocktwits',
}

export type State = {
  last365CalendarDays: Last365CalendarDays | null;
  currentNavTab: NavTab;
  loading: boolean;
  error: boolean;
};
