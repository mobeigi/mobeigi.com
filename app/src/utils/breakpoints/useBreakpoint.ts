import { useState, useEffect, useCallback } from 'react';
import { breakpoints } from '@/styles/breakpoints';

export type BreakpointType = 'mobile' | 'tablet' | 'desktop';

interface BreakpointState {
  // Width breakpoints
  widthBreakpoint: BreakpointType;
  isMobileWidth: boolean;
  isTabletWidth: boolean;
  isDesktopWidth: boolean;

  // Height breakpoints
  heightBreakpoint: BreakpointType;
  isMobileHeight: boolean;
  isTabletHeight: boolean;
  isDesktopHeight: boolean;
}

export const useBreakpoint = (): BreakpointState => {
  const getBreakpointForDimension = (size: number, dimension: 'width' | 'height'): BreakpointType => {
    const maxKey = dimension === 'width' ? 'maxWidth' : 'maxHeight';

    // Mobile: <= mobile max
    if (size <= breakpoints.mobile[maxKey]) {
      return 'mobile';
    }

    // Tablet: <= tablet max (and > mobile max)
    if (size <= breakpoints.tablet[maxKey]) {
      return 'tablet';
    }

    // Desktop: > tablet max
    return 'desktop';
  };

  const getCurrentBreakpoints = useCallback((): { width: BreakpointType; height: BreakpointType } => {
    if (typeof window === 'undefined') {
      // Default to desktop during SSR
      return { width: 'desktop', height: 'desktop' };
    }

    return {
      width: getBreakpointForDimension(window.innerWidth, 'width'),
      height: getBreakpointForDimension(window.innerHeight, 'height'),
    };
  }, []);

  const [currentBreakpoints, setCurrentBreakpoints] = useState(getCurrentBreakpoints);

  useEffect(() => {
    const handleResize = () => {
      setCurrentBreakpoints(getCurrentBreakpoints());
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [getCurrentBreakpoints]);

  return {
    // Width breakpoints
    widthBreakpoint: currentBreakpoints.width,
    isMobileWidth: currentBreakpoints.width === 'mobile',
    isTabletWidth: currentBreakpoints.width === 'tablet',
    isDesktopWidth: currentBreakpoints.width === 'desktop',

    // Height breakpoints
    heightBreakpoint: currentBreakpoints.height,
    isMobileHeight: currentBreakpoints.height === 'mobile',
    isTabletHeight: currentBreakpoints.height === 'tablet',
    isDesktopHeight: currentBreakpoints.height === 'desktop',
  };
};
