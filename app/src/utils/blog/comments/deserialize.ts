import { Comment } from '@/types/blog';
import { SerializedComment } from '@/types/api/comment';

export const deserialize = (data: SerializedComment): Comment => {
  const comment: Comment = {
    ...data,
    createdAt: new Date(data.createdAt),
    children: Array.isArray(data.children) ? data.children.map((child) => deserialize(child)) : [],
  };

  return comment;
};
