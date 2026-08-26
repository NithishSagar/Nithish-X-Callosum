'use client';

import { FiGithub, FiStar, FiArrowUpRight } from 'react-icons/fi';
import { profile, repos, githubStats } from '@/lib/data';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Metric } from './ui/Metric';

/**
 * GitHub surface.
 *
 * Deliberately not an embedded stats image from a third-party service — those
 * are a render-blocking request to a host I do not control, and they break
 * silently. The numbers are stated directly and the profile is one click away.
 */
export function GitHubSection() {
  return (
    <Section
      id="github"
      eyebrow="Code"
      title={
        <>
          {profile.repoCount} repositories tracking the same{' '}
          <span className="text-ink-700">progression.</span>
        </>
      }
      lede="College projects through to production systems. The interesting part is not any single repository — it is that the shipping never stopped."
      className="border-y border-paper-300/60 bg-white"
    >
      {/* Stats strip */}
      <Reveal>
        <div className="card grid grid-cols-2 gap-x-6 gap-y-8 p-7 lg:grid-cols-4">
          {githubStats.map((stat) => (
            <Metric
              key={stat.label}
              metric={{ label: stat.label, value: stat.value, suffix: stat.suffix }}
              size="md"
            />
          ))}
        </div>
      </Reveal>

      {/* Repositories */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {repos.map((repo, i) => (
          <Reveal key={repo.name} index={i}>
            <a
              href={repo.url ?? `${profile.github}?tab=repositories`}
              target="_blank"
              rel="noreferrer noopener"
              className={`group flex h-full flex-col rounded-2xl border bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift ${
                repo.featured ? 'border-ink-600/25' : 'border-paper-300/70'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <FiGithub className="h-4 w-4 shrink-0 text-slateink-500" aria-hidden />
                  <span className="truncate font-mono text-sm font-semibold text-ink-900">
                    {repo.name}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {repo.featured ? (
                    <FiStar className="h-3.5 w-3.5 text-amber-500" aria-label="Featured" />
                  ) : null}
                  <FiArrowUpRight className="h-4 w-4 text-slateink-300 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-700" />
                </div>
              </div>

              <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-slateink-700">
                {repo.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {repo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-paper-100 px-2 py-0.5 text-[11px] font-medium text-slateink-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-6 flex justify-center">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-paper-300 bg-white px-5 py-3 text-sm font-semibold text-ink-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink-600/40 hover:shadow-card"
          >
            <FiGithub className="h-4 w-4" />
            View all {profile.repoCount} repositories
            <FiArrowUpRight className="h-3.5 w-3.5 opacity-60" />
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
