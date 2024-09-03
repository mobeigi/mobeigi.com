import { BlogPageProps } from './types';
import { BlogPageContainer, BlogSummaryWrapper } from './styled';
import BlogSummary from '@/components/BlogSummary';

export const BlogPage = ({ blogPostMetas }: BlogPageProps) => {
  return (
    <BlogPageContainer>
      <h1>Blog</h1>
      <p>Explore my thoughts and insights through the blog posts below.</p>
      <BlogSummaryWrapper>
        {blogPostMetas.map((blogPostMeta) => (
          //TODO: slug might not be unique if used as key
          <article key={blogPostMeta.slug}>
            <BlogSummary key={blogPostMeta.slug} blogPostMeta={blogPostMeta} />
          </article>
        ))}
      </BlogSummaryWrapper>
    </BlogPageContainer>
  );
};
