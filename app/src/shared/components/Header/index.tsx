import React from 'react';
import { useMediaQuery } from 'react-responsive';
import MediaQuery from '../../utils/MediaQuery';

import Text from './Text';
import { TopComponent, LogoDiv } from './styled';
import COLOURS from '../../constants/Colors';

const Header: React.FunctionComponent = () => {
  const isTablet = useMediaQuery(MediaQuery.tabletDimensions);
  const isMobile = useMediaQuery(MediaQuery.mobileDimensions);

  // Desktop
  let logoSize = 150;
  if (isTablet) {
    logoSize *= MediaQuery.tabletSizeModifier;
  } else if (isMobile) {
    logoSize *= MediaQuery.mobileSizeModifier;
  }

  return (
    <>
      <TopComponent>
        <LogoDiv image="/images/avatar/avatar.svg" width={logoSize} height={logoSize} />
        <Text
          style={{
            fontSize: '4.5rem',
            fontWeight: 600,
            lineHeight: 0.9,
            color: COLOURS.white,
          }}
        >
          Mo Beigi
        </Text>
      </TopComponent>

      <Text
        style={{
          fontSize: '1.5rem',
          fontWeight: 100,
          margin: '14px 0 14px 0',
          color: COLOURS.grey,
        }}
      >
        Software Engineer&nbsp;&nbsp;&#183;&nbsp;&nbsp;Sydney, Australia
      </Text>
    </>
  );
};

export default Header;
