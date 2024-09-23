import { unstable_cache_safe } from '@/utils/next';
import { PhotographyImage } from './types';

export const getLatestPhotographyImage = async (): Promise<PhotographyImage | null> => {
  try {
    const response = await fetch('https://api.github.com/repos/mobeigi/photography/contents/images/thumbs');
    if (response.ok) {
      const json = await response.json();
      const sortedFileNames = json.map((item: any) => item.name as string).sort();
      if (sortedFileNames.length > 0) {
        const selectedFileName = sortedFileNames.at(-1) as string;
        const splitParts = selectedFileName.split('.')[0].split('-');

        const dateString = splitParts.slice(0, 3).join('-');
        const date = new Date(dateString);

        const niceName = splitParts
          .slice(3)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        const photographyImage: PhotographyImage = {
          filename: selectedFileName,
          date: date,
          niceName: niceName,
          thumbsUrl: `https://photos.mobeigi.com/images/thumbs/${selectedFileName}`,
          fullUrl: `https://photos.mobeigi.com/images/fulls/${selectedFileName}`,
        };

        return photographyImage;
      }
      return null;
    } else {
      console.warn(`Response was not OK during fetching of latest photography image. Status: '${response.status}'`);
      return null;
    }
  } catch (error) {
    console.warn('Could not fetch latest photography image.');
    return null;
  }
};

export const getCachedLatestPhotographyImage = unstable_cache_safe(
  async () => getLatestPhotographyImage(),
  ['getLatestPhotographyImage'],
  {
    revalidate: 900,
  },
);
