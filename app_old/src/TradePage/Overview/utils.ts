import moment from 'moment';
import {
  GetTradesInRangeProps,
  FilterStockTradesProps,
  FilterOptionsTradesProps,
  GetDepositWithdrawalInRangeProps,
  GetEquitySummaryInBaseInRangeProps,
  GetEquitySummaryInBaseForDayProps,
  TimeWeightedReturn,
  GetPortfolioTimeWeightedReturnProps,
  GetMarketTimeWeightedReturnProps,
} from './utils.types';

export const getCurrentFinancialYearStartDate = () => {
  const startOfFinancialYear = moment().month(6).startOf('month');
  if (startOfFinancialYear > moment()) {
    startOfFinancialYear.subtract(1, 'year');
  }
  return startOfFinancialYear.toDate();
};

export const getTradesInRange = ({ trades, from, to }: GetTradesInRangeProps) =>
  trades.filter((trade) => trade.dateTime > from && trade.dateTime < to);

export const filterStockTrades = ({ trades }: FilterStockTradesProps) =>
  trades.filter((trade) => trade.putCall === null);

export const filterOptionTrades = ({ trades }: FilterOptionsTradesProps) =>
  trades.filter((trade) => trade.putCall !== null);

export const getEquitySummaryInBaseInRange = ({ equitySummaryInBase, from, to }: GetEquitySummaryInBaseInRangeProps) =>
  equitySummaryInBase.filter(
    (equitySummaryInBaseEntry) =>
      equitySummaryInBaseEntry.reportDate >= from && equitySummaryInBaseEntry.reportDate <= to
  );

export const getEquitySummaryInBaseForDay = ({ equitySummaryInBase, date }: GetEquitySummaryInBaseForDayProps) =>
  equitySummaryInBase.find((equitySummaryInBaseEntry) =>
    moment(equitySummaryInBaseEntry.reportDate).isSame(moment(date))
  );

export const getDepositWithdrawalInRange = ({ depositsWithdrawals, from, to }: GetDepositWithdrawalInRangeProps) =>
  depositsWithdrawals.filter(
    (depositsWithdrawal) => depositsWithdrawal.dateTime >= from && depositsWithdrawal.dateTime <= to
  );

export const getPortfolioTimeWeightedReturn = ({
  equitySummaryInBase,
  depositsWithdrawals,
}: GetPortfolioTimeWeightedReturnProps): TimeWeightedReturn[] => {
  if (equitySummaryInBase.length === 0) {
    return [];
  }

  const timeWeightedReturnArray = [] as TimeWeightedReturn[];
  const netDepositWithdrawal = depositsWithdrawals.reduce(
    (accumulator, current) => accumulator + current.amount * current.fxRateToBase,
    0
  );

  // Cost basis is total deposits + starting balance
  const startingBalance = equitySummaryInBase[0]?.total || 0;
  const totalCostBasis = netDepositWithdrawal + startingBalance;

  equitySummaryInBase.forEach((equitySummaryInBaseEntry) => {
    const netDepositWithdrawalTillDate = depositsWithdrawals
      .filter((depositsWithdrawal) => {
        depositsWithdrawal.dateTime.setHours(0, 0, 0, 0);
        return depositsWithdrawal.dateTime <= equitySummaryInBaseEntry.reportDate;
      })
      .reduce((accumulator, current) => accumulator + current.amount * current.fxRateToBase, 0);

    const totalDiff = equitySummaryInBaseEntry.total - (netDepositWithdrawalTillDate + startingBalance);

    const timeWeightedReturnValue = totalDiff / totalCostBasis;
    const timeWeightedReturn = {
      date: equitySummaryInBaseEntry.reportDate,
      return: timeWeightedReturnValue,
      totalDiff,
    };
    timeWeightedReturnArray.push(timeWeightedReturn);
  });

  return timeWeightedReturnArray;
};

export const getMarketTimeWeightedReturn = ({
  marketDailyOpenClose,
}: GetMarketTimeWeightedReturnProps): TimeWeightedReturn[] => {
  if (marketDailyOpenClose.marketDailyOpenClose.length === 0) {
    return [];
  }

  const timeWeightedReturnArray = [] as TimeWeightedReturn[];
  const costBasis = marketDailyOpenClose.marketDailyOpenClose[0].close;

  marketDailyOpenClose.marketDailyOpenClose.forEach((marketDailyOpenCloseEntry) => {
    const totalDiff = marketDailyOpenCloseEntry.close - costBasis;
    const timeWeightedReturnValue = totalDiff / costBasis;
    const timeWeightedReturn = {
      date: marketDailyOpenCloseEntry.from,
      return: timeWeightedReturnValue,
      totalDiff,
    };
    timeWeightedReturnArray.push(timeWeightedReturn);
  });

  return timeWeightedReturnArray;
};
