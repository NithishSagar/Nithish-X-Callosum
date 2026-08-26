import type { Metadata, Viewport } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';
import { profile } from '@/lib/data';

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

const title = `${profile.name} × Callosum Applied AI`;
const description =
  'Constraint-driven systems design: sub-100ms CNN inference, five-layer IoT orchestration, 500+ daily users in production, and a developer platform for 60+ engineers — mapped to the Callosum Applied AI role.';

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
    'Applied AI',
    'Member of Technical Staff',
    'inference optimisation',
    'heterogeneous compute',
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
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
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
