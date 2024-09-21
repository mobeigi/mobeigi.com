'use client';
// Uncomment during local development (with hot reloading) to fix @svgr/webpack bug.
// TODO: Remove above workaround when @svgr/webpack bug is resolved. This component does not need to be a client side component.
// Github link: https://github.com/vercel/next.js/issues/69545

import { IconWrapper } from '@/styles/icon';
import { CategoryPageContainer, RootCategoryWrapper } from './styled';
import { SubcategoryContainer, SubcategoryNav } from '@/styles/containers/subcategory';
import { CategoryPageProps } from './types';
import CategorySvg from '@/assets/icons/boxicons/bx-category.svg';
import Link from 'next/link';

export const CategoryPage = ({ rootCategories }: CategoryPageProps) => {
  return (
    <CategoryPageContainer>
      <h1>Category</h1>
      {rootCategories.length > 0 ? (
        <p>
          Showing <strong>{rootCategories.length}</strong> top-level{' '}
          {rootCategories.length === 1 ? 'category' : 'categories'} in this blog.
        </p>
      ) : (
        <p>There are no top-level categories in this blog.</p>
      )}
      <RootCategoryWrapper>
        {rootCategories.length > 0 &&
          rootCategories.map((rootCategory, index) => {
            return (
              <div key={index}>
                <Link href={rootCategory.category.url}>
                  <h2>{rootCategory.category.title}</h2>
                </Link>
                <p>
                  Showing <strong>{rootCategory.subcategories.length}</strong>{' '}
                  {rootCategory.subcategories.length === 1 ? 'subcategory' : 'subcategories'}.
                </p>
                <SubcategoryNav aria-label={`Subcategory navigation for category: ${rootCategory.category.title}`}>
                  <ul>
                    {rootCategory.subcategories.map((subcategory, index) => (
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
              </div>
            );
          })}
      </RootCategoryWrapper>
    </CategoryPageContainer>
  );
};
