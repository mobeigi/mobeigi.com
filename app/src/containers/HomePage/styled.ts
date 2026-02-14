'use client';

import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';
import { IconWrapper } from '@/styles/icon';

export const HomePageSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1em;
`;

export const CustomIconWrapper = styled(IconWrapper)`
  svg {
    fill: var(--theme-text-subtle);
  }
`;

export const GitContributionGraphOverflow = styled.div`
  overflow-x: auto;
  @media (max-width: ${breakpoints.mobile.maxWidth}px) {
    overflow-x: inherit;
  }
`;

export const GitContributionGraphWrapper = styled.div`
  /* Fixed width chart */
  width: 1068px;

  @media (max-width: ${breakpoints.mobile.maxWidth}px) {
    width: 400px;
    justify-self: center;
  }
`;

export const PhotographyImagesWrapper = styled.div`
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
  max-width: 100%;
  justify-content: space-around;
`;

export const PhotographyImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  aspect-ratio: 3/2;
  max-width: 500px;

  img {
    border-radius: 0.2em;
    width: 100%;
    height: auto;
  }
`;

export const PhotographyTag = styled.div`
  display: flex;
  justify-content: center;
  gap: 1em;
  margin: 0.4em 0;

  color: var(--theme-text-subtle);
`;

export const BlogSummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
`;
