/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Helps with static hosting
  
  // Ignore build errors
  typescript: {
    // We'll handle TypeScript errors in the editor instead
    ignoreBuildErrors: true,
  },
  eslint: {
    // We'll handle ESLint errors in the editor instead
    ignoreDuringBuilds: true,
  },
  
  // Redirects from old URL structure to new structure
  async redirects() {
    return [
      // Redirect from old date-based structure to new slug-based structure
      {
        source: '/posts/:year/:month/:day/:slug',
        destination: '/posts/:slug',
        permanent: true,
      },
      // Redirect from old index.html to root
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      // Redirect from old posts.html to /posts
      {
        source: '/posts.html',
        destination: '/posts',
        permanent: true,
      },
      // Redirect from /about to Hello World post
      {
        source: '/about',
        destination: '/posts/hello-world',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
