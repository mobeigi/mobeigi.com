import { SerializedRelationshipNode } from '@payloadcms/richtext-lexical';
import { ReactNode } from 'react';

/**
 * Define custom relationship render functions for use in RelationshipReactNodeConverter.
 */
export const customRelationshipRenderers: Record<string, (node: SerializedRelationshipNode) => ReactNode> = {};
