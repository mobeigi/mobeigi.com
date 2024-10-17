import { Comment } from '@/types/blog';
import { Comment as PayloadComment } from '@/payload-types';
import crypto from 'crypto';
// import { getGravatarAvatarUrl } from '@/utils/gravatar';
// import { DISPLAY_PICTURE_SIZE } from './constants';
import { requireEnvVar } from '../env';

/**
 * Maps Payload comments to Comments.
 * The output comments are sorted by their createdAt date.
 */
export const mapComments = async (payloadComments: PayloadComment[]): Promise<Comment[]> => {
  // Step 1: Sort comments by createdAt to ensure parents are processed before children.
  // This is required to resolve parent hierarchy effeciently.
  const sortedPayloadComments = payloadComments.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  // Step 2: Map all sorted comments and store them in a commentMap
  const emailHashSalt = requireEnvVar(process.env.EMAIL_HASH_SALT, 'EMAIL_HASH_SALT');
  const comments = await Promise.all(
    sortedPayloadComments.map((doc: PayloadComment) => {
      const emailHash = crypto.createHmac('sha256', emailHashSalt).update(doc.email.toLowerCase()).digest('hex');
      // TODO: Opti: Reenable gravatar avatars with caching
      //const gravatarAvatarUrl = await getGravatarAvatarUrl({ email: doc.email, size: DISPLAY_PICTURE_SIZE });
      const gravatarAvatarUrl = null;
      const comment: Comment = {
        id: doc.id,
        displayName: doc.displayName,
        displayPictureUrl: gravatarAvatarUrl || undefined,
        emailHash: emailHash,
        verified: doc.author !== null,
        createdAt: new Date(doc.createdAt),
        content: doc.content,
        children: [], // Initialize an empty array for children
      };
      return comment;
    }),
  );

  // Step 3: Store all comments in the commentMap and establish parent-child relationships
  const rootComments: Comment[] = [];
  const commentsMap = new Map<number, Comment>();
  comments.forEach((comment) => {
    commentsMap.set(comment.id, comment);
  });
  sortedPayloadComments.forEach((payloadComment) => {
    const mappedComment = commentsMap.get(payloadComment.id)!;
    const parentPayloadComment = payloadComment.parent as PayloadComment | undefined;
    const parentComment = parentPayloadComment ? commentsMap.get(parentPayloadComment.id) : undefined;

    if (parentComment) {
      parentComment.children.push(mappedComment);
    } else {
      rootComments.push(mappedComment);
    }
  });

  return rootComments;
};
