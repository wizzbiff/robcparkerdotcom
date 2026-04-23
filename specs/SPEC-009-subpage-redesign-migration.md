# SPEC-009: Subpage Redesign Migration

**Status:** QA Gate approved — ready to commit
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

## Architecture Review

**Reviewers:** `architect-reviewer` (CSS/structural/cascade), `ui-designer` (per-page hero adaptation + resume band choice), `graphic-artist` (WCAG numerical verification + R5 documentation draft)
**Date:** 2026-04-22
**Recommendation:** Approve with conditions (8 IG items + 3 Arch Gate decisions). One critical finding (hairline fails WCAG 1.4.11 on the new band) forces a site-wide token adjustment not in the original R4 scope.

### Design Findings

| Area | Finding |
|------|---------|
| Pattern fit | Strong. R1–R6 confined to existing HTML hero markup on three subpages, CSS tokens/rules in `css/style.css`, `fonts/SOURCE.md` documentation, and one WHY comment addition. No new files, no new breakpoints, no JS, no dependencies. SPEC-008 Concept A grid infrastructure (`.hero-grid`, `.hero-headline-col`, `.hero-copy-col` at `css/style.css:656-797`) already ships with responsive collapse at 1023px and 767px — subpage migration gets responsive behavior for free. |
| Line-number accuracy — R2 `--primary-color` callsites | **All four verified exact.** `css/style.css:433` is `.nav-logo:hover`, `:855` is `.highlight-metric` color, `:1162` is `.philosophy-quote` border-left, `:1981` is `.form-input:focus` border-color. Declaration at `:92` verified. No drift. |
| Completeness — `--primary-color` audit across repo | Beyond the four R2 callsites and the `:92` declaration, two WHY-comment mentions live at `css/style.css:273` (inside the `:focus-visible` QA-B2 comment) and `css/style.css:1464` (inside `.resume-role-company` WHY). Both describe the alias by name for historical context and read correctly once the alias is removed — **retain verbatim**, no rewrite. The legacy-alias banner at `:88-91` is deleted wholesale per R2. **Zero references in `*.html`, `site.webmanifest`, `_headers`, `js/main.js`, or `.claude/agents/*.md`.** Repo is clean outside `css/style.css`. |
| Line-number accuracy — R4 `--surface-color` callsites | Grep-verified five active consumers: `:483` (`.nav-toggle:hover` mobile-only), `:550` (mobile nav dropdown hover/active inside 767px block), `:808` (`.section-alt` bg — primary R4 target), `:1165` (`.philosophy-quote` bg), `:1509` (`.resume-metrics` callout bg). Declaration at `:97` verified. No drift. |
| R4 collateral — `.philosophy-quote` and `.resume-metrics` | Both currently tint background with `--surface-color`. Post-R4: `.philosophy-quote` (about page, inside section-alt band) becomes quote-bg == band-bg — left-border accent and typography become sole differentiators. Acceptable but flag for QA visual-rhythm check. `.resume-metrics` is resume-only and inside non-alt section; reads as grounded callout on deeper surface. No regression. |
| R4 collateral — mobile nav dropdown (`:550`) | `.js-enabled .nav-links a:hover/.active` hit deepens from `#F3F1EB` to `#EDEBE4`. Text uses `--text-color` (`#111318`): contrast on new surface ≈15.5:1 AAA. Deeper hover pill on cream dropdown is still legible. No risk. |
| R4 WCAG contrast math — numerical verification | Computed via WCAG 2.1 sRGB-linear formula by `graphic-artist`. Summary: `#111318` on `#EDEBE4` = **15.57:1** AAA ✓; `#5C5854` = **5.91:1** AA ✓; `#8A8480` = **3.09:1** AA-large NEAR FLOOR ✓; `#E8449B` = **3.07:1** AA-large NEAR FLOOR ✓; `#A51D65` = **5.94:1** AA ✓; `#CC3A88` = **3.89:1** AA-large ✓; `#8E8A84` hairline = **2.88:1** ✗ (**fails WCAG 1.4.11 3:1**). See Graphic-artist section below and AG-1. |
| R1 cascade risk on `about.html` | `.hero-profile-text h1`, `.hero-positioning`, `.hero-bio p` rules at `css/style.css:1124-1154` currently override colors for the photo-hero variant (SPEC-008 CR-2 fix). If R1 swaps to `.hero-grid`, these three rules become orphaned selectors. Cleanup required during implementation if Concept A is adopted for about.html. **Decision gates on AG-2.** |
| R1 structural per-page summary (from `ui-designer`) | **`about.html`:** photo can integrate into 58-col headline column (photo above name), no CTA in hero. **`contact.html`:** hero has only H1 + subheadline; 58/42 grid right column would be empty — `ui-designer` recommends left-aligned single-column variant instead (still SPEC-008 design language, but not Concept A grid). **`advisory.html`:** clean 58/42 fit — eyebrow + H1 in 58, subheadline in 42, no CTA. Bottom-aligned grid handles the longer advisory subheadline correctly. Details in D1.1–D1.3 below. |
| R1 cross-agent disagreement — about.html strategy | **`architect-reviewer` recommends Option B** for AG-2: skip Concept A on about.html entirely, retain `.hero-profile` variant, design-language refresh only. Reasoning: `.hero-profile` already ships working post-CR-2, Concept A imports structural risk for no user value. **`ui-designer` recommends Option A** (Concept A adoption with photo in left column). Reasoning: brand-consistency with index.html, asymmetric editorial composition is the SPEC-008 R3.1 baseline for ALL pages (only resume.html was explicitly excluded at Spec Gate). Surfaced as AG-2 for Rob's decision. |
| R3 resume band consolidation (from `ui-designer`) | Resume currently alternates three `.section-alt` bands (Summary `:119`, Earlier Experience `:227`, Skills `:285`). `ui-designer` recommends **one band on Summary**, remove from Earlier Experience and Skills, add hairline-rule dividers via new `.section-rule-top` utility class on Earlier Experience / Education / Skills. Summary gets the band because it's the only prose-synthesis section; remaining sections are enumerated career history and read better on cream with editorial dividers. `architect-reviewer` concurs. Matches AG-3 recommendation. |
| R5 font asset verification | `fonts/SOURCE.md` exists (39 lines, no sizes section currently). `inter-variable.woff2` = 48KB, `fraunces-variable.woff2` = 67KB, combined 115KB, under SPEC-008 R2 120KB hard ceiling. R5 is purely additive documentation — `graphic-artist` drafted the "Byte Budget" section (verbatim in D2 below). No tooling change, no regeneration. |
| R6 WHY-comment pattern consistency | `.form-status--error` at `:2041-2045` has a preceding AG-3 WHY block at `:2034-2040`. `.form-status--warning` at `:2052-2056` has no preceding WHY — it inherits rationale by adjacency. R6 adds parallel pin. Trivial and mechanical. |
| Legacy alias references in WHY comments (lines 273, 1464) | Both describe `--primary-color` by name to explain historical design rationale. After R2 retirement, both read correctly as-written (past tense implicit). **No rewrite needed** despite R2's "update to past tense" directive — the existing wording is already tense-neutral enough that deletion of the declaration doesn't invalidate them. `code-reviewer` re-verifies at QA. |
| Integration risks | **None introduced.** No new external deps, no new runtime code paths, no new browser APIs. Only failure mode is silent cascade regression on about.html (R1) — mitigated by SPEC-008 CR-2 discipline and IG-3 below. |
| Security | **Zero attack-surface change.** No new forms, no new origins in `_headers`, no new third-party references, no CSP impact. |
| Performance | **Net-neutral.** R1 replaces existing hero DOM; R2 deletes ~100 bytes of CSS; R3 reduces markup; R4 is a 2-character hex change on one declaration; R5 is docs-only; R6 adds ~7 lines of comment. No measurable bundle delta. |
| Technical debt impact | **Net-negative (debt reduction).** Retires last legacy color alias, resolves SPEC-008 QA CR-3 deferred item, consolidates resume section rhythm to match R3.4, pins AG-3 at warning callsite preventing future drift. |

