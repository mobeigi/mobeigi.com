export interface BlogPostProps {
  title: string;
  htmlContent: any; // TODO: Type properly
  publishedAt: Date;
  breadcrumbs: Breadcrumbs[];
}

export type Breadcrumbs = {
  title: string;
  slug: string;
  url: string;
};
