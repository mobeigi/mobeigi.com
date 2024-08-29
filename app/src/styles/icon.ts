'use client';

import { hexToRgba } from '@/utils/theme';
import styled from 'styled-components';

export const IconWrapper = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: 1em;
  height: auto;

  svg {
    fill: ${({ theme }) => theme.colors.text.base};
  }
`;

export const IconWrapperLink = styled(IconWrapper)`
  cursor: pointer;

  &:hover {
    svg {
      fill: ${({ theme }) => theme.colors.text.baseHighlight};
    }
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const IconWrapperBubble = styled(IconWrapperLink)`
  /* Add grey circle backdrop on hover to icon */
  width: 1.2em;
  height: 1.2em;

  svg {
    width: 1em;
    height: 1em;
  }

  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1.2em;
    height: 1.2em;
    background-color: ${({ theme }) => hexToRgba(theme.colors.text.baseHighlight, 0.1)};
    border-radius: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;
