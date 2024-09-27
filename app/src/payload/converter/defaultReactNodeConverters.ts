import type { ReactNodeConverter } from '@payload/lexical/types';

import {
  SerializedBlockNode,
  SerializedHeadingNode,
  SerializedHorizontalRuleNode,
  SerializedInlineBlockNode,
  SerializedLineBreakNode,
  SerializedLinkNode,
  SerializedListNode,
  SerializedListItemNode,
  SerializedParagraphNode,
  SerializedQuoteNode,
  SerializedRelationshipNode,
  SerializedTableNode,
  SerializedTableCellNode,
  SerializedTableRowNode,
  SerializedTextNode,
  SerializedUploadNode,
} from '@payloadcms/richtext-lexical';

import { BlockReactNodeConverter } from '@payload/converter/reactnode/blocks';
import { InlineBlockReactNodeConverter } from '@payload/converter/reactnode/inlineBlocks';
import { HeadingReactNodeConverter } from '@payload/converter/reactnode/heading';
import { HorizontalRuleReactNodeConverter } from '@payload/converter/reactnode/hr';
import { LinebreakReactNodeConverter } from '@payload/converter/reactnode/linebreak';
import { LinkReactNodeConverter } from '@payload/converter/reactnode/link';
import { ListReactNodeConverter, ListItemReactNodeConverter } from '@payload/converter/reactnode/list';
import { ParagraphReactNodeConverter } from '@payload/converter/reactnode/paragraph';
import { QuoteReactNodeConverter } from '@payload/converter/reactnode/quote';
import { RelationshipReactNodeConverter } from '@payload/converter/reactnode/relationship';
import { TableReactNodeConverter } from '@payload/converter/reactnode/tables/table';
import { TableCellReactNodeConverter } from '@payload/converter/reactnode/tables/tableCell';
import { TableRowReactNodeConverter } from '@payload/converter/reactnode/tables/tableRow';
import { TextReactNodeConverter } from '@payload/converter/reactnode/text';
import { UploadReactNodeConverter } from '@payload/converter/reactnode/upload';

type ReactNodeConverters =
  | ReactNodeConverter<SerializedBlockNode>
  | ReactNodeConverter<SerializedHeadingNode>
  | ReactNodeConverter<SerializedHorizontalRuleNode>
  | ReactNodeConverter<SerializedInlineBlockNode>
  | ReactNodeConverter<SerializedLineBreakNode>
  | ReactNodeConverter<SerializedLinkNode>
  | ReactNodeConverter<SerializedListNode>
  | ReactNodeConverter<SerializedListItemNode>
  | ReactNodeConverter<SerializedParagraphNode>
  | ReactNodeConverter<SerializedQuoteNode>
  | ReactNodeConverter<SerializedRelationshipNode>
  | ReactNodeConverter<SerializedTableNode>
  | ReactNodeConverter<SerializedTableCellNode>
  | ReactNodeConverter<SerializedTableRowNode>
  | ReactNodeConverter<SerializedTextNode>
  | ReactNodeConverter<SerializedUploadNode>;

export const defaultReactNodeConverters: ReactNodeConverters[] = [
  BlockReactNodeConverter,
  HeadingReactNodeConverter,
  HorizontalRuleReactNodeConverter,
  InlineBlockReactNodeConverter,
  LinebreakReactNodeConverter,
  LinkReactNodeConverter,
  ListReactNodeConverter,
  ListItemReactNodeConverter,
  ParagraphReactNodeConverter,
  QuoteReactNodeConverter,
  RelationshipReactNodeConverter,
  TableReactNodeConverter,
  TableCellReactNodeConverter,
  TableRowReactNodeConverter,
  TextReactNodeConverter,
  UploadReactNodeConverter,
];
