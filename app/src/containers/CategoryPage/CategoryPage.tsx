'use client';
// Uncomment during local development (with hot reloading) to fix @svgr/webpack bug.
// TODO: Remove above workaround when @svgr/webpack bug is resolved. This component does not need to be a client side component.
// Github link: https://github.com/vercel/next.js/issues/69545

import { CategoryPageSection, RootCategoryWrapper } from './styled';
import { CategoryPageProps } from './types';
import Link from 'next/link';
import SubcategoryNav from '@/components/SubcategoryNav';

export const CategoryPage = ({ rootCategories }: CategoryPageProps) => {
  return (
    <CategoryPageSection>
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
                <SubcategoryNav category={rootCategory.category} subcategories={rootCategory.subcategories} />
              </div>
            );
          })}
      </RootCategoryWrapper>
    </CategoryPageSection>
  );
};
