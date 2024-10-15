import { hexToRgba } from './colors';

describe('hexToRgba', () => {
  it('throws an error for an invalid hex color', () => {
    expect(() => hexToRgba('invalid', 0.5)).toThrow('Invalid HEX color.');
  });

  it('throws an error for missing "#" in hex', () => {
    expect(() => hexToRgba('112233')).toThrow('Invalid HEX color.');
  });

  it('throws an error for hex with invalid length', () => {
    expect(() => hexToRgba('#abcd')).toThrow('Invalid HEX color.');
  });

  it('converts 3-character hex to rgba with default alpha', () => {
    const result = hexToRgba('#fff');
    expect(result).toBe('rgba(255, 255, 255, 1)');
  });

  it('converts 3-character hex to rgba with custom alpha', () => {
    const result = hexToRgba('#abc', 0.5);
    expect(result).toBe('rgba(170, 187, 204, 0.5)');
  });

  it('converts 6-character hex to rgba with default alpha', () => {
    const result = hexToRgba('#112233');
    expect(result).toBe('rgba(17, 34, 51, 1)');
  });

  it('converts 6-character hex to rgba with custom alpha', () => {
    const result = hexToRgba('#abcdef', 0.75);
    expect(result).toBe('rgba(171, 205, 239, 0.75)');
  });
});
