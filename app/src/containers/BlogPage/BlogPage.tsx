import { BlogPageProps } from './types';
import { BlogPageSection, BlogSummaryWrapper } from './styled';
import BlogSummary from '@/components/BlogSummary';
import Link from 'next/link';

export const BlogPage = ({ blogPostMetas }: BlogPageProps) => {
  return (
    <BlogPageSection>
      <h1>Blog</h1>
      <p>
        Explore my thoughts and insights in the blog posts below, or browse by topics on the{' '}
        <Link href="/blog/category/">categories</Link> page.
      </p>
      {blogPostMetas.length > 0 ? (
        <p>
          Showing <strong>{blogPostMetas.length}</strong> {blogPostMetas.length === 1 ? 'post' : 'posts'} in this blog.
        </p>
      ) : (
        <p>There are no posts found to display.</p>
      )}
      <BlogSummaryWrapper>
        {blogPostMetas.length > 0 &&
          blogPostMetas.map((meta) => (
            <article key={meta.post.id}>
              <BlogSummary blogPostMeta={meta} headingLevel="h2" />
            </article>
          ))}
      </BlogSummaryWrapper>
    </BlogPageSection>
  );
};
