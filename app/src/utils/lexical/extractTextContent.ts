import { SerializedEditorState, SerializedLexicalNode } from 'lexical';

export const extractTextContent = (editorState?: SerializedEditorState | null): string | null => {
  if (!editorState || !editorState.root || editorState.root.children.length === 0) {
    return null;
  }

  // Recursive function to extract text content from all nodes
  const extractTextContentRecursive = (node: SerializedLexicalNode): string => {
    // If the node has a text property, return its text
    if ('text' in node && typeof node.text === 'string') {
      return node.text.trim();
    }

    // Recursively extract text from children
    if ('children' in node && Array.isArray(node.children) && node.children.length > 0) {
      return node.children.map(extractTextContentRecursive).join('');
    }

    return ''; // Return empty if no text found
  };

  return editorState.root.children.map(extractTextContentRecursive).join('');
};
