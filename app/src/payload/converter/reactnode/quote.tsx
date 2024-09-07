import { ReactNodeConverter } from '@/payload/lexical/types';
import { SerializedQuoteNode } from '@payloadcms/richtext-lexical';
import { convertLexicalNodesToReactNode } from '@/payload/lexical/serializeLexical';

export const QuoteReactNodeConverter: ReactNodeConverter<SerializedQuoteNode> = {
  async converter({ converters, node, parent }) {
    const children = await convertLexicalNodesToReactNode({
      converters,
      lexicalNodes: node.children,
      parent: {
        // TODO: Is spreading node here correct?
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