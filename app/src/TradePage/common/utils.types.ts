import type { OpenPosition } from './types';

export type CalcSecurityTotalPriceType = {
  pricePerShare: number;
  quantity: number;
  isOptionContract: boolean;
};

export type GetPutOrCallFullTextType = {
  putCall: string | null;
};

export type IsOptionContractType = {
  position: OpenPosition;
};

export type GetOpenPositionTotalPriceType = {
  openPositions: OpenPosition[];
};

export type CreateGoogleFinanceQuoteUrlType = {
  symbol: string;
  exchange: string;
};
