import CategoryPage from '@/containers/CategoryPage';
import { Metadata } from 'next';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@payload-config';
import { Category } from '@/payload-types';
import { notFound } from 'next/navigation';
import { PaginatedDocs } from 'payload';
import { mapPostToPostMeta } from '@/utils/payload';
import { BlogPostMeta, BlogPostRelatedMeta } from '@/types/blog';
import { sortBlogPostMetaByPublishedAtDate } from '@/utils/blog/post';
import { generateBreadcrumbs as generateParentBreadcrumbs } from '../../page';
import { appendItem } from '@/utils/seo/breadCrumbList';
import { getLastItemId } from '@/utils/seo/listItem';
import { BreadcrumbList, ListItem, WithContext } from 'schema-dts';
import { joinUrl } from '@/utils/url';

const depth = 2;

export const getCategoryFromParams = async ({ params }: { params: { slug: string[] } }): Promise<Category | null> => {
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
    const foundCategory: PaginatedDocs<Category> = await payload.find({
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
  const category = await getCategoryFromParams({ params });
  if (!category) {
    console.warn('Failed to find category during generateMetadata.');
    return notFound();
  }
  const seoData = category.meta;
  const fallbackTitle = `Category: ${category.title}`;
  const fallbackDescription = category.description;
  return {
    title: seoData?.title || fallbackTitle,
    description: seoData?.description || fallbackDescription,
  };
};

export const generateBreadcrumbs = (category: Category): WithContext<BreadcrumbList> | null => {
  if (!category) {
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

  category.breadcrumbs?.forEach((breadcrumb) => {
    appendItem({
      breadcrumbList: breadcrumbList,
      id: joinUrl([lastItemId, 'category', breadcrumb.url!]),
      name: breadcrumb.label!,
    });
  });

  return breadcrumbList;
};

const CategoryPageHandler = async ({ params }: { params: { slug: string[] } }) => {
  const category = await getCategoryFromParams({ params });
  if (!category) {
    notFound();
    return null;
  }

  const payload = await getPayloadHMR({
    config,
  });

  const posts = await payload.find({
    collection: 'posts',
    where: { category: { equals: category.id } },
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

  const title = category.title;
  const description = category.description;

  const breadcrumbs = generateBreadcrumbs(category);

  return (
    <>
      {breadcrumbs && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      )}
      <CategoryPage categoryTitle={title} categoryDescription={description} blogPostMetas={blogPostMetas} />
    </>
  );
};

export default CategoryPageHandler;
