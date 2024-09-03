import { Media } from '@/payload-types';
import { UploadServerNode, type HTMLConverter, type SerializedUploadNode } from '@payloadcms/richtext-lexical';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@payload-config';

const UploadHTMLConverter: HTMLConverter<SerializedUploadNode> = {
  converter: async ({ node }) => {
    if (node.relationTo !== 'media') {
      return '';
    }

    const payload = await getPayloadHMR({
      config,
    });

    const uploadDocument = await payload.findByID({
      id: (node.value as Media).id,
      collection: node.relationTo,
    });

    const url = (payload?.config?.serverURL || '') + uploadDocument?.url;
    const mimeType = uploadDocument?.mimeType as string;

    if (mimeType.startsWith('image')) {
      return `<img src="${url}" alt="${uploadDocument.alt}" width="${uploadDocument?.width}" height="${uploadDocument?.height}" />`;
    } else if (mimeType.startsWith('video')) {
      return `<video src="${url}" alt="${uploadDocument.alt}" controls="true"></video>`;
    }

    return '';
  },
  nodeTypes: [UploadServerNode.getType()],
};

export default UploadHTMLConverter;
