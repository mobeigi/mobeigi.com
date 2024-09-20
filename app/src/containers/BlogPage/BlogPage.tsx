import { BlogPageProps } from './types';
import { BlogPageContainer, BlogSummaryWrapper } from './styled';
import BlogSummary from '@/components/BlogSummary';

export const BlogPage = ({ blogPostMetas }: BlogPageProps) => {
  return (
    <BlogPageContainer>
      <h1>Blog</h1>
      <p>Explore my thoughts and insights through the blog posts below</p>
      {blogPostMetas.length > 0 ? (
        <p>
          Showing <strong>{blogPostMetas.length}</strong> {blogPostMetas.length === 1 ? 'post' : 'posts'} in this blog.
        </p>
      ) : (
        <p>There are no posts found to display.</p>
      )}
      <BlogSummaryWrapper>
        {blogPostMetas.length > 0 &&
          blogPostMetas.map((meta, index) => (
            <article key={index}>
              <BlogSummary key={meta.post.slug} blogPostMeta={meta} headingLevel="h2" />
            </article>
          ))}
      </BlogSummaryWrapper>
    </BlogPageContainer>
  );
};
