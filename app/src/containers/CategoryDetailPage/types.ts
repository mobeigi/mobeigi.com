import { BlogPostMeta, Category } from '@/types/blog';

export interface CategoryDetailPageProps {
  category: Category;
  subCategories: Category[];
  blogPostMetas: BlogPostMeta[];
}
