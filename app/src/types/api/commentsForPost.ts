import { Comment } from '@/types/blog';
import { SerializedComment } from './comment';

export interface CommentsForPost {
  comments: Comment[];
}

export interface SerializedCommentsForPost {
  comments: SerializedComment[];
}
