import React from 'react';
import Text from './Text';

import {
  TopComponent, LogoDiv,
} from './styled';
import COLOURS from '../../constants/Colors';

const Header : React.FunctionComponent = () => (
  <>
    <TopComponent>
      <LogoDiv image="/blog/images/logo/avatar_500x500.png" />
      <Text style={{
        fontSize: '80px', fontWeight: 600, marginBottom: '-20px', color: COLOURS.white,
      }}
      >
        Mo Beigi
      </Text>
    </TopComponent>

    <Text style={{
      fontSize: '27px', fontWeight: 100, margin: '14px 0 14px 0', color: COLOURS.grey,
    }}
    >
      Software Engineer&nbsp;&nbsp;&#183;&nbsp;&nbsp;Sydney, Australia
    </Text>
  </>
);

export default Header;
