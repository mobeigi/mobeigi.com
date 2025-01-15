import { Metadata } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';
import BlogPost from '@/containers/BlogPost';
import { notFound } from 'next/navigation';
import { BlogPostProps } from '@/containers/BlogPost';
import { BlogPostContent, BlogPostMeta, BlogPostRelatedMeta } from '@/types/blog';
import { mapPostToPostMeta, mapComments, getCategorySlugUrl } from '@/utils/payload';
import { countTotalComments } from '@/utils/blog/comments';
import { joinUrl } from '@/utils/url';
import Breadcrumbs from '@/components/Breadcrumbs';
import { payloadRedirect } from '@/payload/utils/redirects';
import { generateBreadcrumbs } from './breadcrumbs';
import { Post as PayloadPost, Category as PayloadCategory } from '@/payload-types';
import { resolvePostsUrl } from '@/payload/collections/Posts/resolveUrl';
import { unstable_cache_safe } from '@/utils/next';

export const revalidate = 900;

/**
 * Data fetching
 */
const getPayloadPostFromParams = ({ params }: { params: { slug: string[] } }) =>
  unstable_cache_safe(
    async (): Promise<PayloadPost | null> => {
      const payload = await getPayload({
        config,
      });

      const postSlug = params.slug[params.slug.length - 1];
      const categorySlugs = params.slug.slice(0, -1);

      if (categorySlugs.length === 0) {
        return null;
      }

      const paramsCategorySlugUrl = joinUrl([...categorySlugs], false);

      const payloadPosts = await payload.find({
        collection: 'posts',
        where: {
          slug: { equals: postSlug },
          _status: { equals: 'published' },
        },
        depth: 1,
      });

      if (!payloadPosts.docs.length) {
        return null;
      }

      // Ensure category slug urls match
      // We want to only show the blog post if the slug is correct
      const postsMatchingCategorySlugUrl = payloadPosts.docs.filter((post) => {
        if (!post.category) return false;
        const payloadCategory = post.category as PayloadCategory;
        const categorySlugUrl = getCategorySlugUrl(payloadCategory);
        return categorySlugUrl === paramsCategorySlugUrl;
      });

      if (postsMatchingCategorySlugUrl.length !== 1) {
        return null;
      }

      return postsMatchingCategorySlugUrl[0];
    },
    [`get-payload-post-from-params-${params.slug.join('-')}`],
    { revalidate: revalidate },
  )();

/**
 * Transforms a Post to a BlogPostProps object
 */
const transformPostToBlogPostProps = (post: PayloadPost) =>
  unstable_cache_safe(
    async (): Promise<BlogPostProps | null> => {
      const postMeta = await mapPostToPostMeta(post);
      if (!postMeta) {
        console.warn('postMeta should not be null.');
        return null;
      }

      const content: BlogPostContent = {
        body: post.content,
      };

      const payload = await getPayload({
        config,
      });

      const comments = await payload.find({
        collection: 'comments',
        where: {
          post: { equals: post.id },
        },
        depth: 1,
        limit: 0,
        pagination: false,
      });

      const mappedComments = await mapComments(comments.docs);

      const relatedMeta: BlogPostRelatedMeta = {
        commentCount: countTotalComments(mappedComments),
      };

      const meta: BlogPostMeta = {
        post: postMeta,
        related: relatedMeta,
      };

      const blogPostProps: BlogPostProps = {
        meta,
        content,
        comments: mappedComments,
      };

      return blogPostProps;
    },
    [`transformPostToBlogPostProps-${post.id}`],
    { revalidate: revalidate },
  )();

/**
 * Metadata
 */
export const generateMetadata = async ({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> => {
  const params = await paramsPromise;

  await payloadRedirect({ currentUrl: joinUrl(['blog', ...params.slug]) });

  const post = await getPayloadPostFromParams({ params });
  if (!post) {
    console.warn('Failed to find post during generateMetadata.');
    notFound();
  }

  const seoData = post.meta;
  const fallbackTitle = post.title;
  const fallbackDescription = post.excerpt;

  return {
    title: seoData?.title || fallbackTitle,
    description: seoData?.description || fallbackDescription,
  };
};

/**
 * Static params
 */
export const generateStaticParams = async () => {
  const payload = await getPayload({
    config,
  });

  const payloadPosts = await payload.find({
    collection: 'posts',
    where: {
      _status: { equals: 'published' },
    },
    depth: 1,
    limit: 0,
    pagination: false,
  });

  return (
    await Promise.all(
      payloadPosts.docs.map(async (payloadPost) => {
        let resolvedPostsUrl = await resolvePostsUrl(payloadPost);
        if (!resolvedPostsUrl) {
          return null;
        }
        const stripPrefix = '/blog/';
        if (resolvedPostsUrl.startsWith(stripPrefix)) {
          resolvedPostsUrl = resolvedPostsUrl.slice(stripPrefix.length);
        }
        return {
          slug: resolvedPostsUrl.split('/'),
        };
      }),
    )
  ).filter((obj) => obj !== null);
};

/**
 * Handler
 */
const BlogPostHandler = async ({ params: paramsPromise }: { params: Promise<{ slug: string[] }> }) => {
  const params = await paramsPromise;

  await payloadRedirect({ currentUrl: joinUrl(['blog', ...params.slug]) });

  const post = await getPayloadPostFromParams({ params });
  if (!post) {
    notFound();
    return null;
  }
  const blogPostProps = await transformPostToBlogPostProps(post);
  if (!blogPostProps) {
    notFound();
    return null;
  }

  const breadcrumbs = generateBreadcrumbs(post);

  return (
    <div>
      {breadcrumbs && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
          <Breadcrumbs breadcrumbList={breadcrumbs} />
        </>
      )}
      <BlogPost {...blogPostProps} />
    </div>
  );
};

export default BlogPostHandler;
