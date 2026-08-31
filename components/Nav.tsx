'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiMenu, FiX, FiLinkedin } from 'react-icons/fi';
import { navItems, profile, requirementById } from '@/lib/data';
import { useActiveSection, useScrolled } from '@/lib/hooks';
import { useHighlight } from '@/lib/highlight';

const sectionIds = navItems.map((n) => n.id);

/**
 * Sticky navigation.
 *
 * Two states: transparent while the hero is on screen, then an opaque blurred
 * bar once scrolled. The active-section pill is a shared `layoutId`, so it
 * slides between items rather than cutting.
 */
export function Nav() {
  const scrolled = useScrolled(80);
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const { active: activeReq, clear } = useHighlight();

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-paper-300/70 bg-white/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
        style={{ height: 'var(--nav-height)' }}
      >
        <div className="container-page flex h-full items-center justify-between gap-4">
          {/* Wordmark */}
          <a
            href="#top"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label="Back to top"
          >
            <span
              className={`grid h-8 w-8 place-items-center rounded-lg font-display text-sm font-bold transition-colors ${
                scrolled ? 'bg-ink-700 text-white' : 'bg-white/10 text-white ring-1 ring-white/25'
              }`}
            >
              NS
            </span>
            <span
              className={`hidden font-display text-sm font-semibold tracking-tight sm:block ${
                scrolled ? 'text-ink-900' : 'text-white'
              }`}
            >
              Nithish <span className="text-amber-500">×</span> Callosum
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Sections">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors ${
                    scrolled
                      ? isActive
                        ? 'text-ink-900'
                        : 'text-slateink-500 hover:text-ink-700'
                      : isActive
                        ? 'text-white'
                        : 'text-white/65 hover:text-white'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-pill"
                      className={`absolute inset-0 rounded-full ${
                        scrolled ? 'bg-paper-200' : 'bg-white/12'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* External links + mobile toggle */}
          <div className="flex items-center gap-1.5">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub profile"
              className={`grid h-11 w-11 place-items-center rounded-full transition-colors sm:h-9 sm:w-9 ${
                scrolled
                  ? 'text-slateink-500 hover:bg-paper-200 hover:text-ink-700'
                  : 'text-white/75 hover:bg-white/10 hover:text-white'
              }`}
            >
              <FiGithub className="h-[18px] w-[18px]" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn profile"
              className={`hidden h-9 w-9 place-items-center rounded-full transition-colors sm:grid ${
                scrolled
                  ? 'text-slateink-500 hover:bg-paper-200 hover:text-ink-700'
                  : 'text-white/75 hover:bg-white/10 hover:text-white'
              }`}
            >
              <FiLinkedin className="h-[18px] w-[18px]" />
            </a>
            <a
              href={profile.portfolio}
              target="_blank"
              rel="noreferrer noopener"
              className={`hidden items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors sm:inline-flex ${
                scrolled
                  ? 'bg-ink-700 text-white hover:bg-ink-800'
                  : 'bg-white/12 text-white ring-1 ring-white/25 hover:bg-white/20'
              }`}
            >
              Portfolio
              <FiExternalLink className="h-3.5 w-3.5" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className={`grid h-11 w-11 place-items-center rounded-full transition-colors lg:hidden ${
                scrolled ? 'text-ink-900 hover:bg-paper-200' : 'text-white hover:bg-white/10'
              }`}
            >
              {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 z-40 border-b border-paper-300 bg-white/95 backdrop-blur-xl lg:hidden"
            style={{ top: 'var(--nav-height)' }}
          >
            <nav className="container-page grid grid-cols-2 gap-1 py-4 sm:grid-cols-3" aria-label="Sections">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium transition-colors ${
                    active === item.id
                      ? 'bg-paper-200 text-ink-900'
                      : 'text-slateink-700 hover:bg-paper-100'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Active requirement filter banner — floats above the fold line so the
          user always knows why parts of the page are dimmed. */}
      <AnimatePresence>
        {activeReq ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
            className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-4"
          >
            <div className="pointer-events-auto flex max-w-full items-center gap-3 rounded-full border border-ink-700/15 bg-ink-900/95 py-2 pl-4 pr-2 text-white shadow-lift backdrop-blur">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden />
              <span className="truncate text-[13px]">
                Filtering by{' '}
                <strong className="font-semibold text-amber-500">
                  {requirementById[activeReq].short}
                </strong>
              </span>
              <button
                type="button"
                onClick={clear}
                className="inline-flex min-h-[36px] shrink-0 items-center rounded-full bg-white/10 px-3.5 text-xs font-semibold transition-colors hover:bg-white/20"
              >
                Clear
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
