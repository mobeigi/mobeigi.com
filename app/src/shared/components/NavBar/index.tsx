import React from 'react';

import type { Props } from './types';
import { Header } from '../Header';
import { Nav, NavItems, HeaderWrapper, PageName } from './styled';
import { TargetAwareLink } from '../../utils/TargetAwareLink';

export const NavBar = ({ pageName }: Props) => (
  <Nav className="navbar navbar-expand-lg navbar-dark">
    <HeaderWrapper>
      <TargetAwareLink to="/">
        <Header logoUrl="/images/avatar/avatar.svg" logoSize={70} title="Mo Beigi" tagLine="" />
      </TargetAwareLink>
    </HeaderWrapper>
    <NavItems>
      <PageName>{pageName}</PageName>
    </NavItems>
  </Nav>
);
