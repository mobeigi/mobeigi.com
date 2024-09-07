import type { SerializedLexicalNode } from 'lexical';
import type { ReactNode } from 'react';

export type ReactNodeConverter<T extends SerializedLexicalNode = SerializedLexicalNode> = {
  converter: ({
    childIndex,
    converters,
    node,
    parent,
  }: {
    childIndex: number;
    converters: ReactNodeConverter[];
    node: T;
    parent: SerializedLexicalNodeWithParent;
  }) => Promise<ReactNode> | ReactNode;
  nodeTypes: string[];
};

export type SerializedLexicalNodeWithParent = SerializedLexicalNode & {
  parent?: SerializedLexicalNode;
};
