'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { mapping, requirements, requirementById, projects, sections } from '@/lib/data';
import type { RequirementId } from '@/lib/data';
import { useHighlight } from '@/lib/highlight';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Icon } from './ui/Icons';

interface Connector {
  id: RequirementId;
  d: string;
}

const projectTitle = (id: string) => projects.find((p) => p.id === id)?.title ?? '';

/**
 * The Mapping.
 *
 * Left column: requirements in the order the job description states them.
 * Right column: my evidence, ordered by how strongly I would argue it.
 * The two orderings differ, so the connectors genuinely cross — the picture
 * is the claim that every requirement has a specific, named answer.
 *
 * Connector geometry is measured from the DOM rather than hardcoded, so it
 * survives font loading, resizing, and content edits.
 */
export function Mapping() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRefs = useRef<Partial<Record<RequirementId, HTMLElement | null>>>({});
  const rightRefs = useRef<Partial<Record<RequirementId, HTMLElement | null>>>({});

  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const { effective, toggle, setHovered } = useHighlight();
  const reduced = usePrefersReducedMotion();

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // Below the lg breakpoint the columns stack, so connectors are meaningless.
    if (window.innerWidth < 1024) {
      setConnectors([]);
      return;
    }

    const base = container.getBoundingClientRect();
    setSize({ width: base.width, height: base.height });

    const next: Connector[] = [];
    for (const row of mapping) {
      const from = leftRefs.current[row.requirementId];
      const to = rightRefs.current[row.requirementId];
      if (!from || !to) continue;

      const a = from.getBoundingClientRect();
      const b = to.getBoundingClientRect();

      const x1 = a.right - base.left;
      const y1 = a.top - base.top + a.height / 2;
      const x2 = b.left - base.left;
      const y2 = b.top - base.top + b.height / 2;

      // Horizontal control points give a flat-shouldered S-curve that reads as
      // a routed connection rather than a straight ruler line.
      const bend = Math.max((x2 - x1) * 0.5, 40);
      next.push({
        id: row.requirementId,
        d: `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`,
      });
    }

    setConnectors(next);
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ResizeObserver catches column reflow; the resize listener catches the
    // breakpoint crossing where we drop the connectors entirely.
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    window.addEventListener('resize', measure);

    // Web fonts change text metrics after first paint — re-measure once ready.
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    // The staggered reveal finishes around 900ms; one late pass catches any
    // sub-pixel settling without polling.
    const settle = window.setTimeout(measure, 900);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
      window.clearTimeout(settle);
    };
  }, [measure]);

  return (
    <Section
      id="mapping"
      copy={sections.mapping}
      className="border-y border-paper-300/60 bg-white"
    >
      <div ref={containerRef} className="relative grid gap-6 lg:grid-cols-2 lg:gap-x-32">
        {/* Connector layer */}
        {connectors.length > 0 ? (
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden lg:block"
            width={size.width}
            height={size.height}
            viewBox={`0 0 ${size.width} ${size.height}`}
            fill="none"
          >
            {connectors.map((connector, i) => {
              const isLit = effective === connector.id;
              const isDim = effective !== null && !isLit;
              return (
                <motion.path
                  key={connector.id}
                  d={connector.d}
                  stroke={isLit ? '#FF9F43' : '#1F4E78'}
                  strokeWidth={isLit ? 2.4 : 1.25}
                  strokeLinecap="round"
                  initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                  whileInView={{
                    pathLength: 1,
                    opacity: isDim ? 0.1 : isLit ? 1 : 0.28,
                  }}
                  viewport={{ once: false, margin: '0px 0px -15% 0px' }}
                  transition={{
                    pathLength: { duration: 1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.25 },
                    stroke: { duration: 0.25 },
                  }}
                />
              );
            })}
          </svg>
        ) : null}

        {/* Left — requirements in JD order */}
        <ul className="grid h-full auto-rows-fr gap-3">
          {requirements.map((req, i) => {
            const isLit = effective === req.id;
            const isDim = effective !== null && !isLit;
            // y={0}: a translate would shift getBoundingClientRect and put the
            // connector endpoints in the wrong place, so these reveal by fade only.
            return (
              <Reveal as="li" key={req.id} index={i} y={0} className="relative z-10">
                <button
                  type="button"
                  onClick={() => toggle(req.id)}
                  onMouseEnter={() => setHovered(req.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(req.id)}
                  onBlur={() => setHovered(null)}
                  ref={(el) => {
                    leftRefs.current[req.id] = el;
                  }}
                  className={`map-pad-req flex h-full w-full items-center gap-3.5 rounded-xl border text-left transition-all duration-300 ${
                    isLit
                      ? 'border-amber-500/60 bg-amber-100/50 shadow-glow'
                      : 'border-paper-300/80 bg-white hover:border-ink-600/35 hover:shadow-card'
                  } ${isDim ? 'dimmed' : ''}`}
                >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors ${
                      isLit ? 'bg-amber-500 text-ink-900' : 'bg-ink-700/8 text-ink-700'
                    }`}
                  >
                    <Icon name={req.icon} className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="map-title block font-display leading-snug text-ink-900">
                      {req.title}
                    </span>
                    <span className="map-note mt-0.5 block leading-snug text-slateink-500">
                      {req.jd}
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </ul>

        {/* Right — evidence, strongest argument first */}
        <ul className="grid h-full auto-rows-fr gap-3">
          {mapping.map((row, i) => {
            const isLit = effective === row.requirementId;
            const isDim = effective !== null && !isLit;
            return (
              <Reveal as="li" key={row.requirementId} index={i} y={0} className="relative z-10">
                <button
                  type="button"
                  onClick={() => toggle(row.requirementId)}
                  onMouseEnter={() => setHovered(row.requirementId)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(row.requirementId)}
                  onBlur={() => setHovered(null)}
                  ref={(el) => {
                    rightRefs.current[row.requirementId] = el;
                  }}
                  className={`map-pad-evidence flex h-full w-full flex-col justify-center rounded-xl border text-left transition-all duration-300 ${
                    isLit
                      ? 'border-amber-500/60 bg-white shadow-glow'
                      : 'border-paper-300/80 bg-paper-50 hover:border-ink-600/35 hover:bg-white hover:shadow-card'
                  } ${isDim ? 'dimmed' : ''}`}
                >
                  {/* Mobile-only: the pairing the connector shows on desktop */}
                  <span className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-600 lg:hidden">
                    <Icon name={requirementById[row.requirementId].icon} className="h-3 w-3" />
                    {requirementById[row.requirementId].short}
                  </span>

                  <span className="map-title block font-display leading-snug text-ink-900">
                    {row.evidenceTitle}
                  </span>
                  <span className="map-note mt-1.5 block leading-relaxed text-slateink-500">
                    {row.evidence}
                  </span>

                  <span className="mt-3 flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                        isLit
                          ? 'bg-amber-500 text-ink-900'
                          : 'bg-ink-700/8 text-ink-700'
                      }`}
                    >
                      <FiArrowRight className="h-3 w-3" />
                      {row.proof}
                    </span>
                    <span className="text-[11px] font-medium text-slateink-300">
                      {projectTitle(row.projectId)}
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
