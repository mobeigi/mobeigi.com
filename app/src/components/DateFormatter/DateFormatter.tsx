import lazy from 'next/dynamic';
import { Suspense } from 'react';
import { DateFormatterProps } from './types';

const DateFormatterClient = lazy(() => import('./Client'), {
  ssr: false,
  loading: () => <>Loading...</>,
});

export const DateFormatter = (props: DateFormatterProps) => (
  <Suspense>
    <DateFormatterClient {...props} />
  </Suspense>
);
