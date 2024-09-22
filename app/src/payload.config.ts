// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor, HTMLConverterFeature, EXPERIMENTAL_TableFeature } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs';
import { redirectsPlugin } from '@payloadcms/plugin-redirects';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
import { getEnv } from '@/utils/env';
import cron from 'node-cron';
import { pruneViewsCache } from '@/payload/utils/viewCounter';

import { Users } from '@payload/collections/Users';
import { Media } from '@payload/collections/Media';
import { Files } from '@payload/collections/Files';
import { Posts } from '@payload/collections/Posts';
import { Category } from '@/payload/collections/Category';
import { Comments } from '@/payload/collections/Comments';
import { revalidateRedirects } from '@payload/hooks/revalidateRedirects';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Files, Posts, Category, Comments],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => {
      return [
        ...defaultFeatures,
        EXPERIMENTAL_TableFeature(),
        HTMLConverterFeature({
          converters: ({ defaultConverters }) => [...defaultConverters],
        }),
      ];
    },
  }),
  email: nodemailerAdapter({
    defaultFromAddress: getEnv('PAYLOAD_FROM_EMAIL_ADDRESS'),
    defaultFromName: 'Payload',
    transportOptions: {
      host: getEnv('SMTP_HOST'),
      port: getEnv('SMTP_PORT'),
      auth: {
        user: getEnv('SMTP_USER'),
        pass: getEnv('SMTP_PASS'),
      },
    },
  }),
  secret: getEnv('PAYLOAD_SECRET'),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    migrationDir: './src/payload/migrations',
    pool: {
      connectionString: getEnv('DATABASE_URI'),
    },
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
    seoPlugin({}),
    nestedDocsPlugin({
      collections: [Category.slug],
      generateLabel: (_, doc) => doc.title as string,
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
    nestedDocsPlugin({
      collections: [Comments.slug],
      generateLabel: (_, doc) => doc.displayName as string,
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.id}`, ''),
    }),
    redirectsPlugin({
      collections: [Posts.slug, Category.slug],
      overrides: {
        hooks: {
          afterChange: [revalidateRedirects],
        },
      },
    }),
  ],
  async onInit(payload) {
    cron.schedule('0 * * * *', async () => {
      payload.logger.info('Running cron job to prune views cache...');
      try {
        await pruneViewsCache();
        payload.logger.info('Views cache pruning completed successfully.');
      } catch (error) {
        payload.logger.error('Error during views cache pruning:', error);
      }
    });
  },
});
