'use client';

import { createGlobalStyle } from 'styled-components';
import HighlightJsStyles from './highlightjs';
import { breakpoints } from '@/styles/breakpoints';

// CSS includes
import '@public/css/highlight.js/mobeigi.css';

const GlobalStyle = createGlobalStyle`
  /* Includes */
  ${HighlightJsStyles}

  /* Variables */
  :root {
    --max-layout-width: 1100px;
    --header-height: 3.5rem;
    
    --scroll-margin-extra: 0.4rem;
    --scroll-margin-top-offset: calc(var(--header-height) + var(--scroll-margin-extra));
  }

  /* Light Theme */
  [data-theme='light'] {
    --theme-background: #ffffff;
    --theme-frame-background: #f6f6f6;
    --theme-frame-accent: #a1a1a1;
    --theme-container-background: #f2f2f2;
    --theme-container-accent: #a1a1a1;
    --theme-code-background: #f2f2f2;
    --theme-code-accent: #7c7c7c;

    /* Text Colors */
    --theme-text-base: #404040;
    --theme-text-base-highlight: #1a1a1a;
    --theme-text-subtle: #6a6a6a;
    --theme-text-subtle-highlight: #424242;
    --theme-text-link: #af363c;
    --theme-text-link-highlight: #fb4d56;

    /* Tooltip */
    --theme-tooltip-text: #404040;
    --theme-tooltip-background: #dadada;

    /* Status Colors */
    --theme-status-primary-base: #af363c;
    --theme-status-primary-highlight: #fb4d56;
    --theme-status-primary-accent: #80181d;
    --theme-status-primary-complement: #ffffff;

    --theme-status-secondary-base: #424242;
    --theme-status-secondary-highlight: #727272;
    --theme-status-secondary-accent: #1e1e1e;
    --theme-status-secondary-complement: #ffffff;

    --theme-status-success-base: #4caf50;
    --theme-status-success-highlight: #60d065;
    --theme-status-success-accent: #2e7d32;
    --theme-status-success-complement: #ffffff;

    --theme-status-error-base: #cd524e;
    --theme-status-error-highlight: #de5955;
    --theme-status-error-accent: #8c2d2a;
    --theme-status-error-complement: #ffffff;

    --theme-status-disabled-base: #656565;
    --theme-status-disabled-highlight: #666666;
    --theme-status-disabled-accent: #999999;
    --theme-status-disabled-complement: #333333;

    /* Engagement Section */
    --theme-engagement-platform-reddit-foreground: #ff5700;
    --theme-engagement-platform-reddit-background: #ffffff;
    --theme-engagement-platform-github-foreground: #1f2328;
    --theme-engagement-platform-github-background: #f6f8fa;
    --theme-engagement-platform-ycombinator-foreground: #fff;
    --theme-engagement-platform-ycombinator-background: #f60;
  }

  /* Dark Theme */
  [data-theme='dark'] {
    --theme-background: #1e1e1e;
    --theme-frame-background: #181717;
    --theme-frame-accent: #3a3a3a;
    --theme-container-background: #232323;
    --theme-container-accent: #3a3a3a;
    --theme-code-background: #303030;
    --theme-code-accent: #7c7c7c;

    /* Text Colors */
    --theme-text-base: #dadada;
    --theme-text-base-highlight: #f5f5f5;
    --theme-text-subtle: #999;
    --theme-text-subtle-highlight: #f5f5f5;
    --theme-text-link: #af363c;
    --theme-text-link-highlight: #fb4d56;

    /* Tooltip */
    --theme-tooltip-text: #dadada;
    --theme-tooltip-background: #424242;

    /* Status Colors */
    --theme-status-primary-base: #af363c;
    --theme-status-primary-highlight: #fb4d56;
    --theme-status-primary-accent: #80181d;
    --theme-status-primary-complement: #ffffff;

    --theme-status-secondary-base: #424242;
    --theme-status-secondary-highlight: #727272;
    --theme-status-secondary-accent: #1e1e1e;
    --theme-status-secondary-complement: #ffffff;

    --theme-status-success-base: #4caf50;
    --theme-status-success-highlight: #60d065;
    --theme-status-success-accent: #2e7d32;
    --theme-status-success-complement: #ffffff;

    --theme-status-error-base: #cd524e;
    --theme-status-error-highlight: #de5955;
    --theme-status-error-accent: #8c2d2a;
    --theme-status-error-complement: #ffffff;

    --theme-status-disabled-base: #9e9e9e;
    --theme-status-disabled-highlight: #666666;
    --theme-status-disabled-accent: #999999;
    --theme-status-disabled-complement: #333333;

    /* Engagement Section */
    --theme-engagement-platform-reddit-foreground: #ff5700;
    --theme-engagement-platform-reddit-background: #ffffff;
    --theme-engagement-platform-github-foreground: #f0f6fc;
    --theme-engagement-platform-github-background: #15191f;
    --theme-engagement-platform-ycombinator-foreground: #fff;
    --theme-engagement-platform-ycombinator-background: #f60;
  }

  /* Base font size */
  html {
    font-size: 16px;
  }

  /* Adjust font size for different screen sizes */
  @media (max-width: ${breakpoints.tablet.maxWidth}px) {
    html {
      font-size: 15px;
    }
  }

  @media (max-width: ${breakpoints.mobile.maxWidth}px) {
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
    background-color: var(--theme-background);
    color: var(--theme-text-base);
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
    line-height: 1.5em;
  }
  
  li {
    padding-left: 0;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
  }
  
  /* Nested OL */
  ol {
    list-style-type: decimal;
  }

  ol ol {
    list-style-type: upper-alpha;
  }

  ol ol ol {
    list-style-type: lower-alpha;
  }

  ol ol ol ol {
    list-style-type: upper-roman;
  }

  ol ol ol ol ol {
    list-style-type: decimal;
  }

  ol ol ol ol ol ol {
    list-style-type: upper-alpha;
  }

  ol ol ol ol ol ol ol {
    list-style-type: lower-alpha;
  }

  ol ol ol ol ol ol ol ol {
    list-style-type: upper-roman;
  }

  /* Nested UL */
  ul {
    list-style-type: disc;
  }

  ul ul {
    list-style-type: circle;
  }

  ul ul ul {
    list-style-type: square;
  }

  ul ul ul ul {
    list-style-type: disc;
  }

  ul ul ul ul ul {
    list-style-type: circle;
  }

  ul ul ul ul ul ul {
    list-style-type: square;
  }

  ul ul ul ul ul ul ul {
    list-style-type: disc;
  }

  ul ul ul ul ul ul ul ul {
    list-style-type: circle;
  }

  ul ul ul ul ul ul ul ul ul {
    list-style-type: square;
  }
  
  /* Links */
  a {
    color: var(--theme-text-link);
    text-decoration: inherit;
  }
  a:hover {
    color: var(--theme-text-link-highlight);
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
    color: var(--theme-status-primary-complement);
    background-color: var(--theme-status-primary-base);
    transition:
        border-color 0.25s,
        background-color 0.3s ease,
        transform 0.2s ease;
  }
  
  button:hover {
    background-color: var(--theme-status-primary-highlight);
  }

  button:active {
    background-color: var(--theme-status-primary-base);
  }

  button:focus,
  button:focus-visible {
    box-shadow: 0 0 0 0.25em color-mix(in srgb, var(--theme-status-primary-base) 50%, transparent);
  }

  button:disabled {
    cursor: not-allowed;

    color: var(--theme-status-disabled-complement);
    background-color: var(--theme-status-disabled-base);

    &:hover {
      /* No hover effect for disabled buttons */
      background-color: var(--theme-status-disabled-base);
    }

    &:active {
      background-color: var(--theme-status-disabled-base);
    }

    &:focus,
    &:focus-visible {
      box-shadow: 0 0 0 0.25em color-mix(in srgb, var(--theme-status-disabled-base) 50%, transparent);
    }
  }

  // Tables
  table {
    border-collapse: collapse;

    th {
      background-color: var(--theme-container-background);
    }

    th, td {
      border: 0.1em solid var(--theme-container-accent);
      padding: 0.5em;
    }
  }

  // Inline code
  code:not(pre > code) {
    background-color: var(--theme-code-background);
    padding: 0 0.2em;
    border-radius: 0.2em;
    border: 0.1em solid color-mix(in srgb, var(--theme-code-accent) 15%, transparent);
  }

  // Code
  pre code {
    white-space: pre-wrap;
    word-break: break-word;
    border-radius: 0.4em;
    border: 0.1em solid color-mix(in srgb, var(--theme-code-accent) 15%, transparent);
  }

  // Blockquote
  blockquote {
    margin-block: 1em;
    margin-inline: 0.3em;
    border-color: var(--theme-text-base);
    border-inline-start-width: 0.3em;
    border-inline-start-style: solid;
    padding-inline-start: 0.9em;
    padding-block: 0.3em;
  }

  // HR
  hr {
    width: 100%;
    border-color: var(--theme-container-accent);
  }

  // Input / textarea
  input, textarea {
    font-size: 1em;
    padding: 0.6em 1em;
    color: var(--theme-text-base);
    background-color: var(--theme-container-background);
    border: 0.1em solid var(--theme-container-accent);
    border-radius: 0.2em;
    transition: border-color 0.3s ease;
  }

  input:focus, textarea:focus,
  input:focus-visible, textarea:focus-visible {
    outline: none;
    border-color: var(--theme-text-base-highlight);
  }

  input:disabled, textarea:disabled {
    color: var(--theme-text-subtle);
  }

  textarea {
    font-family: inherit;
    resize: none;
  }
`;

export default GlobalStyle;
