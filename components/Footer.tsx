import { profile } from '@/lib/data';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink-900 py-10">
      <div className="container-page flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-display text-sm font-semibold text-white">
            {profile.name} <span className="text-amber-500">×</span> Callosum Applied AI
          </p>
          <p className="mt-1 text-xs text-paper-300/60">
            Built with Next.js, TypeScript, Tailwind, and Framer Motion. Statically
            rendered — the page you are reading is the demo.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            className="text-paper-300/70 transition-colors hover:text-amber-500"
          >
            GitHub
          </a>
          <a
            href={profile.portfolio}
            target="_blank"
            rel="noreferrer noopener"
            className="text-paper-300/70 transition-colors hover:text-amber-500"
          >
            Portfolio
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-paper-300/70 transition-colors hover:text-amber-500"
          >
            Email
          </a>
          <span className="text-paper-300/40">&copy; {year}</span>
        </div>
      </div>
    </footer>
  );
}
