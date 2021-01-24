import type { Trade } from '../common/types';

export type Props = {
  trades: Trade[];
  lastUpdated: JSX.Element;
  timezone: string;
};
