import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { tabletDimensions, mobileDimensions, tabletSizeModifier, mobileSizeModifier } from '../../utils/MediaQuery';

import type { Props } from './types';
import { Text } from './Text';
import { StyledHeader, TopComponent, LogoDiv } from './styled';
import { COLORS } from '../../constants/Colors';

export const Header = ({ logoUrl, logoSize = 150, title, tagLine }: Props) => {
  const isTablet = useMediaQuery(tabletDimensions);
  const isMobile = useMediaQuery(mobileDimensions);

  // Desktop
  let adjustedLogoSize = logoSize;
  if (isTablet) {
    adjustedLogoSize *= tabletSizeModifier;
  } else if (isMobile) {
    adjustedLogoSize *= mobileSizeModifier;
  }

  return (
    <StyledHeader>
      <TopComponent>
        {logoUrl && <LogoDiv image={logoUrl} width={adjustedLogoSize} height={adjustedLogoSize} />}
        {title && (
          <Text
            style={{
              fontSize: '5em',
              fontWeight: 600,
              lineHeight: 0.9,
              color: COLORS.white,
            }}
          >
            {title}
          </Text>
        )}
      </TopComponent>

      {tagLine && (
        <Text
          style={{
            fontSize: '1.65em',
            fontWeight: 100,
            margin: '14px 0 14px 0',
            color: COLORS.grey,
          }}
        >
          {tagLine}
        </Text>
      )}
    </StyledHeader>
  );
};
