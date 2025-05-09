import BlogPage from '@/containers/BlogPage';
import { Metadata } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';
import { mapPostToPostMeta } from '@/utils/payload/server';
import { BlogPostMeta, BlogPostRelatedMeta } from '@/types/blog';
import { sortBlogPostMetaByPublishedAtDate } from '@/utils/blog/post';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateBreadcrumbs } from './breadcrumbs';
import { unstable_cacheLife as cacheLife } from 'next/cache';

/**
 * Data fetching
 */

const getAllBlogPostMetas = async () => {
  'use cache';
  cacheLife('alwaysCheck15m');

  const payload = await getPayload({
    config,
  });

  const posts = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    depth: 1,
    limit: 0,
    pagination: false,
  });

  return (
    await Promise.all(
      posts.docs.map(async (post) => {
        const postMeta = await mapPostToPostMeta(post);
        if (!postMeta) {
          console.warn('postMeta should not be null.');
          return null;
        }
        const commentCount = await payload.count({
          collection: 'comments',
          where: { post: { equals: post.id } },
        });

        const relatedMeta: BlogPostRelatedMeta = {
          commentCount: commentCount.totalDocs,
        };

        const blogPostMeta: BlogPostMeta = {
          post: postMeta,
          related: relatedMeta,
        };

        return blogPostMeta;
      }),
    )
  )
    .filter((obj) => obj !== null)
    .sort(sortBlogPostMetaByPublishedAtDate);
};

/**
 * Metadata
 */
export const metadata: Metadata = {
  title: 'Blog',
  description: "Explore Mo's blog for insights on programming, technology, and other topics of interest.",
};

/**
 * Handler
 */
const BlogPageHandler = async () => {
  const blogPostMetas = await getAllBlogPostMetas();

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div>
      {breadcrumbs && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
          <Breadcrumbs breadcrumbList={breadcrumbs} />
        </>
      )}
      <BlogPage blogPostMetas={blogPostMetas} />
    </div>
  );
};

export default BlogPageHandler;
