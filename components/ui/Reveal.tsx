'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks';

interface RevealProps {
  children: ReactNode;
  /** Stagger index — multiplied by 60ms to offset siblings. */
  index?: number;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article' | 'span';
}

/**
 * Scroll-triggered entrance. `once` means an element animates a single time —
 * re-animating on every scroll-by reads as twitchy rather than polished.
 * Motion collapses to a plain fade-free render when the OS asks for less.
 */
export function Reveal({
  children,
  index = 0,
  delay = 0,
  y = 18,
  className,
  as = 'div',
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{
        duration: 0.55,
        delay: delay + index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
