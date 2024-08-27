import { PrefersColorScheme, ThemeMode } from '@/types/theme';

// The theme mode to use for new users by default
export const DEFAULT_THEME_MODE = ThemeMode.System;

// The theme mode to use as a fallback if the system theme mode cannot be resolved
export const FALLBACK_SYSTEM_THEME_MODE = ThemeMode.Dark;

// The color scheme preference to use as a fallback if one is not provided
export const FALLBACK_PREFERS_COLOR_SCHEME = PrefersColorScheme.Dark;
