import { PrefersColorScheme, ThemeMode } from '@/types/theme';

export interface ThemePreferenceCookieData {
  themeMode: ThemeMode;
  prefersColorScheme?: PrefersColorScheme;
}
