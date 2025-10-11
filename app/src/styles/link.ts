'use client';

import styled from 'styled-components';
import Link from 'next/link';

export const StyledBaseLink = styled(Link)`
  color: var(--theme-text-base);
  &:hover {
    color: var(--theme-text-base-highlight);

    svg {
      fill: var(--theme-text-base-highlight);
    }
  }
`;

export const StyledSublteLink = styled(Link)`
  color: var(--theme-text-subtle);
  &:hover {
    color: var(--theme-text-subtle-highlight);

    svg {
      fill: var(--theme-text-subtle-highlight);
    }
  }
`;

export const StyledLink = styled(Link)`
  color: var(--theme-text-link);
  &:hover {
    color: var(--theme-text-link-highlight);

    svg {
      fill: var(--theme-text-link-highlight);
    }
  }
`;
