import { BlogPostMeta } from '@/types/blog';
import { DevelopmentActivity } from '@/utils/github/types';
import { PhotographyImage } from '@/utils/photography/types';

export interface HomePageProps {
  latestBlogPostMetas: BlogPostMeta[];
  latestDevelopmentActivity?: DevelopmentActivity;
  latestPhotographyImages?: PhotographyImage[];
}
