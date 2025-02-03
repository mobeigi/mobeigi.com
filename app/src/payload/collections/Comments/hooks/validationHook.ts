import { CollectionBeforeValidateHook } from 'payload';
import { ValidationError } from 'payload';
import { Comment as PayloadComment } from '@/payload-types';
import { extractTextContent } from '@/utils/lexical';
import { BASE_URL } from '@/constants/app';
import { requireEnvVar } from '@/utils/env';
import { Author, Blog, CheckResult, Client, Comment, CommentType } from '@cedx/akismet';

export const validationHook: CollectionBeforeValidateHook = async ({ data, req, operation, context }) => {
  if (!data) {
    throw new ValidationError({
      collection: 'comments',
      errors: [],
      global: 'No data provided for comment.',
    });
  }

  const comment: Partial<PayloadComment> = data;
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
          errors: [{ path: 'post', message: 'Comments are disabled for this post.' }],
        });
      }
    } else {
      throw new ValidationError({
        collection: 'comments',
        errors: [{ path: 'post', message: 'Post relationship is required.' }],
      });
    }

    /* Email validation */
    if (!comment.email) {
      throw new ValidationError({
        collection: 'comments',
        errors: [{ path: 'email', message: 'Email is required to submit a comment.' }],
      });
    }

    // Authenticated comment path where the comment email belongs to a Payload user
    if (context.bypassUserValidation !== true) {
      const userBeingImpersonatedDocs = await req.payload.find({
        collection: 'users',
        where: {
          email: {
            equals: comment.email,
          },
        },
        limit: 1,
      });

      if (userBeingImpersonatedDocs.docs.length) {
        const userBeingImpersonated = userBeingImpersonatedDocs.docs[0];

        if (!signedInUser) {
          throw new ValidationError({
            collection: 'comments',
            errors: [
              {
                path: 'email',
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
                path: 'email',
                message:
                  'The email address provided does not match your authenticated account. Please use your account email to submit a comment.',
              },
            ],
          });
        }

        // Set author to signed in user
        comment.author = signedInUser.id;
      }
    }

    if (!comment.ipAddress) {
      // Populate ip address
      const xForwardedFor = req.headers.get('x-forwarded-for');
      if (!xForwardedFor) {
        throw new ValidationError({
          collection: 'comments',
          errors: [
            {
              path: 'ipAddress',
              message: 'Failed to get ipAddress from headers.',
            },
          ],
        });
      }
      comment.ipAddress = xForwardedFor;
    }

    if (!comment.userAgent) {
      // Populate user agent
      const userAgent = req.headers.get('user-agent');
      if (!userAgent) {
        throw new ValidationError({
          collection: 'comments',
          errors: [
            {
              path: 'userAgent',
              message: 'Failed to get userAgent from headers.',
            },
          ],
        });
      }
      comment.userAgent = userAgent;
    }

    // Akismet spam check for anonymous comments
    if (context.bypassSpamValidation !== true) {
      if (!signedInUser) {
        if (!comment.content) {
          throw new ValidationError({
            collection: 'comments',
            errors: [{ path: 'content', message: 'Content is required to submit a comment.' }],
          });
        }
        const commentTextContent = extractTextContent(comment.content) || '';

        const akismetWebsite = new Blog({
          charset: 'UTF-8',
          languages: ['en'],
          url: BASE_URL,
        });
        const akismetClient = new Client(
          requireEnvVar(process.env.AKISMET_API_KEY, 'AKISMET_API_KEY'),
          akismetWebsite,
          {
            userAgent: 'Node.js | Akismet/1.0',
          },
        );

        const akismetAuthor = new Author({
          email: comment.email,
          ipAddress: comment.ipAddress,
          name: comment.displayName,
          role: 'guest',
          userAgent: comment.userAgent,
        });

        const akismetComment = new Comment({
          author: akismetAuthor,
          date: comment.createdAt ? new Date(comment.createdAt) : null,
          content: commentTextContent,
          type: CommentType.comment,
        });

        let akismetCheckResult;
        try {
          akismetCheckResult = await akismetClient.checkComment(akismetComment);
        } catch (error) {
          console.warn('Unable to perform spam check.', error);
          throw new ValidationError({
            collection: 'comments',
            errors: [],
            global: 'Unable to perform spam check. Please try again later.',
          });
        }

        if (akismetCheckResult === CheckResult.spam) {
          throw new ValidationError({
            collection: 'comments',
            errors: [],
            global: 'Your comment was flagged as spam and could not be submitted.',
          });
        }
      }
    }
  }
  return comment;
};