### D1: Per-Page Hero Adaptation for R1 (from `ui-designer`)

#### D1.1 — `about.html`

*Conditional on AG-2 Option A.* If AG-2 resolves to **Option B** (skip Concept A), this section becomes a design-language-refresh-in-place specification instead.

**Current structure:** `.hero.hero-profile > .hero-content > (.hero-profile-photo + .hero-profile-text)`, single flex column (photo + name + positioning + bio). No CTA in hero.

**Concept A adaptation:**
- Replace `.hero-content` wrapper with `.hero-grid`.
- **58-col `.hero-headline-col`:** `.hero-profile-photo` (retained, 160px circular, hairline border) above `.hero-eyebrow` ("Senior Engineering Executive") above `h1#hero-name` ("Rob Parker") in Fraunces at editorial scale.
- **42-col `.hero-copy-col`:** `.hero-positioning` subtitle, then `.hero-bio` paragraphs.
- **No CTA in hero.** Terminal `section-dark cta-section` handles conversion.
- **Cleanup:** `.hero-profile` modifier retained on the `<section>` for semantic specificity. `.hero-profile .hero-content` flex rules at `css/style.css:1111-1123` become dead code and must be deleted. `.hero-profile-text h1`, `.hero-profile-text .hero-positioning`, `.hero-profile-text .hero-bio p` color-override rules at `:1124-1154` become orphaned selectors — delete and rely on base `.hero h1` / `.hero-subheadline` tokens.
- **Breakpoints:** at `≤767px`, grid collapses to single column (existing `.hero-grid` media-query rule); photo above name, natural reading order. At `≤480px`, H1 at 2rem (CR-2 fix preserved).

