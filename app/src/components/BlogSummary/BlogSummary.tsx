import {
  BlogSummaryContainer,
  Detail,
  DetailContainer,
  Heading,
  IconAndTextContainer,
  DetailIconWrapper as IconWrapper,
  StyledLink,
  StyledTime,
  Excerpt,
} from './styled';
import { BlogSummaryProps } from './types';
import Link from 'next/link';
import CalendarSvg from '@/assets/icons/boxicons/bx-calendar.svg';
import CategorySvg from '@/assets/icons/boxicons/bx-category.svg';
import CommentDetailSvg from '@/assets/icons/boxicons/bx-comment-detail.svg';
import BarChartSvg from '@/assets/icons/boxicons/bx-bar-chart.svg';
import { ClientFormattedDate } from '@/components/ClientFormattedDate';
import { formatCompactNumber } from '@/utils/format';
import Balancer from 'react-wrap-balancer';

export const BlogSummary = ({
  blogPostMeta,
  headingLevel = 'h2',
  linkHeading = true,
  linkCategory = true,
  commentsAnchor = 'comments',
  showExcerpt = true,
}: BlogSummaryProps) => {
  const publishedAtDate = new Date(blogPostMeta.post.publishedAt);

  const standardViewCount = Intl.NumberFormat('en', { notation: 'standard' }).format(blogPostMeta.post.views);
  const compactViewCount = formatCompactNumber(blogPostMeta.post.views);

  const standardCommentCount = Intl.NumberFormat('en', { notation: 'standard' }).format(
    blogPostMeta.related.commentCount,
  );
  const compactCommentCount = formatCompactNumber(blogPostMeta.related.commentCount);

  const categoryElement = (
    <IconAndTextContainer>
      <IconWrapper>
        <CategorySvg />
      </IconWrapper>
      {/* TODO: Replace with a native CSS solution when the CSS gods bless us with one (see issue #248).
          This workaround does not correctly unwrap text when the viewport width increases.
      */}
      <Balancer preferNative={false}>{blogPostMeta.post.category.title}</Balancer>
    </IconAndTextContainer>
  );

  const commentCountElement = (
    <IconAndTextContainer>
      <IconWrapper>
        <CommentDetailSvg />
      </IconWrapper>
      <span>{compactCommentCount}</span>
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
        <Detail data-tooltip-id="global-tooltip" data-tooltip-content="Date published">
          <IconAndTextContainer>
            <IconWrapper>
              <CalendarSvg />
            </IconWrapper>
            <StyledTime dateTime={publishedAtDate.toISOString()}>
              <ClientFormattedDate date={publishedAtDate} format="d MMMM yyyy" />
            </StyledTime>
          </IconAndTextContainer>
        </Detail>
        <Detail data-tooltip-id="global-tooltip" data-tooltip-content="Category">
          {linkCategory ? (
            <StyledLink href={blogPostMeta.post.category.url}>{categoryElement}</StyledLink>
          ) : (
            categoryElement
          )}
        </Detail>
        <Detail data-tooltip-id="global-tooltip" data-tooltip-html={`${standardViewCount} views`}>
          <IconAndTextContainer>
            <IconWrapper>
              <BarChartSvg />
            </IconWrapper>
            <span>{compactViewCount}</span>
          </IconAndTextContainer>
        </Detail>
        <Detail data-tooltip-id="global-tooltip" data-tooltip-html={`${standardCommentCount} comments`}>
          {commentsAnchor ? (
            <StyledLink href={`${blogPostMeta.post.url}#${commentsAnchor}`}>{commentCountElement}</StyledLink>
          ) : (
            commentCountElement
          )}
        </Detail>
      </DetailContainer>
      {showExcerpt && <Excerpt>{blogPostMeta.post.excerpt}</Excerpt>}
    </BlogSummaryContainer>
  );
};
