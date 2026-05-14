import type { NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload';
import svgrConfig from './svgr.config.mjs';
import { execSync } from 'child_process';

const commitHash = execSync('git rev-parse --short HEAD', {
  encoding: 'utf8',
  windowsHide: true,
}).trim();

const nextConfig: NextConfig = {
  // cacheComponents: true, // TODO: Explore migrating to this over experimental.useCache
  cacheLife: {
    alwaysCheck15m: {
      stale: 0,
      revalidate: 900, // 15m
      expire: 86400, // 1d
    },
    alwaysCheckHourly: {
      stale: 0,
      revalidate: 3600, // 1h
      expire: 86400, // 1d
    },
    alwaysCheckDaily: {
      stale: 0,
      revalidate: 86400, // 1d
      expire: 172800, // 2d
    },
    cacheUntilInvalidated: {
      stale: 0,
      revalidate: undefined, // forever
      expire: undefined, // forever
    },
    expireImmediately: {
      expire: 0,
    },
  },
  compiler: {
    styledComponents: true,
  },
  env: {
    COMMIT_HASH: commitHash,
    NEXT_TELEMETRY_DISABLED: '1',
  },
  experimental: {
    useCache: true,
    serverActions: {
      bodySizeLimit: '3mb' /* Support larger sized chunked updates in Payload */,
    },
  },
  images: {
    contentDispositionType: 'inline',
    qualities: [75, 100],
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
  turbopack: {
    rules: {
      '*.svg': [
        // Import SVGs with `?url` as file assets, returning a URL string.
        {
          condition: { query: /url/ },
          type: 'asset',
        },
        // Import all other SVGs as React components via SVGR.
        {
          condition: { not: { query: /url/ } },
          loaders: [
            {
              loader: '@svgr/webpack',
              options: svgrConfig,
            },
          ],
          as: '*.js',
        },
      ],
    },
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
