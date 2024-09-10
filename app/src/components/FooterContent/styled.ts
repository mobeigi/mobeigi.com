'use client';

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
  max-width: ${({ theme }) => theme.breakpoints.desktop.maxWidth}px;

  justify-content: center;
  gap: 1em;

  padding-left: 1em;
  padding-right: 1em;
  padding-top: 1em;
  padding-bottom: 1em;
  box-sizing: border-box;

  font-size: 0.9em;
  color: ${({ theme }) => theme.colors.frame.text.base};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.maxWidth}px) {
    flex-direction: column;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  user-select: none;
  width: 128px;
  height: 35px;
  margin-top: 1em;

  svg {
    fill: ${({ theme }) => theme.colors.frame.text.base} !important;

    path {
      stroke: ${({ theme }) => theme.colors.frame.text.base} !important;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.maxWidth}px) {
    align-self: center;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.maxWidth}px) {
    flex-direction: column;
    gap: 0.5em;
    ul {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
`;

export const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.maxWidth}px) {
    align-items: center;
  }
`;

export const Copyright = styled.p`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  font-size: 0.85em;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.maxWidth}px) {
    align-items: center;
  }
`;
