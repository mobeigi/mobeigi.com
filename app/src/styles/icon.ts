import Link from 'next/link';
import styled from 'styled-components';
import { StylelessButton } from './button';

export const IconWrapper = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  svg {
    fill: var(--theme-text-base);

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
    background-color: color-mix(in srgb, var(--theme-text-base-highlight) 15%, transparent);

    svg {
      fill: var(--theme-text-base-highlight);
    }
  }

  &:hover:active {
    background-color: color-mix(in srgb, var(--theme-text-base-highlight) 30%, transparent);
  }
`;

export const IconWrapperBubbleButton = styled(IconWrapperBubble).attrs({ as: StylelessButton })``;

export const IconWrapperBubbleLink = styled(IconWrapperBubble).attrs({ as: 'a' })``;

export const IconWrapperBubbleNextLink = styled(IconWrapperBubble).attrs({ as: Link })``;

export const IconAndTextContainer = styled.span`
  display: flex;
  gap: 0.2em;
  justify-content: center;
  align-items: center;
`;
