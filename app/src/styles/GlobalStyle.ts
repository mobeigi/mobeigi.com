'use client';

import { hexToRgba } from '@/utils/theme';
import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

const GlobalStyle = createGlobalStyle`
  /* Variables */
  :root {
    --max-layout-width: 1100px;
    --header-height: 3.5rem;
    
    --scroll-margin-extra: 0.4rem;
    --scroll-margin-top-offset: calc(var(--header-height) + var(--scroll-margin-extra));
  }

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
  html {
    scroll-behavior: smooth;
  }
  
  body {
    min-height: 100vh; /* Allowing scrolling if not enough height in viewport*/
    display: flex;
    flex-direction: column;

    // Default Colors
    background-color: ${({ theme }) => theme.current.background};
    color: ${({ theme }) => theme.current.text.base};
  }

  /* Paragraph */
  p {
    line-height: 1.5em;
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

  h1, h2, h3, h4, h5, h6 {
    /* Adjust scroll margin to compensate for fixed header */
    scroll-margin-top: var(--scroll-margin-top-offset);
  }

  /* Lists */
  ul, ol {
    padding-left: 0;
    margin-left: 1.5em;
  }
  
  li {
    padding-left: 0;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
  }
  
  /* Links */
  a {
    color: ${({ theme }) => theme.current.text.link};
    text-decoration: inherit;
  }
  a:hover {
    color: ${({ theme }) => theme.current.text.linkHighlight};
  }

  /* Buttons */
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    
    border-radius: 0.2em;
    border: 0.1em solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    color: ${({ theme }) => theme.current.status.primary.complement};
    background-color: ${({ theme }) => theme.current.status.primary.base};
    transition:
        border-color 0.25s,
        background-color 0.3s ease,
        transform 0.2s ease;
  }
  
  button:hover {
    background-color: ${({ theme }) => theme.current.status.primary.baseHighlight};
  }

  button:active {
    background-color: ${({ theme }) => theme.current.status.primary.base};
  }

  button:focus,
  button:focus-visible {
    box-shadow: 0 0 0 0.25em ${({ theme }) => hexToRgba(theme.current.status.primary.base, 0.5)};
  }

  button:disabled {
    cursor: not-allowed;

    color: ${({ theme }) => theme.current.status.disabled.complement};
    background-color: ${({ theme }) => theme.current.status.disabled.base};

    &:hover {
      /* No hover effect for disabled buttons */
      background-color: ${({ theme }) => theme.current.status.disabled.base};
    }

    &:active {
      background-color: ${({ theme }) => theme.current.status.disabled.base};
    }

    &:focus,
    &:focus-visible {
      box-shadow: 0 0 0 0.25em ${({ theme }) => hexToRgba(theme.current.status.disabled.base, 0.5)};
    }
  }

  // Tables
  table {
    border-collapse: collapse;

    th {
      background-color: ${({ theme }) => theme.current.container.background};
    }

    th, td {
      border: 0.1em solid ${({ theme }) => theme.current.container.accent};
      padding: 0.5em;
    }
  }

  // Inline code
  code:not(pre > code) {
    background-color: ${({ theme }) => theme.current.code.background};
    padding: 0 0.2em;
    border-radius: 0.2em;
    border: 0.1em solid ${({ theme }) => hexToRgba(theme.current.code.accent, 0.15)};
  }

  // Code
  pre code {
    white-space: pre-wrap;
    word-break: break-word;
    border-radius: 0.4em;
    border: 0.1em solid ${({ theme }) => hexToRgba(theme.current.code.accent, 0.15)};
  }

  // Blockquote
  blockquote {
    margin-block: 1em;
    margin-inline: 0.3em;
    border-color: ${({ theme }) => theme.current.text.base};
    border-inline-start-width: 0.3em;
    border-inline-start-style: solid;
    padding-inline-start: 0.9em;
    padding-block: 0.3em;
  }

  // HR
  hr {
    width: 100%;
    border-color: ${({ theme }) => theme.current.container.accent};
  }

  // Input
  input {
    font-size: 1em;
    padding: 0.6em 1em;
    color: ${({ theme }) => theme.current.text.base};
    background-color: ${({ theme }) => theme.current.container.background};
    border: 0.1em solid ${({ theme }) => theme.current.container.accent};
    border-radius: 0.2em;
    transition: border-color 0.3s ease;
  }

  input:focus,
  input:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.current.text.baseHighlight};
  }

  input:disabled {
    color: ${({ theme }) => theme.current.text.subtle};
  }
`;

export default GlobalStyle;
