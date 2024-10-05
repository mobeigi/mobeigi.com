import React from 'react';
import type { SerializedBlockNode } from '@payloadcms/richtext-lexical';
import type { ReactNodeConverter } from '@/payload/lexical/types';
import { customBlockRenderers } from '../customBlockRenderers';

export const BlockReactNodeConverter: ReactNodeConverter<SerializedBlockNode> = {
  converter({ node }) {
    const blockType = node.fields.blockType;

    if (blockType in customBlockRenderers) {
      const renderFn = customBlockRenderers[blockType];
      return renderFn(node);
    } else {
      return <span>Unknown block type: {blockType}</span>;
    }
  },
  nodeTypes: ['block'],
};
