import { ReactNodeConverter } from '@/payload/lexical/types';
import type { SerializedHorizontalRuleNode } from '@payloadcms/richtext-lexical';

export const HorizontalRuleReactNodeConverter: ReactNodeConverter<SerializedHorizontalRuleNode> = {
  async converter() {
    return <hr />;
  },
  nodeTypes: ['horizontalrule'],
};
