import ProjectsPage from '@/containers/ProjectsPage';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateBreadcrumbs } from './breadcrumbs';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    "Discover Mo Beigi's most interesting projects, dive into open-source code, and explore related blog posts.",
};

export const revalidate = 86400;

const Projects = () => {
  const breadcrumbs = generateBreadcrumbs();
  return (
    <div>
      {breadcrumbs && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
          <Breadcrumbs breadcrumbList={breadcrumbs} />
        </>
      )}
      <ProjectsPage />
    </div>
  );
};

export default Projects;
