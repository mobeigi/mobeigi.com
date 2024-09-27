'use client';

import { IconWrapper } from '@/styles/icon';
import { styled } from 'styled-components';

export const BuildInfoSpan = styled.span`
  display: flex;
`;

export const StyledA = styled.a`
  color: ${({ theme }) => theme.colors.text.subtle};
  &:hover {
    color: ${({ theme }) => theme.colors.text.subtleHighlight};

    svg {
      fill: ${({ theme }) => theme.colors.text.subtleHighlight};
    }
  }
`;

export const CustomIconWrapper = styled(IconWrapper)`
  svg {
    fill: ${({ theme }) => theme.colors.text.subtle};
  }
`;

export const IconAndTextContainer = styled.span`
  display: flex;
  gap: 0.2em;
  justify-content: center;
  align-items: center;
`;
