import { Category } from '@/payload-types';
import { CollectionSlug, DataFromCollectionSlug } from 'payload';

export const getCategorySlugComponents = (category: Category): string[] | null => {
  if (!category) return null;

  const breadcrumbs = category.breadcrumbs;
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
  if (lastBreadcrumb.url === null || lastBreadcrumb.url === undefined) {
    return null;
  }
  return lastBreadcrumb.url.split('/').filter(Boolean);
};

export const resolveCategoryUrl = (doc: DataFromCollectionSlug<CollectionSlug>) => {
  const category = doc as Category;
  if (!category) {
    return null;
  }
  const categorySlugComponents = getCategorySlugComponents(category);
  if (!categorySlugComponents || categorySlugComponents.length === 0) {
    return null;
  }
  const categoryUrl = ['/blog', 'category', ...categorySlugComponents].join('/');
  return categoryUrl;
};
