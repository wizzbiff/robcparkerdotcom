# SPEC-009: Subpage Redesign Migration

**Status:** Draft — Spec Gate pending
**Tier:** Standard
**Author:** PM-Spec Agent (auto-queued from SPEC-008 QA Review deferrals)
**Date:** 2026-04-22
**Branch (proposed):** `spec/SPEC-009-subpage-redesign-migration`

---

## Summary

Propagate the SPEC-008 design language to the four subpages that were explicitly left on the legacy `.hero-content` single-column hero markup during SPEC-008 (the redesign migrated `index.html` only). Also clean up five residual token-consistency items surfaced by the SPEC-008 QA Gate that were deferred as non-blocking follow-ups rather than scope-expanding the SPEC-008 PR.

Six bundled items:

1. **Hero migration — `about.html`, `resume.html`, `contact.html`, `advisory.html`** to the Concept A two-column 58/42 bottom-aligned grid (or a resume-appropriate variant for `resume.html`, which is document-dense).
2. **Remaining `--primary-color` legacy-alias callsites** at `css/style.css:433` (`.nav-logo:hover`), `855` (`.highlight-metric`), `1162` (`.philosophy-quote`), `1981` (`.form-input:focus`) → migrate to canonical `var(--color-magenta)`.
3. **`resume.html` multi-`section-alt` consolidation** — the resume page currently alternates three `section-alt` bands; SPEC-008 R3.4 mandates at most one alternating band per page. Restructure to a single alternating band (or zero if the hairline-rule divider pattern reads better on a document-dense page).
4. **`--color-surface-elevated` vs `--surface-color` visual differentiation** — both currently resolve to `#F3F1EB`, flattening card elevation inside `.section-alt` bands. Either darken `--color-surface-elevated` a half-step (e.g. `#EDEBE4`) to restore visual hierarchy, or introduce a new token and update card callsites.
5. **Inter woff2 byte-budget tightening** — current file is 48KB on disk vs the 40KB R2 target. Narrow the subset (drop unused glyphs or axes) via the font-pipeline tooling referenced in `fonts/SOURCE.md`.
6. **`.form-status--warning` amber retention (AG-3 carryover) vs token system** — QA-expert noted the warning banner palette is off-token. AG-3 retained red for errors; same reasoning applies to yellow for warnings. Action may be no-op (pin AG-3 at the callsite with a WHY comment, matching the AG-3 comment now present at `.form-status--error`).

## Context

SPEC-008 QA Gate approved 2026-04-22 with an explicit follow-up list. Each item in this spec is traceable to a row in that list. The primary user-visible item is #1 (subpage hero migration) — the other five are consistency / token-hygiene tasks that are cheapest to execute alongside the subpage work while the designer context is loaded.

No content changes. No SEO changes. No copy edits. This is design-language propagation, consistent with SPEC-008's scope discipline.

## Decision Rationale (to be completed at Spec Gate)

- **Alternatives considered:** (a) a narrow "subpage hero only" spec with the token cleanups deferred further; (b) this bundled approach; (c) splitting items 2–6 into five trivial specs.
- **Constraints:** no deploys until SPEC-001–006 complete + SPEC-000 written per project policy — this spec does not gate deployment.
- **Assumptions:** `resume.html` tolerates a Concept A grid variant at desktop but may need a resume-specific layout adaptation; concrete markup TBD at Arch Gate.
- **Trade-offs:** Bundling six items into one Standard spec is cheaper than six trivial specs but has larger blast radius. Accepted because all six share the same editor context (design language propagation) and the subpage migration already touches `css/style.css` heavily.

## Requirements (draft — to be refined at Spec Gate)

### R1: Subpage hero migration

- `about.html`, `resume.html`, `contact.html`, `advisory.html` hero sections adopt the Concept A grid (or justified variant).
- Legacy `.hero-profile-text h1` / `.hero-positioning` / `.hero-bio p` color fixes from SPEC-008 CR-1 remain correct under the new markup.
- No copy changes.

### R2: Canonical magenta token migration

- `css/style.css:433, 855, 1162, 1981` migrated from `var(--primary-color)` to `var(--color-magenta)`.
- `--primary-color` alias either retired entirely (if zero callsites remain) or documented as deprecated-in-place.

### R3: `resume.html` section rhythm conformance

- Restructure to at-most-one `.section-alt` band per SPEC-008 R3.4.
- Visual density preserved — resume content blocks do not become a wall of undifferentiated text.

### R4: Surface elevation differentiation

- `--color-surface-elevated` and `--surface-color` render visually distinct on the `.section-alt` band background.
- WCAG 1.4.11 non-text contrast verified for card borders against the new surface.

### R5: Inter byte budget

- Committed `fonts/inter-variable.woff2` ≤ 40KB.
- Subset recipe documented in `fonts/SOURCE.md` so regeneration is reproducible.

### R6: Warning banner AG-3 disposition

- Either pin AG-3 at `.form-status--warning` with a WHY comment (no-op migration, matches error banner), or migrate to a new `--color-warning-*` token pair if Arch Gate elects to bring warnings into the identity system.

## Out of Scope

- Any copy changes on subpages
- Favicon or font asset regeneration beyond R5
- New pages, new sections, new components
- SPEC-000 (foundational/meta spec) — tracked separately
- Deployment (deferred per project policy until SPEC-001–006 + SPEC-000 complete)

## Open Questions for Spec Gate

1. Does `resume.html` warrant a Concept A grid variant or a resume-native layout? The page is document-dense and the 58/42 split may waste whitespace at the top of a content-heavy document.
2. Should `--primary-color` alias be retired entirely after R2 migration, or retained indefinitely as a transitional compatibility shim?
3. Is `#EDEBE4` (one half-step darker than `#F3F1EB`) sufficient differentiation for R4, or should `--color-surface-elevated` move further toward the charcoal end?
4. Is the Inter 40KB target a hard WCAG/Lighthouse budget or an aspirational one? If aspirational, R5 may be descoped to "document actual byte cost + rationale" rather than "reduce to 40KB."

---

*Queued 2026-04-22 from SPEC-008 QA Review deferred-items list. This spec has not yet been through the Spec Gate; requirements above are a PM-Spec draft, not approved scope.*
