import { type FileBlock as FileBlockType, type File } from '@/payload-types';

export const FileBlock = ({ file }: FileBlockType) => {
  const fileData = file as File;
  const linkText = fileData.title || fileData.filename;
  const url = fileData.url!;
  return (
    <a href={url} download>
      {linkText}
    </a>
  );
};
