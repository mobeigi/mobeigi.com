import Link from 'next/link';
import { BlogPageProps, BlogPostSummary } from './types';
import { pages } from '@/constants/links';

const BASE_BLOG_URL = pages.find((entry) => entry.name === 'Blog')!.href;

const getBlogPostRelativeUrl = (blogPostSummary: BlogPostSummary) => {
  return (
    BASE_BLOG_URL +
    [...blogPostSummary.breadcrumbs.map((breadcrumb) => breadcrumb.slug), blogPostSummary.slug].join('/')
  );
};

export const BlogPage = ({ blogPostSummaries }: BlogPageProps) => {
  return (
    <div>
      <h1>Blog</h1>
      <p>Explore my thoughts and insights through the blog posts below.</p>
      {blogPostSummaries.map((blogPostSummary) => {
        const url = getBlogPostRelativeUrl(blogPostSummary);
        return (
          <div key={blogPostSummary.slug}>
            <div>{blogPostSummary.title}</div>
            <div>{blogPostSummary.excerpt}</div>
            <div>{blogPostSummary.publishedAt.toDateString()}</div>
            <div>{blogPostSummary.slug}</div>
            <div>{blogPostSummary.breadcrumbs[blogPostSummary.breadcrumbs.length - 1].url}</div>
            <div>
              <Link href={url}>Link</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};
