import { BASE_URL } from '@/constants/app';
import HomePage from '@/containers/HomePage';
import { getCachedLatestPhotographyImage } from '@/utils/photography';
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

const Home = async () => {
  const breadcrumbs = generateBreadcrumbs();
  const latestPhotographyImage = (await getCachedLatestPhotographyImage()) ?? undefined;

  return (
    <div>
      {breadcrumbs && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
        </>
      )}
      <HomePage latestPhotographyImage={latestPhotographyImage} />
    </div>
  );
};

export default Home;
