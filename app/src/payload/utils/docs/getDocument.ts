import config from '@payload-config';
import { getPayload } from 'payload';
import { CollectionSlug, DataFromCollectionSlug } from 'payload';
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from 'next/cache';

export const getDocumentById = async (
  relationTo: CollectionSlug,
  docId: number,
): Promise<DataFromCollectionSlug<CollectionSlug> | null> => {
  const payload = await getPayload({
    config,
  });
  return await payload.findByID({
    collection: relationTo,
    id: docId,
    depth: 1,
  });
};

export const getCachedDocumentById = async (relationTo: CollectionSlug, docId: number) => {
  'use cache';
  cacheLife('cacheUntilInvalidated');
  cacheTag('payload');
  cacheTag(`payload:collection:${relationTo}`);
  cacheTag(`payload:collection:${relationTo}:${docId}`);

  return getDocumentById(relationTo, docId);
};
