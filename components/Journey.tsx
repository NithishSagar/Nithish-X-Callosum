'use client';

import { motion } from 'framer-motion';
import { timeline } from '@/lib/data';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';

/**
 * Career timeline.
 *
 * The vertical rail draws itself as the section scrolls into view — a small
 * touch, but it makes the progression feel like one continuous line rather
 * than five separate entries.
 */
export function Journey() {
  return (
    <Section
      id="journey"
      eyebrow="Journey"
      title={
        <>
          From projects that had to work, to platforms other{' '}
          <span className="text-ink-700">people work on.</span>
        </>
      }
      lede="The through-line is scope: each step handed me a wider blast radius, and the discipline had to grow to match it."
      className="bg-paper-100"
    >
      <div className="relative">
        {/* Animated rail */}
        <motion.span
          aria-hidden
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-ink-700 via-ink-600/50 to-transparent sm:block"
        />

        <ol className="space-y-4 sm:space-y-6 sm:pl-10">
          {timeline.map((item, i) => (
            <Reveal as="li" key={item.title} index={i} className="relative">
              {/* Node */}
              <span
                aria-hidden
                className={`absolute -left-10 top-6 hidden h-4 w-4 place-items-center rounded-full border-2 border-white sm:grid ${
                  item.highlight ? 'bg-amber-500 ring-2 ring-amber-500/30' : 'bg-ink-700 ring-2 ring-paper-300'
                }`}
              />

              <div
                className={`card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift sm:p-7 ${
                  item.highlight ? 'border-amber-500/35' : ''
                }`}
              >
                <div className="flex flex-wrap items-center gap-2.5">
                  <span
                    className={
                      item.highlight
                        ? 'tag-accent'
                        : 'tag'
                    }
                  >
                    {item.period}
                  </span>
                  <span className="text-xs font-medium text-slateink-500">{item.org}</span>
                </div>

                <h3 className="mt-3.5 text-balance font-display text-lg font-bold leading-snug tracking-tight text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-2.5 max-w-3xl text-pretty text-sm leading-relaxed text-slateink-700">
                  {item.text}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
