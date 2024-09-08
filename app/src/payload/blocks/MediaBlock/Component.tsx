import { type MediaBlock as MediaBlockType, Media } from '@/payload-types';
import Image from 'next/image';
import { ThemedPicture } from '../../../components/ThemedPicture/ThemedPicture';
import { Picture } from '@/components/ThemedPicture/types';
import { Video } from '@/components/ThemedVideo/types';
import ThemedVideo from '@/components/ThemedVideo';

const getDimensionProps = (
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

export const MediaBlock = ({ mediaDark, mediaLight, widthOveride, heightOveride }: MediaBlockType) => {
  const mediaDarkData = mediaDark as Media;
  const mimeType = mediaDarkData.mimeType as string;

  const darkDimensions = getDimensionProps(mediaDarkData, widthOveride, heightOveride);

  if (mimeType.startsWith('image/')) {
    if (mediaLight) {
      const mediaLightData = mediaLight as Media;
      const lightDimensions = getDimensionProps(mediaLightData, widthOveride, heightOveride);

      const darkPicture: Picture = {
        src: mediaDarkData.url!,
        width: darkDimensions.width,
        height: darkDimensions.height,
        alt: mediaDarkData.alt,
        style: darkDimensions.style,
      };

      const lightPicture: Picture = {
        src: mediaLightData.url!,
        width: lightDimensions.width,
        height: lightDimensions.height,
        alt: mediaLightData.alt,
        style: lightDimensions.style,
      };

      return <ThemedPicture dark={darkPicture} light={lightPicture} />;
    } else {
      return (
        // Dark is our default style
        <Image
          src={mediaDarkData.url!}
          alt={mediaDarkData.alt}
          width={darkDimensions.width}
          height={darkDimensions.height}
          style={darkDimensions.style}
        />
      );
    }
  } else if (mimeType.startsWith('video/')) {
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
  }
  return <span>Unsupported media block mime type: {mimeType}</span>;
};
