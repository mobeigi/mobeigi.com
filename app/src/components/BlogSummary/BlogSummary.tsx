'use client';
// Uncomment during local development (with hot reloading) to fix @svgr/webpack bug.
// TODO: Remove above workaround when @svgr/webpack bug is resolved. This component does not need to be a client side component.
// Github link: https://github.com/vercel/next.js/issues/69545

import { BlogSummaryContainer, Detail, DetailContainer, Heading } from './styles';
import { BlogSummaryProps } from './types';
import Link from 'next/link';
import { IconWrapper } from '@/styles/icon';
import CalendarSvg from '@/assets/icons/boxicons/bx-calendar.svg';
import CategorySvg from '@/assets/icons/boxicons/bx-category.svg';
import CommentDetailSvg from '@/assets/icons/boxicons/bxs-comment-detail.svg';
import DateFormatter from '@/components/DateFormatter';

export const BlogSummary = ({
  blogPostMeta,
  headingLevel = 'h2',
  linkHeading = true,
  linkCategory = true,
  commentsAnchor = 'comments',
  showExcerpt = true,
}: BlogSummaryProps) => {
  const publishedAtDate = new Date(blogPostMeta.post.publishedAt);

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
          <time dateTime={publishedAtDate.toISOString()}>
            <DateFormatter date={publishedAtDate} format="d MMMM yyyy" />
          </time>
        </Detail>
        <Detail>
          <IconWrapper>
            <CategorySvg />
          </IconWrapper>
          <span>
            {linkCategory ? (
              <Link href={blogPostMeta.post.category.url}>{blogPostMeta.post.category.title}</Link>
            ) : (
              blogPostMeta.post.category.title
            )}
          </span>
        </Detail>
        <Detail>
          <IconWrapper>
            <CommentDetailSvg />
          </IconWrapper>
          <span>
            {commentsAnchor ? (
              <Link href={`${blogPostMeta.post.url}#${commentsAnchor}`}>{blogPostMeta.related.commentCount}</Link>
            ) : (
              <>{blogPostMeta.related.commentCount}</>
            )}
          </span>
        </Detail>
      </DetailContainer>
      {showExcerpt && <span>{blogPostMeta.post.excerpt}</span>}
    </BlogSummaryContainer>
  );
};
