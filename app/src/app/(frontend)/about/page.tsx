import AboutPage from '@/containers/AboutPage';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateBreadcrumbs } from './breadcrumbs';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Mo, a Software Engineer from Sydney, who showcases his tech projects, development skills, and personal interests.',
};

export const revalidate = 86400;

const About = () => {
  const breadcrumbs = generateBreadcrumbs();
  return (
    <div>
      {breadcrumbs && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
          <Breadcrumbs breadcrumbList={breadcrumbs} />
        </>
      )}
      <AboutPage />
    </div>
  );
};

export default About;
