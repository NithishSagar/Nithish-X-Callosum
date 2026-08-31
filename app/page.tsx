'use client';

import { HighlightProvider } from '@/lib/highlight';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Role } from '@/components/Role';
import { Work } from '@/components/Work';
import { Mapping } from '@/components/Mapping';
import { Perspective } from '@/components/Perspective';
import { Skills } from '@/components/Skills';
import { Journey } from '@/components/Journey';
import { GitHubSection } from '@/components/GitHubSection';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

/**
 * Section order is the argument, in sequence:
 *   who I am → what the role needs → what I built → how those two meet →
 *   why I think this way → the tools → the path → the code → the ask.
 *
 * HighlightProvider wraps the whole page because the requirement filter set in
 * <Role> has to reach <Work> and <Mapping> further down.
 */
export default function Page() {
  return (
    <HighlightProvider>
      <Nav />
      <main>
        <Hero />
        <About />
        <Role />
        <Work />
        <Mapping />
        <Perspective />
        <Skills />
        <Journey />
        <GitHubSection />
        <Contact />
      </main>
      <Footer />
    </HighlightProvider>
  );
}
