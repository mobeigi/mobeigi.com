import { UploadServerNode, type HTMLConverter, type SerializedUploadNode } from '@payloadcms/richtext-lexical';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@payload-config';

const UploadHTMLConverter: HTMLConverter<SerializedUploadNode> = {
  converter: async ({ node }) => {
    const payload = await getPayloadHMR({
      config,
    });

    const uploadDocument = await payload.findByID({
      // TODO: Try to type this
      // @ts-ignore
      id: node.value.id,
      collection: node.relationTo,
    });

    // TODO: Try to type this
    // @ts-ignore
    const url = (payload?.config?.serverURL || '') + uploadDocument?.url;

    return `<a href="${url}">${uploadDocument.id}</a>`;
  },
  nodeTypes: [UploadServerNode.getType()],
};

export default UploadHTMLConverter;
