'use client';

import {
  LeaveCommentArea,
  CommentSectionContainer,
  CommentsArea,
  CommentBox,
  DisplayPicture,
  CommentMetaHeader,
  CommentMain,
  DisplayName,
  CommentContents,
  CreatedAtTime,
  CommentsContainer,
  CommentActions,
  SingleCommentContainer,
  DisplayNameWrapper,
} from './styled';

import { CommentSectionProps } from './types';
import Image from 'next/image';
import { getRandomAnimalSvgUrl } from '@/utils/avatar';
import { countTotalCommenters, countTotalComments } from '@/utils/blog/comments';
import { Comment } from '@/types/blog';
import { useEffect, useState } from 'react';
import LeaveComment from './LeaveComment';
import { serializeLexical } from '@/payload/lexical/serializeLexical';
import { deserialize as deserializeComment } from '@/utils/blog/comments';
import { toast } from 'react-toastify';
import { Comment as PayloadComment } from '@/payload-types';
import VerifiedBadgeSvg from '@/assets/icons/social/verified-badge.svg';
import { IconWrapper } from '@/styles/icon';

interface CommentsProps {
  comments: Comment[];
  postId: number;
  onSuccess: (comment: PayloadComment) => void;
  commentsEnabled: boolean;
}

const Comments = ({ comments, postId, onSuccess, commentsEnabled }: CommentsProps) => {
  if (!comments.length) {
    return null;
  }
  return (
    <ul>
      {comments.map((comment) => {
        return (
          <li key={comment.id}>
            <SingleComment comment={comment} postId={postId} onSuccess={onSuccess} commentsEnabled={commentsEnabled} />
            {/* Recursively render the children comments */}
            {comment.children.length > 0 && (
              <Comments
                comments={comment.children}
                postId={postId}
                onSuccess={onSuccess}
                commentsEnabled={commentsEnabled}
              />
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
  onSuccess: (comment: PayloadComment) => void;
  commentsEnabled: boolean;
}

const SingleComment = ({ comment, postId, onSuccess, commentsEnabled }: SingleCommentProps) => {
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
    <SingleCommentContainer id={`comment-${comment.id}`}>
      <CommentBox>
        <DisplayPicture $isCustomDisplayPicture={isCustomDisplayPicture}>
          <Image src={displayPictureUrl} alt={`Display picture for ${comment.displayName}`} width={55} height={55} />
        </DisplayPicture>
        <CommentMain>
          <CommentMetaHeader>
            <DisplayNameWrapper>
              <DisplayName>{comment.displayName}</DisplayName>
              {comment.verified && (
                <IconWrapper>
                  <VerifiedBadgeSvg />
                </IconWrapper>
              )}
            </DisplayNameWrapper>
            <CreatedAtTime dateTime={comment.createdAt.toISOString()}>{createdAtDateString}</CreatedAtTime>
          </CommentMetaHeader>
          <CommentContents>{commentContentReactNode}</CommentContents>
          <CommentActions>
            {commentsEnabled && (
              <span>
                <a href="#" onClick={handleReply}>
                  Reply
                </a>
              </span>
            )}
          </CommentActions>
        </CommentMain>
      </CommentBox>
      {isReplying && (
        <LeaveComment
          postId={postId}
          parentCommentId={comment.id}
          canCancel={true}
          onCancel={() => setIsReplying(false)}
          onSuccess={(comment) => {
            setIsReplying(false);
            onSuccess(comment);
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

export const CommentSection = ({ comments: initialComments, postId, commentsEnabled }: CommentSectionProps) => {
  const [comments, setComments] = useState<Array<Comment>>(initialComments);
  const [scrollToCommentId, setScrollToCommentId] = useState<string | null>(null);

  const commentCount = countTotalComments(comments);
  const commentersCount = countTotalCommenters(comments);

  const refreshComments = async (): Promise<boolean> => {
    try {
      const response = await fetch(`/api/custom/posts/${postId}/comments`);

      if (!response.ok) {
        console.error('Failed to refresh comments. Received non-ok response.');
        toast.error('Failed to refresh comments.');
        return false;
      }

      const data = await response.json();
      const deserializedComments = data.comments.map((comment: any) => deserializeComment(comment));
      setComments(deserializedComments);
      return true;
    } catch (error) {
      console.error('Error encountered during refresh comments:', error);
      toast.error('Failed to refresh comments.');
      return false;
    }
  };

  const onCommentAdded = async (comment: PayloadComment) => {
    toast.success('Comment published!');
    const isRefreshSuccessful = await refreshComments();
    if (isRefreshSuccessful) {
      setScrollToCommentId(`#comment-${comment.id}`);
    }
  };

  /**
   * When comments are updated, scroll to comment if state is set
   */
  useEffect(() => {
    if (scrollToCommentId) {
      window.location.hash = scrollToCommentId;
      setScrollToCommentId(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments]);

  return (
    <CommentSectionContainer>
      {commentsEnabled && (
        <LeaveCommentArea>
          <h2 id="leave-a-comment">Leave a comment</h2>
          <LeaveComment
            postId={postId}
            parentCommentId={null}
            onSuccess={onCommentAdded}
            onError={(error: Error) => {
              console.error(error);
              toast.error(error.message);
            }}
          />
        </LeaveCommentArea>
      )}
      <CommentsArea>
        <h2 id="comments">Comments</h2>
        {!commentsEnabled && (
          <p>Comments have been disabled for this post.{commentCount > 0 && ' Existing comments are still visible.'}</p>
        )}
        {comments.length ? (
          <>
            <p>
              Showing <strong>{commentCount}</strong> {commentCount === 1 ? 'comment' : 'comments'} from{' '}
              <strong>{commentersCount}</strong> {commentersCount === 1 ? 'commenter' : 'commenters'}.
            </p>
            <CommentsContainer>
              <Comments
                comments={comments}
                postId={postId}
                onSuccess={onCommentAdded}
                commentsEnabled={commentsEnabled}
              />
            </CommentsContainer>
          </>
        ) : (
          commentsEnabled && <p>There are no comments yet. Be the first to add one!</p>
        )}
      </CommentsArea>
    </CommentSectionContainer>
  );
};
