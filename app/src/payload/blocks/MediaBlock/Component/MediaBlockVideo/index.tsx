import { type MediaBlock as MediaBlockType, Media } from '@/payload-types';
import { Video } from '@/components/ThemedVideo/types';
import ThemedVideo from '@/components/ThemedVideo';
import { getDimensionProps } from '../utils';

export const MediaBlockVideo = ({ mediaDark, mediaLight, widthOverride, heightOverride }: MediaBlockType) => {
  const mediaDarkData = mediaDark as Media;

  const darkDimensions = getDimensionProps(mediaDarkData, widthOverride, heightOverride);

  if (mediaLight) {
    const mediaLightData = mediaLight as Media;
    const lightDimensions = getDimensionProps(mediaLightData, widthOverride, heightOverride);

    const darkVideo: Video = {
      src: mediaDarkData.url!,
      type: mediaDarkData.mimeType!,
      ariaLabel: mediaDarkData.alt,
      style: darkDimensions.style,
    };

    const lightVideo: Video = {
      src: mediaLightData.url!,
      type: mediaLightData.mimeType!,
      ariaLabel: mediaLightData.alt,
      style: lightDimensions.style,
    };

    return <ThemedVideo dark={darkVideo} light={lightVideo} />;
  } else {
    // Dark is our default style
    return (
      /* eslint-disable-next-line jsx-a11y/media-has-caption */
      <video src={mediaDarkData.url!} aria-label={mediaDarkData.alt} controls style={darkDimensions.style}></video>
    );
  }
};
