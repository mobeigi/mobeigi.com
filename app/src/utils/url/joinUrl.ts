/**
 * Join url from url components removing duplicate slashes between components.
 */
export const joinUrl = (urlComponents: string[], finalSlash: boolean = true): string =>
  urlComponents.map((component) => component.replace(/^\/|\/$/g, '')).join('/') + (finalSlash ? '/' : '');
