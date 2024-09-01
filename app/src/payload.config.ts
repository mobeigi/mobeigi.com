// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres';
import {
  lexicalEditor,
  HTMLConverterFeature,
  EXPERIMENTAL_TableFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs';
import UploadHTMLConverter from '@payload/converter/UploadHTMLConverter';
import CodeBlockHTMLConverter from '@payload/converter/CodeHTMLCoverter';

import { Users } from '@payload/collections/Users';
import { Media } from '@payload/collections/Media';
import { Posts } from '@payload/collections/Posts';
import Categories from '@payload/collections/Categories';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts, Categories],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => {
      return [
        ...defaultFeatures,
        EXPERIMENTAL_TableFeature(),
        HTMLConverterFeature({
          converters: ({ defaultConverters }) => [...defaultConverters, UploadHTMLConverter, CodeBlockHTMLConverter],
        }),
      ];
    },
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
    seoPlugin({
      generateTitle: (doc) => doc.title as string,
    }),
    nestedDocsPlugin({
      collections: ['categories'],
      generateLabel: (_, doc) => doc.title as string,
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
  ],
});
