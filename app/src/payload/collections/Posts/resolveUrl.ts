import { Category, Post } from '@/payload-types';
import { CollectionSlug, DataFromCollectionSlug } from 'payload';
import { getCategorySlugComponents } from '@payload/collections/Category/resolveUrl';

export const resolvePostsUrl = (doc: DataFromCollectionSlug<CollectionSlug>) => {
  const post = doc as Post;
  if (!post.category || !post.slug) {
    return null;
  }
  const category = post.category as Category;
  const categorySlugComponents = getCategorySlugComponents(category);
  if (!categorySlugComponents || categorySlugComponents.length === 0) {
    return null;
  }
  const postUrl = ['/blog', ...categorySlugComponents, post.slug].join('/');
  return postUrl;
};
