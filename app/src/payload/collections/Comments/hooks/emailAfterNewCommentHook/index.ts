import { CollectionAfterChangeHook } from 'payload';
import { Comment, Post, User } from '@/payload-types';
import { extractTextContent } from '@/utils/lexical';
import { resolveCommentsUrl } from '../../resolveUrl';
import { BASE_URL } from '@/constants/app';
import { newCommentEmailHtml } from '@/components/Emails/NewCommentEmail';
import { requireEnvVar } from '@/utils/env';
import { joinUrl } from '@/utils/url';
import { EmailHelperFunctionProps } from './types';
import { newReplyToCommentEmailHtml } from '@/components/Emails/NewReplyToCommentEmail';

// TODO: Should this be entirely non-blocking? Does slow email sending have any performance impact on payload at all?
export const emailAfterNewCommentHook: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation === 'create') {
    // Refetch doc with overridden access to get restricted fields
    const comment: Comment = await req.payload.findByID({
      collection: 'comments',
      id: (doc as Comment).id,
      overrideAccess: true,
      req, // passthrough req
    });

    void emailBlogOwner({ comment, req });
    void emailParentCommentAuthor({ comment, req });
  }
};

/**
 * Send an email to the blog owner, notifying them of all new comments.
 */
const emailBlogOwner = async ({ comment, req }: EmailHelperFunctionProps) => {
  const post = comment.post as Post;

  const textContent = extractTextContent(comment.content) || '';

  const relativeCommentUrl = await resolveCommentsUrl(comment);
  if (!relativeCommentUrl) {
    req.payload.logger.error(`Failed to resolve relative comments url for comment id: ${comment.id}`);
    return;
  }

  const absoluteCommentUrl = joinUrl([BASE_URL, relativeCommentUrl], false);

  const subject = `New comment on blog post: "${post.title}"`;
  const html = await newCommentEmailHtml({
    postTitle: post.title,
    commentUrl: absoluteCommentUrl,
    displayName: comment.displayName,
    email: comment.email,
    ipAddress: comment.ipAddress,
    createdAt: new Date(comment.createdAt),
    commentTextContent: textContent,
  });

  await req.payload.sendEmail({
    to: requireEnvVar(process.env.PAYLOAD_TO_EMAIL_ADDRESS, 'PAYLOAD_TO_EMAIL_ADDRESS'),
    subject: subject,
    html: html,
  });
};

/**
 * Send an email to the parent comment author, based on their subscription status.
 */
const emailParentCommentAuthor = async ({ comment, req }: EmailHelperFunctionProps) => {
  if (!comment.parent) {
    return;
  }

  const parentComment = comment.parent as Comment;
  if (!parentComment.notifyOnReply) {
    return;
  }

  // Ignore self-replies (based on email)
  if (parentComment.email === comment.email) {
    return;
  }

  const post = comment.post as Post;

  const textContent = extractTextContent(comment.content) || '';

  const relativeCommentUrl = await resolveCommentsUrl(comment);
  if (!relativeCommentUrl) {
    req.payload.logger.error(`Failed to relative resolve comments url for comment id: ${comment.id}`);
    return;
  }

  const relativeParentCommentUrl = await resolveCommentsUrl(parentComment);
  if (!relativeParentCommentUrl) {
    req.payload.logger.error(`Failed to relative resolve comments url for parent comment id: ${parentComment.id}`);
    return;
  }

  const absoluteCommentUrl = joinUrl([BASE_URL, relativeCommentUrl], false);
  const absoluteParentCommentUrl = joinUrl([BASE_URL, relativeParentCommentUrl], false);

  const subject = `New reply to your comment on: "${post.title}"`;
  const html = await newReplyToCommentEmailHtml({
    postTitle: post.title,
    commentUrl: absoluteParentCommentUrl,
    replyCommentDisplayName: comment.displayName,
    replyCommentUrl: absoluteCommentUrl,
    replyCommentCreatedAt: new Date(comment.createdAt),
    replyCommentTextContent: textContent,
  });

  await req.payload.sendEmail({
    to: parentComment.email,
    subject: subject,
    html: html,
  });
};
