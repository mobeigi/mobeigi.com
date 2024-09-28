import { Category as PayloadCategory } from '@/payload-types';

// TODO: Improve these utils, see if they are needed at all
export const buildCategorySlugUrl = (categorySlugs: string[]): string => {
  return '/' + categorySlugs.join('/');
};

export const getCategorySlugUrl = (category: PayloadCategory): string | null => {
  if (!category) return null;

  const breadcrumbs = category.breadcrumbs;
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
  if (lastBreadcrumb.url === null || lastBreadcrumb.url === undefined) {
    return null;
  }
  return lastBreadcrumb.url;
};