#### D1.2 — `contact.html`

**Current structure:** `.hero.contact-page-hero > .hero-content > (h1 + .hero-subheadline)`. Bare H1 + subheadline. No photo, CTA, or eyebrow. Form lives in the section below.

**Prescribed treatment — left-aligned single-column variant, NOT full Concept A grid.** Justification: 58/42 requires content differentiation between columns; contact hero has no second-column candidate, so a grid would produce visual imbalance reading as an empty template slot.

- Retain `.hero-content` wrapper, narrow `max-width` to ~640px.
- H1 left-aligned (AP-3 prohibits centered hero — left-aligned preserves asymmetry).
- `.hero-subheadline` left-aligned beneath.
- No right column.
- Add CSS comment at `.contact-page-hero` rule noting the single-column treatment is intentional (prevents future "missing grid" misinterpretation).

#### D1.3 — `advisory.html`

**Current structure:** `.hero > .hero-content > (.hero-eyebrow + h1 + .hero-subheadline)`. No photo, no CTA.

**Concept A adaptation — full 58/42:**
- **58-col `.hero-headline-col`:** `.hero-eyebrow` ("Selective Engagements") above `h1` ("Technical Advisory"). Existing `.hero-eyebrow` rules (Inter small-caps, `--color-text-muted`, `letter-spacing: 0.12em`) apply unchanged per AP-8.
- **42-col `.hero-copy-col`:** `.hero-subheadline` paragraph (~70 words — longer than other pages). `align-items: end` keeps baseline-alignment correct; taller right column extends upward naturally.
- **No CTA in hero.** Terminal `section-dark cta-section` handles conversion. Subheadline is substantive pitch; inline CTA would be premature.

### D2: R3 — `resume.html` Section Rhythm (from `ui-designer`)

**Recommendation:** Option A — **one alternating band on Summary, zero on Earlier Experience and Skills**, hairline-rule dividers replacing band alternation.

**Justification:** Summary is the only prose-synthesis section on the resume; Experience, Earlier Experience, Education, Skills are enumerated career data. Banding the executive synthesis creates a natural document break: "here is the summary, then the record." Enumerated sections read better on cream with hairline rules — editorial register matches document density.

**Implementation:**
- Remove `.section-alt` class from Earlier Experience (`aria-labelledby="earlier-heading"`, line `:227`) and Skills (`aria-labelledby="skills-heading"`, line `:285`).
- Add new utility class `.section-rule-top { border-top: 1px solid var(--color-border-hairline); }` (post-AG-1 hairline darkening if applicable).
- Apply `.section-rule-top` to Earlier Experience, Education, and Skills `<section>` elements.
- Experience (the main block, line `:133`) follows Summary's alt-band directly — band's bottom edge handles separation, no top rule needed.
- At all breakpoints: 1px hairlines scale correctly, no media-query override needed.

