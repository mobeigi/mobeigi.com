import { DEFAULT_THEME_MODE, FALLBACK_SYSTEM_THEME_MODE } from '@/constants/theme';
import { ThemeMode } from '@/types/theme';

/**
 * Converts a next/themes string to a ThemeMode enum value.
 * If the input is undefined or invalid, it defaults to the default theme mode.
 *
 * @param theme - The string to convert or undefined.
 * @returns The matching ThemeMode value or the default theme mode.
 */
export const nextThemeToThemeMode = (theme?: string): ThemeMode =>
  Object.values(ThemeMode).includes(theme as ThemeMode) ? (theme as ThemeMode) : DEFAULT_THEME_MODE;

/**
 * Converts a resolved theme string to a ThemeMode enum value.
 * If the input is undefined or invalid, it defaults to fallback system theme mode.
 *
 * @param theme - The resolved theme string to convert or undefined.
 * @returns The matching ThemeMode value or the fallback system theme mode.
 */
export const resolvedThemeToThemeMode = (theme?: string): ThemeMode =>
  Object.values(ThemeMode).includes(theme as ThemeMode) ? (theme as ThemeMode) : FALLBACK_SYSTEM_THEME_MODE;
