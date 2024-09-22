import { AccessArgs } from 'payload';

export type AccessFunction = (args: AccessArgs<any>) => boolean;
