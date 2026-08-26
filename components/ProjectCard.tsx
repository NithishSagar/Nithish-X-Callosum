'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronDown, FiArrowRight, FiExternalLink, FiFileText } from 'react-icons/fi';
import type { Project } from '@/lib/data';
import { requirementById } from '@/lib/data';
import { useHighlight } from '@/lib/highlight';
import { Metric } from './ui/Metric';
import { ResearchCharts } from './ResearchCharts';
import { Icon } from './ui/Icons';

interface ProjectCardProps {
  project: Project;
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * One production system.
 *
 * Collapsed it shows the claim and the numbers; expanded it shows the working.
 * Height is animated rather than toggled so the surrounding layout does not
 * jump, and the expanded body is kept out of the DOM when closed to avoid
 * paying layout cost for four hidden essays.
 */
export function ProjectCard({ project, isOpen, onToggle }: ProjectCardProps) {
  const { effective, isDimmed, toggle: toggleReq } = useHighlight();
  const dimmed = isDimmed(project.requirementIds);
  const lit = effective !== null && !dimmed;

  // Research cards read as a paper rather than a build log: the section labels
  // change from constraint/approach/results to question/method/findings.
  const isResearch = project.kind === 'research';
  const labels = isResearch
    ? {
        flow: 'Experimental pipeline',
        problem: 'The question',
        results: 'Findings',
        method: 'How I answered it',
      }
    : {
        flow: 'Path through the system',
        problem: 'The constraint',
        results: 'Results',
        method: 'What I did about it',
      };

  return (
    <motion.article
      layout
      transition={{ layout: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } }}
      className={`group relative overflow-hidden rounded-2xl border bg-white transition-[box-shadow,border-color,opacity,filter] duration-300 ${
        lit
          ? 'border-amber-500/50 shadow-glow'
          : 'border-paper-300/70 shadow-card hover:border-ink-600/25 hover:shadow-lift'
      } ${isResearch ? 'bg-gradient-to-br from-white to-paper-50' : ''} ${
        dimmed ? 'dimmed' : ''
      }`}
    >
      {/* Accent rail — fills on hover / when lit by a requirement filter */}
      <span
        aria-hidden
        className={`absolute inset-y-0 left-0 w-[3px] origin-top transition-transform duration-300 ${
          lit ? 'scale-y-100 bg-amber-500' : 'scale-y-0 bg-ink-600 group-hover:scale-y-100'
        }`}
      />

      {/* Header — the whole strip is the toggle */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`project-body-${project.id}`}
        className="flex w-full flex-col gap-5 p-6 text-left sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs font-semibold text-slateink-300">
                {String(project.index).padStart(2, '0')}
              </span>
              <span className="tag-accent">{project.lens}</span>
              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-slateink-500">
                {project.period}
              </span>
              {project.status ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-600/30 bg-ink-700/6 px-2.5 py-1 text-[11px] font-semibold text-ink-700">
                  <FiFileText className="h-3 w-3" aria-hidden />
                  {project.status}
                </span>
              ) : null}
            </div>

            <h3 className="mt-3 text-balance font-display text-xl font-bold leading-tight tracking-tight text-ink-900 sm:text-2xl">
              {project.title}
            </h3>
            <p className="mt-1.5 text-sm font-medium text-ink-600">{project.kicker}</p>
            <p className="mt-3.5 max-w-2xl text-pretty text-[15px] leading-relaxed text-slateink-700">
              {project.summary}
            </p>
          </div>

