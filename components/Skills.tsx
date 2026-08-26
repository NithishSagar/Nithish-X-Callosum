'use client';

import { motion } from 'framer-motion';
import { skillGroups } from '@/lib/data';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Icon } from './ui/Icons';

/**
 * Skills, with proficiency bars that fill on scroll.
 *
 * The bars are deliberately unlabelled with numbers — a "92%" on a skill is
 * false precision. The bar communicates relative depth; the note beside it
 * says where that depth was earned, which is the part that matters.
 */
export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={
        <>
          The tools, and where each one was{' '}
          <span className="text-ink-700">earned.</span>
        </>
      }
      lede="Depth here means production use under load, not tutorial completion. Where a skill was proven on a specific system, it says so."
      className="bg-paper-100"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, groupIndex) => (
          <Reveal key={group.title} index={groupIndex}>
            <article className="card h-full p-6 transition-shadow duration-300 hover:shadow-lift">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink-700/8 text-ink-700">
                  <Icon name={group.icon} className="h-[18px] w-[18px]" />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-ink-900">
                    {group.title}
                  </h3>
                  <p className="mt-1 text-xs italic leading-snug text-slateink-500">
                    {group.note}
                  </p>
                </div>
              </div>

              <ul className="mt-6 space-y-4">
                {group.skills.map((skill, i) => (
                  <li key={skill.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[13px] font-medium text-ink-900">{skill.name}</span>
                      {skill.note ? (
                        <span className="shrink-0 text-[11px] text-slateink-300">{skill.note}</span>
                      ) : null}
                    </div>
                    <div
                      className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-paper-200"
                      role="presentation"
                    >
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-ink-700 to-ink-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                        transition={{
                          duration: 0.9,
                          delay: 0.1 + i * 0.07,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}

        {/* Closing note fills the sixth grid cell on wide screens */}
        <Reveal index={skillGroups.length}>
          <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-ink-600/25 bg-white/60 p-6">
            <p className="font-display text-base font-semibold leading-snug text-ink-900">
              The list matters less than the habit.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slateink-700">
              Every one of these was picked up because a system needed it. I would rather
              be the person who learns the accelerator you actually use than the person
              who already knows a different one.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
