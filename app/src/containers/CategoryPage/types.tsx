import { BlogPostMeta, Category } from '@/types/blog';

export interface CategoryPageProps {
  category: Category;
  subcategories: Category[];
  blogPostMetas: BlogPostMeta[];
}
