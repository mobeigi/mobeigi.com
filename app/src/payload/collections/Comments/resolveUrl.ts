'use server';
// This is only needed because the 'link' ReactNode converter for lexical relies on server side lookups.

import { Comment, Post } from '@/payload-types';
import { CollectionSlug, DataFromCollectionSlug } from 'payload';
import { resolvePostsUrl } from '@payload/collections/Posts/resolveUrl';
import { getCachedDocumentById } from '@/payload/utils/docs';

export const resolveCommentsUrl = async (doc: DataFromCollectionSlug<CollectionSlug>): Promise<string | null> => {
  const comment = doc as Comment;
  if (!comment) {
    return null;
  }

  let post: Post;
  if (typeof comment.post === 'number') {
    const cachedPost = await getCachedDocumentById('posts', comment.post);
    if (!cachedPost) {
      return null;
    }
    post = cachedPost as Post;
  } else {
    post = comment.post;
  }

  const postUrl = await resolvePostsUrl(post);
  if (!postUrl) {
    return null;
  }

  const commentUrl = postUrl + '#comment-' + comment.id;
  return commentUrl;
};
