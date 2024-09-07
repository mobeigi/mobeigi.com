import { type MediaBlock as MediaBlockType, Media } from '@/payload-types';
import Image from 'next/image';

export const MediaBlock = ({ media }: MediaBlockType) => {
  const mediaData = media as Media;
  const url = mediaData.url!;
  const mimeType = mediaData.mimeType as string;
  const width = mediaData.width || undefined;
  const height = mediaData.height || undefined;

  if (mimeType.startsWith('image/')) {
    return <Image src={url} alt={mediaData.alt} width={width} height={height} />;
  } else if (mimeType.startsWith('video/')) {
    return <video src={url} aria-label={mediaData.alt} controls={true}></video>;
  }
  return <span>Unsupported media block mime type: {mimeType}</span>;
};
