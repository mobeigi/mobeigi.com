'use client';

import { IconWrapper } from '@/styles/icon';
import { styled } from 'styled-components';

export const PersonShowcaseSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2em;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile.maxWidth}px) {
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
`;

export const StyledHeading = styled.h2`
  margin: 0;
  font-size: 3em;
`;

export const Tagline = styled.p`
  margin: 0;
  font-size: 1.75em;
  color: ${({ theme }) => theme.colors.text.subtle};
`;

export const InfoArea = styled.span`
  display: flex;
  gap: 1em;
  margin-top: 0.2em;
  color: ${({ theme }) => theme.colors.text.subtle};
`;

export const Info = styled.span``;

export const CustomIconWrapper = styled(IconWrapper)`
  svg {
    fill: ${({ theme }) => theme.colors.text.subtle};
    path: {
      stroke: ${({ theme }) => theme.colors.text.subtle};
    }
  }
`;

export const IconAndTextContainer = styled.span`
  display: flex;
  gap: 0.2em;
  justify-content: center;
  align-items: center;
`;
