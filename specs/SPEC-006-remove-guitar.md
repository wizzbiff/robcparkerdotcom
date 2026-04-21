# SPEC-006: Remove Guitar Playing Page and Re-Org Site

**Status:** QA Gate approved — ready for Commit/PR (deployment deferred per project policy)
**Tier:** Standard
**Author:** PM-Spec Agent
**Date:** 2026-04-20
**Branch:** `spec/SPEC-006-remove-guitar`

---

## Summary

Delete the Guitar Playing page (`services/guitar-playing.html`) and remove every reference to it across the site. The site posture is shifting to strictly professional for now — advisory and engineering-leadership content only. This spec also handles the secondary consequences of that removal: the home-page "How Rob Engages" section becomes a one-card orphan grid and needs restructuring; the About page's "Off the Clock" paragraph currently uses guitar as a narrative bridge and will need a targeted copy rework; and the `services/` subdirectory becomes a single-file directory whose fate needs a decision.

## Context

SPEC-001 scaffolded guitar-playing.html as a `noindex` placeholder, on the assumption a full guitar-themed page would follow. SPEC-002 (About) and SPEC-005 (Tech Advisory) shipped with that assumption in place — the About page's "Off the Clock" section and the home page's "How Rob Engages" services grid both link to and narratively lean on the guitar page.

Rob has since decided the site should be strictly professional for now. The near-term positioning is a Director/VP of Engineering hunt at AI-forward SaaS companies, with advisory as a secondary offering. A personal-interest page sits awkwardly against that positioning for the current audience (hiring managers, VCs, CEOs evaluating advisory fit). It may return in the future as part of a different phase — but not in the SPEC-001–006 professional-site scope.

This spec completes the SPEC-001–006 block. Per auto-memory `project_deployment_deferred.md`, no production deploys have occurred yet — there are no external URLs to break and no SEO equity to preserve from the deletion. That makes this a low-risk structural cleanup.

## Requirements

### R1: Delete the Guitar Playing page

- **File to delete:** `services/guitar-playing.html`
- No redirect is needed (site has never been deployed; no inbound links exist).
- The `noindex` tag on the current stub means search engines would not have surfaced it even if it had been deployed.

### R2: Remove all nav and footer links to Guitar

Every page has both a header nav `<ul class="nav-links">` and a footer nav `<ul class="footer-nav">` containing a `<li><a href="...guitar-playing.html">Guitar</a></li>` entry. Remove the entire `<li>` (not just the anchor) from each:

| File | Header nav line | Footer nav line | Path form |
|------|-----------------|-----------------|-----------|
| `index.html` | 54 | 230 | `services/guitar-playing.html` |
| `about.html` | 57 | 280 | `services/guitar-playing.html` |
| `resume.html` | 61 | 336 | `services/guitar-playing.html` |
| `contact.html` | 60 | 250 | `services/guitar-playing.html` |
| `services/tech-advisory.html` | 58 | 251 | `guitar-playing.html` (relative, same directory) |

Line numbers are pre-scan snapshots — the implementer should locate by content (`href*="guitar-playing"`) rather than by line, since earlier edits in the same page can shift numbers.

The nav order after removal is: Home · About · Resume · Advisory · Contact. No visual re-ordering required; removing the `<li>` collapses the list naturally.

### R3: Restructure the home-page "How Rob Engages" section

With Guitar removed, `index.html`'s `services-grid` (lines 145-174) drops from two cards to one. A one-card grid reads awkward visually and implies there were "more options" that disappeared. Options addressed in Ambiguities (A-2).

**Requirement (pending A-2 decision):** Replace the two-card grid with a text-focused treatment that surfaces advisory as a single clear option, without an orphaned card. The section heading "How Rob Engages" may be retained or tightened; the supporting intro paragraph (lines 140-143) needs a copy touch so that "fractional engineering leader or a technical thought partner" reads cleanly as a single proposition rather than two alternatives.

The existing "Explore Technical Advisory" CTA that currently lives inside the Guitar-less advisory card (line 156-158) must be preserved in some form — either as an inline button within the restructured section, or folded into the existing bottom-of-page `.cta-section`. Marketing-copywriter agent is invoked to tune the replacement copy (see Content Requirements).

### R4: Repair the About-page "Off the Clock" paragraph

`about.html` line 245 (inside the "Off the Clock" section, lines 239-248) currently reads:

> I'm a husband and father of three, based in Atlanta, Georgia. Guitar is a longstanding obsession — I write about it on its own page. The discipline of playing seriously has a way of showing up in how I lead: the patience, the precision, the willingness to work at something for a long time before it sounds the way you imagined.

The guitar sentence is a narrative bridge between "I have a family" and "the discipline shows up in how I lead". Simply deleting the middle sentence leaves a non-sequitur ("I'm a husband and father... The discipline of playing seriously..."). Options addressed in Ambiguities (A-3).

**Requirement (pending A-3 decision):** marketing-copywriter rewrites this paragraph. The "Off the Clock" section should still serve its original purpose — humanize Rob and gesture at a discipline or register that informs his leadership — but without the guitar-specific hook. The copywriter brief includes `files/rob-parker-resume.pdf` and `files/LinkedInProfile.pdf` so the replacement bridge can draw on a different real detail from Rob's life without inventing content.

### R5: Decide `services/` directory fate

After `guitar-playing.html` is deleted, the only remaining file in `services/` is `tech-advisory.html`. Options addressed in Ambiguities (A-1).

**Requirement (pending A-1 decision):** Either (a) leave `services/tech-advisory.html` in place, or (b) move it to `advisory.html` at the site root and delete the empty `services/` directory. Option (b) requires updating every header-nav and footer-nav link on every page (currently `services/tech-advisory.html` on the 4 root-level pages and `tech-advisory.html` on the moved file itself), the home-page advisory CTA (`index.html:156`), and the moved file's internal `../css/style.css` and `../js/main.js` relative paths (plus the existing WHY comments at `services/tech-advisory.html:20, 101` that explain those paths — the comments should be deleted rather than kept-and-outdated if the file moves to root). Option (b) also needs the canonical URL in the moved file's head updated from `.../services/tech-advisory.html` to `.../advisory.html`.

### R6: Active-nav highlighting regression check

`js/main.js` highlights the active nav item by pathname match. With Guitar removed and (potentially) Advisory moved, the implementer must verify:

1. No JS still references the guitar path.
2. If Advisory moves to root (A-1 option b), the active-nav pathname match continues to fire on the new path.

### R7: Preserve all non-guitar content

No other copy or structural changes. This spec does not touch:

- Hero sections on any page
- The resume, contact form, or tech-advisory page body
- The Atlanta/family framing in the first sentence of "Off the Clock" — only the guitar sentence and its follow-on bridge are rewritten
- SEO meta tags on any page other than (potentially) the moved advisory file

