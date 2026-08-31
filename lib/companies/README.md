# Multi-company template

One codebase, one set of components, several companies. Which one a build renders is
decided by a single environment variable.

```bash
npm run dev                                  # callosum (the default)
NEXT_PUBLIC_COMPANY=ineffable npm run dev    # ineffable
NEXT_PUBLIC_COMPANY=ineffable npm run build  # production build for ineffable
```

## Layout

```
lib/
  companies/
    types.ts       The contract: CompanyConfig + every shape it references
    callosum.ts    Callosum Applied AI    — 5 projects, 7 requirements
    ineffable.ts   Ineffable Intelligence — 4 projects, 5 requirements
    index.ts       Registry + CompanyKey
  getCompany.ts    Build-time selection
  validate.ts      Runtime invariant checks (development only)
  data.ts          The only module components import
```

Components import from `lib/data.ts` and nothing else. That module re-exports whichever
config won, so no component knows which company it is rendering.

## Selection is synchronous, and that matters

`NEXT_PUBLIC_COMPANY` is inlined by the bundler at build time, so `getCompany.ts` uses a
plain `===` chain rather than a dynamic `import()`:

```ts
if (process.env.NEXT_PUBLIC_COMPANY === 'ineffable') return ineffable;
return callosum;
```

Two reasons for this shape and not another:

1. **`lib/data.ts` is imported by `'use client'` components**, so a top-level `await`
   there does not compile. Anything async in the selection path breaks the build.
2. **The comparison folds to a constant**, so the bundler drops the configs that lost.
   Indexing the registry by a variable key (`companies[key]`) would defeat that and ship
   every company's copy to every visitor.

The registry in `index.ts` still exists — it gives `CompanyKey`, the `satisfies` check
that every config matches the contract, and a single place to see what exists. It is just
not the thing that performs the lookup.

Verified rather than assumed:

```bash
NEXT_PUBLIC_COMPANY=ineffable npm run build
grep -rl "Potato Disease Detection" .next/static .next/server   # 0 files
```

## Adding a company

1. Copy `ineffable.ts` to `<name>.ts` and rewrite the content. TypeScript will tell you
   what `CompanyConfig` still needs.
2. Add it to `companies` in `index.ts`.
3. Add one line to `selectCompany()` in `../getCompany.ts`.
4. Create a Vercel project with `NEXT_PUBLIC_COMPANY=<name>`.

No component changes. If a component needs company-specific copy, **add a field to
`CompanyConfig`** rather than a conditional in the component — that is what
`companyName`, `companyShort`, and `contactPitch` exist for. Every hardcoded "Callosum"
in a component was a bug that only surfaced when the second company was added.

## The checks that replaced the type union

`RequirementId` used to be a fixed union, so TypeScript caught a project claiming a
requirement that did not exist. Per-company ids make that impossible to express, so
`../validate.ts` checks the same invariants at runtime and logs them in development:

- every `requirementId` a project or mapping row claims actually exists
- `mapping` is 1:1 with `requirements` — `Mapping.tsx` keys its connector endpoints by
  requirement id, so a duplicate would overwrite a ref and attach a connector to the
  wrong card
- every requirement has at least one project, or its Role card reads "0 systems"
- `navItems` covers the sections that must be reachable

It is a no-op in production.

## Deployment topology

Both sites build the **same branch** and differ only by an environment variable:

| Vercel project | Branch | `NEXT_PUBLIC_COMPANY` |
| --- | --- | --- |
| nithish-x-callosum | `main` | `callosum` (or unset) |
| nithish-x-ineffable | `main` | `ineffable` |

Create the second project from the same GitHub repo, set the variable under
Settings → Environment Variables, and deploy.

A branch per company also works, but costs more than it looks: every shared component fix
then has to be cherry-picked to every branch, which is exactly the duplication this
template exists to remove. Prefer one branch and separate Vercel projects.