### D3: WCAG Contrast Verification on `--surface-color: #EDEBE4` (from `graphic-artist`)

Full luminance computations per WCAG 2.1 sRGB-linear formula. All values show the final contrast ratio against the new band background `#EDEBE4` (luminance 0.8304).

| Foreground | Hex | Role | Target | Ratio on #EDEBE4 | Status |
|---|---|---|---|---|---|
| `--color-charcoal` | #111318 | primary text | AA normal 4.5:1 | **15.57:1** | AAA ✓ |
| `--color-text-muted` | #5C5854 | secondary text | AA normal 4.5:1 | **5.91:1** | AA ✓ |
| `--color-text-subtle` | #8A8480 | muted label | AA large 3:1 | **3.09:1** | AA-large ✓ NEAR FLOOR |
| `--color-magenta` | #E8449B | display accent | AA large 3:1 | **3.07:1** | AA-large ✓ NEAR FLOOR |
| `--color-magenta-text` | #A51D65 | inline text link | AA normal 4.5:1 | **5.94:1** | AA ✓ |
| `--color-magenta-hover` | #CC3A88 | button hover bg | AA large 3:1 | **3.89:1** | AA-large ✓ |
| `--color-border-hairline` | #8E8A84 | card hairline (non-text) | 1.4.11 3:1 | **2.88:1** | ✗ **FAILS** |

**Critical finding — hairline failure on new band.** `#8E8A84` on `#EDEBE4` measures 2.88:1, below the WCAG 1.4.11 3:1 floor for non-text UI contrast by 0.12 ratio points. The Spec Gate claim of "preserves 3.13:1 hairline-on-card contrast" was accurate for card surface `#F3F1EB` (hairlines on cards remain compliant), but hairlines rendered *directly on the band* (alt-band dividers, hairlines on flat non-elevated content) fail. The R3 `.section-rule-top` utility class specifically renders hairlines on the band surface and is immediately affected.

**Near-floor flags.** `--color-text-subtle` margin dropped from 0.41 (on cream) to 0.09 (on band). `--color-magenta` margin is 0.07 above floor. Both pass — but the "AA-large only" constraint is now a hard WCAG requirement on band surfaces, not merely a design guideline. `--surface-color` cannot be darkened further in any future iteration without re-running this table.

**Mitigation (recommended):** Darken `--color-border-hairline` from `#8E8A84` to `#7E7A74`. Resulting contrast:
- On `#EDEBE4` band: **3.58:1** ✓
- On `#F3F1EB` card: **3.78:1** ✓ (up from current 3.13:1)
- On `#F7F6F2` cream: **3.95:1** ✓ (up from current 3.18:1)

**Visual impact:** hairlines become slightly more assertive (~4 tonal steps darker). All SPEC-008-shipped card borders site-wide gain contrast headroom. Not a regression; arguably an improvement in editorial weight. Rob's call at AG-1.

### D4: Refreshed `:root` Contrast-Pair Comment Block

Replaces the existing block at approximately `css/style.css:38-61`. Adds the new `#EDEBE4` band section, flags near-floor pairings, documents the hairline decision.

