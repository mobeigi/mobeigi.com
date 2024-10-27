import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { CollectionSlug, DataFromCollectionSlug } from 'payload';
import { unstable_cache_safe } from '@/utils/next/unstable_cache_safe';

export const getDocumentById = async (
  relationTo: CollectionSlug,
  docId: number,
): Promise<DataFromCollectionSlug<CollectionSlug> | null> => {
  const payload = await getPayloadHMR({
    config,
  });
  return await payload.findByID({
    collection: relationTo,
    id: docId,
    depth: 1,
  });
};

export const getCachedDocumentById = (relationTo: CollectionSlug, docId: number) =>
  unstable_cache_safe(
    async () => getDocumentById(relationTo, docId),
    [`payload-get-document-by-id-${relationTo}-${docId}`],
    {
      tags: ['payload', `payload:collection:${relationTo}`, `payload:collection:${relationTo}:${docId}`],
    },
  )();
