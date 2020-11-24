import moment from 'moment';
import {
  GetTradesInRangeProps,
  FilterStockTradesProps,
  FilterOptionsTradesProps,
  GetNetDepositWithdrawalInBaseInRangeProps,
  GetEquitySummaryInBaseForDayProps,
} from './utils.types';

export const getCurrentFinancialYearStartDate = () => {
  const startOfFinancialYear = moment().month(6).startOf('month');
  if (startOfFinancialYear > moment()) {
    startOfFinancialYear.subtract(1, 'year');
  }
  return startOfFinancialYear.toDate();
};

export const getTradesInRange = ({ trades, from, to }: GetTradesInRangeProps) => trades.filter(
  (trade) => trade.dateTime > from && trade.dateTime < to,
);

export const filterStockTrades = ({ trades }: FilterStockTradesProps) => trades.filter(
  (trade) => trade.putCall === null,
);

export const filterOptionTrades = ({ trades }: FilterOptionsTradesProps) => trades.filter(
  (trade) => trade.putCall !== null,
);

export const getEquitySummaryInBaseForDay = (
  { equitySummaryInBase, date }: GetEquitySummaryInBaseForDayProps,
) => (
  equitySummaryInBase.find(
    (equitySummaryInBaseEntry) => moment(equitySummaryInBaseEntry.reportDate).isSame(moment(date)),
  ));

export const getNetDepositWithdrawalInBaseInRange = (
  { depositsWithdrawals, from, to }: GetNetDepositWithdrawalInBaseInRangeProps,
) => depositsWithdrawals
  .filter(
    (depositsWithdrawal) => depositsWithdrawal.dateTime > from && depositsWithdrawal.dateTime < to,
  )
  .reduce((accumulator, current) => accumulator + (current.amount * current.fxRateToBase), 0);

export default {
  getCurrentFinancialYearStartDate,
  getTradesInRange,
  filterStockTrades,
  filterOptionTrades,
  getEquitySummaryInBaseForDay,
  getNetDepositWithdrawalInBaseInRange,
};
