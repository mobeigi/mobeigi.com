export type DepositsWithdrawal = {
  dateTime: Date;
  amount: number;
  type: string;
  currency: string;
  fxRateToBase: number;
};

export type EquitySummaryInBase = {
  reportDate: Date;
  total: number;
  totalLong: number;
  totalShort: number;
};

export type OpenPosition = {
  currency: string;
  symbol: string;
  description: string;
  strike: number | null;
  expiry: Date | null;
  putCall: string | null;
  position: number;
  markPrice: number;
};

export type Trade = {
  tradeID: number;
  symbol: string;
  description: string;
  strike: number | null;
  expiry: Date | null;
  putCall: string | null;
  dateTime: Date;
  quantity: number;
  tradePrice: number;
  ibCommission: number;
  orderType: string;
  currency: string;
};

export type Last365CalendarDays = {
  whenGenerated: Date;
  timezone: string;
  trades: Trade[];
  openPositions: OpenPosition[];
  depositsWithdrawals: DepositsWithdrawal[];
  equitySummaryInBase: EquitySummaryInBase[];
};
