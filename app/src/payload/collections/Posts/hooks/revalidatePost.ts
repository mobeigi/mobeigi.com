import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, PayloadRequest } from 'payload';
import { revalidatePath, revalidateTag } from 'next/cache';
import type { Post } from '@/payload-types';
import { resolvePostsUrl } from '../resolveUrl';
import { getDocByIdOrObject } from '@/utils/payload';
import { revalidateCategoryDetailPage } from '@payload/collections/Category/hooks/revalidateCategory';

export const revalidatePostPage = async (req: PayloadRequest, doc: Post) => {
  const postUrl = await resolvePostsUrl(doc);
  if (postUrl) {
    req.payload.logger.info(`Revalidating: ${postUrl}`);
    revalidatePath(postUrl);
  } else {
    req.payload.logger.error(`Failed revalidating post with id: ${doc.id}`);
  }
};

export const revalidatePost = async (req: PayloadRequest, doc: Post) => {
  if (doc._status === 'published') {
    req.payload.logger.info(`Revalidating all paths for post with id: ${doc.id}`);

    // TODO: Avoid hard coding collection name while also avoiding cycling import issue
    req.payload.logger.info(`Revalidating tag: payload:collection:posts:${doc.id}`);
    revalidateTag(`payload:collection:posts:${doc.id}`);

    req.payload.logger.info(`Revalidating: /`);
    revalidatePath('/');

    req.payload.logger.info(`Revalidating: /blog/`);
    revalidatePath('/blog/');

    const docCategory = await getDocByIdOrObject(req, 'category', doc.category);
    if (!docCategory) {
      req.payload.logger.error(`Failed getting category doc for post with id: ${doc.id}`);
      return;
    }

    // Category
    revalidateCategoryDetailPage(req, docCategory);

    // Blog post
    const docWithCategory: Post = {
      ...doc,
      category: docCategory,
    };
    await revalidatePostPage(req, docWithCategory);

    // Revalidate the last published post if it exists.
    // This version is used instead of 'previousDoc' which may not be the last published version.
    const lastPublishedVersion = await req.payload.findVersions({
      collection: 'posts',
      where: {
        parent: { equals: doc.id },
        version___status: { equals: 'published' },
      },
      depth: 1,
      limit: 2,
      sort: '-updatedAt', // Sort by most recent updatedAt
      req, // passthrough req
    });

    // The current published post at index 0 is this current 'doc'.
    // The 2nd most recent published post is thus our 'last published post'.
    if (lastPublishedVersion.totalDocs >= 2) {
      const lastPublishedDoc = lastPublishedVersion.docs[1].version;
      const lastPublishedDocCategory = await getDocByIdOrObject(req, 'category', lastPublishedDoc.category);

      if (lastPublishedDocCategory) {
        // Previous category
        revalidateCategoryDetailPage(req, lastPublishedDocCategory);

        // Previous blog post
        await revalidatePostPage(req, lastPublishedDoc);
      } else {
        req.payload.logger.error(`Failed getting last published doc category for post with id: ${lastPublishedDoc.id}`);
      }
    }
  }
};

export const revalidatePostAfterChange: CollectionAfterChangeHook<Post> = async ({ doc, previousDoc, req }) => {
  if (doc._status === 'published') {
    await revalidatePost(req, doc);
  }

  // If the post was previously published but it no longer is, we need to revalidate the old paths
  if (previousDoc._status === 'published' && doc._status !== 'published') {
    await revalidatePost(req, previousDoc);
  }

  return doc;
};

export const revalidatePostAfterDelete: CollectionAfterDeleteHook<Post> = async ({ doc, req }) => {
  if (doc._status === 'published') {
    await revalidatePost(req, doc);
  }
  return doc;
};
