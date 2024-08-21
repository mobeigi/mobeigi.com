import { Trade, DepositsWithdrawal, EquitySummaryInBase, MarketDailyOpenClose } from '../common/types';

export type GetTradesInRangeProps = {
  trades: Trade[];
  from: Date;
  to: Date;
};

export type FilterStockTradesProps = {
  trades: Trade[];
};

export type FilterOptionsTradesProps = {
  trades: Trade[];
};

export type GetDepositWithdrawalInRangeProps = {
  depositsWithdrawals: DepositsWithdrawal[];
  from: Date;
  to: Date;
};

export type GetEquitySummaryInBaseInRangeProps = {
  equitySummaryInBase: EquitySummaryInBase[];
  from: Date;
  to: Date;
};

export type GetEquitySummaryInBaseForDayProps = {
  equitySummaryInBase: EquitySummaryInBase[];
  date: Date;
};

export type TimeWeightedReturn = {
  date: Date;
  return: number;
  totalDiff: number;
};

export type GetPortfolioTimeWeightedReturnProps = {
  equitySummaryInBase: EquitySummaryInBase[];
  depositsWithdrawals: DepositsWithdrawal[];
};

export type GetMarketTimeWeightedReturnProps = {
  marketDailyOpenClose: MarketDailyOpenClose;
};
