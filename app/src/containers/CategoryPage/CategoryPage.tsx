import { CategoryPageProps } from './types';
import { CategoryPageContainer, BlogSummaryWrapper } from './styled';
import BlogSummary from '@/components/BlogSummary';

export const CategoryPage = ({ categoryTitle, categoryDescription, blogPostMetas }: CategoryPageProps) => {
  return (
    <CategoryPageContainer>
      <h1>Category: {categoryTitle}</h1>
      <p>{categoryDescription}</p>
      {blogPostMetas.length > 0 && (
        <p>
          Showing <strong>{blogPostMetas.length}</strong> {blogPostMetas.length === 1 ? 'post' : 'posts'}.
        </p>
      )}
      <BlogSummaryWrapper>
        {blogPostMetas.length ? (
          blogPostMetas.map((blogPostMeta, index) => (
            <article key={index}>
              <BlogSummary key={blogPostMeta.post.slug} blogPostMeta={blogPostMeta} linkCategory={false} />
            </article>
          ))
        ) : (
          <p>There are no posts found in this category to display.</p>
        )}
      </BlogSummaryWrapper>
    </CategoryPageContainer>
  );
};
