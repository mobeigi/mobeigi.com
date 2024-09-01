'use client';

import styled from 'styled-components';

export const BlogPostContainer = styled.article`
  width: 100%;

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

  blockquote {
    margin-block: 1em;
    margin-inline: 0.3em;
    border-inline-start-width: 0.3em;
    border-inline-start-style: solid;
    padding-inline-start: 0.9em;
    padding-block: 0.3em;
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

    // TODO: style td / th
  }
`;
