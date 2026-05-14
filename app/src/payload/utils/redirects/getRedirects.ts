import config from '@payload-config';
import { getPayload } from 'payload';
import { cacheLife, cacheTag } from 'next/cache';

export const getRedirects = async () => {
  const payload = await getPayload({
    config,
  });

  const { docs: redirects } = await payload.find({
    collection: 'redirects',
    depth: 1,
    limit: 0,
    pagination: false,
  });

  return redirects;
};

/**
 * Cache all redirects together to avoid multiple fetches.
 */
export const getCachedRedirects = async () => {
  'use cache';
  cacheLife('cacheUntilInvalidated');
  cacheTag('payload', 'redirects');

  return getRedirects();
};
