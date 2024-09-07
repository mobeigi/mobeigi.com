import type { Block } from 'payload';

export const File: Block = {
  slug: 'file',
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
