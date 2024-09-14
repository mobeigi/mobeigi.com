import type { AccessArgs } from 'payload';

type isAuthenticated = (args: AccessArgs<any>) => boolean;

export const authenticated: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user);
};
