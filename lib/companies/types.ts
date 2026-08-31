/**
 * The contract every company config satisfies.
 *
 * Components import only from lib/data.ts, which re-exports whichever company
 * is selected at build time. Adding a company therefore means writing one file
 * that satisfies CompanyConfig — no component changes.
 */

/**
 * A requirement's id. Each company defines its own set, so this cannot be a
 * fixed union any more. lib/validate.ts enforces in development that every
 * id a project claims actually exists, which is the check the union used to
 * give us for free.
 */
export type RequirementId = string;

export interface Requirement {
  id: RequirementId;
  short: string;
  title: string;
  jd: string;
  /** How I read the requirement — what it is really asking for. */
  reading: string;
  icon: string;
}

export interface Metric {
  label: string;
  /** Numeric target for the count-up animation. */
  value: number;
  /** Rendered before / after the animated number. */
  prefix?: string;
  suffix?: string;
  /** Optional "from" value, e.g. 450ms → 100ms. */
  from?: number;
  fromSuffix?: string;
  /** The conditions the number was measured under. */
  context?: string;
}

export interface SeriesPoint {
  x: number;
  y: number;
  /** Symmetric error bar half-height. Omit only where none was measured. */
  err?: number;
}

export interface ChartSeries {
  name: string;
  points: SeriesPoint[];
  /** A reference series is drawn as a flat band across the plot, not a line. */
  reference?: boolean;
}

export interface LineChartSpec {
  kind: 'line';
  title: string;
  xLabel: string;
  yLabel: string;
  /** X positions are ordinal: 1, 5, 10, 50 spaced evenly rather than to scale. */
  ticks: number[];
  series: ChartSeries[];
  note?: string;
}

export interface BarChartSpec {
  kind: 'bar';
  title: string;
  xLabel: string;
  bars: { label: string; value: number; emphasis?: boolean }[];
  note?: string;
}

export type ChartSpec = LineChartSpec | BarChartSpec;

export interface Project {
  id: string;
  index: number;
  title: string;
  kicker: string;
  period: string;
  lens: string;
  summary: string;
  problem: string;
  solution: string[];
  results: string[];
  learning: string;
  metrics: Metric[];
  stack: string[];
  requirementIds: RequirementId[];
  /** Rendered as an architecture strip inside the expanded card. */
  architecture: string[];
  link?: { label: string; href: string };
  /**
   * 'research' switches the card to its academic variant: a status badge,
   * question/method/findings labels instead of constraint/approach/results,
   * and an embedded chart panel.
   */
  kind?: 'system' | 'research';
  /** Publication status, shown as a badge on research cards. */
  status?: string;
  charts?: ChartSpec[];
  /** Research-only: why the methodology transfers to Callosum's problem. */
  whyItMatters?: string[];
  /** An honest caveat about what this project does *not* evidence. */
  note?: string;
}

export interface MappingRow {
  requirementId: RequirementId;
  evidenceTitle: string;
  evidence: string;
  proof: string;
  projectId: string;
}

export interface SkillGroup {
  title: string;
  icon: string;
  note: string;
  skills: { name: string; level: number; note?: string }[];
}

export interface TimelineItem {
  period: string;
  title: string;
  org: string;
  text: string;
  tags: string[];
  highlight?: boolean;
}

export interface Repo {
  name: string;
  description: string;
  tags: string[];
  featured?: boolean;
  /** Direct link. Falls back to the profile's repository list when absent. */
  url?: string;
}

export interface JourneyPhase {
  phase: string;
  period: string;
  focus: string;
  built?: readonly string[];
  learned?: string;
  /** What the phase could not teach — the reason the next one exists. */
  gap?: string;
  goal?: string;
  willLearn?: readonly string[];
  willContribute?: readonly { when: string; what: string }[];
  /** The final, forward-looking phase renders differently. */
  future?: boolean;
}

export interface Perspective {
  title: string;
  lede: string;
  quote: string;
  quoteNote: string;
  body: readonly { heading: string; text: string }[];
  loop: readonly { step: string; text: string }[];
}

export interface Profile {
  name: string;
  target: string;
  role: string;
  tagline: string;
  pitch: string;
  email: string;
  github: string;
  portfolio: string;
  linkedin: string;
  location: string;
  /** Not currently rendered anywhere; kept for future use. */
  availability?: string;
  education: { degree: string; school: string; start: string };
  summary: readonly string[];
  repoCount: number;
  coreMetrics: readonly Metric[];
}

export interface NavItem {
  id: string;
  label: string;
}

export interface GitHubStat {
  label: string;
  value: number;
  suffix?: string;
}

/** Everything a company config must provide for the page to render. */
export interface CompanyConfig {
  /** Matches the key in the registry and the NEXT_PUBLIC_COMPANY value. */
  key: string;
  /** Full name, e.g. 'Callosum Applied AI'. Browser tab, hero, footer. */
  companyName: string;
  /** Short name for tight spots, e.g. 'Callosum'. Nav wordmark, inline copy. */
  companyShort: string;
  /** Closing paragraph in the contact section — company-specific by nature. */
  contactPitch: string;
  profile: Profile;
  requirements: readonly Requirement[];
  projects: readonly Project[];
  mapping: readonly MappingRow[];
  perspective: Perspective;
  skillGroups: readonly SkillGroup[];
  coreCompetencies: readonly string[];
  timeline: readonly TimelineItem[];
  repos: readonly Repo[];
  githubStats: readonly GitHubStat[];
  navItems: readonly NavItem[];
}
