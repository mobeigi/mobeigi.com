'use client';
// Uncomment during local development (with hot reloading) to fix @svgr/webpack bug.
// TODO: Remove above workaround when @svgr/webpack bug is resolved. This component does not need to be a client side component.
// TOOD: Add Github issue link for this.

import { pages } from '@/constants/links';
import { BlogSummaryContainer, Detail, DetailContainer, Heading } from './styles';
import { BlogSummaryProps } from './types';
import { BlogPostMeta, Breadcrumb } from '@/types/blog';
import Link from 'next/link';
import { IconWrapper } from '@/styles/icon';
import CalendarSvg from '@/assets/icons/boxicons/bx-calendar.svg';
import CategorySvg from '@/assets/icons/boxicons/bx-category.svg';

const BASE_BLOG_URL = pages.find((entry) => entry.name === 'Blog')!.href;

const getBlogPostRelativeUrl = (blogPostMeta: BlogPostMeta) => {
  return (
    BASE_BLOG_URL + [...blogPostMeta.breadcrumbs.map((breadcrumb) => breadcrumb.slug), blogPostMeta.slug].join('/')
  );
};

const getCategoryBreadcrumb = (blogPostmeta: BlogPostMeta): Breadcrumb => {
  return blogPostmeta.breadcrumbs[blogPostmeta.breadcrumbs.length - 1];
};

export const BlogSummary = ({
  blogPostMeta,
  headingLevel = 'h2',
  linkHeading = true,
  showExcerpt = true,
}: BlogSummaryProps) => {
  const url = getBlogPostRelativeUrl(blogPostMeta);
  const categoryBreadcrumb = getCategoryBreadcrumb(blogPostMeta);
  const publishedAtDateString = blogPostMeta.publishedAt.toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <BlogSummaryContainer>
      {linkHeading ? (
        <Link href={url}>
          <Heading as={headingLevel}>{blogPostMeta.title}</Heading>
        </Link>
      ) : (
        <Heading as={headingLevel}>{blogPostMeta.title}</Heading>
      )}
      <DetailContainer>
        <Detail>
          <IconWrapper>
            <CalendarSvg />
          </IconWrapper>
          <span>{publishedAtDateString}</span>
        </Detail>
        <Detail>
          <IconWrapper>
            <CategorySvg />
          </IconWrapper>
          <span>{categoryBreadcrumb.title}</span>
        </Detail>
      </DetailContainer>
      {showExcerpt && <span>{blogPostMeta.excerpt}</span>}
    </BlogSummaryContainer>
  );
};
