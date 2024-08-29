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
              <Link href={blogUrl}>
                <IconWrapperBubble>
                  <BookSvg />
                </IconWrapperBubble>
              </Link>
            )}
            {githubUrl && (
              <Link href={githubUrl} rel="nofollow">
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
              <IconWrapper>{urlActive ? <ExternalSvg /> : <UnlinkSvg />}</IconWrapper>
            </UrlContainer>
          )}
        </UrlWrapper>
        <Divider />
        <Description>{description}</Description>
      </Details>
    </ProjectBoxContents>
  </ProjectBoxContainer>
);
