'use client';

import styled from 'styled-components';
import Link from 'next/link';

export const StyledLink = styled(Link)`
  color: var(--theme-text-base);
  &:hover {
    color: var(--theme-text-base-highlight);

    svg {
      fill: var(--theme-text-base-highlight);
    }
  }
`;
