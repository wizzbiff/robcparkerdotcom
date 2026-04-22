# SPEC-009: Subpage Redesign Migration

**Status:** Spec Gate approved — Architect-Review pending
**Tier:** Standard
**Author:** PM-Spec Agent (auto-queued from SPEC-008 QA Review deferrals)
**Date:** 2026-04-22
**Branch:** `spec/SPEC-009-subpage-redesign-migration`

---

## Summary

Propagate the SPEC-008 design language to the three subpages still on the legacy `.hero-content` single-column markup (`about.html`, `contact.html`, `advisory.html`), apply an in-place design-language refresh to `resume.html`'s already-asymmetric `.resume-header` without forcing it into Concept A, and clean up five residual token-consistency items surfaced by the SPEC-008 QA Gate that were deferred as non-blocking follow-ups.

Six bundled items:

1. **Hero migration — `about.html`, `contact.html`, `advisory.html`** to the Concept A two-column 58/42 bottom-aligned grid. **`resume.html` excluded from the grid conversion** per Spec Gate Q1: its `.resume-header` three-column document-mirror structure is already asymmetric and print-appropriate; SPEC-008 design language applied in place (Fraunces H1, magenta accents where present, hairline rules).
2. **Remaining `--primary-color` legacy-alias callsites** at `css/style.css:433` (`.nav-logo:hover`), `855` (`.highlight-metric`), `1162` (`.philosophy-quote`), `1981` (`.form-input:focus`) migrated to canonical `var(--color-magenta)`. **The `--primary-color` declaration itself is retired** per Spec Gate Q2 — delete the declaration at `css/style.css:92` and the adjacent legacy-alias WHY comment block at lines 90–92 once callsite count reaches zero.
3. **`resume.html` multi-`section-alt` consolidation** — the resume page currently alternates three `section-alt` bands; SPEC-008 R3.4 mandates at most one alternating band per page. Restructure to a single alternating band (or zero, with hairline-rule dividers) — `ui-designer` judgment at Arch Review.
4. **Surface elevation differentiation — darken the band, not the card** per Spec Gate Q3. Keep `--color-surface-elevated: #F3F1EB` (preserves the 3.13:1 hairline-on-card contrast). Darken `--surface-color` to `#EDEBE4` so cards sit visibly above the alt-band. `graphic-artist` re-verifies WCAG contrast for all text tokens rendered on the new band surface; `:root` contrast-pair comment block refreshed if any value drifts.
5. **Inter woff2 byte-budget — rewritten as documentation task** per Spec Gate Q4. Current payload (Inter 48KB + Fraunces 67KB = 115KB) meets SPEC-008 R2's 120KB combined hard target. Per-font ~40KB figure was a pre-implementation estimate, not an enforced sub-budget. Document actual sizes and the rationale for not introducing `pyftsubset` tooling in `fonts/SOURCE.md`. No font regeneration.
6. **`.form-status--warning` amber retention (AG-3 carryover) vs token system** — QA-expert noted the warning banner palette is off-token. AG-3 retained red for errors; same reasoning applies to yellow for warnings. Expected outcome: pin AG-3 at the `.form-status--warning` callsite with a WHY comment, matching the AG-3 comment already present at `.form-status--error`. No color change.

## Context

SPEC-008 QA Gate approved 2026-04-22 with an explicit follow-up list. Each item in this spec is traceable to a row in that list. The primary user-visible item is #1 (subpage hero migration) — the other five are consistency / token-hygiene tasks that are cheapest to execute alongside the subpage work while the designer context is loaded.

No content changes. No SEO changes. No copy edits. This is design-language propagation, consistent with SPEC-008's scope discipline.

## Decision Rationale

- **Alternatives considered:**
  - (a) Narrow "subpage hero only" spec with token cleanups deferred further — **rejected:** all six items share the same editor context and bundling is cheaper than six separate gate cycles.
  - (b) This bundled approach — **selected.**
  - (c) Splitting items 2–6 into five trivial specs — **rejected:** same reason as (a); splitting would triple the gate overhead for work that's already in the same CSS file.
- **Constraints:** no deploys until SPEC-001–006 complete + SPEC-000 written per project policy — this spec does not gate deployment.
- **Assumptions:** SPEC-008 design tokens are stable; the Concept A grid (verified working on `index.html`) can be applied structurally to `about.html`, `contact.html`, `advisory.html` without new breakpoint work. `resume.html` is explicitly excluded from grid conversion per Spec Gate Q1.
- **Trade-offs:** Bundling six items into one Standard spec has larger blast radius than six trivial specs. Accepted because all six share the same editor context (design language propagation) and the subpage migration already touches `css/style.css` heavily. Risk mitigated by leaving `resume.html` hero structure intact (Q1 answer) — the biggest structural-uncertainty item is descoped.

## Requirements

### R1: Subpage hero migration

- `about.html`, `contact.html`, `advisory.html` hero sections adopt the Concept A 58/42 bottom-aligned two-column grid as delivered on `index.html`. `ui-designer` adapts the grid to each page's content (about page: carry the existing profile photo into the 42 column; contact: single-column fallback acceptable if the photo-less hero reads oddly in 58/42; advisory: standard 58/42 with eyebrow retained).
- `resume.html` **excluded** from grid conversion. Apply SPEC-008 design language to `.resume-header` in place: Fraunces for the name-level heading, magenta accents where contextually appropriate, hairline-rule dividers already present retained.
- Legacy `.hero-profile-text h1` / `.hero-positioning` / `.hero-bio p` color fixes from SPEC-008 CR-1 remain correct under the new markup — QA verifies no cream-on-cream regression on `about.html`.
- No copy changes.

