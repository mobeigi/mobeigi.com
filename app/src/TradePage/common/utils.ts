import type {
  CalcSecurityTotalPriceType,
  GetPutOrCallFullTextType,
  GetOpenPositionTotalPriceType,
  IsOptionContractType,
  CreateGoogleFinanceQuoteUrlType,
} from './utils.types';

export const calcSecurityTotalPrice = ({ pricePerShare, quantity, isOptionContract }: CalcSecurityTotalPriceType) =>
  quantity * pricePerShare * (isOptionContract ? 100 : 1);

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

export const CreateGoogleFinanceQuoteUrl = ({ symbol, exchange }: CreateGoogleFinanceQuoteUrlType) => {
  const exchangeMaps: { [key: string]: string } = {
    ARCA: 'NYSEARCA',
    PINK: 'OTCMKTS',
    AMEX: 'NYSEAMERICAN',
  };
  const convertedExchange = exchange in exchangeMaps ? exchangeMaps[exchange] : exchange;
  return `https://www.google.com/finance/quote/${symbol}:${convertedExchange}`;
};
