import ResumePage from '@/containers/ResumePage';
import { Metadata } from 'next';
import { generateBreadcrumbs as generateParentBreadcrumbs } from '../page';
import { BreadcrumbList, ListItem, WithContext } from 'schema-dts';
import { appendItem } from '@/utils/seo/breadCrumbList';
import { getLastItemId } from '@/utils/seo/listItem';
import { joinUrl } from '@/utils/url';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Resume',
  description: "Unlock and download Mo Beigi's resume to explore professional experience, skills, and achievements.",
};

export const generateBreadcrumbs = (): WithContext<BreadcrumbList> | null => {
  const breadcrumbList = generateParentBreadcrumbs();
  const lastItemId = getLastItemId(breadcrumbList.itemListElement as ListItem[]);
  if (!lastItemId) {
    return null;
  }
  appendItem({
    breadcrumbList: breadcrumbList,
    id: joinUrl([lastItemId, 'resume']),
    name: 'Resume',
  });
  return breadcrumbList;
};

const Resume = () => {
  const breadcrumbs = generateBreadcrumbs();
  return (
    <div>
      {breadcrumbs && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
          <Breadcrumbs breadcrumbList={breadcrumbs} />
        </>
      )}
      <ResumePage />
    </div>
  );
};

export default Resume;
