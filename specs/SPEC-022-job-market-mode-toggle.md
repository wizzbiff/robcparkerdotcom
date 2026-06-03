# SPEC-022: Job-Market Mode Off — Neutral Capability Positioning, Reversibly

**Status:** Draft — Spec Gate pending
**Tier:** Standard (multi-page coordinated copy change across 6 HTML files + `js/main.js` + the canonical resume PDF; introduces a documented reversibility convention; one structural form decision. Pure copy would be Trivial, but breadth, the binary-artifact operator dependency, and the new "job-market mode" toggle convention warrant Standard.)
**Author:** PM-Spec (from Rob's request 2026-06-03: "I have recently accepted a new position… revise the site so it removes language indicating that I am on the job market… pivot to a professional site promoting my capabilities… but leave it in a state where I could easily modify it in the future to again indicate that I am on the job market.")
**Date:** 2026-06-03
**Branch:** `spec/SPEC-022-job-market-mode-toggle`

---

## Summary

Rob has accepted a new position and is no longer on the job market. The site currently broadcasts active job-seeking across every page — meta descriptions, hero subheadlines, dedicated CTA sections, the resume header, the contact-form intent dropdown, and the downloadable resume PDF all say some version of "open to / targeting / actively exploring Director, VP, or CTO roles."

This spec **turns job-market mode off**: it replaces overt availability/role-targeting language with neutral, capability-forward positioning (a senior engineering executive who builds AI-native platforms and scales engineering organizations — stated as who Rob *is*, not what Rob *wants*). It does **not** strip the site of personality or contact affordances — visitors can still reach Rob; the site simply stops signaling that he is looking for a role.

The second half of the requirement is a first-class deliverable, not an afterthought: the change must be **easily reversible**. A future "I'm back on the market" flip should be a bounded, documented edit — not a code-archaeology exercise. How we encode that reversibility is the central design question (Q1).

The audit (2026-06-03) found job-seeking strings across the site's HTML pages + `js/main.js`, plus the canonical resume PDF. **Arch Gate (2026-06-03) corrected the page count from 5 to 6** — `how-this-site-was-built.html` is a production page in the global nav and was missed by the initial audit; it carries two job-seeking strings (see Arch Gate §scope corrections). Total scope: **~32 strings across 6 HTML pages**. JSON-LD `jobTitle: "Senior Engineering Executive"` is a capability descriptor (not an availability signal) and is **out of scope** — no `seeks`/`seeksRole` property exists anywhere.

## Context

### Source

- **Rob's request, 2026-06-03** (verbatim intent): accepted a new position; remove on-the-market language; pivot to capability promotion; keep it easy to re-enable job-market mode later.
- **Positioning memory shift.** `project_positioning.md` currently reads "Director/VP hunt at AI-forward SaaS; advisory is secondary." This spec inverts the primary frame. The memory must be updated as part of this work (see R7).
- **Audit, 2026-06-03.** Full string inventory below (Pre-Implementation String Lock will byte-lock replacements at Arch Gate per house pattern).

### Job-seeking string inventory (audit 2026-06-03)

All line numbers are pre-change. Replacement byte-strings are **not** finalized here — marketing-copywriter locks them at Arch Gate (consistent with SPEC-015/019). This table is the *scope manifest*.

**`index.html`**
| Line | Current text (job-market) | Element |
|------|---------------------------|---------|
| 9 | `…Open to Director, VP, and CTO roles.` | meta description |
| 19 | `…Open to Director, VP, and CTO roles.` | og:description |
| 29 | `…Open to Director, VP, and CTO roles.` | twitter:description |
| 222–233 | entire "FULL-TIME ROLE CTA" `<section>` | heading 226 `Open to Senior Engineering Leadership Roles.` + copy 227 |
| 262 | `If you are evaluating senior engineering leadership candidates for a Director, VP, or CTO of Engineering role, Rob is open to the conversation.` | footer CTA copy |

**`about.html`**
| Line | Current text | Element |
|------|--------------|---------|
| 9 / 20 / 30 | `…targeting Director, VP, and CTO roles.` | meta / og / twitter description |
| 148 | `Director/VP of Engineering — AI-Native Platforms, Scaling Engineering Organizations` | hero subheadline |
| 152 | `I'm now actively exploring Director and VP of Engineering opportunities at AI-forward SaaS companies ready to scale and embrace agentic development.` | bio paragraph |
| 309 | `If you are evaluating senior engineering leaders building on AI, I would welcome the conversation.` | CTA section copy |

**`resume.html`**
| Line | Current text | Element |
|------|--------------|---------|
| 9 / 21 / 31 | `…Targeting Director, VP, CTO.` | meta / og / twitter description |
| 123 | `Senior Engineering Executive · AI-Native Platforms · Targeting Director/VP` | resume header positioning line |
| 161 | `Targeting Director or VP of Engineering roles at AI-forward companies.` | Summary section |
| 358 | `If you are evaluating senior engineering leaders for Director or VP roles, I would welcome the conversation.` | CTA section |

**`contact.html`**
| Line | Current text | Element |
|------|--------------|---------|
| 8 | `Contact Rob Parker — Director & VP Engineering Roles, Atlanta` | page `<title>` |
| 9 / 20 / 30 | `Reach Rob Parker about Director, VP, or CTO of Engineering roles at AI-forward SaaS companies.` | meta / og / twitter description |
| 121 | `If you are evaluating Director, VP, or CTO of Engineering candidates for an AI-forward SaaS company, I would welcome the conversation…` | hero subheadline |
| 201 | `<option value="hiring">Hiring opportunity</option>` | contact-form intent dropdown (see Q5) |

**`advisory.html`**
| Line | Current text | Element |
|------|--------------|---------|
| 9 / 18 / 28 | `Selective advisory engagements alongside a Director or VP search` | meta / og / twitter description |
| 125 | `I take on a small number of advisory engagements alongside my primary focus on full-time Director and VP of Engineering roles.` | hero copy (see Q4) |

**`js/main.js`**
| Line | Current text | Element |
|------|--------------|---------|
| 256 | `hiring: 'New hiring opportunity from robcparker.com',` | `SUBJECT_BY_INTENT` map (paired with `contact.html:201`; see Q5) |

**`files/rob-parker-resume.pdf`** (canonical resume source)
- Summary paragraph contains `…Targeting Director or VP…` (confirmed via `pdftotext`). Per CLAUDE.md resume-sync rule, the PDF is canonical and must be updated **before** mirroring to `resume.html`. The PDF is a binary regenerated outside the repo → operator dependency (see Q6).

### Audience fit

Per `feedback_credibility_signals_philosophy.md`: prefer capability signals (what Rob has built and led) over legitimacy signals. Neutral positioning that leads with "directed teams that built and shipped SugarAI's multi-tenant AI platform on AWS Bedrock" is *stronger* capability signal than availability copy — it says what Rob does, full stop. The pivot is an opportunity to tighten, not just subtract.

## Decision Rationale

### Pre-resolved framing

- **Reframe, don't gut.** Replace job-seeking copy with neutral capability copy *in place* rather than deleting whole sections wherever practical. Keeping page structure intact (a) preserves the visual/scroll rhythm tuned across SPEC-008→021, (b) makes the reversibility flip a copy edit rather than a section re-add, and (c) keeps contact affordances live. The one structural exception under discussion is index.html's dedicated "FULL-TIME ROLE CTA" section, whose entire *purpose* is job-seeking (Q2).
- **Copy locked at Arch Gate, not Spec Gate.** Per `.claude/development-workflow.md`, all public-facing text goes through marketing-copywriter; per house pattern (SPEC-015/019) the byte-locked strings are produced at Arch Gate where the copywriter has full site-voice + this spec's direction. Spec Gate sets *direction and principles*; Arch Gate produces the Pre-Implementation String Lock.
- **JSON-LD untouched.** `jobTitle` is a descriptor, not availability. No schema change.

### Constraints

- **No build process.** Pure static HTML/CSS/JS — there is no templating layer or config flag to drive a runtime toggle. Any "mode" must be a documentation/source convention, not a feature flag (shapes Q1).
- **Public repo.** `github.com/wizzbiff/robcparkerdotcom` is public. Whatever reversibility mechanism we choose ships in public source — argues against leaving stale "Director/VP" job-seeking copy sitting in HTML comments where it reads as either out-of-date or as a tell (shapes Q1).
- **Canonical PDF lives outside the repo.** The downloadable resume's source document is regenerated externally; the repo holds only the rendered binary (shapes Q6).

### Trade-offs accepted

- Replacing in place (vs. deleting) means slightly more copy to write now in exchange for a far cheaper revert later. Given reversibility is an explicit requirement, this is the right trade.
- Neutral positioning is intentionally quieter than "open to roles" — it forgoes a direct recruiter call-to-action. That is the point; the conversion goal has changed from "land a role" to "represent capability."

## Requirements

- **R1 — Neutralize all meta/OG/Twitter title + description tags** across all 6 HTML pages (`index.html`, `about.html`, `resume.html`, `contact.html`, `advisory.html`, `how-this-site-was-built.html`) so no `<title>`, og:title, twitter:title, or any description tag contains role-seeking language ("open to," "targeting," "exploring … opportunities," "… roles at," "Director & VP … Roles"). **Arch Gate correction:** `contact.html` has six head elements to fix — `<title>` (8), meta description (9), og:title (20), og:description (21), twitter:title (30), twitter:description (31) — the initial inventory mislabeled 20/30 as descriptions. `how-this-site-was-built.html`'s head description (line 9) is methodology copy, not job-seeking — left as-is. Replacement strings byte-locked at Arch Gate.
- **R2 — Neutralize body positioning copy:** hero subheadlines and bio/summary paragraphs (`about.html:148,152`, `resume.html:123,161`, `contact.html:121`) so they describe capability/identity, not availability. Byte-locked at Arch Gate.
- **R3 — Resolve the job-seeking CTA sections** (`index.html:222–233` + `262`, `about.html:309`, `resume.html:358`) per the Q2 resolution (reframe to neutral contact invitation vs. remove). Whatever is chosen must keep a working contact path and must be reversible per Q1.
- **R4 — Advisory page** (`advisory.html:9,18,28,125`) reframed per the Q4 resolution so advisory is no longer described as secondary to a job search.
- **R5 — Contact-form intent option** (`contact.html:201` + `js/main.js:256`) handled per the Q5 resolution.
- **R6 — Canonical resume PDF** (`files/rob-parker-resume.pdf`) reconciled with `resume.html` per the Q6 resolution, honoring the CLAUDE.md PDF-first ordering or explicitly logging a tracked exception.
- **R7 — Update the positioning memory.** `project_positioning.md` rewritten from "Director/VP hunt … advisory secondary" to the new neutral frame, noting the job-market-mode-off state and pointing at this spec / the Q1 reversibility artifact. (Memory edit, not a site file — done at implementation, not subject to QA's browser checks.)
- **R8 — Reversibility artifact** per the Q1 resolution: the chosen mechanism (documented toggle manifest doc, and/or in-source markers) must let a future operator re-enable job-market mode as a bounded, enumerated edit. This is a graded acceptance criterion, not optional.

### Not in scope

- JSON-LD / structured-data changes (jobTitle is a descriptor, not an availability signal).
- Any new page, layout, CSS, or JS behavior beyond the `SUBJECT_BY_INTENT` line in R5.
- Naming the new employer/role *unless* Q3 resolves to disclose it.
- Re-pricing or expanding advisory (advisory deferrals per `project_advisory_deferrals.md` stand).
- Rewriting the body of the resume work-history (only the targeting/positioning lines; employment history is factual and stays).
- The untracked workflow/deck files in the working tree (`*.pdf`, `*-deck.md`, `workflow-comparison-*.md`) — unrelated, left untracked.

## Acceptance Criteria

- **AC1:** No `<title>`, og:title, twitter:title, meta description, og:description, or twitter:description across the 6 HTML pages contains role-seeking language. Verified by grep for `open to|targeting|exploring|seeking|roles at|Engineering Roles` (case-insensitive) returning **0 true-positive matches** in `<head>` regions.
- **AC2:** No visible body copy on any page contains the inventoried job-seeking phrases ("actively exploring … opportunities," "Targeting Director/VP," "open to the conversation," "evaluating … candidates," "alongside … search," "primary focus on full-time Director and VP"). Grep + visual confirmation.
- **AC3:** Every replacement string matches the Arch Gate Pre-Implementation String Lock byte-identically.
- **AC4:** The contact form remains fully functional; intent dropdown + `SUBJECT_BY_INTENT` stay in sync (every `<option value>` has a matching key or documented fallback) per the Q5 resolution.
- **AC5:** `index.html` job-seeking CTA section resolved per Q2 — if reframed, neutral copy present and reversible; if removed, removal is clean (no dangling CSS/anchors) and recorded in the Q1 artifact.
- **AC6:** `resume.html` and `files/rob-parker-resume.pdf` are mutually consistent on the positioning line per the Q6 resolution (either both neutral, or the divergence is logged as a tracked operator TODO with a date).
- **AC7:** The Q1 reversibility artifact exists and enumerates **every** toggle point (file + current neutral string + the job-market string to restore) such that a flip-back is a bounded find-and-replace with no discovery step.
- **AC8:** `project_positioning.md` memory reflects the new neutral frame (R7).
- **AC9:** Browser console clean on all 6 pages post-change; no new JS errors (esp. `contact.html` — though Q5 leaves its JS untouched).
- **AC10:** No page changes section count (Q2 = reframe-in-place), so this is a **text-reflow** check, not structural: at 768px and 375px confirm no overflow/awkward orphan lines on the pages with materially changed copy length — `index.html` (CTA paragraphs), `about.html` (bio), `advisory.html` (hero), `how-this-site-was-built.html` (CTA), plus `resume.html`/`contact.html`.
- **AC11:** No toggle point touches `<nav>`/footer markup, so nav baseline is a **pure regression assertion**: the `.nav-links` blocks are byte-unchanged from `main`. (Informational: `.nav-links` occurs in 6 files; `about.html` carries an extra occurrence per pre-existing convention. Run the established nav-baseline check only if a diff unexpectedly touches nav markup.)

## Open Questions — Spec Gate

### Q1 — How do we encode reversibility? *(central design question)*

- **PM-Spec recommendation:** **(A) A dedicated `governance/job-market-mode.md` toggle manifest** — a single doc that, for every toggle point, records: file, line/anchor, the current (neutral / "mode off") string, and the job-market ("mode on") string to restore. Flipping the site back becomes: open the manifest, apply each listed restore. Pair it with a short header in the manifest explaining the convention. Keep public source clean (no commented-out job-seeking copy).
- **Rationale:** No build process means no runtime flag is possible. A documented manifest is the most idiomatic "config" for a static site, survives future site edits (unlike a git-revert that drifts), keeps public HTML clean (repo is public), and makes the flip bounded and discovery-free — directly satisfying Rob's "easily modify in future" requirement. It also doubles as the SPEC-022 String Lock's mirror image.
- **Alternatives:** (B) **In-source HTML-comment toggle blocks** — wrap removed/changed regions in `<!-- JOB-MARKET-MODE:ON … -->` markers. Lighter to flip but ships stale Director/VP copy in public view-source, clutters markup, and goes stale as the site evolves. (C) **Git-history only** — rely on reverting this PR. Simplest now, but couples "mode on" to a commit that drifts as the site changes; fails the "easily modifiable later" bar. (D) **A + lightweight in-source anchors** — manifest plus a tiny `<!-- JM-TOGGLE: see governance/job-market-mode.md -->` breadcrumb comment at each touch point so a future editor finds the manifest from the file. (Hybrid; my second choice.)

### Q2 — index.html "FULL-TIME ROLE CTA" section (222–233): reframe or remove?

- **PM-Spec recommendation:** **Reframe** to a neutral, capability-framed contact invitation (e.g., a "Let's connect" / "Get in touch" section that invites conversation without a hiring premise). Keeps the page's scroll rhythm and the contact path; flip-back is a copy edit per Q1.
- **Rationale:** This section was added (per SPEC-019 implementation note) to replace a deleted "How Rob Engages" section — the slot is load-bearing for page flow. Removing it leaves a structural gap and makes reversibility a section re-add. The footer CTA (262) gets the same neutral treatment.
- **Alternatives:** (a) **Remove** the section entirely — cleaner "not selling anything" read, but bigger reversibility cost and a layout gap to resolve; (b) **Repurpose toward advisory** — risky given Q4 and advisory-deferrals.

### Q3 — Do we name the new role/employer, or stay neutral-silent on current position?

- **PM-Spec recommendation:** **Stay neutral-silent** on the new role by default — present Rob as a senior engineering executive in the present tense without "currently seeking" or "currently at X." Avoids needing site edits if role details change, sidesteps any employer-disclosure sensitivity, and the resume already carries employment history.
- **Rationale:** The ask was to stop signaling availability, not to announce the new job. Silence is the lowest-maintenance neutral state and the easiest baseline to flip back from. **But this is Rob's call** — naming a current senior role at a known company is a strong capability signal if Rob is comfortable disclosing it publicly.
- **Alternatives:** (a) **Name current role** ("Currently [Title] at [Company]") — strong signal, but couples the site to employment that may change and may be premature to publish; (b) **Name role, not employer** — partial.

### Q4 — Advisory page: reframe standalone, minimal-neutralize, or take down?

- **PM-Spec recommendation:** **Reframe standalone** — describe advisory as a selective engagement Rob offers, decoupled from any job search ("alongside a Director/VP search" → removed). Honors `project_advisory_deferrals.md` (no pricing/Calendly/testimonials added).
- **Rationale:** Advisory predates the job hunt and stands on its own; only the coupling to a search needs to go. With a new full-time role, advisory is plausibly more constrained, which "selective" already conveys.
- **Alternatives:** (a) **Minimal-neutralize** — change only the search-coupling clause, touch nothing else (smallest diff); (b) **Take advisory down** — if a new FT role precludes advisory entirely. Rob's call whether advisory stays promoted at all.

### Q5 — Contact-form "Hiring opportunity" intent: keep, relabel, or remove?

- **PM-Spec recommendation:** **Keep as-is.** A senior leader not actively searching can still field an inbound role conversation; the option costs nothing, keeps the form/`SUBJECT_BY_INTENT` plumbing (SPEC-014) intact, and is the most reversible choice. Removing it is the one change that would force a JS edit and a form-regression check for little positioning gain (the dropdown is a low-visibility utility, not a broadcast).
- **Rationale:** The positioning signal lives in headlines and descriptions, not in a utility dropdown a visitor only sees after deciding to write. Keeping inbound channels open is consistent with "promote capability, stay reachable."
- **Alternatives:** (a) **Relabel** to something softer ("Role inquiry") — minor, still implies receptivity; (b) **Remove** the option + its `SUBJECT_BY_INTENT.hiring` line — strongest "not on the market" read, but adds a JS change + form-regression QA and a reversibility entry.

### Q6 — Canonical resume PDF: how to honor PDF-first sync for a binary regenerated outside the repo?

- **PM-Spec recommendation:** **Operator regenerates the PDF, then I mirror to `resume.html` in the same PR.** Rob updates the one summary line in the PDF's source doc, exports, and drops the new `files/rob-parker-resume.pdf` in; I align `resume.html` to match and verify byte-consistency on the positioning line. This honors CLAUDE.md's PDF-first rule.
- **Rationale:** Shipping a neutral `resume.html` while the downloadable PDF still says "Targeting Director or VP" creates a visible contradiction (the artifact undercuts the page). PDF-first is the documented rule precisely to prevent this drift.
- **Alternatives:** (a) **Ship HTML now, log the PDF as a dated `OPERATOR-TODOS.md` item** and accept short-term divergence (AC6 allows this *if explicitly tracked*) — unblocks the spec if Rob can't regenerate immediately, at the cost of a temporary contradiction; (b) **Defer the whole resume page** to a follow-on spec and ship only the other 4 pages now — narrows scope but leaves the most job-seeking-dense page untouched.

## QA Checklist (preview — finalized at Stage 5)

- AC1–AC11 verified observably (grep for residual job-seeking strings → 0 true-positives; byte-equality to String Lock; form sync; console clean; responsive; nav baseline if touched).
- Apex-only live verification post-deploy (`https://robcparker.com/…`, never `www.`).
- Per-page browser render + console sweep on all 5 pages.
- Contact-form submit smoke test if Q5 touches `SUBJECT_BY_INTENT`.
- Q1 reversibility artifact completeness check: every inventoried toggle point present in the manifest.
- PDF/HTML positioning-line consistency per Q6.

## Risk + Reversibility

- **Risk:** Low-to-moderate. No new code paths (except possibly one JS map line under Q5). Primary risk is *incomplete neutralization* — a missed string that still signals job-seeking — mitigated by the grep-based ACs and the String Lock acting as an exhaustive checklist.
- **Reversibility:** This spec's deliverable *is* a reversibility mechanism (Q1/R8). Beyond that, every change is `git revert`-able; the manifest makes a forward re-enable bounded.
- **Operator surface:** The resume PDF (Q6) is the only operator-action dependency. No Cloudflare/DNS/third-party config change.

---

## Open Questions Summary (for Spec Gate walkthrough)

| Q | Topic | PM-Spec recommendation |
|---|-------|------------------------|
| Q1 | Reversibility mechanism | (A) `governance/job-market-mode.md` toggle manifest |
| Q2 | index.html FT-CTA section | Reframe to neutral contact invitation |
| Q3 | Name new role/employer? | Stay neutral-silent (Rob's call) |
| Q4 | Advisory page framing | Reframe standalone (decouple from search) |
| Q5 | Contact "Hiring opportunity" intent | Keep as-is |
| Q6 | Canonical resume PDF sync | Operator regenerates PDF, mirror in same PR |

---

## Spec Gate Resolutions (2026-06-03)

| Q  | Topic | Resolution |
|----|-------|-----------|
| Q1 | Reversibility mechanism | **Manifest doc.** Create `governance/job-market-mode.md` enumerating every toggle point (file + anchor, current neutral "mode OFF" string, job-market "mode ON" string to restore). Flip-back is a bounded find-and-replace from the manifest, no discovery step. No in-source comment markers (keeps public HTML clean). |
| Q2 | index.html FULL-TIME ROLE CTA section (222–233) + footer CTA (262) | **Reframe** to a neutral, capability-framed "let's connect" contact invitation. Section structure preserved; copy byte-locked at Arch Gate. |
| Q3 | Name new role/employer? | **Stay neutral-silent.** Present Rob as a senior engineering executive in present tense; no availability signal, no "currently at X." |
| Q4 | Advisory page framing | **Reframe standalone** — advisory as a selective engagement decoupled from any job search. Advisory deferrals (`project_advisory_deferrals.md`) stand: no pricing/Calendly/testimonials added. |
| Q5 | Contact "Hiring opportunity" intent (contact.html:201 + main.js:256) | **Keep as-is.** No form/JS change. Positioning signal lives in headlines, not a utility dropdown; keeps SPEC-014 plumbing intact and is maximally reversible. |
| Q6 | Canonical resume PDF sync | **Operator regenerates the PDF.** Sequencing: Arch Gate marketing-copywriter locks the neutral resume summary string → Rob updates the PDF source doc with that string and exports the new `files/rob-parker-resume.pdf` → implementer mirrors `resume.html` to match and verifies positioning-line consistency. PDF regen is an operator dependency gating the resume portion of implementation; the other 4 pages + manifest proceed in parallel. |

**Implications for scope:**
- R5 (contact form) reduces to **no change** per Q5 — `contact.html:201` and `js/main.js:256` are left as-is. AC4 becomes a regression assertion (form still in sync, untouched) rather than a change.
- Q6 makes the resume page's implementation depend on Rob delivering the regenerated PDF; QA Gate for the resume portion waits on it. AC6 resolves to "both neutral and consistent" (the tracked-divergence fallback is not taken).

**Spec Gate Decision:** Approved 2026-06-03. Gate converted an ambiguous "remove job-seeking language" ask into a bounded scope manifest, resolved the central reversibility question (documented manifest doc over in-source markers or git-revert, fitting a no-build public-repo static site), and surfaced the canonical-PDF operator dependency before implementation rather than at QA.

---

## Arch Gate (2026-06-03)

### Specialists invoked

- **architect-reviewer** (Layer 2) — design validation of the manifest mechanism, reframe-vs-regression analysis, form-sync integrity, and an independent completeness sweep. Returned **APPROVE WITH CONDITIONS** (C1–C3 below).
- **marketing-copywriter** (Layer 2) — produced the Pre-Implementation String Lock (all neutral byte-strings) + locked the two `how-this-site-was-built.html` strings on a follow-up pass.
- **penetration-tester** — NOT invoked. Zero security surface: copy/meta-text edits + one new Markdown governance doc; no user input handling, no new external resources, no headers, no auth, no JS behavior change (Q5 leaves the only JS untouched).

Specialists ran in parallel per spec-pipeline convention.

### Arch Gate conditions (all absorbed)

- **C1 (scope gap — blocking):** The initial audit inventoried **5** pages; the site has **6** production pages. `how-this-site-was-built.html` (in the global nav) carries two job-seeking strings: line 154 ("Most candidates for senior engineering roles…") and line 856 (closing CTA "…If you're evaluating engineering leaders who build this way, let's talk."). Both shipping unchanged would visibly contradict the pivot on a public page. **Absorbed:** added to the String Lock (HB-1, HB-2) and the inventory; page count corrected to 6 across Summary/R1/AC1/AC9.
- **C2 (count baseline — blocking):** "5 pages / 5 files" references corrected to 6; AC10 reframed as a reflow check (no section-count change anywhere — Q2 is reframe-in-place); AC11 reframed as a nav regression assertion (no toggle point touches nav/footer markup).
- **C3 (manifest spec — blocking):** Manifest must be **anchor-keyed, not line-number-keyed** (line numbers drift — the exact failure mode Q1 rejected git-revert for) and must carry a "Deliberately untoggled (Q5)" footnote so a future operator doesn't re-toggle the contact-form `hiring` option. **Absorbed** into AG-IG-3 and the manifest design below.

### Scope corrections (vs. original audit inventory)

1. **+ `how-this-site-was-built.html`** (6th page) — strings HB-1 (154) and HB-2 (856). Head description (line 9) is methodology copy → not job-seeking, left as-is.
2. **contact.html has 6 head elements**, not 4: the original table labeled lines 20/30 as "descriptions," but they are **og:title (20)** and **twitter:title (30)** carrying the same job-seeking string as `<title>` (8). og:description is 21, twitter:description is 31. All six are locked below.
3. **Confirmed false positives — do NOT touch** (independently grepped): `advisory.html:190` ("the scale you're targeting" = client's scale), `advisory.html:196` ("hiring strategy" = advisory service), `advisory.html:201` ("available before the decision" = advisory availability), `about.html:179` ("promoted 8 engineers into senior and staff roles" = achievement metric), `about.html:180` ("Leadership at the Director and VP level" = capability statement), `how-this-site-was-built.html:811/821` (SDD-process language). These are the expected residual raw grep hits (AG-IG-9).

### Resume summary — copywriter rewrite overridden (gate annotation)

The copywriter's proposed `resume.html:161` NEW string rewrote the full summary to mirror the regenerated PDF verbatim, which would have reverted **"SugarAI's"** → **"SugarCRM's"** on the site — silently undoing SPEC-015's rebrand on that line (the regenerated PDF retains "SugarCRM" throughout; the site forward-brands "SugarAI"). **Override:** the locked `resume.html:161` change is the **minimal deletion of only the trailing job-seeking sentence**, preserving "SugarAI's" and the existing sentence structure. The PDF↔HTML company-name divergence (SugarCRM vs SugarAI in the body) is pre-existing and is flagged for Rob's decision (see Open item below); it is **not** a SPEC-022 change. AC6's consistency assertion applies to the *positioning/targeting* line (now absent in both), not the brand name.

### Pre-Implementation String Lock

The implementer ships these **byte-identically**. og/twitter description triplets mirror the page meta description per the site's established pattern. Char counts noted for descriptions (target ≤ ~160).

**`index.html`**
| Line | Element | NEW string (byte-locked) |
|------|---------|--------------------------|
| 9 / 19 / 29 | meta / og / twitter **description** | `Rob Parker is a senior engineering executive in Atlanta with 25+ years building AI-native platforms and scaling high-performing engineering teams.` (148) |
| 226 | CTA `<h2 id="ft-cta-heading">` (text only; id unchanged) | `Let's Connect.` |
| 227 | CTA `<p>` | `If you want to talk engineering leadership, AI platform strategy, or advisory — the contact form is the right first step.` |
| 256–267 §, copy ~260–263 | footer dark-CTA `<p>` (id `cta-heading` unchanged) | `Engineering leadership, AI platform strategy, or advisory — Rob is always open to the right conversation. Reach out directly.` |

**`about.html`**
| Line | Element | NEW string |
|------|---------|------------|
| 9 / 20 / 30 | meta / og / twitter description | `Rob Parker builds AI-native engineering organizations at scale. 25+ years experience, 10+ in senior leadership. Atlanta-based senior engineering executive.` (157) |
| 148 | hero `<p class="hero-subheadline">` | `Senior Engineering Executive — AI-Native Platforms, Scaling Engineering Organizations` |
| 152 | bio `<p>` (replace whole sentence) | `Based in Atlanta, Georgia.` |
| 309 | CTA `<p>` | `Whether you're building on AI, scaling an engineering organization, or navigating M&A — I'm worth a conversation.` |

**`resume.html`**
| Line | Element | NEW string |
|------|---------|------------|
| 9 / 21 / 31 | meta / og / twitter description | `25+ years building AI-native platforms and scaling engineering teams. SugarAI (formerly SugarCRM), Salesfusion, athenahealth. Senior engineering executive.` (152) |
| 123 | `<p class="resume-positioning">` | `Senior Engineering Executive &middot; AI-Native Platforms &middot; Atlanta, Georgia` |
| 161 | Summary `<p>` | **Delete only** the trailing ` Targeting Director or VP of Engineering roles at AI-forward companies.` (leading space + sentence). Everything before it — including `SugarAI&rsquo;s` — stays byte-identical. Paragraph then ends `…led the technical track of acquisition by SugarCRM.` |
| 358 | CTA `<p>` | `If you want to talk engineering leadership or explore an advisory engagement, I'm worth a conversation.` |

**`contact.html`** (six head elements)
| Line | Element | NEW string |
|------|---------|------------|
| 8 | `<title>` | `Contact Rob Parker &mdash; Senior Engineering Executive, Atlanta` |
| 20 | `og:title` | `Contact Rob Parker &mdash; Senior Engineering Executive, Atlanta` |
| 30 | `twitter:title` | `Contact Rob Parker &mdash; Senior Engineering Executive, Atlanta` |
| 9 / 21 / 31 | meta / og / twitter description | `Get in touch with Rob Parker — senior engineering executive in Atlanta. Replies within a few business days.` (106) |
| 121 | hero `<p class="hero-subheadline">` | `Use the form to get in touch — whether it's about advisory, a speaking opportunity, or anything else. I reply within a few business days.` |

**`advisory.html`**
| Line | Element | NEW string |
|------|---------|------------|
| 9 / 18 / 28 | meta / og / twitter description | `Selective technical advisory — AI platform strategy, architecture reviews, M&amp;A integration, and engineering org assessments. Rob Parker.` (140) |
| 125 | hero `<p class="hero-subheadline">` | `I take on a small number of advisory engagements — selective by design. The work is hands-on and specific: AI-native platform strategy, architecture and modernization reviews, M&amp;A technical due diligence and integration, and engineering organization assessments. If you're working through one of those problems at the executive level, I'm worth a conversation.` |

**`how-this-site-was-built.html`**
| ID / Line | Element | NEW string |
|-----------|---------|------------|
| HB-1 / 154 | `#why` `<p>` (4-word swap; rest byte-identical) | `Most engineering leaders can describe how they would bring AI-native practices to an organization. Few can show a working example. This page is one. Every spec in this repo, every commit, every gate decision is an artifact of the SDD methodology described here. The site itself is the proof.` |
| HB-2 / 856 | closing CTA `<p>` (trailing sentence only) | `The methodology described here is live — every spec, every gate decision, and every deployed change is in the public repo. If you build this way too, let's talk.` |

**`js/main.js`** — no change (Q5). `js/main.js:256` `hiring:` and `contact.html:201` `<option value="hiring">` are deliberately retained.

### Manifest design — `governance/job-market-mode.md` (AG-IG-3)

Anchor-keyed restore table (NOT line numbers). Header states current state (`MODE OFF`, set 2026-06-03) + flip-back instructions. One row per toggle point with columns: **TP-ID** | **File** | **Anchor** (stable greppable locator — element `id`, meta `name`/`property`, or a unique substring of stable surrounding copy) | **Mode OFF string** (== the NEW string above) | **Mode ON string** (the original job-market string) | **Notes**. Flip-back = for each row, find the Mode OFF string in the named file, replace byte-for-byte with the Mode ON string, then flip the state header to MODE ON. Includes a **"Deliberately untoggled (Q5)"** footnote naming `contact.html:201` + `js/main.js:256` so they are never auto-restored. The manifest is the mirror image of this String Lock — build both from one source.

### Implementation Guidance (IG list)

- **AG-IG-1** — Neutralize `how-this-site-was-built.html` HB-1 (154) and HB-2 (856) per the lock; add both to the manifest. *Source: architect completeness sweep + copywriter lock.*
- **AG-IG-2** — Ship every String-Lock NEW string byte-identically across all 6 pages, including the three contact.html title elements (8/20/30) and all description triplets. *Source: copywriter.*
- **AG-IG-3** — Create `governance/job-market-mode.md` per the design above (anchor-keyed, MODE OFF/ON header, Q5 footnote). Satisfies R8/AC7. *Source: architect C3.*
- **AG-IG-4** — Update the public-source developer comment at `index.html:222` (`<!-- FULL-TIME ROLE CTA … -->`) to a neutral descriptor (e.g. `<!-- CONTACT CTA -->`); the repo is public and view-source exposes the job-seeking tell. *Source: architect.*
- **AG-IG-5** — index.html footer CTA copy is the multi-line `<p>` in the dark `cta-section` (~256–267); lock the full paragraph byte-string, not a single line. *Source: architect.*
- **AG-IG-6** — Do NOT rename `id="ft-cta-heading"` or `id="cta-heading"`; edit text nodes only (renaming forces an `aria-labelledby` co-edit for zero benefit). *Source: architect.*
- **AG-IG-7** — `resume.html:161`: delete ONLY the trailing targeting sentence; preserve `SugarAI&rsquo;s` and the rest verbatim (override of copywriter rewrite — see gate annotation). *Source: PM-Spec + architect.*
- **AG-IG-8** — `advisory.html:125`: drop the "alongside my primary focus on full-time Director and VP of Engineering roles" coupling; keep the rest. Do NOT touch 190/196/201 (false positives). *Source: architect + copywriter.*
- **AG-IG-9 (residual count — ranged):** Post-implementation `(?i)open to|targeting|seeking|exploring|opportunit|roles at|evaluating|candidates|engineering roles` grep across the 6 pages: **raw 1–4, true-positives asserted = 0.** Each raw hit must map to the C2 false-positive list (advisory:190, advisory:196, about:179/180, how-built:811/821). *Source: architect, per `feedback_ig_residual_counts_as_ranges.md`.*
- **AG-IG-10 (residual count — ranged):** `(?i)hiring` grep: **raw 2–3, true-positives asserted = 0** (contact:201 + main.js:256 kept per Q5; advisory:196 "hiring strategy"). *Source: Q5 + architect.*
- **AG-IG-11 (head-region — ranged):** `<head>`-region grep (AC1 terms) across 6 pages after fix: **raw 0, true-positives 0** (pre-fix ~16). *Source: architect.*
- **AG-IG-12 — Q6 sequencing:** the regenerated neutral PDF is already in place (`files/rob-parker-resume.pdf`, verified 0 targeting residuals). resume.html portion may proceed. AC6 asserts the *targeting clause* is absent from both PDF and resume.html:161 (it is). The brand-name body divergence is out of scope (gate annotation). *Source: Q6 + PDF verification.*
- **AG-IG-13 — nav baseline (regression):** no toggle point touches nav/footer markup; assert `.nav-links` blocks unchanged from `main`. *Source: architect.*
- **AG-IG-14 — R7 memory + manifest cross-reference:** update `project_positioning.md` to the neutral frame (AC8) and have it + the manifest reference SPEC-022. *Source: R7.*
- **AG-IG-15 — reflow QA:** visual check at 768px/375px on the pages with materially changed copy length (index CTAs, about bio, advisory hero, how-built CTA, resume, contact). Render check, not structural. *Source: architect §6.*

### Open item for Rob (non-blocking, surfaced at Arch Gate)

**Resume brand name — PDF says "SugarCRM," site says "SugarAI."** The regenerated PDF uses "SugarCRM" throughout; `resume.html` uses "SugarAI" (SPEC-015 rebrand). SPEC-022 preserves "SugarAI" on the site and does not touch the PDF's wording. Options for a future pass (not this spec): (a) leave as-is — intentional (site forward-brands SugarAI; resume PDF uses the company's name during tenure); (b) regenerate the PDF with "SugarAI (formerly SugarCRM)" for full alignment. Flagged for awareness; no action required to ship SPEC-022. **Resolved 2026-06-03: leave as-is (option a)** — Rob raised no objection at Arch Gate approval.

**Arch Gate Decision:** Approved 2026-06-03 with conditions absorbed — implementation may begin. Two-reviewer parallel retired both the completeness risk (architect caught the 6th in-nav page + contact's mislabeled title tags, ~28→~32 strings) and the content risk (copywriter locked every neutral string and the override that preserved SPEC-015's SugarAI rebrand on resume.html:161).

---

## Implementation Notes (2026-06-03)

Shipped the full String Lock across all 6 pages + the `index.html:222` dev-comment neutralization (AG-IG-4), created `governance/job-market-mode.md` (20 toggle points, anchor-keyed, MODE OFF/ON columns + Q5 untoggled footnote), and updated the `project_positioning.md` memory + MEMORY.md index (R7/AC8).

### Verification results (post-edit grep)

- **AG-IG-11 (head region):** 0 job-seeking matches in any `<title>`/`og:title`/`twitter:title`/description across all 6 pages. **PASS** (true-positive = 0).
- **AG-IG-10 (`hiring`):** raw 3 — `js/main.js:256` + `contact.html:201` (both Q5-retained) + `advisory.html:196` ("hiring strategy", advisory service copy). All expected; true-positive = 0. Within predicted 2–3. **PASS**.
- **Director/VP/CTO sweep:** all remaining hits are job titles (resume work history), testimonial attributions (`VP/SVP Engineering, SugarCRM`), advisory client context (`CEOs, CTOs`), the `about.html:180` capability statement, and a benign dev comment (`resume.html:183` "Senior Director role only (per spec)" — about which role gets metric callouts, not job-targeting). True-positive job-targeting = 0. **PASS**.

### Finding 1 — AG-IG-9 raw count exceeded the predicted range (benign)

AG-IG-9 predicted raw 1–4 for the broad body-term grep (`open to|targeting|seeking|exploring|opportunit|roles at|evaluating|candidates|engineering roles`); actual raw = **7**, true-positives = **0**. The four extra hits are all benign and fall into two buckets the Arch Gate prediction didn't enumerate:

1. **Neutral NEW copy that contains a grep term in a non-job sense** — `index.html:262` "Rob is always open to the right **conversation**" (approachability, not role-availability) and `contact.html:121` "a speaking **opportunity**" (an inbound contact reason). Both are intended SPEC-022 copy.
2. **Factual experience phrasing matching "roles at"** — `resume.html:161` "senior leadership **roles at** B2B SaaS companies" and `about.html:179` "promoted 8 engineers into senior and staff **roles at** SugarAI". Both are achievement/biographical, not Rob's targets.

Plus the two known Q5/false-positive carries already in the prediction (`advisory.html:190` "scale you're targeting", `how-this-site-was-built.html:811` "Evaluating after 10 specs"). **Disposition: resolve inline.** The gap is exactly the "lock-stage adds surfaces AR didn't anticipate" pattern from `feedback_ig_residual_counts_as_ranges.md` — the neutral replacement strings themselves legitimately contain a couple of the grep tokens. No job-seeking signal survives. Logged for the QA Gate residual-accounting AC.

### Finding 2 — `index.html:256` comment was already "CONTACT CTA"

AG-IG-4 targeted the `index.html:222` comment ("FULL-TIME ROLE CTA…"), which was neutralized to `<!-- CONTACT CTA -->`. Note the dark footer-CTA section's own comment (`index.html:256`) was *already* `<!-- CONTACT CTA -->` pre-spec — no collision; the two sections now carry the same neutral descriptor, which is fine. **Disposition: no action.**

---

## QA-SPEC-022 Checklist (2026-06-03)

**Branch:** `spec/SPEC-022-job-market-mode-toggle` · **Commit under test:** `b9f485e`
**Specialists:** `qa-expert` (static/automated) + `code-reviewer` (parallel).
**code-reviewer verdict:** **APPROVE** — all 32 String-Lock strings ship byte-identically; entities (`&mdash;`/`&middot;`/`&rsquo;`/`M&amp;A`/literal em-dash) correct per file convention; description triplets + contact title triplet consistent; `aria-labelledby` bindings intact (no id renamed); manifest MODE OFF strings match shipped files and MODE ON strings match pre-spec originals; no scope leakage (`js/main.js`, `css/style.css` untouched; `hiring` option retained). No critical/important/convention findings.

### Static checklist (qa-expert)

| # | Item | AC | Result |
|---|------|----|--------|
| 1 | Head regions (title/og/twitter/desc ×6 pages) free of job-seeking terms | AC1 | **PASS** (0 head matches) |
| 2 | Body copy free of inventoried job-seeking phrases | AC2 | **PASS** (0 matches) |
| 3 | Byte-lock spot-checks (index h2, index footer p, contact title triplet, advisory hero, how-built HB-1/HB-2, about hero/bio, resume positioning/summary) | AC3 | **PASS** (all byte-identical) |
| 4 | Contact form `hiring` option + `SUBJECT_BY_INTENT` unchanged; 5/5 option↔key sync | AC4 | **PASS** |
| 5 | index CTA reframed-in-place; `#ft-cta-heading`/`#cta-heading` preserved; dev comment neutralized | AC5 | **PASS** |
| 6 | PDF Summary + resume.html:161 both free of targeting clause; brand divergence acknowledged | AC6 | **PASS** |
| 7 | `governance/job-market-mode.md` exists; 20 toggle points cover all String-Lock entries; MODE OFF/ON columns; Q5 footnote | AC7 | **PASS** |
| 8 | `project_positioning.md` memory + MEMORY.md updated to neutral frame | AC8 | **PASS** (done at implementation; outside repo tree — operator may eyeball) |
| 9 | Regression scope: only 6 HTML + manifest + spec + PDF changed; `js/main.js`, `css/style.css` untouched | — | **PASS** |
| 10 | HTML tag integrity across changed regions (text-only edits, balanced tags) | — | **PASS** |
| 11 | Nav/footer baseline unchanged (no nav markup touched) | AC11 | **PASS** |
| 12 | AG-IG-9 residual: raw 7, true-positive **0** (all benign — see Finding 1) | AG-IG-9 | **PASS** |
| 13 | AG-IG-10 `hiring`: raw 3, true-positive **0** (2 Q5-retained + 1 advisory copy) | AG-IG-10 | **PASS** |
| 14 | AG-IG-11 head terms: raw 0 | AG-IG-11 | **PASS** |

**Static result: 14/14 PASS (20 sub-checks), 0 FAIL.**

### Deferred to operator visual check (browser-required)

- **AC9 — console-clean sweep** on all 6 pages (near-zero risk: no JS/CSS changed; `contact.html` highest priority for its form JS).
- **AC10 — reflow at 768px and 375px** on the pages with materially changed copy length: `index.html` (CTA paragraphs), `about.html` (bio — the new `Based in Atlanta, Georgia.` is a short standalone sentence; confirm it doesn't read as an orphan mid-bio at 375px), `advisory.html` (longer hero paragraph — primary reflow risk), `how-this-site-was-built.html` (CTA), `resume.html`, `contact.html`.

No static defects block approval; the deferred items are the standard pre-deploy visual pass.

**QA Gate Decision:** Approved 2026-06-03 — SPEC-022 implementation complete (14/14 static PASS, code-reviewer APPROVE; reflow + console verified by Rob on a local preview). PR opens next; final byte-equality + console verification re-confirmed against the apex domain at the Deploy Gate.

---

## Deployment (2026-06-03)

**PR:** [#24](https://github.com/wizzbiff/robcparkerdotcom/pull/24) merged to `main` 2026-06-03.
**Merge commit:** `7f3f282`.
**Cloudflare deploy:** completed within the standard window; live apex polled until the new content flipped, then verified.

### Live verification results (apex)

| Check | Target | Result |
|-------|--------|--------|
| Apex live | `https://robcparker.com/` | HTTP 200 ✓ |
| Clean-URL routing | `/`, `/about`, `/resume`, `/contact`, `/advisory`, `/how-this-site-was-built` | all HTTP 200 ✓ (served directly, 0 redirects) |
| Byte-equality (8 spot strings) | index desc + h2, about hero + bio, resume positioning, contact title, advisory hero, how-built CTA | all present byte-identical to String Lock ✓ |
| Live job-seeking sweep | all 6 pages concatenated | **0 true-positive matches** ✓ |
| Live resume PDF | `https://robcparker.com/files/rob-parker-resume.pdf` | 0 targeting/job-seeking matches (`pdftotext`) ✓ |

### Findings post-deploy

**Finding 1 — `www` now 301-redirects to apex (was documented 522).** `https://www.robcparker.com/` returned **HTTP 301 → `https://robcparker.com/`** (resolves 200, 1 redirect), not the HTTP 522 documented in `governance/stack-quirks.md` (Cloudflare section) and `project_site_live.md` memory. www is now a working redirect alias to the apex. **Non-blocker** — unrelated to SPEC-022 (a Cloudflare config change at some prior point); the apex-canonical verification rule is unchanged and all apex checks pass. **Disposition:** governance/memory update candidate — `stack-quirks.md` www entry and `project_site_live.md` should be refreshed to reflect the 301 behavior (apex remains canonical). Flagged for Rob; queued as a follow-on hygiene edit, not a SPEC-022 site change. *Refreshed in the SPEC-022 closeout commit.*

**Deploy Gate Decision:** Approved 2026-06-03 — SPEC-022 live at https://robcparker.com. All 6 pages + the resume PDF verified job-seeking-free on the live apex; 8 locked strings byte-identical; clean-URL routing intact; `governance/job-market-mode.md` gives a bounded MODE OFF→ON flip-back. Job-market mode is OFF.

---

## Post-Completion Retro (2026-06-03)

### What went well

The Pre-Implementation String Lock did its job again — 32 byte-locked strings shipped with zero re-wording at implementation, and the QA byte-equality checks were a mechanical pass/fail rather than a judgment call. Two-reviewer parallel at Arch Gate earned its keep decisively: the architect's independent completeness sweep caught a **6th production page the PM-Spec audit missed entirely** (`how-this-site-was-built.html`, in the global nav), and the copywriter independently caught contact's mislabeled og/twitter **title** tags. Either miss would have shipped a visible job-seeking contradiction on the live site.

### What surprised

The reversibility requirement turned out to be the most interesting part of the spec, not the copy. Because there's no build step, "make it easily reversible" couldn't be a feature flag — it had to be a documentation artifact (`governance/job-market-mode.md`), and getting that right (anchor-keyed not line-keyed; MODE OFF/ON mirror columns; the Q5 "deliberately untoggled" footnote so the retained form option isn't accidentally restored) was where the real design thinking went. The manifest is the actual deliverable; the copy swap was the easy half.

### Process observations

- **AG-IG-9 raw count overshot the predicted range again (7 vs 1–4), benignly** — and the cause was exactly the codified `feedback_ig_residual_counts_as_ranges.md` pattern: the *neutral replacement strings themselves* contain grep tokens ("open to the right conversation", "speaking opportunity") in non-job senses. When a content spec's NEW copy is in the same lexical field as the OLD copy being purged, predict residual ranges wider still. The range framing absorbed it cleanly — no false alarm.
- **The canonical-PDF-first rule created a sequencing wrinkle** the spec anticipated: Rob regenerated the PDF before the copywriter locked the resume string, which flipped the intended order. It worked out because the PDF simply *removed* the targeting sentence (no new wording to coordinate), but it surfaced a latent rule conflict — mirroring the PDF verbatim would have reverted SPEC-015's "SugarAI" rebrand. The Arch Gate override caught it.

### Counterfactual

Without the Arch Gate completeness sweep, SPEC-022 ships neutralizing 5 pages while `how-this-site-was-built.html` keeps telling visitors "If you're evaluating engineering leaders who build this way, let's talk" — a job-seeking CTA on a public, in-nav page, directly contradicting the entire point of the spec. The gate is the only thing between the PM-Spec audit's blind spot and that escape.

### Stack-quirks follow-on

Yes — the `www` 522→301 change (Deployment Finding 1) is codification-worthy and is refreshed in `governance/stack-quirks.md` + `project_site_live.md` in the closeout commit. The apex-canonical verification rule is unchanged; only the documented www failure mode is now stale.
