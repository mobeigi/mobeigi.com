import type { NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload';
import svgrConfig from './svgr.config.mjs';
import { execSync } from 'child_process';
import type { Configuration, RuleSetRule } from 'webpack';

const commitHash = execSync('git log --pretty=format:"%h" -n1').toString().trim();

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  env: {
    COMMIT_HASH: commitHash,
    NEXT_TELEMETRY_DISABLED: '1',
  },
  eslint: {
    // Process all files & folders
    dirs: ['.'],
  },
  experimental: {
    useCache: true,
    cacheLife: {
      alwaysCheck15m: {
        stale: 0,
        revalidate: 900, // 15m
        expire: 86400, // 1d
      },
      cacheUntilInvalidated: {
        stale: 0,
        revalidate: undefined, // forever
        expire: undefined, // forever
      },
    },
  },
  images: {
    contentDispositionType: 'inline',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.mobeigi.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '2.gravatar.com',
        port: '',
        pathname: '/avatar/**',
      },
    ],
  },
  output: 'standalone',
  trailingSlash: true,
  webpack(config: Configuration) {
    // TODO: Find a better way to type the SVGR next config below.
    // https://react-svgr.com/docs/next/

    // Grab the existing rule that handles SVG imports
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const fileLoaderRule = config.module?.rules?.find((rule: any) => rule.test?.test?.('.svg')) as RuleSetRule;

    config.module?.rules?.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          not: [
            // @ts-expect-error not cannot type resourceQuery properly
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            ...(fileLoaderRule.resourceQuery?.not || []),
            /url/,
          ],
        }, // exclude if *.svg?url
        use: [
          {
            loader: '@svgr/webpack',
            options: svgrConfig,
          },
        ],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
