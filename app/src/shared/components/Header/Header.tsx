import React from 'react';
import { useMediaQuery } from 'react-responsive';
import MediaQuery from '../../utils/MediaQuery';

import Text from './Text';
import {
  TopComponent, LogoDiv,
} from './styled';
import COLOURS from '../../constants/Colors';

const Header : React.FunctionComponent = () => {
  const isTablet = useMediaQuery(MediaQuery.tabletDimensions);
  const isMobile = useMediaQuery(MediaQuery.mobileDimensions);

  // Desktop
  let nameFontSize = 80;
  let tagLineFontSize = 27;
  let logoSize = 150;

  if (isTablet) {
    nameFontSize *= MediaQuery.tabletSizeModifier;
    tagLineFontSize *= MediaQuery.tabletSizeModifier;
    logoSize *= MediaQuery.tabletSizeModifier;
  } else if (isMobile) {
    nameFontSize *= MediaQuery.mobileSizeModifier;
    tagLineFontSize *= MediaQuery.mobileSizeModifier;
    logoSize *= MediaQuery.mobileSizeModifier;
  }

  return (
    <>
      <TopComponent>
        <LogoDiv image="/images/avatar/avatar_500x500.png" width={logoSize} height={logoSize} />
        <Text style={{
          fontSize: nameFontSize, fontWeight: 600, lineHeight: 0.9, color: COLOURS.white,
        }}
        >
          Mo Beigi
        </Text>
      </TopComponent>

      <Text style={{
        fontSize: tagLineFontSize, fontWeight: 100, margin: '14px 0 14px 0', color: COLOURS.grey,
      }}
      >
        Software Engineer&nbsp;&nbsp;&#183;&nbsp;&nbsp;Sydney, Australia
      </Text>
    </>
  );
};

export default Header;
