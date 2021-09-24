import moment from 'moment';
import 'moment-timezone';

import type { NullableDataToFlatArrayProps, ConvertDateFromNewYorkTzToLocalProps } from './types';

export const nullableDataToFlatArray = ({ data }: NullableDataToFlatArrayProps): any => {
  return data ? [data].flat() : [];
};

export const convertDateFromNewYorkTzToLocal = ({
  date,
  format,
}: ConvertDateFromNewYorkTzToLocalProps): moment.Moment => {
  return moment.tz(date, format, 'America/New_York');
};
