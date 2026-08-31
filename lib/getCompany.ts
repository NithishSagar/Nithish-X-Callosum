import type { CompanyConfig } from './companies/types';
import callosum from './companies/callosum';
import ineffable from './companies/ineffable';
import { DEFAULT_COMPANY, type CompanyKey } from './companies';

/**
 * Which company this build is for.
 *
 * `process.env.NEXT_PUBLIC_COMPANY` is replaced with a string literal at build
 * time, so the comparisons below fold to a constant and the bundler drops the
 * configs that lost. Indexing a registry by a variable key would defeat that
 * and ship every company's copy to every visitor.
 *
 * Deliberately synchronous: lib/data.ts is imported by client components, and
 * a top-level `await` there does not compile.
 */
function selectCompany(): CompanyConfig {
  if (process.env.NEXT_PUBLIC_COMPANY === 'ineffable') return ineffable;
  if (process.env.NEXT_PUBLIC_COMPANY === 'callosum') return callosum;
  return callosum;
}

export const activeCompany: CompanyConfig = selectCompany();

export const companyKey = activeCompany.key as CompanyKey;

export { DEFAULT_COMPANY };
export type { CompanyKey };
