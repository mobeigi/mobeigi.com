import { EmbedBlock } from '@/payload-types';
import { type SerializedBlockNode } from '@payloadcms/richtext-lexical';

interface EmbdedBlockComponentProps {
  embedBlockNode: SerializedBlockNode<EmbedBlock>;
}

export const renderEmbedBlockAsHtml = ({ embedBlockNode }: EmbdedBlockComponentProps): string => {
  const fields = embedBlockNode.fields;

  const optionalAttributes = [
    fields.width ? `width="${fields.width}"` : '',
    fields.height ? `height="${fields.height}"` : '',
    fields.title ? `title="${fields.title}"` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return `
      <iframe 
          src="${fields.url}"
          ${optionalAttributes}
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerpolicy="strict-origin-when-cross-origin" 
          allowfullscreen>
      </iframe>
    `;
};
