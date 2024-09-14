'use client';

import { PropsWithChildren } from 'react';
import { useMediaQuery } from 'react-responsive';
import { desktopDimensions, mobileDimensions, tabletDimensions } from './dimensions';

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
