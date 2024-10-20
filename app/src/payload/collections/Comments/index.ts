import { anyone } from '@/payload/access/anyone';
import { authenticated } from '@/payload/access/authenticated';
import { FixedToolbarFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import type { CollectionConfig } from 'payload';
import { validateDisplayName, validateEmail, validateContent } from './validators';
import { emailAfterNewCommentHook } from './hooks/emailAfterNewCommentHook';
import { validationHook } from './hooks/validationHook';
import { SerializedEditorState } from 'lexical';
import {
  revalidateCommentParentPostAfterChange,
  revalidateCommentParentPostAfterDelete,
} from './hooks/revalidateComment';

export const Comments: CollectionConfig = {
  slug: 'comments',
  access: {
    create: anyone, // Allow anyone to create a comment
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['displayName', 'email', 'post', 'createdAt'],
    // TODO: Create custom title when useAsTitle supports functions https://github.com/payloadcms/payload/discussions/3257
    listSearchableFields: ['displayName', 'email'],
  },
  timestamps: true,
  fields: [
    {
      name: 'displayName',
      type: 'text',
      required: true,
      hasMany: false,
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
      validate: (value: SerializedEditorState | null | undefined) => validateContent(value),
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
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: false,
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
    {
      name: 'userAgent',
      type: 'text',
      required: true,
      access: {
        read: authenticated,
      },
      admin: {
        position: 'sidebar',
        description: 'The browser user agent at the time the comment was submitted.',
      },
    },
  ],
  hooks: {
    beforeValidate: [validationHook],
    afterChange: [revalidateCommentParentPostAfterChange, emailAfterNewCommentHook],
    afterDelete: [revalidateCommentParentPostAfterDelete],
  },
};
