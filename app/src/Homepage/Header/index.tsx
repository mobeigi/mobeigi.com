import React from 'react';

import { Logo } from '../../shared/components/Logo';
import { ReemKufiText } from '../../shared/components/ReemKufiText';
import { COMMON } from '../../shared/constants/Common';
import { StyledHeader, LogoAndSiteName, SiteNameWrapper, TagLineWrapper } from './styled';

export const Header = () => (
  <StyledHeader>
    <LogoAndSiteName>
      <Logo logoUrl="/images/avatar/avatar.svg" />
      <SiteNameWrapper>
        <ReemKufiText>{COMMON.WEBSITE.siteName}</ReemKufiText>
      </SiteNameWrapper>
    </LogoAndSiteName>
    <TagLineWrapper>
      <ReemKufiText>Software Engineer&nbsp;&nbsp;&#183;&nbsp;&nbsp;Sydney, Australia</ReemKufiText>
    </TagLineWrapper>
  </StyledHeader>
);
