import { PropsWithChildren } from 'react';
import { useMediaQuery } from 'react-responsive';

export const desktopDimensions = { minWidth: 1200 };
export const tabletDimensions = { minWidth: 768, maxWidth: 1199 };
export const mobileDimensions = { maxWidth: 767 };

export const desktopSizeModifier = 1.0;
export const tabletSizeModifier = 0.85;
export const mobileSizeModifier = 0.7;

export const Desktop = ({ children }: PropsWithChildren<{}>) => {
  const isDesktop = useMediaQuery(desktopDimensions);
  return isDesktop ? children : null;
};
export const Tablet = ({ children }: PropsWithChildren<{}>) => {
  const isTablet = useMediaQuery(tabletDimensions);
  return isTablet ? children : null;
};
export const Mobile = ({ children }: PropsWithChildren<{}>) => {
  const isMobile = useMediaQuery(mobileDimensions);
  return isMobile ? children : null;
};
