import type { Block } from 'payload';

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'widthOveride',
      type: 'number',
      label: 'Width override (optional)',
      required: false,
    },
    {
      name: 'heightOveride',
      type: 'number',
      label: 'Height override (optional)',
      required: false,
    },
  ],
};
