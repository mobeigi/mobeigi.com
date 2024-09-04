import { HTMLConverter, type SerializedBlockNode } from '@payloadcms/richtext-lexical';
import { renderMediaBlockNodeAsHtml } from '@/payload/blocks/MediaBlock/renderMediaBlockNodeAsHtml';
import { renderCodeBlockNodeAsHtml } from '@/payload/blocks/Code/renderCodeBlockNodeAsHtml';

const BlockHTMLConverter: HTMLConverter<SerializedBlockNode<any>> = {
  converter: async ({ node }) => {
    if (node.fields.blockType === 'mediaBlock') {
      return await renderMediaBlockNodeAsHtml({ mediaBlockNode: node });
    } else if (node.fields.blockType === 'code') {
      return renderCodeBlockNodeAsHtml({ codeBlockNode: node });
    } else {
      return 'unknown block node';
    }
  },
  nodeTypes: ['block'],
};

export default BlockHTMLConverter;
