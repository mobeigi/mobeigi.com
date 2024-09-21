'use client';

import styled from 'styled-components';

export const CategoryDetailPageContainer = styled.div`
  width: 100%;
`;

export const BlogSummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
`;

export const CategoryNameWrapper = styled.span`
  color: ${({ theme }) => theme.colors.text.link};
`;
