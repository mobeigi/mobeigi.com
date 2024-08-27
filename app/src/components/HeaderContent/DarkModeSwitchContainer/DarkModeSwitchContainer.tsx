'use client';

import { DarkModeSwitch, ThemeMode as DarkModeSwitchThemeMode } from 'react-toggle-dark-mode';
import useUserPreferences from '@/hooks/useUserPreferences';
import { ThemeMode } from '@/types/theme';
import { DarkModeSwitchWrapper } from './styled';

export const customColors = {
  halfSunLeftFill: '#ffca00',
  halfSunLeftStroke: '#ffca00',
  halfSunLeftBeamStroke: '#ffe873',
  halfMoonRightFill: '#44415d',
  halfMoonRightStroke: '#44415d',
  halfMoonRightBeamStroke: '#c0b9c7',
  sunFill: '#ffbc33',
  sunStroke: '#784713',
  sunBeamStroke: '#5c190c',
  moonFill: '#f5f5f5',
  moonStroke: '#bbbbbb',
};

const toDarkModeToggleThemeMode = (themeMode: ThemeMode) => {
  switch (themeMode) {
    case ThemeMode.System:
      return DarkModeSwitchThemeMode.System;
    case ThemeMode.Light:
      return DarkModeSwitchThemeMode.Light;
    case ThemeMode.Dark:
      return DarkModeSwitchThemeMode.Dark;
    default:
      throw Error(`Unsupported themeMode: ${ThemeMode}`);
  }
};

const toThemeMode = (darkModeToggleThemeMode: DarkModeSwitchThemeMode) => {
  switch (darkModeToggleThemeMode) {
    case DarkModeSwitchThemeMode.System:
      return ThemeMode.System;
    case DarkModeSwitchThemeMode.Light:
      return ThemeMode.Light;
    case DarkModeSwitchThemeMode.Dark:
      return ThemeMode.Dark;
    default:
      throw Error(`Unsupported darkModeToggleThemeMode: ${darkModeToggleThemeMode}`);
  }
};

export const DarkModeSwitchContainer = () => {
  const { themeMode, setThemeMode } = useUserPreferences();

  const cycleThemeMode = (darkModeSwitchThemeMode: DarkModeSwitchThemeMode) => {
    setThemeMode(toThemeMode(darkModeSwitchThemeMode));
  };

  return (
    <DarkModeSwitchWrapper>
      <DarkModeSwitch
        onChange={cycleThemeMode}
        isSystemThemeModeEnabled={true}
        themeMode={toDarkModeToggleThemeMode(themeMode)}
        colors={customColors}
      />
    </DarkModeSwitchWrapper>
  );
};
