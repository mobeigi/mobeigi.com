export interface Video {
  src: string;
  type: string;
  ariaLabel: string;
  style: React.CSSProperties;
}

export interface ThemedVideoProps {
  dark: Video;
  light: Video;
}
