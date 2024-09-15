'use client';

import styled from 'styled-components';

export const LeaveCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4em;
`;

export const TopInputRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1em;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile.maxWidth}px) {
    gap: 0.4em;
    flex-direction: column;
  }
`;

export const InputFieldWrapper = styled.span`
  display: flex;
  width: 100%;
`;

interface InputWithErrorProps {
  $isError: boolean;
}

export const InputWithError = styled.span<InputWithErrorProps>`
  display: flex;
  flex-direction: column;
  gap: 0.4em;
  width: 100%;

  input {
    ${({ $isError, theme }) => $isError && `border-color: ${theme.colors.status.error.base};`}
  }
`;

export const InputError = styled.p`
  padding: 0;
  margin: 0;

  font-size: 0.85em;
  text-align: center;
  color: ${({ theme }) => theme.colors.status.error.base};
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

export const ActionRow = styled.span`
  display: flex;
  gap: 0.4em;
  justify-content: flex-end;
`;
