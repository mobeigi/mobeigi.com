'use client';

import {
  LeaveCommentArea,
  CommentSectionContainer,
  CommentsArea,
  CommentBox,
  DisplayPicture,
  CommentMeta,
  CommentMain,
  DisplayName,
  CommentContents,
  CreatedAtDate,
  CommentsContainer,
  CommentActions,
  SingleCommentContainer,
} from './styled';

import { CommentSectionProps } from './types';
import Image from 'next/image';
import { getRandomAnimalSvgUrl } from '@/utils/avatar';
import { countTotalCommenters, countTotalComments } from '@/utils/blog/comments';
import { Comment } from '@/types/blog';
import { useState } from 'react';
import LeaveComment from './LeaveComment';
import { serializeLexical } from '@/payload/lexical/serializeLexical';
import { deserialize as deserializeComment } from '@/utils/blog/comments';
import { toast } from 'react-toastify';

interface CommentsProps {
  comments: Comment[];
  postId: number;
  onCommentAdded: () => void;
}

const Comments = ({ comments, postId, onCommentAdded }: CommentsProps) => {
  if (!comments.length) {
    return null;
  }
  return (
    <ul>
      {comments.map((comment) => {
        return (
          <li key={comment.id}>
            <SingleComment comment={comment} postId={postId} onCommentAdded={onCommentAdded} />
            {/* Recursively render the children comments */}
            {comment.children.length > 0 && (
              <Comments comments={comment.children} postId={postId} onCommentAdded={onCommentAdded} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

interface SingleCommentProps {
  comment: Comment;
  postId: number;
  onCommentAdded: () => void;
}

const SingleComment = ({ comment, postId, onCommentAdded }: SingleCommentProps) => {
  const [isReplying, setIsReplying] = useState<boolean>(false);

  const commentContentReactNode = serializeLexical(comment.content);
  const createdAtDateString =
    comment.createdAt.toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) +
    ' at ' +
    comment.createdAt
      .toLocaleTimeString('en-AU', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      .toLocaleUpperCase();

  const isCustomDisplayPicture = comment.displayPictureUrl !== undefined;
  const displayPictureUrl = comment.displayPictureUrl || getRandomAnimalSvgUrl(comment.emailHash);

  const handleReply = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsReplying(true);
  };

  return (
    <SingleCommentContainer>
      <CommentBox>
        <DisplayPicture $isCustomDisplayPicture={isCustomDisplayPicture}>
          <Image src={displayPictureUrl} alt={`Display picture for ${comment.displayName}`} width={55} height={55} />
        </DisplayPicture>
        <CommentMain>
          <CommentMeta>
            <DisplayName>{comment.displayName}</DisplayName>
            <CreatedAtDate>{createdAtDateString}</CreatedAtDate>
          </CommentMeta>
          <CommentContents>{commentContentReactNode}</CommentContents>
          <CommentActions>
            <span>
              <a href="#" onClick={handleReply}>
                Reply
              </a>
            </span>
          </CommentActions>
        </CommentMain>
      </CommentBox>
      {isReplying && (
        <LeaveComment
          postId={postId}
          parentCommentId={comment.id}
          canCancel={true}
          onCancel={() => setIsReplying(false)}
          onSuccess={() => {
            setIsReplying(false);
            toast.success('Comment published!');
            onCommentAdded();
          }}
          onError={(error: Error) => {
            console.error(error);
            toast.error(error.message);
          }}
          autoFocus
        />
      )}
    </SingleCommentContainer>
  );
};

export const CommentSection = ({ comments: initialComments, postId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Array<Comment>>(initialComments);

  const commentCount = countTotalComments(comments);
  const commentersCount = countTotalCommenters(comments);

  const refreshComments = async () => {
    try {
      const response = await fetch(`/api/custom/posts/${postId}/comments`);

      if (!response.ok) {
        console.error('Failed to refresh comments. Received non-ok response.');
        toast.error('Failed to refresh comments.');
        return;
      }

      const data = await response.json();
      const deserializedComments = data.comments.map((comment: any) => deserializeComment(comment));
      setComments(deserializedComments);
    } catch (error) {
      console.error('Error encountered during refresh comments:', error);
      toast.error('Failed to refresh comments.');
    }
  };

  return (
    <CommentSectionContainer>
      <LeaveCommentArea>
        <h2>Leave a comment</h2>
        <LeaveComment postId={postId} parentCommentId={null} />
      </LeaveCommentArea>
      <CommentsArea>
        <h2>Comments</h2>
        {comments.length ? (
          <>
            <p>
              Showing <strong>{commentCount}</strong> {commentCount === 1 ? 'comment' : 'comments'} from{' '}
              <strong>{commentersCount}</strong> {commentersCount === 1 ? 'commenter' : 'commenters'}.
            </p>
            <CommentsContainer>
              <Comments comments={comments} postId={postId} onCommentAdded={refreshComments} />
            </CommentsContainer>
          </>
        ) : (
          <p>There are no comments yet. Be the first to add one!</p>
        )}
      </CommentsArea>
    </CommentSectionContainer>
  );
};
