'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Base font size */
  html {
    font-size: 16px;
  }

  /* Adjust font size for different screen sizes */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.maxWidth}px) {
    html {
      font-size: 15px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile.maxWidth}px) {
    html {
      font-size: 14px;
    }
  }

  /* Root styling */
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text.base};
  }

  /* Headings */
  h1 {
    font-size: 2.25em;
    margin: 0.67em 0;
  }

  h2 {
    font-size: 2em;
    margin: 0.83em 0;
  }

  h3 {
    font-size: 1.75em;
    margin: 1em 0;
  }

  h4 {
    font-size: 1.5em;
    margin: 1.33em 0;
  }

  h5 {
    font-size: 1.25em;
    margin: 1.67em 0;
  }

  h6 {
    font-size: 1em;
    margin: 2.33em 0;
  }

  /* Lists */
  ul, ol {
    padding-left: 0em;
    margin-left: 1.5em;
  }
  
  li {
    padding-left: 0em;
  }
  
  /* Links */
  a {
    color: ${({ theme }) => theme.colors.text.link};
    text-decoration: inherit;
  }
  a:hover {
    color: ${({ theme }) => theme.colors.text.linkHighlight};
  }

  /* Buttons */
  button {
    border-radius: 4px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.status.primary.complement};
    background-color: ${({ theme }) => theme.colors.status.primary.base};
    transition:
        border-color 0.25s,
        background-color 0.3s ease,
        transform 0.2s ease;
  }
  
  button:hover {
    background-color: ${({ theme }) => theme.colors.status.primary.baseHighlight};
  }

  button:active {
    background-color: ${({ theme }) => theme.colors.status.primary.base};
  }

  button:focus,
  button:focus-visible {
    box-shadow: 0 0 0 0.25em rgba(43, 118, 163, 0.5); /* #2b76a3 */
  }

  button:disabled {
    background-color: ${({ theme }) => theme.colors.status.disabled.base};
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.status.disabled.baseHighlight};
    border-color: ${({ theme }) => theme.colors.status.disabled.accent};
  }

  button:disabled:hover {
    background-color: ${({ theme }) => theme.colors.status.disabled.base};
  }

  // Tables
  table {
    th {
      background-color: ${({ theme }) => theme.colors.container.background};
      border-color: ${({ theme }) => theme.colors.container.accent};
    }

    td {
      border-color: ${({ theme }) => theme.colors.container.accent};
    }
  }
`;

export default GlobalStyle;
