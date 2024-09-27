import { ReactNodeConverter } from '@/payload/lexical/types';
import type { SerializedTextNode } from '@payloadcms/richtext-lexical';
import { IS_BOLD, IS_CODE, IS_ITALIC, IS_STRIKETHROUGH, IS_SUBSCRIPT, IS_SUPERSCRIPT, IS_UNDERLINE } from 'lexical';

export const TextReactNodeConverter: ReactNodeConverter<SerializedTextNode> = {
  converter({ node }) {
    let text = <>{node.text}</>;

    if (node.format & IS_BOLD) {
      text = <strong>{text}</strong>;
    }
    if (node.format & IS_ITALIC) {
      text = <em>{text}</em>;
    }
    if (node.format & IS_STRIKETHROUGH) {
      text = <span style={{ textDecoration: 'line-through' }}>{text}</span>;
    }
    if (node.format & IS_UNDERLINE) {
      text = <span style={{ textDecoration: 'underline' }}>{text}</span>;
    }
    if (node.format & IS_CODE) {
      text = <code>{text}</code>;
    }
    if (node.format & IS_SUBSCRIPT) {
      text = <sub>{text}</sub>;
    }
    if (node.format & IS_SUPERSCRIPT) {
      text = <sup>{text}</sup>;
    }

    return text;
  },
  nodeTypes: ['text'],
};
