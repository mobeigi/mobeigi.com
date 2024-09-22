import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@payload-config';
import { parseISO, differenceInMinutes } from 'date-fns';
import { sql, and, eq } from 'drizzle-orm';
import ObjectID from 'bson-objectid';
import crawlerUserAgents from 'crawler-user-agents';

const EXPIRY_IN_MINUTES = 1440;

export const isCachedViewExpired = (timestamp: string): boolean => {
  const parsedTimestamp = parseISO(timestamp);
  const minuteDifference = differenceInMinutes(new Date(), parsedTimestamp);
  return minuteDifference > EXPIRY_IN_MINUTES;
};

interface RegisterViewProps {
  postId: number;
  ipAddress: string;
  userAgent: string;
}

// TODO: need a function or cron to prune old entries regularly

export const isCrawler = (userAgent: string): boolean => {
  return crawlerUserAgents.some((crawler) => {
    const crawlerPattern = new RegExp(crawler.pattern, 'i'); // case insensitive match
    return crawlerPattern.test(userAgent);
  });
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
