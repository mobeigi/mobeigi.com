'use client';

import { ThemeProvider } from 'styled-components';
import theme from '@/styles/theme';
import { ThemeProviderWrapperProps } from './types';
import { ThemeMode } from '@/types/theme';
import useUserPreferences from '@/hooks/useUserPreferences';
import { resolveThemeMode } from '@/utils/theme';

export const ThemeProviderWrapper = ({ children }: ThemeProviderWrapperProps) => {
  const { themeMode, prefersColorScheme } = useUserPreferences();

  const resolvedTheme = resolveThemeMode(themeMode, prefersColorScheme);
  const colors = resolvedTheme === ThemeMode.Dark ? theme.colors.dark : theme.colors.light;
  const extraThemeArguments = { colors: colors };

  return <ThemeProvider theme={{ ...theme, ...extraThemeArguments }}>{children}</ThemeProvider>;
};
