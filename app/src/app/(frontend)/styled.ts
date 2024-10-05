'use client';

import styled from 'styled-components';
import zIndex from '@/styles/zindex';

export const Header = styled.header`
  position: fixed;
  height: var(--header-height);
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${zIndex.header};
`;

export const Main = styled.main`
  display: flex;
  width: 100%;
  justify-content: center;
  flex: 1;

  padding-top: var(--header-height); /* Offset height of header */

  /* Adjust scroll margin to compensate for header */
  scroll-margin-top: var(--scroll-margin-top-offset);
`;

export const MainContents = styled.div`
  // display: flex;
  width: 100%;
  max-width: var(--max-layout-width);

  padding-left: 1em;
  padding-right: 1em;
  padding-top: 1.5em;
  padding-bottom: 1.5em;
  box-sizing: border-box;
`;

export const Footer = styled.footer`
  width: 100%;

  /* Adjust scroll margin to compensate for header */
  scroll-margin-top: var(--scroll-margin-top-offset);
`;
