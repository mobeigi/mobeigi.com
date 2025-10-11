import BlogSummary from '@/components/BlogSummary';
import {
  BlogPostContainer,
  BlogPostContents,
  BlogPostSidebarWrapper,
  BlogSummaryContainer,
  BlogSummaryWrapper,
  BlogPostBodyContainer,
  BlogPostArticle,
} from './styled';
import { BlogPostProps } from './types';
import Sidebar from './Sidebar';
import CommentSection from './CommentSection';
import { serializeLexical } from '@/payload/lexical/serializeLexical';
import RegisterView from './RegisterView';
import EngagementSection from './EngagementSection';

export const BlogPost = ({ meta, content, externalDiscussions, comments }: BlogPostProps) => {
  const contentBodyReactNode = serializeLexical(content.body);

  return (
    <>
      <RegisterView postId={meta.post.id} />
      <BlogPostContainer>
        <BlogPostArticle>
          <BlogSummaryWrapper>
            <BlogSummaryContainer>
              <BlogSummary blogPostMeta={meta} headingLevel="h1" linkHeading={false} showExcerpt={false} />
              <hr />
            </BlogSummaryContainer>
          </BlogSummaryWrapper>
          <BlogPostBodyContainer>
            <BlogPostContents id="blogpost-contents">{contentBodyReactNode}</BlogPostContents>
            <BlogPostSidebarWrapper>
              <Sidebar body={contentBodyReactNode} />
            </BlogPostSidebarWrapper>
          </BlogPostBodyContainer>
        </BlogPostArticle>
        {externalDiscussions.length > 0 && (
          <>
            <hr />
            <EngagementSection externalDiscussions={externalDiscussions} />
          </>
        )}
        <hr />
        <CommentSection comments={comments} postId={meta.post.id} commentsEnabled={meta.post.commentsEnabled} />
      </BlogPostContainer>
    </>
  );
};
