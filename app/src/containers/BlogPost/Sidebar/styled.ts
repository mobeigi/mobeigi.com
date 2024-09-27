'use client';

import styled from 'styled-components';

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;

  padding-left: 1em;
  padding-right: 1em;
  padding-top: 1em;
  padding-bottom: 1em;
  box-sizing: border-box;
`;

export const SectionHeading = styled.h2`
  /* Style as h5 */
  font-size: 1.25em;

  margin-top: 0;
  margin-bottom: 1em;
`;

export const TableOfContentsNav = styled.nav``;

export const TableOfContentsHeadings = styled.span`
  ol,
  ol * ol {
    list-style-type: none !important;
  }

  li {
    padding: 1em 0 0 0;
  }

  /* Remove margin / padding from first element */
  > ol:first-of-type {
    margin: 0;

    > li:first-of-type {
      padding: 0;
    }
  }

  li a {
    color: ${({ theme }) => theme.colors.text.subtle};
    transition: all 50ms ease-in-out;
  }

  li a:hover {
    color: ${({ theme }) => theme.colors.text.subtleHighlight};
  }

  li.active > a {
    color: ${({ theme }) => theme.colors.text.link};
  }
`;
