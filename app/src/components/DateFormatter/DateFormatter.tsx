'use client';

import dynamic from 'next/dynamic';
import { DateFormatterProps } from './types';

const DateFormatterClient = dynamic(() => import('./DateFormatterClient'), {
  ssr: false,
  loading: () => <>Loading...</>,
});

export const DateFormatter = (props: DateFormatterProps) => <DateFormatterClient {...props} />;
