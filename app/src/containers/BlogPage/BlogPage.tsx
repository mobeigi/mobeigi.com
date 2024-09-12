import { BlogPageProps } from './types';
import { BlogPageContainer, BlogSummaryWrapper } from './styled';
import BlogSummary from '@/components/BlogSummary';

export const BlogPage = ({ blogPostMetas }: BlogPageProps) => {
  return (
    <BlogPageContainer>
      <h1>Blog</h1>
      <p>Explore my thoughts and insights through the blog posts below.</p>
      <BlogSummaryWrapper>
        {blogPostMetas.length ? (
          blogPostMetas.map((blogPostMeta, index) => (
            <article key={index}>
              <BlogSummary key={blogPostMeta.slug} blogPostMeta={blogPostMeta} />
            </article>
          ))
        ) : (
          <p>There are no posts found to display.</p>
        )}
      </BlogSummaryWrapper>
    </BlogPageContainer>
  );
};
