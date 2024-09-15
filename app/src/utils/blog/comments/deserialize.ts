import { Comment } from '@/types/blog';

// TODO: maybe add runtime type check here
export const deserialize = (data: any): Comment => {
  return {
    ...data,
    createdAt: new Date(data.createdAt),
    children: Array.isArray(data.children) ? data.children.map((child: any) => deserialize(child)) : [],
  };
};
