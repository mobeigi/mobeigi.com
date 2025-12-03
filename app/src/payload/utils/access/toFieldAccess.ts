import { FieldAccess } from 'payload';
import { AccessFunction } from '../../access/types';

/**
 * Converts a collection-level access function to a field-level access function.
 * This is useful when you want to reuse the same access logic for both collection
 * and field-level access controls.
 *
 * @param accessFn - The collection access function to convert
 * @returns A field access function with the same logic
 */
export const toFieldAccess = (accessFn: AccessFunction): FieldAccess => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
  return (args) => accessFn(args as any);
};
