# Archived sections

`LearningJourney.tsx` and `ReadyToLearn.tsx` are not rendered. They were
removed from `app/page.tsx` when the portfolio tone shifted from a
readiness narrative to shipping evidence.

They are kept rather than deleted because this project has no git history
to recover them from. Nothing imports them, so they add nothing to the
bundle — they are still type-checked and linted, so they will not rot.

To restore: import both in `app/page.tsx`, place them either side of
`<Skills />`, and re-add the `learning` and `ready` entries to `navItems`
in `lib/data.ts` (the nav will need its `xl` breakpoint back — ten items
do not fit at `lg`). Their content still lives in `lib/data.ts` under the
ARCHIVED banner.
