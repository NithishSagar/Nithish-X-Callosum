import type { CompanyConfig } from './types';
import callosum from './callosum';
import ineffable from './ineffable';
import scope from './scope';

/**
 * Every company this codebase can build as.
 *
 * Static imports rather than dynamic `import()`: NEXT_PUBLIC_COMPANY is a
 * build-time constant, so there is nothing to defer, and a client component
 * cannot await a module at the top level anyway. Selection happens in
 * lib/getCompany.ts, where an explicit `===` chain lets the bundler drop the
 * configs that were not chosen.
 */
export const companies = {
  callosum,
  ineffable,
  scope,
  // Adding a company: write lib/companies/<name>.ts satisfying CompanyConfig,
  // add it here, then add a branch to selectCompany() in lib/getCompany.ts.
} satisfies Record<string, CompanyConfig>;

export type CompanyKey = keyof typeof companies;

export const companyKeys = Object.keys(companies) as CompanyKey[];

export const DEFAULT_COMPANY: CompanyKey = 'callosum';
