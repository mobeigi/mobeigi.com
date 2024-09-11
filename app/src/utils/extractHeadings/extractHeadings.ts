import { Children, isValidElement, ReactElement, ReactNode } from 'react';
import { HeadingElement } from './types';

export const extractHeadings = (node: ReactNode): HeadingElement[] => {
  const headings: HeadingElement[] = [];

  const traverse = (child: ReactNode): void => {
    if (!isValidElement(child)) return;

    const element = child as ReactElement<any>;

    // Check if the node is a heading element (h1-h6)
    const type = element.type;
    if (typeof type === 'string' && type.match(/^h[1-6]$/)) {
      const level = parseInt(type[1]);
      const text = getNodeText(element.props.children);

      headings.push({
        text: text || 'Untitled',
        level,
        children: [],
      });
    }

    // Recursively check the children of this node if they exist
    if (element.props && element.props.children) {
      Children.forEach(element.props.children, traverse);
    }
  };

  Children.forEach(node, traverse); // Handle the case where node is an array or single element
  return buildHierarchy(headings);
};

const getNodeText = (node: ReactNode): string | null => {
  if (node == null) return '';

  switch (typeof node) {
    case 'string':
    case 'number':
    case 'boolean':
      return node.toString();
    case 'object': {
      if (node instanceof Array) {
        return node.map(getNodeText).join('');
      }

      if ('props' in node) {
        const props = (node as ReactElement<any>).props;
        return getNodeText(props.children);
      }
    }
    default:
      console.warn('Unresolved `node` of type:', typeof node, node);
      return null;
  }
};

const buildHierarchy = (headings: HeadingElement[]): HeadingElement[] => {
  const root: HeadingElement[] = [];
  const stack: HeadingElement[] = [];

  headings.forEach((heading) => {
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop();
    }
    if (stack.length === 0) {
      root.push(heading);
    } else {
      stack[stack.length - 1].children.push(heading);
    }
    stack.push(heading);
  });

  return root;
};
