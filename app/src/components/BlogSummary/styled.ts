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

export const Heading = styled.h2``;

export const DetailContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

export const Detail = styled.span`
  display: flex;
  color: ${({ theme }) => theme.colors.frame.text.base};
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.frame.text.base};
  &:hover {
    color: ${({ theme }) => theme.colors.frame.text.baseHighlight};

    svg {
      fill: ${({ theme }) => theme.colors.frame.text.baseHighlight};
    }
  }
`;

export const DetailIconWrapper = styled(IconWrapper)`
  svg {
    fill: ${({ theme }) => theme.colors.frame.text.base};
  }
`;

export const IconAndTextContainer = styled.span`
  display: flex;
  gap: 0.2em;
  justify-content: center;
  align-items: center;
`;
