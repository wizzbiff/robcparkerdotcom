# SPEC-023: How-Built Page — Show the Work, Attribute the Source, De-dup the Diagram

**Status:** Draft — Spec Gate pending
**Tier:** Standard (single page + one CSS block; pure copy would be Trivial, but the diagram de-duplication forces a mobile-responsive design decision and the attribution involves a third party Rob coordinated with — both warrant Standard's Decision Rationale + Arch Gate String Lock.)
**Author:** PM-Spec (from Rob's request 2026-06-03 — three changes to `how-this-site-was-built.html`: tone down self-promotion toward factual "show the work"; add explicit attribution of the SDD process to GeekByte / Grant Howe / the dashboard URL; remove the duplicated vertical pipeline diagram, keep the horizontal one.)
**Date:** 2026-06-03
**Branch:** `spec/SPEC-023-how-built-attribution`

---

## Summary

Three coordinated edits to a single page, `how-this-site-was-built.html`:

1. **Show the work, don't sell it.** Shift the page's voice from comparative self-promotion ("Most engineering leaders can describe… Few can show a working example") toward plain statement of fact ("This page is a working example of AI-native practices"). Five self-promotional passages are in scope.
2. **Attribute the SDD methodology.** The page currently credits a vague "prior work on structured agentic development pipelines." Make it explicit: the SDD process originates with **GeekByte** and **Grant Howe** (`https://www.geekbyte.biz/sdd/dashboard`). Attribution should be **prominent but not the focal point**; Rob's framing is that his SDD is an *extension* of GeekByte's — he takes personal credit only for the parts he extended or filled in, while still presenting the whole process. Grant Howe has approved the attribution.
3. **De-duplicate the pipeline diagram.** The SDD pipeline diagram is authored twice — a horizontal SVG (`.diagram-desktop`) and a vertical SVG (`.diagram-mobile`), swapped by a `@media (max-width: 768px)` rule. Keep the horizontal one; remove the vertical one. *(Caveat: the vertical SVG is the page's mobile rendering — removing it requires a mobile-fallback decision. See Q1.)*

No other page changes. No new dependencies.

## Context

### Source

- **Rob's request, 2026-06-03** (three explicit items, verbatim intent captured in Summary).
- **Page provenance:** the page shipped in SPEC-016 ("how-this-site-was-built"). SPEC-022 just neutralized two job-seeking strings on it (lines 154, 856) — this spec touches some of the same passages, which is expected and coordinated.

### Inventory (audit 2026-06-03)

All line numbers pre-change. Exact replacement strings are **not** finalized here — marketing-copywriter locks them at Arch Gate (house pattern). This is the scope manifest.

**Task 1 — self-promotional passages to make factual**
| Line | Current text (self-promotional) | Why it reads as selling |
|------|---------------------------------|--------------------------|
| 128 (hero) | "…then shipped to production. **No slidedeck. No hypothetical.**" | Negation-framed credibility claim — "others just talk; I ship." |
| 154 (why) | "**Most engineering leaders can describe how they would bring AI-native practices to an organization. Few can show a working example. This page is one.** Every spec in this repo… The site itself is the proof." | Comparative humble-brag (most/few credibility gradient). Rob's example replacement: "This page is a working example of AI-native practices." |
| 737 (tiers) | "The tier-and-gate-ownership model is a **Rob-specific extension to the foundational SDD pipeline.** It was developed to make the methodology run sustainably with a single human operator…" | "Rob-specific extension" + framing the constraint as sophisticated design. *Also* the natural second attribution anchor (Task 2). |
| 844 (Pareto callout `<blockquote>`) | "The methodology behind this site is **the same methodology I'd bring to your engineering organization.**" | Direct sales pitch / prospecting. |
| 856 (closing CTA `<p>`) | "…every deployed change is in the public repo. **If you build this way too, let's talk.**" | Prospecting CTA (lightly softened already by SPEC-022). |

**Task 2 — attribution anchors**
| Line | Current text | Role |
|------|--------------|------|
| 155 (why) | "The SDD methodology described here is **adapted from prior work on structured agentic development pipelines using Claude Code.** The two-layer architecture, the tier system, and the Solo Operator gate-ownership model are extensions developed for this site." | Primary anchor — make the source explicit (GeekByte / Grant Howe / link). |
| 737 (tiers) | "…extension to the **foundational SDD pipeline.**" | Secondary anchor — name whose foundational pipeline. |

**Task 3 — diagrams**
| Diagram | Lines | Class | viewBox | Shown when |
|---------|-------|-------|---------|-----------|
| Horizontal (**keep**) | 174–285 (`<figure>` w/ SVG) | `.diagram-desktop` | `0 0 1200 220` | desktop (default) |
| Vertical (**remove**) | 287–391 (`<figure>` w/ SVG) | `.diagram-mobile` | `0 0 320 900` | `@media (max-width:768px)` |
| CSS swap rules | `css/style.css:2412–2419` | both | — | — |

The two SVGs are fully decoupled (mobile uses `m-`-prefixed classes; each has its own inline `<style>`/`<defs>`). Removing the vertical SVG will not break the horizontal one. The shared dependency is only the `css/style.css` display/media-query block (2412–2419), which must be updated in the same change.

### External-link convention (for the GeekByte link)

Existing external links on this page use: full URL, `target="_blank"`, `rel="noopener noreferrer"`, verbose `aria-label` ending "(opens in new tab)". The GeekByte link will match (see `how-this-site-was-built.html:137-139`, `773-778`).

## Decision Rationale

### Pre-resolved framing

- **Copy locked at Arch Gate.** Per `.claude/development-workflow.md` + house pattern, marketing-copywriter produces the byte-locked replacement strings at Arch Gate; Spec Gate sets direction.
- **Factual register, not self-erasing.** "Show the work" means dropping the comparative/prospecting framing — not deleting Rob's legitimate authorship of the extensions. The attribution explicitly delineates GeekByte's foundation from Rob's extensions, so factual ≠ uncredited.
- **One diagram, but mobile must stay readable.** The "duplication" Rob sees is a responsive desktop/mobile pair. Keeping only the horizontal SVG is fine *if* mobile gets a fallback (Q1) — a 1200-unit-wide viewBox scaled into a 375px phone renders the stage labels illegibly.

### Constraints

- **Third-party attribution.** GeekByte/Grant Howe is a real external party Rob has coordinated with; the wording must be accurate and respectful, neither over- nor under-claiming. "Prominent but not focal" is Rob's explicit calibration.
- **No build step.** Diagram swap is CSS + inline SVG; any mobile fallback is CSS-only.
- **SPEC-022 overlap.** Lines 154 and 856 were just edited; this spec re-edits them. The String Lock must quote the *current* (post-SPEC-022) text as the OLD string.

### Trade-offs accepted

- Removing the bespoke vertical/mobile SVG trades a hand-tuned mobile layout for a simpler single-diagram approach; the mobile fallback (Q1) is the cost of honoring the de-dup request.
- A factual closing section may convert less aggressively than a prospecting CTA — consistent with the page's purpose shifting from pitch to portfolio-of-record.

## Requirements

- **R1 — Factual voice.** Rewrite the five Task-1 passages (128, 154, 737, 844, 856) to state facts rather than sell. Byte-locked at Arch Gate. The line-154 lead follows Rob's example direction ("This page is a working example of AI-native practices").
- **R2 — Explicit attribution.** Rewrite line 155 (and, per Q2, line 737) to credit GeekByte and Grant Howe by name with a link to `https://www.geekbyte.biz/sdd/dashboard`, framing Rob's SDD as an extension of GeekByte's foundational pipeline and crediting Rob only for the parts he extended/filled in. The whole process remains presented on the page. Link matches the page's external-link convention.
- **R3 — Single diagram.** Remove the vertical SVG figure (`how-this-site-was-built.html:287–391`) and reconcile `css/style.css:2412–2419` so the horizontal diagram is the sole pipeline diagram, with mobile handled per the Q1 resolution. The `figcaption` ("Figure 1…") must remain attached to the surviving (horizontal) figure exactly once.
- **R4 — No collateral changes.** No other section's content, no nav/footer, no other page, no JS. The two-layer architecture diagrams in Section 4 are out of scope (Task 3 is the *pipeline* diagram only).

### Not in scope

- The Section 4 "two-layer architecture" diagrams (only the Section 3 *pipeline* diagram is duplicated/in scope).
- Any other page; nav/footer; `js/main.js`.
- Adding pricing, services, or advisory framing (this is the opposite direction).
- Rewriting factual technical content (tier definitions, node descriptions, architecture explanation) beyond the five self-promotional passages and the two attribution anchors.

## Acceptance Criteria

- **AC1:** None of the five Task-1 passages contains comparative/prospecting framing post-change. Specifically: no "No slidedeck. No hypothetical.", no "Most…/Few can show…", no "I'd bring to your engineering organization", no "if you build this way too, let's talk" (or the copywriter-locked factual equivalents are present byte-identically).
- **AC2:** Line 155 (and per Q2, 737) names **GeekByte** and **Grant Howe** and contains a link with `href="https://www.geekbyte.biz/sdd/dashboard"`, `target="_blank"`, `rel="noopener noreferrer"`, and an aria-label ending "(opens in new tab)".
- **AC3:** The attribution clearly frames Rob's work as an extension of GeekByte's foundational SDD pipeline (delineates source vs. extension) — verified by reading, not just grep.
- **AC4:** Every replacement string matches the Arch Gate Pre-Implementation String Lock byte-identically.
- **AC5:** The page contains exactly **one** pipeline-diagram `<figure>` in Section 3 (`#pipeline`); the `.diagram-mobile` SVG (and its `m-`-prefixed `<style>`) is gone; `grep -c 'class="diagram-mobile"'` = 0; `grep -c 'class="diagram-desktop"'` = 1.
- **AC6:** `css/style.css` no longer references `.diagram-mobile`; the surviving horizontal diagram renders without overflow/illegibility at 768px and 375px per the Q1 resolution.
- **AC7:** Exactly one `figcaption` ("Figure 1: The SDD Pipeline…") remains in `#pipeline`.
- **AC8:** Browser console clean on the page; no broken internal anchors (`#pipeline` still resolves; the hero "See the Pipeline" button still lands on the surviving figure).
- **AC9:** Responsive check at 768px and 375px — the page (esp. the de-duplicated diagram and any reflowed copy) renders cleanly.
- **AC10:** No other page/file changed except `how-this-site-was-built.html` and `css/style.css` (verified by `git show --stat`).

## Open Questions — Spec Gate

### Q1 — Mobile fallback for the single (horizontal) diagram *(the load-bearing decision)*

The "vertical" diagram Rob wants removed is actually the **mobile rendering** — at ≤768px, CSS hides the horizontal SVG and shows the vertical one (`css/style.css:2416-2418`). The horizontal SVG has a 1200-unit-wide viewBox; scaled into a 375px phone it becomes ~69px tall with microscopic stage labels. So "keep only horizontal" needs a mobile plan.

- **PM-Spec recommendation:** **(A) Keep only the horizontal SVG; make it horizontally scrollable on mobile.** Remove the `.diagram-mobile` SVG + the `@media` swap, and give the horizontal diagram's wrapper `overflow-x: auto` with a sensible min-width at ≤768px so phone users swipe to read the full pipeline at legible size. One diagram, readable everywhere, a common and accessible pattern.
- **Rationale:** Honors Rob's "one diagram" intent while preventing a mobile legibility regression. CSS-only; no new SVG.
- **Alternatives:** (B) **Scale-to-fit** — let the horizontal SVG shrink to viewport width (simplest, but labels likely illegible at 375px; not recommended). (C) **Keep the responsive pair** — don't delete the vertical SVG; it's not a true on-screen duplicate (only one shows per viewport). Preserves mobile readability with zero new CSS but does not fulfill the de-dup request as literally stated. *(I'm surfacing this because Rob may be reacting to seeing both in source / when resizing, not both at once on one screen.)*

### Q2 — Attribution prominence and placement

Rob wants attribution **prominent but not the focal point**.

- **PM-Spec recommendation:** **Inline-explicit, two anchors.** Make the credit explicit at **line 155** (high on the page, in "Why This Page Exists" — names GeekByte + Grant Howe + the dashboard link) and name GeekByte's "foundational SDD pipeline" at **line 737** where Rob's extensions are delineated. This is prominent (named, linked, near the top, and at the exact point credit is due) without a dedicated banner that would make attribution the page's focal point.
- **Rationale:** Two well-placed inline credits read as integral and respectful; a standalone "Credits" hero/callout risks over-rotating into focal. Honors "extension of GeekByte's, credit only what Rob extended."
- **Alternatives:** (a) **Dedicated attribution callout** (e.g., a styled note before the pipeline section) — more prominent, risks becoming focal; (b) **Minimal** — only expand line 155, leave 737 — least prominent, weaker source/extension delineation.

### Q3 — How far to de-promote the closing CTA section

The page ends with a dark CTA section: h2 "**This Page Is the Portfolio**", the prospecting line "If you build this way too, let's talk", and a "Get in Touch" button — plus the Pareto `<blockquote>` ("…the same methodology I'd bring to your engineering organization"). This is the most sales-forward block on a page Rob wants to read as "showing the work."

- **PM-Spec recommendation:** **Soften to factual, keep a low-key contact path.** Convert the Pareto callout and CTA copy from prospecting ("I'd bring to your org", "let's talk") to neutral statements of fact (the methodology is reusable/generalizable; the full record is in the public repo). Keep the "Get in Touch" button (a quiet affordance, not a pitch) and the section, but drop the salesy headline/copy. Copywriter locks exact wording.
- **Rationale:** Matches "show the work, not sell"; preserves a contact affordance without the pitch. Consistent with SPEC-022's neutral-positioning direction.
- **Alternatives:** (a) **Remove the CTA section entirely** — purest "just the work", but loses the contact path and leaves the page ending abruptly; (b) **Light touch** — only fix the two flagged lines, keep "This Page Is the Portfolio" headline — less consistent with the stated intent.

## QA Checklist (preview — finalized at Stage 5)

- AC1–AC10 verified (grep for removed self-promo phrases; attribution link attributes; single-diagram counts; CSS `.diagram-mobile` absence).
- Browser render + console sweep; internal anchor `#pipeline` + "See the Pipeline" button still land correctly.
- Responsive at 768px and 375px — diagram legibility under the Q1 resolution is the primary check.
- Apex-only live verification post-deploy.
- `git show --stat` confirms only the two in-scope files changed.

## Risk + Reversibility

- **Risk:** Low-moderate. Copy edits are low-risk; the diagram removal + mobile fallback is the main surface (responsive regression risk, caught by AC6/AC9). Attribution accuracy is a correctness (not technical) risk — mitigated by Arch Gate copywriter lock + Rob's review.
- **Reversibility:** `git revert` restores the vertical SVG and prior copy atomically. No data, no migration.
- **Operator surface:** None — no Cloudflare/DNS/third-party config. (Grant Howe's approval is already obtained.)

---

## Open Questions Summary (for Spec Gate walkthrough)

| Q | Topic | PM-Spec recommendation |
|---|-------|------------------------|
| Q1 | Mobile fallback for the single diagram | (A) Keep horizontal only; make it horizontally scrollable on mobile |
| Q2 | Attribution prominence/placement | Inline-explicit at lines 155 + 737 (named, linked; prominent, not focal) |
| Q3 | De-promoting the closing CTA section | Soften to factual; keep a low-key "Get in Touch" affordance |

---

## Spec Gate Resolutions (2026-06-03)

| Q  | Topic | Resolution |
|----|-------|-----------|
| Q1 | Diagram de-duplication | **Keep both (responsive pair).** Once it was clear the "vertical" diagram is the mobile rendering (only one shows per viewport, never both at once), Rob chose to keep the responsive pair. **Task 3 is dropped** — no SVG removal, no CSS change. R3, AC5–AC7, and the `css/style.css` portion of AC10 are struck. |
| Q2 | Attribution placement | **Two-anchor inline**, with Rob's byte-locked lead sentence: **"Adapted from GeekByte's structured agentic development pipeline, developed by Grant Howe"** + a link to `https://www.geekbyte.biz/sdd/dashboard` (matching the page's external-link convention). Primary anchor replaces the vague "adapted from prior work…" clause at line 155; second anchor in the Tiers section (line 737) names GeekByte's foundational pipeline consistently. Prominent (named, linked, near top + at the credit-delineation point) but not a dedicated banner. |
| Q3 | Closing CTA section | **Remove the closing CTA section entirely** (the dark `section-dark cta-section` — h2 "This Page Is the Portfolio", the "…if you build this way too, let's talk" `<p>`, and the "Get in Touch" button). Purest portfolio-of-record ending; the page ends on the "Future Evolution" section. Rob accepts no bottom-of-page contact handoff (the global nav Contact link remains). |

### Revised scope (post-resolution)

**Single file in scope: `how-this-site-was-built.html`.** `css/style.css` is no longer touched (Task 3 dropped).

1. **Task 1 — factual voice** on the self-promotional passages that remain after the CTA section is removed: **lines 128, 154, 737, 844**. (Line 856 is removed wholesale as part of the closing-CTA-section deletion per Q3, so it needs no separate rewrite.)
   - **Note (Q3 boundary):** the Pareto callout `<blockquote>` at **line 844** lives inside the **"Future Evolution"** section (834–847), *not* the closing CTA section. Removing the CTA section does **not** remove it — it still gets the factual softening under Task 1 and, after CTA removal, becomes the page's closing element. Direction: convert "the same methodology I'd bring to your engineering organization" to a neutral statement of generalizability (the operating model is reusable beyond this site).
2. **Task 2 — attribution**: lines 155 (locked lead sentence + link) and 737 (consistent second mention).
3. **Task 3 — diagram**: **dropped** (Q1).
4. **NEW — remove closing CTA section** (Q3): delete the dark `cta-section` (`how-this-site-was-built.html` ~851–861). Confirm no internal anchor targets `#cta-heading` elsewhere on the page before removal (the hero "See the Pipeline" button targets `#pipeline`, not the CTA — but verify at implementation).

### Revised Acceptance Criteria (supersede where noted)

- **AC1 (revised):** None of lines 128, 154, 737, 844 contains comparative/prospecting framing post-change (copywriter-locked factual equivalents present byte-identically). The closing CTA section is absent.
- **AC2, AC3, AC4:** unchanged (attribution naming/link/extension-framing + byte-lock).
- **AC5, AC6, AC7 (struck):** diagram de-dup dropped per Q1.
- **AC8 (revised):** Browser console clean; `#pipeline` still resolves and the hero "See the Pipeline" button still lands on the (unchanged, still-dual) pipeline figure; no dead internal anchor left by the CTA-section removal.
- **AC9 (revised):** Responsive at 768px/375px — both diagrams still render as before (unchanged); verify reflow of any rewritten copy and that the page ends cleanly on "Future Evolution" with no orphaned/empty section where the CTA was.
- **AC10 (revised):** Only `how-this-site-was-built.html` changed (no `css/style.css` change now) — verified by `git show --stat`.

**Spec Gate Decision:** Approved 2026-06-03. The gate corrected a mental-model error before it cost anything — the "duplicate" diagram is a responsive desktop/mobile pair (never shown together), so the de-dup task was dropped rather than shipping a mobile legibility regression; scope collapsed to a single-file copy + attribution + CTA-removal change.

---

## Arch Gate (2026-06-03)

### Specialists invoked

- **architect-reviewer** (Layer 2) — CTA-removal boundary/safety analysis, attribution-link convention, completeness sweep, IG list. Returned **APPROVE WITH CONDITIONS** (conditions = the String Lock + IG residual targets, all absorbed below).
- **marketing-copywriter** (Layer 2) — produced the Pre-Implementation String Lock; revised the line-844 callout on a follow-up pass to clear an AG-IG-3 redundancy.
- **penetration-tester** — NOT invoked. Zero security surface (copy edits + one external link with `rel="noopener noreferrer"` + section deletion; no input handling, no JS, no new headers).

### Arch findings worth recording

- **CTA removal is clean.** Delete lines **849–859** (the owning comment block 849–852 + the `<section class="section section-dark cta-section">` 853–859). Nothing references `#cta-heading` in-page (`href="#cta-heading"` count = 0) or in `js/main.js`. The CTA was the page's only `section-dark` and was explicitly carved out of the one-alt-band rule (AG-IG-17), so removing it does **not** perturb the section-band cadence. Page then ends on `#future`.
- **Pareto callout survives and becomes the closer.** The `<blockquote class="sdd-pareto-callout">` (843–845) is inside `#future` (834–847), not the CTA — it stays and gets the Task-1 rewrite. After CTA removal it is the page's terminal element; the rewrite was revised to NOT echo line 840's "not specific to this site / generalizes" beat (AG-IG-3) and instead carries the public-repo pointer that would otherwise be lost with the CTA.
- **Completeness sweep:** no out-of-inventory prospecting phrasing on the page. The Task-1 set (128, 154, 737, 844) + the wholesale CTA removal (855–857) is exhaustive.
- **Q2 link strategy (copywriter):** link **once** at line 155 (anchor text = "GeekByte's structured agentic development pipeline"); name-only "GeekByte" at 737 (no second link); "Grant Howe" named only at 155. Calibrated to "prominent, not focal."
- **Out-of-scope flag (no action):** the shared footer tagline "Engineering leadership, delivered." (every page) is the same value-proposition register this spec pulls back from — a future site-wide copy pass candidate, not SPEC-023 scope.

### Pre-Implementation String Lock

Implementer ships these **byte-identically**.

| Line | Element | NEW string (byte-locked) |
|------|---------|--------------------------|
| 128 | hero `<p>` | `Every page on this site was specified, reviewed, built, and deployed through a multi-agent SDD pipeline — then shipped to production.` |
| 154 | `#why` 1st `<p>` | `This page is a working example of AI-native practices. Every spec in this repo, every commit, every gate decision is an artifact of the SDD methodology described here.` |
| 155 | `#why` 2nd `<p>` | `Adapted from <a href="https://www.geekbyte.biz/sdd/dashboard" target="_blank" rel="noopener noreferrer" aria-label="GeekByte's structured agentic development pipeline (opens in new tab)">GeekByte's structured agentic development pipeline</a>, developed by Grant Howe. The two-layer architecture, the tier system, and the Solo Operator gate-ownership model are extensions developed for this site.` |
| 737 | `#tiers` 2nd `<p>` | `The tier-and-gate-ownership model is an extension to GeekByte's foundational SDD pipeline. It was developed to make the methodology run sustainably with a single human operator, and that constraint shaped both the tier definitions and the gate structure.` |
| 844 | Pareto `<blockquote class="sdd-pareto-callout">` (text only; keep element + class) | `Every spec, every gate decision, and every deployed change that produced this site is in the public repository — the full record is checkable.` |

**Section deletion (Q3):** remove `how-this-site-was-built.html` lines **849–859** inclusive (comment + `<section …cta-section>` … `</section>`); leave one blank line before `</main>`.

### Implementation Guidance (IG list)

- **AG-IG-1** — Delete the closing CTA section, lines 849–859 (comment 849–852 + section 853–859). Collapse to a single blank line before `</main>`. *Source: architect; Q3.*
- **AG-IG-2 — CTA-removal verification greps** (on the page): `cta-section` → **0** (was 1); `cta-heading` → **0** (was 2); `href="#cta-heading"` → **0**; `This Page Is the Portfolio` → **0**; `section-dark` → **0** (was 1). *Source: architect.*
- **AG-IG-3** — Rewrite line 844 text inside the surviving `<blockquote>`; ship the revised lock (public-repo pointer); must NOT echo line 840's "generalizes"/"not specific to this site". *Source: architect + copywriter revision.*
- **AG-IG-4 — Attribution** at 155 (locked sentence + conventional external link, anchor text = the pipeline noun phrase) and 737 (name "GeekByte", no second link). *Source: architect; Q2.*
- **AG-IG-5 — Attribution verification greps** (on the page): `geekbyte.biz/sdd/dashboard` → **1**; `GeekByte` → **2** (155 + 737; true-positive target exactly 2); `Grant Howe` → **1**; `adapted from prior work` (case-insensitive) → **0**. *Source: architect.*
- **AG-IG-6 — Task-1 residual greps** (case-insensitive, on the page): `No slidedeck` → **0**; `Few can show` → **0**; `the proof` → **0** (was 1); `I'd bring` → **0** (was 1). True-positive target 0 for all. *Source: architect.*
- **AG-IG-7 (optional hygiene)** — The WHY comment at lines 703–705 contains "(not counting the dark closing CTA)", which references the deleted section. Non-blocking; implementer may trim the parenthetical. If touched, re-read 703–706 to confirm the `section-alt` markup on 706 is intact (Edit Safety). *Source: architect.*
- **AG-IG-8 — Page-tail structural assertion:** after edits, the last `<section>` in `<main>` is `id="future"`, closing on the Pareto `<blockquote>` → `</div>` → `</section>` → `</main>`; `<section>` open/close counts balanced (one of each dropped). *Source: architect.*
- **AG-IG-9 — No collateral:** `git show --stat` shows only `how-this-site-was-built.html` changed (no `css/style.css`, no `js/main.js`, no other page). *Source: architect; AC10-revised.*
- **AG-IG-10** — Browser/responsive QA: console clean; `#pipeline` resolves and the hero "See the Pipeline" button still lands; at 768px/375px verify the page ends cleanly on `#future` (no orphaned band/whitespace where the CTA was) and the new inline link at 155 wraps cleanly + is keyboard-focusable. Diagrams unchanged (Task 3 dropped) → no diagram regression risk. *Source: architect §6.*

**Arch Gate Decision:** Approved 2026-06-03 with conditions absorbed — implementation may begin. Two-reviewer parallel retired the structural risk (CTA removal verified free of dangling anchors / band-cadence breakage) and the content risk (copywriter lock, including a caught redundancy where the new closing callout would have echoed the line above it).

---

## Implementation Notes (2026-06-03)

Shipped all five byte-locked strings (128, 154, 155, 737, 844), removed the closing CTA section (lines 849–859), trimmed the now-stale "(not counting the dark closing CTA)" parenthetical in the WHY comment (AG-IG-7), and updated the Pareto callout's own comment ("standalone before closing CTA" → "page-terminal"). Single file changed.

### Verification results

- **AG-IG-2 (CTA removal):** `cta-section`, `cta-heading`, `href="#cta-heading"`, `This Page Is the Portfolio`, `section-dark` all → **0**. **PASS.**
- **AG-IG-5 (attribution):** `geekbyte.biz/sdd/dashboard` = **1**, `GeekByte` = **2** (155 + 737), `Grant Howe` = **1**, `adapted from prior work` = **0**. **PASS** (exact targets).
- **AG-IG-6 (Task-1 residuals):** `No slidedeck`, `Few can show`, `the proof`, `I'd bring` all → **0**. **PASS.**
- **AG-IG-9 (scope):** only `how-this-site-was-built.html` changed (8 insertions, 20 deletions). No `css/style.css`, no `js/main.js`. **PASS.**
- **AG-IG-8 (structure):** last `<section>` is `#future`; page ends `</section>` → `</main>` on the Pareto blockquote. See Finding 1 re: the grep count.

### Finding 1 — Section-balance grep false positive (benign)

`grep -c '<section'` returned 9 opens vs 8 closes — an apparent imbalance. Root cause: line 162 is a developer **comment** containing the literal text "`<section>`" in prose ("id="pipeline" is on the `<section>` element…"). Excluding that comment, actual opening `<section class=…>` tags = **8**, closing `</section>` = **8** — balanced and well-formed. The CTA section was removed cleanly. **Disposition: resolve inline; documented so QA's structural grep isn't misread.** Use `grep -E '<section[ >]'` (or exclude comments) for the true count.

### Finding 2 — Closing-beat distinctness confirmed

Line 840 closes the Future prose with "…the pattern generalizes"; the rewritten Pareto callout (844) closes the page with "…the full record is checkable." Distinct beats — the AG-IG-3 redundancy is retired. The repo-pointer that was being deleted with the CTA section now survives as the page's terminal, factual closer.

### Finding 3 — Diagram classes are shared by two diagram pairs (informational)

QA confirmed `class="diagram-desktop"` and `class="diagram-mobile"` each appear **twice** on the page — the Section-3 *pipeline* diagram AND the Section-4 *two-layer architecture* diagram both use the responsive desktop/mobile pattern. Task 3 was dropped, so all four are untouched, but this is worth noting: had the diagram de-dup proceeded, the removal would have needed to target the pipeline figure specifically (by `aria-labelledby`/figure, not by the shared class) to avoid clobbering the architecture diagram. Reinforces the Spec Gate Q1 decision to keep the responsive pairs. **No action.**

---

## QA-SPEC-023 Checklist (2026-06-03)

**Branch:** `spec/SPEC-023-how-built-attribution` · **Commit under test:** `7ea54cc`
**Specialists:** `qa-expert` (static) + `code-reviewer` (parallel).
**code-reviewer verdict:** **APPROVE** — byte-locked strings exact; CTA removal left balanced tags (`#future` is the last section; tail closes blockquote → `</div>` → `</section>` → `</main>`); attribution `<a>` well-formed and convention-compliant; "GeekByte" spelling consistent across both mentions; both stale comments updated; closing-beat redundancy avoided. No findings.

| # | Item | AC | Result |
|---|------|----|--------|
| 1 | Self-promo phrases removed (`No slidedeck`, `Few can show`, `the proof`, `I'd bring`, CTA strings) all → 0 | AC1 | **PASS** |
| 2 | Attribution: `GeekByte`=2, `Grant Howe`=1, dashboard link=1 (target/rel/aria-label correct), `adapted from prior work`=0 | AC2 | **PASS** |
| 3 | Extension framing reads as source(GeekByte) vs. extension(Rob) — delineated at 155 + 737 | AC3 | **PASS** (read check) |
| 4 | 5 locked strings byte-identical to String Lock (128, 154, 155, 737, 844) | AC4 | **PASS** |
| 5 | `#pipeline` resolves; hero "See the Pipeline" lands; no `#cta-heading` dead anchor; Contact still in global nav | AC8 | **PASS** (static) |
| 6 | Both diagram pairs intact (`diagram-desktop`=2, `diagram-mobile`=2); `css/style.css` unchanged | — | **PASS** |
| 7 | HTML well-formed: 8 `<section>` opens / 8 closes (the naive `grep -c '<section'`=9 is the line-162 comment false positive — Finding 1); page ends on `#future` | — | **PASS** |
| 8 | Scope: only `how-this-site-was-built.html` is a changed production asset (spec doc bundled per house convention) | AC10 | **PASS** |

**Static result: 8/8 PASS, 0 FAIL.**

### Deferred to operator visual check (browser-required)

- **AC8 — console clean** + GeekByte link keyboard-focus/activation (no JS changed → near-zero risk).
- **AC9 — responsive 768px/375px:** page ends cleanly on "Future Evolution" with no orphaned band/whitespace where the CTA was; the new inline link at 155 wraps cleanly; both diagram pairs render as before.

No static defects block approval.

---

## Additional Changes at QA (2026-06-03)

After reviewing the local preview, Rob requested five further edits to the same page — same "show the work / less self-promotion" theme, still pre-merge, so folded into SPEC-023 rather than spun into a new spec. Items 1–4 are Rob-dictated verbatim edits; item 5 (the Future Evolution rework) was byte-locked by marketing-copywriter (roadmap change + removal of the Phase-3/payment references).

| # | Change | Verification |
|---|--------|--------------|
| AC-1 | Remove the sentence "The two-layer architecture, the tier system, and the Solo Operator gate-ownership model are extensions developed for this site." from the attribution paragraph (line 155). | `grep -c 'extensions developed for this site'` → **0**. Attribution paragraph now reads "Adapted from [GeekByte's…pipeline], developed by Grant Howe." |
| AC-2 | Section heading "What's Working, What's Experimental, What's **Rough**" → "…What's **Evolving**". | `grep -c "What's Rough"` → **0**. |
| AC-3 | Intro "…what's being evaluated, and **what still has real problems**." → "…and **what's next**." | `grep -c 'still has real problems'` → **0**; "and what's next." present. |
| AC-4 | Card heading "**Rough or Evolving**" → "**Evolving**". | `grep -c 'Rough or Evolving'` → **0**; `>…Evolving` count = **2** (h2 + h3). |
| AC-5 | Rework Future Evolution para for the new roadmap: Phase 1 static site; **Phase 2 = "an AI agent modeled on Rob's life experience"; no Phase 3** (remove the subscription-billing phase). Copywriter-locked. | `grep -c 'Phase 3'`, `'subscription billing'`, `'payment compliance'`, `'db-architect'`, `'AI agent product'` all → **0**; "AI agent modeled on Rob's life experience" present (1). Para still ends on "…the inventory inside each layer does." for a clean handoff to the unchanged generalization paragraph. |

**Re-verification:** attribution intact (`GeekByte`=2, `Grant Howe`=1, dashboard link=1); sections balanced (8 real `<section>` / 8 `</section>` — the naïve grep "9" remains the line-162 comment false positive per Finding 1); scope still single production file (`how-this-site-was-built.html`). Static re-check passed; specialist QA agents were not re-invoked for these deterministic dictated edits + one copywriter-locked paragraph (proportionate; the visual check is Rob's preview re-eyeball).

### Flags raised by these changes

- **Finding 4 — CLAUDE.md / memory roadmap divergence (follow-up needed).** CLAUDE.md "Product Roadmap" still lists **Phase 2: AI agent product → Phase 3: subscription payment model**, and "Security › Future Requirements" lists payment/Stripe handling. The page now states Phase 2 = "AI agent modeled on Rob's life experience" and **no Phase 3**. This is a genuine product-direction change; CLAUDE.md and any roadmap memory should be reconciled to match. **Out of SPEC-023's page-copy scope — surfaced for Rob to decide whether to reconcile now or in a follow-on.**
- **Finding 5 — stale section id (cosmetic, no action).** The section's internal `id="working-experimental-rough"` still contains "rough" after the visible heading/card dropped the word. It is not visible and nothing anchors to it; left as-is to avoid needless churn. Noted for awareness.

**QA Gate Decision:** Approved 2026-06-03 — SPEC-023 implementation complete (8/8 static PASS + 5 Rob-requested additions verified; code-reviewer APPROVE; reflow/console + the additions visually verified by Rob on a local preview). PR opens next; live byte-equality re-confirmed at the Deploy Gate. Follow-up logged: reconcile CLAUDE.md/roadmap to the two-phase model (Finding 4), out of this spec's page-copy scope.

---

## Post-PR Correction — Diagram Responsive Bug (2026-06-04)

**Finding 6 (corrects the Spec Gate Q1 premise).** After PR #25 opened, Rob reported (with a screenshot, the architecture section) that **both** the horizontal *and* vertical diagrams render on desktop — they are NOT a working responsive pair. The Spec Gate Q1 analysis ("only one shows per viewport") was **wrong**: it read the CSS swap rules (`css/style.css:2413–2418`, `.diagram-desktop{display:block}` / `.diagram-mobile{display:none}` + `@media (max-width:768px)` swap) but missed that **every SVG carries an inline `style="…; display: block;"`** (HTML lines 185, 296, 432, 594). Inline styles outrank external class rules, so `display:block` was forced on all four SVGs at all viewports — the media-query swap never took effect, and both variants always rendered (in both the pipeline and architecture sections).

**Root cause:** inline `display: block` on the SVG `style` attribute overriding the responsive class CSS.

**Fix (HTML-only, no CSS change):** removed `display: block;` from the inline `style` of all four diagram SVGs:
- desktop SVGs (185, 432): `width: 100%; height: auto; display: block;` → `width: 100%; height: auto;`
- mobile SVGs (296, 594): `width: 100%; max-width: 320px; height: auto; display: block; margin: 0 auto;` → `width: 100%; max-width: 320px; height: auto; margin: 0 auto;`

The existing `.diagram-desktop`/`.diagram-mobile` + media-query rules now govern visibility unopposed: **desktop → horizontal only; ≤768px → vertical only**, for both diagram pairs. This is what Spec Gate Q1 *believed* the page already did — the fix makes the "keep both (responsive pair)" decision actually hold.

**Verification:** `grep -c 'display: block' how-this-site-was-built.html` → **0**; CSS swap rules unchanged; scope = single file. Visual confirmation (one diagram per viewport, desktop + mobile) is Rob's preview re-check — required, since this is a render bug not observable via grep.

**Process note (retro input):** a Spec-Gate claim about *rendered* responsive behavior was made from reading CSS class rules alone, without accounting for inline-style specificity — and shipped through Arch + QA gates because every check was grep/structure-based, not a real browser render. The diagrams were declared "unchanged, no regression risk" precisely because they were out of edit scope, so no one rendered them. **Lesson:** when a spec's correctness depends on *rendered* layout/visibility (not just markup presence), a real browser check belongs in the gate, not a grep. Candidate `governance/stack-quirks.md` entry: "inline `style="display:…"` on an element silently overrides responsive `.class{display}` media-query rules — check inline styles before trusting a CSS-class-based responsive swap."

## Deployment (2026-06-04)

**PR:** [#25](https://github.com/wizzbiff/robcparkerdotcom/pull/25) merged to `main` 2026-06-04.
**Merge commit:** `8777d29`.
**Cloudflare deploy:** completed within the standard window; live apex polled until the GeekByte attribution appeared, then verified.

### Live verification results (apex)

| Check | Result |
|-------|--------|
| Apex page live | `https://robcparker.com/how-this-site-was-built` → HTTP 200 ✓ |
| Attribution | `GeekByte` on 2 lines (155 attribution + 737 tiers; 3 raw occurrences = aria-label + link text + tiers), `Grant Howe` ×1, dashboard link ×1 ✓ |
| Self-promo / CTA removed | `No slidedeck`, `Few can show`, `This Page Is the Portfolio`, `I'd bring`, `extensions developed for this site`, `What's Rough`, `Rough or Evolving`, `section-dark` all → **0** ✓ |
| Roadmap | `Phase 3`, `subscription billing` → **0**; "AI agent modeled on Rob's life experience" present ✓ |
| New copy | "What's…Evolving" heading, "and what's next.", "the full record is checkable" all present ✓ |
| Diagram fix shipped | live markup: `figure…diagram-desktop` ×2, `figure…diagram-mobile` ×2, inline `display: block` → **0** ✓ (one diagram + caption per viewport; Rob-verified rendering on local preview pre-merge) |

### Findings post-deploy

None. Clean deploy. The diagram responsive swap (Findings 6–7) ships correct: the figure-level toggle + removed inline `display:block` are present on the live host.

**Deploy Gate Decision:** Approved 2026-06-04 — SPEC-023 live at https://robcparker.com/how-this-site-was-built. Page reads as portfolio-of-record: GeekByte/Grant Howe attributed with link; self-promotional framing and the closing CTA gone; two-phase roadmap; "Evolving" headings; and the diagram responsive swap fixed (one diagram + caption per viewport) — 0 self-promo/CTA/roadmap residuals on the live apex.

---

## Post-Completion Retro (2026-06-04)

### What went well

The copy half of the spec ran textbook: two-reviewer Arch (architect-reviewer + marketing-copywriter), a byte-locked String Lock, and grep-verifiable ACs meant the factual rewrites, the GeekByte attribution, and the CTA removal shipped with zero rework. The architect caught a closing-callout redundancy (the new last line would have echoed the line above it) that a copy-only pass would have missed. The local-preview review loop earned its keep three times over — it's where the 5 follow-on edits, the dual-diagram bug, and the duplicate-caption bug all surfaced.

### What surprised

The diagrams were never a working responsive pair. Spec Gate Q1 confidently described them as "desktop shows horizontal, mobile shows vertical, only one per viewport" — read straight from the CSS swap rules — but every SVG had an inline `style="…display:block"` that overrode the class rules, so all four always rendered. The bug was **pre-existing (from SPEC-016), not introduced here**, and the entire SPEC-023 pipeline (Spec → Arch → QA) sailed past it because the diagrams were "out of edit scope" and every gate check was grep/structure-based. It took Rob opening the page in a browser to see it — twice (both diagrams, then both captions).

### Process observations

- **Rendering-dependent correctness needs a real browser render in-gate, not grep.** When a claim is about what *displays* (responsive visibility, layout, overflow), markup/CSS-reading and grep can't verify it — and "out of scope → no regression risk → don't render it" is exactly the reasoning that let a latent render bug survive three gates. The preview check should be a first-class gate step whenever a spec touches (or even just neighbors) layout/visibility.
- **Inline `style` beats class CSS** — the specific gotcha worth codifying (stack-quirks entry added this closeout).
- **Scope grew twice at QA** (5 dictated edits, then the diagram fix). Folding them into the open spec/PR rather than spawning SPEC-024/025 was the right call (same page, same theme, pre-merge), but it stretched the QA "approval" across several rounds — acceptable here, worth watching as a pattern.

### Counterfactual

Without the in-gate browser preview, SPEC-023 ships and the how-built page keeps rendering two stacked diagrams (and doubled captions) on every desktop — a pre-existing SPEC-016 defect that no grep-based gate would ever have surfaced. The manual eyeball turned a clean-looking automated pass into a caught bug. Positive evidence that a real render belongs in the loop for visual specs.

### Stack-quirks follow-on

Added — see `governance/stack-quirks.md` (inline-style-overrides-responsive-class). The broader "render visual specs in a browser at the gate" lesson is captured here in the retro; promote to a stack-quirk if a second visual spec hits the same grep-only blind spot.

---

**Finding 7 — duplicate figcaption (follow-on to Finding 6).** After the inline-`display:block` fix, Rob reported the diagram **caption** still appeared twice per section on desktop. Root cause: each diagram pair is **two `<figure>` elements**, and the responsive `.diagram-desktop`/`.diagram-mobile` toggle was on the `<svg>` only — so hiding the mobile *svg* on desktop left the mobile `<figure>` and its `<figcaption>` visible (the caption has no swap class). **Fix:** moved the responsive toggle up to the `<figure>` — added `diagram-desktop`/`diagram-mobile` to each `<figure class="diagram-figure">` (kept the class on the `<svg>` too, so the visible svg retains `display:block` for `width:100%` sizing). The hidden variant's entire figure — svg **and** figcaption — is now `display:none`. Verified: 2 `figure…diagram-desktop` + 2 `figure…diagram-mobile` + 0 bare `diagram-figure` figures; 4 figcaptions present (2 now inside hidden figures per viewport); svg classes and the `display:block` removal intact. Visual re-confirmation is Rob's preview re-check.