## Content Requirements

marketing-copywriter agent is invoked during implementation for two targeted copy tasks:

1. **Home-page "How Rob Engages" section replacement copy.** Pending A-2, the copywriter produces either: (a) a revised section intro + single-card layout; (b) a text-focused section with inline CTA; or (c) a recommendation to delete the section entirely and fold the advisory CTA into the bottom `.cta-section`. Copywriter's deliverable includes section heading, supporting paragraph (if any), and CTA button label if changed.

2. **About-page "Off the Clock" paragraph rewrite.** Copywriter rewrites the paragraph to preserve the section's humanize-Rob purpose without the guitar hook. Input: this spec, `files/rob-parker-resume.pdf`, `files/LinkedInProfile.pdf`, and the note that Rob is based in Atlanta with three children. Deliverable: a replacement paragraph (~2-4 sentences) using a different real personal-but-professional bridge.

Content in the spec IS the content to implement — no rewriting during build. If the copywriter returns alternatives, Rob selects at Spec Gate or Arch Gate (not during implementation).

## Out of Scope

- Building a replacement "off the clock" or personal-interest page — if Rob ever wants a non-professional page back, it's a future separate spec
- Editing the home-page intro line "fractional engineering leader or a technical thought partner" (`index.html:141`) to align with SPEC-005's non-"fractional" advisory framing — **explicitly deferred to a separate trivial-tier follow-up spec.** Flagged here so it isn't lost. SPEC-005's Arch Review noted this as a soft drift risk and deferred it; this spec respects that deferral. If A-2's restructure happens to touch this line incidentally, the copywriter should only adjust what's strictly necessary for the restructure — full harmonization of the "fractional" language stays out of scope.
- Changes to other spec documents that mention guitar (SPEC-001, 002, 004, 005) — historical artifacts superseded by SPEC-006. Not rewritten.
- Redirects or 301s for `/services/guitar-playing.html` — site has never been deployed, no inbound links exist
- SEO or analytics changes beyond what's mechanically required by A-1 (canonical URL if advisory moves)
- Changes to the contact form, resume, or tech-advisory page body
- Deployment — still deferred project-wide per `project_deployment_deferred.md` until SPEC-000 is written

## Decision Rationale

- **Strictly professional site, for now.** Rob's near-term goal is a Director/VP FT role at AI-forward SaaS. A personal-interest page on a site also being read by hiring managers and VCs is a neutral-to-negative signal at this phase. The guitar page may return later in a different site phase, but shouldn't survive into the SPEC-001–006 professional-site scope just because it was scaffolded in SPEC-001. Removal is cheaper and cleaner than leaving a `noindex` stub.
- **No redirects needed.** The site has never been deployed (deploys deferred until SPEC-000), so there are no external inbound links, no SEO equity, and no users to redirect. This is a pre-launch cleanup, not a post-launch content removal.
- **Paragraph rewrite, not sentence deletion, for About.** The guitar sentence in "Off the Clock" is doing real structural work in the paragraph — it bridges "family in Atlanta" to "discipline shows up in leadership". Ripping it out produces a non-sequitur. A targeted copywriter rewrite is cheaper than leaving broken prose and costs only a few minutes in the copywriter's pass.
- **Home-page section restructure, not card deletion.** The "How Rob Engages" section surfaces advisory prominently; removing the guitar card without restructuring the section would leave a one-card grid that reads as "something was here and now it's gone". A text-focused restructure preserves the advisory surface while closing the visual orphan.
- **`services/` directory fate left as an ambiguity, not pre-decided.** The technical case for moving `tech-advisory.html` to root is straightforward (pre-deploy, zero URL-change cost, semantically cleaner). The counter-case is minor churn on every nav list. Rob decides; the spec sets up the decision cleanly rather than pre-baking it.
- **`fractional engineering leader` cleanup explicitly deferred.** That line is a real inconsistency with SPEC-005's advisory copy, but it's an editorial-style question (does Rob identify as a "fractional" anything?) that's bigger than this spec. Bundling it here would widen scope. Kept visible in Out of Scope so it surfaces in the next editing pass.
- **Standard tier, not Trivial.** Single-file deletion alone would be Trivial, but the ripple effects (nav changes site-wide, one section restructure, one paragraph rewrite by marketing-copywriter, one directory-fate decision) compose to Standard. Matches the "new static page / styling-layout / content" rows in the CLAUDE.md tier table when composed.
- **marketing-copywriter invoked for exactly two spots.** The copywriter pass is scoped to the home-page section restructure and the About paragraph repair. Every other edit is mechanical (delete `<li>`, delete file, delete card). Narrow copywriter scope keeps review cycles tight.

## Dependencies

- **SPEC-001 (complete):** Original placeholder for `services/guitar-playing.html`; shared nav/footer pattern this spec edits on every page.
- **SPEC-002 (complete):** About page "Off the Clock" section introduced here; this spec repairs its guitar dependency.
- **SPEC-003 (complete):** Resume page — only affected via nav/footer list removal.
- **SPEC-004 (complete):** Contact page — only affected via nav/footer list removal.
- **SPEC-005 (complete):** Tech Advisory page — affected via its own nav/footer list removal; also (pending A-1) potentially moved to site root.
- **No external integrations.** No new vendors, no new APIs, no new secrets. Cloudflare Pages hosting config is untouched since no production URL exists yet.

## Non-Functional Requirements

### Performance

- Net content reduction (one file deleted, nav lists shorter by one item). No performance regression possible.
- No new assets introduced.

### Accessibility

- Nav list semantics preserved on every page after `<li>` removal — the `role="list"` and `aria-label` attributes on `<ul>` and surrounding `<nav>` are untouched.
- If Advisory moves to root (A-1 option b), active-nav announcement continues to read correctly (`aria-current="page"` applied by `main.js`).
- About-page paragraph rewrite must preserve any inline-link patterns (`.body-link`) if the copywriter introduces new links; remove the now-dead `.body-link` pointing to the guitar page.
- Home-page section restructure must preserve heading hierarchy (single h1 on page; h2 on section; h3 on any remaining card).

### SEO

- No impact from guitar page deletion (was `noindex`, never deployed).
- If A-1 option b is chosen: canonical URL updated on moved `advisory.html`; no sitemap change (site has no sitemap file yet).
- No meta tags changed on unmodified pages.

### Responsive

- Nav list shortens by one item — existing hamburger-menu breakpoint behavior unchanged.
- Home-page section restructure must remain mobile-first responsive; no new layout primitives introduced without copywriter/implementer agreement.

## Acceptance Criteria

### Deletion

- **Given** the filesystem, **When** the repo is inspected, **Then** `services/guitar-playing.html` does not exist
- **Given** a grep across the repo for `guitar-playing`, **When** run, **Then** no HTML, CSS, or JS file contains the string (spec files and this document excepted)
- **Given** a grep across the repo for the word "Guitar" as navigation or body copy, **When** run, **Then** no non-spec file contains it (case-insensitive)

