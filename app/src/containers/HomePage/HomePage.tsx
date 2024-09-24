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
  PhotographyImageWrapper,
  PhotographyTag,
  BlogSummaryWrapper,
} from './styled';
import MapPinSvg from '@/assets/icons/boxicons/bx-map-pin.svg';
import CalendarSvg from '@/assets/icons/boxicons/bx-calendar.svg';
import FileSvg from '@/assets/icons/boxicons/bx-file.svg';
import LanguageOutlineSvg from '@/assets/icons/misc/language-outline.svg';
import Link from 'next/link';
import Image from 'next/image';
import { format as formatDate } from 'date-fns';
import { HomePageProps } from './types';
import BlogSummary from '@/components/BlogSummary';

export const HomePage = ({ latestBlogPostMetas, latestPhotographyImage }: HomePageProps) => (
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
    <section>
      <h2>Hi, I&apos;m Mo! Welcome to my online portfolio 😊</h2>
      <p>
        I am a full stack developer chilling down under. I love sharing my thoughts and insights through my{' '}
        <Link href="/blog/">blog posts</Link>, and working on several interesting{' '}
        <Link href="/projects/">projects</Link>. I would love to have a chat so do{' '}
        <Link href="/contact/">contact me</Link>.
      </p>
      <p>
        <Link href="/about/">Learn more about me!</Link>
      </p>
    </section>
    <hr />
    <section>
      <h2>Latest blog {latestBlogPostMetas.length === 1 ? 'post' : 'posts'}</h2>
      {latestBlogPostMetas.length > 0 ? (
        <p>
          Showing <strong>{latestBlogPostMetas.length}</strong> latest{' '}
          {latestBlogPostMetas.length === 1 ? 'post' : 'posts'}.
        </p>
      ) : (
        <p>There are no posts found to display.</p>
      )}
      <BlogSummaryWrapper>
        {latestBlogPostMetas.length > 0 &&
          latestBlogPostMetas.map((meta) => (
            <article key={meta.post.id}>
              <BlogSummary blogPostMeta={meta} headingLevel="h3" />
            </article>
          ))}
      </BlogSummaryWrapper>
    </section>
    {latestPhotographyImage && (
      <>
        <hr />
        <section>
          <h2>Latest photo</h2>
          <p>
            Through my lens, I capture the world. View my shots on{' '}
            <a href="https://photos.mobeigi.com/">photos.mobeigi.com</a> or{' '}
            <a href="https://www.instagram.com/lensofmobeigi">Instagram</a>.
          </p>
          <PhotographyImageWrapper>
            <Image
              src={latestPhotographyImage.thumbsUrl}
              alt="Latest Photograpy Image"
              fill
              quality={100}
              draggable={false}
            />
          </PhotographyImageWrapper>
          <PhotographyTag>
            <IconAndTextContainer>
              <IconWrapper>
                <CalendarSvg />
              </IconWrapper>
              <span>{formatDate(latestPhotographyImage.date, 'd MMMM yyyy')}</span>
            </IconAndTextContainer>
            <IconAndTextContainer>
              <IconWrapper>
                <FileSvg />
              </IconWrapper>
              <span>{latestPhotographyImage.niceName}</span>
            </IconAndTextContainer>
          </PhotographyTag>
        </section>
      </>
    )}
  </HomePageSection>
);
