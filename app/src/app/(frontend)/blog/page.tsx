import BlogPage from '@/containers/BlogPage';
import { Metadata } from 'next';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@payload-config';
import { mapPostToPostMeta } from '@/utils/payload';
import { BlogPostMeta, BlogPostRelatedMeta } from '@/types/blog';
import { sortBlogPostMetaByPublishedAtDate } from '@/utils/blog/post';

export const metadata: Metadata = {
  title: 'Blog',
  description: "Explore Mo's blog for insights on programming, technology, and other topics of interest.",
};

const depth = 2;

const BlogPageHandler = async () => {
  const payload = await getPayloadHMR({
    config,
  });

  const posts = await payload.find({
    collection: 'posts',
    depth,
    limit: 0, // no limit so we can retreive all posts
  });

  const blogPostMetas = (
    await Promise.all(
      posts.docs.map(async (post) => {
        const postMeta = mapPostToPostMeta(post);
        if (!postMeta) {
          console.warn('postMeta should not be null.');
          return null;
        }
        const commentCount = await payload.count({
          collection: 'comments',
          where: { post: { equals: post.id } },
          depth,
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

  return <BlogPage blogPostMetas={blogPostMetas} />;
};

export default BlogPageHandler;
