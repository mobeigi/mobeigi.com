import { BlogPostMeta } from '@/types/blog';
import { PhotographyImage } from '@/utils/photography/types';

export interface HomePageProps {
  latestBlogPostMetas: BlogPostMeta[];
  latestPhotographyImage?: PhotographyImage;
}
