'use client';

import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.frame.background};
  border-bottom: 0.2em solid ${({ theme }) => theme.colors.frame.accent};
`;

export const HeaderContents = styled.div`
  display: flex;
  width: 100%;
  margin-left: 1em;
  margin-right: 1em;
  max-width: ${({ theme }) => theme.breakpoints.desktop.maxWidth}px;
  justify-content: space-between;
  gap: 1em;

  /* Make each child take up same width, shared evenly */
  & > * {
    flex-basis: 0;
    flex-grow: 1;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  gap: 0.2em;
`;

export const LogoWrapper = styled.div`
  display: block;
  position: relative;
  width: 3.5em;
  height: 100%;
  user-select: none;

  img {
    width: auto;
    height: 100%;
    object-fit: contain;
  }
`;

export const SiteTitle = styled.span`
  display: flex;
  align-self: center;
  margin-top: 0.2em;
  font-size: 1.5em;
  font-weight: 700;
  white-space: nowrap;
  user-select: none;
`;

export const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.2em;
`;

export const RightSideNavContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.2em;
`;
