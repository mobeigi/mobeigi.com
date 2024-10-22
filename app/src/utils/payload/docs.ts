import { CollectionSlug, DataFromCollectionSlug, PayloadRequest } from 'payload';

export const getDocByIdOrObject = async <T extends CollectionSlug>(
  req: PayloadRequest,
  collection: T,
  doc: number | DataFromCollectionSlug<T> | null | undefined,
): Promise<DataFromCollectionSlug<T> | null> => {
  if (!doc) return null;

  if (typeof doc === 'number') {
    return await req.payload.findByID({
      collection,
      id: doc,
      req, // Pass-through request
    });
  }

  return doc;
};
