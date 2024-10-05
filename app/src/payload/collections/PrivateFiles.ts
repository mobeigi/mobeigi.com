import type { CollectionConfig } from 'payload';

import path from 'path';

import { authenticated } from '@payload/access/authenticated';

export const PrivateFiles: CollectionConfig = {
  slug: 'private-files',
  labels: { singular: 'Private File', plural: 'Private Files' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
  ],
  upload: {
    staticDir: path.resolve('private/uploads/files'),
  },
};
