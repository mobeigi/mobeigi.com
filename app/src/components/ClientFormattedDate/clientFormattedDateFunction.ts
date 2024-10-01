'use client';

import { format, formatDistance } from 'date-fns';
import { ClientFormattedDateProps } from './types';

export const clientFormattedDate = ({ date, format: dateFormat, useRelativeFormat }: ClientFormattedDateProps) => {
  if (useRelativeFormat) {
    const now = new Date();
    return formatDistance(date, now, { addSuffix: true });
  }

  if (!dateFormat) {
    throw Error('Date format is required.');
  }

  return format(date, dateFormat);
};
