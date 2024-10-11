import ResumePage from '@/containers/ResumePage';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateBreadcrumbs } from './breadcrumbs';

export const metadata: Metadata = {
  title: 'Resume',
  description: "Unlock and download Mo Beigi's resume to explore professional experience, skills, and achievements.",
};

export const dynamic = 'force-static';
export const revalidate = 86400;

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
