import { withPayload } from '@payloadcms/next/withPayload';
import svgrConfig from './svgr.config.mjs';
import { execSync } from 'child_process';

const commitHash = execSync('git log --pretty=format:"%h" -n1').toString().trim();

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
    COMMIT_HASH: commitHash,
  },
  eslint: {
    // Process all files & folders
    dirs: ['.'],
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
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
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
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
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

export default withPayload(nextConfig);
