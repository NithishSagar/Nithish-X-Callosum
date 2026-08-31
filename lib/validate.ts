import type { CompanyConfig } from './companies/types';

/**
 * Runtime invariant checks.
 *
 * RequirementId used to be a fixed union, so TypeScript caught a project
 * claiming a requirement that did not exist. Per-company ids make that
 * impossible to express in the type system, so the same guarantees are checked
 * here instead — loudly in development, silently skipped in production.
 *
 * The three invariants that actually matter:
 *   1. Every requirementId a project or mapping row claims must exist.
 *   2. `mapping` must be 1:1 with `requirements` — Mapping.tsx keys its
 *      connector endpoints by requirementId, so a duplicate would overwrite a
 *      ref and attach a connector to the wrong card.
 *   3. Every requirement needs at least one project, or its Role card renders
 *      "0 systems", which reads as a hole in the argument.
 */
export function validateCompany(config: CompanyConfig): string[] {
  const problems: string[] = [];
  const ids = new Set(config.requirements.map((r) => r.id));

  for (const project of config.projects) {
    for (const id of project.requirementIds) {
      if (!ids.has(id)) {
        problems.push(`project "${project.id}" claims unknown requirement "${id}"`);
      }
    }
  }

  const seen = new Set<string>();
  for (const row of config.mapping) {
    if (!ids.has(row.requirementId)) {
      problems.push(`mapping row claims unknown requirement "${row.requirementId}"`);
    }
    if (seen.has(row.requirementId)) {
      problems.push(
        `mapping has two rows for "${row.requirementId}" — connectors key by id and would collide`,
      );
    }
    seen.add(row.requirementId);

    if (!config.projects.some((p) => p.id === row.projectId)) {
      problems.push(`mapping row "${row.requirementId}" cites unknown project "${row.projectId}"`);
    }
  }

  for (const id of ids) {
    if (!seen.has(id)) problems.push(`requirement "${id}" has no mapping row`);
    if (!config.projects.some((p) => p.requirementIds.includes(id))) {
      problems.push(`requirement "${id}" has no project — its Role card will read "0 systems"`);
    }
  }

  const sectionIds = new Set(config.navItems.map((n) => n.id));
  for (const required of ['about', 'role', 'work', 'mapping', 'contact']) {
    if (!sectionIds.has(required)) problems.push(`navItems is missing "${required}"`);
  }

  return problems;
}

/** Called once from lib/data.ts. No-op outside development. */
export function assertValidCompany(config: CompanyConfig): void {
  if (process.env.NODE_ENV === 'production') return;
  const problems = validateCompany(config);
  if (problems.length > 0) {
    console.error(
      `[company:${config.key}] ${problems.length} config problem(s):\n` +
        problems.map((p) => `  - ${p}`).join('\n'),
    );
  }
}
