import type { ReactNode } from 'react';
import type { Trade, DepositsWithdrawal, EquitySummaryInBase } from '../common/types';

export type Props = {
  trades: Trade[];
  depositsWithdrawals: DepositsWithdrawal[];
  equitySummaryInBase: EquitySummaryInBase[];
  lastUpdated: ReactNode;
};
