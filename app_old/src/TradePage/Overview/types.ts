import type { ReactNode } from 'react';
import type { Trade, DepositsWithdrawal, EquitySummaryInBase, MarketDailyOpenClose } from '../common/types';

export type OverviewProps = {
  trades: Trade[];
  depositsWithdrawals: DepositsWithdrawal[];
  equitySummaryInBase: EquitySummaryInBase[];
  marketDailyOpenClose: MarketDailyOpenClose;
  lastUpdated: ReactNode;
};
