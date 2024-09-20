import AboutPage from '@/containers/AboutPage';
import { Metadata } from 'next';
import { generateBreadcrumbs as generateParentBreadcrumbs } from '../page';
import { BreadcrumbList, ListItem, WithContext } from 'schema-dts';
import { appendItem } from '@/utils/seo/breadCrumbList';
import { getLastItemId } from '@/utils/seo/listItem';
import { joinUrl } from '@/utils/url';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Mo, a Software Engineer from Sydney, who showcases his tech projects, development skills, and personal interests.',
};

export const generateBreadcrumbs = (): WithContext<BreadcrumbList> | null => {
  let breadcrumbList = generateParentBreadcrumbs();
  const lastItemId = getLastItemId(breadcrumbList.itemListElement as ListItem[]);
  if (!lastItemId) {
    return null;
  }
  appendItem({
    breadcrumbList: breadcrumbList,
    id: joinUrl([lastItemId, 'about']),
    name: 'About',
  });
  return breadcrumbList;
};

const About = () => {
  const breadcrumbs = generateBreadcrumbs();
  return (
    <>
      {breadcrumbs && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      )}
      <AboutPage />
    </>
  );
};

export default About;
