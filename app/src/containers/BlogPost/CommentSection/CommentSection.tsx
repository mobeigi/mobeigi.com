'use client';
// TODO: Do we need to make this entire component a client?

import {
  LeaveCommentArea,
  CommentSectionContainer,
  ContentEditableWrapper,
  InputWrapper,
  TopInputRow,
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
  ActionRow,
  LeaveCommentContainer,
  SingleCommentContainer,
} from './styled';

import { LexicalComposer, type InitialConfigType } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

import { CommentSectionProps } from './types';
import Image from 'next/image';
import { getRandomAnimalSvgUrl } from '@/utils/avatar';
import { countTotalCommenters, countTotalComments } from '@/utils/blog';
import { Comment } from '@/types/blog';
import { useState } from 'react';

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

interface LeaveCommentProps {
  postId: number;
  parentCommentId: number | null; // null for top level comment
  canCancel?: boolean;
  onCancel?: () => void;
}

const LeaveComment = ({ postId, parentCommentId, canCancel = false, onCancel }: LeaveCommentProps) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  const onError = (error: Error) => {
    console.error(error);
  };

  const initialConfig: InitialConfigType = {
    namespace: 'LeaveCommentEditor',
    theme: {},
    onError,
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName,
          email,
          content,
          parent: parentCommentId || undefined,
          post: postId,
        }),
      });

      if (!response.ok) {
        console.error('Error submitting comment');
      } else {
        console.log('Comment submitted successfully');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <LeaveCommentContainer>
      <TopInputRow>
        <InputWrapper>
          <label htmlFor="displayName">Display Name:</label>
          <input type="text" id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </InputWrapper>
      </TopInputRow>
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={
            <ContentEditableWrapper>
              <ContentEditable />
            </ContentEditableWrapper>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin
          onChange={(editorState) => {
            editorState.read(() => {
              const serializedContent = JSON.stringify(editorState.toJSON());
              setContent(serializedContent);
            });
          }}
        />
        <HistoryPlugin />
      </LexicalComposer>
      <ActionRow>
        {canCancel && <button onClick={onCancel}>Cancel</button>}
        <button onClick={handleCommentSubmit}>Comment</button>
      </ActionRow>
    </LeaveCommentContainer>
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
