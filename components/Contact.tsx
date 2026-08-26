'use client';

import { useState } from 'react';
import { FiMail, FiGithub, FiLinkedin, FiExternalLink, FiSend } from 'react-icons/fi';
import { profile } from '@/lib/data';
import { Reveal } from './ui/Reveal';

const links = [
  { label: 'GitHub', href: profile.github, icon: FiGithub, handle: 'NithishSagar' },
  { label: 'Portfolio', href: profile.portfolio, icon: FiExternalLink, handle: 'nithish-portfolio' },
  { label: 'LinkedIn', href: profile.linkedin, icon: FiLinkedin, handle: 'nithish-sagar' },
];

/**
 * Contact.
 *
 * The form composes a mailto: rather than posting to an API. This site is
 * fully static, and a form that silently drops messages is worse than no form
 * — this one hands the draft to the sender's own mail client, where they can
 * see it leave.
 */
export function Contact() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const mailto = () => {
    const subject = encodeURIComponent(
      `Callosum · Applied AI — ${name ? `from ${name}` : 'message from your portfolio'}`,
    );
    const body = encodeURIComponent(message + (name ? `\n\n— ${name}` : ''));
    return `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="gradient-ink relative isolate overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[20%] top-[-30%] h-[500px] w-[500px] animate-drift rounded-full bg-ink-600/30 blur-[130px]" />
        <div className="absolute bottom-[-30%] right-[5%] h-[420px] w-[420px] animate-drift-slow rounded-full bg-amber-500/15 blur-[130px]" />
      </div>

      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          {/* Pitch */}
          <div>
            <Reveal>
              <p className="eyebrow text-amber-500">
                <span className="inline-block h-px w-6 bg-amber-500/70" aria-hidden />
                Let&rsquo;s talk
              </p>
              <h2 className="mt-4 text-balance font-display text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                Let&rsquo;s build the next generation of{' '}
                <span className="text-amber-500">AI infrastructure.</span>
              </h2>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-paper-300 sm:text-lg">
                I have spent four systems learning that the constraint you did not model
                is the one that decides your latency. I would like to spend the next few
                years applying that to heterogeneous compute, at Callosum.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent('Callosum · Applied AI — Member of Technical Staff')}`}
                className="group mt-9 inline-flex items-center gap-3 rounded-full bg-amber-500 px-6 py-4 text-sm font-semibold text-ink-900 shadow-glow transition-transform duration-200 hover:-translate-y-0.5 hover:bg-amber-400"
              >
                <FiMail className="h-4 w-4" />
                {profile.email}
              </a>
            </Reveal>

            <Reveal delay={0.16}>
              <ul className="mt-9 grid gap-2.5 sm:grid-cols-3">
                {links.map(({ label, href, icon: LinkIcon, handle }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-colors duration-200 hover:border-amber-500/40 hover:bg-white/[0.08]"
                    >
                      <LinkIcon className="h-4 w-4 shrink-0 text-amber-500" aria-hidden />
                      <span className="min-w-0">
                        <span className="block text-[13px] font-semibold text-white">{label}</span>
                        <span className="block truncate text-[11px] text-paper-300/70">
                          {handle}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Message composer */}
          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm sm:p-7">
              <h3 className="font-display text-lg font-semibold text-white">Send me a message</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-paper-300/80">
                This opens your own mail client with the draft ready — nothing is posted
                to a server you cannot see.
              </p>

              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = mailto();
                }}
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-paper-300/80"
                  >
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    autoComplete="name"
                    className="mt-2 w-full rounded-xl border border-white/12 bg-ink-900/40 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-amber-500/60 focus:outline-none focus:ring-1 focus:ring-amber-500/40"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-paper-300/80"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="Tell me about the workload you are trying to place on the right silicon…"
                    className="mt-2 w-full resize-y rounded-xl border border-white/12 bg-ink-900/40 px-4 py-3 text-sm leading-relaxed text-white placeholder:text-white/25 focus:border-amber-500/60 focus:outline-none focus:ring-1 focus:ring-amber-500/40"
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-ink-900 transition-colors duration-200 hover:bg-amber-500"
                >
                  Compose email
                  <FiSend className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
