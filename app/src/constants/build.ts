import { requireEnvVar } from '@/utils/env';

export const COMMIT_HASH = requireEnvVar(process.env.COMMIT_HASH, 'COMMIT_HASH');
