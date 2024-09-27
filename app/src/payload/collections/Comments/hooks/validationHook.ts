import { CollectionBeforeValidateHook } from 'payload';
import { ValidationError } from 'payload';
import { Comment } from '@/payload-types';
import { extractTextContent } from '@/utils/lexical';
import { AkismetClient, CommentWithIP } from 'akismet-api';
import { BASE_URL } from '@/constants/app';
import { requireEnvVar } from '@/utils/env';

export const validationHook: CollectionBeforeValidateHook = async ({ data, req, operation }) => {
  if (!data) {
    throw new ValidationError({
      collection: 'comments',
      errors: [],
      global: 'No data provided for comment.',
    });
  }

  const comment: Partial<Comment> = data;
  const signedInUser = req.user;

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

    /* Email validation */
    if (!comment.email) {
      throw new ValidationError({
        collection: 'comments',
        errors: [{ field: 'email', message: 'Email is required to submit a comment.' }],
      });
    }

    const userBeingImpersonatedDocs = await req.payload.find({
      collection: 'users',
      where: {
        email: {
          equals: comment.email,
        },
      },
      limit: 1,
    });

    // Authenticated comment path where the comment email belongs to a user
    if (userBeingImpersonatedDocs.docs.length) {
      const userBeingImpersonated = userBeingImpersonatedDocs.docs[0];

      if (!signedInUser) {
        throw new ValidationError({
          collection: 'comments',
          errors: [
            {
              field: 'email',
              message: 'You must be signed in to submit a comment using this email address.',
            },
          ],
        });
      }

      if (signedInUser.id !== userBeingImpersonated.id) {
        throw new ValidationError({
          collection: 'comments',
          errors: [
            {
              field: 'email',
              message:
                'The email address provided does not match your authenticated account. Please use your account email to submit a comment.',
            },
          ],
        });
      }

      // Set author to signed in user
      comment.author = signedInUser.id;
    }

    // Populate ip address
    const xForwardedFor = req.headers.get('x-forwarded-for') || ''; // TODO: validation error here
    if (!comment.ipAddress) {
      // TODO: Should not rely on provided for request
      comment.ipAddress = xForwardedFor;
    }

    // Populate user agent
    const userAgent = req.headers.get('user-agent') || ''; // TODO: validation error here
    if (!comment.userAgent) {
      // TODO: Should not rely on provided for request
      comment.userAgent = userAgent;
    }

    // Akismet spam check for anonymous comments
    if (!signedInUser) {
      if (!comment.content) {
        throw new ValidationError({
          collection: 'comments',
          errors: [{ field: 'content', message: 'Content is required to submit a comment.' }],
        });
      }
      const commentTextContent = extractTextContent(comment.content) || undefined;
      const akismetClient = new AkismetClient({
        key: requireEnvVar(process.env.AKISMET_API_KEY, 'AKISMET_API_KEY'),
        blog: BASE_URL,
      });

      let isSpam = false;
      const akismetCommentToCheck: CommentWithIP = {
        ip: comment.ipAddress,
        useragent: comment.userAgent,
        content: commentTextContent,
        email: comment.email,
        name: comment.displayName,
        date: comment.createdAt,
        type: 'comment',
        isTest: true, // TODO: remove this before going to prod and we are done testing
      };
      try {
        isSpam = await akismetClient.checkSpam(akismetCommentToCheck);
      } catch (error) {
        console.warn('Unable to perform spam check.', error);
        throw new ValidationError({
          collection: 'comments',
          errors: [],
          global: 'Unable to perform spam check. Please try again later.',
        });
      }

      if (isSpam) {
        throw new ValidationError({
          collection: 'comments',
          errors: [],
          global: 'Your comment was flagged as spam and could not be submitted.',
        });
      }
    }
  }
  return comment;
};
