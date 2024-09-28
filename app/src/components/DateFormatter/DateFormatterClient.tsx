'use client';

import { format } from 'date-fns';
import { DateFormatterProps } from './types';

const DateFormatterClient = (props: DateFormatterProps) => {
  return <>{format(props.date, props.format)}</>;
};

export default DateFormatterClient;
