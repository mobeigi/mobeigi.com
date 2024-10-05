import { ReactNodeConverter } from '@/payload/lexical/types';
import { SerializedQuoteNode } from '@payloadcms/richtext-lexical';
import { convertLexicalNodesToReactNode } from '@/payload/lexical/convertLexicalNodesToReactNode';

export const QuoteReactNodeConverter: ReactNodeConverter<SerializedQuoteNode> = {
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

    return <blockquote style={style}>{children}</blockquote>;
  },
  nodeTypes: ['quote'],
};
