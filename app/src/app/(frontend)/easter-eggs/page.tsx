import EasterEggsPage from '@/containers/EasterEggsPage';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateBreadcrumbs } from './breadcrumbs';

export const metadata: Metadata = {
  title: 'Easter Eggs',
  description: "Here are some fun Easter Eggs i've added to my website, I hope you enjoy them!",
};

export const dynamic = 'force-static';
export const revalidate = 86400;

const EasterEggs = () => {
  const breadcrumbs = generateBreadcrumbs();
  return (
    <div>
      {breadcrumbs && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
          <Breadcrumbs breadcrumbList={breadcrumbs} />
        </>
      )}
      <EasterEggsPage />
    </div>
  );
};

export default EasterEggs;
