import { ReactNodeConverter } from '@/payload/lexical/types';
import { SerializedHeadingNode } from '@payloadcms/richtext-lexical';
import { convertLexicalNodesToReactNode } from '@/payload/lexical/serializeLexical';

export const HeadingReactNodeConverter: ReactNodeConverter<SerializedHeadingNode> = {
  async converter({ converters, node, parent }) {
    const children = await convertLexicalNodesToReactNode({
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

    return <node.tag style={style}>{children}</node.tag>;
  },
  nodeTypes: ['heading'],
};