### Nav & Footer Integrity

- **Given** `index.html`, `about.html`, `resume.html`, `contact.html`, and the advisory page (wherever it lives post-A-1), **When** header nav is rendered, **Then** nav items are: Home, About, Resume, Advisory, Contact (in that order) — no Guitar entry
- **Given** those same pages, **When** footer nav is rendered, **Then** the same Home/About/Resume/Advisory/Contact set is present
- **Given** any page's nav, **When** traversed by keyboard, **Then** tab order is sequential across the 5 items with no broken link or skipped focus

### Home Page Restructure

- **Given** the home page, **When** the "How Rob Engages" area renders, **Then** no one-card grid is visible — the section is either restructured (per A-2 decision) or removed
- **Given** the user wants to reach the advisory page from the home page, **When** scrolling the home page, **Then** at least one clearly labeled CTA routes to the advisory page (either inline in the restructured section, or in the bottom `.cta-section`)

### About Page Repair

- **Given** the About page's "Off the Clock" section, **When** read as prose, **Then** the paragraph flows naturally (no non-sequiturs, no dangling references)
- **Given** the same section, **When** searched, **Then** no mention of guitar, playing, strings, practice, or similar guitar-coded terms remains
- **Given** the same section, **When** inspected, **Then** any inline link is a real, resolvable link (no `.body-link` pointing to a deleted page)

### Directory Fate (conditional on A-1)

**If A-1 option a (leave in place):**
- **Given** the filesystem, **When** inspected, **Then** `services/tech-advisory.html` exists and `services/` contains only that one file

**If A-1 option b (move to root):**
- **Given** the filesystem, **When** inspected, **Then** `advisory.html` exists at site root and `services/` directory does not exist
- **Given** the moved file, **When** inspected, **Then** `href="css/style.css"` and `src="js/main.js"` use root-relative paths (no `../`)
- **Given** the moved file's `<head>`, **When** inspected, **Then** canonical URL is `https://www.robcparker.com/advisory.html`
- **Given** every nav link to advisory on every page, **When** inspected, **Then** href is `advisory.html` (or appropriate relative form) — no `services/tech-advisory.html` string survives

### Active Nav Regression

- **Given** a user on any page, **When** that page's nav is rendered, **Then** the correct nav link receives `class="active"` / `aria-current="page"` via `main.js`
- **Given** `main.js`, **When** inspected, **Then** no reference to `guitar-playing` remains

### Site Integrity

- **Given** a link checker walks the site from `index.html`, **When** run, **Then** zero broken internal links are reported
- **Given** the repo's spec folder, **When** inspected, **Then** SPEC-001/002/004/005 are unchanged (historical artifacts preserved)

## Effort Comparison

| | AI-Assisted | Human Solo |
|---|---|---|
| Spec creation | ~25 minutes | 2-3 hours |
| Assumptions | PM agent had full repo access, the pre-scanned inventory of guitar references, the SPEC-005 template as a structural reference, and auto-memory confirming no production deploys yet (so redirect/SEO concerns drop out). Tier derived from composing "new static page / styling-layout / content" rows in CLAUDE.md's tier table — deletion ripples into 3 non-mechanical edits plus a marketing-copywriter pass. | PM would need to manually walk every page to find guitar references, think through the cascading implications (one-card grid, broken About paragraph, orphan directory), interview Rob on each ambiguity, and draft the deferral notes (particularly the "fractional" line) without losing scope discipline. |

---

## Approval

**Tier:** Standard
**Gate owner:** Rob Parker
**Requires:** Documented approval with responses to agent-raised ambiguities. Standard tier downstream: ARCH-SPEC-006 + QA-SPEC-006. No DEPLOY gate since deployment is deferred project-wide.

### Structured Review Checklist

- [x] Business intent confirmed (site goes strictly professional for now; guitar page removed in full)
- [x] Scope boundaries clear (guitar page + ripple effects only; "fractional" line explicitly deferred)
- [x] Acceptance criteria testable (Given/When/Then throughout, including conditional criteria on A-1)
- [x] Dependencies identified (SPEC-001 through SPEC-005; no new external integrations)
- [x] Tier appropriate (Standard — cross-page content edits + marketing-copywriter invocation + one directory-fate decision)
- [x] No mandatory escalation triggers (no auth, no payments, no new PII, no new external integrations, no DB, no core domain changes)
- [x] Third-party features verified (none introduced)
- [x] Decision Rationale section included

### Ambiguities Flagged for Spec Gate

