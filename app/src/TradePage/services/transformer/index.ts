import type { Last365CalendarDays } from '../../common/types';
import type { OpenPosition, Trade, DepositsWithdrawal, EquitySummaryInBase, MarketDailyOpenClose } from '../types';
import type { TransformLast365CalendarDaysProps, TransformMarketDailyOpenCloseProps } from './types';
import { getOpenPositionTotalPrice, isOptionContract, calcSecurityTotalPrice } from '../../common/utils';

const transformTrades = ({ trades }: { trades: Trade[] }) => {
  return trades
    .reverse()
    .filter((trade: Trade) => trade.symbol !== 'AUD.USD') // filter currency conversion trades
    .map((trade: Trade) => ({
      ...trade,
      tradeID: Number(trade.tradeID),
      strike: Number(trade.strike) || null,
      expiry: trade.expiry ? new Date(trade.expiry) : null,
      dateTime: new Date(trade.dateTime),
      quantity: Number(trade.quantity),
      tradePrice: Number(trade.tradePrice),
      ibCommission: Number(trade.ibCommission),
    }));
};

const transformOpenPositions = ({ openPositions }: { openPositions: OpenPosition[] }) => {
  const transformedOpenPositions = openPositions.map((openPosition: OpenPosition) => ({
    ...openPosition,
    strike: Number(openPosition.strike) || null,
    expiry: openPosition.expiry ? new Date(openPosition.expiry) : null,
    position: Number(openPosition.position),
    markPrice: Number(openPosition.markPrice),
  }));

  // Sort open positions by weight
  const openPositionTotalPrice = getOpenPositionTotalPrice({ openPositions: transformedOpenPositions });
  transformedOpenPositions.sort((a: OpenPosition, b: OpenPosition) => {
    const currentPositionTotalPriceA = calcSecurityTotalPrice({
      pricePerShare: a.markPrice,
      quantity: a.position,
      isOptionContract: isOptionContract({ position: a }),
    });
    const currentPositionTotalPriceB = calcSecurityTotalPrice({
      pricePerShare: b.markPrice,
      quantity: b.position,
      isOptionContract: isOptionContract({ position: b }),
    });
    const weightA = (currentPositionTotalPriceA / openPositionTotalPrice) * 100;
    const weightB = (currentPositionTotalPriceB / openPositionTotalPrice) * 100;
    return weightB - weightA;
  });
  return transformedOpenPositions;
};

const transformDepositsWithdrawals = ({ depositsWithdrawals }: { depositsWithdrawals: DepositsWithdrawal[] }) => {
  return depositsWithdrawals.map((depositsWithdrawal: DepositsWithdrawal) => ({
    ...depositsWithdrawal,
    dateTime: new Date(depositsWithdrawal.dateTime),
    amount: Number(depositsWithdrawal.amount),
    fxRateToBase: Number(depositsWithdrawal.fxRateToBase),
  }));
};

const transformEquitySummaryInBase = ({ equitySummaryInBase }: { equitySummaryInBase: EquitySummaryInBase[] }) => {
  return equitySummaryInBase.map((equitySummaryInBaseEntry: EquitySummaryInBase) => ({
    ...equitySummaryInBaseEntry,
    reportDate: new Date(equitySummaryInBaseEntry.reportDate),
    total: Number(equitySummaryInBaseEntry.total),
    totalLong: Number(equitySummaryInBaseEntry.totalLong),
    totalShort: Number(equitySummaryInBaseEntry.totalShort),
  }));
};

export const transformLast365CalendarDays = ({
  last365CalendarDays,
}: TransformLast365CalendarDaysProps): Last365CalendarDays => {
  const whenGenerated = new Date(last365CalendarDays.whenGenerated);
  const { timezone } = last365CalendarDays;
  const trades = transformTrades({ trades: last365CalendarDays.trades });
  const openPositions = transformOpenPositions({ openPositions: last365CalendarDays.openPositions });
  const depositsWithdrawals = transformDepositsWithdrawals({
    depositsWithdrawals: last365CalendarDays.depositsWithdrawals,
  });
  const equitySummaryInBase = transformEquitySummaryInBase({
    equitySummaryInBase: last365CalendarDays.equitySummaryInBase,
  });

  return {
    whenGenerated,
    timezone,
    trades,
    openPositions,
    depositsWithdrawals,
    equitySummaryInBase,
  };
};

export const transformMarketDailyOpenClose = ({
  marketDailyOpenClose,
}: TransformMarketDailyOpenCloseProps): MarketDailyOpenClose => {
  // No transformation needed at this stage
  return marketDailyOpenClose;
};
