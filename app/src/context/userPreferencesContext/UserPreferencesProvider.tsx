'use client';

import { useState, useEffect } from 'react';
import { PrefersColorScheme, ThemeMode } from '../../types/theme';
import { UserPreferencesContext } from './UserPreferencesContext';
import { getStoredThemeMode, storeThemeCookie } from './utils';
import { UserPreferencesProviderProps } from './types';
import { getPrefersColorScheme } from '@/utils/theme';

export const UserPreferencesProvider = ({
  children,
  initialThemeMode,
  initialPrefersColorScheme,
}: UserPreferencesProviderProps) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialThemeMode);
  const [prefersColorScheme, setPrefersColorScheme] = useState<PrefersColorScheme | undefined>(
    initialPrefersColorScheme,
  );

  useEffect(() => {
    // Update prefersColorScheme from client
    const clientPrefersColorScheme = getPrefersColorScheme();
    setPrefersColorScheme(clientPrefersColorScheme);

    // Update stored themeMode
    const storedTheme = getStoredThemeMode();
    setThemeMode(storedTheme);
    storeThemeCookie(storedTheme, clientPrefersColorScheme);
  }, []);

  useEffect(() => {
    // Use listener to bind prefersColorScheme
    const colorSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: light)'); // Generic matchMedia to detect any change in prefers-color-scheme
    const updatePrefersColorScheme = () => {
      const clientPrefersColorScheme = getPrefersColorScheme();
      setPrefersColorScheme(clientPrefersColorScheme);
      storeThemeCookie(themeMode, clientPrefersColorScheme);
    };
    colorSchemeMediaQuery.addEventListener('change', updatePrefersColorScheme);

    return () => {
      colorSchemeMediaQuery.removeEventListener('change', updatePrefersColorScheme);
    };
  }, [themeMode]);

  const setThemeModeFn = (themeMode: ThemeMode) => {
    setThemeMode(themeMode);
    storeThemeCookie(themeMode, prefersColorScheme);
  };

  return (
    <UserPreferencesContext.Provider
      value={{
        themeMode: themeMode,
        setThemeMode: setThemeModeFn,
        prefersColorScheme,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};
