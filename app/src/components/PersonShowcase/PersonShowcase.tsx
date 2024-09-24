'use client';
// Uncomment during local development (with hot reloading) to fix @svgr/webpack bug.
// TODO: Remove above workaround when @svgr/webpack bug is resolved. This component does not need to be a client side component.
// Github link: https://github.com/vercel/next.js/issues/69545

import { IconWrapper } from '@/styles/icon';
import {
  HeaderRows,
  Headshot,
  PersonShowcaseSection,
  IconAndTextContainer,
  Info,
  InfoArea,
  StyledHeading,
  Tagline,
} from './styled';
import MapPinSvg from '@/assets/icons/boxicons/bx-map-pin.svg';
import LanguageOutlineSvg from '@/assets/icons/misc/language-outline.svg';
import { SITE_TITLE, TAGLINE } from '@/constants/app';
import { PersonShowcaseProps } from './types';

export const PersonShowcase = ({
  headshotWidth = '9em',
  headshotHeight = '9em',
  headingLevel = 'h2',
}: PersonShowcaseProps) => (
  <PersonShowcaseSection>
    <Headshot $width={headshotWidth} $height={headshotHeight} />
    <HeaderRows>
      <StyledHeading as={headingLevel}>{SITE_TITLE}</StyledHeading>
      <Tagline>{TAGLINE}</Tagline>
      <InfoArea>
        <Info>
          <IconAndTextContainer>
            <IconWrapper>
              <MapPinSvg />
            </IconWrapper>
            <span>Sydney, Australia</span>
          </IconAndTextContainer>
        </Info>
        <Info>
          <IconAndTextContainer>
            <IconWrapper>
              <LanguageOutlineSvg />
            </IconWrapper>
            <span>English, Persian (فارسی)</span>
          </IconAndTextContainer>
        </Info>
      </InfoArea>
    </HeaderRows>
  </PersonShowcaseSection>
);
