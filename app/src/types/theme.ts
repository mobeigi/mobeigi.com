/**
 * Represents the preference for theming.
 */
export enum ThemeMode {
  System = 'system',
  Light = 'light',
  Dark = 'dark',
}

/**
 * Represents the prefers color scheme CSS options.
 */
export enum PrefersColorScheme {
  Light = 'light',
  Dark = 'dark',
}

/**
 * Theme object
 */
type Breakpoints = {
  mobile: {
    maxWidth: number;
    maxHeight: number;
  };
  tablet: {
    maxWidth: number;
    maxHeight: number;
  };
  desktop: {
    maxWidth: number;
    maxHeight: number;
  };
};

type StatusTheme = {
  base: string;
  baseHighlight: string;
  accent: string;
  complement: string;
};

type TextTheme = {
  base: string;
  baseHighlight: string;
  subtle: string;
  subtleHighlight: string;
  link: string;
  linkHighlight: string;
};

type ContainerTheme = {
  background: string;
  accent: string;
};

type FrameTheme = {
  background: string;
  accent: string;
};

type TooltipTheme = {
  text: string;
  background: string;
};

type ColorMode = {
  background: string;
  frame: FrameTheme;
  container: ContainerTheme;
  tooltip: TooltipTheme;
  text: TextTheme;
  status: {
    primary: StatusTheme;
    secondary: StatusTheme;
    success: StatusTheme;
    error: StatusTheme;
    disabled: StatusTheme;
  };
};

export type Theme = {
  breakpoints: Breakpoints;
  dark: ColorMode;
  light: ColorMode;
};

export type DefaultThemeOverride = Theme & {
  current: ColorMode;
  currentThemeMode: ThemeMode;
};