```css
/* Color Palette — SPEC-008 / SPEC-009 design system
   All text/background combinations verified against WCAG 2.1 via relative-luminance formula.

   On --color-cream (#F7F6F2) — page background:
     --color-charcoal (#111318) on --color-cream:                 17.2:1  — AAA
     --color-text-muted (#5C5854) on --color-cream:                6.54:1 — AA normal text
     --color-text-subtle (#8A8480) on --color-cream:               3.41:1 — AA large only
     --color-magenta-text (#A51D65) on --color-cream:              6.56:1 — AA normal text (inline links)
     --color-charcoal (#111318) on --color-magenta (#E8449B):      5.07:1 — AA (primary button label)
     --color-magenta (#E8449B) on --color-charcoal (#111318):      5.07:1 — AA (accent on dark)
     --color-magenta (#E8449B) on --color-cream:                   3.39:1 — AA large only
     --color-magenta-hover (#CC3A88) on --color-cream:             4.29:1 — AA large (button hover)
     --color-border-hairline (#7E7A74) on --color-cream:           3.95:1 — passes 1.4.11

   On --surface-color (#EDEBE4) — section-alt band (SPEC-009 R4, darkened from #F3F1EB):
     --color-charcoal on --surface-color:                         15.57:1 — AAA
     --color-text-muted on --surface-color:                        5.91:1 — AA normal text
     --color-text-subtle on --surface-color:                       3.09:1 — AA large only; NEAR FLOOR
     --color-magenta-text on --surface-color:                      5.94:1 — AA normal text
     --color-magenta on --surface-color:                           3.07:1 — AA large only; NEAR FLOOR
     --color-magenta-hover on --surface-color:                     3.89:1 — AA large
     --color-border-hairline (#7E7A74) on --surface-color:         3.58:1 — passes 1.4.11

   On --color-surface-elevated (#F3F1EB) — card surface (unchanged):
     --color-border-hairline (#7E7A74) on --color-surface-elevated: 3.78:1 — passes 1.4.11

   WHY: --color-cream (#F7F6F2) replaces pure white per SPEC-008 AP-2.
   WHY: Charcoal label on magenta button (5.07:1) is required — cream on magenta fails AA normal.
   WHY: --color-text-subtle and --color-magenta margins above 3:1 are narrow on --surface-color
        (0.09 and 0.07 respectively). Do not darken --surface-color further without re-verifying.
   WHY (SPEC-009 AG-1): --color-border-hairline darkened from #8E8A84 to #7E7A74 so hairlines
        pass WCAG 1.4.11 on the new --surface-color band. All three surfaces now compliant.
*/
```

### D5: `fonts/SOURCE.md` Byte-Budget Addition (from `graphic-artist`)

Insert after the existing "## Reproduction" section, before "## License Notice":

```markdown
## Byte Budget

**Actual file sizes (as committed):**

| File | Size |
|------|------|
| `inter-variable.woff2` | 48 KB |
| `fraunces-variable.woff2` | 67 KB |
| Combined | 115 KB |

**Budget ceiling:** SPEC-008 R2 sets a combined hard target of 120 KB. The actual payload of 115 KB meets this ceiling with 5 KB of headroom.

**Pre-implementation estimates vs. actuals:** SPEC-008 Arch Gate AG-5 cited approximate per-font targets of ~40 KB (Inter) and ~80 KB (Fraunces), derived from Google Fonts latin-subset size estimates at review time. These were planning approximations, not enforced sub-budgets. Inter came in at 48 KB (8 KB over estimate); Fraunces at 67 KB (13 KB under). The combined ceiling governs, and it is met.

**Decision: no subsetting tooling introduced** (SPEC-009 R5, 2026-04-22). Three reasons:

1. **Ceiling met.** The combined 120 KB NFR is satisfied. There is no compliance gap that tooling needs to close.
2. **Dependency and glyph-coverage risk.** Introducing `pyftsubset` (or equivalent) adds a build-time dependency to a zero-dependency stack, requires ongoing maintenance, and creates glyph-coverage risk if the subset drifts from actual content needs.
3. **CDN layer does not benefit from further woff2 reduction.** Cloudflare Pages serves woff2 with brotli/gzip at the edge. Since woff2 is internally brotli-compressed, CDN-layer compression yields negligible additional savings.

Revisit if a combined payload ceiling is tightened in a future spec, or if font family additions push the total above 120 KB.
```

### Implementation Guidance (accept/reject per Arch Gate below)

