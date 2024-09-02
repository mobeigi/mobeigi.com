'use client';

import { useEffect } from 'react';
import { useTheme } from 'styled-components';
import { ThemeMode } from '@/types/theme';
import { HIGHLIGHTJS_THEME_LINK_ID_DARK, HIGHLIGHTJS_THEME_LINK_ID_LIGHT } from '@/constants/highlightjs';

const setLinkEnabledById = (linkId: string, enabled: boolean) => {
  const link = document.getElementById(linkId) as HTMLLinkElement;
  if (link) {
    link.disabled = !enabled;
  }
};

export const useHighlightJsTheme = () => {
  const theme = useTheme();

  useEffect(() => {
    // Enable the correct stylesheet link based on theme mode
    if (theme.currentTheme === ThemeMode.Light) {
      setLinkEnabledById(HIGHLIGHTJS_THEME_LINK_ID_DARK, false);
      setLinkEnabledById(HIGHLIGHTJS_THEME_LINK_ID_LIGHT, true);
    } else if (theme.currentTheme === ThemeMode.Dark) {
      setLinkEnabledById(HIGHLIGHTJS_THEME_LINK_ID_LIGHT, false);
      setLinkEnabledById(HIGHLIGHTJS_THEME_LINK_ID_DARK, true);
    } else {
      throw Error(`Unsupported themeMode: ${ThemeMode}`);
    }
  }, [theme.currentTheme]);
};
