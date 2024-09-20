import ProjectsPage from '@/containers/ProjectsPage';
import { Metadata } from 'next';
import { generateBreadcrumbs as generateParentBreadcrumbs } from '../page';
import { BreadcrumbList, ListItem, WithContext } from 'schema-dts';
import { getLastItemId } from '@/utils/seo/listItem';
import { appendItem } from '@/utils/seo/breadCrumbList';
import { joinUrl } from '@/utils/url';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    "Discover Mo Beigi's most interesting projects, dive into open-source code, and explore related blog posts.",
};

export const generateBreadcrumbs = (): WithContext<BreadcrumbList> | null => {
  let breadcrumbList = generateParentBreadcrumbs();
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

const Projects = () => {
  const breadcrumbs = generateBreadcrumbs();
  return (
    <div>
      {breadcrumbs && (
        <section>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
          <Breadcrumbs breadcrumbList={breadcrumbs} />
        </section>
      )}
      <ProjectsPage />
    </div>
  );
};

export default Projects;
