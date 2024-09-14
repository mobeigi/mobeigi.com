import { Category as PayloadCategory, Post as PayloadPost } from '@/payload-types';
import { resolveCategoryUrl } from '@/payload/collections/Category/resolveUrl';
import { resolvePostsUrl } from '@/payload/collections/Posts/resolveUrl';
import { BlogPostMeta, Breadcrumb, Category } from '@/types/blog';

/**
 * Maps Payload blog posts to meta.
 */
export const mapBlogPostToMeta = (payloadPost: PayloadPost): BlogPostMeta | null => {
  if (!payloadPost.publishedAt || !payloadPost.category || !payloadPost.slug) {
    console.warn('Required blog post fields are not provided or are invalid.', payloadPost);
    return null;
  }

  const payloadCategory = payloadPost.category as PayloadCategory;
  const publishedAtDate = new Date(payloadPost.publishedAt);

  if (!payloadCategory.breadcrumbs) {
    console.warn('Breadcrumbs cannot be absent.');
    return null;
  }

  // TODO: Is this even used? Remove if not.
  const blogPostBreadcrumbs: Breadcrumb[] = payloadCategory.breadcrumbs.map((breadcrumb) => ({
    title: breadcrumb.label!,
    slug: breadcrumb.url!.split('/').slice(-1)[0].replace('/', ''),
    url: breadcrumb.url!,
  }));

  const categoryUrl = resolveCategoryUrl(payloadCategory);
  if (!categoryUrl) {
    return null;
  }

  const category: Category = {
    title: payloadCategory.title,
    description: payloadCategory.description,
    url: categoryUrl,
  };

  const blogPostUrl = resolvePostsUrl(payloadPost);
  if (!blogPostUrl) {
    return null;
  }

  const blogPostMeta: BlogPostMeta = {
    id: payloadPost.id,
    title: payloadPost.title,
    publishedAt: publishedAtDate,
    excerpt: payloadPost.excerpt,
    slug: payloadPost.slug,
    breadcrumbs: blogPostBreadcrumbs,
    url: blogPostUrl,
    category: category,
  };

  return blogPostMeta;
};

export const mapBlogPostsToMetas = (payloadPosts: PayloadPost[]): BlogPostMeta[] =>
  payloadPosts
    .map(mapBlogPostToMeta)
    .filter((blogPostMeta) => blogPostMeta !== null)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
