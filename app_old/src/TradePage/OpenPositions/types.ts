import type { ReactNode } from 'react';
import type { OpenPosition } from '../common/types';

export type Props = {
  openPositions: OpenPosition[];
  lastUpdated: ReactNode;
};
