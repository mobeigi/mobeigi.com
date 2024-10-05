export interface Picture {
  src: string;
  width: number | undefined;
  height: number | undefined;
  alt: string;
  style: React.CSSProperties;
}

export interface ThemedPictureProps {
  dark: Picture;
  light: Picture;
}
