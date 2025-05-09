import CategoryDetailPage from '@/containers/CategoryDetailPage';
import { Metadata } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';
import { Category as PayloadCategory } from '@/payload-types';
import { notFound } from 'next/navigation';
import { mapPostToPostMeta } from '@/utils/payload/server';
import { BlogPostMeta, BlogPostRelatedMeta, Category } from '@/types/blog';
import { sortBlogPostMetaByPublishedAtDate } from '@/utils/blog/post';
import { joinUrl } from '@/utils/url';
import Breadcrumbs from '@/components/Breadcrumbs';
import { resolveCategoryUrl } from '@/payload/collections/Category/resolveUrl';
import { sortCategoryByTitle } from '@/utils/blog/category';
import { payloadRedirect } from '@/payload/utils/redirects';
import { generateBreadcrumbs } from './breadcrumbs';
import { unstable_cacheLife as cacheLife } from 'next/cache';

/**
 * Data fetching
 */
const getPayloadCategoryFromParams = async ({
  params,
}: {
  params: { slug: string[] };
}): Promise<PayloadCategory | null> => {
  'use cache';
  cacheLife('alwaysCheck15m');

  const payload = await getPayload({
    config,
  });

  const categorySlugs = params.slug;
  if (categorySlugs.length === 0) {
    return null;
  }

  const categorySlug = categorySlugs[categorySlugs.length - 1];
  const paramsCategorySlugUrl = joinUrl([...categorySlugs], false);

  // Find all categories matching the slug and breadcrumbs (filters by slug and URL but does not consider breadcrumb depth yet)
  const payloadCategory = await payload.find({
    collection: 'category',
    where: {
      slug: { equals: categorySlug },
      'breadcrumbs.url': {
        equals: paramsCategorySlugUrl,
      },
    },
    depth: 1,
    limit: 0,
    pagination: false,
  });

  if (!payloadCategory.docs.length) {
    return null;
  }

  // Additionally, filter categories by breadcrumbs length to ensure we select the correct hierarchy level
  const filteredPayloadCategory = payloadCategory.docs.filter(
    (payloadCategory) => payloadCategory.breadcrumbs?.length === categorySlugs.length,
  );

  if (!filteredPayloadCategory.length) {
    return null;
  }

  return filteredPayloadCategory[0];
};

const getCategoryData = async (payloadCategory: PayloadCategory) => {
  'use cache';
  cacheLife('alwaysCheck15m');

  const payload = await getPayload({
    config,
  });

  const payloadPosts = await payload.find({
    collection: 'posts',
    where: {
      category: { equals: payloadCategory.id },
      _status: { equals: 'published' },
    },
    depth: 1,
    limit: 0,
    pagination: false,
  });

  const blogPostMetas = (
    await Promise.all(
      payloadPosts.docs.map(async (post) => {
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

  const categoryUrl = resolveCategoryUrl(payloadCategory);
  if (!categoryUrl) {
    return null;
  }

  const category: Category = {
    title: payloadCategory.title,
    description: payloadCategory.description,
    url: categoryUrl,
  };

  const payloadSubcategories = await payload.find({
    collection: 'category',
    where: { parent: { equals: payloadCategory.id } },
    depth: 1,
    limit: 0,
    pagination: false,
  });

  const subcategories: Category[] = payloadSubcategories.docs
    .map((payloadSubCategory) => {
      const categoryUrl = resolveCategoryUrl(payloadSubCategory);
      if (!categoryUrl) {
        return null;
      }
      const subCategory: Category = {
        title: payloadSubCategory.title,
        description: payloadSubCategory.description,
        url: categoryUrl,
      };
      return subCategory;
    })
    .filter((obj) => obj !== null)
    .sort(sortCategoryByTitle);

  return {
    category,
    subcategories,
    blogPostMetas,
  };
};

/**
 * Metadata
 */
export const generateMetadata = async ({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> => {
  const params = await paramsPromise;

  await payloadRedirect({ currentUrl: joinUrl(['blog', 'category', ...params.slug]) });

  const payloadCategory = await getPayloadCategoryFromParams({ params });
  if (!payloadCategory) {
    console.warn(`Failed to find payload category during generateMetadata. Params: ${params.slug.join('/')}`);
    notFound();
  }

  const seoData = payloadCategory.meta;
  const fallbackTitle = `Category: ${payloadCategory.title}`;
  const fallbackDescription = payloadCategory.description;

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

  const payloadCategory = await payload.find({
    collection: 'category',
    depth: 1,
    limit: 0,
    pagination: false,
  });

  return payloadCategory.docs
    .map((payloadCategory) => {
      let resolvedCategoryUrl = resolveCategoryUrl(payloadCategory);
      if (!resolvedCategoryUrl) {
        return null;
      }
      const stripPrefix = '/blog/category/';
      if (resolvedCategoryUrl.startsWith(stripPrefix)) {
        resolvedCategoryUrl = resolvedCategoryUrl.slice(stripPrefix.length);
      }
      return {
        slug: resolvedCategoryUrl.split('/'),
      };
    })
    .filter((obj) => obj !== null);
};

/**
 * Handler
 */
const CategoryDetailPageHandler = async ({ params: paramsPromise }: { params: Promise<{ slug: string[] }> }) => {
  const params = await paramsPromise;

  await payloadRedirect({ currentUrl: joinUrl(['blog', 'category', ...params.slug]) });

  const payloadCategory = await getPayloadCategoryFromParams({ params });
  if (!payloadCategory) {
    notFound();
    return null;
  }

  const data = await getCategoryData(payloadCategory);
  if (!data) {
    notFound();
    return null;
  }

  const breadcrumbs = generateBreadcrumbs(payloadCategory);

  return (
    <div>
      {breadcrumbs && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
          <Breadcrumbs breadcrumbList={breadcrumbs} />
        </>
      )}
      <CategoryDetailPage
        category={data.category}
        subcategories={data.subcategories}
        blogPostMetas={data.blogPostMetas}
      />
    </div>
  );
};

export default CategoryDetailPageHandler;
