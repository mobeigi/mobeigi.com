import { Theme } from '@/types/theme';

const theme: Theme = {
  breakpoints: {
    mobile: { maxWidth: 800, maxHeight: 600 },
    tablet: { maxWidth: 1000, maxHeight: 800 },
    desktop: { maxWidth: 1250, maxHeight: 1000 },
  },
  dark: {
    background: '#1e1e1e',
    frame: {
      background: '#181717',
      accent: '#3a3a3a',
    },
    container: {
      background: '#232323',
      accent: '#3a3a3a',
    },
    tooltip: {
      text: '#e3e3e3',
      background: '#424242',
    },
    text: {
      base: '#e3e3e3',
      baseHighlight: '#f5f5f5',
      subtle: '#999',
      subtleHighlight: '#f5f5f5',
      link: '#af363c',
      linkHighlight: '#fb4d56',
    },
    status: {
      primary: {
        base: '#af363c',
        baseHighlight: '#fb4d56',
        accent: '#80181d',
        complement: '#ffffff',
      },
      secondary: {
        base: '#424242',
        baseHighlight: '#727272',
        accent: '#1e1e1e',
        complement: '#ffffff',
      },
      success: {
        base: '#4caf50',
        baseHighlight: '#60d065',
        accent: '#2e7d32',
        complement: '#ffffff',
      },
      error: {
        base: '#cd524e',
        baseHighlight: '#de5955',
        accent: '#8c2d2a',
        complement: '#ffffff',
      },
      disabled: {
        base: '#9e9e9e',
        baseHighlight: '#666666',
        accent: '#999999',
        complement: '#333333',
      },
    },
  },
  light: {
    background: '#ffffff',
    frame: {
      background: '#f6f6f6',
      accent: '#a1a1a1',
    },
    container: {
      background: '#f9f9f9',
      accent: '#a1a1a1',
    },
    text: {
      base: '#404040',
      baseHighlight: '#525252',
      subtle: '#6e6e6e',
      subtleHighlight: '#525252',
      link: '#af363c',
      linkHighlight: '#fb4d56',
    },
    tooltip: {
      text: '#e3e3e3',
      background: '#424242',
    },
    status: {
      primary: {
        base: '#af363c',
        baseHighlight: '#fb4d56',
        accent: '#80181d',
        complement: '#ffffff',
      },
      secondary: {
        base: '#424242',
        baseHighlight: '#727272',
        accent: '#1e1e1e',
        complement: '#ffffff',
      },
      success: {
        base: '#4caf50',
        baseHighlight: '#60d065',
        accent: '#2e7d32',
        complement: '#ffffff',
      },
      error: {
        base: '#cd524e',
        baseHighlight: '#de5955',
        accent: '#8c2d2a',
        complement: '#ffffff',
      },
      disabled: {
        base: '#656565',
        baseHighlight: '#666666',
        accent: '#999999',
        complement: '#333333',
      },
    },
  },
};

export default theme;
