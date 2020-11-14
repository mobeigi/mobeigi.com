import type { OpenPosition, Trade } from './common/types';

export enum NavTab {
    Overview = 'overview',
    OpenPositions = 'openpositions',
    TradeHistory = 'tradehistory',
    StockTwits = 'stocktwits',
}

export type State = {
    trades: Trade[],
    openPositions: OpenPosition[],
    whenGenerated: Date | null,
    timezone: string,
    loading: boolean,
    error: boolean,
    currentNavTab: NavTab
}
