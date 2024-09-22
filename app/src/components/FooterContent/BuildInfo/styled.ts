'use client';

import { styled } from 'styled-components';

export const BuildInfo = styled.span`
  display: flex;
  gap: 0.2em;
  align-items: center;

  & a {
    color: ${({ theme }) => theme.colors.frame.text.base};
  }

  & a:hover {
    color: ${({ theme }) => theme.colors.frame.text.baseHighlight};
  }
`;
