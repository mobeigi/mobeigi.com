import type { Block } from 'payload';

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'mediaDark',
      type: 'upload',
      relationTo: 'media',
      label: 'Media - Dark theme mode variant (default)',
      required: true,
    },
    {
      name: 'mediaLight',
      type: 'upload',
      relationTo: 'media',
      label: 'Media - Light theme mode variant',
      required: false,
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
