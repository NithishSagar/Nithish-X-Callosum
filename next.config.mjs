/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /**
   * Give NEXT_PUBLIC_COMPANY a build-time default.
   *
   * Without this, an unset variable leaves `process.env.NEXT_PUBLIC_COMPANY` as a
   * runtime lookup, so the comparison in lib/getCompany.ts cannot fold to a
   * constant and every company config ends up in the bundle. Measured: 160 kB
   * unset vs 153 kB with the value defined. Naming the default here makes the
   * fallback path fold like the explicit ones.
   */
  env: {
    NEXT_PUBLIC_COMPANY: process.env.NEXT_PUBLIC_COMPANY ?? 'callosum',
  },
  poweredByHeader: false,
  compiler: {
    // Keep production bundles free of development logging.
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
