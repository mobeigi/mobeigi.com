import { unstable_cache_safe } from '@/utils/next';
import { GetLatestPhotographyImagesProps, PhotographyImage } from './types';

export const getLatestPhotographyImages = async ({
  limit = 4,
}: GetLatestPhotographyImagesProps): Promise<PhotographyImage[] | null> => {
  try {
    const response = await fetch('https://api.github.com/repos/mobeigi/photography/contents/images/thumbs');
    if (response.ok) {
      const json = await response.json();
      const sortedFileNames = json.map((item: any) => item.name as string).sort();
      if (sortedFileNames.length === 0) {
        return null;
      }
      const photographyImages: PhotographyImage[] = sortedFileNames.slice(-limit).map((fileName: string) => {
        const splitParts = fileName.split('.')[0].split('-');

        const dateString = splitParts.slice(0, 3).join('-');
        const date = new Date(dateString);

        const niceName = splitParts
          .slice(3)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        const photographyImage: PhotographyImage = {
          filename: fileName,
          date: date,
          niceName: niceName,
          thumbsUrl: `https://photos.mobeigi.com/images/thumbs/${fileName}`,
          fullUrl: `https://photos.mobeigi.com/images/fulls/${fileName}`,
        };

        return photographyImage;
      });
      return photographyImages.reverse(); // latest first
    } else {
      console.warn(`Response was not OK during fetching of latest photography image. Status: '${response.status}'`);
      return null;
    }
  } catch (error) {
    console.warn('Could not fetch latest photography image.');
    return null;
  }
};

export const getCachedLatestPhotographyImages = unstable_cache_safe(
  async () => getLatestPhotographyImages({}),
  ['getLatestPhotographyImages'],
  {
    revalidate: 900,
  },
);
