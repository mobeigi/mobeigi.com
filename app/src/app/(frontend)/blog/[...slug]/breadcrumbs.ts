import { generateBreadcrumbs as generateParentBreadcrumbs } from '../breadcrumbs';
import { joinUrl } from '@/utils/url';
import { appendItem } from '@/utils/seo/breadCrumbList';
import { getLastItemId } from '@/utils/seo/listItem';
import { BreadcrumbList, ListItem, WithContext } from 'schema-dts';
import { Post as PayloadPost, Category as PayloadCategory } from '@/payload-types';
import { getCategorySlugUrl } from '@/utils/payload/shared';

export const generateBreadcrumbs = (payloadPost: PayloadPost): WithContext<BreadcrumbList> | null => {
  if (!payloadPost || !payloadPost.slug) {
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

  // Add category part
  const payloadCategory = payloadPost.category as PayloadCategory;
  payloadCategory.breadcrumbs?.forEach((breadcrumb) => {
    appendItem({
      breadcrumbList: breadcrumbList,
      id: joinUrl([lastItemId, 'category', breadcrumb.url!]),
      name: breadcrumb.label!,
    });
  });

  // Add post part
  const categorySlugUrl = getCategorySlugUrl(payloadCategory);
  if (!categorySlugUrl) {
    return null;
  }
  appendItem({
    breadcrumbList: breadcrumbList,
    id: joinUrl([lastItemId, categorySlugUrl, payloadPost.slug]),
    name: payloadPost.title,
  });

  return breadcrumbList;
};
