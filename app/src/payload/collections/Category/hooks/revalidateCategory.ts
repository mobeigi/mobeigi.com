import { Category, Post } from '@/payload-types';
import { CollectionAfterChangeHook, CollectionAfterDeleteHook, PayloadRequest } from 'payload';
import { getDocByIdOrObject } from '@/utils/payload';
import { revalidatePath } from 'next/cache';
import { resolveCategoryUrl } from '../resolveUrl';
import { revalidatePost } from '@/payload/collections/Posts/hooks/revalidatePost';

export const revalidateCategoryDetailPage = (req: PayloadRequest, doc: Category) => {
  const categoryUrl = resolveCategoryUrl(doc);
  if (categoryUrl) {
    req.payload.logger.info(`Revalidating: ${categoryUrl}`);
    revalidatePath(categoryUrl);
  } else {
    req.payload.logger.error(`Failed revalidating category with id: ${doc.id}`);
  }
};

export const revalidateCategory = async (req: PayloadRequest, doc: Category) => {
  req.payload.logger.info(`Revalidating all paths for category with id: ${doc.id}`);

  req.payload.logger.info(`Revalidating: /`);
  revalidatePath('/');

  req.payload.logger.info(`Revalidating: /blog/`);
  revalidatePath('/blog/');

  req.payload.logger.info(`Revalidating: /blog/category/`);
  revalidatePath('/blog/category/');

  // Category
  revalidateCategoryDetailPage(req, doc);

  // Parent category
  const parentCategoryDoc = await getDocByIdOrObject(req, 'category', doc.parent);
  if (parentCategoryDoc) {
    revalidateCategoryDetailPage(req, parentCategoryDoc);
  }

  // Blog posts under this category
  const postsInCategory = await req.payload.find({
    collection: 'posts',
    where: { category: { equals: doc.id } },
    depth: 1,
    limit: 0,
    pagination: false,
    req, // passthrough req
  });

  for (const post of postsInCategory.docs) {
    // We patch this post with the current category
    // This is needed because otherwise the category for the post would always be the latest category from the database (post changes)
    // And we want to invalidate the current category provided as the argument to this function only
    const postWithCategoryDoc: Post = {
      ...post,
      category: doc,
    };
    await revalidatePost(req, postWithCategoryDoc);
  }
};

// Note: Since we use the nestedDocs plugin for this collection, changing one category will trigger a change in all child categories.
// This means this function will be called for all child categories if a single category is changed.
// Our implementation of revalidateCategory takes this into account.
export const revalidateCategoryAfterChange: CollectionAfterChangeHook<Category> = async ({ doc, previousDoc, req }) => {
  await revalidateCategory(req, doc);

  // TODO: Is this the best way to check for previousDoc being present?
  // This is needed because it seems previousDoc is an empty object if it doesn't exist (for 'create' operation or first version of doc)
  if (previousDoc && Object.keys(previousDoc).length !== 0) {
    await revalidateCategory(req, previousDoc);
  }
  return doc;
};

export const revalidateCategoryAfterDelete: CollectionAfterDeleteHook<Category> = async ({ doc, req }) => {
  await revalidateCategory(req, doc);
  return doc;
};
