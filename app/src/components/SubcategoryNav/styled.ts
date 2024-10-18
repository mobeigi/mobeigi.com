'use client';

import { IconWrapper } from '@/styles/icon';
import Link from 'next/link';
import styled from 'styled-components';

export const ContainerNav = styled.nav`
  display: flex;

  & ul {
    display: flex;
    gap: 0.4em;

    flex-direction: column;
    margin: 0 0 0 1em;

    & li {
      display: flex;
      padding: 0;
    }
  }
`;

export const SubcategoryContainer = styled.div`
  display: flex;
  gap: 0.4em;
  color: var(--theme-text-link);
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

export const CategoryIconWrapper = styled(IconWrapper)`
  svg {
    fill: var(--theme-text-link);
  }
`;

export const IconAndTextContainer = styled.span`
  display: flex;
  gap: 0.2em;
  justify-content: center;
  align-items: center;
`;
