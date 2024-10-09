import { BASE_URL } from '@/constants/app';
import { joinUrl } from '@/utils/url';
import type { MetadataRoute } from 'next';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@payload-config';
import { resolveCategoryUrl } from '@/payload/collections/Category/resolveUrl';
import { resolvePostsUrl } from '@/payload/collections/Posts/resolveUrl';

export const revalidate = 3600;

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const payload = await getPayloadHMR({
    config,
  });

  const payloadPosts = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    depth: 1,
    limit: 0,
    pagination: false,
  });

  const blogPostSitemapEntries: MetadataRoute.Sitemap = payloadPosts.docs
    .map((post) => {
      const postUrl = resolvePostsUrl(post);
      if (!postUrl) {
        console.warn(`sitemap: postUrl for post ${post.id} should not be null.`);
        return null;
      }
      const singleSiteMapEntry: MetadataRoute.Sitemap = [
        {
          url: joinUrl([BASE_URL, postUrl]),
          lastModified: new Date(post.updatedAt),
          changeFrequency: 'weekly',
          priority: 0.7,
        },
      ];

      return singleSiteMapEntry;
    })
    .filter((obj) => obj !== null)
    .flat();

  const payloadCategories = await payload.find({
    collection: 'category',
    depth: 1,
    limit: 0,
    pagination: false,
  });

  const categorySitemapEntries: MetadataRoute.Sitemap = payloadCategories.docs
    .map((category) => {
      const categoryUrl = resolveCategoryUrl(category);
      if (!categoryUrl) {
        console.warn(`sitemap: categoryUrl for post ${category.id} should not be null.`);
        return null;
      }
      const singleSiteMapEntry: MetadataRoute.Sitemap = [
        {
          url: joinUrl([BASE_URL, categoryUrl]),
          lastModified: new Date(category.updatedAt),
          changeFrequency: 'monthly',
          priority: 0.5,
        },
      ];
      return singleSiteMapEntry;
    })
    .filter((obj) => obj !== null)
    .flat();

  return [
    /**
     * Static pages (main)
     */
    {
      url: BASE_URL,
      lastModified: new Date('2024-09-26T04:30:00+0000'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: joinUrl([BASE_URL, 'blog']),
      lastModified: new Date('2024-09-26T04:30:00+0000'),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: joinUrl([BASE_URL, 'projects']),
      lastModified: new Date('2024-09-26T04:30:00+0000'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: joinUrl([BASE_URL, 'contact']),
      lastModified: new Date('2024-09-26T04:30:00+0000'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: joinUrl([BASE_URL, 'about']),
      lastModified: new Date('2024-09-26T04:30:00+0000'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    /**
     * Static pages (other)
     */
    {
      url: joinUrl([BASE_URL, 'blog', 'category']),
      lastModified: new Date('2024-09-26T04:30:00+0000'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: joinUrl([BASE_URL, 'easter-eggs']),
      lastModified: new Date('2024-09-26T04:30:00+0000'),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: joinUrl([BASE_URL, 'resume']),
      lastModified: new Date('2024-09-26T04:30:00+0000'),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: joinUrl([BASE_URL, '.well-known']) + 'security.txt',
      lastModified: new Date('2024-09-26T04:30:00+0000'),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: joinUrl([BASE_URL, 'privacy-policy']),
      lastModified: new Date('2024-09-26T04:30:00+0000'),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    /**
     * Dynamic pages (blog post)
     */
    ...blogPostSitemapEntries,
    /**
     * Dynamic pages (category)
     */
    ...categorySitemapEntries,
  ];
};

export default sitemap;
