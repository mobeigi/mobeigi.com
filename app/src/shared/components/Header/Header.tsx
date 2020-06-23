import React from 'react';
import Text from './Text';
import {
  StyledHeader, LogoDiv,
} from './styled';

const Header = () => (
  <StyledHeader>
    <LogoDiv image="https://mobeigi.com/blog/images/logo/avatar_500x500.png" />
    <Text>Mo Beigi</Text>
  </StyledHeader>
);

export default Header;
