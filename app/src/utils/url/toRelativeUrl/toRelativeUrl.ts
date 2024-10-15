export const toRelativeUrl = (urlString: string): string => {
  // Check if the URL is already relative
  if (urlString.startsWith('/')) {
    return urlString;
  }

  const url = new URL(urlString);
  return url.pathname + url.search + url.hash;
};
