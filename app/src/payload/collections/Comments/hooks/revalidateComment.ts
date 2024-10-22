import { Comment } from '@/payload-types';
import { CollectionAfterChangeHook, CollectionAfterDeleteHook, PayloadRequest } from 'payload';
import { revalidatePost } from '@/payload/collections/Posts/hooks/revalidatePost';
import { getDocByIdOrObject } from '@/utils/payload';
import { revalidateTag } from 'next/cache';

export const revalidateComment = async (req: PayloadRequest, doc: Comment) => {
  req.payload.logger.info(`Revalidating all paths for comment with id: ${doc.id}`);

  // TODO: Avoid hard coding collection name while also avoiding cycling import issue
  req.payload.logger.info(`Revalidating tag: payload:collection:comments:${doc.id}`);
  revalidateTag(`payload:collection:comments:${doc.id}`);

  const post = await getDocByIdOrObject(req, 'posts', doc.post);
  if (post) {
    await revalidatePost(req, post);
  } else {
    req.payload.logger.error(`Failed finding post for comment with id: ${doc.id}`);
  }
};

export const revalidateCommentParentPostAfterChange: CollectionAfterChangeHook<Comment> = async ({ doc, req }) => {
  await revalidateComment(req, doc);
  return doc;
};

export const revalidateCommentParentPostAfterDelete: CollectionAfterDeleteHook<Comment> = async ({ doc, req }) => {
  await revalidateComment(req, doc);
  return doc;
};
