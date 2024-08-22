import Link from 'next/link';
import { HeaderContainer, HeaderContents, LogoContainer, LogoWrapper, Nav, SiteTitle } from './styled';
import Image from 'next/image';
import { SITE_TITLE } from '@/constants/app';

export const HeaderContent = () => (
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
      <Nav>
        <Link href={'/'}>Home</Link>
        <Link href={'/about'}>About</Link>
      </Nav>
      <p>TODO</p>
    </HeaderContents>
  </HeaderContainer>
);
