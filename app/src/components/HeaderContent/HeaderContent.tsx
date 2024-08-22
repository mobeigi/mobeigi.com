import { HeaderContainer, HeaderContents, LogoContainer, LogoWrapper, SiteTitle } from './styled';
import Image from 'next/image';
import { SITE_TITLE } from '@/constants/app';
import Nav from './Nav';

export const HeaderContent = () => {
  return (
    <HeaderContainer>
      <HeaderContents>
        <LogoContainer>
          <LogoWrapper>
            <Image
              src="/images/avatar/ai-mo.png"
              alt="Description of the image"
              width={256} /* Force 256x256 resize */
              height={256}
              quality={100}
              layout="fixed"
              draggable={false}
            />
          </LogoWrapper>
          <SiteTitle>{SITE_TITLE}</SiteTitle>
        </LogoContainer>
        <Nav />
        <p>TODO</p>
      </HeaderContents>
    </HeaderContainer>
  );
};
