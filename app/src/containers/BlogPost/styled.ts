'use client';

import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

export const BlogPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1em;
`;

export const BlogPostArticle = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1em;

  /* Media */
  & img {
    display: block;
    margin: 0 auto;

    /* Contrain wide images to width of blog post container */
    max-width: 100%;
    height: auto;

    border-radius: 0.2em;
  }

  & video {
    display: block;
    margin: 0 auto;
    width: 100%;
    height: auto;
    border-radius: 0.2em;
  }

  /* Tables */
  & .table-wrapper {
    width: 100%;
    overflow-x: auto;
  }

  & .table-wrapper > table {
    font-size: 0.9em; /* support tightly packed tables better */
    width: 100%; /* fill container when it fits */
    min-width: max-content; /* but don't shrink below intrinsic width */
    table-layout: auto;
    margin: 0 auto;
  }

  & .table-wrapper th *,
  & .table-wrapper td * {
    white-space: nowrap;
    word-break: keep-all;
    margin: 0;
  }

  /* Embeds */
  & iframe {
    display: block;
    margin: 0 auto;

    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    border-radius: 0.2em;
  }
`;

export const BlogSummaryWrapper = styled.div`
  display: block;
`;

export const BlogSummaryContainer = styled.section`
  display: block;

  @media (max-width: ${breakpoints.tablet.maxWidth}px) {
    max-width: ${breakpoints.mobile.maxWidth}px;
    margin: 0 auto;
  }
`;

export const BlogPostBodyContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 1em;

  @media (max-width: ${breakpoints.tablet.maxWidth}px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const BlogPostContents = styled.section`
  display: block;
  width: 100%;
  max-width: ${breakpoints.mobile.maxWidth}px;
  flex-grow: 1;

  word-break: break-word;

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

  @media (max-width: ${breakpoints.tablet.maxWidth}px) {
    /* Hide the sidebar */
    display: none;
  }
`;
