import BlogPage from '@/containers/BlogPage';
import { Metadata } from 'next';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@payload-config';
import { mapBlogPostsToMetas } from '@/utils/payload';

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

  const blogPostMetas = mapBlogPostsToMetas(posts.docs);
  return <BlogPage blogPostMetas={blogPostMetas} />;
};

export default BlogPageHandler;
