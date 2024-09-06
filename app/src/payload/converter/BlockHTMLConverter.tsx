import { HTMLConverter, type SerializedBlockNode } from '@payloadcms/richtext-lexical';
import { renderMediaBlockNodeAsHtml } from '@/payload/blocks/MediaBlock/renderMediaBlockNodeAsHtml';
import { renderFileBlockNodeAsHtml } from '@/payload/blocks/FileBlock/renderFileBlockNodeAsHtml';
import { renderCodeBlockNodeAsHtml } from '@/payload/blocks/Code/renderCodeBlockNodeAsHtml';
import { renderEmbedBlockAsHtml } from '@/payload/blocks/Embed/renderEmbedBlockNodeAsHtml';

const BlockHTMLConverter: HTMLConverter<SerializedBlockNode<any>> = {
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
      return 'unknown block node';
    }
  },
  nodeTypes: ['block'],
};

export default BlockHTMLConverter;
