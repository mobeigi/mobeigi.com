import { ThemePreferenceCookieData } from './types';
import { PrefersColorScheme, ThemeMode } from '@/types/theme';

/**
 * Generates a URL-encoded cookie value based on theme preferences.
 *
 * TODO: Can avoid passing prefersColorScheme in cookie when 'sec-ch-prefers-color-scheme' header becomes baseline.
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-Prefers-Color-Scheme
 *
 * @param {ThemeMode} themeMode - The user's theme preference.
 * @param {string} prefersColorScheme - The user's system color scheme (light, dark).
 * @returns {string} - URL-encoded value for a cookie.
 */
export const generateThemeCookieValue = ({ themeMode, prefersColorScheme }: ThemePreferenceCookieData): string => {
  const cookieValue = `${themeMode}:${prefersColorScheme || ''}`;
  return cookieValue;
};

/**
 * Parses a URL-encoded cookie value to extract theme preferences.
 * @param {string} cookieValue - The URL-encoded cookie value.
 * @returns {ThemePreferenceCookieData} - Object containing the extracted themeMode and prefersColorScheme.
 * @throws {Error} If cookie value is invalid.
 */
export const parseThemeCookieValue = (cookieValue: string): ThemePreferenceCookieData => {
  const [themeMode, prefersColorScheme] = cookieValue.split(':');

  if (!themeMode || !Object.values(ThemeMode).includes(themeMode as ThemeMode)) {
    throw Error('Invalid themeMode in theme cookie value.');
  }

  if (prefersColorScheme && !Object.values(PrefersColorScheme).includes(prefersColorScheme as PrefersColorScheme)) {
    throw Error('Invalid prefersColorScheme in theme cookie value.');
  }

  return {
    themeMode: themeMode as ThemeMode,
    prefersColorScheme: prefersColorScheme as PrefersColorScheme,
  };
};
