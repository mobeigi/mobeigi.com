import { BlogPostContent } from '@/types/blog';
import { ReactNode } from 'react';

export interface SidebarProps {
  body: ReactNode;
  customFields?: BlogPostContent['customFields'];
}
