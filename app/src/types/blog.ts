export type Breadcrumb = {
  title: string;
  slug: string;
  url: string;
};

export type BlogPostMeta = {
  title: string;
  publishedAt: Date;
  excerpt: string;
  slug: string;
  breadcrumbs: Breadcrumb[];
};

export type BlogPostContent = {
  htmlContent: any; // TODO: Type properly
};

export type BlogPostData = {
  meta: BlogPostMeta;
  content: BlogPostContent;
};
