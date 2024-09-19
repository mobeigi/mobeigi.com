import crypto from 'crypto';
import { GetGravatarAvatarUrlProps } from './types';

export const getGravatarAvatarUrl = async ({
  email,
  size = 80,
  rating = 'pg',
}: GetGravatarAvatarUrlProps): Promise<string | null> => {
  const sha256EmailHash = crypto.createHash('sha256').update(email.toLowerCase()).digest('hex');
  const queryParams: Record<string, string> = {
    d: '404',
    s: size.toString(),
    r: rating,
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `https://gravatar.com/avatar/${sha256EmailHash}?${queryString}`;
  try {
    // Make a HEAD request to avoid downloading image data
    const response = await fetch(url, { method: 'HEAD' });
    if (response.ok) {
      return url;
    }
    return null;
  } catch (error) {
    console.error('Error fetching Gravatar avatar:', error);
    return null;
  }
};
