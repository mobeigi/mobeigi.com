import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@payload-config';
import { parseISO, differenceInMilliseconds } from 'date-fns';
import { sql, and, eq } from 'drizzle-orm';
import ObjectID from 'bson-objectid';
import { EXPIRY_IN_MS } from './constants';
import { isCrawler } from './isCrawler';
import { RegisterViewProps } from './types';

export const isCachedViewExpired = (timestamp: string): boolean => {
  const parsedTimestamp = parseISO(timestamp);
  const differenceInMs = differenceInMilliseconds(new Date(), parsedTimestamp);
  return differenceInMs > EXPIRY_IN_MS;
};

export const registerView = async ({ postId, ipAddress, userAgent }: RegisterViewProps): Promise<void> => {
  // Don't register views for crawlers
  if (isCrawler(userAgent)) {
    return;
  }

  const payload = await getPayloadHMR({
    config,
  });

  // Assert doc existance
  const payloadPosts = await payload.count({
    collection: 'posts',
    where: {
      id: { equals: postId },
    },
    depth: 1,
  });

  if (payloadPosts.totalDocs !== 1) {
    console.error(`registerView: Cannot find doc with id: ${postId}`);
    return;
  }

  // Check for entry in viewsCache
  const postsViewsCacheTable = payload.db.tables.posts_views_cache;

  const viewsCacheResults = await payload.db.drizzle
    .select()
    .from(postsViewsCacheTable)
    .where(and(eq(postsViewsCacheTable._parentID, postId), eq(postsViewsCacheTable.ipAddress, ipAddress)))
    .limit(1);

  if (viewsCacheResults.length === 1) {
    const viewsCacheResult = viewsCacheResults[0];

    // If cached view is not expired, we should not register this view
    if (!isCachedViewExpired(viewsCacheResult.timestamp)) {
      return;
    }

    const newViewsCacheEntry = {
      ...viewsCacheResult,
      timestamp: new Date().toISOString(),
    };

    // Update existing entry with new expiry timestamp
    await payload.db.drizzle
      .update(postsViewsCacheTable)
      .set(newViewsCacheEntry)
      .where(eq(postsViewsCacheTable.id, viewsCacheResult.id));
  } else {
    const newViewsCacheEntry = {
      _order: 1, // TODO: Can we remove this entirely, since we don't care or use this ordering
      _parentID: postId,
      id: new ObjectID().toHexString(),
      ipAddress: ipAddress,
      timestamp: new Date().toISOString(),
    };

    // Insert new entry into views cache
    await payload.db.drizzle.insert(postsViewsCacheTable).values(newViewsCacheEntry);
  }

  // Register the view
  await payload.db.drizzle
    .update(payload.db.tables.posts)
    .set({
      views: sql`${payload.db.tables.posts.views} + 1`,
    })
    .where(eq(payload.db.tables.posts.id, postId));
};
