import type { CollectionConfig } from 'payload';

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  EXPERIMENTAL_TableFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import { authenticated } from '../../access/authenticated';
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished';
import { MetaDescriptionField, MetaTitleField, OverviewField } from '@payloadcms/plugin-seo/fields';
import { revalidatePostAfterChange, revalidatePostAfterDelete } from './hooks/revalidatePost';
import { slugField } from '../../fields/slug';
import { Code } from '@payload/blocks/Code/config';
import { MediaBlock } from '@payload/blocks/MediaBlock/config';
import { File } from '@/payload/blocks/File/config';
import { Embed } from '@payload/blocks/Embed/config';
import { noone } from '@/payload/access/noone';
import { toFieldAccess } from '@/payload/utils/access';

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    useAsTitle: 'title',
  },
  timestamps: true,
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
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'h6'] }),
                    BlocksFeature({
                      blocks: [Code, MediaBlock, File, Embed],
                      inlineBlocks: [Code, MediaBlock, File, Embed],
                    }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                    EXPERIMENTAL_TableFeature(),
                  ];
                },
              }),
              label: false,
              required: true,
            },
          ],
          label: 'Content',
        },
        {
          fields: [
            {
              name: 'excerpt',
              type: 'textarea',
              label: 'Excerpt',
              required: true,
              admin: {
                placeholder: 'Enter a brief excerpt for the post...',
                description: 'A short summary or snippet of the post content',
              },
            },
          ],
          label: 'Excerpt',
        },
        {
          fields: [
            {
              name: 'commentsEnabled',
              type: 'checkbox',
              label: 'Comments enabled',
              defaultValue: true,
              required: false,
            },
          ],
          label: 'Comments',
        },
        {
          fields: [
            {
              name: 'externalDiscussions',
              type: 'array',
              label: 'External Discussions',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
          label: 'External Discussions',
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
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date();
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return value;
          },
        ],
      },
    },
    {
      name: 'views',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'viewsCache',
      type: 'array',
      // Avoid exposing this field on read to prevent potential performance issues due to its large size.
      hidden: true,
      admin: {
        hidden: true,
      },
      access: {
        // Avoid exposing this field on read to prevent potential performance issues due to its large size.
        read: toFieldAccess(noone),
      },
      fields: [
        {
          name: 'ipAddress',
          type: 'text',
          required: true,
        },
        {
          name: 'timestamp',
          type: 'date',
          required: true,
        },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: false,
      relationTo: 'category',
    },
    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePostAfterChange],
    afterDelete: [revalidatePostAfterDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
};
