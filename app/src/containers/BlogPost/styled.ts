'use client';

import styled from 'styled-components';

export const BlogPostContainer = styled.article`
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.mobile.maxWidth}px;
  margin: 0 auto;

  // TODO: MOVE SOME OF THESE TO GLOBAL STYLES IF RELEVANT
  .nestedListItem {
    list-style-type: none;
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

  // Inputs
  ul.list-check {
    padding: 0;
    margin-left: 0;
  }

  ul.list-check li.list-item-checkbox {
    list-style-type: none;
  }

  // Media
  img {
    display: block;
    margin: 0 auto;

    max-width: 100%;
    width: auto;
    height: auto;
  }

  video {
    display: block;
    margin: 0 auto;
    width: 100%;
    height: auto;
  }

  // Tables
  table {
    margin: 0 auto;

    // TODO: Remove below !important after tables dont use inline styles
    th {
      border-color: ${({ theme }) => theme.colors.container.accent} !important;
    }

    td {
      border-color: ${({ theme }) => theme.colors.container.accent} !important;
    }
  }
`;
