export type Trade = {
    tradeID: number,
    symbol: string,
    strike: number,
    expiry: Date | null,
    putCall: string,
    dateTime: Date,
    quantity: number,
    tradePrice: number,
    ibCommission: number,
    orderType: string,
    currency: string,
}

export type State = {
    trades: Trade[],
    whenGenerated: Date | null,
    lastUpdated: Date | null,
    timezone: string,
    error: boolean,
}
