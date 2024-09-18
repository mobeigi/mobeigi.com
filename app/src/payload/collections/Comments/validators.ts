import validator from 'validator';
import { SerializedEditorState } from 'lexical';
import { extractTextContent } from '@/utils/lexical';

export const validateDisplayName = (displayName: string): true | string => {
  const trimmedDisplayName = displayName.trim();
  if (!trimmedDisplayName) {
    return 'Display name cannot be empty.';
  }

  if (displayName !== trimmedDisplayName) {
    return 'Display name cannot have leading or trailing spaces.';
  }

  if (trimmedDisplayName.length < 1 || trimmedDisplayName.length > 20) {
    return 'Display name must be between 1 and 20 characters.';
  }

  // Regular expression to allow letters, numbers, and common punctuation (and disallow emojis or odd characters)
  const allowedCharactersRegex = /^[\p{L}\p{N} _\-.,'"]+$/u;

  if (!allowedCharactersRegex.test(trimmedDisplayName)) {
    return 'Display name contains invalid characters.';
  }

  return true;
};

export const validateEmail = (email: string): true | string => {
  if (!email.trim()) {
    return 'Email cannot be empty.';
  }
  return validator.isEmail(email) ? true : 'Invalid email format.';
};

export const validateContent = (editorState: SerializedEditorState | null): true | string => {
  if (!editorState || !editorState.root || editorState.root.children.length === 0) {
    return 'Comment cannot be empty.';
  }

  const textContent = extractTextContent(editorState);
  if (!textContent || textContent.length === 0) {
    return 'Comment cannot be empty.';
  }

  // Enforce node type allow list
  const allowedTypes = ['paragraph', 'text', 'linebreak'];

  const checkNodeTypes = (node: any): boolean => {
    if (!allowedTypes.includes(node.type)) {
      return false;
    }

    // Check all children recursively
    if (node.children && node.children.length > 0) {
      return node.children.every(checkNodeTypes);
    }

    return true;
  };

  // Validate all root children nodes
  const allNodesValid = editorState.root.children.every(checkNodeTypes);

  if (!allNodesValid) {
    return 'Comment contains invalid node types.';
  }

  return true;
};
