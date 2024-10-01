'use client';

import dynamic from 'next/dynamic';
import { ClientFormattedDateProps } from './types';

const ClientFormattedDateClient = dynamic(() => import('./ClientFormattedDateClient'), {
  ssr: false,
  loading: () => <>Loading...</>,
});

export const ClientFormattedDate = (props: ClientFormattedDateProps) => <ClientFormattedDateClient {...props} />;
