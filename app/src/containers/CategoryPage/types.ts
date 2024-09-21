import { Category } from '@/types/blog';

export type CategoryWithSubcategories = {
  category: Category;
  subcategories: Category[];
};

export interface CategoryPageProps {
  rootCategories: CategoryWithSubcategories[];
}
