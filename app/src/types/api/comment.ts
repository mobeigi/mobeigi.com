import { Comment } from '@/types/blog';

// Type we get when we serialize a comment
export type SerializedComment = Omit<Comment, 'createdAt' | 'children'> & {
  createdAt: string;
  children: SerializedComment[];
};
