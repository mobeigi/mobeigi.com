import type { OpenPosition, Trade, DepositsWithdrawal, EquitySummaryInBase } from './common/types';

export enum NavTab {
  Overview = 'overview',
  OpenPositions = 'openpositions',
  TradeHistory = 'tradehistory',
  StockTwits = 'stocktwits',
}

type Last365CalendarDays = {
  whenGenerated: Date | null;
  timezone: string;
  trades: Trade[];
  openPositions: OpenPosition[];
  depositsWithdrawals: DepositsWithdrawal[];
  equitySummaryInBase: EquitySummaryInBase[];
};

export type State = Last365CalendarDays & {
  currentNavTab: NavTab;
  loading: boolean;
  error: boolean;
};
