import type { CollectionConfig } from 'payload';

import { anyone } from '@payload/access/anyone';
import { authenticated } from '@payload/access/authenticated';
import { revalidateProjectAfterChange, revalidateProjectAfterDelete } from './hooks/revalidateProject';

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'description', 'url'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: true,
      admin: {
        placeholder: 'Enter a brief description for the project...',
        description: 'A short description for the project.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      required: false,
    },
    {
      name: 'urlActive',
      type: 'checkbox',
      label: 'URL Active',
      defaultValue: true,
      required: false,
    },
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      required: false,
    },
    {
      name: 'githubUrl',
      type: 'text',
      label: 'GitHub URL',
      required: false,
    },
  ],
  hooks: {
    afterChange: [revalidateProjectAfterChange],
    afterDelete: [revalidateProjectAfterDelete],
  },
};
