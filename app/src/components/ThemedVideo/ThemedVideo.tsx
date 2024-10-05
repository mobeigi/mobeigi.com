'use client';

import { ThemeMode } from '@/types/theme';
import { useTheme } from 'styled-components';
import { ThemedVideoProps } from './types';

export const ThemedVideo = ({ dark, light }: ThemedVideoProps) => {
  const { currentThemeMode } = useTheme();

  const darkMedia = currentThemeMode === ThemeMode.Dark ? 'all' : 'none';
  const lightMedia = currentThemeMode === ThemeMode.Light ? 'all' : 'none';
  const style = currentThemeMode === ThemeMode.Dark ? dark.style : light.style;
  const ariaLabel = currentThemeMode === ThemeMode.Dark ? dark.ariaLabel : light.ariaLabel;

  return (
    <video style={style} controls aria-label={ariaLabel}>
      <source media={darkMedia} data-theme={ThemeMode.Dark} src={dark.src} type={dark.type} />
      <source media={lightMedia} data-theme={ThemeMode.Light} src={light.src} type={light.type} />
      Your browser does not support the video tag.
    </video>
  );
};
