'use client';
// Uncomment during local development (with hot reloading) to fix @svgr/webpack bug.
// TODO: Remove above workaround when @svgr/webpack bug is resolved. This component does not need to be a client side component.
// Github link: https://github.com/vercel/next.js/issues/69545

import { SITE_TITLE, TAGLINE } from '@/constants/app';
import {
  Headshot,
  HomePageHeader,
  HomePageSection,
  Info,
  InfoArea,
  StyledH1,
  Tagline,
  CustomIconWrapper as IconWrapper,
  IconAndTextContainer,
  HeaderRows,
} from './styled';
import MapPinSvg from '@/assets/icons/boxicons/bx-map-pin.svg';
import LanguageOutlineSvg from '@/assets/icons/misc/language-outline.svg';
import Link from 'next/link';

export const HomePage = () => (
  <HomePageSection>
    <HomePageHeader>
      <Headshot />
      <HeaderRows>
        {/* <StyledH1>{SITE_TITLE}</StyledH1>
        <Tagline>{TAGLINE}</Tagline> */}
        {/* TODO: Replace with above */}
        <StyledH1>Mo Beigi</StyledH1>
        <Tagline>Software Engineer</Tagline>
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
    </HomePageHeader>
    <div>
      <p>
        Hi, I&apos;m <strong>Mo</strong>! Welcome to my online portfolio. 😊
      </p>
      <p>
        I am a full stack developer chilling down under. I love sharing my thoughts and insights through my{' '}
        <Link href="/blog/">blog posts</Link>, and working on several interesting{' '}
        <Link href="/projects/">projects</Link>. I would love to have a chat so do{' '}
        <Link href="/contact/">contact me</Link>.
      </p>
      <p>
        <Link href="/about/">Learn more about me!</Link>
      </p>
    </div>
  </HomePageSection>
);
