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
    ${({ $isError }) => $isError && 'border-color: var(--theme-status-error-base);'}

    &:focus,
      &:focus-visible {
      outline: none;
      /* Apply outline based on isError status */
      border-color: ${({ $isError }) =>
        $isError ? 'var(--theme-status-error-base)' : 'var(--theme-text-base-highlight)'};
    }
  }
`;

export const InputError = styled.p`
  padding: 0;
  margin: 0;

  font-size: 0.85em;
  text-align: center;
  color: var(--theme-status-error-base);
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
  color: var(--theme-text-subtle);
`;
