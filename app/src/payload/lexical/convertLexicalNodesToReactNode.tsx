import type { ReactNodeConverter, SerializedLexicalNodeWithParent } from './types';
import type { SerializedLexicalNode } from 'lexical';
import { Fragment, type ReactNode } from 'react';

export const convertLexicalNodesToReactNode = ({
  converters,
  lexicalNodes,
  parent,
}: {
  converters: ReactNodeConverter[];
  lexicalNodes: SerializedLexicalNode[];
  parent: SerializedLexicalNodeWithParent;
}): ReactNode => {
  const unknownConverter = converters.find((converter) => converter.nodeTypes.includes('unknown'));

  const reactNodeArray = lexicalNodes.map((node, i) => {
    const converterForNode = converters.find((converter) => converter.nodeTypes.includes(node.type));
    if (!converterForNode) {
      if (unknownConverter) {
        return {
          lexicalNode: node,
          reactNode: unknownConverter.converter({
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
      reactNode: converterForNode.converter({
        childIndex: i,
        converters,
        node,
        parent,
      }),
    };
  });

  return (
    <Fragment>
      {reactNodeArray.map(({ reactNode }, idx) => {
        return <Fragment key={idx}>{reactNode}</Fragment>;
      })}
    </Fragment>
  );
};
