import { type MediaBlock as MediaBlockType, Media } from '@/payload-types';
import Image from 'next/image';
import ThemedPicture from '@/components/ThemedPicture';
import { Picture } from '@/components/ThemedPicture/types';
import { getDimensionProps } from '../utils';

export const MediaBlockImage = ({ mediaDark, mediaLight, widthOveride, heightOveride }: MediaBlockType) => {
  const mediaDarkData = mediaDark as Media;

  const darkDimensions = getDimensionProps(mediaDarkData, widthOveride, heightOveride);

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
};
