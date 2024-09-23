'use client';

import { IconWrapper } from '@/styles/icon';
import styled from 'styled-components';

export const HomePageSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1em;
`;

export const HomePageHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2em;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile.maxWidth}px) {
    gap: 1em;
    flex-direction: column;
  }
`;

export const Headshot = styled.div`
  background-image: url(/images/headshot/headshot.jpg);
  width: 15em;
  height: 15em;
  border-radius: 50%;
  background-position: center;
  background-size: 85%;
`;

export const HeaderRows = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledH1 = styled.h1`
  margin: 0;
  font-size: 3em;
`;

export const Tagline = styled.p`
  margin: 0;
  font-size: 1.75em;
  color: ${({ theme }) => theme.colors.frame.text.base};
`;

export const InfoArea = styled.span`
  display: flex;
  gap: 1em;
  margin-top: 0.2em;
  color: ${({ theme }) => theme.colors.frame.text.base};
`;

export const Info = styled.span``;

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
