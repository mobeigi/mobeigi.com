import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { tabletDimensions, mobileDimensions, tabletSizeModifier, mobileSizeModifier } from '../../utils/MediaQuery';

import type { Props } from './types';
import { StyledLogo } from './styled';

export const Logo = ({ logoUrl, logoSize = 150 }: Props) => {
  const isTablet = useMediaQuery(tabletDimensions);
  const isMobile = useMediaQuery(mobileDimensions);

  // Desktop
  let adjustedLogoSize = logoSize;
  if (isTablet) {
    adjustedLogoSize *= tabletSizeModifier;
  } else if (isMobile) {
    adjustedLogoSize *= mobileSizeModifier;
  }

  return <StyledLogo image={logoUrl} width={adjustedLogoSize} height={adjustedLogoSize} />;
};
