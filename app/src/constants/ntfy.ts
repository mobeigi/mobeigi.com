import { requireEnvVar } from '@/utils/env';

export const NTFY_HOST = requireEnvVar(process.env.NTFY_HOST, 'NTFY_HOST');
export const NTFY_USER = requireEnvVar(process.env.NTFY_USER, 'NTFY_USER');
export const NTFY_PASS = requireEnvVar(process.env.NTFY_PASS, 'NTFY_PASS');
