import { getNodeText } from './getNodeText';
import { ReactElement } from 'react';

describe('getNodeText', () => {
  it('returns empty string for null', () => {
    expect(getNodeText(null)).toBe('');
  });

  it('returns empty string for undefined', () => {
    expect(getNodeText(undefined)).toBe('');
  });

  it('returns null for unsupported node types', () => {
    const unsupportedNode = () => {}; // Function is unsupported node type
    // @ts-expect-error We are purposely passing in a node that is not a ReactNode
    expect(getNodeText(unsupportedNode)).toBeNull();
  });

  it('logs a warning for unresolved node types', () => {
    console.warn = jest.fn();
    const unsupportedNode = () => {}; // Function is unsupported node type
    // @ts-expect-error We are purposely passing in a node that is not a ReactNode
    getNodeText(unsupportedNode);
    expect(console.warn).toHaveBeenCalledWith('Unresolved `node` of type:', 'function', unsupportedNode);
  });

  it('returns the string for a string node', () => {
    expect(getNodeText('Hello world!')).toBe('Hello world!');
  });

  it('returns the string representation for a number node', () => {
    expect(getNodeText(123)).toBe('123');
  });

  it('returns the string representation for a boolean node', () => {
    expect(getNodeText(true)).toBe('true');
  });

  it('concatenates text from an array of nodes', () => {
    const nodeArray = ['Hello', 123, true];
    expect(getNodeText(nodeArray)).toBe('Hello123true');
  });

  it('extracts text from a React element with children', () => {
    const element: ReactElement = {
      type: 'div',
      props: { children: 'Hello World' },
      key: null,
    };
    expect(getNodeText(element)).toBe('Hello World');
  });

  it('extracts text from nested React elements', () => {
    const element: ReactElement = {
      type: 'div',
      props: { children: ['Hello', { type: 'span', props: { children: ' World' }, key: null, ref: null }] },
      key: null,
    };
    expect(getNodeText(element)).toBe('Hello World');
  });
});
