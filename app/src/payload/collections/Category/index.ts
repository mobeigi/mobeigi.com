import type { CollectionConfig } from 'payload';

import { anyone } from '@payload/access/anyone';
import { authenticated } from '@payload/access/authenticated';
import { slugField } from '@payload/fields/slug';
import { MetaDescriptionField, MetaTitleField, OverviewField } from '@payloadcms/plugin-seo/fields';

export const Category: CollectionConfig = {
  slug: 'category',
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
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
              required: true,
              admin: {
                placeholder: 'Enter a brief description for the category...',
                description: 'A short description for the category.',
              },
            },
          ],
          label: 'Description',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
            MetaTitleField({
              hasGenerateFn: false,
            }),

            MetaDescriptionField({ hasGenerateFn: false }),
          ],
        },
      ],
    },
    ...slugField(),
  ],
};
