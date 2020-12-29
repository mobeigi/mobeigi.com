import { useMediaQuery } from 'react-responsive';

export const desktopDimensions = { minWidth: 1200 };
export const tabletDimensions = { minWidth: 768, maxWidth: 1199 };
export const mobileDimensions = { maxWidth: 767 };

export const desktopSizeModifier = 1.0;
export const tabletSizeModifier = 0.85;
export const mobileSizeModifier = 0.70;

export const Desktop: React.FunctionComponent<any> = ({ children }) => {
  const isDesktop = useMediaQuery(desktopDimensions);
  return isDesktop ? children : null;
};
export const Tablet: React.FunctionComponent<any> = ({ children }) => {
  const isTablet = useMediaQuery(tabletDimensions);
  return isTablet ? children : null;
};
export const Mobile: React.FunctionComponent<any> = ({ children }) => {
  const isMobile = useMediaQuery(mobileDimensions);
  return isMobile ? children : null;
};

export default {
  desktopDimensions,
  tabletDimensions,
  mobileDimensions,
  Desktop,
  Tablet,
  Mobile,
  desktopSizeModifier,
  tabletSizeModifier,
  mobileSizeModifier,
};
