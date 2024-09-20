'use client';

import { useEffect, useState } from 'react';
import extractHeadings, { HeadingElement } from '@/utils/extractHeadings';
import {
  SidebarContainer,
  CustomFieldsContainer,
  TableOfContentsNav,
  TableOfContentsHeadings,
  SectionHeading,
  CustomFieldsSection,
} from './styled';
import { SidebarProps } from './types';
import { serializeLexical } from '@/payload/lexical/serializeLexical';

const MAX_TOTAL_NUMBER_OF_HEADINGS = 8;

const countTotalHeadings = (headings: HeadingElement[]): number =>
  headings.reduce((total, heading) => total + 1 + countTotalHeadings(heading.children), 0);

/**
 * Filter headings by depth.
 * This will filter headings based on how deeply nested they are (not neccessarily by their heading level).
 */
const filterHeadingsByDepth = (headings: HeadingElement[], maxDepth: number, currentDepth = 1): HeadingElement[] => {
  if (currentDepth > maxDepth || !headings.length) {
    return [];
  }

  return headings.map((heading) => ({
    ...heading,
    children: heading.children.length ? filterHeadingsByDepth(heading.children, maxDepth, currentDepth + 1) : [],
  }));
};

const renderHeadings = (headings: HeadingElement[]) => {
  // Recursive function to render headings and their children
  const renderList = (items: HeadingElement[]) => {
    return (
      <ol>
        {items.map((item, index) => (
          <li key={index}>
            <a href={`#${item.text}`}>{item.text}</a>
            {item.children.length > 0 && renderList(item.children)}
          </li>
        ))}
      </ol>
    );
  };

  return renderList(headings);
};

export const Sidebar = ({ body, customFields }: SidebarProps) => {
  const [headingsInBlogpostContents, setHeadingsInBlogpostContents] = useState<Element[]>([]);

  const headings = extractHeadings(body);

  // Show only 1-2 levels deep based on total number of headings
  // TODO: Handle case where even the top level headings are too many over our limit
  let filteredHeadings = filterHeadingsByDepth(headings, 2);
  const h1h2Count = countTotalHeadings(filteredHeadings);
  if (h1h2Count >= MAX_TOTAL_NUMBER_OF_HEADINGS) {
    filteredHeadings = filterHeadingsByDepth(headings, 1);
  }

  useEffect(() => {
    const handleDOMLoaded = () => {
      // This element is rendered elsewhere so we only try accessing it post DOM load
      const blogpostContents = document.getElementById('blogpost-contents');
      if (blogpostContents) {
        const headings = Array.from(
          blogpostContents.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]'),
        );
        setHeadingsInBlogpostContents(headings);
      }
    };

    // Check if DOM is fully loaded
    if (document.readyState === 'complete') {
      handleDOMLoaded();
    } else {
      window.addEventListener('load', handleDOMLoaded);
    }

    return () => {
      window.removeEventListener('load', handleDOMLoaded);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!headingsInBlogpostContents.length) {
        return;
      }

      const tocNav = document.getElementById('blogpost-table-of-contents-nav');
      if (!tocNav) {
        console.warn('Required element missing: tocNav.');
        return;
      }

      const rootStyles = getComputedStyle(document.documentElement);
      const headerHeightPropertyValue = rootStyles.getPropertyValue('--header-height');
      const scrollMarginExtraPropertyValue = rootStyles.getPropertyValue('--scroll-margin-extra');

      if (!headerHeightPropertyValue || !scrollMarginExtraPropertyValue) {
        console.warn('Failed to resolve CSS variables: --header-height or --scroll-margin-extra.');
        return;
      }
      const headerHeight = parseFloat(headerHeightPropertyValue);
      const scrollMarginExtra = parseFloat(scrollMarginExtraPropertyValue);
      const fontSize = parseFloat(rootStyles.fontSize);

      if (isNaN(headerHeight) || isNaN(scrollMarginExtra) || isNaN(fontSize)) {
        console.warn('CSS values for header height, scroll margin, or font size are invalid (NaN).');
        return;
      }

      const headerHeightInPx = headerHeight * fontSize;
      const scrollMarginExtraInPx = scrollMarginExtra * fontSize;
      const bufferPx = 8;
      const scrollPosition = window.scrollY + headerHeightInPx + scrollMarginExtraInPx + bufferPx;

      let currentHeadingId = null;
      for (const heading of headingsInBlogpostContents) {
        const headingTop = heading.getBoundingClientRect().top + window.scrollY;

        if (headingTop <= scrollPosition) {
          const headingId = heading.getAttribute('id');
          const navLink = tocNav.querySelector(`li a[href="#${headingId}"]`);

          if (navLink) {
            currentHeadingId = headingId;
          }
        } else {
          break;
        }
      }

      tocNav.querySelectorAll('li').forEach((li) => li.classList.remove('active'));

      if (currentHeadingId) {
        const navLink = tocNav.querySelector(`li a[href="#${currentHeadingId}"]`)?.parentElement;
        navLink?.classList.add('active');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headingsInBlogpostContents]);

  return (
    <SidebarContainer>
      {filteredHeadings.length > 0 && (
        <>
          <section>
            <SectionHeading>Contents</SectionHeading>
            <TableOfContentsNav id="blogpost-table-of-contents-nav" aria-label="Table of contents">
              <TableOfContentsHeadings>{renderHeadings(filteredHeadings)}</TableOfContentsHeadings>
            </TableOfContentsNav>
          </section>
        </>
      )}
      {customFields && customFields.length > 0 && (
        <CustomFieldsSection>
          <SectionHeading>Other details</SectionHeading>
          <CustomFieldsContainer>
            {customFields?.map((customField, index) => (
              <span key={index}>
                <strong>{customField.key}: </strong>
                {serializeLexical(customField.value)}
              </span>
            ))}
          </CustomFieldsContainer>
        </CustomFieldsSection>
      )}
    </SidebarContainer>
  );
};
