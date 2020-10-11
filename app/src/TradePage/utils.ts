type CalcTotalPriceType = {
    pricePerShare: number,
    quantity: number,
    isOptionContract: boolean
}

export const calcTotalPrice = (
  { pricePerShare, quantity, isOptionContract }: CalcTotalPriceType,
) => pricePerShare * quantity * (isOptionContract ? 100 : 1);

type GetPutOrCallFullTextType = {
  putCall: string | null
}

export const getPutOrCallFullText = ({ putCall } : GetPutOrCallFullTextType) => {
  if (!putCall) { return ''; }

  return putCall === 'P' ? 'PUT' : 'CALL';
};

export default { calcTotalPrice, getPutOrCallFullText };
