import { Category as PayloadCategory } from '@/payload-types';
import { generateBreadcrumbs as generateParentBreadcrumbs } from '../breadcrumbs';
import { appendItem } from '@/utils/seo/breadCrumbList';
import { getLastItemId } from '@/utils/seo/listItem';
import { BreadcrumbList, ListItem, WithContext } from 'schema-dts';
import { joinUrl } from '@/utils/url';

export const generateBreadcrumbs = (payloadCategory: PayloadCategory): WithContext<BreadcrumbList> | null => {
  if (!payloadCategory) {
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

  payloadCategory.breadcrumbs?.forEach((breadcrumb) => {
    appendItem({
      breadcrumbList: breadcrumbList,
      id: joinUrl([lastItemId, breadcrumb.url!]),
      name: breadcrumb.label!,
    });
  });

  return breadcrumbList;
};
