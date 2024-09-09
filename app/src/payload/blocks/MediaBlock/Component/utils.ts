import { Media } from '@/payload-types';

export const getDimensionProps = (
  media: Media,
  widthOveride: number | null | undefined,
  heightOveride: number | null | undefined,
) => {
  const width = widthOveride || media.width || undefined;
  const height = heightOveride || media.height || undefined;

  const style = {
    ...(widthOveride && { width: widthOveride }),
    ...(heightOveride && { height: heightOveride }),
  };

  return {
    width,
    height,
    style,
  };
};
