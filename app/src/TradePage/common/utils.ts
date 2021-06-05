import type {
  CalcSecurityTotalPriceType,
  GetPutOrCallFullTextType,
  GetOpenPositionTotalPriceType,
  IsOptionContractType,
} from './utils.types';

export const calcSecurityTotalPrice = ({ pricePerShare, quantity, isOptionContract }: CalcSecurityTotalPriceType) =>
  Math.abs(pricePerShare * quantity * (isOptionContract ? 100 : 1));

export const getPutOrCallFullText = ({ putCall }: GetPutOrCallFullTextType) => {
  if (!putCall) {
    return '';
  }

  return putCall === 'P' ? 'PUT' : 'CALL';
};

export const isOptionContract = ({ position }: IsOptionContractType) => {
  return !!position.putCall;
};

export const getOpenPositionTotalPrice = ({ openPositions }: GetOpenPositionTotalPriceType) =>
  openPositions.reduce(
    (total, cur) =>
      total +
      calcSecurityTotalPrice({
        pricePerShare: cur.markPrice,
        quantity: cur.position,
        isOptionContract: isOptionContract({ position: cur }),
      }),
    0
  );
