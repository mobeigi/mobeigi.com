'use client';

import { IconWrapper } from '@/styles/icon';
import Link from 'next/link';
import styled from 'styled-components';

export const NavContainer = styled.nav`
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
  color: ${({ theme, $active }) => ($active ? theme.colors.text.link : theme.colors.frame.text.base)};
  text-decoration: none;

  &:hover,
  &:focus {
    color: ${({ theme, $active }) => ($active ? theme.colors.text.link : theme.colors.frame.text.baseHighlight)};
  }

  /* Handle long breadcrumb names */
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: nowrap;
  max-width: 20ch;
`;

export const ChevronIconWrapper = styled(IconWrapper)`
  svg {
    fill: ${({ theme }) => theme.colors.frame.text.base};
  }
`;
