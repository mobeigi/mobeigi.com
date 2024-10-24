import type { CollectionSlug, DataFromCollectionSlug } from 'payload';
import { resolvePostsUrl } from '@payload/collections/Posts/resolveUrl';
import { resolveCategoryUrl } from '@payload/collections/Category/resolveUrl';
import { resolveCommentsUrl } from '@payload/collections/Comments/resolveUrl';

/**
 * Define custom URL resolver functions.
 * Each collection type should have its own resolver function.
 */
export const customUrlResolvers: Record<
  CollectionSlug,
  (doc: DataFromCollectionSlug<CollectionSlug>) => Promise<string | null>
> = {
  posts: async (doc) => await resolvePostsUrl(doc),
  category: (doc) => Promise.resolve(resolveCategoryUrl(doc)),
  comments: async (doc) => await resolveCommentsUrl(doc),
  users: () => {
    throw new Error('Function not implemented.');
  },
  media: () => {
    throw new Error('Function not implemented.');
  },
  files: () => {
    throw new Error('Function not implemented.');
  },
  'private-files': () => {
    throw new Error('Function not implemented.');
  },
  redirects: () => {
    throw new Error('Function not implemented.');
  },
  'payload-preferences': () => {
    throw new Error('Function not implemented.');
  },
  'payload-migrations': () => {
    throw new Error('Function not implemented.');
  },
  'payload-locked-documents': () => {
    throw new Error('Function not implemented.');
  },
};
