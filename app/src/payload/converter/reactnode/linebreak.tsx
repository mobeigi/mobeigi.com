import type { ReactNodeConverter } from '@/payload/lexical/types';
import type { SerializedLineBreakNode } from 'lexical';

export const LinebreakReactNodeConverter: ReactNodeConverter<SerializedLineBreakNode> = {
  converter() {
    return <br />;
  },
  nodeTypes: ['linebreak'],
};
