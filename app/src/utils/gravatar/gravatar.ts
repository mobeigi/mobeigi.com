import crypto from 'crypto';
import { GravatarProfile } from './types';

const getGravatarProfileUrl = (email: string): string => {
  const hash = crypto.createHash('sha256').update(email.trim().toLowerCase()).digest('hex');
  return `https://api.gravatar.com/v3/profiles/${hash}`;
};

export const fetchGravatarProfile = async (email: string): Promise<GravatarProfile | null> => {
  const gravatarUrl = getGravatarProfileUrl(email);

  try {
    const response = await fetch(gravatarUrl);

    if (!response.ok) {
      console.warn(`Gravatar request failed with status: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Gravatar profile:', error);
    return null;
  }
};
