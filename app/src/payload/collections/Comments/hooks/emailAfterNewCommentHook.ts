import { CollectionAfterChangeHook } from 'payload';
import { Comment, Post } from '@/payload-types';
import { extractTextContent } from '@/utils/lexical';
import { resolveCommentsUrl } from '../resolveUrl';
import { BASE_URL } from '@/constants/app';
import { newCommentEmailHtml } from '@/components/Emails/NewCommentEmail';
import { requireEnvVar } from '@/utils/env';

// TODO: Should this be entirely non-blocking? Does slow email sending have any performance impact on payload at all?
export const emailAfterNewCommentHook: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation === 'create') {
    // Refetch doc with overiden access to get restricted fields
    const comment: Comment = await req.payload.findByID({
      collection: 'comments',
      id: (doc as Comment).id,
      overrideAccess: true,
      req, // passthrough req
    });

    const post = comment.post as Post;

    const textContent = extractTextContent(comment.content) || '';

    const relativeCommentUrl = resolveCommentsUrl(comment);
    const absoluteCommentUrl = BASE_URL + relativeCommentUrl;

    const subject = `New comment on blog post: "${post.title}"`;
    const html = await newCommentEmailHtml({
      postTitle: post.title,
      commentUrl: absoluteCommentUrl,
      displayName: comment.displayName,
      author: comment.author?.toString() || 'anonymous',
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
  }
};
