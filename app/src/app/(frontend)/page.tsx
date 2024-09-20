import { BASE_URL } from '@/constants/app';
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
    <>
      {breadcrumbs && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      )}
      <div>
        <h1>Title</h1>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
      </div>
    </>
  );
};

export default Home;
