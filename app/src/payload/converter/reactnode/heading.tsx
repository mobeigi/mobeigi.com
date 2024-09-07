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
    return <node.tag>{children}</node.tag>;
  },
  nodeTypes: ['heading'],
};
