import { SerializedEditorState, SerializedParagraphNode } from 'lexical';

export const emptySerializedParagraphNode: SerializedParagraphNode = {
  children: [],
  direction: null,
  format: '',
  indent: 0,
  type: 'paragraph',
  version: 1,
  textFormat: 0,
  textStyle: '',
};

export const emptySerializedEditorState: SerializedEditorState = {
  root: {
    children: [emptySerializedParagraphNode],
    direction: null,
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
};
