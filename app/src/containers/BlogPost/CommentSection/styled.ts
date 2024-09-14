'use client';

import styled from 'styled-components';

export const CommentSectionContainer = styled.section``;

export const LeaveCommentArea = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.4em;
`;

export const TopInputRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1em;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile.maxWidth}px) {
    flex-direction: column;
  }
`;

export const InputWrapper = styled.span`
  display: flex;
  gap: 0.4em;
  align-items: center;
  width: 100%;

  input {
    flex-grow: 1;
  }
`;

export const ContentEditableWrapper = styled.div`
  > :first-child {
    max-width: 100%;
    height: 12em;
    overflow-y: auto;
    padding: 0 1em;

    /* Reapply global input styling */
    background-color: ${({ theme }) => theme.colors.container.background};
    border: 0.1em solid ${({ theme }) => theme.colors.container.accent};
    border-radius: 0.2em;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: ${({ theme }) => theme.colors.container.text.baseHighlight};
      outline: none;
    }
  }
`;

export const CommentsArea = styled.section`
  --display-picture-size: 55px;
`;

export const CommentBoxesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;

  ul {
    margin: 0 0 0 calc(var(--display-picture-size) + 1em);
    padding-left: 1em;
    border-left: 0.15em solid ${({ theme }) => theme.colors.container.accent};
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
    padding-left: none;

    > li:first-of-type {
      padding: 0;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile.maxWidth}px) {
    ul {
      margin: 0 0 0 1em;
    }
  }
`;

export const CommentBox = styled.div`
  display: flex;
  gap: 1em;
`;

export const DisplayPicture = styled.div`
  display: block;
  min-width: var(--display-picture-size);
  min-height: var(--display-picture-size);

  img {
    width: var(--display-picture-size);
    height: var(--display-picture-size);
    border-radius: 50%;
  }
`;

export const CommentMain = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommentMeta = styled.span`
  display: flex;
  gap: 0.4em;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile.maxWidth}px) {
    flex-direction: column;
  }
`;
export const DisplayName = styled.span`
  font-weight: bold;
`;
export const CreatedAtDate = styled.span`
  color: ${({ theme }) => theme.colors.frame.text.base};
`;

export const CommentContents = styled.span``;
