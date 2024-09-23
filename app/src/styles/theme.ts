const theme = {
  breakpoints: {
    mobile: { maxWidth: 800, maxHeight: 600 },
    tablet: { maxWidth: 1000, maxHeight: 800 },
    desktop: { maxWidth: 1250, maxHeight: 1000 },
  },
  colors: {
    dark: {
      background: '#1e1e1e',
      frame: {
        background: '#181717',
        accent: '#3a3a3a',
        // TODO: Change this text type to act like 'subtle' text, its not just for the frame
        text: {
          base: '#999',
          baseHighlight: '#f5f5f5',
        },
      },
      container: {
        background: '#232323',
        accent: '#3a3a3a',
        text: {
          base: '#e3e3e3',
          baseHighlight: '#f5f5f5',
        },
      },
      text: {
        base: '#e3e3e3',
        baseHighlight: '#f5f5f5',
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
        text: {
          base: '#6e6e6e',
          baseHighlight: '#525252',
        },
      },
      container: {
        background: '#f9f9f9',
        accent: '#a1a1a1',
        text: {
          base: '#404040',
          baseHighlight: '#525252',
        },
      },
      text: {
        base: '#404040',
        baseHighlight: '#525252',
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
          base: '#656565',
          baseHighlight: '#666666',
          accent: '#999999',
          complement: '#333333',
        },
      },
    },
  },
};

export default theme;
