import { BlogPostContainer } from './styled';
import { BlogPostProps } from './types';

export const BlogPost = ({ title, htmlContent }: BlogPostProps) => {
  return (
    <BlogPostContainer>
      <div>TITLE: {title}</div>
      <div>DATE PUBLISHED: TBA</div>
      <div>VIEW COUNT: TBA</div>
      <div>CATEGORY ARRAY: TBA</div>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </BlogPostContainer>
  );
};
