'use client';

import { ThemeMode } from '@/types/theme';
import { getImageProps } from 'next/image';
import { useTheme } from 'styled-components';
import { ThemedPictureProps } from './types';

export const ThemedPicture = ({ dark, light }: ThemedPictureProps) => {
  const { currentThemeMode } = useTheme();

  const {
    props: { srcSet: darkSrcSet, ...darkRestImageProps },
  } = getImageProps({ width: dark.width, height: dark.height, alt: dark.alt, src: dark.src });
  const {
    props: { srcSet: lightSrcSet, ...lightRestImageProps },
  } = getImageProps({ width: light.width, height: light.height, alt: light.alt, src: light.src });

  const darkMedia = currentThemeMode === ThemeMode.Dark ? 'all' : 'none';
  const lightMedia = currentThemeMode === ThemeMode.Light ? 'all' : 'none';
  const style = currentThemeMode === ThemeMode.Dark ? dark.style : light.style;
  const restImageProps = currentThemeMode === ThemeMode.Dark ? darkRestImageProps : lightRestImageProps;

  return (
    <picture>
      <source media={darkMedia} data-theme={ThemeMode.Dark} srcSet={darkSrcSet} />
      <source media={lightMedia} data-theme={ThemeMode.Light} srcSet={lightSrcSet} />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...restImageProps} style={style} />
    </picture>
  );
};
