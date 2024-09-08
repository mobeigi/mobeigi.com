import { THEME_COOKIE_NAME } from '@/constants/cookies';
import { PrefersColorScheme, ThemeMode } from '../../types/theme';
import { generateThemeCookieValue, parseThemeCookieValue, resolveThemeMode } from '@/utils/theme';
import Cookies from 'js-cookie';
import { DEFAULT_THEME_MODE } from '@/constants/theme';
import { updateMediaSourcesForTheme } from '@/utils/theme/media';

/**
 * Retrieves the stored theme from cookies or falls back to default.
 * @returns {ThemeMode} The theme mode
 */
export const getStoredThemeMode = (): ThemeMode => {
  const themeCookie = Cookies.get(THEME_COOKIE_NAME);
  if (themeCookie) {
    let parsedThemeCookieValue;
    try {
      parsedThemeCookieValue = parseThemeCookieValue(themeCookie);
      return parsedThemeCookieValue.themeMode as ThemeMode;
    } catch (error) {
      console.warn(`Parsing theme cookie value failed. themeCookie: ${themeCookie}`);
    }
  }
  return DEFAULT_THEME_MODE;
};

/**
 * Called when the theme mode changes.
 * @param {ThemeMode} themeMode - The theme mode to store
 * @param {PrefersColorScheme} prefersColorScheme - the prefered color scheme
 */
export const onThemeModeChanged = (themeMode: ThemeMode, prefersColorScheme?: PrefersColorScheme): void => {
  // Persist cookie
  storeThemeCookie(themeMode, prefersColorScheme);

  // Update theme dependant media in document
  const resolvedThemeMode = resolveThemeMode(themeMode, prefersColorScheme);
  updateMediaSourcesForTheme(resolvedThemeMode);
};

/**
 * Saves the selected theme to cookies.
 * @param {ThemeMode} themeMode - The theme mode to store
 * @param {PrefersColorScheme} prefersColorScheme - the prefered color scheme
 */
const storeThemeCookie = (themeMode: ThemeMode, prefersColorScheme?: PrefersColorScheme): void => {
  const themeCookieValue = generateThemeCookieValue({ themeMode, prefersColorScheme });
  Cookies.set(THEME_COOKIE_NAME, themeCookieValue, { path: '/', expires: 365 });
};
