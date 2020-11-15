import type { OpenPosition } from './types';

export type CalcTotalPriceType = {
    pricePerShare: number,
    quantity: number,
    isOptionContract: boolean
}

export type GetPutOrCallFullTextType = {
    putCall: string | null
}

export type GetOpenPositionTotalPriceType = {
    openPositions: OpenPosition[]
}
