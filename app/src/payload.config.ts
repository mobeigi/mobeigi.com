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
import cron from 'node-cron';
import { pruneViewsCache } from '@/payload/utils/viewCounter';

import { Users } from '@payload/collections/Users';
import { Media } from '@payload/collections/Media';
import { Files } from '@payload/collections/Files';
import { PrivateFiles } from '@payload/collections/PrivateFiles';
import { Posts } from '@payload/collections/Posts';
import { Category } from '@/payload/collections/Category';
import { Comments } from '@/payload/collections/Comments';
import { Resume } from '@/payload/globals/Resume';

import { revalidateRedirects } from '@payload/hooks/revalidateRedirects';
import { requireEnvVar } from './utils/env';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Files, PrivateFiles, Posts, Category, Comments],
  db: postgresAdapter({
    migrationDir: './src/payload/migrations',
    pool: {
      connectionString: requireEnvVar(process.env.DATABASE_URI, 'DATABASE_URI'),
    },
  }),
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
    defaultFromAddress: requireEnvVar(process.env.PAYLOAD_FROM_EMAIL_ADDRESS, 'PAYLOAD_FROM_EMAIL_ADDRESS'),
    defaultFromName: 'Payload',
    transportOptions: {
      host: requireEnvVar(process.env.SMTP_HOST, 'SMTP_HOST'),
      port: requireEnvVar(process.env.SMTP_PORT, 'SMTP_PORT'),
      auth: {
        user: requireEnvVar(process.env.SMTP_USER, 'SMTP_USER'),
        pass: requireEnvVar(process.env.SMTP_PASS, 'SMTP_PASS'),
      },
    },
  }),
  globals: [Resume],
  secret: requireEnvVar(process.env.PAYLOAD_SECRET, 'PAYLOAD_SECRET'),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  plugins: [
    // storage-adapter-placeholder
    seoPlugin({}),
    nestedDocsPlugin({
      collections: [Category.slug],
      generateLabel: (_, doc) => doc.title as string,
      // TODO: Can this type be improved?
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
    nestedDocsPlugin({
      collections: [Comments.slug],
      generateLabel: (_, doc) => doc.displayName as string,
      // TODO: Can this type be improved?
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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
  onInit(payload) {
    cron.schedule('0 * * * *', () => {
      payload.logger.info('Running cron job to prune views cache...');
      void (async () => {
        try {
          await pruneViewsCache();
          payload.logger.info('Views cache pruning completed successfully.');
        } catch (error) {
          payload.logger.error('Error during views cache pruning:', error);
        }
      })();
    });
  },
});
