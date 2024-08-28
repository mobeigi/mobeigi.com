'use client';

import { ThemeMode } from 'react-toggle-dark-mode';
import styled from 'styled-components';

export const FooterContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.frame.background};
`;

export const FooterContents = styled.div`
  display: flex;
  width: 100%;
  margin-left: 1em;
  margin-right: 1em;
  max-width: ${({ theme }) => theme.breakpoints.desktop.maxWidth}px;
  justify-content: center;
  gap: 1em;

  padding-top: 1em;
  padding-bottom: 1em;
  font-size: 0.9em;

  color: ${({ theme }) => theme.colors.frame.text.base};
`;

export const LogoWrapper = styled.div`
  display: flex;
  user-select: none;
  width: 128px;
  height: 35px;
  margin-top: 1em;

  // TODO: Replace with SVG fills / stroke
  filter: invert(${({ theme }) => (theme.currentTheme === ThemeMode.Dark ? 1 : 0)});

  img {
    width: 128px;
    height: 35px;
    min-width: 128px;
    min-height: 35px;
  }
`;

export const FooterNav = styled.nav`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: center;
  gap: 5em;

  p {
    font-weight: bold;
    text-transform: uppercase;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    font-size: 0.9em;

    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li a {
    color: ${({ theme }) => theme.colors.frame.text.base};
  }

  li a:hover {
    color: ${({ theme }) => theme.colors.frame.text.baseHighlight};
  }
`;

export const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

export const Copyright = styled.p`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  font-size: 0.85em;
`;
