import styled from 'styled-components';
import Link from 'next/link';
import { breakpoints } from '@/styles/breakpoints';

export const DesktopNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${breakpoints.mobile.maxWidth}px) {
    display: none;
  }
`;
export const MobileNav = styled.div`
  display: none;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  nav {
    flex-direction: column;
  }

  svg {
    font-size: 1.5em;
  }

  @media (max-width: ${breakpoints.mobile.maxWidth}px) {
    display: flex;
  }
`;

export const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--theme-frame-background);
  padding: 1em 0;

  top: calc(var(--header-height));
  left: 0;
  position: absolute;
  width: 100%;
`;

export const ContainerNav = styled.nav`
  display: flex;
  gap: 1em;
  font-weight: 700;
  align-items: center;
`;

interface StyledLinkProps {
  $active: boolean;
}

export const StyledLink = styled(Link)<StyledLinkProps>`
  color: ${({ $active }) => ($active ? 'var(--theme-text-link)' : 'var(--theme-text-subtle)')};
  text-decoration: none;

  &:hover,
  &:focus {
    color: ${({ $active }) => ($active ? 'var(--theme-text-link)' : 'var(--theme-text-subtle-highlight)')};
  }
`;
