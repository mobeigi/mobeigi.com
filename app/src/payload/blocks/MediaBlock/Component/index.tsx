import { type MediaBlock as MediaBlockType, Media } from '@/payload-types';
import { MediaBlockImage } from './MediaBlockImage';
import { MediaBlockVideo } from './MediaBlockVideo';
import { MediaBlockAudio } from './MediaBlockAudio';

export const MediaBlock = (props: MediaBlockType) => {
  const darkMimeType = (props.mediaDark as Media).mimeType!;
  const lightMimeType = (props.mediaLight as Media)?.mimeType;

  if (lightMimeType && darkMimeType !== lightMimeType) {
    <span>
      Unsupported media block mime type mismatch: {darkMimeType} and {lightMimeType}
    </span>;
  }

  if (darkMimeType.startsWith('image/')) {
    return <MediaBlockImage {...props} />;
  } else if (darkMimeType.startsWith('video/')) {
    return <MediaBlockVideo {...props} />;
  } else if (darkMimeType.startsWith('audio/')) {
    return <MediaBlockAudio {...props} />;
  }
  return <span>Unsupported media block mime type: {darkMimeType}</span>;
};
