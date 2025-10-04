'use client';

import { useEffect, useState } from 'react';
import { ThemeMode } from '@/types/theme';
import Image from 'next/image';
import { ThemedPictureProps } from './types';
import { useTheme } from 'next-themes';
import { resolvedThemeToThemeMode } from '@/utils/theme';

export const ThemedPicture = ({ dark, light }: ThemedPictureProps) => {
  const [hydrated, setHydrated] = useState(false);
  const { resolvedTheme } = useTheme();
  const resolvedThemeMode = resolvedThemeToThemeMode(resolvedTheme);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const imageStyle = hydrated ? (resolvedThemeMode === ThemeMode.Dark ? dark.style : light.style) : dark.style; // Use dark style for its dimension styling as fallback
  const imageSrc = hydrated ? (resolvedThemeMode === ThemeMode.Dark ? dark.src : light.src) : '';
  const imageAlt = hydrated ? (resolvedThemeMode === ThemeMode.Dark ? dark.alt : light.alt) : '';
  const imageWidth = hydrated ? (resolvedThemeMode === ThemeMode.Dark ? dark.width : light.width) : dark.width; // Use dark width as fallback
  const imageHeight = hydrated ? (resolvedThemeMode === ThemeMode.Dark ? dark.height : light.height) : dark.height; // Use dark height as fallback

  return !hydrated ? (
    // Use a empty image during hydration to preserve space so we can avoid layout shift
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img
      width={imageWidth}
      height={imageHeight}
      style={{
        ...imageStyle,
        width: imageWidth,
        height: 'auto',
        visibility: 'hidden', // hide browser outlines often shown for image download in progress
      }}
    ></img>
  ) : (
    <Image src={imageSrc} alt={imageAlt} width={imageWidth} height={imageHeight} style={imageStyle} quality={100} />
  );
};