### R2: Canonical magenta token migration + alias retirement

- `css/style.css:433, 855, 1162, 1981` migrated from `var(--primary-color)` to `var(--color-magenta)`.
- After callsite migration, `grep -c 'var(--primary-color)' css/style.css` MUST return zero.
- Retire the `--primary-color: #E8449B;` declaration at `css/style.css:92`. Remove the adjacent legacy-alias WHY comment at lines 90–92.
- Existing WHY comments that *reference* `--primary-color` by name (for historical context — e.g., lines 272, 1464) are updated to use past tense ("formerly `--primary-color`") or deleted if the context is no longer load-bearing. `code-reviewer` judgment at QA.

### R3: `resume.html` section rhythm conformance

- Restructure to at-most-one `.section-alt` band per SPEC-008 R3.4 (currently three: summary, earlier-experience, skills).
- `ui-designer` selects between: (a) single alternating band on the most content-distinct section (likely summary); (b) zero alternating bands with hairline-rule dividers only. Decision made at Arch Review and documented in `ARCH-SPEC-009`.
- Visual density preserved — resume content blocks must not become a wall of undifferentiated text; hairline rules + typographic hierarchy carry section separation.

### R4: Surface elevation differentiation

- **`--surface-color` changes from `#F3F1EB` to `#EDEBE4`** (band goes deeper).
- **`--color-surface-elevated` stays at `#F3F1EB`** (card preserved, hairline-on-card contrast preserved at ≈3.13:1).
- `graphic-artist` re-verifies WCAG 2.1 AA for every text-token rendered on `--surface-color`:
  - `--color-text-primary` (#111318) on new band: must pass AA normal (4.5:1)
  - `--color-text-muted` (#5C5854) on new band: must pass AA normal (4.5:1)
  - `--color-text-subtle` (#8A8480) on new band: AA large only acceptable (pre-SPEC-008 constraint preserved)
  - `--color-magenta` (#E8449B) on new band: AA large only acceptable (preserved constraint)
- `:root` contrast-pair comment block (`css/style.css:42-58` region) updated with the new `--surface-color` measurements.
- No change to `--color-cream` (page background) or `--color-charcoal` (dark surfaces).

### R5: Font byte-budget documentation

- Document current actuals in `fonts/SOURCE.md`:
  - `inter-variable.woff2`: 48KB
  - `fraunces-variable.woff2`: 67KB
  - Combined: 115KB — under SPEC-008 R2 combined target of 120KB.
- Document the rationale for not introducing `pyftsubset` tooling to hit the ~40KB per-font estimate: combined ceiling met; further subsetting requires new dependency + glyph-coverage risk.
- No font file regeneration. No tooling additions.

### R6: Warning banner AG-3 disposition

- `.form-status--warning` palette retained as-is (amber).
- Add a WHY comment at the callsite pinning AG-3 — mirror the comment already present at `.form-status--error`:

  > WHY (SPEC-008 AG-3 / SPEC-009 R6): yellow banner palette is a semantic layer outside the SPEC-008 identity system. Red/amber banners are category-convention and overloading magenta to banner backgrounds would dilute the identity signal. Do not migrate.

## Out of Scope

- Any copy changes on subpages
- Favicon or font asset regeneration beyond R5 documentation
- New pages, new sections, new components
- SPEC-000 (foundational/meta spec) — tracked separately
- Deployment (deferred per project policy until SPEC-001–006 + SPEC-000 complete)
- `resume.html` hero grid conversion — explicitly excluded per Spec Gate Q1 (remains document-mirror structure)
- `pyftsubset` / font-pipeline tooling — explicitly excluded per Spec Gate Q4

## Open Questions — resolved at Spec Gate 2026-04-22

1. ~~Does `resume.html` warrant a Concept A grid variant or a resume-native layout?~~ **Resolved: resume-native.** Page is document-dense; existing `.resume-header` is already asymmetric. Design-language refresh in place, no grid conversion. Captured in R1.
2. ~~Retire `--primary-color` alias entirely or keep as a transitional shim?~~ **Resolved: retire entirely.** Zero non-comment callsites remain after R2 migration; shim is a footgun. Captured in R2.
3. ~~Is `#EDEBE4` sufficient for surface differentiation?~~ **Resolved: yes, but applied to `--surface-color` (band) instead of `--color-surface-elevated` (card).** Preserves "elevated = lighter" naming and maintains 3.13:1 hairline-on-card WCAG 1.4.11 contrast. Captured in R4.
4. ~~Is the Inter 40KB target hard or aspirational?~~ **Resolved: aspirational.** SPEC-008 NFR hard target is 120KB combined; 115KB actual meets it. R5 rewritten as documentation task. Captured in R5.

## Spec Gate Approval

**Decision:** Approved
**Approved by:** Rob Parker
**Date:** 2026-04-22
**Annotation:** All four PM-Spec recommendations accepted as-written. Scope trimmed meaningfully on R1 (resume excluded from grid) and R5 (descoped to docs) — net effort reduced vs. the original draft. R4 inverted to preserve naming semantics and WCAG contrast math.

---

*Queued 2026-04-22 from SPEC-008 QA Review deferred-items list.*
