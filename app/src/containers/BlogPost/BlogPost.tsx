import BlogSummary from '@/components/BlogSummary';
import { BlogPostContainer } from './styled';
import { BlogPostProps } from './types';

export const BlogPost = ({ meta, content }: BlogPostProps) => {
  return (
    <BlogPostContainer>
      <BlogSummary blogPostMeta={meta} headingLevel="h1" linkHeading={false} showExcerpt={false} />
      <hr />
      <div dangerouslySetInnerHTML={{ __html: content.htmlContent }} />
    </BlogPostContainer>
  );
};
