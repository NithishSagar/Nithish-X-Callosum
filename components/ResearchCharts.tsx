'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { BarChartSpec, ChartSpec, LineChartSpec } from '@/lib/data';
import { usePrefersReducedMotion } from '@/lib/hooks';

/**
 * Research figures, drawn as hand-authored SVG.
 *
 * A charting library would add roughly 100kB to a 147kB bundle for two static
 * figures, and none of them draw error bars without custom work anyway. Doing
 * it directly keeps the palette identical to the rest of the page and puts the
 * error bars — the part that carries the credibility — under exact control.
 */

const PALETTE = {
  primary: '#1F4E78', // DAgger — the result being argued for
  secondary: '#6B7A91', // Behavioural cloning — the comparison
  reference: '#FF9F43', // Expert baseline — the target to beat
  grid: '#EAEDF2',
  axis: '#A7B1C0',
  text: '#44546A',
  muted: '#6B7A91',
};

export function ResearchCharts({ charts }: { charts: ChartSpec[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {charts.map((chart) =>
        chart.kind === 'line' ? (
          <LineChart key={chart.title} spec={chart} />
        ) : (
          <BarChart key={chart.title} spec={chart} />
        ),
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared frame                                                        */
/* ------------------------------------------------------------------ */

function Figure({
  title,
  note,
  children,
  legend,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
  legend?: React.ReactNode;
}) {
  return (
    <figure className="rounded-xl border border-paper-200 bg-white p-4 sm:p-5">
      <figcaption className="mb-3">
        <h5 className="font-display text-[13px] font-semibold text-ink-900">{title}</h5>
      </figcaption>

      {/* Charts keep a legible minimum width and scroll rather than shrink
          their labels into illegibility on narrow screens. */}
      <div className="rail -mx-1 overflow-x-auto px-1">
        <div className="min-w-[440px]">{children}</div>
      </div>

      {legend}

      {note ? (
        <p className="mt-3 border-t border-paper-200 pt-3 text-[11px] leading-relaxed text-slateink-500">
          {note}
        </p>
      ) : null}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Line chart with error bars                                          */
/* ------------------------------------------------------------------ */

const W = 600;
const H = 340;
const PAD = { top: 20, right: 20, bottom: 50, left: 62 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;
const INSET = 26; // keeps end-of-axis error bars off the frame

interface Hovered {
  series: string;
  index: number;
}

function LineChart({ spec }: { spec: LineChartSpec }) {
  const [hovered, setHovered] = useState<Hovered | null>(null);
  const reduced = usePrefersReducedMotion();

  const plotted = spec.series.filter((s) => !s.reference);
  const reference = spec.series.find((s) => s.reference);

  // Domain covers every error bar, not just every mean — clipping a whisker
  // would understate exactly the uncertainty the figure exists to show.
  const values: number[] = [];
  for (const series of spec.series) {
    for (const point of series.points) {
      values.push(point.y + (point.err ?? 0), point.y - (point.err ?? 0));
    }
  }
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const pad = (rawMax - rawMin) * 0.08;
  const yMin = rawMin - pad;
  // Don't let the padding push the axis across zero when every value is
  // negative — a return axis running into positive territory reads as if
  // positive returns were possible here, and wastes the plot area.
  const yMax = rawMax <= 0 ? Math.min(rawMax + pad, 0) : rawMax + pad;

  const x = (tickIndex: number) =>
    PAD.left + INSET + (tickIndex * (PLOT_W - INSET * 2)) / Math.max(spec.ticks.length - 1, 1);
  const y = (value: number) => PAD.top + ((yMax - value) / (yMax - yMin)) * PLOT_H;

  const gridValues = Array.from({ length: 5 }, (_, i) => yMin + ((yMax - yMin) * i) / 4);

  const colourFor = (name: string, i: number) =>
    i === 0 ? PALETTE.primary : i === 1 ? PALETTE.secondary : PALETTE.muted;

  return (
    <Figure
      title={spec.title}
      note={spec.note}
      legend={
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
          {plotted.map((series, i) => (
            <li key={series.name} className="flex items-center gap-1.5 text-[11px] text-slateink-700">
              <span
                aria-hidden
                className="h-0.5 w-4 rounded-full"
                style={{ backgroundColor: colourFor(series.name, i) }}
              />
              {series.name}
            </li>
          ))}
          {reference ? (
            <li className="flex items-center gap-1.5 text-[11px] text-slateink-700">
              <span
                aria-hidden
                className="h-0.5 w-4 rounded-full"
                style={{
                  backgroundImage: `repeating-linear-gradient(to right, ${PALETTE.reference} 0 4px, transparent 4px 7px)`,
                }}
              />
              {reference.name}
            </li>
          ) : null}
        </ul>
      }
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={`${spec.title}. ${spec.note ?? ''}`}
        onMouseLeave={() => setHovered(null)}
      >
        <title>{spec.title}</title>

        {/* Horizontal gridlines + y tick labels */}
        {gridValues.map((value) => (
          <g key={value}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(value)}
              y2={y(value)}
              stroke={PALETTE.grid}
              strokeWidth={1}
            />
            <text
              x={PAD.left - 10}
              y={y(value) + 4}
              textAnchor="end"
              fontSize={11}
              fill={PALETTE.axis}
            >
              {Math.round(value)}
            </text>
          </g>
        ))}

        {/* Expert baseline: band for its error, dashed line for its mean */}
        {reference?.points[0] ? (
          <g>
            {reference.points[0].err !== undefined ? (
              <rect
                x={PAD.left}
                width={PLOT_W}
                y={y(reference.points[0].y + reference.points[0].err)}
                height={
                  y(reference.points[0].y - reference.points[0].err) -
                  y(reference.points[0].y + reference.points[0].err)
                }
                fill={PALETTE.reference}
                opacity={0.1}
              />
            ) : null}
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(reference.points[0].y)}
              y2={y(reference.points[0].y)}
              stroke={PALETTE.reference}
              strokeWidth={1.5}
              strokeDasharray="5 4"
            />
          </g>
        ) : null}

        {/* Axes */}
        <line
          x1={PAD.left}
          x2={PAD.left}
          y1={PAD.top}
          y2={PAD.top + PLOT_H}
          stroke={PALETTE.axis}
          strokeWidth={1}
        />
        <line
          x1={PAD.left}
          x2={W - PAD.right}
          y1={PAD.top + PLOT_H}
          y2={PAD.top + PLOT_H}
          stroke={PALETTE.axis}
          strokeWidth={1}
        />

        {/* X ticks */}
        {spec.ticks.map((tick, i) => (
          <text
            key={tick}
            x={x(i)}
            y={PAD.top + PLOT_H + 20}
            textAnchor="middle"
            fontSize={11}
            fill={PALETTE.axis}
          >
            {tick}
          </text>
        ))}

        {/* Axis titles */}
        <text
          x={PAD.left + PLOT_W / 2}
          y={H - 10}
          textAnchor="middle"
          fontSize={11}
          fontWeight={600}
          fill={PALETTE.text}
        >
          {spec.xLabel}
        </text>
        <text
          transform={`rotate(-90 14 ${PAD.top + PLOT_H / 2})`}
          x={14}
          y={PAD.top + PLOT_H / 2}
          textAnchor="middle"
          fontSize={11}
          fontWeight={600}
          fill={PALETTE.text}
        >
          {spec.yLabel}
        </text>

        {/* Series */}
        {plotted.map((series, seriesIndex) => {
          const colour = colourFor(series.name, seriesIndex);
          const path = series.points
            .map((point, i) => {
              const tickIndex = spec.ticks.indexOf(point.x);
              return `${i === 0 ? 'M' : 'L'} ${x(tickIndex === -1 ? i : tickIndex)} ${y(point.y)}`;
            })
            .join(' ');

          return (
            <g key={series.name}>
              <motion.path
                d={path}
                fill="none"
                stroke={colour}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reduced ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: seriesIndex * 0.15, ease: [0.22, 1, 0.36, 1] }}
              />

              {series.points.map((point, i) => {
                const tickIndex = spec.ticks.indexOf(point.x);
                const px = x(tickIndex === -1 ? i : tickIndex);
                const py = y(point.y);
                const isHovered = hovered?.series === series.name && hovered.index === i;
                const err = point.err ?? 0;

                return (
                  <motion.g
                    key={point.x}
                    initial={reduced ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 + seriesIndex * 0.15 + i * 0.05 }}
                  >
                    {/* Error bar: stem plus caps */}
                    {err > 0 ? (
                      <g stroke={colour} strokeWidth={1.25} opacity={0.75}>
                        <line x1={px} x2={px} y1={y(point.y - err)} y2={y(point.y + err)} />
                        <line x1={px - 4} x2={px + 4} y1={y(point.y + err)} y2={y(point.y + err)} />
                        <line x1={px - 4} x2={px + 4} y1={y(point.y - err)} y2={y(point.y - err)} />
                      </g>
                    ) : null}

                    <circle
                      cx={px}
                      cy={py}
                      r={isHovered ? 5 : 3.5}
                      fill="#FFFFFF"
                      stroke={colour}
                      strokeWidth={2}
                      style={{ transition: 'r 120ms ease' }}
                    />

                    {/* Generous invisible hit area — 3.5px targets are unusable */}
                    <circle
                      cx={px}
                      cy={py}
                      r={16}
                      fill="transparent"
                      onMouseEnter={() => setHovered({ series: series.name, index: i })}
                      onFocus={() => setHovered({ series: series.name, index: i })}
                      tabIndex={0}
                      role="button"
                      aria-label={`${series.name}, ${point.x} demonstrations: ${point.y.toFixed(1)} ± ${err}`}
                      style={{ cursor: 'pointer', outline: 'none' }}
                    />
                  </motion.g>
                );
              })}
            </g>
          );
        })}

        {/* Tooltip */}
        {hovered
          ? (() => {
              const series = plotted.find((s) => s.name === hovered.series);
              const point = series?.points[hovered.index];
              if (!series || !point) return null;
              const tickIndex = spec.ticks.indexOf(point.x);
              const px = x(tickIndex === -1 ? hovered.index : tickIndex);
              const py = y(point.y);
              const boxW = 150;
              const boxH = 44;
              // Flip to the left of the point when close to the right edge.
              const bx = px + boxW + 14 > W ? px - boxW - 12 : px + 12;
              const by = Math.min(Math.max(py - boxH / 2, PAD.top), PAD.top + PLOT_H - boxH);

              return (
                <g pointerEvents="none">
                  <rect
                    x={bx}
                    y={by}
                    width={boxW}
                    height={boxH}
                    rx={6}
                    fill="#0B1F33"
                    opacity={0.95}
                  />
                  <text x={bx + 10} y={by + 17} fontSize={11} fontWeight={600} fill="#FFFFFF">
                    {series.name}
                  </text>
                  <text x={bx + 10} y={by + 33} fontSize={11} fill="#A7B1C0">
                    {point.x} demo{point.x === 1 ? '' : 's'} · {point.y.toFixed(1)}
                    {point.err ? ` ± ${point.err}` : ''}
                  </text>
                </g>
              );
            })()
          : null}
      </svg>
    </Figure>
  );
}

/* ------------------------------------------------------------------ */
/* Horizontal bar chart                                                */
/* ------------------------------------------------------------------ */

const BAR_W = 600;
const BAR_LABEL_W = 130;
const BAR_PAD = { top: 12, right: 56, bottom: 40 };

function BarChart({ spec }: { spec: BarChartSpec }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const reduced = usePrefersReducedMotion();

  const rowHeight = 42;
  const height = BAR_PAD.top + spec.bars.length * rowHeight + BAR_PAD.bottom;
  const trackW = BAR_W - BAR_LABEL_W - BAR_PAD.right;
  const max = Math.max(...spec.bars.map((b) => b.value));

  return (
    <Figure title={spec.title} note={spec.note}>
      <svg
        viewBox={`0 0 ${BAR_W} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-label={`${spec.title}. ${spec.note ?? ''}`}
        onMouseLeave={() => setHovered(null)}
      >
        <title>{spec.title}</title>

        {spec.bars.map((bar, i) => {
          const barY = BAR_PAD.top + i * rowHeight;
          const width = (bar.value / max) * trackW;
          const colour = bar.emphasis ? PALETTE.reference : PALETTE.primary;
          const isHovered = hovered === i;

          return (
            <g
              key={bar.label}
              onMouseEnter={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              tabIndex={0}
              role="button"
              aria-label={`${bar.label}: performance swing ${bar.value}`}
              style={{ cursor: 'default', outline: 'none' }}
            >
              {/* Row hit area */}
              <rect
                x={0}
                y={barY - 4}
                width={BAR_W}
                height={rowHeight}
                fill={isHovered ? '#F5F6F8' : 'transparent'}
                rx={4}
              />

              <text
                x={BAR_LABEL_W - 12}
                y={barY + 20}
                textAnchor="end"
                fontSize={12}
                fontWeight={bar.emphasis ? 700 : 500}
                fill={bar.emphasis ? '#0B1F33' : PALETTE.text}
              >
                {bar.label}
              </text>

              {/* Track */}
              <rect
                x={BAR_LABEL_W}
                y={barY + 5}
                width={trackW}
                height={20}
                rx={4}
                fill={PALETTE.grid}
                opacity={0.6}
              />

              <motion.rect
                x={BAR_LABEL_W}
                y={barY + 5}
                height={20}
                rx={4}
                fill={colour}
                opacity={isHovered ? 1 : 0.9}
                initial={reduced ? false : { width: 0 }}
                whileInView={{ width }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              />

              <text
                x={BAR_LABEL_W + width + 8}
                y={barY + 20}
                fontSize={12}
                fontWeight={700}
                fill={bar.emphasis ? '#0B1F33' : PALETTE.text}
              >
                {bar.value}
              </text>
            </g>
          );
        })}

        <text
          x={BAR_LABEL_W + trackW / 2}
          y={height - 12}
          textAnchor="middle"
          fontSize={11}
          fontWeight={600}
          fill={PALETTE.text}
        >
          {spec.xLabel}
        </text>
      </svg>
    </Figure>
  );
}
