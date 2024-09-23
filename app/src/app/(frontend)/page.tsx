import { BASE_URL } from '@/constants/app';
import HomePage from '@/containers/HomePage';
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

const Home = () => {
  const breadcrumbs = generateBreadcrumbs();
  return (
    <div>
      {breadcrumbs && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
        </>
      )}
      <HomePage />
    </div>
  );
};

export default Home;
