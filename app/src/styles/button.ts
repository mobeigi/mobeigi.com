'use client';

import { hexToRgba } from '@/utils/theme';
import { styled } from 'styled-components';

const BaseButton = styled.button``;

export const PrimaryButton = styled(BaseButton)``;

export const SecondaryButton = styled(BaseButton)`
  color: ${({ theme }) => theme.current.status.secondary.complement};
  background-color: ${({ theme }) => theme.current.status.secondary.base};

  &:hover {
    background-color: ${({ theme }) => theme.current.status.secondary.baseHighlight};
  }

  &:active {
    background-color: ${({ theme }) => theme.current.status.secondary.base};
  }

  &:focus,
  &:focus-visible {
    box-shadow: 0 0 0 0.25em ${({ theme }) => hexToRgba(theme.current.status.secondary.base, 0.5)};
  }
`;

export const StylelessButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;

  &:hover {
    background: none;
  }

  &:active {
    background: none;
  }

  &:focus,
  &:focus-visible {
    background: none;
    box-shadow: none;
  }
`;
