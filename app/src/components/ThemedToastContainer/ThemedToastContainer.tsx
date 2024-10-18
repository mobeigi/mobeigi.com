'use client';

import { ThemeMode } from '@/types/theme';
import { resolvedThemeToThemeMode } from '@/utils/theme';
import { useTheme } from 'next-themes';
import { ToastContainer, type Theme as ToastThemeType } from 'react-toastify';

export const ThemedToastContainer = () => {
  const { resolvedTheme } = useTheme();
  const resolvedThemeMode = resolvedThemeToThemeMode(resolvedTheme);

  const toastTheme: ToastThemeType = resolvedThemeMode === ThemeMode.Dark ? 'dark' : 'light';
  return <ToastContainer position="bottom-left" theme={toastTheme} />;
};
