import React from 'react';
import type { ReactNodeConverter } from '@/payload/lexical/types';
import { convertLexicalNodesToReactNode } from '@/payload/lexical/convertLexicalNodesToReactNode';
import { SerializedTableCellNode } from '@payloadcms/richtext-lexical';
import { TableCellHeaderStates } from '@lexical/table';

export const TableCellReactNodeConverter: ReactNodeConverter<SerializedTableCellNode> = {
  converter({ converters, node, parent }) {
    const tag = node.headerState !== TableCellHeaderStates.NO_STATUS ? 'th' : 'td';

    return React.createElement(
      tag,
      {
        colSpan: node.colSpan,
        rowSpan: node.rowSpan,
      },
      convertLexicalNodesToReactNode({
        converters,
        lexicalNodes: node.children,
        parent: {
          ...node,
          parent,
        },
      }),
    );
  },
  nodeTypes: ['tablecell'],
};
