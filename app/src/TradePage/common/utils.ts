import type {
  CalcTotalPriceType,
  GetPutOrCallFullTextType,
  GetOpenPositionTotalPriceType,
  DisplayFractionAsPercentageType,
} from './utils.types';

export const calcTotalPrice = (
  { pricePerShare, quantity, isOptionContract }: CalcTotalPriceType,
) => Math.abs(pricePerShare * quantity * (isOptionContract ? 100 : 1));

export const getPutOrCallFullText = ({ putCall }: GetPutOrCallFullTextType) => {
  if (!putCall) { return ''; }

  return putCall === 'P' ? 'PUT' : 'CALL';
};

export const getOpenPositionTotalPrice = (
  { openPositions }: GetOpenPositionTotalPriceType,
) => openPositions.reduce((total, cur) => total + (cur.position * cur.markPrice), 0);

export const displayFractionAsPercentage = ({ fraction }: DisplayFractionAsPercentageType) => `${((fraction) * 100).toFixed(2)}%`;

export default {
  calcTotalPrice, getPutOrCallFullText, getOpenPositionTotalPrice, displayFractionAsPercentage,
};
