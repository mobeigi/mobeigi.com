import extractHeadings, { HeadingElement } from '@/utils/extractHeadings';
import {
  SidebarContainer,
  CustomFieldsContainer,
  TableOfContentsWrapper,
  TableOfContentsHeadings,
  SectionHeading,
  CustomFieldsWrapper,
} from './styled';
import { SidebarProps } from './types';

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
            {item.text}
            {item.children.length > 0 && renderList(item.children)}
          </li>
        ))}
      </ol>
    );
  };

  return renderList(headings);
};

export const Sidebar = ({ content }: SidebarProps) => {
  const headings = extractHeadings(content.body);

  // Show only 1-2 levels deep based on total number of headings
  // TODO: Handle case where even the top level headings are too many over our limit
  let filteredHeadings = filterHeadingsByDepth(headings, 2);
  const h1h2Count = countTotalHeadings(filteredHeadings);
  if (h1h2Count >= MAX_TOTAL_NUMBER_OF_HEADINGS) {
    filteredHeadings = filterHeadingsByDepth(headings, 1);
  }

  return (
    <SidebarContainer>
      {filteredHeadings.length > 0 && (
        <TableOfContentsWrapper>
          <SectionHeading>Contents</SectionHeading>
          <TableOfContentsHeadings>{renderHeadings(filteredHeadings)}</TableOfContentsHeadings>
        </TableOfContentsWrapper>
      )}
      {content.customFields && content.customFields.length > 0 && (
        <CustomFieldsWrapper>
          <SectionHeading>Other details</SectionHeading>
          <CustomFieldsContainer>
            {content.customFields?.map((customField, index) => (
              <span key={index}>
                <strong>{customField.key}: </strong>
                {customField.value}
              </span>
            ))}
          </CustomFieldsContainer>
        </CustomFieldsWrapper>
      )}
    </SidebarContainer>
  );
};
