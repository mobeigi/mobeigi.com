'use client';

import React, { useMemo, useRef } from 'react';
import { DarkModeSwitch, DarkModeSwitchHandle, ThemeMode as DarkModeSwitchThemeMode } from 'react-toggle-dark-mode';
import useUserPreferences from '@/hooks/useUserPreferences';
import { ThemeMode } from '@/types/theme';
import { IconWrapperBubble } from '@/styles/icon';
import { DarkModeSwitchWrapper } from './styled';
import { renderToStaticMarkup } from 'react-dom/server';

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

const getTooltip = (currentThemeMode: ThemeMode) => {
  const themeModeCapitalized = currentThemeMode.charAt(0).toUpperCase() + currentThemeMode.slice(1);
  return (
    <span>
      Cycle theme mode
      <br />
      <br />
      Current: <strong>{themeModeCapitalized}</strong>
    </span>
  );
};

export const DarkModeSwitchContainer = () => {
  const { themeMode, setThemeMode } = useUserPreferences();
  const darkModeSwitchRef = useRef<DarkModeSwitchHandle>(null);

  const cycleThemeMode = (darkModeSwitchThemeMode: DarkModeSwitchThemeMode) => {
    setThemeMode(toThemeMode(darkModeSwitchThemeMode));
  };

  const triggerClick = () => {
    if (darkModeSwitchRef.current) {
      darkModeSwitchRef.current.click();
    }
  };

  const tooltipElement = getTooltip(themeMode);
  const tooltipHtml = useMemo(() => renderToStaticMarkup(tooltipElement), [tooltipElement]);

  return (
    <IconWrapperBubble onClick={triggerClick} data-tooltip-id={'base-tooltip'} data-tooltip-html={tooltipHtml}>
      <DarkModeSwitchWrapper>
        <DarkModeSwitch
          ref={darkModeSwitchRef}
          onChange={cycleThemeMode}
          isSystemThemeModeEnabled={true}
          themeMode={toDarkModeToggleThemeMode(themeMode)}
          colors={customColors}
        />
      </DarkModeSwitchWrapper>
    </IconWrapperBubble>
  );
};
