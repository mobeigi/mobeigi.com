import { type MediaBlock as MediaBlockType, Media } from '@/payload-types';
import { Video } from '@/components/ThemedVideo/types';
import ThemedVideo from '@/components/ThemedVideo';
import { getDimensionProps } from '../utils';

export const MediaBlockVideo = ({ mediaDark, mediaLight, widthOveride, heightOveride }: MediaBlockType) => {
  const mediaDarkData = mediaDark as Media;

  const darkDimensions = getDimensionProps(mediaDarkData, widthOveride, heightOveride);

  if (mediaLight) {
    const mediaLightData = mediaLight as Media;
    const lightDimensions = getDimensionProps(mediaLightData, widthOveride, heightOveride);

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
    return <video src={mediaDarkData.url!} aria-label={mediaDarkData.alt} controls></video>;
  }
};