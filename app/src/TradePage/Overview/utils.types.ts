import { Trade, DepositsWithdrawal, EquitySummaryInBase } from '../common/types';

export type GetTradesInRangeProps = {
    trades: Trade[],
    from: Date,
    to: Date,
}

export type FilterStockTradesProps = {
    trades: Trade[],
}

export type FilterOptionsTradesProps = {
    trades: Trade[],
}

export type GetNetDepositWithdrawalInBaseInRangeProps = {
    depositsWithdrawals: DepositsWithdrawal[],
    from: Date,
    to: Date,
}

export type GetEquitySummaryInBaseForDayProps = {
    equitySummaryInBase: EquitySummaryInBase[],
    date: Date,
}
