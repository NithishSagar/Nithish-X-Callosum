import type { Metadata, Viewport } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';
import { companyName, profile, theme } from '@/lib/data';

// Self-hosted at build time by next/font — no render-blocking request to a
// third-party font CDN, and no layout shift when the face swaps in.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
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
