import { BlogPostMeta, Category } from '@/types/blog';

export interface CategoryDetailPageProps {
  category: Category;
  subcategories: Category[];
  blogPostMetas: BlogPostMeta[];
}
