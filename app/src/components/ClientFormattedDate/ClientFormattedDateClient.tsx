'use client';

import { ClientFormattedDateProps } from './types';
import { clientFormattedDate } from './clientFormattedDateFunction';

const ClientFormattedDateClient = (props: ClientFormattedDateProps) => {
  return <>{clientFormattedDate(props)}</>;
};

export default ClientFormattedDateClient;
