import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
  /** Dark sections invert the heading palette. */
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * Every section shares one header rhythm: eyebrow → title → lede.
 * Keeping it in one component is what makes the page feel like a single
 * document rather than a stack of unrelated blocks.
 */
export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  tone = 'light',
  className = '',
}: SectionProps) {
  const dark = tone === 'dark';

  return (
    <section id={id} className={`scroll-mt-24 py-20 sm:py-28 ${className}`}>
      <div className="container-page">
        <Reveal>
          <p className={`eyebrow ${dark ? 'text-amber-500' : 'text-ink-600'}`}>
            <span
              className={`inline-block h-px w-6 ${dark ? 'bg-amber-500/70' : 'bg-ink-600/50'}`}
              aria-hidden
            />
            {eyebrow}
          </p>
          <h2
            className={`mt-4 max-w-3xl text-balance font-display text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
              dark ? 'text-white' : 'text-ink-900'
            }`}
          >
            {title}
          </h2>
          {lede ? (
            <p
              className={`mt-5 max-w-2xl text-pretty text-base leading-relaxed sm:text-lg ${
                dark ? 'text-paper-300' : 'text-slateink-500'
              }`}
            >
              {lede}
            </p>
          ) : null}
        </Reveal>

        <div className="mt-12 sm:mt-14">{children}</div>
      </div>
    </section>
  );
}
