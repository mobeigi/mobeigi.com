import type { CollectionConfig } from 'payload';

import { anyone } from '@payload/access/anyone';
import { authenticated } from '@payload/access/authenticated';
import { slugField } from '@payload/fields/slug';

const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'slug'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
  ],
};

export default Categories;
