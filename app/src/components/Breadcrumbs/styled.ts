'use client';

import { IconWrapper } from '@/styles/icon';
import Link from 'next/link';
import styled from 'styled-components';

export const BreadcrumbsContainerNav = styled.nav`
  display: flex;
  gap: 0.4em;
  align-items: center;

  /* Handle having lots of breadcrumbs */
  flex-wrap: wrap;
`;

interface StyledLinkProps {
  $active: boolean;
}

export const StyledLink = styled(Link)<StyledLinkProps>`
  color: ${({ theme, $active }) => ($active ? theme.current.text.link : theme.current.text.subtle)};
  text-decoration: none;

  &:hover,
  &:focus {
    color: ${({ theme, $active }) => ($active ? theme.current.text.link : theme.current.text.subtleHighlight)};
  }

  /* Handle long breadcrumb names */
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: nowrap;
  max-width: 20ch;
`;

export const ChevronIconWrapper = styled(IconWrapper)`
  svg {
    fill: ${({ theme }) => theme.current.text.subtle};
  }
`;
