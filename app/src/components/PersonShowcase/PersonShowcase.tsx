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
        <Info data-tooltip-id="base-tooltip" data-tooltip-content="Location">
          <IconAndTextContainer>
            <IconWrapper>
              <MapPinSvg />
            </IconWrapper>
            <span>Sydney, Australia</span>
          </IconAndTextContainer>
        </Info>
        <Info data-tooltip-id="base-tooltip" data-tooltip-content="Languages spoken">
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