| # | Guidance |
|---|----------|
| IG-1 | **Pre-commit grep bundle.** Six checks, any non-zero blocks commit: (a) `rg -n 'var\(--primary-color\)' css/style.css` returns **zero**; (b) `rg -n -- '--primary-color' css/style.css` returns only the two historical WHY-comment mentions at `:273` and `:1464`; (c) `rg -n '#F3F1EB' css/style.css` returns only `:74` (`--color-surface-elevated` decl); (d) `rg -n '#EDEBE4' css/style.css` returns only `:97` (new `--surface-color`); (e) `rg -n '#8E8A84' css/style.css` returns **zero** (post-AG-1 hairline migration); (f) `rg -n 'SPEC-009 R6' css/style.css` returns a hit in the `.form-status--warning` WHY block. |
| IG-2 | **R2 deletion sequence.** Migrate callsites `:433, :855, :1162, :1981` FIRST (four mechanical replacements). Re-run `rg -c 'var\(--primary-color\)' css/style.css` — expect `0`. ONLY THEN delete the declaration at `:92` and the comment block at `:88-91`. Order matters — deleting the declaration while callsites still reference it produces silent fallback failures. |
| IG-3 | **R1 about.html cascade cleanup — CONDITIONAL ON AG-2.** If AG-2 = Option A (adopt Concept A on about): implementer MUST delete `.hero-profile .hero-content` flex rules at `:1111-1123` AND `.hero-profile-text h1`, `.hero-profile-text .hero-positioning`, `.hero-profile-text .hero-bio p` at `:1124-1154` (orphaned selectors). If AG-2 = Option B (retain `.hero-profile` variant): preserve all those rules; R1 scope for about.html reduces to typographic-refresh-in-place only. |
| IG-4 | **R4 token change sequence.** Update `--surface-color` declaration at `:97` from `#F3F1EB` to `#EDEBE4`. Separately, if AG-1 = Option A: update `--color-border-hairline` declaration from `#8E8A84` to `#7E7A74`. These are two independent one-line token changes; do not batch with other R4 edits in the same commit-hunk to keep the diff readable. |
| IG-5 | **R4 `:root` comment block replacement.** Replace existing contrast-pair block at `:38-61` with the refreshed block in D4 above. The refreshed block assumes AG-1 Option A is accepted — if AG-1 changes, regenerate the block with the chosen hairline value. |
| IG-6 | **R3 resume implementation details.** Remove `section-alt` from two sections (Earlier Experience at `resume.html:227`, Skills at `:285`). Add `.section-rule-top` utility class to `css/style.css` (scope-anchor it near the other `.section-*` rules, approximately `:808`). Apply to three `<section>` elements (Earlier Experience, Education, Skills). Verify mobile render at 480px — hairlines should remain visually present. |
| IG-7 | **R5 documentation location.** Append the "## Byte Budget" section from D5 to `fonts/SOURCE.md` AFTER the existing "## Reproduction" block and BEFORE "## License Notice". Do not modify the existing "## Files" table — it is reproduction-context and distinct from payload reporting. |
| IG-8 | **R6 WHY-comment exact placement.** Insert new WHY block at `css/style.css` immediately ABOVE `.form-status--warning:not(:empty)` rule at approximately `:2052`. Mirror the AG-3 block format at `:2034-2040`. Do NOT merge the error+warning WHYs into a shared comment — keep them callsite-adjacent so future refactors don't accidentally split rationale from rule. |

### Arch Gate Decisions Required (Rob)

| # | Question | Options | Recommendation |
|---|----------|---------|----------------|
| AG-1 | **R4 hairline contrast remediation** — `#8E8A84` on new `#EDEBE4` band measures 2.88:1, fails WCAG 1.4.11 3:1. | (a) Darken `--color-border-hairline` globally from `#8E8A84` to `#7E7A74` — all three surfaces compliant (3.58 band / 3.78 card / 3.95 cream); (b) Introduce band-specific token `--color-border-hairline-on-band`; (c) Accept sub-3:1 on the grounds that hairlines on band are decorative. | **(a)** — single-token change, preserves clean namespace, improves contrast everywhere (including SPEC-008-shipped cards). Visual change is ~4 tonal steps darker — consistent with editorial design language, arguably an upgrade in hairline weight. |
| AG-2 | **R1 `about.html` hero strategy** — Concept A adoption vs `.hero-profile` variant retention. | (a) Adopt Concept A with photo in 58-col headline column (`ui-designer` spec D1.1); (b) Skip Concept A, retain `.hero-profile` variant, design-language refresh only (`architect-reviewer` recommendation). | **Split — flag for Rob.** `ui-designer` argues brand-consistency with index.html; `architect-reviewer` argues structural risk avoidance. My read: **Option A** is more consistent with SPEC-008's intent ("Concept A propagates to all 5 pages with page-appropriate content" — `SPEC-008.md:608`). The photo-in-58-col treatment preserves identity while adopting the grammar. Option B is defensible but orphans about.html from the site-wide pattern. |
| AG-3 | **R3 `resume.html` band choice.** | (a) One band on Summary + hairline dividers elsewhere (`ui-designer` + `architect-reviewer` concurrence); (b) Zero bands, hairlines-only throughout. | **(a)** — Summary is the only prose-synthesis section and earns visual distinction; enumerated sections (Experience, Education, Skills) read better on cream with editorial dividers. Both specialists agree. |

