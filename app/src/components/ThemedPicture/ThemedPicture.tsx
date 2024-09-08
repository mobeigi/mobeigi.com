'use client';

import { ThemeMode } from '@/types/theme';
import { getImageProps } from 'next/image';
import { useTheme } from 'styled-components';
import { ThemedPictureProps } from './types';

export const ThemedPicture = ({ dark, light }: ThemedPictureProps) => {
  const { currentTheme } = useTheme();

  const {
    props: { srcSet: darkSrcSet, ...darkRestImageProps },
  } = getImageProps({ width: dark.width, height: dark.height, alt: dark.alt, src: dark.src });
  const {
    props: { srcSet: lightSrcSet, ...lightRestImageProps },
  } = getImageProps({ width: light.width, height: light.height, alt: light.alt, src: light.src });

  const darkMedia = currentTheme === ThemeMode.Dark ? 'all' : 'none';
  const lightMedia = currentTheme === ThemeMode.Light ? 'all' : 'none';
  const style = currentTheme === ThemeMode.Dark ? dark.style : light.style;
  const restImageProps = currentTheme === ThemeMode.Dark ? darkRestImageProps : lightRestImageProps;

  return (
    <picture>
      <source media={darkMedia} data-theme={ThemeMode.Dark} srcSet={darkSrcSet} />
      <source media={lightMedia} data-theme={ThemeMode.Light} srcSet={lightSrcSet} />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...restImageProps} style={style} />
    </picture>
  );
};
