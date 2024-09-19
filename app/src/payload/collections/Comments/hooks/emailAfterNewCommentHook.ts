import { CollectionAfterChangeHook } from 'payload';
import { Comment, Post } from '@/payload-types';
import { extractTextContent } from '@/utils/lexical';
import { resolveCommentsUrl } from '../resolveUrl';
import { BASE_URL } from '@/constants/app';
import { getNextEnv } from '@/utils/next';
import { newCommentEmailHtml } from '@/components/Emails/NewCommentEmail';

export const emailAfterNewCommentHook: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation === 'create') {
    // Refetch doc with overiden access to get restricted fields
    const comment: Comment = await req.payload.findByID({
      collection: 'comments',
      id: doc.id,
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
      to: getNextEnv('PAYLOAD_TO_EMAIL_ADDRESS'),
      subject: subject,
      html: html,
    });
  }
};
