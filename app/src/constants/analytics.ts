import { requireEnvVar } from '@/utils/env';

export const GA_TAG_ID = requireEnvVar(process.env.NEXT_PUBLIC_GA_TAG_ID, 'NEXT_PUBLIC_GA_TAG_ID');
