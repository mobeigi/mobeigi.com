export type Project = {
  title: string;
  description: string;
  image: {
    url: string;
    alt: string;
  };
  url?: string;
  urlActive?: boolean;
  blogPostUrl?: string;
  githubUrl?: string;
};
