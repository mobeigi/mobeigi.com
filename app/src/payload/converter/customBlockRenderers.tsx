import { SerializedBlockNode } from '@payloadcms/richtext-lexical';
import { ReactNode } from 'react';

import { Code } from '@payload/blocks/Code/config';
import { CodeBlock } from '@payload/blocks/Code/Component';
import { type CodeBlock as CodeBlockType } from '@/payload-types';

import { Embed } from '@payload/blocks/Embed/config';
import { EmbedBlock } from '@payload/blocks/Embed/Component';
import { type EmbedBlock as EmbedBlockType } from '@/payload-types';

import { File } from '@/payload/blocks/File/config';
import { FileBlock } from '@/payload/blocks/File/Component';
import { type FileBlock as FileBlockType } from '@/payload-types';

import { MediaBlock as MediaBlockConfig } from '@/payload/blocks/MediaBlock/config';
import { MediaBlock } from '@/payload/blocks/MediaBlock/Component';
import { type MediaBlock as MediaBlockType } from '@/payload-types';

type CustomBlockFields = CodeBlockType | EmbedBlockType | FileBlockType | MediaBlockType;

/**
 * Define custom block render functions for use in BlockReactNodeConverter.
 */
export const customBlockRenderers: Record<string, (node: SerializedBlockNode<CustomBlockFields>) => ReactNode> = {
  [Code.slug]: (node) => <CodeBlock {...(node.fields as CodeBlockType)} />,
  [Embed.slug]: (node) => <EmbedBlock {...(node.fields as EmbedBlockType)} />,
  [File.slug]: (node) => <FileBlock {...(node.fields as FileBlockType)} />,
  [MediaBlockConfig.slug]: (node) => <MediaBlock {...(node.fields as MediaBlockType)} />,
};
