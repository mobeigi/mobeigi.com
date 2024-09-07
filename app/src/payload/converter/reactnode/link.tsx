import { ReactNodeConverter } from '@/payload/lexical/types';
import type { SerializedLinkNode } from '@payloadcms/richtext-lexical';
import { convertLexicalNodesToReactNode } from '@/payload/lexical/serializeLexical';
import Link from 'next/link';

export const LinkReactNodeConverter: ReactNodeConverter<SerializedLinkNode> = {
  async converter({ converters, node, parent }) {
    const children = await convertLexicalNodesToReactNode({
      converters,
      lexicalNodes: node.children,
      parent: {
        ...node,
        parent,
      },
    });

    const rel: string[] = [];
    let href = '';
    let target = '';

    const link = node.fields;

    if (link.newTab) {
      target = '_blank';
      rel.push('noopener');
      rel.push('noreferrer');
    }

    if (link.linkType === 'custom') {
      href = link.url;
    } else if (link.linkType === 'internal') {
      // TODO: This is not sufficient, there should be a way to determine the relative or absolute 'url' for each collection
      // @ts-ignore
      href = link.doc?.value?.id.toString() ?? '';
    } else {
      return <span>Unknown link type: {link.linkType}</span>;
    }

    return (
      <Link href={href} {...(rel.length > 0 && { rel: rel.join(' ') })} {...(target && { target })}>
        {children}
      </Link>
    );
  },
  nodeTypes: ['link', 'autolink'],
};
