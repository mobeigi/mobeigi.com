export type RequestEndpointProps = {
    endpointUrl: string,
    queryId: string,
    apiVersion: number,
}

export type FlexStatementResponseType = {
    FlexStatementResponse: {
        Status: string,
        Url: string,
        ReferenceCode: string,
    }
}

export type TradeType = {
    strike: string,
    dateTime: string,
    expiry: string,
    putCall: 'P' | 'C' | '',
    currency: string,
    description: string,
    ibCommission: string,
    quantity: string,
    symbol: string,
    tradeID: string,
    tradePrice: string,
}

export type TransformedTradeType = {
    strike: string | null,
    dateTime: Date,
    expiry: Date | null,
    putCall: 'P' | 'C' | null,
}

export type OpenPositionType = {
    strike: string,
    expiry: string,
    putCall: 'P' | 'C' | '',
    position: string,
    markPrice: string,
    currency: string,
    description: string,
    symbol: string,
}

export type TransformedOpenPositionType = {
    strike: string | null,
    expiry: Date | null,
    putCall: 'P' | 'C' | null,
    position: string | null,
    markPrice: string | null,
    currency: string,
    description: string,
    symbol: string,
}

export type CashTransactionType = {
    amount: string,
    currency: string,
    dateTime: string,
    fxRateToBase: string,
    type: string,
}

export type TransformedDepositsWithdrawalsType = {
    amount: string,
    currency: string,
    dateTime: Date,
    fxRateToBase: string,
    type: string,
}

export type EquitySummaryInBaseType = {
    reportDate: string,
    total: string,
    totalLong: string,
    totalShort: string,
}

export type TransformedEquitySummaryInBaseType = {
    reportDate: Date | null,
    total: string,
    totalLong: string,
    totalShort: string,
}

export type FlexQueryResponseType = {
    FlexQueryResponse: {
        FlexStatements: {
            FlexStatement: {
                whenGenerated: string,
                Trades: {
                    Trade: TradeType,
                },
                OpenPositions: {
                    OpenPosition: OpenPositionType,
                },
                CashTransactions: {
                    CashTransaction: CashTransactionType,
                },
                EquitySummaryInBase: {
                    EquitySummaryByReportDateInBase: EquitySummaryInBaseType,
                }
            }
        }
    }
}

export type SendRequestEndpointResponse =
{
    status: true,
    data: FlexStatementResponseType,
} |
{
    status: false,
    data: null,
};

export type GetStatementRequestResponse =
{
    status: true,
    data: string,
} |
{
    status: false,
    data: null,
};

export type TransformLast365CalendarDaysDataProps = {
    json: FlexQueryResponseType,
};

export type ConfigType = {
    token: string,
    Last365CalendarDaysFlexQueryId: string,
}