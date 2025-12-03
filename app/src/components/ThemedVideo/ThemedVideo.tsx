'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { ThemedVideoProps } from './types';
import { resolvedThemeToThemeMode } from '@/utils/theme';
import { ThemeMode } from '@/types/theme';

export const ThemedVideo = ({ dark, light }: ThemedVideoProps) => {
  const [hydrated, setHydrated] = useState(false);
  const { resolvedTheme } = useTheme();
  const resolvedThemeMode = resolvedThemeToThemeMode(resolvedTheme);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      videoRef.current?.pause();
      videoRef.current?.load();
    }
  }, [resolvedThemeMode, hydrated]);

  const videoStyle = hydrated ? (resolvedThemeMode === ThemeMode.Dark ? dark.style : light.style) : dark.style; // Use dark style for its dimension styling as fallback
  const videoSrc = hydrated ? (resolvedThemeMode === ThemeMode.Dark ? dark.src : light.src) : '';
  const videoType = hydrated ? (resolvedThemeMode === ThemeMode.Dark ? dark.type : light.type) : '';
  const ariaLabel = hydrated ? (resolvedThemeMode === ThemeMode.Dark ? dark.ariaLabel : light.ariaLabel) : '';

  return (
    /* eslint-disable-next-line jsx-a11y/media-has-caption */
    <video ref={videoRef} style={videoStyle} controls aria-label={ariaLabel}>
      {hydrated && <source src={videoSrc} type={videoType} />}
      Your browser does not support the video tag.
    </video>
  );
};