### Effort Comparison (Arch Review stage)

| | AI-Assisted | Human Solo |
|---|---|---|
| Arch Review (3 agents in parallel) | ~6 minutes wall-clock (parallel execution across architect-reviewer + ui-designer + graphic-artist) | 6–10 hours (R2 callsite audit across 4 lines + R4 callsite audit across 5 lines + WCAG contrast verification for 7 color tokens on new surface + cascade shadowing analysis on 3 subpage heroes + band-rhythm structural analysis on resume + per-page hero adaptation design + R5 documentation draft + IG synthesis, sequential) |
| Assumptions | Full repo access for all three reviewers. SPEC-008 Arch Review as structural template. Complete SPEC-009 spec with Spec Gate Q1–Q4 resolved. WCAG luminance math computed directly (not approximated). Line numbers verified against file contents at review time. No browser runtime — all findings are code-level; visual-calibration confirmation deferred to `ui-designer` QA pass. |

### Arch Gate Decisions (2026-04-22)

| # | Decision | Status |
|---|----------|--------|
| AG-1 | R4 hairline remediation → **Option (a)** — `--color-border-hairline` darkened globally from `#8E8A84` to `#7E7A74`. Passes WCAG 1.4.11 on all three surfaces: 3.95 on cream, 3.78 on elevated card (up from 3.13), 3.58 on new band. Net hairline weight slightly heavier — consistent with editorial design language. | Accepted |
| AG-2 | R1 `about.html` hero strategy → **Option (a)** — adopt Concept A with profile photo in the 58-col headline column per `ui-designer` D1.1. Brand-consistency with `index.html`; matches SPEC-008 R3.1 "all 5 pages" intent. Cascade cleanup per IG-3 required. | Accepted |
| AG-3 | R3 resume band choice → **Option (a)** — one alternating band on Summary, hairline-rule dividers on Earlier Experience, Education, Skills via new `.section-rule-top` utility. Experience follows Summary's band edge directly, no rule needed. | Accepted |

All 8 IG items (IG-1 through IG-8) accepted as-written.

### Arch Gate Approval

**Decision:** Approved
**Approved by:** Rob Parker
**Date:** 2026-04-22
**Annotation:** All three Arch Gate recommendations accepted. AG-1 is technically a site-wide token change beyond the Spec-Gate R4 scope — accepted on the grounds that hairline compliance across ALL surfaces is strictly stronger than the original "cards only" guarantee, and that the slightly heavier hairline weight reads as an editorial upgrade rather than a regression. AG-2 resolves the cross-specialist split in favor of ui-designer's position; the SPEC-008 R3.1 language ("all 5 pages") is load-bearing intent that architect-reviewer's conservatism would have violated. AG-3 is consensus — straightforward.

---

## QA Review (2026-04-22)

Two reviewers ran the QA Gate: `code-reviewer` (quality/security/correctness) and `qa-expert` (acceptance criteria + WCAG + anti-pattern divergence). Initial verdicts: `code-reviewer` APPROVE with one in-pass note; `qa-expert` REQUEST CHANGES with two block findings. After fixes below, the implementation meets acceptance.

### Block findings (resolved)

