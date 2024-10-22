import { unstable_cache_safe } from '@/utils/next';
import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';

export const getRedirects = async () => {
  const payload = await getPayloadHMR({
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
export const getCachedRedirects = unstable_cache_safe(async () => getRedirects(), ['redirects'], {
  tags: ['redirects'],
});
