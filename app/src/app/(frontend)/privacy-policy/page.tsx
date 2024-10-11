import PrivacyPolicyPage from '@/containers/PrivacyPolicyPage';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateBreadcrumbs } from './breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn about the data we collect, how we use it, and your rights to manage or remove your information from our website.',
};

export const dynamic = 'force-static';
export const revalidate = 86400;

const PrivacyPolicy = () => {
  const breadcrumbs = generateBreadcrumbs();
  return (
    <div>
      {breadcrumbs && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
          <Breadcrumbs breadcrumbList={breadcrumbs} />
        </>
      )}
      <PrivacyPolicyPage />
    </div>
  );
};

export default PrivacyPolicy;
