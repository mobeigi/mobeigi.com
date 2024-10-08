import { Comment } from '@/types/blog';

export interface CommentSectionProps {
  comments: Comment[];
  postId: number;
  commentsEnabled: boolean;
}
