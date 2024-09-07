import React from 'react';
import type { SerializedInlineBlockNode } from '@payloadcms/richtext-lexical';
import type { ReactNodeConverter } from '@/payload/lexical/types';
import { customInlineBlockRenderers } from '../customInlineBlockRenderers';

export const InlineBlockReactNodeConverter: ReactNodeConverter<SerializedInlineBlockNode> = {
  converter({ node }) {
    const inlineBlockType = node.fields.blockType;

    if (inlineBlockType in customInlineBlockRenderers) {
      const renderFn = customInlineBlockRenderers[inlineBlockType];
      return renderFn(node);
    } else {
      return <span>Unknown inline block type: {inlineBlockType}</span>;
    }
  },
  nodeTypes: ['inlineBlock'],
};
