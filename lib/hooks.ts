'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * useLayoutEffect warns during server rendering. On the server there is no
 * layout to read, so fall back to useEffect there and keep the pre-paint
 * timing where it matters — the client.
 */
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Tracks which section is currently in view so the nav can show an active
 * indicator. Uses IntersectionObserver rather than scroll maths — no listener
 * running on every frame, and the browser does the work off the main thread.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Track ratios per-section and pick the most visible one. A single
    // "first intersecting entry wins" rule flickers badly on fast scrolls.
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best: string | null = null;
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        if (best) setActive(best);
      },
      {
        // Bias the viewport upward so a section counts as "active" once its
        // heading area is comfortably on screen, not when its footer is.
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.15, 0.35, 0.6, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/** True once the user has scrolled past `offset` pixels. */
export function useScrolled(offset = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);

  return scrolled;
}

/** Respects the OS "reduce motion" setting so animations can be switched off. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/**
 * Counts from `from` to `to` once the element enters the viewport, with an
 * ease-out curve so the number decelerates into its final value.
 * Returns a ref to attach and the current display value.
 */
export function useCountUp(to: number, options: { from?: number; duration?: number } = {}) {
  const { from = 0, duration = 1400 } = options;
  const ref = useRef<HTMLSpanElement | null>(null);
  // Seed with the final value so server-rendered HTML — and anyone without
  // JavaScript — reads the real number rather than a placeholder zero.
  const [value, setValue] = useState(to);
  const reduced = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      setValue(to);
      return;
    }

    let frame = 0;
    let start: number | null = null;

    // Rewind to the starting value in a layout effect, before the browser
    // paints, so the final number never flashes on screen first.
    setValue(from);

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();

        const tick = (now: number) => {
          if (start === null) start = now;
          const elapsed = now - start;
          const t = Math.min(elapsed / duration, 1);
          // easeOutCubic
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(from + (to - from) * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, from, duration, reduced]);

  return { ref, value };
}
