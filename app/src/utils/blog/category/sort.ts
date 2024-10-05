import { Category } from '@/types/blog';

export const sortCategoryByTitle = (a: Category, b: Category) => a.title.localeCompare(b.title);
