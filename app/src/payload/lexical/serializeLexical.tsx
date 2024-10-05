import type { ReactNodeConverter } from './types';
import type { SerializedEditorState } from 'lexical';
import { type ReactNode } from 'react';
import { defaultReactNodeConverters } from '@payload/converter/defaultReactNodeConverters';
import { convertLexicalNodesToReactNode } from './convertLexicalNodesToReactNode';

export const serializeLexical = (data?: SerializedEditorState): ReactNode => {
  const converters: ReactNodeConverter[] = defaultReactNodeConverters;

  if (data?.root?.children?.length) {
    return convertLexicalNodesToReactNode({
      converters,
      lexicalNodes: data?.root?.children,
      parent: data?.root,
    });
  }

  return '';
};
