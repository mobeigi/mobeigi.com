import { PrefersColorScheme } from '@/types/theme';
import { ThemeMode } from 'react-toggle-dark-mode';

export interface ThemePreferenceCookieData {
  themeMode: ThemeMode;
  prefersColorScheme?: PrefersColorScheme;
}
