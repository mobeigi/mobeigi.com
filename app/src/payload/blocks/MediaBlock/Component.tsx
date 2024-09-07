import { type MediaBlock as MediaBlockType, Media } from '@/payload-types';
import Image from 'next/image';

export const MediaBlock = ({ media, widthOveride, heightOveride }: MediaBlockType) => {
  const mediaData = media as Media;
  const url = mediaData.url!;
  const mimeType = mediaData.mimeType as string;

  const width = widthOveride || mediaData.width || undefined;
  const height = heightOveride || mediaData.height || undefined;

  const style = {
    ...(widthOveride && { width: widthOveride }),
    ...(heightOveride && { height: heightOveride }),
  };

  if (mimeType.startsWith('image/')) {
    return <Image src={url} alt={mediaData.alt} width={width} height={height} style={style} />;
  } else if (mimeType.startsWith('video/')) {
    return <video src={url} aria-label={mediaData.alt} controls={true}></video>;
  }
  return <span>Unsupported media block mime type: {mimeType}</span>;
};
