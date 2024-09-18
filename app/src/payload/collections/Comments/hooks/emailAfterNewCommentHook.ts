import { CollectionAfterChangeHook } from 'payload';
import { Comment, Post } from '@/payload-types';
import { extractTextContent } from '@/utils/lexical';
import { resolveCommentsUrl } from '../resolveUrl';
import { BASE_URL } from '@/constants/app';
import { getNextEnv } from '@/utils/next';

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

    const textContent = extractTextContent(comment.content);
    const relativeCommentUrl = resolveCommentsUrl(comment);
    const absoluteCommentUrl = BASE_URL + relativeCommentUrl;

    // TODO: use date library and standarise all of this
    const createdAtDate = new Date(comment.createdAt);
    const createdAtDateString =
      createdAtDate.toLocaleDateString('en-AU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }) +
      ' at ' +
      createdAtDate
        .toLocaleTimeString('en-AU', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
        .toLocaleUpperCase();

    const subject = `New comment on blog post "${post.title}"`;
    const text = `There is a new comment on blog post "${post.title}":
${absoluteCommentUrl}

Display Name: ${comment.displayName}
Author: ${comment.author || 'anonymous'}
Email: ${comment.email}
IP Address: ${comment.ipAddress}
Created at: ${createdAtDateString}

Comment:
${textContent}
`;

    await req.payload.sendEmail({
      to: getNextEnv('PAYLOAD_TO_EMAIL_ADDRESS'),
      subject: subject,
      text: text,
    });
  }
};
