'use client';

/**
 * ARCHIVED — not rendered. Kept because this repository has no git
 * history to restore from. See the archive banner in lib/data.ts.
 */

import { motion } from 'framer-motion';
import { FiArrowDown, FiTarget, FiCheckCircle } from 'react-icons/fi';
import { learningJourney } from '@/lib/companies/callosum';
import type { JourneyPhase } from '@/lib/companies/types';
import { Section } from '../ui/Section';
import { Reveal } from '../ui/Reveal';

/**
 * Learning journey.
 *
 * Structurally this is an argument, not a CV: each phase ends on the thing it
 * could not teach, and that gap is what motivates the next card. The final
 * phase is the only forward-looking one and gets a different treatment so it
 * reads as a proposal rather than a claim about the past.
 */
export function LearningJourney() {
  const phases = learningJourney.phases;

  return (
    <Section
      id="learning"
      copy={{
        eyebrow: 'Learning Journey',
        title: 'How I learn — and what each step',
        titleAccent: 'could not teach me.',
        lede: learningJourney.lede,
      }}
      className="bg-white"
    >
      <div className="relative">
        {/* Rail draws itself as the section scrolls in */}
        <motion.span
          aria-hidden
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-[7px] top-2 hidden h-[calc(100%-2rem)] w-px origin-top bg-gradient-to-b from-ink-700 via-ink-600/50 to-amber-500/60 sm:block"
        />

        <ol className="space-y-4 sm:pl-10">
          {phases.map((phase, i) => (
            <PhaseCard
              key={phase.phase}
              phase={phase}
              index={i}
              isLast={i === phases.length - 1}
            />
          ))}
        </ol>
      </div>

      {/* Mindset */}
      <div className="mt-14">
        <Reveal>
          <h3 className="font-display text-lg font-semibold text-ink-900">
            {learningJourney.mindset.title}
          </h3>
        </Reveal>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {learningJourney.mindset.principles.map((item, i) => (
            <Reveal key={item.principle} index={i}>
              <article className="h-full rounded-xl border border-paper-300/80 bg-paper-50 p-5 transition-colors duration-300 hover:border-ink-600/30 hover:bg-white">
                <h4 className="font-display text-[15px] font-semibold text-ink-900">
                  <span className="mr-2 font-mono text-xs text-amber-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item.principle}
                </h4>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-slateink-700">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function PhaseCard({
  phase,
  index,
  isLast,
}: {
  phase: JourneyPhase;
  index: number;
  isLast: boolean;
}) {
  const future = phase.future === true;

  return (
    <Reveal as="li" index={index} className="relative">
      {/* Node — hollow for the phase that has not happened yet */}
      <span
        aria-hidden
        className={`absolute -left-10 top-7 hidden h-4 w-4 rounded-full border-2 border-white sm:block ${
          future
            ? 'bg-white ring-2 ring-amber-500'
            : 'bg-ink-700 ring-2 ring-paper-300'
        }`}
      />

      <div
        className={`overflow-hidden rounded-2xl border ${
          future
            ? 'gradient-ink border-ink-700/30 text-white'
            : 'border-paper-300/70 bg-white shadow-card'
        }`}
      >
        <div className="p-6 sm:p-7">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={
                future
                  ? 'inline-flex items-center rounded-full bg-amber-500 px-2.5 py-1 text-xs font-semibold text-ink-900'
                  : 'tag'
              }
            >
              {phase.period}
            </span>
            <span
              className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
                future ? 'text-amber-500' : 'text-slateink-500'
              }`}
            >
              {phase.phase}
            </span>
          </div>

          <p
            className={`mt-3.5 text-balance font-display text-lg font-bold leading-snug tracking-tight ${
              future ? 'text-white' : 'text-ink-900'
            }`}
          >
            {phase.focus}
          </p>

          {/* --- Past phases: built / learned / gap --- */}
          {phase.built?.length ? (
            <div className="mt-5">
              <h4 className="eyebrow text-slateink-500">What I built</h4>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {phase.built.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {phase.learned ? (
            <div className="mt-5 border-l-2 border-ink-600/40 pl-4">
              <h4 className="eyebrow text-ink-600">What it taught me</h4>
              <p className="mt-1.5 text-pretty text-sm leading-relaxed text-slateink-700">
                {phase.learned}
              </p>
            </div>
          ) : null}

          {/* --- Future phase: goal / learn / contribute --- */}
          {phase.goal ? (
            <p className="mt-4 max-w-3xl text-pretty text-[15px] leading-relaxed text-paper-300">
              {phase.goal}
            </p>
          ) : null}

          {future ? (
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <h4 className="eyebrow flex items-center gap-2 text-amber-500">
                  <FiTarget className="h-3.5 w-3.5" aria-hidden />
                  What I would learn
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {phase.willLearn?.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-relaxed text-paper-300"
                    >
                      <span
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="eyebrow flex items-center gap-2 text-amber-500">
                  <FiCheckCircle className="h-3.5 w-3.5" aria-hidden />
                  What I would contribute
                </h4>
                <ul className="mt-3 space-y-3">
                  {phase.willContribute?.map((item) => (
                    <li key={item.when} className="text-sm leading-relaxed">
                      <span className="font-semibold text-white">{item.when}</span>
                      <span className="text-paper-300"> — {item.what}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>

        {/* The gap is the hinge into the next phase, so it sits on the
            card's bottom edge and points down the rail. */}
        {phase.gap ? (
          <div className="border-t border-amber-500/30 bg-amber-100/50 px-6 py-4 sm:px-7">
            <h4 className="eyebrow text-amber-600">What it could not teach me</h4>
            <p className="mt-1.5 text-pretty text-sm leading-relaxed text-ink-800">
              {phase.gap}
            </p>
          </div>
        ) : null}
      </div>

      {/* Downward hint that the gap motivates the next card */}
      {!isLast ? (
        <div className="flex justify-center py-1" aria-hidden>
          <FiArrowDown className="h-4 w-4 text-amber-500/70" />
        </div>
      ) : null}
    </Reveal>
  );
}
