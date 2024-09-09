import { Media } from '@/payload-types';

/**
 * Compute the final dimensions and style.
 *
 * These props allow you to:
 *  - Set the width / height according (with support for overrides if they are provided).
 *  - Set initial style to avoid layout shifts for lazy-loaded images.
 */
export const getDimensionProps = (
  media: Media,
  widthOveride: number | null | undefined,
  heightOveride: number | null | undefined,
) => {
  // Get the original dimensions of the media
  const originalWidth = media.width!;
  const originalHeight = media.height!;

  let width = widthOveride || originalWidth;
  let height = heightOveride || originalHeight;

  // If only the width override is provided, calculate the height based on the original aspect ratio
  if (widthOveride && !heightOveride) {
    height = (widthOveride / originalWidth) * originalHeight; // Preserve aspect ratio
  }
  // If only the height override is provided, calculate the width based on the original aspect ratio
  else if (heightOveride && !widthOveride) {
    width = (heightOveride / originalHeight) * originalWidth; // Preserve aspect ratio
  }

  // Create a style object that preserves space for lazy-loaded images
  const style = {
    width: `${width}px`, // Always set the width to avoid layout shifts for lazy-loaded images
    height: heightOveride ? `${height}px` : 'auto', // Set height to auto if not overridden to maintain aspect ratio
  };

  return {
    width,
    height,
    style,
  };
};
