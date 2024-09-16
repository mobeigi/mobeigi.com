'use client';

import { hexToRgba } from '@/utils/theme';
import { styled } from 'styled-components';

const BaseButton = styled.button``;

export const PrimaryButton = styled(BaseButton)``;

export const SecondaryButton = styled(BaseButton)`
  color: ${({ theme }) => theme.colors.status.secondary.complement};
  background-color: ${({ theme }) => theme.colors.status.secondary.base};

  &:hover {
    background-color: ${({ theme }) => theme.colors.status.secondary.baseHighlight};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.status.secondary.base};
  }

  &:focus,
  &:focus-visible {
    box-shadow: 0 0 0 0.25em ${({ theme }) => hexToRgba(theme.colors.status.secondary.base, 0.5)};
  }
`;
