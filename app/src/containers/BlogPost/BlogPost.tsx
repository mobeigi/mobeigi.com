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
import { serializeLexical } from '@/payload/lexical/serializeLexical';

export const BlogPost = ({ meta, content, comments }: BlogPostProps) => {
  const contentBodyReactNode = serializeLexical(content.body);
  return (
    <BlogPostContainer>
      <BlogPostSummaryWrapper>
        <BlogPostSummaryContainer>
          <BlogSummary blogPostMeta={meta} headingLevel="h1" linkHeading={false} showExcerpt={false} />
          <hr />
        </BlogPostSummaryContainer>
      </BlogPostSummaryWrapper>
      <BlogPostBodyContainer>
        <BlogPostContents id="blogpost-contents">{contentBodyReactNode}</BlogPostContents>
        <BlogPostSidebarWrapper>
          <Sidebar body={contentBodyReactNode} customFields={content.customFields} />
        </BlogPostSidebarWrapper>
      </BlogPostBodyContainer>
      <hr />
      <CommentSection comments={comments} postId={meta.id} />
    </BlogPostContainer>
  );
};
