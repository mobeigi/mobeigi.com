'use client';

import styled from 'styled-components';

export const CommentContainer = styled.div``;

export const LeaveCommentArea = styled.section``;

export const CommentsArea = styled.section`
  --display-picture-size: 55px;
`;

export const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;

  ul {
    margin: 0 0 0 calc(var(--display-picture-size) + 1em);
    padding-left: 1em;
    border-left: 0.15em solid ${({ theme }) => theme.current.container.accent};
  }

  li {
    list-style-type: none;
    padding: 0;
    margin-top: 1em;
  }

  /* Remove margin / padding from first element */
  > ul:first-of-type {
    margin: 0;
    border-left: none;
    padding-left: 0;

    > li:first-of-type {
      padding: 0;
    }
  }

  /* Collpase very deep nested comments */
  ul ul ul ul ul ul {
    margin: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile.maxWidth}px) {
    ul {
      margin: 0 0 0 1em;
    }

    /* Collpase very deep nested comments */
    ul ul ul ul {
      margin: 0;
  }
`;

export const SingleCommentContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1em;

  /* Adjust scroll margin to compensate for fixed header */
  scroll-margin-top: var(--scroll-margin-top-offset);
`;

export const CommentBox = styled.div`
  display: flex;
  gap: 1em;
`;
interface DisplayPictureProps {
  $isCustomDisplayPicture: boolean;
}

export const DisplayPicture = styled.div<DisplayPictureProps>`
  display: block;
  min-width: var(--display-picture-size);
  min-height: var(--display-picture-size);

  img {
    width: var(--display-picture-size);
    height: var(--display-picture-size);

    ${({ $isCustomDisplayPicture }) => $isCustomDisplayPicture && 'border-radius: 50%;'}
  }
`;

export const CommentMain = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommentMetaHeader = styled.header`
  display: flex;
  gap: 0.4em;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile.maxWidth}px) {
    flex-direction: column;
  }
`;

export const DisplayNameWrapper = styled.span`
  display: flex;
  gap: 0.2em;
`;

export const DisplayName = styled.span`
  font-weight: bold;
`;

export const CreatedAtTime = styled.time`
  color: ${({ theme }) => theme.current.text.subtle};
`;

export const CommentContents = styled.span`
  word-break: break-word;
`;

export const CommentActions = styled.span`
  display: flex;
  gap: 0.4em;
`;
