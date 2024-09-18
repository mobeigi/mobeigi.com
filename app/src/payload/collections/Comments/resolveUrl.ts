import { Comment, Post } from '@/payload-types';
import { CollectionSlug, DataFromCollectionSlug } from 'payload';
import { resolvePostsUrl } from '@payload/collections/Posts/resolveUrl';

export const resolveCommentsUrl = (doc: DataFromCollectionSlug<CollectionSlug>) => {
  const comment = doc as Comment;
  if (!comment) {
    return null;
  }

  const post = comment.post as Post;
  const postUrl = resolvePostsUrl(post);
  if (!postUrl) {
    return null;
  }

  const commentUrl = postUrl + '#comment-' + comment.id;
  return commentUrl;
};
