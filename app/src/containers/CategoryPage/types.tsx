import { BlogPostMeta } from '@/types/blog';

export interface CategoryPageProps {
  categoryTitle: string;
  categoryDescription: string;
  blogPostMetas: BlogPostMeta[];
}
