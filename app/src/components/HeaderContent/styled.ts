'use client';

import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.header.background};
  border-bottom: 0.2em solid ${({ theme }) => theme.colors.header.accent};
`;

export const HeaderContents = styled.div`
  display: flex;
  width: 100%;
  margin-left: 1em;
  margin-right: 1em;
  max-width: ${({ theme }) => theme.breakpoints.desktop.maxWidth}px;
  justify-content: space-between;
`;

export const LogoContainer = styled.div`
  display: flex;
  gap: 0.2em;
`;

export const LogoWrapper = styled.div`
  display: flex;
  user-select: none;
  width: 48px;
  height: 48px;
  align-self: flex-end;

  img {
    width: 48px;
    height: 48px;
    min-width: 48px;
    min-height: 48px;
  }
`;

export const SiteTitle = styled.span`
  display: flex;
  align-self: center;
  margin-top: 0.4em;
  font-size: 1.5em;
  font-weight: 700;
  white-space: nowrap;
  user-select: none;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 1em;
  font-weight: 700;
  align-items: center;

  & a {
    color: ${({ theme }) => theme.colors.header.text.base};
    text-decoration: none;
  }

  & a:hover,
  & a:focus {
    color: ${({ theme }) => theme.colors.header.text.baseHighlight};
  }
`;
