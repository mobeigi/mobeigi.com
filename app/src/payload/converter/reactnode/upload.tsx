import type { ReactNodeConverter } from '@/payload/lexical/types';
import type { SerializedUploadNode } from '@payloadcms/richtext-lexical';
import { FileData } from 'payload';

export const UploadReactNodeConverter: ReactNodeConverter<SerializedUploadNode> = {
  converter: async ({ node }) => {
    // Cast to unknown so we only work with the generic file data that is populated for each upload type
    const uploadValue = node.value as unknown;
    const fileData = uploadValue as FileData;
    return <a href={fileData.url}>{fileData.filename}</a>;
  },
  nodeTypes: ['upload'],
};
