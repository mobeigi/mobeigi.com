import Axios from 'axios';

import { Last365CalendarDays } from '../../common/types';
import type { GetLast365CalendarDaysResponseType } from './types';

export const getLast365CalendarDays = (): Promise<GetLast365CalendarDaysResponseType> => {
  return Axios.get('/trades/Last365CalendarDays').then((response) => {
    if (response.status === 200) {
      const data = response.data as Last365CalendarDays;
      return data;
    }
    throw new Error(`Received non-200 response code: ${response.status}`);
  });
};
