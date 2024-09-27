'use client';
// Uncomment during local development (with hot reloading) to fix @svgr/webpack bug.
// TODO: Remove above workaround when @svgr/webpack bug is resolved. This component does not need to be a client side component.
// Github link: https://github.com/vercel/next.js/issues/69545

import Link from 'next/link';
import {
  Description,
  Details,
  Divider,
  Header,
  Icons,
  ImageWrapper,
  InactiveUrl,
  UrlContainer,
  ProjectBoxContainer,
  ProjectBoxContents,
  Title,
  UrlWrapper,
} from './styled';
import { ProjectBoxProps } from './types';
import Image from 'next/image';
import ExternalSvg from '@/assets/icons/boxicons/bx-link-external.svg';
import UnlinkSvg from '@/assets/icons/boxicons/bx-unlink.svg';
import GithubSvg from '@/assets/icons/boxicons/bxl-github.svg';
import BookSvg from '@/assets/icons/boxicons/bx-book.svg';
import { IconWrapper, IconWrapperBubble } from '@/styles/icon';

export const ProjectBox = ({
  imgSrc,
  imgAlt,
  title,
  description,
  url,
  urlActive = true,
  blogUrl,
  githubUrl,
}: ProjectBoxProps) => (
  <ProjectBoxContainer>
    <ProjectBoxContents>
      <ImageWrapper>
        <Image src={imgSrc} alt={imgAlt} fill quality={100} />
      </ImageWrapper>
      <Details>
        <Header>
          <Title>{title}</Title>
          <Icons>
            {blogUrl && (
              <Link href={blogUrl} data-tooltip-id="base-tooltip" data-tooltip-content="Related blog post">
                <IconWrapperBubble>
                  <BookSvg />
                </IconWrapperBubble>
              </Link>
            )}
            {githubUrl && (
              <Link href={githubUrl} rel="nofollow" data-tooltip-id="base-tooltip" data-tooltip-content="Source code">
                <IconWrapperBubble>
                  <GithubSvg />
                </IconWrapperBubble>
              </Link>
            )}
          </Icons>
        </Header>
        <UrlWrapper>
          {url && (
            <UrlContainer>
              {urlActive ? <Link href={url}>{url}</Link> : <InactiveUrl>{url}</InactiveUrl>}
              <IconWrapper>
                {urlActive ? (
                  <ExternalSvg data-tooltip-id="base-tooltip" data-tooltip-content="External link" />
                ) : (
                  <UnlinkSvg data-tooltip-id="base-tooltip" data-tooltip-content="Dead link" />
                )}
              </IconWrapper>
            </UrlContainer>
          )}
        </UrlWrapper>
        <Divider />
        <Description>{description}</Description>
      </Details>
    </ProjectBoxContents>
  </ProjectBoxContainer>
);
