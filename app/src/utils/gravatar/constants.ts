/**
 * 2.gravatar.com host is significantly faster than the gravatar.com host.
 * Current theory is due to lower load on that host (perhaps as its dedicated to handle the profile API which enforces rate limits).
 */
export const GRAVATAR_BASE_URL = 'https://2.gravatar.com';
