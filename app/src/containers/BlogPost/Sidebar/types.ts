import { ReactNode } from 'react';
import { BlogPostContent } from '@/types/blog';

export interface SidebarProps {
  customFields?: BlogPostContent['customFields'];
}
