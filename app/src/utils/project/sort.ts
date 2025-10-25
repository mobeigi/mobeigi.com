import { Project } from '@/types/projects';

export const sortProjectByTitle = (a: Project, b: Project) => a.title.localeCompare(b.title);
