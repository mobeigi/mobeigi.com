import { unstable_cache_safe } from '@/utils/next';
import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';

export const getRedirects = async (depth = 1) => {
  const payload = await getPayloadHMR({
    config,
  });

  const { docs: redirects } = await payload.find({
    collection: 'redirects',
    depth,
    limit: 0,
    pagination: false,
  });

  return redirects;
};

/**
 * Returns a unstable_cache function mapped with the cache tag for 'redirects'.
 *
 * Cache all redirects together to avoid multiple fetches.
 */
// TODO: Should this be a function or just directly equal unstable_cache
export const getCachedRedirects = () =>
  unstable_cache_safe(async () => getRedirects(), ['redirects'], {
    tags: ['redirects'],
  });
