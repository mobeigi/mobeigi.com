'use client';

import { useEffect, useState } from 'react';
import { ClientFormattedDateProps } from './types';

export const useClientFormattedDate = ({ date, format: dateFormat, useRelativeFormat }: ClientFormattedDateProps) => {
  const [clientFormattedDate, setClientFormattedDate] = useState<string>('');

  useEffect(() => {
    const fetchFormattedDate = async () => {
      const { clientFormattedDate: formattedDate } = await import('./clientFormattedDateFunction');
      const result = formattedDate({ date, format: dateFormat, useRelativeFormat });
      setClientFormattedDate(result);
    };

    void fetchFormattedDate();
  }, [date, dateFormat, useRelativeFormat]);

  return clientFormattedDate;
};
