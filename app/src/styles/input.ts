'use client';

import styled from 'styled-components';

export interface InputStatusProps {
  $isError: boolean;
}

export const InputWithError = styled.span<InputStatusProps>`
  display: flex;
  flex-direction: column;
  gap: 0.4em;
  width: 100%;

  input,
  textarea {
    /* Apply outline on error */
    ${({ $isError, theme }) => $isError && `border-color: ${theme.current.status.error.base};`}

    &:focus,
      &:focus-visible {
      outline: none;
      /* Apply outline based on isError status */
      border-color: ${({ $isError, theme }) =>
        $isError ? theme.current.status.error.base : theme.current.text.baseHighlight};
    }
  }
`;

export const InputError = styled.p`
  padding: 0;
  margin: 0;

  font-size: 0.85em;
  text-align: center;
  color: ${({ theme }) => theme.current.status.error.base};
`;
