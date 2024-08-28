'use client';

import styled from 'styled-components';
import zIndex from '@/styles/zindex';

export const Body = styled.body`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  position: fixed;
  height: 3.35em;
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${zIndex.header};
`;

export const ScrollableContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;

export const Main = styled.main`
  flex: 1;
  padding-top: 3.35em; /* Offset height of header */

  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

export const MainContents = styled.div`
  display: flex;
  width: 100%;
  margin-left: 1em;
  margin-right: 1em;
  max-width: ${({ theme }) => theme.breakpoints.desktop.maxWidth}px;
`;

export const Footer = styled.footer``;
