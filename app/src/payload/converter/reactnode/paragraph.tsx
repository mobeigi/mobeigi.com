import { ReactNodeConverter } from '@/payload/lexical/types';
import type { SerializedParagraphNode } from '@payloadcms/richtext-lexical';
import { convertLexicalNodesToReactNode } from '@/payload/lexical/serializeLexical';

export const ParagraphReactNodeConverter: ReactNodeConverter<SerializedParagraphNode> = {
  async converter({ converters, node, parent }) {
    const children = await convertLexicalNodesToReactNode({
      converters,
      lexicalNodes: node.children,
      parent: {
        ...node,
        parent,
      },
    });

    return <p>{children}</p>;
  },
  nodeTypes: ['paragraph'],
};
