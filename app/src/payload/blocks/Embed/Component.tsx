import { type EmbedBlock as EmbedBlockType } from '@/payload-types';

export const EmbedBlock = ({ url, width, height, title }: EmbedBlockType) => {
  const optionalAttributes = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...(title ? { title } : {}),
  };

  return (
    <iframe
      src={url}
      {...optionalAttributes}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      style={{ border: 0 }}
      allowFullScreen
    ></iframe>
  );
};
