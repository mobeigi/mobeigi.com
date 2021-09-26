import Axios from 'axios';

import type { MarketDailyOpenClose } from './types';

export const getMarketDailyOpenClose = (): Promise<MarketDailyOpenClose> => {
  return Axios.get('/trades/polygon/marketdailyopenclose').then((response) => {
    if (response.status === 200) {
      const data = response.data as MarketDailyOpenClose;
      return data;
    }
    throw new Error(`Received non-200 response code: ${response.status}`);
  });
};
