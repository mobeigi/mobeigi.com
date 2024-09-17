'use client';
// Uncomment during local development (with hot reloading) to fix @svgr/webpack bug.
// TODO: Remove above workaround when @svgr/webpack bug is resolved. This component does not need to be a client side component.
// TOOD: Add Github issue link for this.

import { BlogSummaryContainer, Detail, DetailContainer, Heading, CategoryWrapper } from './styles';
import { BlogSummaryProps } from './types';
import Link from 'next/link';
import { IconWrapper } from '@/styles/icon';
import CalendarSvg from '@/assets/icons/boxicons/bx-calendar.svg';
import CategorySvg from '@/assets/icons/boxicons/bx-category.svg';
import CommentDetailSvg from '@/assets/icons/boxicons/bxs-comment-detail.svg';

export const BlogSummary = ({
  blogPostMeta,
  headingLevel = 'h2',
  linkHeading = true,
  linkCategory = true,
  showExcerpt = true,
}: BlogSummaryProps) => {
  const publishedAtDateString = blogPostMeta.post.publishedAt.toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <BlogSummaryContainer>
      {linkHeading ? (
        <Link href={blogPostMeta.post.url}>
          <Heading as={headingLevel}>{blogPostMeta.post.title}</Heading>
        </Link>
      ) : (
        <Heading as={headingLevel}>{blogPostMeta.post.title}</Heading>
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
          <CategoryWrapper>
            {linkCategory ? (
              <Link href={blogPostMeta.post.category.url}>{blogPostMeta.post.category.title}</Link>
            ) : (
              blogPostMeta.post.category.title
            )}
          </CategoryWrapper>
        </Detail>
        <Detail>
          <IconWrapper>
            <CommentDetailSvg />
          </IconWrapper>
          <span>{blogPostMeta.related.commentCount}</span>
        </Detail>
      </DetailContainer>
      {showExcerpt && <span>{blogPostMeta.post.excerpt}</span>}
    </BlogSummaryContainer>
  );
};
