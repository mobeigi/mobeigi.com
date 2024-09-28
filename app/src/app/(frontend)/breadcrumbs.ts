import { BASE_URL } from '@/constants/app';
import { breadcrumbList } from '@/utils/seo/breadCrumbList';
import { listItem } from '@/utils/seo/listItem';
import { BreadcrumbList, WithContext } from 'schema-dts';

export const generateBreadcrumbs = (): WithContext<BreadcrumbList> =>
  breadcrumbList([
    listItem({
      position: 1,
      item: {
        '@id': BASE_URL,
        name: 'Home',
      },
    }),
  ]);
