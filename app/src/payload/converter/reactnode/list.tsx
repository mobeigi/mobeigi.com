import { ReactNodeConverter } from '@/payload/lexical/types';
import { SerializedListItemNode, SerializedListNode } from '@payloadcms/richtext-lexical';
import { convertLexicalNodesToReactNode } from '@/payload/lexical/serializeLexical';

export const ListReactNodeConverter: ReactNodeConverter<SerializedListNode> = {
  converter: ({ converters, node, parent }) => {
    const children = convertLexicalNodesToReactNode({
      converters,
      lexicalNodes: node.children,
      parent: {
        ...node,
        parent,
      },
    });

    switch (node.tag) {
      case 'ol':
        return <ol>{children}</ol>;
      case 'ul':
        return <ul>{children}</ul>;
      default:
        return <span>unsupported list type: {node.tag}</span>;
    }
  },
  nodeTypes: ['list'],
};

export const ListItemReactNodeConverter: ReactNodeConverter<SerializedListItemNode> = {
  converter: ({ converters, node, parent }) => {
    const children = convertLexicalNodesToReactNode({
      converters,
      lexicalNodes: node.children,
      parent: {
        ...node,
        parent,
      },
    });

    // TODO: Reimplement $getListDepth (https://github.com/facebook/lexical/blob/main/packages/lexical-list/src/utils.ts#L27) for nicer-looking lists
    const isSublist = node.children && node.children[0].type === 'list';

    const textAlign = node.format || undefined;
    const style = {
      listStyleType: isSublist ? 'none' : 'inherit',
      ...(textAlign && { textAlign: textAlign }),
    };

    return <li style={style}>{children}</li>;
  },
  nodeTypes: ['listitem'],
};
