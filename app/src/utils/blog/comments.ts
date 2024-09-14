import { Comment } from '@/types/blog';

export const countTotalComments = (comments: Comment[]): number =>
  comments.reduce((total, comment) => total + 1 + countTotalComments(comment.children), 0);

export const countTotalCommenters = (comments: Comment[]): number => {
  const uniqueEmailHashes = new Set<string>();

  const collectCommenters = (commentList: Comment[]) => {
    commentList.forEach((comment) => {
      uniqueEmailHashes.add(comment.emailHash);
      if (comment.children && comment.children.length > 0) {
        collectCommenters(comment.children);
      }
    });
  };

  collectCommenters(comments);
  return uniqueEmailHashes.size;
};
