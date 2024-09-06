import { FileBlock, File } from '@/payload-types';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { type SerializedBlockNode } from '@payloadcms/richtext-lexical';
import config from '@payload-config';

interface FileBlockComponentProps {
  fileBlockNode: SerializedBlockNode<FileBlock>;
}

export const renderFileBlockNodeAsHtml = async ({ fileBlockNode }: FileBlockComponentProps): Promise<string> => {
  const payload = await getPayloadHMR({
    config,
  });

  const fields = fileBlockNode.fields;
  const file = fields.file as File;

  const uploadDocument = await payload.findByID({
    id: file.id,
    collection: 'files',
  });

  const linkText = file.title || file.filename;

  const url = (payload.config.serverURL || '') + uploadDocument.url;
  return `<a href="${url}" download>${linkText}</a>`;
};
