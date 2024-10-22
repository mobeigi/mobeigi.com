import { Comment, Post } from '@/payload-types';
import { CollectionSlug, DataFromCollectionSlug } from 'payload';
import { resolvePostsUrl } from '@payload/collections/Posts/resolveUrl';

export const resolveCommentsUrl = (doc: DataFromCollectionSlug<CollectionSlug>): string | null => {
  const comment = doc as Comment;
  if (!comment) {
    return null;
  }

  let post: Post;
  if (typeof comment.post === 'number') {
    return null;
  } else {
    post = comment.post;
  }

  const postUrl = resolvePostsUrl(post);
  if (!postUrl) {
    return null;
  }

  const commentUrl = postUrl + '#comment-' + comment.id;
  return commentUrl;
};
