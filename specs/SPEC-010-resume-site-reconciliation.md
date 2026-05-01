# SPEC-010: Resume ↔ Site Reconciliation

**Status:** Spec Gate approved 2026-04-25
**Tier:** Trivial
**Author:** PM-Spec Agent (derived from `robcparker_com_audit.md` action #1, audit lines 276-284)
**Date:** 2026-04-25
**Branch:** `spec/SPEC-010-resume-site-reconciliation` (to be created at implementation start)

---

## Summary

Pure copy/numbers reconciliation pass that closes six specific drift points between the site (`index.html`, `about.html`) and the canonical resume (both `resume.html` and `files/rob-parker-resume.pdf`). All six are interview tripwires the audit flagged as Critical or Important. No structural changes, no nav/IA changes, no SEO/meta changes, no styling — copy and numbers only.

The six items, traceable to the audit's Prioritized Action #1:

1. `index.html` — "30+ Engineers Led Directly" → "26 Engineers Led" (or "Up to 26") to match the resume's actual headcount of 26.
2. `index.html` — "an 80% DevEx score" reframed with explicit DX (formerly GetDX) attribution; matching language added to `resume.html` and `files/rob-parker-resume.pdf` so the two artifacts agree.
3. `about.html` — narrow the AI-tools claim (currently lists Claude Code, GitHub Copilot, CodeRabbit) to "evaluated and piloted Claude Code and CodeRabbit; deployed GitHub Copilot at scale" so the site does not over-claim relative to the resume.
4. `index.html` — "Currently driving AI platform strategy" → "Most recently led AI platform strategy" (SugarCRM tenure ended March 2026; today is 2026-04-25).
5. Resume Summary — "built and led SugarCRM's multi-tenant AI platform" → "directed teams that built and shipped SugarCRM's multi-tenant AI platform" in BOTH `resume.html` and `files/rob-parker-resume.pdf`. The site's "directed" framing is more accurate.
6. `index.html` — "Athenahealth" → lowercase "athenahealth" to match the actual brand convention. (Audit Dimension 4 #5; bundled here as a trivial sweep.)

## Context

The audit (`robcparker_com_audit.md`, executive summary lines 13-23 and Dimension 4 lines 99-138) identifies these drift points as the cheapest, highest-leverage credibility fix on the site. Three of the six are Critical-severity in the audit's framing — they're the kind of small inconsistencies that get caught in 60 seconds by a diligent recruiter and erode trust right when the site should be earning it.

This spec is intentionally narrow. The audit lists five other action items (advisory placement, credibility signals, SEO, contact-form intent routing); each has its own spec (SPEC-011 through SPEC-014). SPEC-010 is the cheapest and ships first.

Per CLAUDE.md, the PDF is canonical for the resume — when the resume is updated, the PDF is updated first, then mirrored into `resume.html`. R5 below explicitly requires both artifacts to ship together.

## Requirements

### R1: Home-page engineer-count reconciliation

- **File:** `index.html`
- **Location:** `index.html:121` (`.highlight-card` block currently reading `30+`).
- **Change:** numeric digits and `aria-label` together, in lockstep. Suggested replacement: `26` (visible) with `aria-label="26 engineers"`. Alternative acceptable phrasing: `Up to 26` with matching aria-label.
- **Constraint:** the visible digits and the aria-label MUST match exactly — same accessibility pattern observed at `index.html:112`, `121`, `139` and reaffirmed in SPEC-007 R2.
- **Heading + description copy below the metric:** unchanged unless the chosen number is "Up to 26", in which case the implementer may light-edit the heading to read naturally with that phrasing. Marketing-copywriter judgment.

### R2: DX score attribution

- **Files:** `index.html` AND `resume.html` AND `files/rob-parker-resume.pdf`
- **Site location:** `index.html:174` — sentence currently reads "scaling an engineering org 150% while holding 90% retention and maintaining an 80% DevEx score."
- **Replacement framing (site):** explicit DX attribution. Recommended phrasing: "maintaining an 80% DX developer experience score" (DX is the company, formerly GetDX; the platform name doubles as the metric name).
- **Resume update:** add a matching, attributed mention of the 80% DX score in the Senior Director of Engineering role bullet list at `resume.html:166-176` AND the equivalent bullet in `files/rob-parker-resume.pdf` page 1, "Senior Director of Engineering" → SugarCRM section. Suggested insertion: a new bullet or a clause inside the existing "Scaled global engineering organization by 150%, with 90% retention" bullet (`resume.html:172`) — implementer judgment, but the resume must explicitly cite "DX" or "DX (developer experience platform)" so that a recruiter reading the resume independently sees the same source attribution as the site.
- **PDF + HTML must match.** If the implementer cannot regenerate the PDF (see Open Questions Q1), the spec defers — see R7.

### R3: About-page AI-tools claim narrowing

- **File:** `about.html`
- **Location:** `about.html:231` — currently reads `<p class="ai-framework-tools"><strong>Tools deployed:</strong> Claude Code, GitHub Copilot, CodeRabbit</p>`.
- **Replacement (recommended at Spec Gate, see Open Questions Q2):** narrow the claim. Suggested phrasing: `<p class="ai-framework-tools"><strong>Tools:</strong> evaluated and piloted Claude Code and CodeRabbit; deployed GitHub Copilot at scale.</p>`
- **Rationale:** the resume's three-tier AI bullet at `resume.html:169` and the corresponding PDF bullet only credit GitHub Copilot for the measured 20% velocity gain. "Tools deployed" — plural, all three — over-claims relative to the resume. Narrowing the site claim is faster and more defensible than expanding the resume to claim Claude Code and CodeRabbit at scale (which would itself be over-stated).
- **Marketing-copywriter** is invoked to refine the exact wording so the sentence flows with the surrounding paragraph and preserves the "deliberate adoption" register.

### R4: Home-page tense fix

- **File:** `index.html`
- **Location:** `index.html:91` — sentence currently reads "Currently driving AI platform strategy, and turning engineering into a competitive advantage."
- **Replacement (recommended):** "Most recently led AI platform strategy" or "Recently directed enterprise AI platform engineering" — copywriter chooses the variant that flows with the paragraph.
- **Rationale:** Rob's SugarCRM tenure ended March 2026; today is 2026-04-25. Present-tense "driving" reads either inaccurate or stale.

### R5: Resume Summary verb correction (PDF + HTML)

- **Files:** `files/rob-parker-resume.pdf` AND `resume.html`
- **HTML location:** `resume.html:125` — the `<div class="resume-summary"><p>` block. Specifically the clause "built and led SugarCRM's multi-tenant AI platform on AWS Bedrock".
- **PDF location:** `files/rob-parker-resume.pdf` page 1, Summary section, equivalent clause "built and led SugarCRM's multi-tenant AI platform on AWS Bedrock".
- **Replacement:** "directed teams that built and shipped SugarCRM's multi-tenant AI platform on AWS Bedrock". The verb shift from "built and led" to "directed teams that built and shipped" matches the about-page framing at `about.html:112` ("My team built a multi-tenant AI platform on AWS Bedrock") and is the more accurate description of Rob's actual role.
- **CLAUDE.md ordering:** PDF is canonical — update the PDF first, then mirror to `resume.html`. The two must ship in the same commit.
- **Cross-check:** there is a SECOND occurrence of similar "built and led" framing in the LinkedIn profile PDF (`files/LinkedInProfile.pdf` page 1, summary block: "I built and led the company's multi-tenant AI platform on AWS Bedrock"). The LinkedIn profile is OUT OF SCOPE for SPEC-010 (it's not in this repo) — see Out of Scope. Rob will update LinkedIn separately as an operator todo (tracked in `OPERATOR-TODOS.md`).

### R6: athenahealth lowercase normalization

- **File:** `index.html`
- **Location:** `index.html:195` — `.about-teaser` paragraph currently reads "He has led teams at companies including SugarCRM and Athenahealth, holding…".
- **Change:** `Athenahealth` → `athenahealth`. Single-word casing fix.
- **Cross-check:** `resume.html:259` already uses lowercase `athenahealth` (the Earlier Experience section). `files/rob-parker-resume.pdf` page 2, Earlier Experience also uses lowercase `athenahealth`. Site-wide grep should return zero `Athenahealth` occurrences after the fix.
- **No other files affected.** This was confirmed earlier in SPEC-007 R4 (where "Omnicell" was corrected to "Athenahealth" — that fix introduced the casing drift this spec resolves).

### R7: PDF regeneration workflow (resolved at Spec Gate)

- **Source format and location:** the canonical source is `files/source/Rob_Parker_Resume.odt` — an OpenDocument Text file. (Spec Gate originally said "repo root"; the ODT was moved to `files/source/` in commit `a09de49` to mirror the `images/source/` convention. Spec text updated 2026-04-30 to reflect actual location.)
- **Workflow split (revised 2026-04-30):**
  - **ODT/PDF edits delegated to AI agent:** Rob's original R7 had him owning the ODT→PDF re-export. On 2026-04-30 Rob delegated this to the Claude Code agent. Mechanism: ODT XML edited directly via `python3` (ODT is a ZIP of XML; the body lives in `content.xml`), repacked preserving `mimetype`-first-uncompressed, then converted to PDF via `libreoffice --headless --convert-to pdf` (no GUI involved). The same LibreOffice 24.2 renders the PDF, so the documented anonymized metadata pattern (Author "Un-named" / Creator "Writer" / Producer "LibreOffice 24.2") is preserved. Verified via `exiftool` post-export per IG-3 / AG-2.
  - **Implementer:** edits `resume.html`, `index.html`, and `about.html` (per LOCK-1, LOCK-2, LOCK-4, LOCK-5). Does NOT touch the ODT or regenerate the PDF.
  - **QA close:** blocked until both the regenerated PDF and the regenerated ODT are committed in the same branch as the HTML edits. All three artifacts ship together.
- **ODT-tracking decision (resolved):** the ODT is committed at `files/source/Rob_Parker_Resume.odt` per commit `a09de49` (mirroring `images/source/` convention). No longer an open question.

## Out of Scope

- Any nav, IA, or page-structure changes (those live in SPEC-011)
- New testimonials, logos, or credibility-signal additions (SPEC-012)
- Any SEO / meta-tag / Open Graph / JSON-LD work (SPEC-013)
- Contact-form changes (SPEC-014)
- Updates to `files/LinkedInProfile.pdf` or to Rob's actual LinkedIn About section (LinkedIn About update is captured as an operator todo in `OPERATOR-TODOS.md`)
- Restructuring or rewriting the AI-tools paragraph beyond the single sentence at `about.html:231`
- Changing the `aria-label` on the `resume.html:160` developer-velocity callout (still 20% via GitHub Copilot — that claim is accurate and is preserved)
- Changing the SugarCRM dates or any other resume content not enumerated above

## Dependencies

- **SPEC-007 (complete):** SPEC-007 R4 corrected "Omnicell" → "Athenahealth". R6 here is the casing follow-on.
- **SPEC-009 (complete):** SPEC-009 settled the SPEC-008/009 design language including hero markup. The R4 sentence at `index.html:91` lives inside the post-SPEC-009 `.hero-subheadline` element — implementer must edit text only, not markup.
- **No external integrations.** No third-party services. No new dependencies.

## Non-Functional Requirements

- **Accessibility:** R1's number change must keep `aria-label` text in lockstep with visible digits (existing pattern; SPEC-007 R2 precedent). Screen readers must announce the same number a sighted user sees.
- **Performance:** zero impact. Text edits only.
- **SEO:** zero impact. No `<meta>` or `<title>` changes in this spec.

## Acceptance Criteria

### Copy correctness (HTML)

- **Given** the implementer searches `index.html` for the literal string `30+`, **When** all R1 edits are applied, **Then** the `30+` string is gone and the corresponding `aria-label` matches the new digits exactly.
- **Given** the implementer searches `index.html` for the literal string `DevEx`, **When** R2 edits are applied, **Then** the visible copy explicitly cites "DX" (the platform name) as the source — not the unsourced word "DevEx" alone.
- **Given** `about.html:231` is rendered, **When** the user reads the line, **Then** the line distinguishes between "evaluated and piloted Claude Code and CodeRabbit" and "deployed GitHub Copilot at scale" (or copywriter-equivalent phrasing).
- **Given** `index.html:91` is read, **When** the user reads the sentence, **Then** the AI-platform-strategy clause is in past tense, not present continuous.
- **Given** `resume.html:125` is read, **When** the Summary clause is parsed, **Then** the verb is "directed teams that built and shipped" — not "built and led".
- **Given** the implementer runs `grep -in 'Athenahealth' index.html`, **When** all R6 edits are applied, **Then** zero occurrences of capitalized "Athenahealth" remain.

### Copy correctness (PDF)

- **Given** `files/rob-parker-resume.pdf` page 1 Summary is read, **When** R5 is applied to the PDF source and re-exported, **Then** the Summary clause uses "directed teams that built and shipped" — matching the HTML.
- **Given** `files/rob-parker-resume.pdf` page 1 SugarCRM Senior Director bullets are read, **When** R2 is applied to the PDF, **Then** the bullets include an explicit "DX" attribution for the 80% score (matching the HTML resume's bullet).
- **Given** the regenerated PDF, **When** `exiftool` is run against it, **Then** Author/Creator/Producer match the anonymized state documented in `governance/stack-quirks.md` (or have been re-stripped per that recipe).

### Cross-artifact consistency

- **Given** a reader compares the home page metric row at `index.html:121` to the resume Senior Director bullet at `resume.html:167`, **When** both are read, **Then** the engineer count claim matches.
- **Given** a reader compares the home-page DX clause to the resume Senior Director bullets, **When** both are read, **Then** both cite DX explicitly as the source of the 80% score.
- **Given** a reader compares `about.html:231` to the resume's three-tier AI bullet at `resume.html:169`, **When** both are read, **Then** GitHub Copilot is identified as the at-scale deployment in both, and Claude Code / CodeRabbit are framed consistently (evaluated/piloted vs. deployed) across the two artifacts.
- **Given** a reader compares `resume.html` and `files/rob-parker-resume.pdf` line by line for the Summary and SugarCRM SDoE sections, **When** all R2/R5 edits are applied, **Then** the two artifacts agree word-for-word on the relevant clauses.

## Tier Selection — Trivial

**Tier:** Trivial. Per `governance/tier-selection-guidelines.md`:

| Trigger | Applies? | Notes |
|---------|----------|-------|
| Authentication / authorization changes | No | None |
| Payment or financial data | No | None |
| PII / PHI handling | No | None |
| New external API integration | No | None |
| Database schema change | No | None |
| Core domain model modification | No | Pure copy |
| Framework or platform migration | No | None |
| First implementation of new architectural pattern | No | None |

**Decision flow check:**
1. Does it change any code paths? **No** — text edits only, no JS, no CSS rules, no structural HTML changes.
2. Pattern reuse: copy-only edits are explicitly listed under the Trivial tier in CLAUDE.md ("Copy/content updates").

**No Decision Rationale section** required at Trivial tier. The "why" for each item is self-evident from the audit's framing.

## Open Questions — Resolved at Spec Gate (2026-04-25)

| # | Question | Resolution |
|---|----------|------------|
| Q1 | **PDF regeneration workflow.** Who regenerates the PDF and from what source? | **Confirmed:** source is `Rob_Parker_Resume.odt` at repo root (ODT, edited in LibreOffice). Rob edits the ODT, re-exports the PDF, and replaces `files/rob-parker-resume.pdf`. Implementer does HTML edits only. Both artifacts ship in the same branch. Anonymized PDF metadata must be preserved per `governance/stack-quirks.md`. ODT-tracking question (commit vs. gitignore) is separate, post-spec. |
| Q2 | **R3 framing direction — narrow the site claim, or broaden the resume claim?** | **Confirmed: narrow the site claim.** R3 stands as written. |
| Q3 | **R1 phrasing — "26" or "Up to 26"?** | **Confirmed: "26 Engineers Led".** No qualifier. |
| Q4 | **R2 exact site phrasing.** | **Confirmed: "80% DX developer experience score"** — names both source (DX) and metric meaning. |
| Q5 | **R5 — LinkedIn profile summary update in lockstep?** | **Confirmed: out of scope for SPEC-010.** LinkedIn About update is captured in `OPERATOR-TODOS.md` for Rob to action manually on the same day SPEC-010 deploys. |
| Q6 | **R3 wording — copywriter-finalized sentence?** | **Confirmed: yes.** `marketing-copywriter` writes the final sentence at implementation. Rob reviews at QA. |

## Effort Comparison

| | AI-Assisted | Human Solo |
|---|---|---|
| Spec creation | ~25 minutes wall-clock (audit pre-read, file-line verification across `index.html`, `about.html`, `resume.html`, both PDFs) | 1.5–3 hours (PM would need to: read the audit, locate every claim, cross-walk between site and resume PDFs, decide narrowing vs. broadening for each item, write Given/When/Then ACs, surface the PDF-regeneration ambiguity, and structure as a Trivial-tier spec — sequential) |
| Assumptions | Audit pre-vetted; site files read in full; resume PDF page 1-2 read for verification; SPEC-007 used as Trivial-tier structural template (favicon-and-copy-cleanup precedent). PDF source document is NOT in repo and Rob owns it externally — flagged as Q1 rather than guessed. |

---

## Spec-Gate Approval

**Decision:** Approved 2026-04-25
**Gate owner:** Rob Parker
**Approval note:** All six clarification questions resolved (see table above). Q1 unblocked by confirming `Rob_Parker_Resume.odt` (LibreOffice ODT, repo root) as the canonical PDF source; Rob owns the ODT edit + PDF re-export, implementer owns HTML. Q2-Q6 confirmed as recommended by the PM agent. Spec advances to Architecture Review.

### Structured Review Checklist

- [x] Business intent confirmed (six audit-derived reconciliation items, scope locked)
- [x] Scope boundaries clear (no nav/IA/SEO/styling churn — copy and numbers only)
- [x] Acceptance criteria testable (Given/When/Then; cross-artifact consistency checks included)
- [x] Dependencies identified (SPEC-007 / SPEC-009)
- [x] Tier appropriate (Trivial — copy/content updates per CLAUDE.md)
- [x] No mandatory escalation triggers (no auth, payments, PII, integrations, DB, framework)
- [x] Third-party features verified (none introduced)
- [x] Decision Rationale section — N/A at Trivial tier
- [x] PDF-regeneration ambiguity flagged (Q1)

---

## Architecture Review

**Reviewer:** architect-reviewer agent (specialist) via sdd/architect-review pipeline agent
**Date:** 2026-04-30
**Recommendation:** Approve with conditions (8 IG items + 4 AG decisions, all approved by Rob 2026-04-30)
**Pen-tester:** Not invoked (Trivial tier, no auth/payment/PII/external-API surface; PDF metadata anonymization captured in IG-3 / AG-2)

### Validation summary

- Static-first / progressive-enhancement / WCAG 2.1 AA / no-build-tools principles all upheld — pure text edits.
- Stack-quirks scan: `PDF Optimization` (LibreOffice anonymization, exiftool recipe) and `Static Assets` (`files/` directory) are relevant and respected by R7.
- WHY-comment scan across `index.html`, `about.html`, `resume.html`: no edit overlaps a WHY-governed line. R4 sits inside the `.hero-subheadline` markup constrained by WHY at `index.html:78` (SPEC-008 58/42 grid) — text-only edit preserves the constraint (IG-6).
- Wider grep across `*.html` / `*.md` content: only one capitalized `Athenahealth` exists in shipped content (`index.html:195`); no meta/JSON-LD occurrences. R6 closure is single-line.
- No new architectural patterns introduced; reuses SPEC-001/002/007-R2 aria-label lockstep, SPEC-003 PDF metadata recipe, CLAUDE.md PDF-canonical ordering.

### Implementation Guidance

| ID | Item |
|---|---|
| IG-1 | **R1 aria-label noun fidelity.** Aria-label should mirror visible noun phrase. If visible reads "26 Engineers Led", aria reads `"26 engineers led"` — see AG-4. |
| IG-2 | **Lock exact R2/R5 strings before either artifact is edited.** Cross-artifact AC requires word-for-word agreement; lock verbatim strings in a branch addendum before Rob exports the PDF. See AG-1. |
| IG-3 | **Verify PDF metadata pre-commit.** Run `exiftool files/rob-parker-resume.pdf` before `git add`; confirm Author/Creator/Producer match documented anonymized state; only then commit. See AG-2. |
| IG-4 | **Run copywriter pass pre-implementation.** R3 (R1 conditional, R4 variants) all involve copywriter judgment. Run once up-front, record finalized strings, then implement. See AG-3. |
| IG-5 | **Post-edit grep guard.** QA close adds `grep -rinE 'Athenahealth' --include='*.html' --include='*.md' .` — confirm zero capitalized hits in shipped content. |
| IG-6 | **R4 markup safety.** Edit text only inside `.hero-subheadline` (`index.html:91`). No new `<span>` / `<br>` / punctuation that could change wrap behavior at 768/480px breakpoints. Visual spot-check at both breakpoints. |
| IG-7 | **Branch concurrency on `files/rob-parker-resume.pdf`.** Implementer opens PR with HTML edits → Rob commits regenerated PDF onto same branch → QA closes. No parallel branches. |
| IG-8 | **PDF reflow guards.** R5 verb expansion is longer than "built and led". Post-export, confirm (a) PDF page count unchanged, (b) no font-substitution-induced line-break changes on page 1. |

### Arch Gate Decisions (2026-04-30)

| ID | Decision | Rob's resolution |
|---|---|---|
| AG-1 | Lock exact R2/R5 strings before any artifact is edited? | **(a) Yes** — co-write the two clauses, append to spec, then both edit. *Rationale: closes the cross-artifact drift failure mode at the cheapest possible point.* |
| AG-2 | When does `exiftool` metadata verification run? | **(a) Pre-commit gate** — Rob runs `exiftool` and pastes output into PR before requesting QA. *Rationale: PII-adjacent artifact; verify before, not after.* |
| AG-3 | When does the marketing-copywriter pass for R1/R3/R4 happen? | **(a) Pre-implementation** — finalized strings recorded in branch notes / spec addendum. *Rationale: single QA review surface.* |
| AG-4 | R1 aria-label phrasing? | **(a)** `"26 engineers led"` — noun-match to visible "26 Engineers Led". *Rationale: full lockstep with SPEC-001/002/007-R2 pattern fidelity.* |

### Risks

| Risk | Severity | Likelihood | Mitigation |
|---|---|---|---|
| HTML/PDF wording drift between Rob and implementer | Medium (re-opens an interview tripwire) | Medium without AG-1; Low with AG-1 | AG-1 + IG-2 |
| LibreOffice re-export leaks PII metadata | Low | Low | AG-2 + IG-3 |
| R5 verb expansion pushes Summary across PDF page break | Low (cosmetic) | Low | IG-8 |
| R4 text edit breaks 58/42 hero grid wrap at mobile breakpoint | Low | Very low | IG-6 |

### Effort Comparison

| | AI-Assisted | Human Solo |
|---|---|---|
| Architecture Review | ~10 minutes wall-clock (spec read, file/line verification, WHY-comment scan, stack-quirks scan, wider Athenahealth grep, specialist invocation, synthesis) | 45–75 minutes (read spec, open all 4 cited files, verify aria-label precedent in SPEC-001/002/007, read stack-quirks PDF recipe, check governance docs, draft IG/AG list) |
| Assumptions | Reviewer had full repo access, Spec-Gate-approved spec, all governance docs, and the architect-reviewer specialist's structured output. File/line citations verified end-to-end (six cite sites, zero discrepancies). Wider Athenahealth grep performed across all `.html` / `.md` content. |

### Arch Gate Approval

**Decision:** Approved 2026-04-30
**Gate owner:** Rob Parker
**Approval note:** All four AG decisions resolved as recommended (a-options across AG-1 through AG-4). All eight IG items binding for the Implementer-Tester stage. Trivial tier confirmed; no escalation triggers surfaced. Spec advances to Implementation, with two pre-implementation prerequisites: (1) marketing-copywriter pass for R1/R3/R4 finalized strings (AG-3); (2) co-written R2/R5 verbatim clauses appended to this spec (AG-1) before Rob exports the PDF or HTML edits begin.

---

## Pre-Implementation String Lock (2026-04-30)

Per AG-1 and AG-3, the verbatim final strings for R1-R6 are locked here before any HTML or PDF edits begin. The implementer edits HTML to match these strings character-for-character; Rob edits the ODT/PDF to match the same strings character-for-character. No downstream re-wording.

**Author:** marketing-copywriter agent. **Reviewed and locked by:** Rob Parker.

### LOCK-1 — `index.html:121` highlight card (R1, AG-4)

| Slot | Locked text |
|---|---|
| Visible digits | `26` |
| Visible heading | `Engineers Led Directly` (no change — preserved from current) |
| `aria-label` | `26 engineers led directly` |

> *Implementer note: visible heading remains unchanged. Only the digits (`30+` → `26`) and the `aria-label` (`30 plus engineers` → `26 engineers led directly`) change.*

### LOCK-2 — `index.html:174` home page DX clause (R2, site side)

Replace the run-on from "building" through "DevEx score." in the existing paragraph with this clause's tail:

> "...and scaling an engineering org 150% while holding 90% retention and maintaining an 80% DX developer experience score."

(Phrasing aligned with Spec-Gate Q4: "80% DX developer experience score".)

### LOCK-3 — `resume.html` AND `files/rob-parker-resume.pdf` new dedicated bullet (R2, resume side)

**Decision: Option B — new dedicated bullet, inserted after `resume.html:172`** (and the equivalent position in the PDF Senior Director of Engineering bullet list):

> "Maintained an 80% DX developer experience score, measuring and sustaining engineering team health through a period of rapid organizational growth."

This bullet ships word-for-word in both `resume.html` and the regenerated PDF (cross-artifact AC).

### LOCK-4 — `about.html:231` AI-tools sentence (R3)

Replace the entire current `<p class="ai-framework-tools">` element with:

```html
<p class="ai-framework-tools"><strong>Tooling:</strong> Evaluated and piloted Claude Code and CodeRabbit; deployed GitHub Copilot at scale.</p>
```

Note: the `<strong>` label changes from `Tools deployed:` to `Tooling:`.

### LOCK-5 — `index.html:91` hero subheadline (R4)

Replace the existing two-sentence `.hero-subheadline` paragraph (lines 88-93) with:

> "Rob Parker is a senior engineering executive with 25+ years of engineering experience and 10+ years of leadership experience building high-performing teams. Most recently led AI platform strategy at SugarCRM, turning engineering into a competitive advantage."

Sentence 2 = 80 chars vs. original's 78 — within IG-6's ±10% reflow tolerance.

### LOCK-6 — `resume.html:125` AND `files/rob-parker-resume.pdf` Summary sentence (R5)

Replace the sentence that begins "Most recently, built and led SugarCRM's multi-tenant AI platform on AWS Bedrock..." through "...Identity Management." with:

> "Most recently, directed teams that built and shipped SugarCRM's multi-tenant AI platform on AWS Bedrock, spanning AI/ML, Data Platform, and Identity Management."

The rest of the surrounding paragraph stays verbatim. This exact sentence ships word-for-word in both `resume.html:125` and the regenerated PDF (cross-artifact AC).

### LOCK-7 — Salesfusion punctuation drift fix (in-scope sweep, 2026-04-30)

Pre-existing cross-artifact drift in the Summary paragraph: HTML uses semicolon, ODT/PDF used comma. Bundled into SPEC-010 as a trivial sweep (matching SPEC-007 R6 athenahealth precedent). In `resume.html:125` and `files/rob-parker-resume.pdf` Summary, change:

> "Prior experience as CTO at Salesfusion**,** led the technical track..."

to:

> "Prior experience as CTO at Salesfusion**;** led the technical track..."

The HTML already reads with semicolon — no HTML edit required. Only the ODT/PDF needed correction; applied 2026-04-30 alongside LOCK-6.

### Lock close

**Locked:** 2026-04-30 by Rob Parker. **ODT/PDF execution:** completed 2026-04-30 by Claude Code agent (`files/source/Rob_Parker_Resume.odt` repacked, `files/rob-parker-resume.pdf` regenerated, exiftool-verified Author "Un-named" / Creator "Writer" / Producer "LibreOffice 24.2", page count = 2 unchanged, all three edits confirmed on page 1). **Status:** ODT and PDF artifacts ready; HTML edits (LOCK-1, LOCK-2, LOCK-4, LOCK-5) and resume.html edits for LOCK-3 / LOCK-6 still pending Implementer-Tester pipeline.

---

*Drafted 2026-04-25 from `robcparker_com_audit.md` Prioritized Action #1. Architecture Review appended 2026-04-30. Pre-Implementation String Lock appended 2026-04-30.*
