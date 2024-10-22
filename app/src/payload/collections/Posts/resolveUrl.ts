import { Category, Post } from '@/payload-types';
import { CollectionSlug, DataFromCollectionSlug } from 'payload';
import { getCategorySlugComponents } from '@payload/collections/Category/resolveUrl';
import { joinUrl } from '@/utils/url';

export const resolvePostsUrl = (doc: DataFromCollectionSlug<CollectionSlug>): string | null => {
  const post = doc as Post;
  if (!post.category || !post.slug) {
    return null;
  }

  let category: Category;
  if (typeof post.category === 'number') {
    return null;
  } else {
    category = post.category;
  }

  const categorySlugComponents = getCategorySlugComponents(category);
  if (!categorySlugComponents || categorySlugComponents.length === 0) {
    return null;
  }
  return joinUrl(['/blog', ...categorySlugComponents, post.slug]);
};
