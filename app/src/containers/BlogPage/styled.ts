'use client';

import styled from 'styled-components';

export const BlogSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export const BlogSummary = styled.article`
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 0;
  }
`;

export const DetailContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

export const Detail = styled.span`
  display: flex;
  gap: 0.2em;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.status.disabled.base};
`;
