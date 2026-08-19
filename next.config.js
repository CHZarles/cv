/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true';
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isUserSite = repositoryName?.endsWith('.github.io');
const basePath = isGithubPages && repositoryName && !isUserSite ? `/${repositoryName}` : '';

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  trailingSlash: true,

  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Optimize images
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  // Compress output
  compress: true,

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      },
      {
        source: '/(.*).svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/(.*).png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  },


  // Reduce bundle size by excluding source maps in production
  productionBrowserSourceMaps: false,

  // PoweredByHeader removes the X-Powered-By header
  poweredByHeader: false,
}

module.exports = nextConfig
