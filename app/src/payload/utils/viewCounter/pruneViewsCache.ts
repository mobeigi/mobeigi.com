import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@payload-config';
import { lt } from 'drizzle-orm';

import { EXPIRY_IN_MS } from './constants';

/**
 * Prunes the views cache by removing entries that are older than the specified expiration time.
 *
 * @returns {Promise<void>} A promise that resolves when the pruning operation is complete.
 */
export const pruneViewsCache = async (): Promise<void> => {
  const payload = await getPayloadHMR({
    config,
  });
  const postsViewsCacheTable = payload.db.tables.posts_views_cache;
  const thresholdDate = new Date(Date.now() - EXPIRY_IN_MS);
  await payload.db.drizzle.delete(postsViewsCacheTable).where(lt(postsViewsCacheTable.timestamp, thresholdDate));
};
