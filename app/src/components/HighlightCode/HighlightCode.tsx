'use client';

import { useEffect, useRef } from 'react';
import { HighlightCodeProps } from './types';
import { StyledHighlightCode } from './styled';
import { useTheme } from 'styled-components';
import { ThemeMode } from '@/types/theme';

// highlight.js
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import kotlin from 'highlight.js/lib/languages/kotlin';
import bash from 'highlight.js/lib/languages/bash';
import shell from 'highlight.js/lib/languages/shell';
import plaintext from 'highlight.js/lib/languages/plaintext';
import xml from 'highlight.js/lib/languages/xml'; // HTML + XML
import json from 'highlight.js/lib/languages/json';
import sql from 'highlight.js/lib/languages/sql';
import php from 'highlight.js/lib/languages/php';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import yaml from 'highlight.js/lib/languages/yaml';
import markdown from 'highlight.js/lib/languages/markdown';
import ini from 'highlight.js/lib/languages/ini';

// Register languages
const languages = {
  javascript,
  typescript,
  css,
  python,
  java,
  kotlin,
  bash,
  plaintext,
  xml,
  json,
  sql,
  php,
  c,
  cpp,
  yaml,
  markdown,
  ini,
  shell,
};

// Register languages
Object.entries(languages).forEach(([name, lang]) => {
  hljs.registerLanguage(name, lang);
});

const LINK_ID = 'highlight-js-theme';

// Function to remove the existing CSS link if it exists
const removeExistingCSSLink = () => {
  const existingLink = document.getElementById(LINK_ID);
  if (existingLink) {
    existingLink.parentNode?.removeChild(existingLink);
  }
};

export const HighlightCode = ({ children }: HighlightCodeProps) => {
  const theme = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.querySelectorAll('pre code, code').forEach((element) => {
        hljs.highlightElement(element as HTMLElement);
      });

      // TODO: Can preload both and use 'disabled' attribute instead?
      // SEE: https://github.com/highlightjs/highlight.js/blob/main/demo/demo.js

      // Remove existing CSS
      removeExistingCSSLink();

      // Create a new link element to load the appropriate CSS file
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.id = LINK_ID;
      link.href =
        theme.currentTheme === ThemeMode.Light
          ? '/css/highlight.js/base16/material-lighter.min.css'
          : '/css/highlight.js/base16/material-darker.min.css';

      document.head.appendChild(link);

      // Cleanup function to remove the CSS when the component is unmounted
      return () => {
        removeExistingCSSLink();
      };
    }
  }, [children, theme.currentTheme]);

  return <StyledHighlightCode ref={containerRef}>{children}</StyledHighlightCode>;
};
