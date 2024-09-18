import { anyone } from '@/payload/access/anyone';
import { authenticated } from '@/payload/access/authenticated';
import { fetchGravatarProfile } from '@/utils/gravatar';
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
    {
      name: 'gravatarAvatarUrl',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'The Gravatar URL for the users avatar, based on their email.',
      },
    },
    {
      name: 'gravatarProfileLastFetched',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Last time the Gravatar profile was fetched.',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
  hooks: {
    beforeRead: [
      async ({ req, doc }) => {
        const comment = doc as Comment;

        if (!comment.gravatarAvatarUrl) {
          const now = new Date();
          const fetchInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

          // Check if gravatarProfileLastFetched exists and has passed the fetch interval
          if (
            !comment.gravatarProfileLastFetched ||
            now.getMilliseconds() - new Date(comment.gravatarProfileLastFetched!).getMilliseconds() > fetchInterval
          ) {
            const gravatarProfile = await fetchGravatarProfile(comment.email);
            if (gravatarProfile) {
              const updatedGravatarAvatarUrl = gravatarProfile.avatar_url;
              const updatedGravatarProfileLastFetched = now.toISOString();

              // Update all comments with matching email
              // Since they will all have the same Gravatar profile data
              await req.payload.update({
                collection: 'comments',
                where: { email: { equals: comment.email } },
                data: {
                  gravatarAvatarUrl: updatedGravatarAvatarUrl,
                  gravatarProfileLastFetched: updatedGravatarProfileLastFetched,
                },
              });

              // Ensure latest data is passed back
              comment.gravatarAvatarUrl = updatedGravatarAvatarUrl;
              comment.gravatarProfileLastFetched = updatedGravatarProfileLastFetched;
            }
          }
        }
        return comment;
      },
    ],
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

          // Save the gravatar url to our database for this comment
          if (comment.email) {
            const gravatarProfile = await fetchGravatarProfile(comment.email);
            if (gravatarProfile) {
              comment.gravatarAvatarUrl = gravatarProfile.avatar_url;
              comment.gravatarProfileLastFetched = new Date().toISOString();
            }
          }
        }
        return comment;
      },
    ],
  },
};
