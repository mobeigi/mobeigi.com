'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DarkModeSwitch, DarkModeSwitchHandle, ThemeMode as DarkModeSwitchThemeMode } from 'react-toggle-dark-mode';
import { ThemeMode } from '@/types/theme';
import { IconWrapperBubble } from '@/styles/icon';
import { DarkModeSwitchWrapper } from './styled';
import { renderToStaticMarkup } from 'react-dom/server';
import { useTheme } from 'next-themes';
import { nextThemeToThemeMode } from '@/utils/theme';

const customColors = {
  halfSunLeftFill: '#ebd75b',
  halfSunLeftStroke: '#ebd75b',
  halfSunLeftBeamStroke: '#e3cc42',
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
      throw Error(`Unsupported themeMode: ${String(themeMode)}`);
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
      throw Error(`Unsupported darkModeToggleThemeMode: ${String(darkModeToggleThemeMode)}`);
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
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
  const themeMode = mounted ? nextThemeToThemeMode(theme) : ThemeMode.System;
  const darkModeSwitchRef = useRef<DarkModeSwitchHandle>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cycleThemeMode = (darkModeSwitchThemeMode: DarkModeSwitchThemeMode) => {
    setTheme(toThemeMode(darkModeSwitchThemeMode));
  };

  const triggerClick = () => {
    if (darkModeSwitchRef.current) {
      darkModeSwitchRef.current.click();
    }
  };

  const tooltipElement = getTooltip(themeMode);
  const tooltipHtml = useMemo(() => renderToStaticMarkup(tooltipElement), [tooltipElement]);

  return (
    <IconWrapperBubble onClick={triggerClick} data-tooltip-id="base-tooltip" data-tooltip-html={tooltipHtml}>
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
