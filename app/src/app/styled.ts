'use client';

import styled from 'styled-components';
import zIndex from '@/styles/zindex';

export const Body = styled.body`
  display: flex;
  flex-direction: column;
`

export const Header = styled.header`
  position: fixed;
  height: 3.5em;
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${zIndex.header};
`

export const Main = styled.main`
    flex: 1;
    padding-top: 3.5em; /* Offset height of header */
`

export const Footer = styled.footer``
