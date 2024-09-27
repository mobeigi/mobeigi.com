'use client';

import { hexToRgba } from '@/utils/theme';
import Link from 'next/link';
import styled from 'styled-components';
import { StylelessButton } from './button';

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

export const IconWrapperBubble = styled(IconWrapper)`
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

    svg {
      fill: ${({ theme }) => theme.colors.text.baseHighlight};
    }
  }

  &:hover:active {
    background-color: ${({ theme }) => hexToRgba(theme.colors.text.baseHighlight, 0.3)};
  }
`;

export const IconWrapperBubbleButton = styled(IconWrapperBubble).attrs({ as: StylelessButton })``;

export const IconWrapperBubbleLink = styled(IconWrapperBubble).attrs({ as: 'a' })``;

export const IconWrapperBubbleNextLink = styled(IconWrapperBubble).attrs({ as: Link })``;
