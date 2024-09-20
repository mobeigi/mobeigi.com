'use client';
// Uncomment during local development (with hot reloading) to fix @svgr/webpack bug.
// TODO: Remove above workaround when @svgr/webpack bug is resolved. This component does not need to be a client side component.
// Github link: https://github.com/vercel/next.js/issues/69545

import { CategoryPageProps } from './types';
import { CategoryPageContainer, BlogSummaryWrapper, SubcategoryNav, SubcategoryContainer } from './styled';
import BlogSummary from '@/components/BlogSummary';
import Link from 'next/link';
import CategorySvg from '@/assets/icons/boxicons/bx-category.svg';
import { IconWrapper } from '@/styles/icon';

export const CategoryPage = ({ category, subcategories, blogPostMetas }: CategoryPageProps) => {
  return (
    <CategoryPageContainer>
      <h1>Category: {category.title}</h1>
      <p>{category.description}</p>
      {subcategories.length > 0 && (
        <>
          <h2>Subcategories</h2>
          <p>
            Showing <strong>{subcategories.length}</strong>{' '}
            {subcategories.length === 1 ? 'subcategory' : 'subcategories'}.
          </p>
          <SubcategoryNav aria-label="Subcategory navigation">
            <ul>
              {subcategories.map((subcategory, index) => (
                <li key={index}>
                  <SubcategoryContainer>
                    <IconWrapper>
                      <CategorySvg />
                    </IconWrapper>
                    <Link href={subcategory.url}>{subcategory.title}</Link>
                  </SubcategoryContainer>
                </li>
              ))}
            </ul>
          </SubcategoryNav>
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
          blogPostMetas.map((blogPostMeta, index) => (
            <article key={index}>
              <BlogSummary
                key={blogPostMeta.post.slug}
                blogPostMeta={blogPostMeta}
                linkCategory={false}
                headingLevel="h3"
              />
            </article>
          ))}
      </BlogSummaryWrapper>
    </CategoryPageContainer>
  );
};
