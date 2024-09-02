'use client';

import { ThemeMode } from '@/types/theme';
import { HighlightJsStyleProps } from './types';
import useHighlightJsTheme from '@/hooks/useHighlightJsTheme';
import { HIGHLIGHTJS_THEME_LINK_ID_DARK, HIGHLIGHTJS_THEME_LINK_ID_LIGHT } from '@/constants/highlightjs';

/**
 * We mimic the technique used by Highlight.js demo.
 * We have two styles as stylesheet links loaded and use the 'disabled' attribute to support theme switching.
 * Technique reference: https://github.com/highlightjs/highlight.js/blob/main/demo/demo.js
 */
export const HighlightJsStyle = ({ currentTheme }: HighlightJsStyleProps) => {
  // Enable theme switching
  useHighlightJsTheme();
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link
        id={HIGHLIGHTJS_THEME_LINK_ID_LIGHT}
        rel="stylesheet"
        /* @ts-ignore */
        disabled={currentTheme !== ThemeMode.Light}
        href="/css/highlight.js/base16/material-lighter.min.css"
      />

      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link
        id={HIGHLIGHTJS_THEME_LINK_ID_DARK}
        rel="stylesheet"
        /* @ts-ignore */
        disabled={currentTheme !== ThemeMode.Dark}
        href="/css/highlight.js/base16/material-darker.min.css"
      />
    </>
  );
};
