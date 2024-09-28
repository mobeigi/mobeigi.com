import { Post, Category } from '@/payload-types';
import { Metadata } from 'next';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@payload-config';
import BlogPost from '@/containers/BlogPost';
import { notFound } from 'next/navigation';
import { BlogPostProps } from '@/containers/BlogPost';
import { BlogPostContent, BlogPostMeta, BlogPostRelatedMeta } from '@/types/blog';
import { mapPostToPostMeta, mapComments } from '@/utils/payload';
import { countTotalComments } from '@/utils/blog/comments';
import { generateBreadcrumbs as generateParentBreadcrumbs } from '../page';
import { joinUrl } from '@/utils/url';
import { appendItem } from '@/utils/seo/breadCrumbList';
import { getLastItemId } from '@/utils/seo/listItem';
import { BreadcrumbList, ListItem, WithContext } from 'schema-dts';
import Breadcrumbs from '@/components/Breadcrumbs';
import { payloadRedirect } from '@/payload/utils/payloadRedirect';
import { registerView } from '@/payload/utils/viewCounter';
import { headers } from 'next/headers';

const depth = 2;

export const getPostFromResolvedParams = async ({
  resolvedParams,
}: {
  resolvedParams: { slug: string[] };
}): Promise<Post | null> => {
  const payload = await getPayloadHMR({
    config,
  });

  const postSlug = resolvedParams.slug[resolvedParams.slug.length - 1];
  const categorySlugs = resolvedParams.slug.slice(0, -1);

  if (categorySlugs.length === 0) {
    return null;
  }

  const paramsCategorySlugUrl = buildCategorySlugUrl(categorySlugs);

  const posts = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: postSlug },
      _status: { equals: 'published' },
    },
    depth,
  });

  if (!posts.docs.length) {
    return null;
  }

  // Ensure category slug urls match
  // We want to only show the blog post if the slug is correct
  const postsMatchingCategorySlugUrl = posts.docs.filter((post) => {
    if (!post.category) return false;
    const category = post.category as Category;
    const categorySlugUrl = getCategorySlugUrl(category);
    return categorySlugUrl === paramsCategorySlugUrl;
  });

  if (postsMatchingCategorySlugUrl.length !== 1) {
    return null;
  }

  return postsMatchingCategorySlugUrl[0];
};

const buildCategorySlugUrl = (categorySlugs: string[]): string => {
  return '/' + categorySlugs.join('/');
};

const getCategorySlugUrl = (category: Category): string | null => {
  if (!category) return null;

  const breadcrumbs = category.breadcrumbs;
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
  if (lastBreadcrumb.url === null || lastBreadcrumb.url === undefined) {
    return null;
  }
  return lastBreadcrumb.url;
};

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> => {
  const resolvedParams = await params;

  await payloadRedirect({ currentUrl: joinUrl(['/', 'blog', ...resolvedParams.slug]) });

  const post = await getPostFromResolvedParams({ resolvedParams });
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

export const generateBreadcrumbs = (post: Post): WithContext<BreadcrumbList> | null => {
  if (!post || !post.slug) {
    return null;
  }

  const breadcrumbList = generateParentBreadcrumbs();
  if (!breadcrumbList) {
    return null;
  }
  const lastItemId = getLastItemId(breadcrumbList.itemListElement as ListItem[]);
  if (!lastItemId) {
    return null;
  }

  // Add category part
  const category = post.category as Category;
  category.breadcrumbs?.forEach((breadcrumb) => {
    appendItem({
      breadcrumbList: breadcrumbList,
      id: joinUrl([lastItemId, 'category', breadcrumb.url!]),
      name: breadcrumb.label!,
    });
  });

  // Add post part
  const categorySlugUrl = getCategorySlugUrl(category);
  if (!categorySlugUrl) {
    return null;
  }
  appendItem({
    breadcrumbList: breadcrumbList,
    id: joinUrl([lastItemId, categorySlugUrl, post.slug]),
    name: post.title,
  });

  return breadcrumbList;
};

const BlogPostHandler = async ({ params }: { params: Promise<{ slug: string[] }> }) => {
  const resolvedParams = await params;

  await payloadRedirect({ currentUrl: joinUrl(['/', 'blog', ...resolvedParams.slug]) });

  const post = await getPostFromResolvedParams({ resolvedParams });
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
const transformPostToBlogPostProps = async (post: Post): Promise<BlogPostProps | null> => {
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
