'use client';

import { motion } from 'framer-motion';
import { FiArrowDown, FiGithub, FiExternalLink } from 'react-icons/fi';
import { companyName, profile } from '@/lib/data';
import { Metric } from './ui/Metric';

/**
 * Hero.
 *
 * The background is three slowly drifting radial gradients plus a faint grid —
 * pure CSS animation, so it costs nothing on the main thread and keeps the
 * first paint fast. The metric strip is the actual argument: numbers first,
 * prose later.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="gradient-ink relative isolate flex min-h-[92svh] items-center overflow-hidden pt-[var(--nav-height)]"
    >
      {/* Drifting light */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-[10%] top-[-15%] h-[520px] w-[520px] animate-drift rounded-full bg-ink-600/35 blur-[120px]" />
        <div className="absolute right-[-8%] top-[10%] h-[460px] w-[460px] animate-drift-slow rounded-full bg-amber-500/18 blur-[130px]" />
        <div className="absolute bottom-[-20%] left-[35%] h-[420px] w-[420px] animate-drift rounded-full bg-ink-500/25 blur-[120px]" />
      </div>

      {/* Faint engineering grid + vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-faint bg-grid opacity-[0.5] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_78%)]"
      />

      <div className="container-page relative w-full py-20 sm:py-24">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow text-amber-500"
        >
          <span className="inline-block h-px w-6 bg-amber-500/70" aria-hidden />
          Application · {profile.role}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="hero-title mt-6 max-w-4xl text-balance font-display font-extrabold text-white"
        >
          <span className="gradient-text">{profile.name}</span>
          <span className="mx-3 text-amber-500">×</span>
          <br className="hidden sm:block" />
          {companyName}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-3xl text-balance text-lg font-medium leading-snug text-white sm:text-xl"
        >
          {profile.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-paper-300 sm:text-base"
        >
          {profile.pitch}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#about"
            className="group inline-flex items-center gap-2.5 rounded-full bg-amber-500 px-6 py-3.5 text-sm font-semibold text-ink-900 shadow-glow transition-transform duration-200 hover:-translate-y-0.5 hover:bg-amber-400"
          >
            Explore my story
            <FiArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
          </a>
          <a
            href="#mapping"
            className="inline-flex items-center gap-2 rounded-full bg-white/8 px-6 py-3.5 text-sm font-semibold text-white ring-1 ring-white/25 transition-colors hover:bg-white/15"
          >
            Jump to the role mapping
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 px-2 py-3.5 text-sm font-medium text-paper-300 transition-colors hover:text-white"
          >
            <FiGithub className="h-4 w-4" />
            GitHub
            <FiExternalLink className="h-3 w-3 opacity-60" />
          </a>
        </motion.div>

        {/* The argument, in numbers */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 grid grid-cols-2 gap-x-5 gap-y-8 border-t border-white/12 pt-8 sm:mt-16 sm:grid-cols-4 sm:gap-x-6 lg:gap-x-10"
        >
          {profile.coreMetrics.map((metric) => (
            <Metric key={metric.label} metric={metric} tone="dark" size="hero" />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
