import { ReactElement, ReactNode } from 'react';

export const getNodeText = (node: ReactNode): string | null => {
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
