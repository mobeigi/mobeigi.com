import { toRelativeUrl } from './toRelativeUrl';

describe('toRelativeUrl', () => {
  it('invalid url', () => {
    const url = '';
    expect(() => toRelativeUrl(url)).toThrow();
  });

  describe('absolute url', () => {
    it('single domain', () => {
      const url = 'https://example.com';
      expect(toRelativeUrl(url)).toBe('/');
      const urlWithFinalSlash = 'https://example.com/';
      expect(toRelativeUrl(urlWithFinalSlash)).toBe('/');
    });

    it('with path', () => {
      const url = 'https://example.com/api/variants/smooth/';
      expect(toRelativeUrl(url)).toBe('/api/variants/smooth/');
    });

    it('with query string', () => {
      const url = 'https://example.com/docs/legal/terms-of-service?lang=en';
      expect(toRelativeUrl(url)).toBe('/docs/legal/terms-of-service?lang=en');
    });

    it('with fragment', () => {
      const url = 'https://example.com/about/#contact-me';
      expect(toRelativeUrl(url)).toBe('/about/#contact-me');
    });

    it('with everything', () => {
      const url = 'https://example.com/docs/legal/terms-of-service/?lang=en#values';
      expect(toRelativeUrl(url)).toBe('/docs/legal/terms-of-service/?lang=en#values');
    });
  });

  describe('relative url', () => {
    it('base path', () => {
      const url = '/';
      expect(toRelativeUrl(url)).toBe('/');
    });

    it('with path', () => {
      const url = '/api/variants/smooth/';
      expect(toRelativeUrl(url)).toBe('/api/variants/smooth/');
    });

    it('with query string', () => {
      const url = '/docs/legal/terms-of-service?lang=en';
      expect(toRelativeUrl(url)).toBe('/docs/legal/terms-of-service?lang=en');
    });

    it('with fragment', () => {
      const url = '/about/#contact-me';
      expect(toRelativeUrl(url)).toBe('/about/#contact-me');
    });

    it('with everything', () => {
      const url = '/docs/legal/terms-of-service/?lang=en#values';
      expect(toRelativeUrl(url)).toBe('/docs/legal/terms-of-service/?lang=en#values');
    });
  });
});