          <span
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
              isOpen
                ? 'border-ink-700 bg-ink-700 text-white'
                : 'border-paper-300 text-slateink-500 group-hover:border-ink-600 group-hover:text-ink-700'
            }`}
          >
            <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <FiChevronDown className="h-[18px] w-[18px]" />
            </motion.span>
          </span>
        </div>

        {/* Metrics always visible — the headline claim shouldn't need a click */}
        <div className="flex flex-wrap gap-x-10 gap-y-5 border-t border-paper-200 pt-5">
          {project.metrics.map((metric) => (
            <Metric key={metric.label} metric={metric} size="sm" />
          ))}
        </div>
      </button>

      {/* Expanded body */}
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={`project-body-${project.id}`}
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.24, delay: 0.06 },
            }}
            className="overflow-hidden"
          >
            <div className="space-y-8 border-t border-paper-200 px-6 pb-8 pt-7 sm:px-8">
              {/* Architecture strip */}
              <div>
                <h4 className="eyebrow text-slateink-500">{labels.flow}</h4>
                <div className="rail mt-3 flex items-center gap-2 overflow-x-auto pb-2">
                  {project.architecture.map((node, i) => (
                    <div key={node} className="flex shrink-0 items-center gap-2">
                      <span className="whitespace-nowrap rounded-lg border border-paper-300 bg-paper-50 px-3 py-2 font-mono text-xs text-ink-800">
                        {node}
                      </span>
                      {i < project.architecture.length - 1 ? (
                        <FiArrowRight className="h-3.5 w-3.5 shrink-0 text-amber-500" aria-hidden />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              {/* Problem */}
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-paper-200 bg-paper-50 p-5">
                  <h4 className="eyebrow text-ink-600">{labels.problem}</h4>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-slateink-700">
                    {project.problem}
                  </p>
                </div>

                <div className="rounded-xl border border-paper-200 bg-paper-50 p-5">
                  <h4 className="eyebrow text-ink-600">{labels.results}</h4>
                  <ul className="mt-3 space-y-2.5">
                    {project.results.map((result) => (
                      <li key={result} className="flex gap-2.5 text-sm leading-relaxed text-slateink-700">
                        <span
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"
                          aria-hidden
                        />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Figures — placed directly under the findings they evidence */}
              {project.charts?.length ? (
                <div>
                  <h4 className="eyebrow text-ink-600">Figures</h4>
                  <div className="mt-3">
                    <ResearchCharts charts={project.charts} />
                  </div>
                </div>
              ) : null}

              {/* Approach */}
              <div>
                <h4 className="eyebrow text-ink-600">{labels.method}</h4>
                <ol className="mt-4 space-y-4">
                  {project.solution.map((step, i) => (
                    <li key={step} className="flex gap-4">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink-700/8 font-mono text-[11px] font-semibold text-ink-700">
                        {i + 1}
                      </span>
                      <p className="text-pretty text-sm leading-relaxed text-slateink-700">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Key learning */}
              <div className="rounded-xl border-l-[3px] border-amber-500 bg-amber-100/50 p-5">
                <h4 className="eyebrow text-amber-600">The generalisable part</h4>
                <p className="mt-2.5 text-pretty text-[15px] leading-relaxed text-ink-900">
                  {project.learning}
                </p>
              </div>

              {/* Why the methodology transfers */}
              {project.whyItMatters?.length ? (
                <div className="rounded-xl border border-ink-600/20 bg-ink-700/[0.04] p-5">
                  <h4 className="eyebrow text-ink-600">Why this transfers to Callosum</h4>
                  <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {project.whyItMatters.map((reason) => (
                      <li
                        key={reason}
                        className="flex gap-2.5 text-sm leading-relaxed text-slateink-700"
                      >
                        <span
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-ink-600"
                          aria-hidden
                        />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Stack + requirement chips */}
              <div className="flex flex-col gap-5 border-t border-paper-200 pt-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {project.link ? (
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-ink-700 transition-colors hover:text-amber-600"
                  >
                    {project.link.label}
                    <FiExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </div>

              <div>
                <h4 className="eyebrow text-slateink-500">Answers these requirements</h4>
                {project.note ? (
                  <p className="mt-2.5 text-pretty text-[13px] leading-relaxed text-slateink-500">
                    {project.note}
                  </p>
                ) : null}
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.requirementIds.map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggleReq(id)}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                        effective === id
                          ? 'border-amber-500 bg-amber-500 text-ink-900'
                          : 'border-paper-300 bg-white text-slateink-700 hover:border-ink-600/40 hover:text-ink-700'
                      }`}
                    >
                      <Icon name={requirementById[id].icon} className="h-3.5 w-3.5" />
                      {requirementById[id].short}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}
