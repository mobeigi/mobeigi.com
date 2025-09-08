import { renderHook, act } from '@testing-library/react';
import { useBreakpoint } from './useBreakpoint';

// Mock window.innerWidth and window.innerHeight
const mockWindowSize = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
};

// Mock window.addEventListener and removeEventListener
const mockEventListener = () => {
  const listeners: { [key: string]: ((this: Window, ev: Event) => void)[] } = {};

  window.addEventListener = jest.fn((event: string, listener: (this: Window, ev: Event) => void) => {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(listener);
  }) as typeof window.addEventListener;

  window.removeEventListener = jest.fn((event: string, listener: (this: Window, ev: Event) => void) => {
    if (listeners[event]) {
      const index = listeners[event].indexOf(listener);
      if (index > -1) listeners[event].splice(index, 1);
    }
  }) as typeof window.removeEventListener;

  return {
    triggerResize: () => {
      listeners.resize?.forEach((listener) => listener.call(window, new Event('resize')));
    },
  };
};

describe('useBreakpoint', () => {
  beforeEach(() => {
    mockEventListener();
  });

  describe('width breakpoints', () => {
    it('should return mobile width for width <= 800', () => {
      mockWindowSize(600, 1000);
      const { result } = renderHook(() => useBreakpoint());

      expect(result.current.widthBreakpoint).toBe('mobile');
      expect(result.current.isMobileWidth).toBe(true);
      expect(result.current.isTabletWidth).toBe(false);
      expect(result.current.isDesktopWidth).toBe(false);
    });

    it('should return tablet width for width <= 1000 and > 800', () => {
      mockWindowSize(900, 1000);
      const { result } = renderHook(() => useBreakpoint());

      expect(result.current.widthBreakpoint).toBe('tablet');
      expect(result.current.isMobileWidth).toBe(false);
      expect(result.current.isTabletWidth).toBe(true);
      expect(result.current.isDesktopWidth).toBe(false);
    });

    it('should return desktop width for width > 1000', () => {
      mockWindowSize(1200, 1000);
      const { result } = renderHook(() => useBreakpoint());

      expect(result.current.widthBreakpoint).toBe('desktop');
      expect(result.current.isMobileWidth).toBe(false);
      expect(result.current.isTabletWidth).toBe(false);
      expect(result.current.isDesktopWidth).toBe(true);
    });
  });

  describe('height breakpoints', () => {
    it('should return mobile height for height <= 600', () => {
      mockWindowSize(1200, 500);
      const { result } = renderHook(() => useBreakpoint());

      expect(result.current.heightBreakpoint).toBe('mobile');
      expect(result.current.isMobileHeight).toBe(true);
      expect(result.current.isTabletHeight).toBe(false);
      expect(result.current.isDesktopHeight).toBe(false);
    });

    it('should return tablet height for height <= 800 and > 600', () => {
      mockWindowSize(1200, 700);
      const { result } = renderHook(() => useBreakpoint());

      expect(result.current.heightBreakpoint).toBe('tablet');
      expect(result.current.isMobileHeight).toBe(false);
      expect(result.current.isTabletHeight).toBe(true);
      expect(result.current.isDesktopHeight).toBe(false);
    });

    it('should return desktop height for height > 800', () => {
      mockWindowSize(1200, 900);
      const { result } = renderHook(() => useBreakpoint());

      expect(result.current.heightBreakpoint).toBe('desktop');
      expect(result.current.isMobileHeight).toBe(false);
      expect(result.current.isTabletHeight).toBe(false);
      expect(result.current.isDesktopHeight).toBe(true);
    });
  });

  describe('independent width and height breakpoints', () => {
    it('should handle different width and height breakpoints independently', () => {
      // Mobile width (600) but desktop height (900)
      mockWindowSize(600, 900);
      const { result } = renderHook(() => useBreakpoint());

      expect(result.current.isMobileWidth).toBe(true);
      expect(result.current.isDesktopHeight).toBe(true);
      expect(result.current.isTabletWidth).toBe(false);
      expect(result.current.isMobileHeight).toBe(false);
    });

    it('should handle tablet width with mobile height', () => {
      // Tablet width (900) but mobile height (500)
      mockWindowSize(900, 500);
      const { result } = renderHook(() => useBreakpoint());

      expect(result.current.isTabletWidth).toBe(true);
      expect(result.current.isMobileHeight).toBe(true);
      expect(result.current.isMobileWidth).toBe(false);
      expect(result.current.isDesktopHeight).toBe(false);
    });
  });

  it('should update breakpoints on window resize', () => {
    const { triggerResize } = mockEventListener();
    mockWindowSize(600, 500);

    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.isMobileWidth).toBe(true);
    expect(result.current.isMobileHeight).toBe(true);

    // Resize to tablet width, desktop height
    mockWindowSize(900, 900);
    act(() => {
      triggerResize();
    });
    expect(result.current.isTabletWidth).toBe(true);
    expect(result.current.isDesktopHeight).toBe(true);

    // Resize to desktop width, tablet height
    mockWindowSize(1200, 700);
    act(() => {
      triggerResize();
    });
    expect(result.current.isDesktopWidth).toBe(true);
    expect(result.current.isTabletHeight).toBe(true);
  });
});
