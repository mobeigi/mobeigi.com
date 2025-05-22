'use client';

import { IconWrapper } from '@/styles/icon';
import Link from 'next/link';
import styled from 'styled-components';

export const BlogSummaryContainer = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.4em;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 0;
  }
`;

export const Heading = styled.h2`
  text-wrap: pretty;
`;

export const DetailContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

export const Detail = styled.span`
  display: flex;
  color: var(--theme-text-subtle);
`;

export const StyledLink = styled(Link)`
  color: var(--theme-text-subtle);
  &:hover {
    color: var(--theme-text-subtle-highlight);

    svg {
      fill: var(--theme-text-subtle-highlight);
    }
  }
`;

export const DetailIconWrapper = styled(IconWrapper)`
  svg {
    fill: var(--theme-text-subtle);
  }
`;

export const IconAndTextContainer = styled.span`
  display: flex;
  gap: 0.2em;
  justify-content: center;
  align-items: center;
`;

export const StyledTime = styled.time`
  min-width: max-content;
`;

export const Excerpt = styled.span`
  text-wrap: pretty;
`;
