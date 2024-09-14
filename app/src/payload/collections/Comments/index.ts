import { anyone } from '@/payload/access/anyone';
import { authenticated } from '@/payload/access/authenticated';
import { fetchGravatarProfile } from '@/utils/gravatar';
import { FixedToolbarFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import type { CollectionConfig } from 'payload';

export const Comments: CollectionConfig = {
  slug: 'comments',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['displayName', 'createdAt'],
    // TODO: Create custom title when useAsTitle supports functions https://github.com/payloadcms/payload/discussions/3257
  },
  timestamps: true,
  fields: [
    {
      name: 'displayName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        description: 'The email is for internal use only and will not be displayed publicly.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()];
        },
      }),
      required: true,
    },
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'ipAddress',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'The IP address from which the comment was made.',
      },
    },
    {
      name: 'gravatarAvatarUrl',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'The Gravatar URL for the users avatar, based on their email.',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        // Save the gravatar url to our database for this comment
        if (operation === 'create' || operation === 'update') {
          if (data.email) {
            const gravatarProfile = await fetchGravatarProfile(data.email);
            if (gravatarProfile) {
              data.gravatarAvatarUrl = gravatarProfile.avatar_url;
            }
          }
        }
        return data;
      },
    ],
  },
};
