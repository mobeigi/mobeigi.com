'use client';

import { IconWrapper } from '@/styles/icon';
import { styled } from 'styled-components';

export const BuildInfoSpan = styled.span`
  display: flex;
`;

export const StyledA = styled.a`
  color: ${({ theme }) => theme.colors.frame.text.base};
  &:hover {
    color: ${({ theme }) => theme.colors.frame.text.baseHighlight};

    svg {
      fill: ${({ theme }) => theme.colors.frame.text.baseHighlight};
    }
  }
`;

export const CustomIconWrapper = styled(IconWrapper)`
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
