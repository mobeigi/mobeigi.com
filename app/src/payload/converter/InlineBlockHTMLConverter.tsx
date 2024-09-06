import { HTMLConverter, type SerializedBlockNode } from '@payloadcms/richtext-lexical';
import { renderMediaBlockNodeAsHtml } from '@/payload/blocks/MediaBlock/renderMediaBlockNodeAsHtml';
import { renderCodeBlockNodeAsHtml } from '@/payload/blocks/Code/renderCodeBlockNodeAsHtml';
import { renderEmbedBlockAsHtml } from '../blocks/Embed/renderEmbedBlockNodeAsHtml';
import { renderFileBlockNodeAsHtml } from '../blocks/FileBlock/renderFileBlockNodeAsHtml';

// TODO: type to SerializedInlineBlockNode instead
const InlineBlockHTMLConverter: HTMLConverter<SerializedBlockNode<any>> = {
  converter: async ({ node }) => {
    if (node.fields.blockType === 'mediaBlock') {
      return await renderMediaBlockNodeAsHtml({ mediaBlockNode: node });
    } else if (node.fields.blockType === 'fileBlock') {
      return renderFileBlockNodeAsHtml({ fileBlockNode: node });
    } else if (node.fields.blockType === 'code') {
      return renderCodeBlockNodeAsHtml({ codeBlockNode: node });
    } else if (node.fields.blockType === 'embed') {
      return renderEmbedBlockAsHtml({ embedBlockNode: node });
    } else {
      return 'unknown inlineBlock node';
    }
  },
  nodeTypes: ['inlineBlock'],
};

export default InlineBlockHTMLConverter;
