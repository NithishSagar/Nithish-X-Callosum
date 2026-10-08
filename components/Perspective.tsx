'use client';

import { motion } from 'framer-motion';
import { FiArrowRight, FiRotateCw } from 'react-icons/fi';
import { perspective, sections } from '@/lib/data';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';

/**
 * The argument behind the work.
 *
 * Dark section on purpose — it is the one place on the page that asks the
 * reader to slow down and read prose, and the tonal shift signals that.
 */
export function Perspective() {
  return (
    <div className="gradient-ink relative isolate overflow-hidden">
      {/* Ambient light */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-[5%] top-[5%] h-[420px] w-[420px] animate-drift-slow rounded-full bg-amber-500/12 blur-[130px]" />
        <div className="absolute -left-[8%] bottom-[5%] h-[420px] w-[420px] animate-drift rounded-full bg-ink-600/30 blur-[130px]" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-faint bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_75%)]"
      />

      <Section
        id="perspective"
        copy={sections.perspective}
        lede={perspective.lede}
        titleAccent={perspective.title}
        tone="dark"
      >
        {/* Pull quote */}
        <Reveal>
          <figure className="relative mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm sm:p-10">
            <span
              aria-hidden
              className="absolute left-6 top-3 select-none font-display text-7xl leading-none text-amber-500/25 sm:left-8"
            >
              &ldquo;
            </span>
            <blockquote className="relative">
              <p className="text-balance font-display text-xl font-semibold leading-snug text-white sm:text-2xl lg:text-[1.7rem]">
                {perspective.quote}
              </p>
            </blockquote>
            <figcaption className="mt-5 border-t border-white/10 pt-5 text-sm leading-relaxed text-paper-300">
              {perspective.quoteNote}
            </figcaption>
          </figure>
        </Reveal>

        {/* The loop */}
        <div className="mt-16">
          <Reveal>
            <div className="flex items-center gap-2.5 text-amber-500">
              <FiRotateCw className="h-4 w-4" aria-hidden />
              <h3 className="eyebrow">The loop I run on every system</h3>
            </div>
          </Reveal>

          <ol className="mt-6 grid gap-3 lg:grid-cols-4">
            {perspective.loop.map((item, i) => (
              <Reveal as="li" key={item.step} index={i} className="relative">
                <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-amber-500/40 hover:bg-white/[0.07]">
                  <div className="flex items-center justify-between">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-500/15 font-mono text-xs font-bold text-amber-500">
                      {i + 1}
                    </span>
                    {i < perspective.loop.length - 1 ? (
                      <FiArrowRight
                        className="h-4 w-4 text-white/25 lg:hidden"
                        aria-hidden
                      />
                    ) : null}
                  </div>
                  <h4 className="mt-4 font-display text-base font-semibold text-white">
                    {item.step}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-paper-300">{item.text}</p>
                </div>

                {/* Desktop connector between steps */}
                {i < perspective.loop.length - 1 ? (
                  <motion.span
                    aria-hidden
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
                    className="absolute -right-3 top-1/2 hidden h-px w-3 origin-left bg-gradient-to-r from-amber-500/60 to-transparent lg:block"
                  />
                ) : null}
              </Reveal>
            ))}
          </ol>

          {/* Loop-closing hint */}
          <Reveal delay={0.2}>
            <p className="mt-4 text-center text-xs text-paper-300/70">
              Step 4 feeds step 1. A system is never measured once.
            </p>
          </Reveal>
        </div>

        {/* Essay */}
        <div className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {perspective.body.map((block, i) => (
            <Reveal key={block.heading} index={i}>
              <article>
                <h3 className="font-display text-lg font-semibold leading-snug text-white">
                  <span className="mr-2 font-mono text-sm text-amber-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {block.heading}
                </h3>
                <p className="prose-body mt-3 text-pretty text-paper-300">
                  {block.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
