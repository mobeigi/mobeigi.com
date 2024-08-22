'use client';

import { ThemeProvider } from 'styled-components';
import theme from '@/styles/themes';
import { ThemeProviderWrapperProps } from './types';
import { ThemeMode } from '@/types/theme';

export const ThemeProviderWrapper = ({ children, themeMode }: ThemeProviderWrapperProps) => {
  const currentTheme = themeMode === ThemeMode.Dark ? theme.colors.dark : theme.colors.light;
  const extraThemeArguments = { colors: currentTheme };

  return <ThemeProvider theme={{ ...theme, ...extraThemeArguments }}>{children}</ThemeProvider>;
};
