import CategoryDetailPage from '@/containers/CategoryDetailPage';
import { Metadata } from 'next';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@payload-config';
import { Category as PayloadCategory } from '@/payload-types';
import { notFound } from 'next/navigation';
import { PaginatedDocs } from 'payload';
import { mapPostToPostMeta } from '@/utils/payload';
import { BlogPostMeta, BlogPostRelatedMeta, Category } from '@/types/blog';
import { sortBlogPostMetaByPublishedAtDate } from '@/utils/blog/post';
import { generateBreadcrumbs as generateParentBreadcrumbs } from '../page';
import { appendItem } from '@/utils/seo/breadCrumbList';
import { getLastItemId } from '@/utils/seo/listItem';
import { BreadcrumbList, ListItem, WithContext } from 'schema-dts';
import { joinUrl } from '@/utils/url';
import Breadcrumbs from '@/components/Breadcrumbs';
import { resolveCategoryUrl } from '@/payload/collections/Category/resolveUrl';
import { sortCategoryByTitle } from '@/utils/blog/category';
import { payloadRedirect } from '@/payload/utils/payloadRedirect';

const depth = 2;

export const getPayloadCategoryFromParams = async ({
  params,
}: {
  params: { slug: string[] };
}): Promise<PayloadCategory | null> => {
  const payload = await getPayloadHMR({
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
};

export const generateMetadata = async ({ params }: { params: { slug: string[] } }): Promise<Metadata> => {
  await payloadRedirect({ currentUrl: joinUrl(['/', 'blog', 'category', ...params.slug]) });

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

export const generateBreadcrumbs = (payloadCategory: PayloadCategory): WithContext<BreadcrumbList> | null => {
  if (!payloadCategory) {
    return null;
  }

  let breadcrumbList = generateParentBreadcrumbs();
  if (!breadcrumbList) {
    return null;
  }
  const lastItemId = getLastItemId(breadcrumbList.itemListElement as ListItem[]);
  if (!lastItemId) {
    return null;
  }

  payloadCategory.breadcrumbs?.forEach((breadcrumb) => {
    appendItem({
      breadcrumbList: breadcrumbList,
      id: joinUrl([lastItemId, breadcrumb.url!]),
      name: breadcrumb.label!,
    });
  });

  return breadcrumbList;
};

const CategoryDetailPageHandler = async ({ params }: { params: { slug: string[] } }) => {
  await payloadRedirect({ currentUrl: joinUrl(['/', 'blog', 'category', ...params.slug]) });

  const payloadCategory = await getPayloadCategoryFromParams({ params });
  if (!payloadCategory) {
    notFound();
    return null;
  }

  const payload = await getPayloadHMR({
    config,
  });

  const payloadPosts = await payload.find({
    collection: 'posts',
    where: { category: { equals: payloadCategory.id } },
    depth,
    limit: 0,
    pagination: false,
  });

  const blogPostMetas = (
    await Promise.all(
      payloadPosts.docs.map(async (post) => {
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

  const categoryUrl = resolveCategoryUrl(payloadCategory);
  if (!categoryUrl) {
    notFound();
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
    depth,
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

  const breadcrumbs = generateBreadcrumbs(payloadCategory);

  return (
    <div>
      {breadcrumbs && (
        <div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
          <Breadcrumbs breadcrumbList={breadcrumbs} />
        </div>
      )}
      <CategoryDetailPage category={category} subCategories={subcategories} blogPostMetas={blogPostMetas} />
    </div>
  );
};

export default CategoryDetailPageHandler;
