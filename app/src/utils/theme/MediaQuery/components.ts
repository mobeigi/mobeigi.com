'use client';

import { PropsWithChildren, ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';
import { desktopDimensions, mobileDimensions, tabletDimensions } from './dimensions';

export const Desktop = ({ children }: PropsWithChildren<ReactNode>) => {
  const isDesktop = useMediaQuery(desktopDimensions);
  return isDesktop ? children : null;
};
export const Tablet = ({ children }: PropsWithChildren<ReactNode>) => {
  const isTablet = useMediaQuery(tabletDimensions);
  return isTablet ? children : null;
};
export const Mobile = ({ children }: PropsWithChildren<ReactNode>) => {
  const isMobile = useMediaQuery(mobileDimensions);
  return isMobile ? children : null;
};
