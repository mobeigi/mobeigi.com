'use client';

import styled from 'styled-components';

export const PingFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4em;
`;

export const InputFieldWrapper = styled.span`
  display: flex;
  width: 100%;
`;

// TODO: Commonise this as its used in a few places
export const LabelContainer = styled.span`
  display: flex;
  gap: 0.4em;
  align-items: center;
`;

export const LabelDetails = styled.span`
  display: inline-flex;
  gap: 0.4em;
  font-size: 0.85em;
  color: ${({ theme }) => theme.current.text.subtle};
`;
