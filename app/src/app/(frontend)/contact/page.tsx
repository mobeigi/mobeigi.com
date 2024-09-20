import ContactPage from '@/containers/ContactPage';
import { Metadata } from 'next';
import { generateBreadcrumbs as generateParentBreadcrumbs } from '../page';
import { BreadcrumbList, ListItem, WithContext } from 'schema-dts';
import { appendItem } from '@/utils/seo/breadCrumbList';
import { getLastItemId } from '@/utils/seo/listItem';
import { joinUrl } from '@/utils/url';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Mo Beigi via email or secure PGP. Alternatively, find him on various other networks.',
};

export const generateBreadcrumbs = (): WithContext<BreadcrumbList> | null => {
  let breadcrumbList = generateParentBreadcrumbs();
  const lastItemId = getLastItemId(breadcrumbList.itemListElement as ListItem[]);
  if (!lastItemId) {
    return null;
  }
  appendItem({
    breadcrumbList: breadcrumbList,
    id: joinUrl([lastItemId, 'contact']),
    name: 'Contact',
  });
  return breadcrumbList;
};

const Contact = () => {
  const breadcrumbs = generateBreadcrumbs();
  return (
    <>
      {breadcrumbs && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      )}
      <ContactPage />
    </>
  );
};

export default Contact;
