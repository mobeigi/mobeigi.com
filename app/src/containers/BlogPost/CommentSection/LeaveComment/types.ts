import { Comment as PayloadComment } from '@/payload-types';
export interface LeaveCommentProps {
  postId: number;
  parentCommentId: number | null; // null for top level comment
  canCancel?: boolean;
  onCancel?: () => void;
  onSuccess?: (comment: PayloadComment) => void;
  onError?: (error: Error) => void;
  autoFocus?: boolean;
}
