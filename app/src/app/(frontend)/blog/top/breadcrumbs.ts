import { generateBreadcrumbs as generateParentBreadcrumbs } from '../breadcrumbs';
import { appendItem } from '@/utils/seo/breadCrumbList';
import { getLastItemId } from '@/utils/seo/listItem';
import { BreadcrumbList, ListItem, WithContext } from 'schema-dts';
import { joinUrl } from '@/utils/url';

export const generateBreadcrumbs = (): WithContext<BreadcrumbList> | null => {
  const breadcrumbList = generateParentBreadcrumbs();
  if (!breadcrumbList) {
    return null;
  }
  const lastItemId = getLastItemId(breadcrumbList.itemListElement as ListItem[]);
  if (!lastItemId) {
    return null;
  }

  appendItem({
    breadcrumbList: breadcrumbList,
    id: joinUrl([lastItemId, 'top']),
    name: 'Top',
  });

  return breadcrumbList;
};
