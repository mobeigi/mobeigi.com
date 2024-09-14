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
  CommentBoxesContainer,
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
}

const Comments = ({ comments }: CommentsProps) => {
  if (!comments.length) {
    return null;
  }
  return (
    <ul>
      {comments.map((comment) => {
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

        // Use display picture or fallback otherwise
        const displayPictureUrl = comment.displayPictureUrl || getRandomAnimalSvgUrl(comment.emailHash);

        return (
          <li key={comment.id}>
            <CommentBox>
              <DisplayPicture>
                <Image
                  src={displayPictureUrl}
                  alt={`Display picture for ${comment.displayName}`}
                  width={55}
                  height={55}
                />
              </DisplayPicture>
              <CommentMain>
                <CommentMeta>
                  <DisplayName>{comment.displayName}</DisplayName>
                  <CreatedAtDate>{createdAtDateString}</CreatedAtDate>
                </CommentMeta>
                <CommentContents>{comment.content}</CommentContents>
              </CommentMain>
            </CommentBox>

            {/* Recursively render the children comments */}
            {comment.children.length > 0 && <Comments comments={comment.children} />}
          </li>
        );
      })}
    </ul>
  );
};

export const CommentSection = ({ comments, postId }: CommentSectionProps) => {
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

  const commentCount = countTotalComments(comments);
  const commentersCount = countTotalCommenters(comments);

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
    <CommentSectionContainer>
      <LeaveCommentArea>
        <h2>Leave a comment</h2>
        <TopInputRow>
          <InputWrapper>
            <label htmlFor="displayName">Display Name:</label>
            <input type="text" id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </InputWrapper>
          <button onClick={handleCommentSubmit}>Comment</button>
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
      </LeaveCommentArea>
      <CommentsArea>
        <h2>Comments</h2>
        {comments.length ? (
          <>
            <p>
              Showing <strong>{commentCount}</strong> {commentCount === 1 ? 'comment' : 'comments'} from{' '}
              <strong>{commentersCount}</strong> {commentersCount === 1 ? 'commenter' : 'commenters'}.
            </p>
            <CommentBoxesContainer>
              <Comments comments={comments} />
            </CommentBoxesContainer>
          </>
        ) : (
          <p>There are no comments yet. Be the first to add one!</p>
        )}
      </CommentsArea>
    </CommentSectionContainer>
  );
};
