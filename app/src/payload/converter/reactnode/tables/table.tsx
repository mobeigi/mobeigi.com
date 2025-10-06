import type { ReactNodeConverter } from '@/payload/lexical/types';
import { convertLexicalNodesToReactNode } from '@/payload/lexical/convertLexicalNodesToReactNode';
import {
  type SerializedTableCellNode,
  type SerializedTableNode,
  type SerializedTableRowNode,
} from '@payloadcms/richtext-lexical';
import { TableCellHeaderStates } from '@lexical/table';

export const TableReactNodeConverter: ReactNodeConverter<SerializedTableNode> = {
  converter({ converters, node, parent }) {
    const headerRows: SerializedTableRowNode[] = [];
    const bodyRows: SerializedTableRowNode[] = [];
    let foundHeaderEnd = false;
    for (const row of node.children as SerializedTableRowNode[]) {
      if (foundHeaderEnd) {
        bodyRows.push(row);
        continue;
      }

      /**
       * NB: We ignore cells that have TableCellHeaderStates set to COLUMN, in the weird case that the user
       * sets a non-first column as header.
       */
      const headerCells = (row.children as SerializedTableCellNode[]).filter(
        (cell) => cell.headerState !== TableCellHeaderStates.NO_STATUS,
      );

      if (headerCells.length === row.children.length) {
        // All cells in row are header, add this row to header rows
        headerRows.push(row);
      } else {
        foundHeaderEnd = true;
        bodyRows.push(row);
      }
    }

    return (
      <div className="table-wrapper">
        <table>
          {headerRows.length > 0 && (
            <thead>
              {convertLexicalNodesToReactNode({
                converters,
                lexicalNodes: headerRows,
                parent: {
                  ...node,
                  parent,
                },
              })}
            </thead>
          )}
          <tbody>
            {convertLexicalNodesToReactNode({
              converters,
              lexicalNodes: bodyRows,
              parent: {
                ...node,
                parent,
              },
            })}
          </tbody>
        </table>
      </div>
    );
  },
  nodeTypes: ['table'],
};
