'use client';

import { styled } from 'styled-components';

interface ButtonLabelProps {
  $isVisible: boolean;
}

export const ButtonLabel = styled.span<ButtonLabelProps>`
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
`;

export const SpinnerOverlay = styled.span`
  position: absolute;
`;
