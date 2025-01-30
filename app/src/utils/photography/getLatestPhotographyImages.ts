import { unstable_cache_safe } from '@/utils/next';
import { GetLatestPhotographyImagesProps, PhotographyImage } from './types';
import { Octokit } from '@octokit/rest';

export const getLatestPhotographyImages = async ({
  limit = 4,
}: GetLatestPhotographyImagesProps): Promise<PhotographyImage[] | null> => {
  try {
    const octokit = new Octokit();
    const { data } = await octokit.rest.repos.getContent({
      owner: 'mobeigi',
      repo: 'photography',
      path: 'images/thumbs',
    });

    if (!Array.isArray(data)) {
      throw new Error('getLatestPhotographyImages: Unexpected response structure');
    }

    const sortedFileNames = data.map((item) => item.name).sort();
    if (sortedFileNames.length === 0) {
      return [];
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
  } catch (error) {
    console.warn('getLatestPhotographyImages: Error while fetching latest photography images.', error);
    return null;
  }
};

export const getCachedLatestPhotographyImages = unstable_cache_safe(
  async () => getLatestPhotographyImages({}),
  ['photography:getLatestPhotographyImages'],
  {
    revalidate: 900,
  },
);
