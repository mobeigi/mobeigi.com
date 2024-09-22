import { AccessFunction } from './types';

export const authenticated: AccessFunction = ({ req: { user } }) => {
  return Boolean(user);
};
