import React from 'react';
import type { ReactNodeConverter } from '@/payload/lexical/types';
import { SerializedRelationshipNode } from '@payloadcms/richtext-lexical';
import { customRelationshipRenderers } from '../customRelationshipRenderers';

export const RelationshipReactNodeConverter: ReactNodeConverter<SerializedRelationshipNode> = {
  converter({ node }) {
    const relationshipType = node.relationTo;

    if (relationshipType in customRelationshipRenderers) {
      const renderFn = customRelationshipRenderers[relationshipType];
      return renderFn(node);
    } else {
      return <span>Unknown relationship type: {relationshipType}</span>;
    }
  },
  nodeTypes: ['relationship'],
};
