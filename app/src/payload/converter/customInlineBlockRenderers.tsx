import { SerializedInlineBlockNode } from '@payloadcms/richtext-lexical';
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

/**
 * Define custom inline block render functions for use in InlineBlockReactNodeConverter.
 */
export const customInlineBlockRenderers: Record<string, (node: SerializedInlineBlockNode) => ReactNode> = {
  [Code.slug]: (node) => <CodeBlock {...(node.fields as CodeBlockType)} />,
  [Embed.slug]: (node) => <EmbedBlock {...(node.fields as EmbedBlockType)} />,
  [File.slug]: (node) => <FileBlock {...(node.fields as FileBlockType)} />,
  [MediaBlockConfig.slug]: (node) => <MediaBlock {...(node.fields as MediaBlockType)} />,
};
