import BlogPage from '@/containers/BlogPage';
import { Metadata } from 'next';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@payload-config';
import { Category, Post } from '@/payload-types';
import { BlogPostMeta, Breadcrumb } from '@/types/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: "Explore Mo's blog for insights on programming, technology, and other topics of interest.",
};

const depth = 2;

const Blog = async () => {
  const payload = await getPayloadHMR({
    config,
  });
  const posts = await payload.find({ collection: 'posts', depth });

  const blogPostMetas = posts.docs
    .map((post: Post) => {
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

  return <BlogPage blogPostMetas={blogPostMetas} />;
};

export default Blog;
