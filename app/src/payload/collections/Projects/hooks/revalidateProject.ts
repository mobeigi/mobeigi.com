import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, PayloadRequest } from 'payload';
import { revalidatePath } from 'next/cache';
import type { Project } from '@/payload-types';

export const revalidateProject = (req: PayloadRequest) => {
  req.payload.logger.info('Revalidating: Projects');
  revalidatePath('/projects/');
};

export const revalidateProjectAfterChange: CollectionAfterChangeHook<Project> = ({ req }) => {
  revalidateProject(req);
};

export const revalidateProjectAfterDelete: CollectionAfterDeleteHook<Project> = ({ req }) => {
  revalidateProject(req);
};
