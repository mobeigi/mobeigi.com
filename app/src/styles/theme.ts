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
        text: {
          base: '#999',
          baseHighlight: '#f5f5f5',
        },
      },
      container: {
        background: '#232323',
        accent: '#3a3a3a',
      },
      text: {
        base: '#e3e3e3',
        baseHighlight: '#f5f5f5',
        link: '#af363c',
        linkHighlight: '#fb4d56',
      },
      status: {
        primary: {
          base: '#2b76a3',
          baseHighlight: '#5aa7cc',
          accent: '#104a63',
          complement: '#ffffff',
        },
        success: {
          base: '#4caf50',
          baseHighlight: '#60d065',
          accent: '#2e7d32',
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
        background: '##fdfdfd',
        accent: '#a1a1a1',
      },
      text: {
        base: '#404040',
        baseHighlight: '#525252',
        link: '#af363c',
        linkHighlight: '#fb4d56',
      },
      status: {
        primary: {
          base: '#2b76a3',
          baseHighlight: '#5aa7cc',
          accent: '#104a63',
          complement: '#ffffff',
        },
        success: {
          base: '#4caf50',
          baseHighlight: '#60d065',
          accent: '#2e7d32',
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