import getNextEnv from '@/utils/getNextEnv';

export const BASE_URL = getNextEnv('NEXT_PUBLIC_BASE_URL');
export const SITE_TITLE = getNextEnv('NEXT_PUBLIC_SITE_TITLE');
export const TAGLINE = getNextEnv('NEXT_PUBLIC_TAGLINE');

export const COPYRIGHT_START_YEAR = 2012;
