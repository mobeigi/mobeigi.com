import HomePage from '@/containers/HomePage';
import { getCachedLatestPhotographyImages } from '@/utils/photography';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@payload-config';
import { mapPostToPostMeta } from '@/utils/payload';
import { BlogPostMeta, BlogPostRelatedMeta } from '@/types/blog';
import { sortBlogPostMetaByPublishedAtDate } from '@/utils/blog/post';
import { generateBreadcrumbs } from './breadcrumbs';

const depth = 2;

const Home = async () => {
  const payload = await getPayloadHMR({
    config,
  });

  const posts = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    depth,
    limit: 3,
    pagination: false,
    sort: '-publishedAt',
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

  const breadcrumbs = generateBreadcrumbs();
  const latestPhotographyImages = (await getCachedLatestPhotographyImages()) ?? undefined;

  return (
    <div>
      {breadcrumbs && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
        </>
      )}
      <HomePage latestBlogPostMetas={blogPostMetas} latestPhotographyImages={latestPhotographyImages} />
    </div>
  );
};

export default Home;
