'use client';

import { IconWrapper } from '@/styles/icon';
import styled from 'styled-components';

export const ImageWrapper = styled.div`
  position: relative;
  width: 750px;
  height: auto;
  aspect-ratio: 3/2;
  max-width: 100%;

  margin: 0 auto;

  img {
    border-radius: 0.2em;
  }
`;

export const ProgrammingLanguagesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 1em;
  color: ${({ theme }) => theme.current.text.subtle};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile.maxWidth}px) {
    flex-wrap: wrap;
    & span {
      min-width: 16%;
    }
  }
`;

export const IconAndTextContainer = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.4em;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 2em;
  }
`;

export const CustomIconWrapper = styled(IconWrapper)`
  svg {
    fill: ${({ theme }) => theme.current.text.subtle};
  }
`;
