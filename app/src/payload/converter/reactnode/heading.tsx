import { ReactNodeConverter } from '@/payload/lexical/types';
import { SerializedHeadingNode } from '@payloadcms/richtext-lexical';
import { convertLexicalNodesToReactNode } from '@/payload/lexical/serializeLexical';
import { getNodeText } from '@/utils/react';

export const HeadingReactNodeConverter: ReactNodeConverter<SerializedHeadingNode> = {
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

    // Add an id to headings for anchor linking
    const id = getNodeText(children);

    return (
      <node.tag id={id || undefined} style={style}>
        {children}
      </node.tag>
    );
  },
  nodeTypes: ['heading'],
};
