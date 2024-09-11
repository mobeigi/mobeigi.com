'use client';

import styled from 'styled-components';

export const BlogPostContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1em;

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

    /* Contrain wide images to width of blog post container */
    max-width: 100%;
    height: auto;

    border-radius: 0.2em;
  }

  video {
    display: block;
    margin: 0 auto;
    width: 100%;
    height: auto;
    border-radius: 0.2em;
  }

  // Tables
  table {
    margin: 0 auto;
    width: 100%;

    /* Break text when vw is limited */
    * {
      word-break: break-word;
      white-space: normal;
    }
  }

  // Embeds
  iframe {
    display: block;
    margin: 0 auto;

    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    border-radius: 0.2em;
  }
`;

export const BlogPostSummaryWrapper = styled.div`
  display: block;
`;

export const BlogPostSummaryContainer = styled.section`
  display: block;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.maxWidth}px) {
    max-width: ${({ theme }) => theme.breakpoints.mobile.maxWidth}px;
    margin: 0 auto;
  }
`;

export const BlogPostBodyContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 1em;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.maxWidth}px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const BlogPostContents = styled.section`
  display: block;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.mobile.maxWidth}px;
  flex-grow: 1;

  /* Remove top margin from first childfor consistent layout (start position) */
  :first-child {
    margin-top: 0;
  }
`;

export const BlogPostSidebarWrapper = styled.aside`
  display: block;
  position: sticky;
  flex-grow: 1;
  align-self: flex-start; /* Sidebar aligns at the start and allows natural height */
  top: calc(var(--header-height) + 1em); /* Show underneath header with slight offset when element becomes sticky */
  min-width: 225px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.maxWidth}px) {
    /* Hide the sidebar */
    display: none;
  }
`;
