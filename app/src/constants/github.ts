import { requireEnvVar } from '@/utils/env';

export const GITHUB_USERNAME = requireEnvVar(process.env.GITHUB_USERNAME, 'GITHUB_USERNAME');

export const GITHUB_PERSONAL_ACCESS_KEY = requireEnvVar(
  process.env.GITHUB_PERSONAL_ACCESS_KEY,
  'GITHUB_PERSONAL_ACCESS_KEY',
);
