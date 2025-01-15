// TODO: Type drizzle tables when types becomes available in Payload
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { getPayload } from 'payload';
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

/**
 * Registers a view for a post if it passes the validation checks.
 *
 * @param {RegisterViewProps} props - The properties required to register a view.
 * @param {string} props.postId - The ID of the post to register a view for.
 * @param {string} props.ipAddress - The IP address of the viewer.
 * @param {string} props.userAgent - The user agent string of the viewer.
 *
 * @returns {Promise<boolean>} True if the view was registered, false otherwise.
 */
export const registerView = async ({ postId, ipAddress, userAgent }: RegisterViewProps): Promise<boolean> => {
  if (isCrawler(userAgent)) {
    return false;
  }

  const payload = await getPayload({
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
    return false;
  }

  // Get entry in viewsCache
  // TODO: Type drizzle tables when types becomes available in Payload
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const postsViewsCacheTable = payload.db.tables.posts_views_cache;
  const viewsCacheResults = await payload.db.drizzle
    .select()
    .from(postsViewsCacheTable)
    .where(and(eq(postsViewsCacheTable._parentID, postId), eq(postsViewsCacheTable.ipAddress, ipAddress)))
    .limit(1);

  if (viewsCacheResults.length === 1) {
    const viewsCacheResult = viewsCacheResults[0];

    // TODO: Remove typecast when drizzle tables have type
    if (!isCachedViewExpired(viewsCacheResult.timestamp as string)) {
      return false;
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

    await payload.db.drizzle.insert(postsViewsCacheTable).values(newViewsCacheEntry);
  }

  // Register the view
  await payload.db.drizzle
    .update(payload.db.tables.posts)
    .set({
      views: sql`${payload.db.tables.posts.views} + 1`,
    })
    .where(eq(payload.db.tables.posts.id, postId));

  return true;
};
