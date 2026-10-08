/**
 * Known company keys. Duplicated from lib/companies/index.ts because this file
 * is plain ESM and cannot import TypeScript — keep the two in step when adding
 * a company (the checklist in lib/companies/README.md lists this spot).
 */
const KNOWN_COMPANIES = ['callosum', 'ineffable', 'scope'];
const DEFAULT_COMPANY = 'callosum';

const rawCompany = process.env.NEXT_PUBLIC_COMPANY;
const company =
  rawCompany === undefined || rawCompany.trim() === ''
    ? DEFAULT_COMPANY
    : rawCompany.trim().toLowerCase();

/**
 * Fail the build on an unrecognised value rather than quietly serving the
 * default. `selectCompany()` in lib/getCompany.ts is a chain of `===` tests
 * with a `return callosum` fallback, so "scope " or "Scope" or "scoep" would
 * otherwise deploy a Callosum site under a Scope domain with nothing in the
 * log to say why.
 */
if (!KNOWN_COMPANIES.includes(company)) {
  throw new Error(
    `NEXT_PUBLIC_COMPANY=${JSON.stringify(rawCompany)} is not a known company.\n` +
      `Expected one of: ${KNOWN_COMPANIES.join(', ')}.\n` +
      `Unset it to build the default (${DEFAULT_COMPANY}).`,
  );
}

// Surfaces in the Vercel build log, so a deployment can be checked against the
// company it was meant to be without downloading and reading the HTML.
console.log(`[build] NEXT_PUBLIC_COMPANY=${company}`);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /**
   * Pin NEXT_PUBLIC_COMPANY as a build-time constant.
   *
   * Without this, an unset variable leaves `process.env.NEXT_PUBLIC_COMPANY` as a
   * runtime lookup, so the comparison in lib/getCompany.ts cannot fold to a
   * constant and every company config ends up in the bundle. Measured: 160 kB
   * unset vs 153 kB with the value defined. Naming the default here makes the
   * fallback path fold like the explicit ones.
   *
   * The value is the normalised one, so surrounding whitespace pasted into a
   * Vercel environment variable does not change which site gets built.
   */
  env: {
    NEXT_PUBLIC_COMPANY: company,
  },
  poweredByHeader: false,
  compiler: {
    // Keep production bundles free of development logging.
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
