import { BlogPostContainer } from './styled';
import { BlogPostProps } from './types';

export const BlogPost = ({ title, htmlContent, publishedAt, breadcrumbs }: BlogPostProps) => {
  return (
    <BlogPostContainer>
      <div>TITLE: {title}</div>
      <div>DATE PUBLISHED: {publishedAt.toDateString()}</div>
      <div>VIEW COUNT: TBA</div>
      <div>CATEGORY: {breadcrumbs.map((c) => c.title).join(' >> ')}</div>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </BlogPostContainer>
  );
};
