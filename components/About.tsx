'use client';

import { FiMapPin, FiBookOpen } from 'react-icons/fi';
import { profile, coreCompetencies, readiness } from '@/lib/data';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';

const stack = [
  'Python',
  'FastAPI',
  'Flask',
  'Node.js',
  'React',
  'TypeScript',
  'PyTorch / CNNs',
  'AWS',
  'Docker',
  'MySQL',
  'MongoDB',
  'MQTT',
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          Applied AI engineer with a{' '}
          <span className="text-ink-700">production track record</span> — not a
          prototype one.
        </>
      }
      className="bg-paper-100"
    >
      {/* Readiness statement — the framing everything below sits inside */}
      <Reveal>
        <div className="mb-12 rounded-2xl border border-ink-600/20 bg-white p-6 shadow-card sm:p-8">
          <h3 className="text-balance font-display text-xl font-bold leading-snug tracking-tight text-ink-900 sm:text-2xl">
            {readiness.title}
          </h3>
          <div className="mt-5 grid gap-x-10 gap-y-4 lg:grid-cols-2">
            {readiness.body.map((para) => (
              <p key={para} className="text-pretty text-[15px] leading-relaxed text-slateink-700">
                {para}
              </p>
            ))}
          </div>
          <ul className="mt-7 grid gap-2.5 border-t border-paper-200 pt-6 sm:grid-cols-2">
            {readiness.keyPoints.map((point) => (
              <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-ink-800">
                <span
                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"
                  aria-hidden
                />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        {/* Narrative */}
        <div className="space-y-5">
          {profile.summary.map((para, i) => (
            <Reveal key={i} index={i}>
              <p
                className={`text-pretty leading-relaxed ${
                  i === 0
                    ? 'text-lg text-ink-900 sm:text-xl'
                    : 'text-base text-slateink-700'
                }`}
              >
                {para}
              </p>
            </Reveal>
          ))}

          <Reveal index={3}>
            <div className="!mt-8 flex flex-wrap gap-2">
              {stack.map((item) => (
                <span
                  key={item}
                  className="tag transition-all duration-200 hover:-translate-y-0.5 hover:border-ink-600/40 hover:bg-white hover:text-ink-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal index={4}>
            <div className="!mt-8 border-t border-paper-300/70 pt-6">
              <h3 className="eyebrow text-ink-600">How I work</h3>
              <ul className="mt-3.5 flex flex-wrap gap-2">
                {coreCompetencies.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 rounded-lg border border-ink-600/20 bg-white px-3 py-1.5 text-[13px] font-medium text-ink-800"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Facts card */}
        <Reveal index={1}>
          <aside className="card sticky top-24 overflow-hidden p-6 sm:p-7">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-ink-700/8 text-ink-700">
                <FiBookOpen className="h-[18px] w-[18px]" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slateink-500">
                  Currently
                </p>
                <p className="mt-1.5 font-display text-base font-semibold leading-snug text-ink-900">
                  {profile.education.degree}
                </p>
                <p className="mt-1 text-sm text-slateink-500">
                  {profile.education.school} · from {profile.education.start}
                </p>
              </div>
            </div>

            <hr className="my-6 border-paper-200" />

            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-600">
                <FiMapPin className="h-[18px] w-[18px]" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slateink-500">
                  Based in
                </p>
                <p className="mt-1.5 text-sm font-medium text-ink-900">{profile.location}</p>
              </div>
            </div>

            <hr className="my-6 border-paper-200" />

            <ul className="space-y-3 text-sm">
              {[
                'Published research and government-funded project work',
                'Founding-team role at Contriver',
                `${profile.repoCount} public repositories`,
                'Systems in continuous production use',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-slateink-700">
                  <span
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}
