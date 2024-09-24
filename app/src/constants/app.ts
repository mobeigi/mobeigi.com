import { requireEnvVar } from '@/utils/env';

export const BASE_URL = requireEnvVar(process.env.NEXT_PUBLIC_BASE_URL, 'NEXT_PUBLIC_BASE_URL');
export const SITE_TITLE = requireEnvVar(process.env.NEXT_PUBLIC_SITE_TITLE, 'NEXT_PUBLIC_SITE_TITLE');
export const TAGLINE = requireEnvVar(process.env.NEXT_PUBLIC_TAGLINE, 'NEXT_PUBLIC_TAGLINE');

export const COPYRIGHT_START_YEAR = 2012;
