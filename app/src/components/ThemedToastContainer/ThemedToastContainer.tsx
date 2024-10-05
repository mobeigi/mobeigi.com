'use client';

import { ThemeMode } from '@/types/theme';
import { ToastContainer, type Theme as ToastThemeType } from 'react-toastify';
import { useTheme } from 'styled-components';

export const ThemedToastContainer = () => {
  const { currentThemeMode } = useTheme();
  const toastTheme: ToastThemeType = currentThemeMode === ThemeMode.Dark ? 'dark' : 'light';
  return <ToastContainer position="bottom-left" theme={toastTheme} />;
};
