# Scope discipline — read this before proposing or building anything new

The owner has explicitly flagged a recurring failure mode: getting pulled into building
new tools/features/ideas mid-task instead of finishing and shipping what's already in
flight. This is a standing, hard rule for every session on this project, not a one-off
preference.

## Rules

1. **Never propose, suggest, or start building a new tool, feature, page, or "nice to
   have" addition on your own initiative.** Only build what was explicitly asked for in
   the current task.
2. **If a new idea genuinely comes up while working on something else**, name it in one
   sentence as a possible future idea, then immediately return to finishing the current
   task. Do not expand scope, do not start scaffolding it, do not ask "should we also
   build X" mid-task.
3. **Before building anything beyond the literal ask**, check: (a) is this required to
   finish the current deliverable, and (b) did the owner explicitly ask for it. If both
   are no, don't build it — just name it as an option and stop there.
4. **When asked "should we build X" or "is X needed,"** the default answer is to
   recommend finishing and shipping what's currently in flight first, and to validate
   real demand before building anything substantial — never default to "yes, let's
   start." This mirrors the lead-magnet playbook's own rule already adopted on this
   project: nothing beyond a 1–2 hour repurpose gets built without validating demand
   first (see `linkedIn_Master/.../lead-magnets-and-email.md` §4).
5. **Finish and ship the current deliverable completely** — to the point the owner can
   actually use it — before discussing what comes next.

## Why this exists

Chasing new ideas mid-build is explicitly named, in the project's own reference
material, as one of the things that kills momentum and lead magnets specifically
("analysis paralysis," starting over on a "perfect" new thing instead of shipping the
one already 90% done). This file exists so that discipline is enforced automatically,
not something the owner has to keep re-asserting.

## Design Engineering Standards (Non-Negotiable)

Every page, component, client deliverable, and all 50 industry demos must strictly comply with `UNSLOP_DESIGN_RULES.md`:
1. Drop the purple gradient.
2. Use consistent icons, no emojis.
3. Swap out Inter for fonts with character.
4. No italic serif word on the end of headlines.
5. Lose the headline badge.
6. Skip the 2-button hero (single confident CTA).
7. Match outer + inner radius mathematically (R_inner = R_outer - padding).
8. Fix color contrast (WCAG AA compliant).
9. Cut glowing colored shadows & radial ambient orbs.
10. No colored card borders (use subtle neutral hairlines).
11. Break up identical feature cards (use asymmetrical / editorial layouts).
12. No glassmorphism (use solid, grounded surfaces).
13. Ease up on all-caps labels (sentence case default).
14. Drop the vanity stat banner (embed proof in real sentences).
15. Ditch generic 1-2-3 steps (use tangible working sprint schedules).
16. Fix text wrapping (text-wrap: balance / text-pretty).
17. No gradient backgrounds (solid, stable palettes).
18. Restyle default shadcn / template primitives.
19. No fade-in on every section (immediate, fast rendering).
20. Custom favicon + complete meta tags.

## gstack

Use /browse from gstack for all web browsing. Never use mcp__claude-in-chrome__* tools.
Available skills: /office-hours, /plan-ceo-review, /plan-eng-review, /plan-design-review,
/design-consultation, /design-shotgun, /design-html, /review, /ship, /land-and-deploy,
/canary, /benchmark, /benchmark-models, /browse, /open-gstack-browser, /connect-chrome,
/qa, /qa-only, /design-review, /scrape, /skillify, /setup-browser-cookies, /setup-deploy,
/setup-gbrain, /sync-gbrain, /retro, /investigate, /document-release, /document-generate,
/codex, /cso, /autoplan, /spec, /plan-tune, /plan-devex-review, /devex-review, /careful,
/freeze, /guard, /unfreeze, /gstack-upgrade, /learn, /health, /diagram, /make-pdf,
/context-save, /context-restore, /pair-agent, /landing-report, /ios-qa, /ios-fix,
/ios-design-review, /ios-clean, /ios-sync.
