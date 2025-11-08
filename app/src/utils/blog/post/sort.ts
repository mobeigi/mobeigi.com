import { BlogPostMeta } from '@/types/blog';

export const sortBlogPostMetaByPublishedAtDate = (a: BlogPostMeta, b: BlogPostMeta) =>
  b.post.publishedAt.getTime() - a.post.publishedAt.getTime();

export const sortBlogPostMetaByViews = (a: BlogPostMeta, b: BlogPostMeta) => b.post.views - a.post.views;
