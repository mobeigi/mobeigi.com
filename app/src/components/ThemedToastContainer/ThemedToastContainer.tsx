'use client';

import { ThemeMode } from '@/types/theme';
import { ToastContainer, type Theme as ToastThemeType } from 'react-toastify';
import { useTheme } from 'styled-components';

export const ThemedToastContainer = () => {
  const { currentTheme } = useTheme();
  const toastTheme: ToastThemeType = currentTheme === ThemeMode.Dark ? 'dark' : 'light';
  return <ToastContainer position="bottom-left" theme={toastTheme} />;
};
