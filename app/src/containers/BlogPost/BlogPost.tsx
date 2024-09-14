import BlogSummary from '@/components/BlogSummary';
import {
  BlogPostContainer,
  BlogPostContents,
  BlogPostSidebarWrapper,
  BlogPostSummaryContainer,
  BlogPostSummaryWrapper,
  BlogPostBodyContainer,
} from './styled';
import { BlogPostProps } from './types';
import Sidebar from './Sidebar';
import CommentSection from './CommentSection';

export const BlogPost = ({ meta, content, comments }: BlogPostProps) => {
  return (
    <BlogPostContainer>
      <BlogPostSummaryWrapper>
        <BlogPostSummaryContainer>
          <BlogSummary blogPostMeta={meta} headingLevel="h1" linkHeading={false} showExcerpt={false} />
          <hr />
        </BlogPostSummaryContainer>
      </BlogPostSummaryWrapper>
      <BlogPostBodyContainer>
        <BlogPostContents id="blogpost-contents">{content.body}</BlogPostContents>
        <BlogPostSidebarWrapper>
          <Sidebar content={content} />
        </BlogPostSidebarWrapper>
      </BlogPostBodyContainer>
      <hr />
      <CommentSection comments={comments} />
    </BlogPostContainer>
  );
};
