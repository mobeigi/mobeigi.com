import type { ReactNodeConverter, SerializedLexicalNodeWithParent } from './types';

import type { SerializedEditorState } from 'lexical';
import type { SerializedLexicalNode } from 'lexical';
import { Fragment, type ReactNode } from 'react';
import { defaultReactNodeConverters } from '@payload/converter/defaultReactNodeConverters';

export async function serializeLexical(data?: SerializedEditorState): Promise<ReactNode> {
  const converters: ReactNodeConverter[] = defaultReactNodeConverters;

  if (data?.root?.children?.length) {
    return convertLexicalNodesToReactNode({
      converters,
      lexicalNodes: data?.root?.children,
      parent: data?.root,
    });
  }

  return '';
}

export async function convertLexicalNodesToReactNode({
  converters,
  lexicalNodes,
  parent,
}: {
  converters: ReactNodeConverter[];
  lexicalNodes: SerializedLexicalNode[];
  parent: SerializedLexicalNodeWithParent;
}): Promise<ReactNode> {
  const unknownConverter = converters.find((converter) => converter.nodeTypes.includes('unknown'));

  const reactNodeArray = await Promise.all(
    lexicalNodes.map(async (node, i): Promise<{ lexicalNode: SerializedLexicalNode; reactNode: ReactNode }> => {
      const converterForNode = converters.find((converter) => converter.nodeTypes.includes(node.type));
      if (!converterForNode) {
        if (unknownConverter) {
          return {
            lexicalNode: node,
            reactNode: await unknownConverter.converter({
              childIndex: i,
              converters,
              node,
              parent,
            }),
          };
        }
        return { lexicalNode: node, reactNode: <span>unknown node: {node.type}</span> };
      }

      return {
        lexicalNode: node,
        reactNode: await converterForNode.converter({
          childIndex: i,
          converters,
          node,
          parent,
        }),
      };
    }),
  );

  return (
    <Fragment>
      {reactNodeArray.map(({ reactNode }, idx) => {
        return <Fragment key={idx}>{reactNode}</Fragment>;
      })}
    </Fragment>
  );
}