| # | Finding | File:Line | Resolution |
|---|---------|-----------|------------|
| BF-1 | Orphaned `.hero-profile .hero-content` flex rule lingered inside `@media (min-width: 768px)` block — IG-3 cleanup missed the responsive block. Dead code (about.html has zero `.hero-content` elements post-migration) but contradicts the cleanup WHY comment. | `css/style.css:1646-1650` (pre-fix) | Five-line flex rule deleted. `.hero-profile-photo img` sizing rule at the same breakpoint retained (still valid — photo exists in new `.hero-headline-col` structure). |
| BF-2 | `about.html` `.hero-positioning` element had zero CSS rules defined anywhere in the stylesheet — the IG-3 deletion removed the old `.hero-profile-text .hero-positioning` color-override, and no base `.hero-positioning` rule existed to replace it. Positioning text on about.html would have fallen through to plain body styles, losing the expected subheadline treatment. `advisory.html:88` uses `class="hero-subheadline"` for the equivalent role and gets proper styling via `.hero-subheadline` rule. | `about.html:109` | Changed `class="hero-positioning"` to `class="hero-subheadline"` — one-character-semantic fix, unifies subpage heros against the established token. |

### Notes resolved in this pass

- **N-1 (code-reviewer)** — `.hero-profile-photo { margin-bottom: var(--space-6) }` was added by `frontend-developer` as a cascade-preservation fix but carried no WHY comment. Added WHY block at `css/style.css:1118-1120` explaining that the margin formerly inherited from the deleted `.hero-profile .hero-content` flex gap.

### Notes flagged for future visual-QA (non-blocking)

- **N-2 (qa-expert)** — `.philosophy-quote` on about.html now sits on `--surface-color` inside a `.section-alt` band that is also `--surface-color`. Quote-bg equals band-bg post-R4; differentiation collapses to the 4px magenta left-border accent. Flagged in Arch Review D1 findings table and intentionally accepted. Worth a visual sanity check when Rob views about.html in-browser.
- **N-3 (qa-expert)** — `--color-text-subtle` (3.09:1) and `--color-magenta` (3.07:1) margins on `#EDEBE4` are near-floor. No active normal-text usage on the band surface was confirmed during review, so the "AA-large only" constraint in the refreshed `:root` comment is sufficient guardrail. Tracked as a hard constraint on any future `--surface-color` darkening.

### Acceptance criteria — final status

| AC | Verdict | Notes |
|----|---------|-------|
| R1 — Subpage hero migration | PASS | about.html Concept A with photo-in-headline-col, advisory.html standard 58/42, contact.html left-aligned single-column variant. Hero-subheadline class unified across about + advisory (BF-2 fix). Orphaned cascade rules cleaned per IG-3 (BF-1 fix). |
| R2 — Canonical magenta migration + alias retirement | PASS | `grep -c 'var(--primary-color)' css/style.css` = 0. Declaration deleted. Legacy comment block at `:88-91` retired. Historical WHY mentions at `:281`, `:1472` retained (read correctly post-retirement). |
| R3 — Resume section rhythm | PASS | Single `.section-alt` on Summary; three `.section-rule-top` dividers on Earlier Experience, Education, Skills. `.section-rule-top` utility class added with WHY comment. |
| R4 — Surface elevation differentiation | PASS | `--surface-color` = `#EDEBE4`. `--color-border-hairline` and legacy `--border-color` both = `#7E7A74` (AG-1). `:root` contrast-pair comment block refreshed with full D4 table. `index.html` inherited the token changes as an improvement (no regression per qa-expert analysis). |
| R5 — Font byte-budget documentation | PASS | `fonts/SOURCE.md` "## Byte Budget" section added with actuals, budget reference, and three-reason rationale for no tooling introduction. |
| R6 — Warning banner AG-3 pin | PASS | WHY block at `css/style.css:2041-2045` mirrors AG-3 error-banner pattern. |
| AP-1..AP-8 | PASS | No anti-pattern reintroductions. AP-3 (centered hero) specifically verified — contact hero is genuinely left-aligned via `margin-left: 0; text-align: left`. |
| SPEC-008 CR-1/CR-2 preservation | PASS | `.hero h1` cascade single-source-of-truth maintained. No colliding rule re-introductions. |

### QA Gate approval

**Decision:** Approved
**Approved by:** Rob Parker
**Reviewers run:** `code-reviewer` (initial: APPROVE with 1 in-pass note → resolved), `qa-expert` (initial: REQUEST CHANGES with 2 block findings → both resolved in-pass)
**Date:** 2026-04-22

---

*Queued 2026-04-22 from SPEC-008 QA Review deferred-items list. Architect-Review delivered and approved 2026-04-22. QA Gate approved 2026-04-22.*
