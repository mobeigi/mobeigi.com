import { type MediaBlock as MediaBlockType, Media } from '@/payload-types';

export const MediaBlockAudio = ({ mediaDark }: MediaBlockType) => {
  const mediaDarkData = mediaDark as Media;

  return (
    /* eslint-disable-next-line jsx-a11y/media-has-caption */
    <audio controls aria-label={mediaDarkData.alt}>
      <source src={mediaDarkData.url!} type={mediaDarkData.mimeType!} />
      Your browser does not support the audio element.
    </audio>
  );
};
