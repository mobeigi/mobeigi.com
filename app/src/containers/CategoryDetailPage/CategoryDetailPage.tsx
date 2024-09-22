'use client';
// Uncomment during local development (with hot reloading) to fix @svgr/webpack bug.
// TODO: Remove above workaround when @svgr/webpack bug is resolved. This component does not need to be a client side component.
// Github link: https://github.com/vercel/next.js/issues/69545

import { CategoryDetailPageProps } from './types';
import { CategoryDetailPageContainer, BlogSummaryWrapper, CategoryNameWrapper } from './styled';
import BlogSummary from '@/components/BlogSummary';
import SubcategoryNav from '@/components/SubcategoryNav';

export const CategoryDetailPage = ({ category, subcategories, blogPostMetas }: CategoryDetailPageProps) => {
  return (
    <CategoryDetailPageContainer>
      <h1>
        Category: <CategoryNameWrapper>{category.title}</CategoryNameWrapper>
      </h1>
      <p>{category.description}</p>
      {subcategories.length > 0 && (
        <>
          <h2>Subcategories</h2>
          <p>
            Showing <strong>{subcategories.length}</strong>{' '}
            {subcategories.length === 1 ? 'subcategory' : 'subcategories'}.
          </p>
          <SubcategoryNav category={category} subcategories={subcategories} />
        </>
      )}
      <h2>Posts</h2>
      {blogPostMetas.length > 0 ? (
        <p>
          Showing <strong>{blogPostMetas.length}</strong> {blogPostMetas.length === 1 ? 'post' : 'posts'} in this
          category.
        </p>
      ) : (
        <p>There are no posts in this category.</p>
      )}
      <BlogSummaryWrapper>
        {blogPostMetas.length > 0 &&
          blogPostMetas.map((blogPostMeta) => (
            <article key={blogPostMeta.post.id}>
              <BlogSummary blogPostMeta={blogPostMeta} linkCategory={false} headingLevel="h3" />
            </article>
          ))}
      </BlogSummaryWrapper>
    </CategoryDetailPageContainer>
  );
};
