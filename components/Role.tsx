'use client';

import { motion } from 'framer-motion';
import { FiCheck, FiFilter } from 'react-icons/fi';
import { requirements, projects, mapping } from '@/lib/data';
import type { RequirementId } from '@/lib/data';
import { useHighlight } from '@/lib/highlight';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Icon } from './ui/Icons';

/** How many production systems back each requirement — shown on the card. */
const evidenceCount = (id: RequirementId) =>
  projects.filter((p) => p.requirementIds.includes(id)).length;

const hasMapping = (id: RequirementId) => mapping.some((m) => m.requirementId === id);

export function Role() {
  const { active, effective, toggle, setHovered } = useHighlight();

  return (
    <Section
      id="role"
      eyebrow="The Role"
      title={
        <>
          What Callosum is asking for — and how I read each line{' '}
          <span className="text-ink-700">of it.</span>
        </>
      }
      lede="Seven requirements pulled from the Applied AI · Member of Technical Staff description. Select any one and the rest of this page filters to the evidence that answers it."
      className="border-y border-paper-300/60 bg-white"
    >
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.6fr] lg:gap-14">
        {/* Instruction rail */}
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <div className="rounded-2xl border border-ink-700/12 bg-gradient-to-br from-ink-900 to-ink-700 p-6 text-white sm:p-7">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-amber-500">
                <FiFilter className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold leading-snug">
                This page is a filter, not a brochure.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-paper-300">
                Click a requirement. Every project card, mapping row, and metric that
                does not answer it will recede — so you can check a single claim
                without reading the whole page.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-paper-300">
                Click it again to clear.
              </p>
              {active ? (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 rounded-xl bg-amber-500/15 px-4 py-3 text-sm text-amber-400 ring-1 ring-amber-500/30"
                >
                  Filtering the page by{' '}
                  <strong className="font-semibold">
                    {requirements.find((r) => r.id === active)?.short}
                  </strong>
                  .
                </motion.div>
              ) : null}
            </div>
          </div>
        </Reveal>

        {/* Requirement cards */}
        <ul className="grid gap-3.5 sm:grid-cols-2">
          {requirements.map((req, i) => {
            const isActive = active === req.id;
            const isLit = effective === req.id;
            const isDimmed = effective !== null && !isLit;

            return (
              <Reveal as="li" key={req.id} index={i}>
                <button
                  type="button"
                  onClick={() => toggle(req.id)}
                  onMouseEnter={() => setHovered(req.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(req.id)}
                  onBlur={() => setHovered(null)}
                  aria-pressed={isActive}
                  className={`group relative flex h-full w-full flex-col rounded-2xl border p-5 text-left transition-all duration-300 ${
                    isActive
                      ? 'border-amber-500/60 bg-amber-100/40 shadow-glow'
                      : 'border-paper-300/80 bg-paper-50 hover:-translate-y-0.5 hover:border-ink-600/30 hover:bg-white hover:shadow-card'
                  } ${isDimmed ? 'dimmed' : ''}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors ${
                        isActive
                          ? 'bg-amber-500 text-ink-900'
                          : 'bg-ink-700/8 text-ink-700 group-hover:bg-ink-700 group-hover:text-white'
                      }`}
                    >
                      <Icon name={req.icon} className="h-[18px] w-[18px]" />
                    </span>

                    <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-slateink-500">
                      {hasMapping(req.id) ? (
                        <FiCheck className="h-3.5 w-3.5 text-amber-600" aria-hidden />
                      ) : null}
                      {evidenceCount(req.id)} system
                      {evidenceCount(req.id) === 1 ? '' : 's'}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-[15px] font-semibold leading-snug text-ink-900">
                    {req.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slateink-500">{req.jd}</p>

                  <p
                    className={`mt-3.5 border-l-2 pl-3 text-[13px] italic leading-relaxed transition-colors ${
                      isActive
                        ? 'border-amber-500 text-ink-800'
                        : 'border-paper-300 text-slateink-500 group-hover:border-amber-500/60'
                    }`}
                  >
                    {req.reading}
                  </p>
                </button>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
