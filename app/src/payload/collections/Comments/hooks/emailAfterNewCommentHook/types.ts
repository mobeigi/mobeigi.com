import { PayloadRequest } from 'payload';
import { Comment } from '@/payload-types';

export type EmailHelperFunctionProps = {
  comment: Comment;
  req: PayloadRequest;
};
