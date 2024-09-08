import { ThemeMode } from '@/types/theme';

/**
 * Updates the `media` attribute of <source> elements inside media elements based on the provided theme.
 * This allows us to render theme appropriate variants.
 * Source elements must have data-theme set for this to work.
 * @param {ThemeMode} resolvedThemeMode - The resolved theme mode
 */
export const updateMediaSourcesForTheme = (resolvedThemeMode: ThemeMode) => {
  // Update sources for picture elements
  const pictures = document.querySelectorAll<HTMLPictureElement>('picture');
  pictures.forEach((picture) => {
    const sources = picture.querySelectorAll<HTMLSourceElement>('source');
    sources.forEach((source) => {
      const sourceTheme = source.getAttribute('data-theme');
      const currentMedia = source.getAttribute('media');

      if (sourceTheme !== null) {
        const newMedia = sourceTheme === resolvedThemeMode ? 'all' : 'none';
        if (currentMedia !== newMedia) {
          source.setAttribute('media', newMedia);
        }
      }
    });
  });

  // Update sources for video elements
  const videos = document.querySelectorAll<HTMLVideoElement>('video');
  videos.forEach((video) => {
    const sources = video.querySelectorAll<HTMLSourceElement>('source');
    let videoNeedsUpdate = false;

    sources.forEach((source) => {
      const sourceTheme = source.getAttribute('data-theme');
      const currentMedia = source.getAttribute('media');

      if (sourceTheme !== null) {
        const newMedia = sourceTheme === resolvedThemeMode ? 'all' : 'none';
        if (currentMedia !== newMedia) {
          source.setAttribute('media', newMedia);
          videoNeedsUpdate = true;
        }
      }
    });

    // Reload the video if sources were updated
    if (videoNeedsUpdate) {
      video.pause();
      video.load();
    }
  });
};
