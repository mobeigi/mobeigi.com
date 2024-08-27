import { PrefersColorScheme, ThemeMode } from '@/types/theme';

export interface UserPreferencesContextProps {
  themeMode: ThemeMode;
  setThemeMode: (themeMode: ThemeMode) => void;
  prefersColorScheme?: PrefersColorScheme;
}

export interface UserPreferencesProviderProps {
  children: React.ReactNode;
  initialThemeMode: ThemeMode;
  initialPrefersColorScheme?: PrefersColorScheme;
}
