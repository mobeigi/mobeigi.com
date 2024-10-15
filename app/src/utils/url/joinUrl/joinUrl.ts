/**
 * Join URL from URL components.
 *
 * Supports both absolute and relative urls.
 * Relative URLs will being with a slash.
 * Each url component should be significant as all leading and trailing slashes are stripped.
 * Empty url components are ignored.
 */
export const joinUrl = (urlComponents: string[], finalSlash: boolean = true): string => {
  if (urlComponents.length === 0) {
    return finalSlash ? '/' : '';
  }

  const joinedUrl = urlComponents
    .map((component) => component.replace(/^\/+|\/+$/g, ''))
    .filter(Boolean)
    .join('/');

  const isAbsolute = /^https?:\/\//.test(joinedUrl);

  return (!isAbsolute ? '/' : '') + joinedUrl + (finalSlash ? '/' : '');
};
