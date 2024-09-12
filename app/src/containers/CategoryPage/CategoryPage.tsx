import { CategoryPageProps } from './types';
import { CategoryPageContainer, BlogSummaryWrapper } from './styled';
import BlogSummary from '@/components/BlogSummary';

export const CategoryPage = ({ categoryTitle, categoryDescription, blogPostMetas }: CategoryPageProps) => {
  return (
    <CategoryPageContainer>
      <h1>Category: {categoryTitle}</h1>
      <p>{categoryDescription}</p>
      <BlogSummaryWrapper>
        {blogPostMetas.length ? (
          blogPostMetas.map((blogPostMeta, index) => (
            <article key={index}>
              <BlogSummary key={blogPostMeta.slug} blogPostMeta={blogPostMeta} />
            </article>
          ))
        ) : (
          <p>There are no posts found in this category to display.</p>
        )}
      </BlogSummaryWrapper>
    </CategoryPageContainer>
  );
};
