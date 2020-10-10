type CalcTotalPriceType = {
    pricePerShare: number,
    quantity: number,
    isOptionContract: boolean
}

export const calcTotalPrice = (
  { pricePerShare, quantity, isOptionContract }: CalcTotalPriceType,
) => pricePerShare * quantity * (isOptionContract ? 100 : 1);

export default { calcTotalPrice };
