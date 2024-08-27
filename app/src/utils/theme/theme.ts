import { FALLBACK_PREFERS_COLOR_SCHEME, FALLBACK_SYSTEM_THEME_MODE } from '@/constants/theme';
import { PrefersColorScheme, ThemeMode } from '@/types/theme';

/**
 * Resolves theme mode to either light or dark.
 * @param {ThemeMode} themeMode - The theme mode.
 * @param {string} prefersColorScheme - The user's preferred color scheme (light, dark).
 * @returns {ThemeMode} - The resolved theme mode (light or dark).
 */
export const resolveThemeMode = (themeMode: ThemeMode, prefersColorScheme?: PrefersColorScheme): ThemeMode => {
  switch (themeMode) {
    case ThemeMode.Dark:
    case ThemeMode.Light:
      return themeMode;
    case ThemeMode.System:
      if (prefersColorScheme) {
        if (prefersColorScheme === PrefersColorScheme.Dark) {
          return ThemeMode.Dark;
        } else if (prefersColorScheme === PrefersColorScheme.Light) {
          return ThemeMode.Light;
        } else {
          return FALLBACK_SYSTEM_THEME_MODE;
        }
      }
    default:
      throw Error(`Unsupported themeMode: ${themeMode}`);
  }
};

/**
 * Gets the clients prefers-color-scheme media preference.
 * @returns {PrefersColorScheme} - The prefers color scheme if a match was made or the default fallback otherwise.
 */
export const getPrefersColorScheme = (): PrefersColorScheme | undefined => {
  if (window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return PrefersColorScheme.Light;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return PrefersColorScheme.Dark;
    }
  }
  return FALLBACK_PREFERS_COLOR_SCHEME;
};
