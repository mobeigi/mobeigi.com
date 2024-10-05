import { Metadata } from 'next';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@payload-config';
import BlogPost from '@/containers/BlogPost';
import { notFound } from 'next/navigation';
import { BlogPostProps } from '@/containers/BlogPost';
import { BlogPostContent, BlogPostMeta, BlogPostRelatedMeta } from '@/types/blog';
import { mapPostToPostMeta, mapComments, getCategorySlugUrl } from '@/utils/payload';
import { countTotalComments } from '@/utils/blog/comments';
import { joinUrl } from '@/utils/url';
import Breadcrumbs from '@/components/Breadcrumbs';
import { payloadRedirect } from '@/payload/utils/payloadRedirect';
import { registerView } from '@/payload/utils/viewCounter';
import { headers } from 'next/headers';
import { generateBreadcrumbs } from './breadcrumbs';
import { Post as PayloadPost, Category as PayloadCategory } from '@/payload-types';

const depth = 2;

const getPayloadPostFromParams = async ({ params }: { params: { slug: string[] } }): Promise<PayloadPost | null> => {
  const payload = await getPayloadHMR({
    config,
  });

  const postSlug = params.slug[params.slug.length - 1];
  const categorySlugs = params.slug.slice(0, -1);

  if (categorySlugs.length === 0) {
    return null;
  }

  const paramsCategorySlugUrl = joinUrl(['/', ...categorySlugs], false);

  const payloadPosts = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: postSlug },
      _status: { equals: 'published' },
    },
    depth,
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
};

export const generateMetadata = async ({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> => {
  const params = await paramsPromise;

  await payloadRedirect({ currentUrl: joinUrl(['/', 'blog', ...params.slug]) });

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

const BlogPostHandler = async ({ params: paramsPromise }: { params: Promise<{ slug: string[] }> }) => {
  const params = await paramsPromise;

  await payloadRedirect({ currentUrl: joinUrl(['/', 'blog', ...params.slug]) });

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

  // Register post views
  const headerList = await headers();
  const ipAddress = headerList.get('x-forwarded-for');
  const userAgent = headerList.get('user-agent');
  if (ipAddress && userAgent) {
    void registerView({ postId: post.id, ipAddress, userAgent });
  }

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

/**
 * Transforms a Post to a BlogPostProps object
 */
const transformPostToBlogPostProps = async (post: PayloadPost): Promise<BlogPostProps | null> => {
  const postMeta = mapPostToPostMeta(post);
  if (!postMeta) {
    console.warn('postMeta should not be null.');
    return null;
  }

  const content: BlogPostContent = {
    body: post.content,
  };

  const payload = await getPayloadHMR({
    config,
  });

  const comments = await payload.find({
    collection: 'comments',
    where: {
      post: { equals: post.id },
    },
    depth,
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
};

export default BlogPostHandler;
