import HomePage from '@/containers/HomePage';
import { getPayload } from 'payload';
import config from '@payload-config';
import { mapPostToPostMeta } from '@/utils/payload/server';
import { BlogPostMeta, BlogPostRelatedMeta } from '@/types/blog';
import { sortBlogPostMetaByPublishedAtDate } from '@/utils/blog/post';
import { generateBreadcrumbs } from './breadcrumbs';
import { getCachedLatestPhotographyImages } from '@/utils/photography';
import { getCachedLatestDevelopmentActivity } from '@/utils/github';

export const revalidate = 900;

const Home = async () => {
  const payload = await getPayload({
    config,
  });

  const posts = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    depth: 1,
    limit: 3,
    pagination: false,
    sort: '-publishedAt',
  });

  const blogPostMetas = (
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

  const breadcrumbs = generateBreadcrumbs();
  const latestDevelopmentActivity = (await getCachedLatestDevelopmentActivity()) ?? undefined;
  const latestPhotographyImages = (await getCachedLatestPhotographyImages()) ?? undefined;

  return (
    <div>
      {breadcrumbs && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
        </>
      )}
      <HomePage
        latestBlogPostMetas={blogPostMetas}
        latestDevelopmentActivity={latestDevelopmentActivity}
        latestPhotographyImages={latestPhotographyImages}
      />
    </div>
  );
};

export default Home;
