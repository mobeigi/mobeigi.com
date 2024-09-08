'use client';

import { ThemeMode } from '@/types/theme';
import { useTheme } from 'styled-components';
import { ThemedVideoProps } from './types';

export const ThemedVideo = ({ dark, light }: ThemedVideoProps) => {
  const { currentTheme } = useTheme();

  const darkMedia = currentTheme === ThemeMode.Dark ? 'all' : 'none';
  const lightMedia = currentTheme === ThemeMode.Light ? 'all' : 'none';
  const style = currentTheme === ThemeMode.Dark ? dark.style : light.style;
  const ariaLabel = currentTheme === ThemeMode.Dark ? dark.ariaLabel : light.ariaLabel;

  return (
    <video style={style} controls aria-label={ariaLabel}>
      <source media={darkMedia} data-theme={ThemeMode.Dark} src={dark.src} type={dark.type} />
      <source media={lightMedia} data-theme={ThemeMode.Light} src={light.src} type={light.type} />
      Your browser does not support the video tag.
    </video>
  );
};
