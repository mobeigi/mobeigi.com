'use client';
// TODO: Do we need to make this entire component a client?

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
import { countTotalCommenters, countTotalComments } from '@/utils/blog';
import { Comment } from '@/types/blog';
import { useState } from 'react';
import LeaveComment from './LeaveComment';

interface CommentsProps {
  comments: Comment[];
  postId: number;
}

const Comments = ({ comments, postId }: CommentsProps) => {
  if (!comments.length) {
    return null;
  }
  return (
    <ul>
      {comments.map((comment) => {
        return (
          <li key={comment.id}>
            <SingleComment comment={comment} postId={postId} />
            {/* Recursively render the children comments */}
            {comment.children.length > 0 && <Comments comments={comment.children} postId={postId} />}
          </li>
        );
      })}
    </ul>
  );
};

interface SingleCommentProps {
  comment: Comment;
  postId: number;
}

const SingleComment = ({ comment, postId }: SingleCommentProps) => {
  const [isReplying, setIsReplying] = useState<boolean>(false);

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
          <CommentContents>{comment.content}</CommentContents>
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
        />
      )}
    </SingleCommentContainer>
  );
};

export const CommentSection = ({ comments, postId }: CommentSectionProps) => {
  const commentCount = countTotalComments(comments);
  const commentersCount = countTotalCommenters(comments);

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
              <Comments comments={comments} postId={postId} />
            </CommentsContainer>
          </>
        ) : (
          <p>There are no comments yet. Be the first to add one!</p>
        )}
      </CommentsArea>
    </CommentSectionContainer>
  );
};
