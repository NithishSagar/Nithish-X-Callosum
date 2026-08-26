/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    // Keep production bundles free of development logging.
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
