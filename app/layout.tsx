import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { companyName, profile, theme } from '@/lib/data';

// Fonts are vendored in public/fonts and loaded from disk, so a build never
// touches the network. This replaced next/font/google after a cold build
// failed on a flaky Google Fonts fetch: the loader crashed inside
// @next/font parsing the response, which on a CI builder is a red deployment
// with no retry.
//
// One latin-subset variable file per family. next/font/google split each
// family across seven unicode-range subsets (greek, cyrillic, vietnamese and
// so on), but next/font/local has no `unicode-range` option and the site uses
// nothing outside latin — verified by scanning every config and component for
// non-ASCII codepoints. A browser only fetches a subset whose range the page
// actually uses, so the other six were never downloaded anyway.
//
// `adjustFontFallback: 'Arial'` reproduces the metric-override fallback face
// that next/font/google generated, which is what keeps the swap from shifting
// layout.
//
// Both faces load on every build, and `--font-display` picks between them per
// theme in globals.css: Sora for 'ink', Inter for 'framer'.
const inter = localFont({
  src: '../public/fonts/inter-latin-variable.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: 'Arial',
});

const sora = localFont({
  src: '../public/fonts/sora-latin-variable.woff2',
  weight: '100 800',
  style: 'normal',
  variable: '--font-sora',
  display: 'swap',
  adjustFontFallback: 'Arial',
});

const title = `${profile.name} × ${companyName}`;
const description = `${profile.tagline} ${profile.summary[0]}`.slice(0, 300);

/**
 * Absolute base for social-card URLs. Vercel injects VERCEL_URL per deployment;
 * set NEXT_PUBLIC_SITE_URL to pin a custom domain.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: title,
  authors: [{ name: profile.name, url: profile.github }],
  keywords: [
    companyName,
    profile.role,
    'inference optimisation',
    'evaluation rigour',
    'systems engineering',
    profile.name,
  ],
  openGraph: {
    title,
    description,
    type: 'website',
    siteName: title,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0B1F33',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme={theme} className={`${inter.variable} ${sora.variable}`}>
      <body>
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
