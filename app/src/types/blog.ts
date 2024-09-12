import { ReactNode } from 'react';

export type Breadcrumb = {
  title: string;
  slug: string;
  url: string;
};

export type Category = {
  title: string;
  description: string;
  url: string;
};

export type BlogPostMeta = {
  title: string;
  publishedAt: Date;
  excerpt: string;
  slug: string;
  url: string;
  category: Category;
  breadcrumbs: Breadcrumb[];
};

export type BlogPostContent = {
  body: ReactNode;
  customFields?: Array<{ key: string; value: ReactNode }>;
};

export type BlogPostData = {
  meta: BlogPostMeta;
  content: BlogPostContent;
};
