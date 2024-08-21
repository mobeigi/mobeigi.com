import React from 'react';

import { Logo } from '../../Logo';
import { ReemKufiText } from '../../ReemKufiText';
import { COMMON } from '../../../constants/Common';
import { StyledHeader, LogoAndSiteName, SiteNameWrapper } from './styled';
import { getLogoUrl } from '../../../utils/GetLogo';

export const Header = () => (
  <StyledHeader>
    <LogoAndSiteName>
      <Logo logoUrl={getLogoUrl()} logoSize={53} />
      <SiteNameWrapper>
        <ReemKufiText>{COMMON.WEBSITE.siteName}</ReemKufiText>
      </SiteNameWrapper>
    </LogoAndSiteName>
  </StyledHeader>
);
