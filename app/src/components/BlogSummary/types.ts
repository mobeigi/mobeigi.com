import { BlogPostMeta } from '@/types/blog';

export interface BlogSummaryProps {
  blogPostMeta: BlogPostMeta;
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  linkHeading?: boolean;
  linkCategory?: boolean;
  commentsAnchor?: string;
  showExcerpt?: boolean;
}
