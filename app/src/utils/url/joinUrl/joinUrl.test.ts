import { joinUrl } from './joinUrl';

const assertUrl = (urlComponents: string[], expectedUrl: string) => {
  const urlNoFinalSlash = joinUrl(urlComponents, false);
  expect(urlNoFinalSlash).toEqual(expectedUrl);
  const urlWithFinalSlash = joinUrl(urlComponents, true);
  expect(urlWithFinalSlash).toEqual(expectedUrl + '/');
};

describe('joinUrl', () => {
  it('empty array', () => {
    const urlComponents: string[] = [];
    assertUrl(urlComponents, '');
  });

  it('single domain', () => {
    const urlComponents = ['https://example.com'];
    assertUrl(urlComponents, 'https://example.com');
  });

  it('absolute path', () => {
    const urlComponents = ['https://example.com', 'docs', 'v/2', 'optimization', 'frogs'];
    assertUrl(urlComponents, 'https://example.com/docs/v/2/optimization/frogs');
  });

  it('relative path', () => {
    const urlComponentsWithLeadingSlash = ['/blog', '/news', '/my-news-article'];
    assertUrl(urlComponentsWithLeadingSlash, '/blog/news/my-news-article');

    const urlComponentsWithoutLeadingSlash = ['blog', '/news', '/my-news-article'];
    assertUrl(urlComponentsWithoutLeadingSlash, '/blog/news/my-news-article');
  });

  it('leading slash', () => {
    const urlComponents = ['/leading'];
    assertUrl(urlComponents, '/leading');
  });

  it('multiple slashes', () => {
    const urlComponents = ['https://example.com/', '///test/////', '/', '///another///'];
    assertUrl(urlComponents, 'https://example.com/test/another');
  });
});
