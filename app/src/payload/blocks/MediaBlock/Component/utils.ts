import { Media } from '@/payload-types';
import { GetDimensionPropsResponse } from './utils.types';

/**
 * Compute the final dimensions and style.
 *
 * These props allow you to:
 *  - Set the width / height according (with support for overrides if they are provided).
 *  - Set initial style to avoid layout shifts for lazy-loaded images.
 */
export const getDimensionProps = (
  media: Media,
  widthOverride: number | null | undefined,
  heightOverride: number | null | undefined,
): GetDimensionPropsResponse => {
  // Get the original dimensions of the media
  const originalWidth = media.width;
  const originalHeight = media.height;

  let width = widthOverride || originalWidth;
  let height = heightOverride || originalHeight;

  if (originalWidth && originalHeight) {
    // If only the width override is provided, calculate the height based on the original aspect ratio
    if (widthOverride && !heightOverride) {
      height = (widthOverride / originalWidth) * originalHeight; // Preserve aspect ratio
    }
    // If only the height override is provided, calculate the width based on the original aspect ratio
    else if (heightOverride && !widthOverride) {
      width = (heightOverride / originalHeight) * originalWidth; // Preserve aspect ratio
    }
  }

  // Create a style object that preserves space for lazy-loaded images
  const style = {
    ...(width && { width: `${width}px` }), // Always set the width to avoid layout shifts for lazy-loaded images
    ...(height && { height: heightOverride ? `${height}px` : 'auto' }), // Set height to auto if not overridden to maintain aspect ratio
  };

  return {
    width: width ?? undefined,
    height: height ?? undefined,
    style,
  };
};
