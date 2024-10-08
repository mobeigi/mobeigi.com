import { ReactNodeConverter } from '@/payload/lexical/types';
import type { SerializedParagraphNode } from '@payloadcms/richtext-lexical';
import { convertLexicalNodesToReactNode } from '@/payload/lexical/convertLexicalNodesToReactNode';

export const ParagraphReactNodeConverter: ReactNodeConverter<SerializedParagraphNode> = {
  converter({ converters, node, parent }) {
    const children = convertLexicalNodesToReactNode({
      converters,
      lexicalNodes: node.children,
      parent: {
        ...node,
        parent,
      },
    });

    const textAlign = node.format || undefined;
    const style = {
      ...(textAlign && { textAlign: textAlign }),
    };

    return <p style={style}>{children}</p>;
  },
  nodeTypes: ['paragraph'],
};
