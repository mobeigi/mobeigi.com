import { SerializedEditorState } from 'lexical';

export type Category = {
  title: string;
  description: string;
  url: string;
};

export type BlogPostPostMeta = {
  id: number;
  title: string;
  publishedAt: Date;
  excerpt: string;
  slug: string;
  url: string;
  views: number;
  category: Category;
  commentsEnabled: boolean;
};

/* Meta that is related to the post but not part of post data itself */
export type BlogPostRelatedMeta = {
  commentCount: number;
};

export type BlogPostMeta = {
  post: BlogPostPostMeta;
  related: BlogPostRelatedMeta;
};

export type BlogPostContent = {
  body: SerializedEditorState;
};

export type Comment = {
  id: number;
  displayName: string;
  displayPictureUrl?: string;
  emailHash: string;
  verified: boolean;
  createdAt: Date;
  content: SerializedEditorState;
  children: Comment[];
};

export type BlogPostData = {
  meta: BlogPostMeta;
  content: BlogPostContent;
  comments: Comment[];
};
