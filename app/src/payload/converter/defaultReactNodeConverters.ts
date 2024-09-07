import type { ReactNodeConverter } from '@payload/lexical/types';

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

export const defaultReactNodeConverters: ReactNodeConverter<any>[] = [
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