| # | Concern | Options | Recommendation |
|---|---------|---------|----------------|
| A-1 | `services/` directory fate after guitar page deletion | (a) Leave `services/tech-advisory.html` in place as a one-file directory; (b) Move to `advisory.html` at site root, delete `services/` directory, update all nav links, CTA href, canonical URL, and relative asset paths | **(b)** — per `project_deployment_deferred.md`, no external URLs exist yet, so URL-change cost is zero. A one-file subdirectory is semantically thin and a later rename would cost more than doing it now. The nav-link churn is mechanical and all footer/header lists are already being edited in this spec for R2. Clean break is cheap now, expensive later. |
| A-2 | Home-page "How Rob Engages" section with Guitar removed | (a) Leave as a single-card grid (reads awkwardly — the grid's presence implies "more options here"); (b) Restructure section into a text-focused block with a single inline CTA (no card, section heading retained); (c) Delete the section entirely and let the bottom `.cta-section` carry advisory | **(b)** — keeps advisory visible on the home page (which is the primary surface for most visitors) without leaving an orphaned card. Option (c) under-surfaces advisory; option (a) reads as "something is missing". marketing-copywriter tunes the replacement copy. |
| A-3 | About-page "Off the Clock" paragraph repair | (a) marketing-copywriter rewrites just that paragraph using a different real personal-but-professional bridge; (b) Delete the "Off the Clock" section entirely — the About page still humanizes Rob through its earlier sections; (c) Replace with a different pre-selected hook (e.g., running, reading, hands-on hobbies) chosen by Rob now | **(a)** — the section serves a real purpose (humanize Rob without overdoing it) and removing it would leave the About page slightly more corporate than current. Copywriter pass is cheap and produces better prose than a Rob-dictated replacement hook written under time pressure. The copywriter is already being invoked for A-2 — bundling both keeps the invocation efficient. |
| A-4 | Copywriter output-ambiguity resolution | When marketing-copywriter returns alternatives for A-2 and/or A-3, where does Rob choose between them? (a) Spec Gate (now, with copywriter pre-run); (b) Arch Gate (after architect-reviewer weighs in on any structural impact); (c) Implementation-time (copywriter invoked live during build, Rob picks in PR review) | **(c)** — matches the SPEC-002/003/004/005 pattern where copywriter is invoked during implementation and output appears in the PR. Not blocking Spec Gate on copy drafts. The spec acceptance criteria already constrain what "good" output looks like. |
| A-5 | What happens if the home-page `fractional engineering leader` line (`index.html:141`) becomes visibly awkward after A-2's restructure | (a) Keep it out of scope as currently written — implementer preserves it verbatim even if slightly awkward; (b) Allow copywriter a narrow license to touch this line only if the restructure would otherwise read incoherently; (c) Pull the "fractional" cleanup into this spec's scope despite earlier deferral | **(b)** — gives the copywriter the minimum necessary freedom to keep the restructured section coherent without opening a full copy rework. Full harmonization of "fractional" language across the site remains a separate trivial-tier follow-up. Document any such touch-up in the PR description so it's auditable. |
| A-6 | Order of operations during implementation | (a) Delete `guitar-playing.html` first, then edit navs, then restructure home + about copy (top-down); (b) Edit navs first (so no dead links during the edit window), then delete the file, then restructure copy; (c) Branch-and-do-it-all-at-once — no intermediate commits | **(c)** — single branch `spec/SPEC-006-remove-guitar`, single PR per standard SDD flow. Intermediate commits within the branch are fine but order doesn't matter because nothing is deployed during the edit. Over-specifying the sequence adds process overhead for zero benefit. |

### Standard-Tier Escalation Check

| Trigger | Applies? | Notes |
|---------|----------|-------|
| Authentication / authorization | No | Public content only |
| Payments / financial data | No | None |
| PII / PHI handling | No | No new PII surface; contact form unchanged |
| New external API integration | No | None introduced |
| Database schema change | No | No DB |
| Core domain model modification | No | |
| Framework or platform migration | No | |
| First implementation of new architectural pattern | No | All edits use existing patterns — nav list item removal, copy restructure, file deletion. Nothing architecturally new. |

**No trigger escalates above Standard.**

### Gate Responses

| Concern | Response |
|---------|----------|
| A-1 | **Option (b) — move to root.** `services/tech-advisory.html` moves to `advisory.html` at site root. `services/` directory deleted. All nav/footer links updated. Canonical URL updated. Internal `../css/` and `../js/` relative paths rewritten to root-relative. Zero URL-change cost pre-deploy; clean break is cheap now, expensive later. |
| A-2 | **Option (b) — text-focused restructure.** Replace the two-card grid with a text-focused block including a single inline CTA to the advisory page. Section heading retained or tightened by copywriter. Keeps advisory visible on the home page without leaving an orphaned card. |
| A-3 | **Option (a) — copywriter rewrites the paragraph.** marketing-copywriter rewrites the "Off the Clock" paragraph using a different real personal-but-professional bridge drawn from `files/rob-parker-resume.pdf` and `files/LinkedInProfile.pdf`. Section preserves its humanize-Rob purpose. |
| A-4 | **Option (c) — implementation-time resolution.** Copywriter is invoked during implementation; output appears in the PR for review. Matches SPEC-002/003/004/005 pattern. Spec Gate not blocked on copy drafts. |
| A-5 | **Option (b) — narrow copywriter license.** Copywriter may touch the `fractional engineering leader` line (`index.html:141`) only to the extent required for A-2's restructure to read coherently. Full harmonization of "fractional" language across the site **stays deferred** as a separate trivial-tier follow-up spec. Any such touch-up must be called out in the PR description. |
| A-6 | **Option (c) — single branch, order irrelevant.** Single PR on branch `spec/SPEC-006-remove-guitar`. Intermediate commit order within the branch is implementer's discretion since nothing is deployed during the edit window. |

**Decision:** Approved
**Approved by:** Rob Parker
**Date:** 2026-04-20

---

## Architecture Review

**Reviewer:** architect-reviewer agent
**Date:** 2026-04-20
**Recommendation:** Approve with conditions (11 IG items, plus Arch Gate decisions below)

### Design Findings

| Area | Finding |
|------|---------|
| Pattern fit | Strong. This spec is a structural cleanup — no new primitives required. Every edit is a deletion, a path rewrite, or a reuse of an existing primitive. The restructured "How Rob Engages" section (A-2) can be built entirely by composing `.section` + `.section-header` + `.about-teaser` + `.btn-primary` — all production-proven on `index.html` today. The About "Off the Clock" paragraph repair (A-3) is a pure copy swap inside an existing `.off-the-clock` container. The advisory move to root (A-1) is a file relocation + path rewrites, no CSS change. **No new CSS primitives needed.** |
| Spec line-number verification | All nav/footer line numbers in the spec's R2 table verified against the current repo: `index.html` 54/230, `about.html` 57/280, `resume.html` 61/336, `contact.html` 60/250, `services/tech-advisory.html` 58/251. All accurate. No discrepancies. |
| A-1 move completeness audit | Spec R5 is comprehensive but slightly under-specifies the full set of touches. Verified full inventory of `../` references in `services/tech-advisory.html`: line 27 (`../css/style.css`), line 36 (logo `../index.html`), lines 54-59 (header nav 4 items), line 164 (inline body-links to `../about.html`, `../resume.html` inside the "Why This Background Matters" paragraph — **not mentioned in the spec's R5 itemization**), line 231 (CTA `../contact.html`), line 241 (footer logo), lines 247-252 (footer nav 4 items), line 272 (`../js/main.js`). Additionally: line 14 `og:url` (spec mentions "canonical URL" but omits the parallel `og:url`), line 24 `canonical` (spec addresses). WHY comments at lines 26 and 271 (spec cites 20 and 101 — those appear to be stale line numbers from the placeholder version; correct lines are **26 and 271** in the current file). **No `../images/` or `../files/` usage.** Only internal anchor is `#main-content` (skip-link) — unaffected. `<html lang>` is root-relative — unaffected. Put concretely: the spec's R5 list is missing (a) the two `.body-link` hrefs in the Why paragraph at line 164, (b) the `og:url` meta tag at line 14, and (c) the WHY-comment line numbers are stale (20, 101 → 26, 271). All three are called out explicitly in IG-1 below so implementation is complete. |
| A-2 restructure — reuse strategy | **`.about-teaser` is the right primitive.** It was designed for exactly this shape: short block of text paired with an inline CTA button, stacking on mobile and side-by-side at ≥768px. The existing `index.html:182-196` "About Rob" block is the direct reference — a two-column flex container (`.about-teaser-text` + `.about-teaser-action`) holding a paragraph and a `.btn-primary` CTA. The restructured "How Rob Engages" can reuse the exact same container pattern with advisory-specific copy; no new CSS class needed. `.section-header` continues to carry the h2 + intro paragraph above. **Alternative considered:** pure `.section-header` + inline `.btn-primary` under the paragraph. Rejected because `.about-teaser`'s two-column-at-desktop layout is what makes the section feel like a purposeful module rather than a lone paragraph adrift above the bottom CTA. **No new CSS primitive required.** |
| A-2 orphan CSS audit | After the `.services-grid` with two cards is removed from `index.html`, **no other page references `.services-grid` or `.service-card` as standalone primitives.** The only remaining consumer is `services/tech-advisory.html` which uses `.service-card` as the **base of the composition `.service-card.engagement-card`** (SPEC-005 AG-1). That means `.service-card` must stay — removing it would break the engagement cards. `.services-grid` itself becomes orphaned (only `index.html` used it). **Recommendation: retain `.services-grid` and `.service-card` both.** The service-card base is load-bearing for the engagement-card composition; `.services-grid` is only ~7 lines of CSS (lines 673-677 + its mobile breakpoint at 1466-1468) and is the natural home if/when a future services page returns. Deleting `.services-grid` now to reintroduce it later would be a false economy. See IG-6 for the formal non-deletion guidance. |
| A-3 About repair — inline link | `about.html:245` contains an inline `<a class="body-link" href="services/guitar-playing.html">its own page</a>` — the body-link must be removed along with the guitar sentence. After R4's paragraph rewrite, the replacement may or may not introduce a new inline link (copywriter's call). NFR line 138 already calls this out correctly. |
| `main.js` active-nav logic | Read `js/main.js:74-95`. Logic uses `normalizePath(pathname)` equality on `new URL(link.href, window.location.origin).pathname` — **basename-agnostic, full-pathname comparison**. No literal `guitar-playing` string in the file (verified via grep). After A-1's move to root, the active-nav logic will correctly highlight `/advisory.html` because the `<li><a href="advisory.html">Advisory</a></li>` on each page resolves to `/advisory.html` via the URL constructor, which matches `window.location.pathname` when the user is on `/advisory.html`. **No JS edit required for A-1.** One minor observation: `resume.html:59` has a **hardcoded** `class="active" aria-current="page"` on the Resume nav link (static fallback for no-JS users). This pattern is not applied consistently across pages — only Resume has it. This is not an SPEC-006 concern, just a noted inconsistency; no action required here. |
| Stack quirks | Reviewed `governance/stack-quirks.md`. **Nothing applicable.** No entry for Cloudflare Pages deletion behavior, empty-directory handling, or file-move routing. Cloudflare Pages serves by path on deploy; since nothing is deployed yet, all routing concerns are moot. Per `project_deployment_deferred.md`, the A-1 move carries zero runtime risk. |
| WHY comments on affected files | Grepped `WHY:` across the 6 affected files. All load-bearing WHY comments are either (a) unaffected by SPEC-006 (role="list", og:url absolute, noindex removal, defer vs async, email obfuscation, etc.), or (b) explicitly identified for deletion/update in the spec (the two `../css/` and `../js/` path comments at `services/tech-advisory.html:26, 271`). No non-obvious constraint is silently broken by this spec. |
| Sitemap / robots.txt / `_headers` / `_redirects` | None exist at project root (verified via glob). A-1's path change requires no routing or redirect configuration. No SEO-routing file to update. |
| SEO | Negligible impact. Guitar page was `noindex` and never deployed — zero SEO equity lost. Advisory page move: canonical URL and `og:url` both need updating to `https://www.robcparker.com/advisory.html`. No sitemap exists, so no sitemap update. Title, meta description, OG title/description/image remain valid. |
| Performance / a11y | Net-positive. One HTML file deleted, two `<li>` per page deleted, one section restructured (smaller footprint). No new assets, no new JS, no new CSS (per the reuse strategy above). A11y: nav list semantics preserved (R2 retains the full `<li>` rather than stripping the `<a>`); `role="list"` and `aria-label` attributes untouched; About paragraph rewrite must not introduce a dead `.body-link`; restructured home section must preserve h1/h2/h3 hierarchy (eliminating h3 from the deleted Guitar card is fine — restructure may retain or drop the h3 for the single advisory proposition). |
| Technical debt | **Net-negative (debt reduction).** Removes a placeholder page that has been carrying stub content since SPEC-001. Consolidates the site into root-level files (post A-1), eliminating the one-file-subdirectory awkwardness. Keeps `.service-card` intact for the engagement-card composition; keeps `.services-grid` as a latent primitive with minimal footprint. No new debt created. |

### Implementation Guidance (accept/reject per Arch Gate below)

| # | Guidance |
|---|----------|
| IG-1 | **A-1 full touch list — consolidated.** When moving `services/tech-advisory.html` to `advisory.html` at site root, update ALL of the following (the spec's R5 misses (a), (b), and has stale line numbers on (c)):<br>(a) **Inline body-links at line 164** — change `href="../about.html"` → `href="about.html"` and `href="../resume.html"` → `href="resume.html"` inside the "Why This Background Matters" paragraph.<br>(b) **`og:url` meta tag at line 14** — change `https://www.robcparker.com/services/tech-advisory.html` → `https://www.robcparker.com/advisory.html` (parallels the canonical URL update the spec already calls out).<br>(c) **Delete WHY comments at the correct current lines: 26 (`../css/ path`) and 271 (`../js/ path`)** — spec cites 20/101 which are stale from the placeholder era. Both are now obsolete once the file is at root; delete both comment blocks entirely rather than leaving stale commentary.<br>(d) All other items already in R5: header nav 4 items (lines 54-59), footer nav 4 items (lines 247-252), logo links (lines 36, 241), CTA href (line 231), `../css/style.css` → `css/style.css` (line 27), `../js/main.js` → `js/main.js` (line 272), canonical URL (line 24).<br>(e) Every root-page header/footer nav: `services/tech-advisory.html` → `advisory.html` in `index.html` (lines 53, 229), `about.html` (lines 56, 279), `resume.html` (lines 60, 335), `contact.html` (lines 59, 249). And the home-page CTA button href at `index.html:156`.<br>(f) **Delete the `services/` directory** after the move — verify it is empty (no hidden files, no `.DS_Store`, nothing committed). |
| IG-2 | **A-1 move semantics — git rename, not delete-and-create.** Use `git mv services/tech-advisory.html advisory.html` so git preserves blame/history. Do NOT do `rm + touch + paste` — that loses the SPEC-005 implementation history on the file. |
| IG-3 | **A-2 restructure — reuse `.about-teaser` composition, do not fork.** HTML skeleton for the restructured "How Rob Engages" section:<br>`<section class="section" aria-labelledby="services-heading">`<br>`  <div class="container">`<br>`    <div class="section-header">`<br>`      <h2 id="services-heading">{heading}</h2>`<br>`      <p>{copywriter intro paragraph}</p>`<br>`    </div>`<br>`    <div class="about-teaser">`<br>`      <div class="about-teaser-text"><p>{advisory proposition copy}</p></div>`<br>`      <div class="about-teaser-action"><a href="advisory.html" class="btn btn-primary">{CTA label}</a></div>`<br>`    </div>`<br>`  </div>`<br>`</section>`<br>This is pure composition of existing primitives (`.section`, `.section-header`, `.about-teaser`, `.btn-primary`) — **no new CSS classes introduced**. The `.about-teaser` mobile-stacks / desktop-side-by-side behavior is already in place at `style.css:842-851` + `1474-1487`. Add a WHY comment above the `.about-teaser` block noting that it's the second use of `.about-teaser` on `index.html` (reuse, not fork). |
| IG-4 | **A-2 — delete the entire `.services-grid` block from `index.html`** (currently `index.html:145-174`). Both service-card articles (advisory and guitar) are removed; the entire `<div class="services-grid">` wrapper goes with them. Replace in place with the `.about-teaser` composition from IG-3. Do NOT leave an empty grid wrapper. |
| IG-5 | **A-2 — home-page intro paragraph handling.** `index.html:140-143` contains "Whether you're looking for a fractional engineering leader or a technical thought partner, Rob brings executive-level judgment to the table." Per A-5's Spec-Gate response, the copywriter has **narrow license** to adjust this line only if the restructure would otherwise read incoherently. The implementer must not harmonize the full "fractional" language site-wide in this spec — that is a deferred trivial follow-up. Any touch-up to this line must be called out in the PR description. If the copywriter leaves the line unchanged, that's also fine. |
| IG-6 | **Do NOT delete `.services-grid` or `.service-card` CSS rules.** After A-2's restructure, `.services-grid` becomes orphaned (no HTML references it). However: `.service-card` is load-bearing for the engagement-card composition at `services/tech-advisory.html` (per SPEC-005 AG-1 — `.engagement-card` inherits all base chrome from `.service-card`). Removing `.service-card` would break advisory page. And `.services-grid` is a tiny primitive (~7 lines including the responsive breakpoint at `style.css:1466-1468`) that pairs naturally with `.service-card` — leaving it in place is the cleaner outcome. **Retain both CSS blocks; do not edit.** |
| IG-7 | **A-3 repair — remove the `.body-link` to guitar page along with the sentence.** The guitar sentence in `about.html:245` contains an inline `<a href="services/guitar-playing.html" class="body-link">its own page</a>`. The copywriter rewrite must not leave this `.body-link` behind in any form. The replacement paragraph may or may not introduce a new `.body-link` to another resource (copywriter's judgment) — if it does, use descriptive link text ("my LinkedIn profile", not "here") and an absolute or resolvable href. |
| IG-8 | **A-3 — container markup unchanged.** Preserve the existing `<section class="section" aria-labelledby="off-clock-heading">` + `.section-header` + `<div class="off-the-clock">` container (about.html:239-248). Only replace the inner `<p>` content. Do not restructure the section wrapper. |
| IG-9 | **R2 nav/footer removals — locate by content, not line.** Per the spec's own note, use the `href*="guitar-playing"` attribute selector (or a grep for the string) to locate each `<li>` to delete rather than relying on line numbers. Line numbers are verified accurate at review time but will shift during the edit process (particularly on `index.html` where the A-2 restructure shortens the file). Delete the entire `<li>...</li>` element, not just the anchor. |
| IG-10 | **Active-nav verification after A-1 — no JS edit required.** `js/main.js:74-95` uses full-pathname equality after normalization. When a user is on `/advisory.html` and the nav link is `<a href="advisory.html">`, `new URL("advisory.html", window.location.origin).pathname` resolves to `/advisory.html` and matches `window.location.pathname` after `normalizePath`. **No JS change needed.** But confirm at implementation time by loading the moved `advisory.html` locally and inspecting the nav — Advisory link should have `class="active" aria-current="page"` added by `main.js` `initActiveNav()`. Verify Home does NOT also become active (would indicate the normalization missed the `index.html` case). |
| IG-11 | **Grep-based completion check before commit.** After all edits: run `rg -n 'guitar\|Guitar' --iglob '!specs/**' --iglob '!CLAUDE.md'` and confirm **zero matches in HTML/CSS/JS/JSON**. Also run `rg -n 'services/tech-advisory' --iglob '!specs/**'` and confirm **zero matches** if A-1 was executed (all nav/footer refs rewritten). Also `rg -n 'services/guitar-playing'` — zero matches expected. These three greps double as the spec's Acceptance Criteria "Deletion" and "Nav & Footer Integrity" sections. |

### Arch Gate Decisions Required (Rob)

| # | Question | Options | Recommendation |
|---|----------|---------|----------------|
| AG-1 | A-2 restructure primitive — which pattern to reuse? | (a) `.about-teaser` composition (IG-3) — mobile-stack / desktop-side-by-side, with heading above in `.section-header`; (b) `.section-header` + inline `.btn-primary` below the intro paragraph (flatter, no two-column treatment); (c) Introduce a new `.engagement-proposition` primitive purpose-built for this single use | **(a)** — `.about-teaser` was designed for precisely this shape (short block + inline CTA), already handles responsive behavior, and its second use on `index.html` reinforces a consistent page rhythm (hero → highlights grid → "How Rob Engages" `.about-teaser` → "About Rob" `.about-teaser` → bottom CTA). No new CSS. The duplicate use of `.about-teaser` on one page is acceptable — the class name is slightly semantically loose ("about-teaser" hosting non-about content), but renaming it across the site is a separate concern. Option (c) is over-engineering for a single consumer. |
| AG-2 | CTA placement in the restructured "How Rob Engages" | (a) Inline CTA inside the `.about-teaser` (matches IG-3 — a `.btn-primary` labeled "Explore Technical Advisory" or copywriter variant); (b) No inline CTA — fold the advisory action into the existing bottom `.cta-section` (`index.html:200-209`) and let the section be pure text; (c) Both — inline CTA AND strengthen the bottom CTA | **(a)** — inline CTA preserves the "How Rob Engages" section's function as a first-touch call to action for advisory on the home page (which was the section's original purpose before the card grid was introduced). Bottom `.cta-section` remains the general "Let's Talk" close; it already routes to contact, not advisory. Option (b) under-surfaces advisory. Option (c) creates two competing CTAs on a short page. |
| AG-3 | `.services-grid` / `.service-card` CSS fate | (a) Retain both (IG-6) — `.service-card` is required by `.engagement-card` composition; `.services-grid` is a tiny latent primitive; (b) Delete `.services-grid` only — keep `.service-card` because engagement-card inherits from it; (c) Delete both and fork `.service-card` chrome into `.engagement-card` standalone | **(a)** — `.services-grid` is ~7 lines including its responsive breakpoint; the deletion savings are negligible and a re-introduction cost later would exceed the cost of leaving it. `.service-card` must stay regardless. Option (c) would re-open the AG-1 decision from SPEC-005 and reintroduce the exact drift risk that composition was chosen to avoid. |
| AG-4 | WHY-comment fate on moved advisory file | (a) Delete both WHY comments at `services/tech-advisory.html:26` (`../css/` path) and `271` (`../js/` path) during the move — they become obsolete; (b) Update the comments to explain the root-level paths are now correct post-move (adds narrative value); (c) Delete (a) but add a new WHY comment noting the file was moved from `services/` in SPEC-006 | **(a)** — the WHY comment's only purpose was to explain the subdirectory path; after the move the path is root-relative and self-evident. No narrative value in pointing out that a root-level path is root-level. SPEC history is captured in git blame and SPEC-006 itself; adding a "this moved" comment is code-archeology that the git log already provides. Clean deletion is cleanest. |
| AG-5 | `og:url` and canonical URL final format for moved advisory page | (a) `https://www.robcparker.com/advisory.html` — matches the existing pattern used on about.html / resume.html / contact.html (no trailing-slash normalization, file extension explicit); (b) `https://www.robcparker.com/advisory` — extensionless, cleaner; (c) `https://www.robcparker.com/advisory.html` for canonical, `/advisory` for og:url | **(a)** — matches every other page on the site (`/about.html`, `/resume.html`, `/contact.html`). Extensionless URLs require either a Cloudflare Pages routing rule or a server-side rewrite that doesn't exist; switching now would fork the URL style and create an inconsistency with the rest of the site. The extension-explicit form is the site's established convention and the correct default. |
| AG-6 | Copywriter license boundary for `index.html:140-143` "fractional engineering leader" intro | (a) Narrow license per A-5 Spec-Gate response — copywriter may touch this line only if the restructure requires it for coherence; any touch-up called out in PR description (IG-5); (b) Strict preservation — the line is rewritten verbatim even if it reads slightly off against the new section; (c) Expand scope now — harmonize "fractional" site-wide in this spec | **(a)** — matches the Spec-Gate decision on A-5. Option (b) risks shipping incoherent prose on the home page; option (c) expands scope and re-opens a deferred editorial question. The narrow-license approach was already approved; confirming it here makes it a formal Arch-Gate-recorded constraint. |

### Effort Comparison (Arch Review stage)

| | AI-Assisted | Human Solo |
|---|---|---|
| Arch review | ~12 minutes | 2-3 hours |
| Assumptions | Reviewer had full repo access, SPEC-005's Architecture Review as a structural template, and the complete SPEC-006 spec with all 6 ambiguities resolved. No pentester invoked (Standard tier, no auth/PII/payment/external-integration surface — every edit is a deletion or a relocation of existing code; no new attack surface is introduced). Stack-quirks reviewed and confirmed irrelevant. Full file-content inventory performed (not just line-number spot checks) for the A-1 move, which surfaced three items missed by the spec's R5 list (body-link hrefs on line 164, `og:url` meta tag on line 14, stale WHY-comment line numbers). |

### Arch Gate Decisions (2026-04-20)

| # | Decision | Status |
|---|----------|--------|
| AG-1 | A-2 restructure primitive → **Reuse `.about-teaser` composition** (option a) — no new CSS, mirrors the existing "About Rob" block on `index.html` | Accepted |
| AG-2 | CTA placement in restructured "How Rob Engages" → **Inline CTA inside `.about-teaser`** (option a) — preserves section's first-touch advisory surface; bottom `.cta-section` remains general | Accepted |
| AG-3 | `.services-grid` / `.service-card` CSS fate → **Retain both** (option a) — `.service-card` is load-bearing for `.engagement-card` composition; `.services-grid` kept as latent primitive | Accepted |
| AG-4 | WHY-comment fate on moved advisory file → **Delete both comments** at lines 26 and 271 (option a) — root-level paths are self-evident post-move | Accepted |
| AG-5 | `og:url` and canonical URL format → **`https://www.robcparker.com/advisory.html`** (option a) — matches site convention (extension-explicit) | Accepted |
| AG-6 | Copywriter license for `fractional engineering leader` intro → **Narrow license per A-5** (option a) — touch only if A-2 restructure requires it for coherence; full site-wide "fractional" cleanup remains deferred to follow-up spec; any touch-up called out in PR description | Accepted |

All 11 IG items (IG-1 through IG-11) accepted as-written.

### Arch Gate Approval

**Decision:** Approved
**Approved by:** Rob Parker
**Date:** 2026-04-20

---

## QA Review

**Reviewers:** qa-expert + code-reviewer agents (parallel)
**Date:** 2026-04-20
**QA Verdict:** PASS with observations (no FAILs)
**Code Review Verdict:** APPROVE with minor notes (no blocking issues)

### Summary

All 8 acceptance criteria blocks and all 11 IG items verified as correctly implemented. The `services/` directory does not exist; `advisory.html` is at site root; all five pages carry identical 5-item nav lists (Home, About, Resume, Advisory, Contact) in both header and footer; no guitar/Guitar string survives outside spec files; all internal links resolve to real files; CSS and JS are byte-for-byte unchanged from main. Git records the advisory file as a rename (`services/tech-advisory.html → advisory.html`), not a delete-and-add, preserving SPEC-005 implementation history per IG-2. Both reviewers independently caught one pre-existing ampersand-escape issue at `advisory.html:73` (hero subheadline `M&A`); fixed in this PR for convention parity with SPEC-005 QG-3.

### QA Gate Decisions (2026-04-20)

| # | Finding | Decision |
|---|---------|----------|
| QG-1 | **IG-11 greps: all three return zero matches.** `rg -n 'guitar\|Guitar' --glob '!specs/**' --glob '!CLAUDE.md'` → empty. `rg -n 'services/tech-advisory' --glob '!specs/**'` → empty. `rg -n 'services/guitar-playing' --glob '!specs/**'` → empty. | PASS — no action. |
| QG-2 | **Nav & footer integrity on all 5 pages.** Every page (`index.html`, `about.html`, `resume.html`, `contact.html`, `advisory.html`) has exactly 5 `<li>` items in both `.nav-links` and `.footer-nav`. Order is Home → About → Resume → Advisory → Contact on all 10 lists. No Guitar entry; no empty `<li>` anywhere. `role="list"` and `aria-label` preserved on all nav elements. | PASS — no action. |
| QG-3 | **A-1 path rewrites in advisory.html complete.** All items in IG-1 verified: `og:url` = `https://www.robcparker.com/advisory.html`; canonical = same; `href="css/style.css"` — no `../`; `src="js/main.js"` — no `../`; logo hrefs root-relative; nav hrefs all root-relative; body-links `href="about.html"` and `href="resume.html"`; CTA `href="contact.html"`; footer logo + footer nav root-relative. WHY comments at pre-move lines 26 and 271 (subdir path explanations) both absent — deleted per AG-4. No `../` anywhere in `advisory.html`. | PASS — no action. |
| QG-4 | **IG-2 git rename confirmed.** `git status` shows `renamed: services/tech-advisory.html -> advisory.html`. History preserved; no delete-and-add. | PASS — no action. |
| QG-5 | **Home-page restructure (IG-3/IG-4).** `index.html` "How Rob Engages" section uses `.section` + `.section-header` (h2 + intro paragraph) + `.about-teaser` + `.about-teaser-text` + `.about-teaser-action` + `.btn-primary`. CTA `href="advisory.html"` with label "Explore Advisory Engagements". WHY comment present noting second use of `.about-teaser` on this page. No `.services-grid` wrapper; no `<article class="service-card">` on `index.html`. | PASS — no action. |
| QG-6 | **IG-5: `fractional engineering leader` line.** `index.html` intro reads: "Whether you're looking for a fractional engineering leader or a technical thought partner…" — unchanged from main. Copywriter did not need to touch it for coherence; full harmonization remains deferred per AG-6. | PASS — observation only. Deferred "fractional" cleanup remains outstanding as a separate trivial-tier spec. |
| QG-7 | **IG-6: `.services-grid` and `.service-card` CSS intact.** `git diff main -- css/style.css` returns empty. `.services-grid` and `.service-card` both present; `.engagement-card` composition rules intact. No CSS removed. | PASS — no action. |
| QG-8 | **IG-7/IG-8: About page "Off the Clock" repair.** `<section class="section" aria-labelledby="off-clock-heading">` + `.section-header` + `<div class="off-the-clock">` wrapper preserved. Replacement paragraph contains no guitar/Guitar/strings/practice/playing references. No `.body-link` pointing to any deleted page. Replacement copy flows naturally from the Atlanta/family anchor to the leadership parallel. | PASS — no action. |
| QG-9 | **IG-9: Full `<li>` removal, not just anchor.** All nav lists across all pages have exactly 5 items with no empty `<li></li>` elements. | PASS — no action. |
| QG-10 | **IG-10: `js/main.js` unchanged.** `git diff main -- js/main.js` returns empty. `grep -n 'guitar' js/main.js` returns empty. Active-nav logic at lines 74–95 uses full-pathname comparison via `normalizePath` — will correctly fire on `/advisory.html` when nav link is `<a href="advisory.html">` (resolves to `/advisory.html` via URL constructor). No JS edit required or made. | PASS — no action. |
| QG-11 | **Historical specs untouched.** `git diff main -- specs/SPEC-001*.md specs/SPEC-002*.md specs/SPEC-004*.md specs/SPEC-005*.md` returns empty. `files/LinkedInProfile.pdf` remains untracked (not staged). | PASS — no action. |
| QG-12 | **Site-wide internal link integrity.** All `href` targets found in HTML files confirmed present on the filesystem: `about.html`, `advisory.html`, `contact.html`, `css/style.css`, `files/rob-parker-resume.pdf`, `index.html`, `js/main.js`, `resume.html`. Zero broken internal links. | PASS — no action. |
| QG-13 | **Pre-existing `M&A` escape gap at `advisory.html:73`.** Hero subheadline contained `M&A technical due diligence` — unescaped. Every other `M&A` on the site uses `M&amp;A` (SPEC-005 QG-3 convention). Present in `services/tech-advisory.html` on main before this branch; SPEC-006 did not introduce it. Both reviewers independently flagged for convention parity. | **Fixed** — `M&A` → `M&amp;A` applied at `advisory.html:73` for convention parity with SPEC-005 QG-3. All 6 `M&A` occurrences in `advisory.html` now properly escaped (verified by grep). |
| QG-14 | **Single `<h1>` per page; logical heading hierarchy.** Each page has exactly one `<h1>`. `index.html` restructured section uses `<h2>` in `.section-header` — no heading-level gaps created by removing the two `<h3>` service card headings. | PASS — no action. |
| QG-15 | **A11y: `role="list"`, `aria-label`, skip-link, target="_blank"/rel=noopener, no new inline handlers.** All preserved. All 9 `target="_blank"` instances across all HTML files paired with `rel="noopener noreferrer"` (grep-verified). No inline `<script>` or `<style>` introduced; no `href="javascript:..."` patterns. | PASS — no action. |
| QG-16 | **`resume.html:59` hardcoded active-state** — pre-existing inconsistency (only Resume page has the hardcoded `class="active" aria-current="page"` fallback). Preserved unchanged; flagged by architect-reviewer earlier. | PASS — no action. Out-of-scope pre-existing inconsistency for a future consistency pass. |

### IG-11 grep results (recorded for audit)

```
$ rg -n 'guitar|Guitar' --glob '!specs/**' --glob '!CLAUDE.md'
(no output)

$ rg -n 'services/tech-advisory' --glob '!specs/**'
(no output)

$ rg -n 'services/guitar-playing' --glob '!specs/**'
(no output)
```

### Deferred to deploy-time verification

Per the project-wide deployment deferral (`project_deployment_deferred.md`), runtime browser checks are not performed until all of SPEC-001–006 are complete and SPEC-000 is written. At deploy time, re-verify:

1. `https://www.robcparker.com/advisory.html` loads with no 404 (confirms Cloudflare Pages serves the moved file at the new root path)
2. `https://www.robcparker.com/services/tech-advisory.html` returns 404 (no redirect needed — never deployed — confirms no routing ghost)
3. Advisory nav link receives `class="active"` / `aria-current="page"` when on `/advisory.html` — `main.js` `initActiveNav()` fires correctly
4. Home nav link does NOT receive `class="active"` when on `/advisory.html` (normalizePath edge case)
5. Home-page "Explore Advisory Engagements" button routes to `advisory.html` correctly
6. CTA "Get in Touch" on advisory page routes to `contact.html`
7. Social-card renderers (LinkedIn Post Inspector, Facebook Debugger) render `og:title` / `og:description` / `og:image` from `advisory.html` correctly at the new URL
8. Guitar nav link does not appear anywhere at runtime (confirm absence)

### Effort Comparison (QA stage)

| | AI-Assisted | Human Solo |
|---|---|---|
| QA + code review | ~12 minutes (two agents in parallel) + ~1 minute fix-up edit | 2-3 hours (QA engineer walking acceptance criteria + code reviewer reading diff, sequential) |
| Assumptions | Reviewers had repo access, all prior gate artifacts, and full diff. No browser runtime — all checks were code-level (grep, file-read, git diff). Three IG-11 greps run directly. Heading hierarchy and nav structure verified by extracting HTML sections programmatically. Pre-existing `M&A` escape gap discovered by comparing against `git show main:services/tech-advisory.html` rather than assuming it was in-scope for SPEC-006. |

### QA Gate Approval

**Decision:** Approved
**Approved by:** Rob Parker
**Date:** 2026-04-20
