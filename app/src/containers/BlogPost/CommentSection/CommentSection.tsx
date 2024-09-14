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

import { CommentSectionProps } from './types';
import Image from 'next/image';
import { getRandomAnimalSvgUrl } from '@/utils/avatar';
import { countTotalCommenters, countTotalComments } from '@/utils/blog';
import { Comment } from '@/types/blog';

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

export const CommentSection = ({ comments }: CommentSectionProps) => {
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

  return (
    <CommentSectionContainer>
      <LeaveCommentArea>
        <h2>Leave a comment</h2>
        <TopInputRow>
          <InputWrapper>
            <label htmlFor="displayName">Display Name:</label>
            <input type="text" id="displayName" />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" />
          </InputWrapper>
          <button>Submit</button>
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
