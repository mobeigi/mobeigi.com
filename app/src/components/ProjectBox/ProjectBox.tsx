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
import { IconWrapper, IconWrapperBubbleNextLink } from '@/styles/icon';

export const ProjectBox = ({
  imgSrc,
  imgAlt,
  title,
  description,
  url,
  urlActive = true,
  blogPostUrl,
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
            {blogPostUrl && (
              <IconWrapperBubbleNextLink
                href={blogPostUrl}
                data-tooltip-id="global-tooltip"
                data-tooltip-content="Related blog post"
              >
                <BookSvg />
              </IconWrapperBubbleNextLink>
            )}
            {githubUrl && (
              <IconWrapperBubbleNextLink
                href={githubUrl}
                rel="nofollow"
                data-tooltip-id="global-tooltip"
                data-tooltip-content="Source code"
              >
                <GithubSvg />
              </IconWrapperBubbleNextLink>
            )}
          </Icons>
        </Header>
        <UrlWrapper>
          {url && (
            <UrlContainer>
              {urlActive ? <Link href={url}>{url}</Link> : <InactiveUrl>{url}</InactiveUrl>}
              <IconWrapper>
                {urlActive ? (
                  <ExternalSvg data-tooltip-id="global-tooltip" data-tooltip-content="External link" />
                ) : (
                  <UnlinkSvg data-tooltip-id="global-tooltip" data-tooltip-content="Dead link" />
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
