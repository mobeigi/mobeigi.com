'use client';

import { hexToRgba } from '@/utils/theme';
import styled from 'styled-components';

export const IconWrapper = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  svg {
    fill: ${({ theme }) => theme.colors.text.base};

    width: auto;
    height: 1em;
  }
`;

export const IconWrapperLink = styled(IconWrapper)`
  cursor: pointer;

  &:hover {
    svg {
      fill: ${({ theme }) => theme.colors.text.baseHighlight};
    }
  }
`;

export const IconWrapperBubble = styled(IconWrapperLink)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 0.1em;
  transition: background-color 0.3s ease;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: ${({ theme }) => hexToRgba(theme.colors.text.baseHighlight, 0.15)};
  }

  &:hover:active {
    background-color: ${({ theme }) => hexToRgba(theme.colors.text.baseHighlight, 0.3)};
  }
`;
