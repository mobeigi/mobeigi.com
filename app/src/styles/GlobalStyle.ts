'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

export default GlobalStyle;
