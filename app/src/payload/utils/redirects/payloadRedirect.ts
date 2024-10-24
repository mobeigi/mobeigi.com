import { BASE_URL } from '@/constants/app';
import { getCachedRedirects } from './getRedirects';
import { joinUrl } from '@/utils/url';
import { Redirect } from '@/payload-types';
import { permanentRedirect as nextPermanentRedirect } from 'next/navigation';
import { customUrlResolvers } from '@payload/converter/customUrlResolvers';
import { getCachedDocumentById } from '@payload/utils/docs';

export interface PayloadRedirectProps {
  currentUrl: string;
}

const getAbsoluteUrl = (url: string): string => {
  if (url.startsWith('/')) {
    return joinUrl([BASE_URL, url]);
  }
  return url;
};

/**
 * This fuction will redirect the route to the intended redirect target if a redirect exists for the current url.
 * If no redirect exists, it will do nothing (noop).
 * Use this function at the start of route loads to enforce redirects.
 */
export const payloadRedirect = async ({ currentUrl }: PayloadRedirectProps): Promise<void> => {
  const redirects: Redirect[] = await getCachedRedirects();
  const absoluteUrl = getAbsoluteUrl(currentUrl);

  const matchingRedirects = redirects.filter((redirect) => {
    const absoluteFromUrl = getAbsoluteUrl(redirect.from);
    return absoluteFromUrl === absoluteUrl;
  });

  if (matchingRedirects.length === 0) {
    // No redirect for this url so this is a noop
    return;
  }

  if (matchingRedirects.length !== 1) {
    console.error(
      `Muliple matching redirects found for url '${absoluteUrl}'. Ignoring redirect. Please ensure each redirects 'from' field is unique.`,
    );
    return;
  }

  const redirect = matchingRedirects[0];

  if (redirect?.to?.type === 'custom') {
    // Custom url
    if (!redirect.to.url) {
      console.error(`Redirect for url '${absoluteUrl}' has missing url.`);
      return;
    }
    nextPermanentRedirect(redirect.to.url);
  } else if (redirect?.to?.type === 'reference') {
    // Internal url
    if (!redirect.to.reference?.relationTo) {
      console.error(`Redirect for url '${absoluteUrl}' has missing relationTo.`);
      return;
    }

    // TODO: Need a nicer way to do the below, maybe via a util or existing payload helper functions.
    const docId =
      typeof redirect.to.reference.value === 'number'
        ? redirect.to.reference.value
        : typeof redirect.to.reference.value === 'object' && 'id' in redirect.to.reference.value
          ? (redirect.to.reference.value as { id: number }).id
          : null;

    if (!docId) {
      console.error(`Redirect for url '${absoluteUrl}' has an invalid doc id reference.`);
      return;
    }

    const doc = await getCachedDocumentById(redirect.to.reference.relationTo, docId);

    if (!doc) {
      console.error(`Redirect for url '${absoluteUrl}' has no associated doc.`);
      return;
    }

    if (!(redirect.to.reference.relationTo in customUrlResolvers)) {
      console.error(`Redirect for url '${absoluteUrl}' has no custom resolveUrl function.`);
      return;
    }
    const resolveUrlFn = customUrlResolvers[redirect.to.reference.relationTo];

    let targetDocUrl: string | null = null;
    try {
      targetDocUrl = await resolveUrlFn(doc);
    } catch (e) {
      const error = e as Error;
      console.error(`Redirect for url '${absoluteUrl}' encountered error during resolveUrl. ${error.message}`);
      return;
    }
    if (!targetDocUrl) {
      return;
    }

    const absoluteTargetDocUrl = getAbsoluteUrl(targetDocUrl);
    nextPermanentRedirect(absoluteTargetDocUrl);
  } else {
    console.error(`Redirect for url '${absoluteUrl}' has invalid 'to' field.`);
  }
};
