import { Metadata } from 'next';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@payload-config';
import { Category } from '@/types/blog';
import { generateBreadcrumbs as generateParentBreadcrumbs } from '../page';
import { appendItem } from '@/utils/seo/breadCrumbList';
import { getLastItemId } from '@/utils/seo/listItem';
import { BreadcrumbList, ListItem, WithContext } from 'schema-dts';
import { joinUrl } from '@/utils/url';
import Breadcrumbs from '@/components/Breadcrumbs';
import { resolveCategoryUrl } from '@/payload/collections/Category/resolveUrl';
import { sortCategoryByTitle } from '@/utils/blog/category';
import CategoryPage from '@/containers/CategoryPage';
import { CategoryWithSubcategories } from '@/containers/CategoryPage/types';

const depth = 2;

export const metadata: Metadata = {
  title: 'Category',
  description: "Explore Mo's categories for easy navigation through various topics and insights.",
};

export const generateBreadcrumbs = (): WithContext<BreadcrumbList> | null => {
  let breadcrumbList = generateParentBreadcrumbs();
  if (!breadcrumbList) {
    return null;
  }
  const lastItemId = getLastItemId(breadcrumbList.itemListElement as ListItem[]);
  if (!lastItemId) {
    return null;
  }

  appendItem({
    breadcrumbList: breadcrumbList,
    id: joinUrl([lastItemId, 'category']),
    name: 'Category',
  });

  return breadcrumbList;
};

const CategoryPageHandler = async ({ params }: { params: { slug: string[] } }) => {
  const payload = await getPayloadHMR({
    config,
  });

  const payloadRootCategories = await payload.find({
    collection: 'category',
    where: { parent: { exists: false } },
    depth,
    limit: 0,
    pagination: false,
  });

  const rootCategories: CategoryWithSubcategories[] = (
    await Promise.all(
      payloadRootCategories.docs.map(async (payloadRootCategory) => {
        // Get all subcategories for this category
        const payloadSubCategories = await payload.find({
          collection: 'category',
          where: { parent: { equals: payloadRootCategory.id } },
          depth,
          limit: 0,
          pagination: false,
        });

        const categoryUrl = resolveCategoryUrl(payloadRootCategory);
        if (!categoryUrl) {
          return null;
        }
        const category: Category = {
          title: payloadRootCategory.title,
          description: payloadRootCategory.description,
          url: categoryUrl,
        };

        const subcategories = payloadSubCategories.docs
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

        const categoryWithSubcategories: CategoryWithSubcategories = {
          category: category,
          subcategories: subcategories,
        };
        return categoryWithSubcategories;
      }),
    )
  )
    .filter((obj) => obj !== null)
    .sort((a, b) => sortCategoryByTitle(a.category, b.category));

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div>
      {breadcrumbs && (
        <div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
          <Breadcrumbs breadcrumbList={breadcrumbs} />
        </div>
      )}
      <CategoryPage rootCategories={rootCategories} />
    </div>
  );
};

export default CategoryPageHandler;
