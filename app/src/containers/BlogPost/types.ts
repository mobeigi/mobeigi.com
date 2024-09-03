import { Breadcrumbs } from '@/types/blog';

export interface BlogPostProps {
  title: string;
  htmlContent: any; // TODO: Type properly
  publishedAt: Date;
  breadcrumbs: Breadcrumbs[];
}
