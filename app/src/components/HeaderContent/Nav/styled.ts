'use client';

import styled from 'styled-components';
import Link from 'next/link';

export const NavContainer = styled.nav`
  display: flex;
  gap: 1em;
  font-weight: 700;
  align-items: center;
`;

interface StyledLinkProps {
  $active: boolean;
}

export const StyledLink = styled(Link)<StyledLinkProps>`
  color: ${({ theme, $active }) => ($active ? theme.colors.text.link : theme.colors.header.text.base)};
  text-decoration: none;

  &:hover,
  &:focus {
    color: ${({ theme, $active }) => ($active ? theme.colors.text.link : theme.colors.header.text.baseHighlight)};
  }
`;
