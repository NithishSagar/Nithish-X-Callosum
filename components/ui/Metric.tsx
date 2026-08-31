'use client';

import { useCountUp } from '@/lib/hooks';
import type { Metric as MetricType } from '@/lib/data';

interface MetricProps {
  metric: MetricType;
  tone?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

const sizes = {
  sm: 'text-2xl sm:text-[1.75rem]',
  md: 'text-3xl sm:text-4xl',
  lg: 'text-4xl sm:text-5xl',
  // Four-up hero strip: steps down between sm and lg, where the track is
  // narrowest. Grid's default minmax(auto, 1fr) widens a track to fit its
  // content, so an oversized value here would push the page into scroll.
  hero: 'text-2xl sm:text-3xl lg:text-4xl',
};

/**
 * A metric that counts up when scrolled into view. Where a `from` value exists
 * the "before" number is shown struck through beside it — the delta is the
 * point, and a bare "<100ms" hides the work that produced it.
 */
export function Metric({ metric, tone = 'light', size = 'md' }: MetricProps) {
  const { ref, value } = useCountUp(metric.value, { from: 0 });
  const dark = tone === 'dark';
  const display = Math.round(value).toLocaleString('en-GB');

  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span
          ref={ref}
          className={`font-display font-bold tabular-nums tracking-tight ${sizes[size]} ${
            dark ? 'text-white' : 'text-ink-700'
          }`}
        >
          {metric.prefix}
          {display}
          {metric.suffix}
        </span>
        {metric.from !== undefined ? (
          <span
            className={`text-xs font-medium line-through decoration-2 ${
              dark ? 'text-paper-300/60 decoration-amber-500/70' : 'text-slateink-300 decoration-amber-500/70'
            }`}
            title="Before"
          >
            was {metric.from.toLocaleString('en-GB')}
            {metric.fromSuffix ?? metric.suffix}
          </span>
        ) : null}
      </div>
      <p
        className={`mt-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] ${
          dark ? 'text-paper-300/80' : 'text-slateink-500'
        }`}
      >
        {metric.label}
      </p>
      {metric.context ? (
        <p className={`mt-1 text-[11px] ${dark ? 'text-paper-300/55' : 'text-slateink-300'}`}>
          {metric.context}
        </p>
      ) : null}
    </div>
  );
}
