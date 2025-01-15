import CategoryDetailPage from '@/containers/CategoryDetailPage';
import { Metadata } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';
import { Category as PayloadCategory } from '@/payload-types';
import { notFound } from 'next/navigation';
import { PaginatedDocs } from 'payload';
import { mapPostToPostMeta } from '@/utils/payload';
import { BlogPostMeta, BlogPostRelatedMeta, Category } from '@/types/blog';
import { sortBlogPostMetaByPublishedAtDate } from '@/utils/blog/post';
import { joinUrl } from '@/utils/url';
import Breadcrumbs from '@/components/Breadcrumbs';
import { resolveCategoryUrl } from '@/payload/collections/Category/resolveUrl';
import { sortCategoryByTitle } from '@/utils/blog/category';
import { payloadRedirect } from '@/payload/utils/redirects';
import { generateBreadcrumbs } from './breadcrumbs';
import { unstable_cache_safe } from '@/utils/next';

export const revalidate = 900;

/**
 * Data fetching
 */
const getPayloadCategoryFromParams = ({ params }: { params: { slug: string[] } }) =>
  unstable_cache_safe(
    async (): Promise<PayloadCategory | null> => {
      const payload = await getPayload({
        config,
      });

      const categorySlugs = params.slug;
      if (categorySlugs.length === 0) {
        return null;
      }

      let currentParentId = null;
      let category = null;

      for (const slug of categorySlugs) {
        const foundCategory: PaginatedDocs<PayloadCategory> = await payload.find({
          collection: 'category',
          where: {
            slug: { equals: slug },
            ...(currentParentId ? { parent: { equals: currentParentId } } : { parent: { exists: false } }),
          },
          limit: 1, // We only expect one category with this slug and parent_id
        });

        if (!foundCategory || foundCategory.docs.length === 0) {
          return null;
        }

        // Set the current category and update the parent ID for the next iteration
        category = foundCategory.docs[0];
        currentParentId = category.id; // Set the parent_id for the next slug
      }

      return category;
    },
    [`getPayloadCategoryFromParams-${params.slug.join('-')}`],
    { revalidate: revalidate },
  )();

const getData = (payloadCategory: PayloadCategory) =>
  unstable_cache_safe(
    async () => {
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
    },
    [`getData-${payloadCategory.id}`],
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

  await payloadRedirect({ currentUrl: joinUrl(['blog', 'category', ...params.slug]) });

  const payloadCategory = await getPayloadCategoryFromParams({ params });
  if (!payloadCategory) {
    console.warn('Failed to find payload category during generateMetadata.');
    return notFound();
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

  const data = await getData(payloadCategory);
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
