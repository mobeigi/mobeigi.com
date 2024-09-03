import { Breadcrumbs } from '@/types/blog';

export interface BlogPageProps {
  blogPostSummaries: BlogPostSummary[];
}

export type BlogPostSummary = {
  title: string;
  publishedAt: Date;
  excerpt: string;
  slug: string;
  breadcrumbs: Breadcrumbs[];
};
