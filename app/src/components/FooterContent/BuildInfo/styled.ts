import { IconWrapper } from '@/styles/icon';
import { styled } from 'styled-components';

export const BuildInfoSpan = styled.span`
  display: flex;
`;

export const StyledA = styled.a`
  color: var(--theme-text-subtle);
  &:hover {
    color: var(--theme-text-subtle-highlight);

    svg {
      fill: var(--theme-text-subtle-highlight);
    }
  }
`;

export const CustomIconWrapper = styled(IconWrapper)`
  svg {
    fill: var(--theme-text-subtle);
  }
`;
