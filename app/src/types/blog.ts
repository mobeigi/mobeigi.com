import { SerializedEditorState } from 'lexical';

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
  id: number;
  title: string;
  publishedAt: Date;
  excerpt: string;
  slug: string;
  url: string;
  category: Category;
  breadcrumbs: Breadcrumb[];
};

export type BlogPostContent = {
  body: SerializedEditorState;
  customFields?: Array<{ key: string; value: SerializedEditorState }>;
};

export type Comment = {
  id: number;
  displayName: string;
  displayPictureUrl?: string;
  emailHash: string;
  createdAt: Date;
  content: SerializedEditorState;
  children: Comment[];
};

export type BlogPostData = {
  meta: BlogPostMeta;
  content: BlogPostContent;
  comments: Comment[];
};
