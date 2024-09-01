'use client';

import { ReactNode, useEffect, useRef } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import { StyledHighlightCode } from './styled';
import { useTheme } from 'styled-components';
import { ThemeMode } from '@/types/theme';

// Register languages
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);

interface HighlightCodeProps {
  children: ReactNode;
}

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
