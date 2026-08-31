/**
 * The single import surface for every component.
 *
 * Components never import a company file directly — they import from here, and
 * this module re-exports whichever company the build selected. That is what
 * makes the components company-agnostic: retargeting is one env var and one
 * new file in lib/companies/.
 */
import { activeCompany, companyKey } from './getCompany';
import { assertValidCompany } from './validate';
import type { Requirement, RequirementId } from './companies/types';

assertValidCompany(activeCompany);

export const {
  profile,
  requirements,
  projects,
  mapping,
  perspective,
  skillGroups,
  coreCompetencies,
  timeline,
  repos,
  githubStats,
  navItems,
  companyName,
  companyShort,
  contactPitch,
} = activeCompany;

/** Lookup used by the Role, Mapping, and ProjectCard components. */
export const requirementById = Object.fromEntries(
  requirements.map((r) => [r.id, r]),
) as Record<RequirementId, Requirement>;

export const COMPANY = companyKey;

export type {
  BarChartSpec,
  ChartSeries,
  ChartSpec,
  CompanyConfig,
  GitHubStat,
  LineChartSpec,
  MappingRow,
  Metric,
  NavItem,
  Perspective,
  Profile,
  Project,
  Repo,
  Requirement,
  RequirementId,
  SeriesPoint,
  SkillGroup,
  TimelineItem,
} from './companies/types';
