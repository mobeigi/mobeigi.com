import { anyone } from '@/payload/access/anyone';
import { authenticated } from '@/payload/access/authenticated';
import { FixedToolbarFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { ValidationError } from 'payload';
import type { CollectionConfig } from 'payload';
import { validateDisplayName, validateEmail, validateContent } from './validators';
import { Comment } from '@/payload-types';

export const Comments: CollectionConfig = {
  slug: 'comments',
  access: {
    create: anyone, // Allow anyone to create a comment
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
      validate: (value) => validateDisplayName(value),
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      access: {
        read: authenticated,
      },
      admin: {
        description: 'The email is for internal use only and will not be displayed publicly.',
      },
      validate: (value) => validateEmail(value),
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
      validate: (value) => validateContent(value),
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
      access: {
        read: authenticated,
      },
      admin: {
        position: 'sidebar',
        description: 'The IP address from which the comment was made.',
      },
    },
  ],
  hooks: {
    beforeValidate: [
      async ({ data, req, operation }) => {
        if (!data) {
          throw new ValidationError({
            collection: 'comments',
            errors: [],
            global: 'No data provided for comment.',
          });
        }

        const comment: Partial<Comment> = data;
        if (operation === 'create' || operation === 'update') {
          const postId = comment.post as number;
          if (postId) {
            const post = await req.payload.findByID({
              collection: 'posts',
              id: postId,
            });

            // Check if comments are enabled for the post
            if (!post.commentsEnabled) {
              throw new ValidationError({
                collection: 'comments',
                errors: [{ field: 'post', message: 'Comments are disabled for this post.' }],
              });
            }
          } else {
            throw new ValidationError({
              collection: 'comments',
              errors: [{ field: 'post', message: 'Post relationship is required.' }],
            });
          }
        }
        return comment;
      },
    ],
    beforeChange: [
      async ({ data, req, operation }) => {
        const comment: Partial<Comment> = data;
        if (operation === 'create' || operation === 'update') {
          const ipAddress = req.headers.get('x-forwarded-for') || ''; // TODO: validation error here
          if (!comment.ipAddress) {
            comment.ipAddress = ipAddress;
          }
        }
        return comment;
      },
    ],
  },
};
