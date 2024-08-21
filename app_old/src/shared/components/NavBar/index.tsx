import React from 'react';

import type { Props } from './types';
import { Header } from './Header';
import { Nav, NavItems, HeaderWrapper, PageName, PageIconWrapper as PageSocialButtonWrapper } from './styled';

import { SocialButton } from '../SocialButtonGroup/SocialButton';
import { TargetAwareLink } from '../../utils/TargetAwareLink';

export const NavBar = ({ pageName, pageSocialButton: socialButton }: Props) => (
  <Nav className="navbar navbar-expand-lg navbar-dark">
    <HeaderWrapper>
      <TargetAwareLink to="/">
        <Header />
      </TargetAwareLink>
    </HeaderWrapper>
    <NavItems>
      <PageSocialButtonWrapper>
        <SocialButton
          brandStyle={socialButton.brandStyle}
          iconName={socialButton.iconName}
          iconSize={socialButton.iconSize}
        />
      </PageSocialButtonWrapper>
      <PageName>{pageName}</PageName>
    </NavItems>
  </Nav>
);
