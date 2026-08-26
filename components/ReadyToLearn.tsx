'use client';

import { FiHelpCircle, FiArrowRight } from 'react-icons/fi';
import { readyToLearn } from '@/lib/data';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';

/**
 * The gaps, named directly.
 *
 * This is the counterweight to the evidence sections. Every other part of the
 * page argues from something already built; this one states plainly what has
 * not been. Each card follows the same three beats — the gap, what closing it
 * would require, and why Callosum specifically is where that happens.
 */
export function ReadyToLearn() {
  return (
    <Section
      id="ready"
      eyebrow="Next Steps"
      title={
        <>
          Gaps I know I have, and problems I{' '}
          <span className="text-ink-700">would like to work on.</span>
        </>
      }
      lede="Everything above argues from work already done. This section does the opposite — these are the four things I cannot yet claim, and what it would take to change that."
      className="border-y border-paper-300/60 bg-white"
    >
      <ul className="grid gap-4 lg:grid-cols-2">
        {readyToLearn.gaps.map((item, i) => (
          <Reveal as="li" key={item.gap} index={i}>
            <article className="group h-full rounded-2xl border border-paper-300/80 bg-paper-50 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-600/30 hover:bg-white hover:shadow-card">
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-ink-900">
                  <FiHelpCircle className="h-[18px] w-[18px]" aria-hidden />
                </span>
                <h3 className="mt-1 text-balance font-display text-base font-semibold leading-snug text-ink-900">
                  {item.gap}
                </h3>
              </div>

              <dl className="mt-5 space-y-4">
                <div>
                  <dt className="eyebrow text-slateink-500">What closing it takes</dt>
                  <dd className="mt-1.5 text-pretty text-sm leading-relaxed text-slateink-700">
                    {item.need}
                  </dd>
                </div>
                <div className="border-l-2 border-ink-600/30 pl-4">
                  <dt className="eyebrow text-ink-600">Why here</dt>
                  <dd className="mt-1.5 text-pretty text-sm leading-relaxed text-slateink-700">
                    {item.why}
                  </dd>
                </div>
              </dl>
            </article>
          </Reveal>
        ))}
      </ul>

      {/* Commitment */}
      <Reveal delay={0.1}>
        <div className="gradient-ink relative mt-4 isolate overflow-hidden rounded-2xl p-7 sm:p-9">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -right-[5%] top-[-40%] h-[320px] w-[320px] animate-drift-slow rounded-full bg-amber-500/15 blur-[110px]" />
          </div>
          <p className="flex items-start gap-3 text-balance font-display text-lg font-semibold leading-snug text-white sm:text-xl">
            <FiArrowRight
              className="mt-1.5 h-5 w-5 shrink-0 text-amber-500"
              aria-hidden
            />
            {readyToLearn.commitment}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
