import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { tabletDimensions, mobileDimensions, tabletSizeModifier, mobileSizeModifier } from '../../utils/MediaQuery';

import { Text } from './Text';
import { TopComponent, LogoDiv } from './styled';
import { COLORS } from '../../constants/Colors';

export const Header: React.FunctionComponent = () => {
  const isTablet = useMediaQuery(tabletDimensions);
  const isMobile = useMediaQuery(mobileDimensions);

  // Desktop
  let logoSize = 150;
  if (isTablet) {
    logoSize *= tabletSizeModifier;
  } else if (isMobile) {
    logoSize *= mobileSizeModifier;
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
            color: COLORS.white,
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
          color: COLORS.grey,
        }}
      >
        Software Engineer&nbsp;&nbsp;&#183;&nbsp;&nbsp;Sydney, Australia
      </Text>
    </>
  );
};
