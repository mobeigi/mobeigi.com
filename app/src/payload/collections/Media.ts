import type { CollectionConfig } from 'payload';

import { FixedToolbarFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';

import { anyone } from '@payload/access/anyone';
import { authenticated } from '@payload/access/authenticated';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()];
        },
      }),
    },
  ],
  upload: {
    mimeTypes: ['image/*', 'video/*'],
    // Use webp as preferred format for all media
    formatOptions: {
      format: 'webp',
      options: {
        lossless: true,
        effort: 6,
      },
    },
    // Upload to a public directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve('public/uploads/media'),
  },
};
