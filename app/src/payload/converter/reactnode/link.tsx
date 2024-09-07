import { ReactNodeConverter } from '@/payload/lexical/types';
import type { SerializedLinkNode } from '@payloadcms/richtext-lexical';
import { convertLexicalNodesToReactNode } from '@/payload/lexical/serializeLexical';
import Link from 'next/link';
import { customUrlResolvers } from '../customInternalUrlResolvers';
import { CollectionSlug, DataFromCollectionSlug } from 'payload';

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
      const relationTo = link.doc?.relationTo as CollectionSlug;
      const doc = link.doc?.value as DataFromCollectionSlug<any>;

      if (doc && relationTo && relationTo in customUrlResolvers) {
        const resolveUrl = customUrlResolvers[relationTo];
        const url = resolveUrl(doc);
        if (!url) {
          return <span>Failed to resolve url for collection: {relationTo}</span>;
        }
        href = url;
      } else {
        return <span>Unknown collection or missing document: {relationTo}</span>;
      }
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
