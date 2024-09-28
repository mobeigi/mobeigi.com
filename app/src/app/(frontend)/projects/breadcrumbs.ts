import { generateBreadcrumbs as generateParentBreadcrumbs } from '../breadcrumbs';
import { BreadcrumbList, ListItem, WithContext } from 'schema-dts';
import { getLastItemId } from '@/utils/seo/listItem';
import { appendItem } from '@/utils/seo/breadCrumbList';
import { joinUrl } from '@/utils/url';

export const generateBreadcrumbs = (): WithContext<BreadcrumbList> | null => {
  const breadcrumbList = generateParentBreadcrumbs();
  const lastItemId = getLastItemId(breadcrumbList.itemListElement as ListItem[]);
  if (!lastItemId) {
    return null;
  }
  appendItem({
    breadcrumbList: breadcrumbList,
    id: joinUrl([lastItemId, 'projects']),
    name: 'Projects',
  });
  return breadcrumbList;
};
