'use client';

import { HighlightProvider } from '@/lib/highlight';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Role } from '@/components/Role';
import { Work } from '@/components/Work';
import { Mapping } from '@/components/Mapping';
import { Perspective } from '@/components/Perspective';
import { LearningJourney } from '@/components/LearningJourney';
import { ReadyToLearn } from '@/components/ReadyToLearn';
import { Skills } from '@/components/Skills';
import { Journey } from '@/components/Journey';
import { GitHubSection } from '@/components/GitHubSection';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

/**
 * Section order is the argument, in sequence:
 *   who I am → what the role needs → what I built → how those two meet →
 *   why I think this way → how I learn → the tools → what I still lack →
 *   the path → the code → the ask.
 *
 * Learning Journey and Ready To Learn sit on either side of Skills on purpose:
 * the journey is retrospective, the gaps are prospective, and the current
 * skill set is the honest thing between them.
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
        <LearningJourney />
        <Skills />
        <ReadyToLearn />
        <Journey />
        <GitHubSection />
        <Contact />
      </main>
      <Footer />
    </HighlightProvider>
  );
}
