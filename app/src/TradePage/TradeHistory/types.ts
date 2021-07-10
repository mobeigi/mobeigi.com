import type { ReactNode } from 'react';
import type { Trade } from '../common/types';

export type Props = {
  trades: Trade[];
  lastUpdated: ReactNode;
  timezone: string;
};
