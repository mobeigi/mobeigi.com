'use client';

import { ThemeProvider } from 'styled-components';
import theme from '@/styles/theme';
import { ThemeProviderWrapperProps } from './types';
import { DefaultThemeOverride, ThemeMode } from '@/types/theme';
import useUserPreferences from '@/hooks/useUserPreferences';
import { resolveThemeMode } from '@/utils/theme';

export const ThemeProviderWrapper = ({ children }: ThemeProviderWrapperProps) => {
  const { themeMode, prefersColorScheme } = useUserPreferences();

  const resolvedTheme = resolveThemeMode(themeMode, prefersColorScheme);
  const current = resolvedTheme === ThemeMode.Dark ? theme.dark : theme.light;

  const themeArgument: DefaultThemeOverride = { ...theme, current: current, currentThemeMode: resolvedTheme };
  return <ThemeProvider theme={themeArgument}>{children}</ThemeProvider>;
};
