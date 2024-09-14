import { Post, Category } from '@/payload-types';
import { Metadata } from 'next';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@payload-config';
import BlogPost from '@/containers/BlogPost';
import { notFound } from 'next/navigation';
import { BlogPostProps } from '@/containers/BlogPost';
import { BlogPostContent } from '@/types/blog';
import { serializeLexical } from '@/payload/lexical/serializeLexical';
import { mapBlogPostToMeta, mapComments } from '@/utils/payload';

const depth = 2;

export const getPostFromParams = async ({ params }: { params: { slug: string[] } }): Promise<Post | null> => {
  const payload = await getPayloadHMR({
    config,
  });

  const postSlug = params.slug[params.slug.length - 1];
  const categorySlugs = params.slug.slice(0, -1);

  if (categorySlugs.length === 0) {
    return null;
  }

  const paramsCategorySlugUrl = buildCategorySlugUrl(categorySlugs);

  const posts = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: postSlug },
    },
    depth,
  });

  if (!posts.docs.length) {
    return null;
  }

  // Ensure category slug urls match
  // We want to only show the blog post if the slug is correct
  const postsMatchingCategorySlugUrl = posts.docs.filter((post) => {
    if (!post.category) return false;
    const category = post.category as Category;
    const categorySlugUrl = getCategorySlugUrl(category);
    return categorySlugUrl === paramsCategorySlugUrl;
  });

  if (postsMatchingCategorySlugUrl.length !== 1) {
    return null;
  }

  return postsMatchingCategorySlugUrl[0];
};

const buildCategorySlugUrl = (categorySlugs: string[]): string => {
  return '/' + categorySlugs.join('/');
};

const getCategorySlugUrl = (category: Category): string | null => {
  if (!category) return null;

  const breadcrumbs = category.breadcrumbs;
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
  if (lastBreadcrumb.url === null || lastBreadcrumb.url === undefined) {
    return null;
  }
  return lastBreadcrumb.url;
};

export const generateMetadata = async ({ params }: { params: { slug: string[] } }): Promise<Metadata> => {
  const post = await getPostFromParams({ params });
  if (!post) {
    console.warn('Failed to find post during generateMetadata.');
    return {};
  }

  const seoData = post.meta;
  const fallbackTitle = post.title;
  const fallbackDescription = post.excerpt;

  return {
    title: seoData?.title || fallbackTitle,
    description: seoData?.description || fallbackDescription,
  };
};

const BlogPostHandler = async ({ params }: { params: { slug: string[] } }) => {
  const post = await getPostFromParams({ params });
  if (!post) {
    notFound();
    return null;
  }
  const blogPostProps = await transformPostToBlogPostProps(post);
  if (!blogPostProps) {
    notFound();
    return null;
  }

  return <BlogPost {...blogPostProps} />;
};

/**
 * Transforms a Post to a BlogPostProps object
 */
const transformPostToBlogPostProps = async (post: Post): Promise<BlogPostProps | null> => {
  const meta = mapBlogPostToMeta(post);
  if (!meta) {
    console.warn('BlogPostMeta cannot be null.');
    return null;
  }

  const contentBody = await serializeLexical(post.content);
  const customFields = post.customFields
    ? await Promise.all(
        post.customFields.map(async (customField) => ({
          key: customField.key,
          value: await serializeLexical(customField.value),
        })),
      )
    : undefined;

  const content: BlogPostContent = {
    body: contentBody,
    customFields: customFields,
  };

  const payload = await getPayloadHMR({
    config,
  });

  const comments = await payload.find({
    collection: 'comments',
    where: {
      post: { equals: post.id },
    },
    depth,
    limit: 0,
  });

  const mappedComments = await mapComments(comments.docs);

  const blogPostProps: BlogPostProps = {
    meta,
    content,
    comments: mappedComments,
  };

  return blogPostProps;
};

// TODO: Not needed for SSR? Can likely remove.
// export const generateStaticParams = async () => {
//   const payload = await getPayloadHMR({
//     config,
//   });
//   const posts = await payload.find({ collection: 'posts', depth });
//   const paths = posts.docs
//     .map((post: Post) => {
//       if (!post.category) {
//         return null;
//       }
//       const category = post.category as Category;
//       const categorySlugUrl = getCategorySlugUrl(category);
//       if (!categorySlugUrl) {
//         return null;
//       }
//       const categorySlugUrlArray = categorySlugUrl.split('/');

//       return {
//         slug: [...categorySlugUrlArray, post.slug!],
//       };
//     })
//     .filter((path) => path !== null);

//   return paths;
// };

export default BlogPostHandler;
