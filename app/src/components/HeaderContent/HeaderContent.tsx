import {
  RightSideNavContainer,
  HeaderContainer,
  HeaderContents,
  LogoContainer,
  LogoWrapper,
  NavWrapper,
  SiteTitle,
} from './styled';
import Image from 'next/image';
import { SITE_TITLE } from '@/constants/app';
import Nav from './Nav';
import DarkModeSwitchContainer from './DarkModeSwitchContainer';

const isWithinXmasPeriod = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const xmasMonth = 11; // 0-indexed
  const startDate = new Date(currentYear, xmasMonth, 1);
  const endDate = new Date(currentYear, xmasMonth, 26);

  if (now.getTime() >= startDate.getTime() && now.getTime() <= endDate.getTime()) {
    return true;
  }
  return false;
};

export const HeaderContent = () => {
  const isXmas = isWithinXmasPeriod();
  const logoSrc = isXmas ? '/images/avatar/ai-mo-xmas.png' : '/images/avatar/ai-mo.png';
  const logoAlt = isXmas ? 'AI Mo Xmas Logo' : 'AI Mo Logo';

  return (
    <HeaderContainer>
      <HeaderContents>
        <LogoContainer>
          <LogoWrapper>
            <Image src={logoSrc} alt={logoAlt} width={256} height={256} quality={100} draggable={false} priority />
          </LogoWrapper>
          <SiteTitle>{SITE_TITLE}</SiteTitle>
        </LogoContainer>
        <NavWrapper>
          <Nav />
        </NavWrapper>
        <RightSideNavContainer>
          <DarkModeSwitchContainer />
        </RightSideNavContainer>
      </HeaderContents>
    </HeaderContainer>
  );
};
