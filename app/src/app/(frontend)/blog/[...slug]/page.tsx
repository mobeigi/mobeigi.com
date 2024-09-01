import { Post, Category } from '@/payload-types';
import { Metadata } from 'next';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@payload-config';
import {
  type SanitizedServerEditorConfig,
  convertLexicalToHTML,
  consolidateHTMLConverters,
  LexicalRichTextAdapter,
} from '@payloadcms/richtext-lexical';
import type { SerializedEditorState } from 'lexical';
import BlogPost from '@/containers/BlogPost';
import { notFound } from 'next/navigation';

const depth = 2;

export const generateMetadata = async ({ params }: { params: { slug: string[] } }): Promise<Metadata> => {
  const payload = await getPayloadHMR({
    config,
  });
  const postSlug = params.slug[params.slug.length - 1];
  const post = await payload.find({
    collection: 'posts',
    where: { slug: { equals: postSlug } },
    depth,
  });

  if (!post.docs.length) {
    console.warn('Failed to find post during generateMetadata.');
    return {};
  }

  const seoData = post.docs[0].meta;
  const fallbackTitle = post.docs[0].title;
  const fallbackDescription = null;

  return {
    title: seoData?.title || fallbackTitle,
    description: seoData?.description || fallbackDescription,
  };
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

export const generateStaticParams = async () => {
  const payload = await getPayloadHMR({
    config,
  });
  const posts = await payload.find({ collection: 'posts', depth: 2 });
  const paths = posts.docs
    .map((post: Post) => {
      if (post.categories === null || post.categories === undefined) {
        return null;
      }
      if (post.categories.length === 0) {
        return null;
      }
      const baseCategory = post.categories[0] as Category;
      const categorySlugUrl = getCategorySlugUrl(baseCategory);
      if (!categorySlugUrl) {
        return null;
      }
      const categorySlugUrlArray = categorySlugUrl.split('/');

      return {
        slug: [...categorySlugUrlArray, post.slug!],
      };
    })
    .filter((path) => path !== null);

  return paths;
};

const BlogPostPage = async ({ params }: { params: { slug: string[] } }) => {
  const payload = await getPayloadHMR({
    config,
  });

  const postSlug = params.slug[params.slug.length - 1];
  const categorySlugs = params.slug.slice(0, -1);

  if (categorySlugs.length === 0) {
    notFound();
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
    notFound();
    return null;
  }

  // Ensure category slug urls match
  // We want to only show the blog post if the slug is correct
  const postsMatchingCategorySlugUrl = posts.docs.filter((post) => {
    if (!post.categories || post.categories.length === 0) return false;
    const baseCategory = post.categories[0] as Category;
    const categorySlugUrl = getCategorySlugUrl(baseCategory);
    return categorySlugUrl === paramsCategorySlugUrl;
  });

  if (postsMatchingCategorySlugUrl.length !== 1) {
    notFound();
    return null;
  }

  const post = postsMatchingCategorySlugUrl[0];

  // Convert Lexical JSON to HTML
  const editor = payload?.config?.editor as LexicalRichTextAdapter;
  const htmlContent = await lexicalToHTML(post.content, editor.editorConfig);

  // Render our React components
  return <BlogPost title={post.title} htmlContent={htmlContent} />;
};

const lexicalToHTML = async (editorData: SerializedEditorState, editorConfig: SanitizedServerEditorConfig) => {
  return await convertLexicalToHTML({
    converters: consolidateHTMLConverters({ editorConfig }),
    data: editorData,
  });
};

export default BlogPostPage;
