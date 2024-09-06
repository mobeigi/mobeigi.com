import { Media, MediaBlock } from '@/payload-types';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { type SerializedBlockNode } from '@payloadcms/richtext-lexical';
import config from '@payload-config';

interface MediaBlockComponentProps {
  mediaBlockNode: SerializedBlockNode<MediaBlock>;
}

export const renderMediaBlockNodeAsHtml = async ({ mediaBlockNode }: MediaBlockComponentProps): Promise<string> => {
  const payload = await getPayloadHMR({
    config,
  });

  const fields = mediaBlockNode.fields;
  const media = fields.media as Media;

  const uploadDocument = await payload.findByID({
    id: media.id,
    collection: 'media',
  });

  const url = (payload.config.serverURL || '') + uploadDocument.url;
  const mimeType = uploadDocument.mimeType as string;

  if (mimeType.startsWith('image')) {
    return `<img src="${url}" alt="${uploadDocument.alt}" width="${uploadDocument?.width}" height="${uploadDocument?.height}" />`;
  } else if (mimeType.startsWith('video')) {
    return `<video src="${url}" alt="${uploadDocument.alt}" controls="true"></video>`;
  }
  return `<span>Unknown media block</span>`;
};
