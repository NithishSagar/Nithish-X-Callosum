'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { RequirementId } from './data';

/**
 * Cross-section highlighting.
 *
 * Selecting a Callosum requirement anywhere on the page dims everything that
 * does not carry that id and lifts everything that does. One piece of state
 * drives the Role cards, the project cards, the mapping matrix, and the nav
 * banner — so the "evidence for this requirement" question is answerable
 * without scrolling around hunting for it.
 */

interface HighlightState {
  /** Currently pinned requirement, or null when nothing is selected. */
  active: RequirementId | null;
  /** Hover preview — softer than a pin, cleared on mouse-out. */
  hovered: RequirementId | null;
  /** The id that should currently drive visuals (pin wins over hover). */
  effective: RequirementId | null;
  toggle: (id: RequirementId) => void;
  setHovered: (id: RequirementId | null) => void;
  clear: () => void;
  /** True when the given ids are dimmed by the current selection. */
  isDimmed: (ids: readonly RequirementId[]) => boolean;
  /** True when the given ids are lifted by the current selection. */
  isLit: (ids: readonly RequirementId[]) => boolean;
}

const HighlightContext = createContext<HighlightState | null>(null);

export function HighlightProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<RequirementId | null>(null);
  const [hovered, setHovered] = useState<RequirementId | null>(null);

  const toggle = useCallback((id: RequirementId) => {
    setActive((current) => (current === id ? null : id));
  }, []);

  const clear = useCallback(() => setActive(null), []);

  const value = useMemo<HighlightState>(() => {
    const effective = active ?? hovered;
    return {
      active,
      hovered,
      effective,
      toggle,
      setHovered,
      clear,
      // Nothing selected means nothing is dimmed — the default state is neutral.
      isDimmed: (ids) => effective !== null && !ids.includes(effective),
      isLit: (ids) => effective !== null && ids.includes(effective),
    };
  }, [active, hovered, toggle, clear]);

  return <HighlightContext.Provider value={value}>{children}</HighlightContext.Provider>;
}

export function useHighlight(): HighlightState {
  const ctx = useContext(HighlightContext);
  if (!ctx) throw new Error('useHighlight must be used inside <HighlightProvider>');
  return ctx;
}
