# Multi-company template

One codebase, one set of components, several companies. Which one a build renders is
decided by a single environment variable.

```bash
npm run dev                                  # callosum (the default)
NEXT_PUBLIC_COMPANY=ineffable npm run dev    # ineffable
NEXT_PUBLIC_COMPANY=scope npm run dev        # scope
NEXT_PUBLIC_COMPANY=scope npm run build      # production build for scope
```

## Layout

```
lib/
  companies/
    types.ts       The contract: CompanyConfig + every shape it references
    callosum.ts    Callosum Applied AI    — 5 projects, 7 requirements, ink theme
    ineffable.ts   Ineffable Intelligence — 4 projects, 5 requirements, ink theme
    scope.ts       Scope                  — 4 projects, 4 requirements, framer theme
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
if (process.env.NEXT_PUBLIC_COMPANY === 'scope') return scope;
if (process.env.NEXT_PUBLIC_COMPANY === 'callosum') return callosum;
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

`next.config.mjs` names a default for the variable:

```js
env: { NEXT_PUBLIC_COMPANY: process.env.NEXT_PUBLIC_COMPANY ?? 'callosum' },
```

That line is load-bearing. With the variable unset, Next leaves
`process.env.NEXT_PUBLIC_COMPANY` as a runtime lookup, the comparison cannot fold, and
every config ships. Measured when there were two: 160 kB unset against 153 kB with the
default declared.

Verified rather than assumed, in both directions:

```bash
NEXT_PUBLIC_COMPANY=scope npm run build
grep -rl "Potato Disease Detection" .next/static .next/server   # 0 files
grep -rl "back to the clipboard"    .next/static .next/server   # >0 files
```

## Section copy lives in the config, not the components

Each config carries a `sections: SectionsCopy` block — an eyebrow, title, optional
`titleAccent` (the second, coloured half of the heading) and optional `lede` for each of
the nine sections. `components/ui/Section.tsx` takes one `SectionCopy` and renders it.

This exists because the headings used to be hardcoded. Adding Ineffable shipped a Work
heading reading "Four systems… and one study" above its four projects and no study —
Callosum's copy, rendered on Ineffable's site. A heading that describes the content is
content, so it belongs in the config with the rest.

The same reasoning produced `companyName`, `companyShort`, and `contactPitch`. Every
hardcoded company string in a component was a bug waiting for the second company.

## Theming

`theme?: Theme` on the config picks a design system — `'ink'` (the default) or
`'framer'`. `app/layout.tsx` stamps it on the root element:

```tsx
<html lang="en" data-theme={theme}>
```

`app/globals.css` defines the full palette and type scale as custom properties on
`:root`, then redefines only what changes under `:root[data-theme='framer']`:

| Property | `ink` | `framer` |
| --- | --- | --- |
| `--accent-500` | `255 159 67` (amber) | `96 165 250` (blue) |
| `--hero-size` | `clamp(2.6rem, 7vw, 4.25rem)` | `clamp(3rem, 8.5vw, 5.25rem)` |
| `--section-size` | `clamp(1.875rem, 4vw, 2.75rem)` | `clamp(2rem, 5vw, 3.5rem)` |
| `--section-pad` / `-lg` | `5rem` / `7rem` | `6rem` / `8.5rem` |
| `--body-leading` | `1.55` | `1.65` |

Components reach these through three class hooks — `.hero-title`, `.section-title`,
`.section-pad` — and through Tailwind, whose accent colours are declared as
`rgb(var(--accent-500) / <alpha-value>)` so opacity modifiers like `bg-accent-500/15`
keep working across themes.

Two rules keep this honest:

- **Channels, not colours.** The custom properties hold space-separated RGB channels, not
  `#hex` or `rgb()` strings, because Tailwind's `<alpha-value>` substitution needs the
  channels on their own.
- **No colour gets its only definition inside a `[data-theme]` block.** Bare `:root`
  defines everything; the theme block only overrides. A config with no `theme` field
  renders correctly.

Adding a theme is a new `:root[data-theme='…']` block plus a value on `Theme` in
`types.ts`. It is not a component change.

## Adding a company

1. Copy the closest existing config to `<name>.ts` and rewrite the content. TypeScript
   will tell you what `CompanyConfig` still needs — including `sections`.
2. Add it to `companies` in `index.ts`.
3. Add one line to `selectCompany()` in `../getCompany.ts`.
4. Pick a `theme`, or leave it off for `'ink'`.
5. Create a Vercel project with `NEXT_PUBLIC_COMPANY=<name>`.

No component changes. If a component needs company-specific copy, **add a field to
`CompanyConfig`** rather than a conditional in the component.

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

Every site builds the **same branch** and differs only by an environment variable:

| Vercel project | Branch | `NEXT_PUBLIC_COMPANY` |
| --- | --- | --- |
| nithish-x-callosum | `main` | `callosum` (or unset) |
| nithish-x-ineffable | `main` | `ineffable` |
| nithish-x-scope | `main` | `scope` |

Create each project from the same GitHub repo, set the variable under
Settings → Environment Variables, and deploy.

A branch per company also works, but costs more than it looks: every shared component fix
then has to be cherry-picked to every branch, which is exactly the duplication this
template exists to remove. Prefer one branch and separate Vercel projects.
