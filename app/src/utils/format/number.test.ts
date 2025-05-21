import { formatCompactNumber } from './number';

describe('formatCompactNumber', () => {
  it('returns raw number for < 1K', () => {
    expect(formatCompactNumber(0)).toBe('0');
    expect(formatCompactNumber(-0)).toBe('0');
    expect(formatCompactNumber(17)).toBe('17');
    expect(formatCompactNumber(-17)).toBe('-17');
    expect(formatCompactNumber(999)).toBe('999');
    expect(formatCompactNumber(-999)).toBe('-999');
  });

  it('formats 1K-9.9K with decimal', () => {
    expect(formatCompactNumber(1000)).toBe('1K');
    expect(formatCompactNumber(-1000)).toBe('-1K');
    expect(formatCompactNumber(1200)).toBe('1.2K');
    expect(formatCompactNumber(-1200)).toBe('-1.2K');
    expect(formatCompactNumber(9999)).toBe('9.9K');
    expect(formatCompactNumber(-9999)).toBe('-9.9K');
  });

  it('formats 10K-999K with no decimal', () => {
    expect(formatCompactNumber(10000)).toBe('10K');
    expect(formatCompactNumber(-10000)).toBe('-10K');
    expect(formatCompactNumber(123456)).toBe('123K');
    expect(formatCompactNumber(-123456)).toBe('-123K');
    expect(formatCompactNumber(999999)).toBe('999K');
    expect(formatCompactNumber(-999999)).toBe('-999K');
  });

  it('formats 1M-9.9M with decimal', () => {
    expect(formatCompactNumber(1_000_000)).toBe('1M');
    expect(formatCompactNumber(-1_000_000)).toBe('-1M');
    expect(formatCompactNumber(1_250_000)).toBe('1.2M');
    expect(formatCompactNumber(-1_250_000)).toBe('-1.2M');
    expect(formatCompactNumber(9_999_999)).toBe('9.9M');
    expect(formatCompactNumber(-9_999_999)).toBe('-9.9M');
  });

  it('formats 10M-999M with no decimal', () => {
    expect(formatCompactNumber(10_000_000)).toBe('10M');
    expect(formatCompactNumber(-10_000_000)).toBe('-10M');
    expect(formatCompactNumber(123_456_789)).toBe('123M');
    expect(formatCompactNumber(-123_456_789)).toBe('-123M');
    expect(formatCompactNumber(999_999_999)).toBe('999M');
    expect(formatCompactNumber(-999_999_999)).toBe('-999M');
  });

  it('formats 1B-9.9B with decimal', () => {
    expect(formatCompactNumber(1_000_000_000)).toBe('1B');
    expect(formatCompactNumber(-1_000_000_000)).toBe('-1B');
    expect(formatCompactNumber(1_250_000_000)).toBe('1.2B');
    expect(formatCompactNumber(-1_250_000_000)).toBe('-1.2B');
    expect(formatCompactNumber(9_999_999_999)).toBe('9.9B');
    expect(formatCompactNumber(-9_999_999_999)).toBe('-9.9B');
  });

  it('formats 10B+ with no decimal', () => {
    expect(formatCompactNumber(10_000_000_000)).toBe('10B');
    expect(formatCompactNumber(-10_000_000_000)).toBe('-10B');
    expect(formatCompactNumber(12_345_678_901)).toBe('12B');
    expect(formatCompactNumber(-12_345_678_901)).toBe('-12B');
  });
});
