import type { ReactNode } from 'react';
import type { SectionCopy } from '@/lib/data';
import { Reveal } from './Reveal';

interface SectionProps {
  id: string;
  /** Heading copy from the active company config. */
  copy: SectionCopy;
  children: ReactNode;
  /** Dark sections invert the heading palette. */
  tone?: 'light' | 'dark';
  className?: string;
  /**
   * Overrides `copy.lede`. For sections whose lede is derived from data —
   * the Role section counts its own requirements — rather than authored.
   */
  lede?: ReactNode;
  /** Overrides `copy.titleAccent`, for an accent built from other config. */
  titleAccent?: ReactNode;
}

/**
 * Every section shares one header rhythm: eyebrow → title → lede.
 *
 * The copy comes from the company config rather than from the component, which
 * is what lets a third company ship without editing any section. Headings are
 * two-tone: the accent half carries the brand colour.
 */
export function Section({
  id,
  copy,
  children,
  tone = 'light',
  className = '',
  lede,
  titleAccent,
}: SectionProps) {
  const dark = tone === 'dark';
  const accent = titleAccent ?? copy.titleAccent;
  const body = lede ?? copy.lede;

  return (
    <section id={id} className={`section-pad scroll-mt-24 ${className}`}>
      <div className="container-page">
        <Reveal>
          <p className={`eyebrow ${dark ? 'text-amber-500' : 'text-ink-600'}`}>
            <span
              className={`inline-block h-px w-6 ${dark ? 'bg-amber-500/70' : 'bg-ink-600/50'}`}
              aria-hidden
            />
            {copy.eyebrow}
          </p>
          <h2
            className={`section-title mt-4 max-w-4xl text-balance font-display font-bold tracking-tight ${
              dark ? 'text-white' : 'text-ink-900'
            }`}
          >
            {copy.title}
            {accent ? (
              <>
                {' '}
                <span className={dark ? 'text-amber-500' : 'text-ink-700'}>{accent}</span>
              </>
            ) : null}
          </h2>
          {body ? (
            <p
              className={`mt-5 max-w-2xl text-pretty text-base leading-relaxed sm:text-lg ${
                dark ? 'text-paper-300' : 'text-slateink-500'
              }`}
            >
              {body}
            </p>
          ) : null}
        </Reveal>

        <div className="mt-12 sm:mt-14">{children}</div>
      </div>
    </section>
  );
}
