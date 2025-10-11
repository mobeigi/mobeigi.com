'use client';

import { IconWrapper } from '@/styles/icon';
import { styled } from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

export const PersonShowcaseSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2em;

  @media (max-width: ${breakpoints.mobile.maxWidth}px) {
    gap: 1em;
    flex-direction: column;
  }
`;

interface HeadshotProps {
  $width: string;
  $height: string;
}

export const Headshot = styled.div<HeadshotProps>`
  background-image: url(/images/headshot/headshot.jpg);
  width: ${($props) => $props.$width};
  height: ${($props) => $props.$height};
  border-radius: 50%;
  background-position: center;
  background-size: 85%;
`;

export const HeaderRows = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: ${breakpoints.mobile.maxWidth}px) {
    align-items: center;
  }
`;

export const StyledHeading = styled.h2`
  margin: 0;
  font-size: 3em;
`;

export const Tagline = styled.p`
  margin: 0;
  font-size: 1.75em;
  color: var(--theme-text-subtle);
`;

export const InfoArea = styled.span`
  display: flex;
  gap: 1em;
  margin-top: 0.2em;
  color: var(--theme-text-subtle);
`;

export const Info = styled.span`
  display: flex;
  align-items: center;
`;

export const CustomIconWrapper = styled(IconWrapper)`
  svg {
    fill: var(--theme-text-subtle);
    path: {
      stroke: var(--theme-text-subtle);
    }
  }
`;
