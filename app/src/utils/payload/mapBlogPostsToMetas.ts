import { Category, Post } from '@/payload-types';
import { BlogPostMeta, Breadcrumb } from '@/types/blog';

export const mapBlogPostsToMetas = (posts: Post[]): BlogPostMeta[] =>
  posts
    .map((post) => {
      if (!post.publishedAt || !post.category || !post.slug) {
        console.warn('Required blog post fields are not provided or are invalid.', post);
        return null;
      }

      const category = post.category as Category;
      const publishedAtDate = new Date(post.publishedAt);

      if (!category.breadcrumbs) {
        console.warn('Breadcrumbs cannot be absent.');
        return null;
      }

      const blogPostBreadcrumbs: Breadcrumb[] = category.breadcrumbs.map((breadcrumb) => ({
        title: breadcrumb.label!,
        slug: breadcrumb.url!.split('/').slice(-1)[0].replace('/', ''),
        url: breadcrumb.url!,
      }));

      const blogPostMeta: BlogPostMeta = {
        title: post.title,
        publishedAt: publishedAtDate,
        excerpt: post.excerpt,
        slug: post.slug,
        breadcrumbs: blogPostBreadcrumbs,
      };

      return blogPostMeta;
    })
    .filter((blogPostMeta) => blogPostMeta !== null)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
