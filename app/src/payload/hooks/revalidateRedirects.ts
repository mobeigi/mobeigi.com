import type { CollectionAfterChangeHook } from 'payload';
import { revalidateTag } from 'next/cache';

export const revalidateRedirects: CollectionAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating redirects`);
  revalidateTag('redirects');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return doc;
};
