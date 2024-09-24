'use client';

import { IconWrapper } from '@/styles/icon';
import styled from 'styled-components';

export const HomePageSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1em;
`;

export const CustomIconWrapper = styled(IconWrapper)`
  svg {
    fill: ${({ theme }) => theme.colors.frame.text.base};
    path: {
      stroke: ${({ theme }) => theme.colors.frame.text.base};
    }
  }
`;

export const IconAndTextContainer = styled.span`
  display: flex;
  gap: 0.2em;
  justify-content: center;
  align-items: center;
`;

export const PhotographyImageWrapper = styled.div`
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

export const PhotographyTag = styled.div`
  display: flex;
  justify-content: center;
  gap: 1em;
  margin: 0.4em 0;

  color: ${({ theme }) => theme.colors.frame.text.base};
`;

export const BlogSummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
`;
