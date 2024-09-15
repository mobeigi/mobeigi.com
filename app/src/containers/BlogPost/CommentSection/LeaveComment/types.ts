export interface LeaveCommentProps {
  postId: number;
  parentCommentId: number | null; // null for top level comment
  canCancel?: boolean;
  onCancel?: () => void;
}