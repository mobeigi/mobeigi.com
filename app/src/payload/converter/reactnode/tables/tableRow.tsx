import type { ReactNodeConverter } from '@/payload/lexical/types';
import { convertLexicalNodesToReactNode } from '@/payload/lexical/serializeLexical';
import { SerializedTableRowNode } from '@payloadcms/richtext-lexical';

export const TableRowReactNodeConverter: ReactNodeConverter<SerializedTableRowNode> = {
  converter({ converters, node, parent }) {
    return (
      <tr>
        {convertLexicalNodesToReactNode({
          converters,
          lexicalNodes: node.children,
          parent: {
            ...node,
            parent,
          },
        })}
      </tr>
    );
  },
  nodeTypes: ['tablerow'],
};
