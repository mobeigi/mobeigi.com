import { SerializedBlockNode } from '@payloadcms/richtext-lexical';
import { ReactNode } from 'react';

import { Code } from '@payload/blocks/Code/config';
import { CodeBlock } from '@payload/blocks/Code/Component';

import { Embed } from '@payload/blocks/Embed/config';
import { EmbedBlock } from '@payload/blocks/Embed/Component';

import { File } from '@/payload/blocks/File/config';
import { FileBlock } from '@/payload/blocks/File/Component';

import { MediaBlock as MediaBlockConfig } from '@/payload/blocks/MediaBlock/config';
import { MediaBlock } from '@/payload/blocks/MediaBlock/Component';

/**
 * Define custom block render functions for use in BlockReactNodeConverter.
 */
export const customBlockRenderers: Record<string, (node: SerializedBlockNode<any>) => ReactNode> = {
  [Code.slug]: (node) => <CodeBlock {...node.fields} />,
  [Embed.slug]: (node) => <EmbedBlock {...node.fields} />,
  [File.slug]: (node) => <FileBlock {...node.fields} />,
  [MediaBlockConfig.slug]: (node) => <MediaBlock {...node.fields} />,
};
