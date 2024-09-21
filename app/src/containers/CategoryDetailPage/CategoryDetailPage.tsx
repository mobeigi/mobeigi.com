'use client';
// Uncomment during local development (with hot reloading) to fix @svgr/webpack bug.
// TODO: Remove above workaround when @svgr/webpack bug is resolved. This component does not need to be a client side component.
// Github link: https://github.com/vercel/next.js/issues/69545

import { CategoryDetailPageProps } from './types';
import { CategoryDetailPageContainer, BlogSummaryWrapper, CategoryNameWrapper } from './styled';
import BlogSummary from '@/components/BlogSummary';
import Link from 'next/link';
import CategorySvg from '@/assets/icons/boxicons/bx-category.svg';
import { IconWrapper } from '@/styles/icon';
import { SubcategoryContainer, SubcategoryNav } from '@/styles/containers/subcategory';

export const CategoryDetailPage = ({ category, subCategories, blogPostMetas }: CategoryDetailPageProps) => {
  return (
    <CategoryDetailPageContainer>
      <h1>
        Category: <CategoryNameWrapper>{category.title}</CategoryNameWrapper>
      </h1>
      <p>{category.description}</p>
      {subCategories.length > 0 && (
        <>
          <h2>Subcategories</h2>
          <p>
            Showing <strong>{subCategories.length}</strong>{' '}
            {subCategories.length === 1 ? 'subcategory' : 'subcategories'}.
          </p>
          <SubcategoryNav aria-label={`Subcategory navigation for category: ${category.title}`}>
            <ul>
              {subCategories.map((subcategory, index) => (
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
          blogPostMetas.map((blogPostMeta) => (
            <article key={blogPostMeta.post.id}>
              <BlogSummary blogPostMeta={blogPostMeta} linkCategory={false} headingLevel="h3" />
            </article>
          ))}
      </BlogSummaryWrapper>
    </CategoryDetailPageContainer>
  );
};
