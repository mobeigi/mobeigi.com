import {
  BlogSummaryContainer,
  Detail,
  DetailContainer,
  Heading,
  IconAndTextContainer,
  DetailIconWrapper as IconWrapper,
  StyledLink,
} from './styled';
import { BlogSummaryProps } from './types';
import Link from 'next/link';
import CalendarSvg from '@/assets/icons/boxicons/bx-calendar.svg';
import CategorySvg from '@/assets/icons/boxicons/bx-category.svg';
import CommentDetailSvg from '@/assets/icons/boxicons/bx-comment-detail.svg';
import BarChartSvg from '@/assets/icons/boxicons/bx-bar-chart.svg';
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

  const categoryElement = (
    <IconAndTextContainer>
      <IconWrapper>
        <CategorySvg />
      </IconWrapper>
      <span>{blogPostMeta.post.category.title}</span>
    </IconAndTextContainer>
  );

  const commentCountElement = (
    <IconAndTextContainer>
      <IconWrapper>
        <CommentDetailSvg />
      </IconWrapper>
      <span>{blogPostMeta.related.commentCount}</span>
    </IconAndTextContainer>
  );

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
        <Detail data-tooltip-id="base-tooltip" data-tooltip-content="Date published">
          <IconAndTextContainer>
            <IconWrapper>
              <CalendarSvg />
            </IconWrapper>
            <time dateTime={publishedAtDate.toISOString()}>
              <DateFormatter date={publishedAtDate} format="d MMMM yyyy" />
            </time>
          </IconAndTextContainer>
        </Detail>
        <Detail data-tooltip-id="base-tooltip" data-tooltip-content="Category">
          {linkCategory ? (
            <StyledLink href={blogPostMeta.post.category.url}>{categoryElement}</StyledLink>
          ) : (
            categoryElement
          )}
        </Detail>
        <Detail data-tooltip-id="base-tooltip" data-tooltip-content="Views">
          <IconAndTextContainer>
            <IconWrapper>
              <BarChartSvg />
            </IconWrapper>
            <span>{blogPostMeta.post.views}</span>
          </IconAndTextContainer>
        </Detail>
        <Detail data-tooltip-id="base-tooltip" data-tooltip-content="Comments">
          {commentsAnchor ? (
            <StyledLink href={`${blogPostMeta.post.url}#${commentsAnchor}`}>{commentCountElement}</StyledLink>
          ) : (
            commentCountElement
          )}
        </Detail>
      </DetailContainer>
      {showExcerpt && <span>{blogPostMeta.post.excerpt}</span>}
    </BlogSummaryContainer>
  );
};
