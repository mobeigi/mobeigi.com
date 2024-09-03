'use client';
// Uncomment during local development (with hot reloading) to fix @svgr/webpack bug.
// TODO: Remove above workaround when @svgr/webpack bug is resolved. This component does not need to be a client side component.
// TOOD: Add Github issue link for this.

import Link from 'next/link';
import { BlogPageProps, BlogPostSummary } from './types';
import { pages } from '@/constants/links';
import { BlogSummary, BlogSummaryContainer, Detail, DetailContainer } from './styled';
import { Breadcrumb } from '@/types/blog';
import CalendarSvg from '@/assets/icons/boxicons/bx-calendar.svg';
import CategorySvg from '@/assets/icons/boxicons/bx-category.svg';
import { IconWrapper } from '@/styles/icon';

const BASE_BLOG_URL = pages.find((entry) => entry.name === 'Blog')!.href;

const getBlogPostRelativeUrl = (blogPostSummary: BlogPostSummary) => {
  return (
    BASE_BLOG_URL +
    [...blogPostSummary.breadcrumbs.map((breadcrumb) => breadcrumb.slug), blogPostSummary.slug].join('/')
  );
};

const getCategoryBreadcrumb = (blogPostSummary: BlogPostSummary): Breadcrumb => {
  return blogPostSummary.breadcrumbs[blogPostSummary.breadcrumbs.length - 1];
};

export const BlogPage = ({ blogPostSummaries }: BlogPageProps) => {
  return (
    <div>
      <h1>Blog</h1>
      <p>Explore my thoughts and insights through the blog posts below.</p>
      <BlogSummaryContainer>
        {blogPostSummaries.map((blogPostSummary) => {
          const url = getBlogPostRelativeUrl(blogPostSummary);
          const categoryBreadcrumb = getCategoryBreadcrumb(blogPostSummary);
          const publishedAtDateString = blogPostSummary.publishedAt.toLocaleDateString('en-AU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          return (
            <BlogSummary key={blogPostSummary.slug}>
              <Link href={url}>
                <h2>{blogPostSummary.title}</h2>
              </Link>
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
              <span>{blogPostSummary.excerpt}</span>
            </BlogSummary>
          );
        })}
      </BlogSummaryContainer>
    </div>
  );
};
