import type { Block } from 'payload';

export const FileBlock: Block = {
  slug: 'fileBlock',
  interfaceName: 'FileBlock',
  fields: [
    {
      name: 'file',
      type: 'upload',
      relationTo: 'files',
      required: true,
    },
  ],
};
