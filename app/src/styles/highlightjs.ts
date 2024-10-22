import { css } from 'styled-components';

/**
 * Set highlight.js CSS variables based on our theme.
 */
const HighlightJsStyles = css`
  /* Light Theme */
  [data-theme='light'] {
    --highlightjs-base00: #f9f9f9; /* Default Background */
    --highlightjs-base01: #e7eaec; /* Lighter Background */
    --highlightjs-base02: #cceae7; /* Selection Background */
    --highlightjs-base03: #9f9f9f; /* Comments, Invisibles, Line Highlighting */
    --highlightjs-base04: #8796b0; /* Dark Foreground */
    --highlightjs-base05: #404040; /* Default Foreground */
    --highlightjs-base06: #404040; /* Light Foreground */
    --highlightjs-base07: #ffffff; /* Light Background */
    --highlightjs-base08: #ff5370; /* Variables, XML Tags */
    --highlightjs-base09: #f76d47; /* Integers, Constants */
    --highlightjs-base0A: #ff914d; /* Classes, Bold Text */
    --highlightjs-base0B: #91b859; /* Strings, Markup Code */
    --highlightjs-base0C: #39adb5; /* Support, Escape Characters */
    --highlightjs-base0D: #6182b8; /* Functions, Methods */
    --highlightjs-base0E: #7c4dff; /* Keywords, Selectors */
    --highlightjs-base0F: #e53935; /* Deprecated, Embedded Tags */
  }

  /* Dark Theme */
  [data-theme='dark'] {
    --highlightjs-base00: #232323; /* Default Background */
    --highlightjs-base01: #303030; /* Lighter Background */
    --highlightjs-base02: #353535; /* Selection Background */
    --highlightjs-base03: #a9a9a9; /* Comments, Invisibles, Line Highlighting */
    --highlightjs-base04: #b2ccd6; /* Dark Foreground */
    --highlightjs-base05: #e3e3e3; /* Default Foreground */
    --highlightjs-base06: #e3e3e3; /* Light Foreground */
    --highlightjs-base07: #ffffff; /* Light Background */
    --highlightjs-base08: #f07178; /* Variables, XML Tags */
    --highlightjs-base09: #f78c6c; /* Integers, Constants */
    --highlightjs-base0A: #ffcb6b; /* Classes, Bold Text */
    --highlightjs-base0B: #c3e88d; /* Strings, Markup Code */
    --highlightjs-base0C: #89ddff; /* Support, Escape Characters */
    --highlightjs-base0D: #82aaff; /* Functions, Methods */
    --highlightjs-base0E: #c792ea; /* Keywords, Selectors */
    --highlightjs-base0F: #ff5370; /* Deprecated, Embedded Tags */
  }
`;

export default HighlightJsStyles;
