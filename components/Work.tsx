'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGrid, FiList, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import { projects } from '@/lib/data';
import { useHighlight } from '@/lib/highlight';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { ProjectCard } from './ProjectCard';

type View = 'stack' | 'timeline';

export function Work() {
  // The first card starts open so the section is never a wall of closed rows.
  const [open, setOpen] = useState<Set<string>>(new Set([projects[0].id]));
  const [view, setView] = useState<View>('stack');
  const { effective } = useHighlight();

  const toggle = (id: string) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const allOpen = open.size === projects.length;
  const toggleAll = () =>
    setOpen(allOpen ? new Set() : new Set(projects.map((p) => p.id)));

  const matchCount = effective
    ? projects.filter((p) => p.requirementIds.includes(effective)).length
    : projects.length;

  return (
    <Section
      id="work"
      eyebrow="My Work"
      title={
        <>
          Four systems that had to work when I was not watching — and one{' '}
          <span className="text-ink-700">study that questioned itself.</span>
        </>
      }
      lede="Each card opens onto the full story: the constraint that bound the system, the decisions that fit inside it, the measured result, and the part that generalises. The research card opens onto figures instead."
      className="bg-paper-100"
    >
      {/* Controls */}
      <Reveal>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slateink-500">
            {effective ? (
              <>
                <span className="font-semibold text-ink-900">{matchCount}</span> of{' '}
                {projects.length} answer the selected requirement
              </>
            ) : (
              <>
                <span className="font-semibold text-ink-900">{projects.length}</span> systems and
                studies
              </>
            )}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleAll}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-paper-300 bg-white px-4 text-[13px] font-medium text-slateink-700 transition-colors hover:border-ink-600/40 hover:text-ink-700"
            >
              {allOpen ? (
                <>
                  <FiMinimize2 className="h-3.5 w-3.5" /> Collapse all
                </>
              ) : (
                <>
                  <FiMaximize2 className="h-3.5 w-3.5" /> Expand all
                </>
              )}
            </button>

            {/* View switch */}
            <div
              className="flex items-center rounded-full border border-paper-300 bg-white p-1"
              role="group"
              aria-label="Layout"
            >
              {(
                [
                  { id: 'stack', label: 'Detail', icon: FiList },
                  { id: 'timeline', label: 'Timeline', icon: FiGrid },
                ] as const
              ).map(({ id, label, icon: ItemIcon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setView(id)}
                  aria-pressed={view === id}
                  className={`relative inline-flex min-h-[38px] items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium transition-colors ${
                    view === id ? 'text-white' : 'text-slateink-500 hover:text-ink-700'
                  }`}
                >
                  {view === id ? (
                    <motion.span
                      layoutId="view-pill"
                      className="absolute inset-0 rounded-full bg-ink-700"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  ) : null}
                  <ItemIcon className="relative h-3.5 w-3.5" />
                  <span className="relative">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {view === 'stack' ? (
        <div className="space-y-5">
          {projects.map((project, i) => (
            <Reveal key={project.id} index={i}>
              <ProjectCard
                project={project}
                isOpen={open.has(project.id)}
                onToggle={() => toggle(project.id)}
              />
            </Reveal>
          ))}
        </div>
      ) : (
        <TimelineView />
      )}
    </Section>
  );
}

/**
 * Compact chronological read of the same five entries — useful for seeing the
 * progression (single service → distributed pipeline → operated infrastructure
 * → platform for other engineers → controlled research) rather than the detail.
 */
function TimelineView() {
  const { isDimmed } = useHighlight();

  return (
    <ol className="relative space-y-4 border-l border-paper-300 pl-6 sm:pl-8">
      {projects.map((project, i) => {
        const dimmed = isDimmed(project.requirementIds);
        return (
          <Reveal as="li" key={project.id} index={i} className="relative">
            <span
              aria-hidden
              className="absolute -left-[31px] top-6 grid h-3 w-3 place-items-center rounded-full border-2 border-white bg-ink-700 ring-2 ring-paper-300 sm:-left-[39px]"
            />
            <div
              className={`card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift sm:p-6 ${
                dimmed ? 'dimmed' : ''
              }`}
            >
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="tag-accent">{project.lens}</span>
                <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-slateink-500">
                  {project.period}
                </span>
              </div>
              <h3 className="mt-3 font-display text-lg font-bold tracking-tight text-ink-900">
                {project.title}
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-slateink-700">
                {project.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="text-sm">
                    <span className="font-display font-bold tabular-nums text-ink-700">
                      {metric.prefix}
                      {metric.value.toLocaleString('en-GB')}
                      {metric.suffix}
                    </span>{' '}
                    <span className="text-slateink-500">{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
