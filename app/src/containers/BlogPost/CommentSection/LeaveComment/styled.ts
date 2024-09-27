'use client';

import styled from 'styled-components';
import { InputStatusProps } from '@/styles/input';

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

export const LabelContainer = styled.span`
  display: flex;
  gap: 0.4em;
  align-items: center;
`;

export const LabelDetails = styled.span`
  display: inline-flex;
  gap: 0.4em;
  font-size: 0.85em;
  color: ${({ theme }) => theme.colors.text.subtle};
`;

export const ContentEditableWrapper = styled.div<InputStatusProps>`
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

    &:focus,
    &:focus-visible {
      outline: none;
      /* Apply outline based on isError status */
      border-color: ${({ $isError, theme }) =>
        $isError ? theme.colors.status.error.base : theme.colors.text.baseHighlight};
    }

    /* Apply outline on error */
    ${({ $isError, theme }) => $isError && `border-color: ${theme.colors.status.error.base};`}

    &[disabled] {
      color: ${({ theme }) => theme.colors.text.subtle};
    }
  }
`;

export const ActionRow = styled.span`
  display: flex;
  gap: 0.4em;
  justify-content: flex-end;
`;
