'use server';
// This is only needed because the 'link' ReactNode converter for lexical relies on server side lookups.

import { Category, Post } from '@/payload-types';
import { CollectionSlug, DataFromCollectionSlug } from 'payload';
import { getCategorySlugComponents } from '@payload/collections/Category/resolveUrl';
import { joinUrl } from '@/utils/url';
import { getCachedDocumentById } from '@/payload/utils/docs';

export const resolvePostsUrl = async (doc: DataFromCollectionSlug<CollectionSlug>): Promise<string | null> => {
  const post = doc as Post;
  if (!post.category || !post.slug) {
    return null;
  }

  let category: Category;
  if (typeof post.category === 'number') {
    const cachedCategory = await getCachedDocumentById('category', post.category);
    if (!cachedCategory) {
      return null;
    }
    category = cachedCategory as Category;
  } else {
    category = post.category;
  }

  const categorySlugComponents = getCategorySlugComponents(category);
  if (!categorySlugComponents || categorySlugComponents.length === 0) {
    return null;
  }
  return joinUrl(['/blog', ...categorySlugComponents, post.slug]);
};
