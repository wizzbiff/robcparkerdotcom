# SPEC-012: Credibility Signals — Testimonials, Logos, Education

**Status:** Spec Gate approved 2026-04-26
**Tier:** Standard
**Author:** PM-Spec Agent (derived from `robcparker_com_audit.md` action #3, audit lines 296-301)
**Date:** 2026-04-25 (Spec Gate approved 2026-04-26)
**Branch:** `spec/SPEC-012-credibility-signals` (to be created at implementation start)

---

## Summary

Add three credibility signals identified by the audit as the largest gap between source-material credibility and what the site currently surfaces:

1. **Testimonials block** on the Home page drawn from 2-3 LinkedIn recommendations with full attribution (name, title at time, company).
2. **"Where I've Built" company logo strip** on the home page — seven logos in reverse-chronological order (SugarCRM → Salesfusion → athenahealth → M2SYS → Qcept → Radiant Systems → Cisco).
3. **Education credentials line** added to the About page bio as a standalone line: "MS Computer Science, Georgia Tech. BS, Clemson University."

Each item is independently scoped. Logo monochrome treatment vs. shipping color JPEGs as-provided is deferred to `ui-designer` + `graphic-artist` at Arch Review (source assets are color JPEGs at project root).

A fourth signal — GitHub link on the Contact page — was scoped at draft but deferred at Spec Gate to a follow-on spec; tracked in `specs/backlog.md`.

## Context

The audit (`robcparker_com_audit.md` Dimension 7, lines 219-244) identifies trust-and-credibility as "the dimension with the largest gap between what's available and what's surfaced." LinkedIn has substantive recommendations from former colleagues at Salesfusion, Qcept, and earlier roles. None are on the site. The career path (SugarCRM, Salesfusion, athenahealth, M2SYS, Qcept, Radiant Systems, Cisco) is impressive at a glance but the site forces a recruiter to read body copy to absorb it.

Education sits on the resume but not on About — the audit notes this is "table-stakes for an executive site." GitHub, even if sparse, signals proximity to the actual work.

This spec is the second-largest content addition after SPEC-005. Unlike SPEC-005, it does not invent any service offerings or take positioning risk — every signal is grounded in already-public material (LinkedIn recommendations, real employment history, an existing degree, an existing GitHub profile).

Per project memory `project_advisory_deferrals.md`, *advisory* testimonials remain deferred. SPEC-012 testimonials are general-leadership testimonials sourced from LinkedIn recommendations, not from advisory clients.

## Decision Rationale

- **Why testimonials are highest leverage:** the audit (line 224) calls testimonials "the single highest leverage credibility add available to you, and the source material already exists." A recommender with name, title, and company at time of writing converts a self-claim ("I scaled the team 150%") into third-party-validated credibility. The cost is selection time, not creation time.
- **Why logos:** Cisco, athenahealth, and SugarCRM logos signal depth at a glance to a recruiter. Body copy doesn't. Logos are visual, fast, and credible because they reference real employment that's already public on LinkedIn and the resume.
- **Why education on About specifically:** the resume already has it, but the About page is the page a recruiter scans for "who is this person at a glance." Georgia Tech MS + Clemson BS is genuinely strong and adds <1 line of copy to surface.
- **Why GitHub deferred (Spec Gate decision):** Rob's GitHub profile is not currently in a state he wants linked from a Director/VP candidate site. R4 was scoped at draft but moved to `specs/backlog.md` for a future trivial spec when the profile is ready. The audit's recommendation stands; the deferral is about asset readiness, not value.
- **Why scope tight (no Notes/Writing section, no headshot refresh):** the audit lists those as "Important" but not in the top five. SPEC-012 absorbs only the audit's action #3 credibility items that are ready to ship. The Notes/Writing section is a future trivial spec; the headshot is an operator todo (acquiring the asset is out of repo).
- **Why Home for testimonials:** audit suggested either Home or About; Home wins on recruiter-first-impression value. The executive credibility moment happens on Home — testimonials within the first scroll give a recruiter a third-party voice fast. About already carries the personal narrative.
- **Why seven logos including Q-Cept and Radiant Systems:** Rob's career arc actually includes both. The original audit/draft listed six (omitting Radiant Systems); Spec Gate confirmed Radiant Systems belongs and Q-Cept assets are now available. `ui-designer` calibrates the row layout for seven items at Arch Review.
- **Why logo treatment is deferred to Arch Review:** source assets are color JPEGs (~2-6 KB each) at project root. The spec recommends monochrome for "accent rather than competing with body type," but achieving clean monochrome from JPEG sources requires `graphic-artist` work (vector recreation or careful raster treatment). Letting `ui-designer` and `graphic-artist` decide with the actual files in front of them is more responsive than locking in a treatment now.
- **Trade-off accepted:** the spec ships R1+R2+R3 together; if logo treatment proves more involved than expected at Arch Review, R2 can defer without blocking R1/R3.
- **Reversibility:** all three are additive. Removing any one is a clean diff revert.

## Requirements

### R1: Testimonials block

**Placement:** Home page (Spec Gate confirmed). The block sits between the experience-highlights band and the about-teaser block.

**Content:** 2-3 LinkedIn recommendations.

- Source: LinkedIn recommendations on Rob's profile. The PDF at `files/LinkedInProfile.pdf` does NOT include the recommendations text — Rob extracts them from the live LinkedIn UI and provides to `marketing-copywriter` at implementation. Audit line 224 calls out two specific recommendations worth surfacing: "one explicitly about your architecture judgment and another about your ability to lead through legacy refactoring" — Rob picks the final 2-3.
- Attribution format: full name, title at time of writing, company at time of writing. Format example: *"— Jane Doe, VP of Product, Salesfusion (2017)"* or equivalent. The "at time of writing" framing is non-negotiable per audit line 225 — a 2017 title accurately reflects the recommendation context.
- Length: short pull quotes (1-3 sentences each). NOT full multi-paragraph LinkedIn recommendations — those are too long for site rhythm. Marketing-copywriter selects the most quotable sentence(s) from each recommendation, with light editing for fit (no fabricated content; the quoted sentences are verbatim or the verbatim text trimmed at clause boundaries).

**Markup pattern (recommended):** semantic `<blockquote>` per testimonial with a `<footer>` for attribution. Same pattern as the existing `.philosophy-quote` at `about.html:130-135`. Possible new class `.testimonials-grid` if multiple cards; `architect-reviewer` confirms whether to extend an existing primitive or introduce a new one.

```html
<section class="section section-alt" aria-labelledby="testimonials-heading">
    <div class="container">
        <div class="section-header">
            <h2 id="testimonials-heading">{copy from R1a}</h2>
        </div>
        <div class="testimonials-grid">
            <blockquote class="testimonial">
                <p>"{quote}"</p>
                <footer>— {Name}, {Title}, {Company} ({Year})</footer>
            </blockquote>
            <!-- 1-2 more -->
        </div>
    </div>
</section>
```

Band-alt assignment for the testimonials section is deferred to `ui-designer` at Arch Review (visual rhythm: hero → highlights-grid → testimonials → logo strip → about-teaser → cta-dark must respect SPEC-008/009 R3.4 "at most one alternating band per page" rule).

**Content readiness confirmed at Spec Gate:** Rob will provide the 2-3 selected LinkedIn recommendations to `marketing-copywriter` at implementation time.

### R2: "Where I've Built" company logo strip

**Placement:** Home page, between the experience-highlights band and the testimonials block.

**Content:** seven company logos in a single horizontal row (responsive layout TBD by `ui-designer` at Arch Review — likely 7 columns at desktop reflowing to 3-4 at tablet and 2 at mobile). Companies, in **reverse-chronological order** (Spec Gate Q6 default — most recent first reads as "most relevant now"):

1. SugarCRM
2. Salesfusion
3. athenahealth
4. M2SYS
5. Q-Cept
6. Radiant Systems
7. Cisco

**Source assets at project root** (provided by Rob; pre-implementation housekeeping moves these to `images/source/logos/` per CLAUDE.md image convention):

- `sugarcrm_logo.jpeg` (color JPEG, ~2.2 KB)
- `salesfusion_logo.jpeg` (color JPEG, ~2.9 KB)
- `athenahealth_logo.jpeg` (color JPEG, ~2.4 KB)
- `m2sys.jpeg` (color JPEG, ~2.4 KB)
- `Q-Cept_logo` (color JPEG, no extension, 250×100, ~5.8 KB) — implementer renames to `q-cept_logo.jpeg`
- `radiant_systems.jpeg` (color JPEG, ~2.8 KB)
- `cisco_logo.jpeg` (color JPEG, ~2.2 KB)

**Asset treatment — deferred to Arch Review.** Source assets are color JPEGs. The audit recommends monochrome treatment ("row reads as accent rather than competing with body type"). Achieving clean monochrome from raster JPEG sources is non-trivial. `ui-designer` and `graphic-artist` decide at Arch Review:

- **Option A — Ship color as-is.** Fastest. Visual impact uncertain at this size; logos may compete with body type.
- **Option B — Vector recreation to monochrome SVG by `graphic-artist`.** Cleanest result; multi-hour work per logo (~half-day total).
- **Option C — Raster monochrome treatment (CSS filter, blend mode, or `<canvas>`-baked PNG export).** Mid-effort; quality varies per source.

**Final output target:** `images/logos/{company}.{ext}` (committed, web-optimized). Source originals stay in `images/source/logos/` (gitignored).

**Markup pattern (treatment-agnostic):**
```html
<section class="section" aria-labelledby="logos-heading">
    <div class="container">
        <h2 id="logos-heading" class="section-heading-standalone">Where I've Built</h2>
        <ul class="logos-strip" role="list">
            <li><img src="images/logos/sugarcrm.{ext}" alt="SugarCRM" class="logo-mono"></li>
            <li><img src="images/logos/salesfusion.{ext}" alt="Salesfusion" class="logo-mono"></li>
            <li><img src="images/logos/athenahealth.{ext}" alt="athenahealth" class="logo-mono"></li>
            <li><img src="images/logos/m2sys.{ext}" alt="M2SYS" class="logo-mono"></li>
            <li><img src="images/logos/q-cept.{ext}" alt="Q-Cept" class="logo-mono"></li>
            <li><img src="images/logos/radiant-systems.{ext}" alt="Radiant Systems" class="logo-mono"></li>
            <li><img src="images/logos/cisco.{ext}" alt="Cisco" class="logo-mono"></li>
        </ul>
    </div>
</section>
```

Each logo's `alt` text is the company name in full official capitalization (note `athenahealth` lowercase per SPEC-010 R6). Alt text is the only signal screen readers use — the logo strip is decorative but carries credibility signal via alt.

The new CSS class `.logos-strip` (ul, list-style:none, flex/grid, responsive wrap) is the new primitive. `.logo-mono` applies the chosen monochrome treatment if applicable; otherwise sizing-only. `architect-reviewer` confirms approach at Arch Review.

**R2 deferral path:** if at Arch Review the treatment options all prove more involved than expected, R2 may defer to a follow-on spec; R1 and R3 ship without R2.

### R3: Education credentials line on About

**File:** `about.html`
**Location:** standalone single-line `<p>` block immediately following the third bio paragraph at `about.html:113` (Spec Gate Q3 default — visually crisper; explicitly readable as a credential statement rather than buried in prose).

**Exact copy:** `MS Computer Science, Georgia Tech. BS, Clemson University.`

**Markup constraint:** plain text in a standalone `<p>` reusing `.hero-bio p` styling (no new class).

### R4: ~~GitHub link on Contact page~~ — DEFERRED at Spec Gate

R4 was scoped at draft to add a GitHub link to the Contact alternate-channels list. Spec Gate deferred this to a follow-on spec (Rob's GitHub profile is not currently in a state he wants linked from a Director/VP candidate site). Captured in `specs/backlog.md` for promotion when the profile is ready.

### R5: SEO non-impact verification

The three additions in R1-R3 introduce new visible text (testimonial quotes, attribution, education line). `<title>`, meta description, OG tags, canonical are NOT changed by SPEC-012. SPEC-013 owns SEO upgrades.

**Constraint:** SPEC-012 must NOT introduce JSON-LD. SPEC-013 owns Person schema (with `sameAs` array including LinkedIn and possibly GitHub). Adding partial schema here would conflict with SPEC-013's structured-data definition.

## Content Requirements

`marketing-copywriter` is invoked at implementation for:

### R1a — Testimonials section heading

**Recommended H2 (Home placement):** *"What Former Colleagues Say"*

**Alternative:** *"Recommendations from Engineering Leaders Rob Has Worked With"* (longer, more specific)

**Why recommended:** "What Former Colleagues Say" is the lightest, most natural framing. It signals the source (former colleagues, not paid testimonials, not advisory clients) without overstating. The alternative is more SEO-keyword-loaded but reads heavier.

For About-page placement, the H2 may shift to *"What Colleagues Say About Working With Rob"* (third-person, since About is third-person).

### R1b — Testimonial quote selection

Marketing-copywriter receives the LinkedIn recommendations (provided by Rob at implementation), the SPEC-005 recommendation about advisory testimonials still being deferred, and the audit's specific call-out about architecture-judgment and legacy-refactoring recommendations. Output:
- 2-3 quote selections, each 1-3 sentences, verbatim from the LinkedIn source (or trimmed at natural clause boundaries — no editorial rewriting)
- Full attribution per recommendation
- Recommendation on placement order (most recent first vs. most relevant first)

### R2a — Logo-strip H2 copy

**Recommended:** *"Where I've Built"* (matches audit phrasing exactly).

**Alternative:** *"Engineering Leadership Across:"* (header reads as label, not section title) — softer.

Recommended is direct and confident; matches the rest of the site's voice.

## Out of Scope

- GitHub link on Contact page (deferred at Spec Gate; tracked in `specs/backlog.md`)
- Notes / Writing section (audit Dimension 7, line 233 — deferred to future spec)
- New headshot photography (operator todo per `OPERATOR-TODOS.md`)
- Hero visual treatment (audit Dimension 1, lines 36-38 — recommended a single visual element in hero; deferred to future trivial spec)
- Advisory client testimonials (still deferred per `project_advisory_deferrals.md`)
- JSON-LD or Person schema (SPEC-013 owns)
- Updates to `files/LinkedInProfile.pdf` (operator-side)
- Logo strip on any page other than Home

## Dependencies

- **SPEC-007 (complete):** favicon and brand-mark work — SPEC-012 logos are different assets (third-party brands, not Rob's mark).
- **SPEC-008 / SPEC-009 (complete):** design language and tokens — SPEC-012 reuses `--color-cream`, `--color-text-muted`, `--color-magenta` (sparingly), `.section`, `.section-alt`, `.section-header`, `.section-heading-standalone`, `.philosophy-quote`-style blockquote pattern, and `.alt-channels-list`.
- **SPEC-011 (recommended-pending):** if SPEC-011 ships first, the home-page composition for SPEC-012's R1 (Home testimonials) and R2 (logo strip) needs to fit alongside SPEC-011's full-time-search section. Recommend SPEC-011 ships before SPEC-012 to settle the home-page rhythm.
- **No external integrations.** No third-party services touched.

## Non-Functional Requirements

### Accessibility

- Testimonial blockquote uses semantic `<blockquote>` + `<footer>` for attribution, matching `.philosophy-quote` precedent at `about.html:130-135`. Screen readers announce the quote and the source coherently.
- Logo strip uses `<ul role="list">` (matching existing list-semantics pattern across the site, see `index.html:61` WHY comment about Safari/VoiceOver). Each logo `<img>` carries the company name as `alt` text.
- Education line is plain prose — no special ARIA needed.
- Color contrast on logos (if monochrome treatment is chosen at Arch Review): a logo set to `var(--color-text-muted)` on `--color-cream` measures 6.54:1 (per SPEC-009 D4 contrast block) — passes AA for non-text UI 3:1 with significant margin. WCAG 1.4.11 satisfied. If color treatment is chosen, contrast against background must still be verified per logo at QA Gate.

### SEO

- New visible text on testimonials, logos, education adds keyword surface — secondary benefit. Primary SEO work in SPEC-013.
- Logo `alt` text gives crawlers the company-name signal independent of any (future) JSON-LD.

### Performance

- 7 logos × ~2-6 KB JPEG source = 16-40 KB raw. If treated to monochrome SVG output the inline cost becomes negligible; if shipped as raster the total stays under the SPEC-008 image-budget headroom.
- New testimonial section adds DOM nodes; rendering cost is trivial.
- No new fonts, no new JS, no new third-party scripts.

### Responsive

- Logo strip: 7 columns at desktop, reflowing to 3-4 at tablet and 2 at mobile. `ui-designer` confirms exact breakpoints at Arch Review.
- Testimonials grid: 1-3 columns depending on count and viewport. `ui-designer` calibrates.
- Education line: inherits `.hero-bio p` (or equivalent) responsive treatment.

## Acceptance Criteria

### R1 — Testimonials

- **Given** the testimonials section is rendered, **When** the user reads it, **Then** 2-3 testimonials are present, each with a quote and an attribution line containing name, title-at-time, and company-at-time.
- **Given** each attribution line, **When** parsed, **Then** the format is consistent across all testimonials (e.g., "— {Name}, {Title}, {Company} ({Year})" — exact format set at copywriter pass).
- **Given** the audit specifically asks for an architecture-judgment testimonial and a legacy-refactoring testimonial (line 224), **When** the final selection is reviewed, **Then** at least one of those themes is represented (Rob's selection — flag at QA Gate if neither is included).
- **Given** screen reader traversal, **When** the user lands on a testimonial, **Then** the quote and attribution are announced as a coherent unit (semantic `<blockquote>` + `<footer>` carries this naturally).

### R2 — Logo strip

- **Given** the home page is rendered, **When** the logo strip section displays, **Then** seven logos are visible in reverse-chronological order: SugarCRM → Salesfusion → athenahealth → M2SYS → Q-Cept → Radiant Systems → Cisco.
- **Given** the chosen treatment (color or monochrome, per Arch Review), **When** the strip is viewed against the surrounding sections, **Then** the logos read as a credibility accent and do not visually compete with body type.
- **Given** screen reader traversal, **When** the user lands on the logo strip, **Then** each logo is announced as the company name via `alt` text.
- **Given** the responsive viewport, **When** the page is resized from desktop to mobile, **Then** the strip reflows without breaking (no logos cut off, no horizontal scroll, no overlap).
- **Given** any logo asset is missing or fails to load, **When** the page renders, **Then** the `alt` text displays gracefully (no broken-image icon disrupting the row's rhythm).

### R3 — Education line

- **Given** the About page is rendered, **When** the user scrolls through the hero bio, **Then** the education credentials are visible as a standalone single-line `<p>` block: "MS Computer Science, Georgia Tech. BS, Clemson University." (exact phrasing).
- **Given** the placement, **When** compared to the bio block, **Then** the line sits immediately after the third bio paragraph at `about.html:113`.

### Cross-cutting

- **Given** all three R1-R3 changes ship, **When** the site is read end-to-end, **Then** there is no copy contradiction with SPEC-005 (advisory framing), SPEC-010 (resume reconciliation), or SPEC-011 (advisory off main path).
- **Given** the changes ship, **When** SEO is inspected, **Then** no `<meta>`, `<title>`, OG tag, or JSON-LD has been modified (SPEC-013 owns those).

## Tier Selection — Standard

**Tier:** Standard. Per `governance/tier-selection-guidelines.md`:

| Trigger | Applies? | Notes |
|---------|----------|-------|
| Authentication / authorization changes | No | None |
| Payment or financial data | No | None |
| PII / PHI handling | No | None — testimonials are public-on-LinkedIn quotes; no PII collected |
| New external API integration | No | None |
| Database schema change | No | None |
| Core domain model modification | No | Content additions |
| Framework or platform migration | No | None |
| First implementation of new architectural pattern | No | One new CSS class (`.testimonials-grid`, `.logos-strip`, `.logo-mono`) — additive primitives, not architectural |

**Decision flow:**
1. Does it change any code paths? Yes — HTML on home and about (contact untouched after R4 deferral).
2. Does it follow existing patterns? Yes — `<blockquote>` extends `.philosophy-quote` pattern; logo strip is a new but conventional pattern; education line is plain text.
3. Does it affect multiple components or introduce new patterns? Multiple components yes; new patterns are additive (logo strip), not architectural. Standard.

**Tier rationale:** Standard. Touches two pages (home, about). Introduces one new design primitive (logo strip) with one new CSS class. `ui-designer` review at Arch Review for placement, breakpoint, and logo-treatment decisions. `graphic-artist` may be invoked at implementation if monochrome conversion is chosen. Marketing-copywriter pass for testimonial selection and attribution polish.

## Open Questions — Spec Gate resolutions

All questions resolved at Spec Gate on 2026-04-26.

| # | Question | Resolution |
|---|----------|------------|
| Q1 | **Testimonials placement: Home or About?** | **Home** (default). Highest leverage for executive credibility — third-party voice within the first scroll. R1 reflects this. |
| Q2 | **Which 2-3 LinkedIn recommendations?** | **Rob will have selections ready at implementation.** Confirmed at Spec Gate; R1 ships in this spec rather than deferring. Marketing-copywriter selects the most quotable sentences from Rob's chosen recommendations. |
| Q3 | **Education line placement: inline vs. standalone single line?** | **Standalone single line** (default) below the third bio paragraph at `about.html:113`. R3 reflects this. |
| Q4 | **GitHub URL.** | **R4 deferred** to a follow-on spec. Rob's GitHub profile is not currently in a state he wants linked from a Director/VP candidate site. Captured in `specs/backlog.md`. |
| Q5 | **Logo asset sourcing.** | **Confirmed available.** Seven color JPEGs at project root provided by Rob (SugarCRM, Salesfusion, athenahealth, M2SYS, Q-Cept, Radiant Systems, Cisco). Treatment decision (color vs. monochrome conversion) deferred to `ui-designer` + `graphic-artist` at Arch Review — see R2. |
| Q6 | **Logo strip order: chronological vs. reverse-chronological?** | **Reverse-chronological** (default) — SugarCRM first → Cisco last. R2 reflects this. |
| Q7 | **Testimonial-block band (alt vs. non-alt) given SPEC-008/009 R3.4 rule.** | **Deferred to `ui-designer` at Arch Review.** With SPEC-011 home-page changes plus testimonials + seven-logo strip, full-page band rhythm needs per-page calibration. R1 reflects this. |
| Q8 | **Defer testimonials entirely?** | **No** — Rob confirmed selections will be ready (Q2). R1 ships in this spec. |

### Spec Gate also surfaced:
- **Logo set discrepancy** — original audit/draft listed six logos (omitted Radiant Systems). Spec Gate confirmed Radiant Systems belongs and Q-Cept is sourceable. R2 now lists seven companies.
- **Logo file naming** — `Q-Cept_logo` is missing a file extension at project root; implementer renames to `q-cept_logo.jpeg` during the housekeeping move to `images/source/logos/`.
- **R4 deferral promotion** — GitHub link added to `specs/backlog.md` for a future trivial spec.

## Effort Comparison

| | AI-Assisted | Human Solo |
|---|---|---|
| Spec creation | ~55 minutes wall-clock (audit pre-read; reviewing LinkedIn PDF for recommendation availability — confirmed not present in PDF; cross-walking the four signals against current site state across home/about/contact; markup pattern decisions; tier checklist) | 5–7 hours (PM would: research testimonial conventions, identify LinkedIn recommendations from outside the PDF source, decide markup patterns for two new design primitives, draft AC for asset-deferral cases, surface dependency on Rob's content selection, sequential and content-heavy) |
| Assumptions | LinkedIn recommendations are accessible to Rob at implementation and not in the PDF artifact. Logos sourceable to monochrome assets within reasonable effort. SPEC-008/009 design tokens stable. SPEC-011 ships before or in parallel and the home-rhythm conflict is resolved by `ui-designer` at Arch Review. |

---

## Spec-Gate Approval

**Decision:** Approved 2026-04-26
**Gate owner:** Rob Parker
**Approval note:** R1 (testimonials, Home), R2 (seven-logo strip — treatment TBD at Arch Review), R3 (standalone education line) ship in this spec. R4 (GitHub link) deferred to `specs/backlog.md`. All Q1–Q8 resolved above.

### Structured Review Checklist

- [x] Business intent confirmed (audit-derived three credibility signals; R4 deferred)
- [x] Scope boundaries clear (Notes/Writing, headshot, hero visual all out of scope; advisory testimonials still deferred; GitHub deferred)
- [x] Acceptance criteria testable (Given/When/Then; per-item ACs; cross-cutting consistency check)
- [x] Dependencies identified (SPEC-007 / SPEC-008 / SPEC-009; SPEC-011 recommended ships first)
- [x] Tier appropriate (Standard — multi-page additions, two new CSS primitives, marketing-copywriter pass, possible graphic-artist pass for logo treatment)
- [x] No mandatory escalation triggers (no auth, payments, PII, integrations, DB, framework)
- [x] Third-party features verified (none — all assets self-hosted)
- [x] Decision Rationale section included
- [x] Logo assets confirmed at project root (seven color JPEGs; treatment deferred to Arch Review)
- [x] LinkedIn recommendations confirmed available at implementation (Rob's selections)

---

## Architecture Review

**Reviewer:** architect-reviewer agent (specialist) via sdd/architect-review pipeline agent
**Specialist invocations:** architect-reviewer, ui-designer, graphic-artist
**Date:** 2026-05-01
**Recommendation:** Approve with conditions (14 IG items + 2 AG decisions)
**Pen-tester:** Not invoked. Standard tier; no auth/payment/PII/external-API/integration surface; logos are committed static assets, testimonials are static text authored by Rob and reviewed by marketing-copywriter, education line is plain prose. Attack surface unchanged from current state. (Pen-tester reserved for SPEC-014 contact-form intent routing and any future spec touching forms, auth, or external integrations.)

### Validation summary

- **Tier confirmation:** Standard is correct. Additive content, two new CSS primitives (`.testimonials-grid` / `.testimonial` and `.logos-strip` / `.logo-mono`), zero JS changes, zero external integrations, no auth/PII/payment/DB/framework surface. Tier-selection table at spec lines 261-269 verified.
- **Patterns upheld:** `<blockquote>` + `<footer>` semantic pattern matches `.philosophy-quote` precedent at `about.html:129-134`. `role="list"` on `<ul>` matches the documented Safari/VoiceOver fix at `index.html:59-61`. Reuse of `.section`, `.section-alt`, `.section-header`, `.section-heading-standalone`, `.hero-bio` confirmed against `css/style.css` (lines 822-846, 1352, 109-114).
- **Citations corrected:** spec references `about.html:130-135` for `.philosophy-quote`. Actual range is `129-134`. Spec references `about.html:113` as the R3 insertion line; that is the closing `</div>` of `.hero-bio`, with the third bio paragraph at line 112. R3 inserts a new `<p>` *inside* `.hero-bio` immediately after line 112 (so the new line lands at what is currently 113, pushing the closing `</div>` to 114). See IG-1 / IG-2.
- **SPEC-011 placement collision is real.** `index.html:151-162` is the post-merge "Open to Senior Engineering Leadership Roles" CTA shipped by SPEC-011 on 2026-05-01. SPEC-012 was authored 2026-04-25 before SPEC-011 shipped, so R1's "between experience-highlights and about-teaser" and R2's "between experience-highlights and the testimonials block" do not account for the SPEC-011 section now occupying that gap. AG-1 surfaces the resolution.
- **JS impact: zero.** `js/main.js` selectors (`.nav-toggle`, `.nav-links`, `.site-header`, `.contact-form`, `[data-user][data-domain]`) do not collide with any new SPEC-012 markup. No `js/main.js` edit required.
- **No new design tokens.** All proposed work composes from existing tokens (`--color-cream`, `--color-text-muted`, `--color-magenta`, `--surface-color`, `--space-*`, `--font-size-*`, `--color-surface-elevated`, `--color-border-hairline`). Three new CSS class names are introduced; no new variables.
- **Q7 (band assignment) closed at this gate.** `ui-designer` calibration: logos section is `class="section"` (cream), testimonials section is `class="section section-alt"` — preserves the alt → cream → alt → cream → alt → dark rhythm across the now-six-section home page. SPEC-008/009 R3.4 "at most one alternating band" sensibility honored.
- **Logo treatment Option C ruled out by file inspection.** `graphic-artist` inspected the seven source JPEGs: backgrounds split between dark-fill (Cisco navy, SugarCRM forest green, Radiant Systems navy) and white-fill (athenahealth, M2SYS, Salesfusion). No CSS filter combination produces a unified monochrome strip from sources with inconsistent baked-in backgrounds. AG-2 surfaces Options A, B, and D.
- **Gitignore coverage verified.** `.gitignore:3` already covers `images/source/` recursively, so `images/source/logos/` requires no new ignore rule. No tracked files exist under any `images/source/` path today.
- **R5 SEO non-impact verified.** Spec forbids JSON-LD (SPEC-013 owns Person schema); IG-4 makes the prohibition gating to prevent accidental schema.org/Review markup leaking via copy-paste from a testimonial pattern reference.

### Implementation Guidance

| ID | Item |
|---|---|
| IG-1 | **Citation fix.** Spec lines 58, 207, 249 reference `about.html:130-135`. Actual `.philosophy-quote` block range is `about.html:129-134`. Implementer treats `129-134` as authoritative. |
| IG-2 | **R3 placement precision.** Insert the education `<p>` *inside* `.hero-bio` immediately after the third paragraph at `about.html:112` (so the new line lands at current 113, pushing `</div>` to 114). Do NOT place outside the `.hero-bio` div — that breaks the inherited `.hero-bio p` styling guarantee the spec relies on. |
| IG-3 | **`<cite>` for testimonial speaker name.** Extend the `.philosophy-quote` precedent at `about.html:132` and `style.css:1176`. Footer becomes `<footer>— <cite>{Name}</cite>, {Title}, {Company} ({Year})</footer>`. Add a scoped rule `.testimonial cite { font-style: normal; font-weight: var(--font-weight-semibold); }` mirroring the existing `.philosophy-quote blockquote cite` styling (do NOT extract a shared selector — keep `.philosophy-quote` rules untouched). |
| IG-4 | **JSON-LD prohibition (R5).** No `application/ld+json` script tag, no `itemtype="https://schema.org/Review"` or `itemtype="https://schema.org/Person"`, no microdata `itemprop` attributes anywhere in R1/R2/R3 markup. SPEC-013 owns Person schema; partial Review schema here forces a refactor at SPEC-013 implementation. QA Gate greps for `ld+json`, `itemtype`, `itemprop` as a hard stop. |
| IG-5 | **`<ul role="list">` semantics on `.logos-strip`.** Mandatory, not optional. `list-style: none` on `.logos-strip` triggers the Safari/VoiceOver list-semantics strip; `role="list"` restores it. Add an HTML `<!-- WHY: -->` comment matching the precedent at `index.html:59-60` so the next maintainer does not strip it as redundant. |
| IG-6 | **`.testimonials-grid` is a NEW primitive, not an extension of `.philosophy-quote`.** `.philosophy-quote` is full-width single-quote with a magenta left-border and surface-elevated bg; testimonials are a multi-card grid with different layout requirements. Introduce `.testimonials-grid` (container) and `.testimonial` (card). The `.testimonial` card may borrow `.philosophy-quote`'s typographic feel (italic blockquote `<p>`, semibold cite, normal-weight `<footer>`) but must NOT inherit the full-width-with-magenta-border treatment. See IG-13 for chrome composition. |
| IG-7 | **Logo asset housekeeping.** Pre-implementation: move the seven JPEGs from project root to `images/source/logos/` (already gitignored via `.gitignore:3`); rename `Q-Cept_logo` (no extension) to `q-cept_logo.jpeg`. Verify with `git ls-files images/source/logos/` returning empty before any commit. Optimized outputs land at `images/logos/{company}.jpg` (committed). |
| IG-8 | **Stack-quirks gap is covered by AG-2 = A.** Existing Pillow recipe at `governance/stack-quirks.md:42-69` is JPEG resize + EXIF strip + progressive only, with no monochrome / SVG capability. Option A (resize-only color JPEGs) fits within the existing recipe. If Rob resolves AG-2 to ship Option B (SVG) or D (background-removed PNG with alpha), the corresponding follow-on spec MUST add a new stack-quirks entry covering the new asset class and tooling. SPEC-012 itself ships within current capability. |
| IG-9 | **Logo `<img>` dimensions.** Every `<img class="logo-mono">` carries explicit `width` and `height` attributes (or CSS `aspect-ratio`) to prevent CLS. Six 1:1 logos at display height 48px → `width=48 height=48`; Q-Cept at 2.5:1 → `width=120 height=48`. SPEC-008 image-budget compliance and Lighthouse CLS score depend on this. |
| IG-10 | **Section ordering hardcoded per AG-1 resolution.** Implementer follows the exact final order (post-AG-1): hero → highlights (`section-alt`) → **logos (`section`)** → **testimonials (`section-alt`)** → "Open to Senior" (`section`) → about-teaser (`section-alt`) → contact CTA (`section-dark`). Both new sections insert *between* the existing highlights band (`index.html:103-149`) and the existing "Open to Senior" CTA (`index.html:151-162`). |
| IG-11 | **`.logos-strip` CSS — Option A treatment, sizing-only.** Use `ui-designer`'s flex-based recommendation (mobile-first wrap → tablet 4-up via `flex-basis: calc(25% - var(--space-8))` → desktop 7-up via `flex: 1 1 0; max-width: 140px`); `max-height: 48px; width: auto; object-fit: contain` on the `<img>`. **AMENDMENT to ui-designer's draft CSS:** do NOT apply `filter: grayscale(100%)` to `.logo-mono` — `graphic-artist` confirmed by file inspection that the seven sources have inconsistent baked-in backgrounds (dark-fill on Cisco/SugarCRM/Radiant Systems, white-fill on athenahealth/M2SYS/Salesfusion) which a CSS grayscale filter cannot reconcile (Option C is a failure mode). `.logo-mono` ships as a sizing-only class in SPEC-012 and serves as a placeholder class name reserved for future monochrome treatment polish (see follow-on spec note in AG-2). Add a CSS `// WHY:` comment explaining the deferred filter. |
| IG-12 | **`.testimonials-grid` CSS — count-conditional column count at desktop.** Mobile-first single column → `repeat(2, 1fr)` at `min-width: 768px` → `repeat(2, 1fr)` or `repeat(3, 1fr)` at `min-width: 1024px` depending on whether Rob selects 2 or 3 testimonials at implementation. Implementer reads Rob's count and sets the desktop column count accordingly. Mirrors the `.highlights-grid` breakpoint pattern at `style.css:1658, 1737`. |
| IG-13 | **`.testimonial` card chrome reuses existing tokens.** `background-color: var(--color-surface-elevated); border: 1px solid var(--color-border-hairline); border-radius: var(--border-radius-sm); padding: var(--space-8);` — mirrors the `.highlight-card` chrome at `style.css:871` *by token reference, not by class extension* (because `<blockquote>` is the testimonial root element, not `<article>`). Typography: italic on blockquote `<p>` (per `.philosophy-quote blockquote p` at `style.css:1161-1167`), normal-weight `<footer>`, semibold `<cite>` per IG-3. |
| IG-14 | **Pillow logo optimization recipe.** Uniform display height 80px (1x) and 160px (2x) for retina; resize via existing Pillow recipe at `governance/stack-quirks.md:42-69` (`Image.open(src).convert("RGB").resize((w, h), Image.LANCZOS).save(dst, "JPEG", quality=82, progressive=True, optimize=True)`); preserve aspect ratio (Q-Cept 2.5:1 outputs at 200×80 / 400×160; six others at 80×80 / 160×160). Commit each output to `images/logos/{company}.jpg`. Verify each output file < 30 KB; flag any that exceed for `graphic-artist` review at QA. |

### Arch Gate Decisions Required (Rob)

| ID | Decision | Options | Recommendation |
|---|---|---|---|
| AG-1 | **R1/R2 placement relative to SPEC-011 "Open to Senior" CTA.** SPEC-012 was authored before SPEC-011 shipped; the spec's R1/R2 placement language describes a gap that no longer exists. Where do testimonials and logos sit on the home page after both ship? | (a) **logos → testimonials → SPEC-011 CTA → about-teaser** (variant α). Credibility builds *before* the role-pitch CTA. (b) SPEC-011 CTA → logos → testimonials → about-teaser (variant γ). CTA lands first, credibility reinforces beneath. (c) testimonials → SPEC-011 CTA → logos (variant δ-ish). Splits credibility around the CTA. | **(a) — variant α.** `architect-reviewer` and `ui-designer` independently arrived at this ordering. Narrative arc: hero (positioning) → highlights-alt (numeric proof) → logos-cream (career breadth at a glance) → testimonials-alt (third-party voice) → "Open to Senior"-cream (the ask, after evidence) → about-teaser-alt → contact CTA. Band rhythm: alt → cream → alt → cream → alt → dark, no consecutive same-band repetition. Recruiter scan path reads as proof-then-ask, not ask-then-proof. |
| AG-2 | **Logo treatment — which option ships in SPEC-012?** Option C (CSS grayscale filter) is ruled out by `graphic-artist` file inspection (seven sources have inconsistent baked-in backgrounds; CSS filter cannot reconcile). Three remaining options, with full effort/risk profile from `graphic-artist`: | (a) **Option A — color JPEGs as-is, resized.** ~30 min effort. Visual quality: low at strip scale (seven competing brand palettes, dark-fill vs. white-fill seam artifacts visible against cream). (b) **Option B — vector SVG recreation, monochrome.** 3-5 hours effort. Visual quality: high (cohesive editorial strip). Risks: trademark/brand-guideline territory (most companies' guidelines forbid logo modification); introduces SVG as a new third-party-asset class to the site. (c) **Option D — Pillow flood-fill background removal + grayscale + PNG-with-alpha.** 1.5-2.5 hours effort. Visual quality: medium-high. Lower IP risk than B (desaturation is a less aggressive modification than full vectorization). Requires ~40-60 lines of new Pillow code (flood-fill is not in the current recipe). | **Hybrid — Ship Option A in SPEC-012; defer Option D to a follow-on trivial spec ("logo-strip polish")** before site go-live. Rationale: site is not yet live (per `project_deployment_deferred.md`), so first-impression risk is managed. Option A ships the credibility *signal* (company names visible, alt text correct, strip recognizable) — that is R2's purpose. Option B's IP exposure should be a conscious gate decision, not a side-effect of an implementation sprint. Option D is the right *visual* end state but warrants its own spec because it requires new tooling. The follow-on spec also re-evaluates IP texture for desaturation specifically (less aggressive than B but not zero). `.logo-mono` is established now as a placeholder class to keep the markup unchanged across the future polish. **If Rob disagrees and prefers to ship Option D in SPEC-012 directly, the implementation window grows by 1.5-2.5 hours and a stack-quirks entry must be added per IG-8.** |

### Closed at this Gate (no AG required)

- **Q7 — Band assignment for new sections.** `ui-designer`: logos = `section` (cream), testimonials = `section section-alt`. Preserves alt → cream → alt → cream → alt → dark rhythm.
- **`.logos-strip` primitive design.** `ui-designer` Deliverable 2: flex-based with mobile-first wrap, `max-height: 48px`, `object-fit: contain`. CSS captured as IG-11.
- **`.testimonials-grid` primitive design.** `ui-designer` Deliverable 3: 1col → 2col → 2-or-3col grid mirroring `.highlights-grid` breakpoints. CSS captured as IG-12 / IG-13.
- **`<cite>` precedent extension to testimonials.** Captured as IG-3.
- **JS edit non-requirement.** No `js/main.js` change required; new sections are static markup with no behavior.
- **Pen-tester non-invocation.** Confirmed at top of section.

### Risks

| Risk | Severity | Likelihood | Mitigation |
|---|---|---|---|
| Section-order ambiguity (AG-1) implemented inconsistently with intent | Medium | High if AG-1 unresolved | AG-1 resolution + IG-10 explicit ordering + QA Gate visual diff against intent |
| `<cite>` semantic precedent broken if implementer follows the spec markup template literally | Low | Medium | IG-3 makes precedent extension explicit |
| Accidental JSON-LD / microdata leak via copy-paste from a testimonial pattern reference | Medium | Low | IG-4; QA Gate grep for `ld+json`, `itemtype`, `itemprop` as a hard stop |
| Logo CLS / image-budget regression if dimensions missing | Low | Medium | IG-9; QA Gate Lighthouse pass |
| `images/source/logos/` not gitignored, source assets accidentally committed | Low | Very low | IG-7 verify step (`git ls-files images/source/logos/`); existing `.gitignore:3` confirmed to cover the path |
| Logo strip ships with visible color clash / dark-square seams (Option A visual concern) | Medium | High while Option A is in place | AG-2 follow-on spec for Option D before go-live; site is not yet live (`project_deployment_deferred.md`) so first-impression risk is managed |
| Q-Cept aspect-ratio anomaly (2.5:1 vs. six 1:1 logos) breaks row visual uniformity | Low | Medium | IG-9 dimensions + IG-11 `flex: 1 1 0; max-width: 140px` + `object-fit: contain` accommodate the wider mark; Q-Cept renders as a wordmark-style accent rather than a square badge |
| Brand-guideline / IP exposure if Rob overrides AG-2 to Option B (SVG vectorization) | Low (private repo currently) → Medium (when public) | Conditional on AG-2 = (b) | AG-2 recommendation routes to A-now-D-later, avoiding both B's IP risk and C's failure mode |
| Testimonial attribution drift (year missing, title-at-time wrong) | Low | Low | Marketing-copywriter pass + AC at QA Gate |
| Stack-quirks doc out-of-date if AG-2 chooses Option B or D in this spec | Low | Conditional on AG-2 ≠ (a) | IG-8 mandates stack-quirks entry as part of the chosen path |

### Effort Comparison

| | AI-Assisted | Human Solo |
|---|---|---|
| Architecture Review | ~40 minutes wall-clock (full spec read; line/file verification across `index.html`, `about.html`, `css/style.css`, `js/main.js`, `governance/stack-quirks.md`, `.gitignore`; CSS primitive scan with line-numbered findings; SPEC-011 collision detection; three specialist invocations in parallel — architect-reviewer, ui-designer, graphic-artist; specialist conflict resolution where ui-designer's CSS-filter recommendation was overruled by graphic-artist's file-inspection finding; synthesis with 14 IGs and 2 AGs; risk and effort tables) | 3-5 hours (read spec; open all four candidate-side files and verify line citations; read CSS for primitive ownership; reason about SPEC-011 home-page collision independently; visually inspect seven JPEG sources to evaluate logo treatment options; calibrate band rhythm against SPEC-008/009 R3.4; produce flex/grid CSS recommendations with breakpoint reasoning; draft IG/AG list; write Risk/Effort tables; surface IP texture for vector logo recreation) |
| Assumptions | Reviewer had full repo access; Spec-Gate-approved spec; all governance docs (`solo-operator-model.md`, `stack-quirks.md`, `tier-selection-guidelines.md`); all seven logo source files at project root for visual inspection; SPEC-011 merged on main as the post-merge baseline. Specialist agents used in parallel (architect-reviewer for design validation, ui-designer for layout/breakpoints/band assignment, graphic-artist for logo-treatment Option A/B/C/D evaluation including actual file inspection). Conflict between ui-designer's Option C recommendation and graphic-artist's file-inspection finding was resolved in graphic-artist's favor on the evidence and captured as the IG-11 amendment. Pen-tester not invoked: Standard tier, no auth/payment/PII/external-API/integration surface, logos are committed assets, testimonials are static text. |

### Arch Gate Decisions (2026-05-01)

| ID | Decision | Rob's resolution |
|---|---|---|
| AG-1 | R1/R2 placement relative to SPEC-011 CTA — variant α / γ / δ-ish or other? | **(a) variant α — logos → testimonials → "Open to Senior" → about-teaser.** *Rationale: matches both `architect-reviewer` and `ui-designer` independent recommendations. Narrative arc is proof-then-ask (highlights/logos/testimonials build credibility before the role-pitch CTA). Band rhythm alt → cream → alt → cream → alt → dark avoids consecutive same-band repetition. IG-10 captures the exact final ordering as gating for the implementer.* |
| AG-2 | Logo treatment — Option A (ship now) + follow-on D, or Option B in this spec, or Option D in this spec? | **Hybrid — ship Option A in SPEC-012; defer Option D to a follow-on trivial spec ("logo-strip polish") before site go-live.** *Rationale: site is not yet live (per `project_deployment_deferred.md`), so the first-impression risk of Option A's visible color clash is managed by Rob's go-live timing. Option A ships the credibility signal (recognizable company names, correct alt text) within current Pillow-only tooling. Option B's IP texture (most companies' brand guidelines forbid logo modification) and new-SVG-asset-class consideration warrant a separate conscious gate, not an implementation-sprint side effect. `.logo-mono` is established now as a sizing-only placeholder class so the future polish does not require a markup change. Implementer follows IG-11 (sizing-only, no `filter: grayscale`) and IG-14 (Pillow resize at 80px / 160px @2x). Follow-on spec to be opened at "logo-strip polish" before site go-live.* |

### Arch Gate Approval

**Decision:** Approved 2026-05-01
**Gate owner:** Rob Parker
**Approval note:** Both AG decisions resolved as recommended (AG-1 = variant α, AG-2 = hybrid A-now-D-later). All 14 IG items binding for the Implementer-Tester stage. Pen-tester non-invocation confirmed (Standard tier; no auth/payment/PII/external-API surface). Closed at this gate: Q7 band assignment, `.logos-strip` and `.testimonials-grid` primitive design, `<cite>` precedent extension, JS edit non-requirement. Spec advances to Implementation. A follow-on trivial spec ("logo-strip polish") is queued for Option D treatment of the seven logos before site go-live; tracked in `specs/backlog.md` at the close of SPEC-012 implementation.

---

## QA Checklist

**Stage owner:** sdd/implementer-tester pipeline agent
**Specialist invocations:** marketing-copywriter, frontend-developer, code-reviewer
**Date:** 2026-05-01 (R2 scope-reduction amendment 2026-05-02)
**Code-review verdict:** PASS WITH NOTES (2 suggestion-tier items, no blockers)
**HTTP smoke verdict:** PASS (R1+R3 final state: 5 HTML pages, CSS, fonts return 200; testimonials and education line markers present)
**Pipeline status:** Implementation complete (R1+R3 only after R2 drop); ready for Rob's manual QA Gate.

### Scope Reduction — R2 dropped (2026-05-02)

**Decision:** R2 (the seven-logo "Where I've Built" strip on Home) is dropped from SPEC-012's shipping scope. Rob's call at QA Gate review.

**Rationale (Rob, 2026-05-02):**
- Logo strips work on *instant recognition*. Two of the seven sources are visual-only marks (SugarCRM's "S" letterform; Salesfusion's flame mark) that require the reader to already know the company before the logo communicates anything. If a logo requires lookup, it has failed at its job and added cognitive friction without adding credibility.
- Rob's career path is in mid-tier SaaS / healthcare-tech / enterprise software brands (SugarCRM, Salesfusion, athenahealth, M2SYS, Q-Cept, Radiant Systems, Cisco). None carries the "wow factor" of FAANG-tier brands where the logo-strip pattern works because instant recognition is assumed. The audience for this site spans general executive recruiters and hiring managers in adjacent industries — the logo strip optimizes for an in-industry reader at the cost of the broader audience.
- At the Director/VP/CTO audience level, evaluators are past "is this person legitimate" and into "what did this person accomplish." Logos answer the first question; metrics and testimonials answer the second. The site is positioned for the second question. R2 pulled visual weight back toward question one — a step backward in the audience's evaluation flow.
- The credibility gap the original audit flagged (`robcparker_com_audit.md` Dimension 7, lines 219-244) is already addressed by R1 (testimonials shipping in this spec) plus R3 (education) plus the existing metrics throughout (25 years, 26 engineers, 150% scale, 350% throughput, 99.95% uptime, 17+ releases/year, $100M+ SaaS) plus the company names appearing in context in the hero subheadline and about-page paragraphs.
- AG-2's Option A first-impression risk goes away with R2 dropped. No more dark-square/white-square seam clash, no Q-Cept aspect anomaly, no deferred follow-on polish spec.

**What this changes:**
- `index.html`: logo strip section reverted (former lines 151-167 deleted). Testimonials section flipped from `class="section section-alt"` to `class="section"` (cream) — see band-rhythm note below.
- `css/style.css`: `.logos-strip` / `.logo-mono` ruleset (former section 23) removed. `.testimonials-grid` / `.testimonial` rules retained (R1 still ships).
- `images/logos/`: all 7 optimized JPEGs removed via `git rm`. Source files at `images/source/logos/` left in place (gitignored; harmless if Rob wants them later).
- Scheduled routine `trig_0165SWkrHQeh3AUjg9T7e3WK` (the auto-drafter for the "logo-strip polish" follow-on spec) is **disabled** — with R2 dropped, the polish follow-on is moot.

**Band-rhythm note (post-R2):** the home page now sequences hero → highlights(`section-alt`) → **testimonials(`section`, cream)** → "Open to Senior"(`section`, cream) → about-teaser(`section-alt`) → contact(`section-dark`). The two consecutive cream bands (testimonials → "Open to Senior") are accepted as a *narrative pair*: "what former colleagues say about Rob → what Rob is looking for next." The band-switch cue is partially compensated by layout differentiation — testimonials is a 1→2→3 column card grid, "Open to Senior" is a centered single-CTA section. AG-1's variant-α band rhythm (alt → cream → alt → cream → alt → dark) is superseded by the post-R2 rhythm (cream → alt → cream → cream → alt → dark) per Rob's R2 drop.

**AGs superseded by the R2 drop:**
- **AG-1** (R1/R2 placement, variant α) — partially superseded. R1's placement holds (between highlights and "Open to Senior"); R2's placement is moot.
- **AG-2** (logo treatment Option A vs. B vs. D) — fully moot. No logos to treat.

**IGs that become N/A** (originally binding for R2 only):
- IG-5, IG-7, IG-8, IG-9, IG-11, IG-14 — all R2-related; no longer apply.

**IGs that remain binding** (R1 + R3):
- IG-1 (citation drift documentation), IG-2 (R3 inside `.hero-bio`), IG-3 (`<cite>` for testimonial speaker), IG-4 (no JSON-LD/microdata), IG-6 (`.testimonials-grid` is new primitive), IG-10 (section ordering — amended per band-rhythm note above), IG-12 (1→2→3 column grid), IG-13 (`.testimonial` chrome via tokens).

### Implementation summary (post-R2 drop)

| File | Lines changed | Net effect |
|---|---|---|
| `index.html` | +28 | New testimonials section (`<section class="section">`, cream band — flipped from `section-alt` after R2 drop to avoid consecutive alt with the highlights band above). 3 `.testimonial` cards with `<cite>` for speaker names. R2 logo-strip section removed in scope-reduction commit. |
| `about.html` | +1 | Education line at line 113 inside `.hero-bio` (R3, IG-2). Inherits `.hero-bio p` styling; no new class. |
| `css/style.css` | +58 | One new section appended (22) for `.testimonials-grid` / `.testimonial` (1→2→3 col grid; chrome via tokens; semibold `<cite>`). Former section 23 (`.logos-strip` / `.logo-mono`) removed in scope-reduction commit. |
| `images/logos/` | 0 (was +7) | Removed in scope-reduction commit. The 7 source JPEGs still live at `images/source/logos/` (gitignored, untracked) for potential future use; no committed assets remain. |

### Content lock (marketing-copywriter pass)

- **R1a H2:** "What Former Colleagues Say" (recommended, confirmed)
- **R2a H2:** "Where I've Built" (recommended, confirmed)
- **Attribution format applied uniformly:** `— <cite>{Name}</cite>, {Title}, {Company} ({Year})`
- **Order (locked):** Robert Gonzalez → Zac Sprackett → Jorge Arroyo
- **Selected quotes (verbatim, no editorial rewriting):** all three are SugarCRM 2026 colleagues, covering strategy/execution (Gonzalez), people-and-technical leadership (Sprackett), and tech-business bridging (Arroyo)
- **Audit-theme flag:** the audit (line 224) called out architecture-judgment and legacy-refactoring testimonials as the highest-leverage themes to surface; Rob's selection covers different themes (strategy, leadership, business). Per AC line 235, this is Rob's call and is recorded here as a flag, not a defect

### IG verification (post-R2; binding items only)

| ID | Status | Evidence |
|---|---|---|
| IG-1 | n/a | Documentation-only citation drift (`about.html:130-135` → actual `129-134`); not in code |
| IG-2 | ✓ | `about.html:113` inside `.hero-bio` div, before `</div>` at 114 |
| IG-3 | ✓ | `<cite>` wraps each speaker name; scoped `.testimonial cite` rule mirrors `.philosophy-quote` precedent without modifying it |
| IG-4 | ✓ | Site-wide grep for `ld+json`, `itemtype`, `itemprop` returns zero hits |
| IG-5 | n/a (R2 dropped) | `.logos-strip` removed |
| IG-6 | ✓ | `.testimonials-grid` and `.testimonial` are new primitives; `.philosophy-quote` rules untouched |
| IG-7 | n/a (R2 dropped) | No committed logo assets |
| IG-8 | n/a | No new asset class introduced |
| IG-9 | n/a (R2 dropped) | No `<img>` tags introduced |
| IG-10 | ✓ amended | Post-R2 ordering: hero → highlights(`section-alt`) → testimonials(`section`, cream) → "Open to Senior"(`section`, cream) → about-teaser(`section-alt`) → contact(`section-dark`). Two consecutive cream bands accepted as a narrative pair per Scope Reduction rationale |
| IG-11 | n/a (R2 dropped) | No `.logo-mono` rule remains |
| IG-12 | ✓ | Grid: 1col mobile-first → 2col @768px → 3col @1024px |
| IG-13 | ✓ | `.testimonial` chrome uses `--color-surface-elevated`, `--color-border-hairline`, `--border-radius-sm`, `--space-8` — exact token mirror of `.highlight-card` |
| IG-14 | n/a (R2 dropped) | No logo assets to optimize |

### Code-reviewer findings (suggestion-tier; no blockers)

- **Q1 — Empty `.logo-mono` rule.** Resolved by R2 drop (rule removed entirely with the rest of section 23).
- **A5 — Color contrast spot-check at sighted QA.** Re-evaluated for the post-R2 cream band: testimonial body charcoal-on-elevated-surface ≈ 17.2:1 (AAA); footer muted-on-elevated-surface on a cream `.section` band (`--color-cream` #F7F6F2) is even higher contrast than on the alt-band evaluated originally — comfortably above AA. The card's elevated surface (`#F3F1EB`) is now slightly *darker* than the page cream (`#F7F6F2`) instead of slightly lighter than the alt surface, so the card reads as a *recessed-and-tinted* block rather than an *elevated-and-tinted* block on the alt band. Confirm visually at QA Gate that the card chrome still reads as a distinct unit (it should — the hairline border carries it).

### HTTP smoke test results (local server, 2026-05-01 pre-R2-drop, 2026-05-02 post-R2-drop)

Original pass (R1+R2+R3): all 5 HTML pages 200, all 7 logo assets 200, CSS/fonts 200, all DOM markers present. Recorded for audit trail.

Post-R2-drop expected state (re-run at QA Gate): 5 HTML pages 200, CSS 200, **zero requests for `images/logos/*.jpg`** (404 expected if cached browser tab still tries to fetch — clear cache before QA), structural markers on index.html `testimonials-heading` (1 hit), `testimonials-grid` (1 hit), `.testimonial` (3 hits), `logos-heading` (0 hits), `logos-strip` (0 hits); on about.html `education-line` (1 hit).

### Manual QA items for Rob (post-R2; browser-based — pipeline cannot verify)

R2-related items removed (logo strip cross-browser, breakpoints, Q-Cept aspect, color clash, screen-reader on logo strip — all moot).

| # | Item | Why |
|---|---|---|
| 1 | With VoiceOver (Safari) or NVDA (Firefox), navigate into a `.testimonial` blockquote. Confirm quote + name + title + company + year announce as a coherent unit | IG-3 / WCAG semantic blockquote pattern |
| 2 | Run Lighthouse on the home page. Confirm scores have not regressed from the pre-SPEC-012 baseline | Performance/CLS regression sanity check; less load-bearing post-R2 since no new images |
| 3 | Open `about.html` and confirm the education line "MS Computer Science, Georgia Tech. BS, Clemson University." renders as a standalone single-line `<p>` with `.hero-bio p` rhythm matching the paragraphs above | R3 / IG-2 acceptance criterion |
| 4 | Walk the home page top-to-bottom (hero → highlights → testimonials → "Open to Senior" CTA → about-teaser → contact CTA). Confirm the testimonials → "Open to Senior" cream→cream pairing reads as a cohesive narrative pair (testimonials about Rob, then Rob's stated next role) rather than as a missed band-switch | IG-10 amended; band-rhythm note in Scope Reduction |
| 5 | Sighted check on testimonial card chrome — the card should read as a distinct unit on the cream band (the hairline border carries the boundary even though `--color-surface-elevated` is now slightly *darker* than the page cream) | A5 (re-evaluated post-R2) |
| 6 | Cross-browser check (Chrome, Firefox, Safari) at desktop, tablet, mobile widths. Confirm testimonials grid reflows cleanly: 3-up desktop → 2-up tablet → stacked mobile | IG-12 grid breakpoint behavior |

### Effort Comparison

| | AI Pipeline (actual) | Mid-level developer (estimate) |
|---|---|---|
| Architecture review prep | ~40 min | ~3-5 hr |
| Marketing-copywriter pass (3 testimonials, 2 H2s, attribution format) | ~5 min | ~30 min |
| Logo housekeeping (rename + Pillow optimize 7 files + verify) | ~5 min | ~30-45 min (script+verify) |
| Frontend implementation (HTML × 2 files + CSS new sections) | ~3 min specialist invocation + ~1 min verification | ~2-3 hr (research patterns, write rules, hand-test breakpoints) |
| Code review pass | ~3 min | ~45 min |
| HTTP smoke test | ~1 min | ~10 min |
| QA Checklist drafting | ~5 min (this artifact) | ~45 min |
| **Total wall-clock** | **~63 min** | **~7-10 hr** |
| Manual QA (Rob) | ~30-45 min (out of pipeline) | ~30-45 min (same) |

Assumptions: mid-level developer with existing project familiarity but no prior SPEC-012 context. Includes context-gathering, debugging, breakpoint hand-testing, attribution-line proofing, and one PR cycle. Excludes manual visual QA on Rob's side (parallel cost in both columns). Excludes the scheduled-routine setup for the polish-spec drafter (one-time, not part of normal implementer flow).

### Regression risk assessment (post-R2)

| Risk | Severity | Mitigation status |
|---|---|---|
| Cross-browser CSS Grid `repeat(N, 1fr)` differences for the testimonials grid | Low | Pattern is widely supported (matches existing `.highlights-grid` precedent at `style.css:863-868`); QA item #6 covers Chrome/Firefox/Safari visual check |
| Screen-reader regression on the new `.testimonial` `<blockquote>` + `<footer>` semantic pattern | Low | Matches existing `.philosophy-quote` precedent at `about.html:129-134`; QA item #1 verifies via VoiceOver/NVDA |
| Consecutive cream bands (testimonials → "Open to Senior") read as "missed a break" rather than "narrative pair" | Low-Medium | Layout differentiation (card-grid vs. centered-CTA) compensates for missing band-switch cue; QA item #4 verifies sighted scan |
| Testimonial card chrome blends into cream band (now slightly darker than `--color-surface-elevated`) | Low | Hairline border carries the boundary; A5 / QA item #5 verifies sighted |
| Education line on About reads as appended afterthought rather than credential statement | Very low | Inherits `.hero-bio p` rhythm; standalone single-line treatment per Spec Gate Q3 default |

### Production verification plan

1. Rob runs through the 6 manual QA items above in his preferred browser environment.
2. Any failures get logged to `specs/SPEC-012-credibility-signals.md` under a new "QA Findings" sub-section, then fed back to the implementer-tester for fix.
3. Once QA Gate passes, advance to Deployment stage (`sdd/deployment.md`).
4. Per `project_deployment_deferred.md`, the repo builds on every main merge but no live Cloudflare Pages project is currently attached — Rob's go-live is a separate one-time Cloudflare connect. SPEC-012 lands on main when QA passes; live verification happens at go-live time.

### Pipeline-complete

Pipeline-side work for SPEC-012 is complete (R1 + R3 only after R2 scope reduction). **Awaiting Rob's QA Gate.**

---

*Drafted 2026-04-25 from `robcparker_com_audit.md` Prioritized Action #3 (audit lines 296-301) + Dimension 7 (lines 219-244). Architecture Review appended 2026-05-01 by sdd/architect-review pipeline agent (specialist invocations: architect-reviewer, ui-designer, graphic-artist; pen-tester not invoked). QA Checklist appended 2026-05-01 by sdd/implementer-tester pipeline agent (specialist invocations: marketing-copywriter, frontend-developer, code-reviewer). R2 scope reduction appended 2026-05-02 per Rob's call at QA Gate review.*
