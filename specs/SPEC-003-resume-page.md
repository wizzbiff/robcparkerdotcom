# SPEC-003: Resume Page

**Status:** Complete (deployment deferred)
**Tier:** Standard
**Author:** PM-Spec Agent
**Date:** 2026-04-17
**Branch:** `spec/SPEC-003-resume-page`

---

## Summary

Build the Resume page (`resume.html`) replacing the current placeholder. The page mirrors Rob's PDF resume structure for the web, offers a downloadable PDF, and surfaces subtle metric callouts on recent roles — serving recruiters and hiring managers evaluating Rob for Director/VP of Engineering roles at AI-forward SaaS companies.

## Context

SPEC-001 established the site foundation. SPEC-002 built the thematic About page — which deliberately avoided chronological history so the resume page could own it. This spec delivers the chronological career artifact: the canonical, fact-dense record that recruiters screening Rob will expect to find.

Source of truth: `additional-context/Rob Parker Resume.pdf`. The web page is the HTML mirror of that content, with a downloadable copy available for recruiters who want the file.

## Requirements

### Page Structure

The page mirrors the PDF resume order:

1. **Header** — Name, positioning line, location (Atlanta, GA), email, LinkedIn, download-PDF button
2. **Summary** — The resume's opening paragraph, lightly polished for web rhythm
3. **Experience** — Reverse-chronological roles with full bullets (SugarCRM Sr. Director → Director → Salesfusion CTO → Salesfusion Director/Lead)
4. **Earlier Experience** — Compact rollup (athenahealth, M2SYS, Qcept, Cisco) matching the PDF's treatment
5. **Education** — Georgia Tech (MS CS), Clemson (BS CIS)
6. **Skills** — Four skill categories as presented in the PDF
7. **CTA Section** — "Get in Touch" → `contact.html` (single CTA; download PDF is already available in header)

### Section 1: Header

- **Layout:** Stacked block, centered or left-aligned per design judgment. No photo — this is a document-like page, not a profile page.
- **Name:** "Rob Parker" as H1
- **Positioning line:** "Senior Engineering Executive · AI-Native Platforms · Targeting Director/VP"
- **Location:** "Atlanta, Georgia" (web consistency with About page — resume PDF says Decatur but we present Atlanta publicly)
- **Email:** `rob.c.parker@gmail.com` rendered as `mailto:` link
- **Phone:** **NOT displayed** — recruiters who want to call can route through the contact page. Reduces scrape surface.
- **LinkedIn:** Link to `linkedin.com/in/robcparker`
- **Download PDF:** Prominent button labeled "Download PDF" linking to `files/rob-parker-resume.pdf` with `download` attribute and `type="application/pdf"`

### Section 2: Summary

- **Section heading:** "Summary"
- **Content:** The PDF summary paragraph, lightly polished by marketing-copywriter for web rhythm — preserve all facts, metrics, and positioning statements exactly
- **Length:** Single paragraph, matching PDF

### Section 3: Experience (Modern Roles)

Four role entries in reverse-chronological order, each containing:
- **Role title** (h3)
- **Company** (with subtle visual distinction from title)
- **Date range and location** (e.g., "January 2021 – March 2026 · Atlanta, GA")
- **Bullets** — verbatim from PDF, with marketing-copywriter permitted only to polish punctuation/rhythm (no fact changes)

Roles:
1. **Senior Director of Engineering — SugarCRM** (Jan 2021 – Mar 2026) — 9 bullets
2. **Director of Engineering — SugarCRM** (May 2019 – Jan 2021) — 3 bullets
3. **Chief Technology Officer — Salesfusion** (Jan 2019 – May 2019) — 3 bullets
4. **Director of Engineering / Lead Software Engineer — Salesfusion** (Nov 2015 – Jan 2019) — 3 bullets

### Metric Callouts (Recent Roles Only)

On the **Senior Director of Engineering — SugarCRM** role only, surface 3 metric pull-quotes as visual callouts separate from the bullet list:

- **350%** — system throughput increase
- **25%** — infrastructure cost reduction
- **20%** — developer velocity gain via AI enablement

Treatment: small accent-color numeric callouts arranged horizontally on desktop, stacked on mobile. Each callout has an accessible label describing the metric. Do NOT duplicate these numbers in adjacent bullets — if a callout surfaces a metric, the matching bullet can reference it without restating the number.

No metric callouts on the other three modern roles — avoids visual clutter and preserves the "document-like" feel.

### Section 4: Earlier Experience

Compact rollup matching the PDF's treatment. Each entry is:
- **Role title and company on one line** (e.g., "Senior Software Engineer / Technical Team Lead — athenahealth (2015)")
- **Single-sentence accomplishment** (verbatim from PDF)

Four entries: athenahealth, M2SYS Technology, Qcept Technologies, Cisco Systems.

### Section 5: Education

Two entries, simple display:
- **Master of Science, Computer Science** — Georgia Institute of Technology
- **Bachelor of Science, Computer Information Systems** — Clemson University

No dates (matching PDF).

### Section 6: Skills

Four labeled categories as presented in the PDF:
1. **AI & Platform**
2. **Cloud & Architecture**
3. **Engineering Leadership**
4. **Development**

Each category displays its comma-separated skill list. Visual treatment: semantic grouping (e.g., definition list `<dl>` or heading + paragraph per category). Skills are static text — no pill/tag components required for this spec.

### Section 7: CTA

- **Section heading:** "Let's Connect" (or copywriter-preferred)
- **Supporting sentence:** Single line inviting contact from hiring managers
- **Primary CTA:** "Get in Touch" → `contact.html`
- Reuse `.cta-section` / `.section-dark` / `.btn-white` pattern from SPEC-001/002

### Assets

1. **Create `files/` directory** at project root for downloadable documents
2. **Copy the resume PDF** from `additional-context/Rob Parker Resume.pdf` to `files/rob-parker-resume.pdf`
   - Filename: neutral (no date) — stable URL for recruiters sharing the link
   - Committed to the repo so Cloudflare Pages serves it directly
3. **PDF file size:** Current source is 50.5KB — well under budget. No optimization required unless size grows.
4. **PDF hygiene:** Verify no metadata (author, last-edited-by) leaks personal data. If present, strip via `exiftool -all=` or equivalent before committing.
5. **Strip the Decatur → Atlanta rewrite from the PDF?** No — the PDF remains the canonical document with Decatur preserved. Only the HTML page surfaces "Atlanta" for web consistency.

### SEO & Meta

- **Title:** "Rob Parker Resume — Senior Engineering Executive"
- **Meta description:** ~150 chars covering Rob's positioning, AI platform leadership, and Director/VP target
- **OG title:** Same as title
- **OG description:** Same as meta description
- **OG image:** Reuse `https://www.robcparker.com/images/rob-parker-headshot@2x.jpg` from SPEC-002 (absolute URL)
- **Remove `noindex` meta tag** — this is a real page that should be indexed for recruiter search
- **Canonical URL:** `https://www.robcparker.com/resume.html`

### Print Stylesheet

Add `@media print` rules so a recruiter pressing Ctrl/Cmd-P from the browser gets a clean printed result:

- Hide: nav, footer, CTA section, download-PDF button, skip-link
- Typography: switch body to serif or keep system stack at print-friendly size (11-12pt)
- Colors: force black text on white background; strip accent color on metric callouts (keep the numbers, drop the color styling)
- Links: show URLs in parentheses for email and LinkedIn (standard print convention) — CSS `a[href]::after { content: " (" attr(href) ")"; }` on those elements only
- Page breaks: `page-break-inside: avoid` on each role entry; `page-break-before: auto` on section headings
- Margins: generous (1 inch equivalent) via `@page { margin: 1in; }`

## Content Requirements

Marketing-copywriter receives:
- This spec
- The resume PDF (`additional-context/Rob Parker Resume.pdf`)
- Positioning: Director/VP at AI-forward SaaS companies
- Tone: Professional, factual — this is a resume, not marketing prose
- Constraint: **Preserve all facts and metrics verbatim.** Polish is limited to punctuation, rhythm, and web-friendly sentence flow. No reordering of bullets. No invented content.

Copywriter deliverables:
- Lightly polished Summary paragraph (preserve all metrics and facts)
- Lightly polished experience bullets (preserve all metrics and facts)
- Positioning line under name
- Meta title and description
- OG title and description
- CTA section heading and supporting sentence
- Accessible labels for the three metric callouts

## Out of Scope

- Editing the underlying PDF — `files/rob-parker-resume.pdf` is a direct copy of the source
- Interactive timeline visualizations (beyond the static metric callouts)
- Skill proficiency meters or rated skill bars
- Recommendations/testimonials section (future spec if desired)
- Collapsible/accordion sections — full content visible by default
- Per-role logos or company imagery
- A "What I'm Looking For" section — the positioning line covers intent; the About page carries the narrative
- Downloadable Word or plain-text versions of the resume (PDF only)
- Contact page (SPEC-004)
- Service pages (SPEC-005, SPEC-006)
- Analytics/tracking for PDF downloads (future spec if useful)

## Dependencies

- **SPEC-001 (complete):** Design system, shared nav/footer, JS utilities, `resume.html` placeholder
- **SPEC-002 (complete):** Headshot asset available for og:image reuse
- **Source PDF:** `additional-context/Rob Parker Resume.pdf` available (50.5KB)

## Non-Functional Requirements

### Performance
- PDF file ≤100KB served directly by Cloudflare Pages (current: 50.5KB)
- No new external dependencies (no icon library, no font additions beyond SPEC-001 baseline)
- Page should render quickly — text-heavy content without images means no CLS risk from this page's own assets
- No lazy-load needed (above-the-fold content is text)

### Accessibility
- Semantic HTML throughout (single `<h1>`, logical `<h2>`/`<h3>` hierarchy, `<ol>`/`<ul>` for bullet lists)
- Metric callouts use `role="img"` with `aria-label` describing the full metric sentence (pattern established in SPEC-001/002)
- Download-PDF button includes `aria-label="Download Rob Parker's resume as PDF (50KB)"` — tells screen-reader users what they're getting and the approximate size
- Email link: screen-reader-friendly `mailto:` with visible text matching the address
- Color contrast AA+ on all text including metric callouts
- Print stylesheet preserves semantic structure — no content hidden via CSS that screen readers need

### SEO
- Full meta tags including og:image (reuse headshot from SPEC-002)
- Remove `noindex`
- Clean URL preserved (`resume.html`)
- Structured data (JSON-LD `Person` schema) is out of scope for this spec — track as follow-up if useful

### Responsive
- Header: stacks on mobile; download button full-width on narrow screens
- Metric callouts: horizontal on desktop, stacked on mobile (<480px)
- Role entries: bullet lists reflow naturally; dates/locations may wrap under role title on narrow screens
- Skills section: each category block flows full-width on mobile

### Security
- PDF metadata stripped before commit (no author/device leak)
- Email exposed in plain text — accepted trade-off for recruiter usability; if scraping becomes a problem, revisit with obfuscation in a follow-up spec
- Phone intentionally NOT exposed on the web page — routed through contact form
- `rel="noopener noreferrer"` on any external links (LinkedIn already follows SPEC-001 convention)

## Acceptance Criteria

### Page Structure & Content

- **Given** a user lands on `resume.html`, **When** the page renders, **Then** the header shows Rob's name, positioning line, Atlanta location, email link, LinkedIn link, and a prominent "Download PDF" button — and phone is not displayed anywhere on the page
- **Given** a user scrolls past the header, **When** they reach the Summary section, **Then** the summary paragraph is present with all original facts and metrics preserved
- **Given** the Experience section, **When** a user reads it, **Then** all four modern roles appear in reverse-chronological order with role title, company, date range, location, and full bullet lists verbatim from the PDF
- **Given** the Senior Director role, **When** the user views it on desktop, **Then** 3 metric callouts (350%, 25%, 20%) render as visual pull-quotes distinct from the bullet list
- **Given** the Senior Director role, **When** the user views it on mobile (<480px), **Then** the 3 metric callouts stack vertically and remain legible
- **Given** the other three modern roles, **When** a user views them, **Then** no metric callouts appear (callouts are scoped to the most recent role only)
- **Given** the Earlier Experience section, **When** rendered, **Then** all four companies (athenahealth, M2SYS, Qcept, Cisco) appear as compact single-sentence entries matching the PDF treatment
- **Given** the Education section, **When** rendered, **Then** both Georgia Tech and Clemson entries appear without dates
- **Given** the Skills section, **When** rendered, **Then** all four skill categories and their complete skill lists appear as in the PDF
- **Given** the end of the page, **When** reached, **Then** the CTA section displays a single "Get in Touch" button routing to `contact.html`

### PDF Download

- **Given** a user clicks "Download PDF" in the header, **When** their browser handles it, **Then** `rob-parker-resume.pdf` either downloads or opens in a browser tab depending on browser/OS settings
- **Given** the PDF is downloaded and opened, **When** the user inspects its metadata, **Then** no personally-identifying author/device metadata is present beyond what's already public on the resume
- **Given** the PDF URL `/files/rob-parker-resume.pdf`, **When** accessed directly, **Then** the file loads with `Content-Type: application/pdf` (served by Cloudflare Pages)

### Print Output

- **Given** a user prints the page via Ctrl/Cmd-P, **When** the print preview renders, **Then** nav, footer, CTA section, download-PDF button, and skip-link are hidden
- **Given** the printed output, **When** reviewed, **Then** email and LinkedIn URLs appear in parentheses next to their link text, content fits on 1-2 pages with 1-inch margins, and role entries do not break awkwardly across pages

### SEO

- **Given** the Resume page is crawled, **When** meta tags are inspected, **Then** `noindex` is NOT present
- **Given** the title and meta description, **When** compared to SPEC-003 requirements, **Then** they match the specified copy
- **Given** social-share previews, **When** rendered, **Then** `og:image` references the absolute-URL headshot from SPEC-002

### Integration

- **Given** a user on the About page, **When** they click "View My Resume", **Then** they land on the full Resume page (not the placeholder)
- **Given** a user on the Resume page, **When** they click the CTA, **Then** they navigate to `contact.html`
- **Given** any page's nav, **When** the Resume link is clicked, **Then** the Resume page loads correctly
- **Given** the Resume page, **When** loaded in a browser, **Then** active-nav highlighting activates the "Resume" nav item (pattern from SPEC-001)

## Decision Rationale

- **Mirror-the-PDF structure over reshape-for-web:** Recruiters expect a resume to look like a resume. Reshaping into visual timelines or cards introduces novelty cost for the very audience this page serves. The PDF structure is a known, scannable pattern.
- **Metric callouts only on the most recent role:** Surfaces the strongest hiring signals (AI platform outcomes) without turning the whole page into a dashboard. Earlier roles retain narrative integrity.
- **Phone hidden, email exposed:** Balances accessibility for recruiters (email is the default business contact channel) with minimizing scrape surface for personal contact. Phone routes through contact form if a recruiter genuinely needs it.
- **Atlanta over Decatur on the web, Decatur in the PDF:** About page already uses Atlanta — consistency matters across the site. The PDF stays as-is (it's a direct copy of the canonical document).
- **Print stylesheet included:** Recruiters print resumes. Ignoring this leaves a hostile experience in a common workflow. Cost is low (~30 lines of CSS).
- **No PDF download analytics:** Tracking adds complexity (analytics integration, cookie considerations) for marginal value at this stage. Can add later if worth it.
- **`files/` as the convention for downloadable documents:** Parallel to `images/` — predictable home for non-image static assets. Sets the pattern for future documents (whitepaper, case study PDFs) without introducing per-asset folders.

## Effort Comparison

| | AI-Assisted | Human Solo |
|---|---|---|
| Spec creation | ~45 minutes | 2-3 hours |
| Assumptions | Resume PDF and SPEC-001/002 context pre-loaded; 9 clarifying questions answered in one round | PM would need full intake session with Rob + draft/revise cycles |

---

## Approval

**Tier:** Standard
**Gate owner:** Rob Parker
**Requires:** Documented approval with responses to any agent-raised concerns

### Structured Review Checklist
- [x] Business intent confirmed (recruiter-facing canonical resume for Director/VP search)
- [x] Scope boundaries clear (resume page only; contact, services, PDF analytics deferred)
- [x] Acceptance criteria testable
- [x] Dependencies identified (SPEC-001, SPEC-002 complete; source PDF available)
- [x] Tier appropriate (Standard — new content page with downloadable asset, no external integrations, no auth/payments/PII)
- [x] No mandatory escalation triggers (no auth, payments, new PII collection, or external integrations)

### Clarifying Questions (Resolved 2026-04-17)

| # | Question | Resolution |
|---|----------|------------|
| Q-1 | PDF download available? | Yes — `files/rob-parker-resume.pdf`, committed |
| Q-2 | Structure — mirror PDF or reshape? | Mirror the PDF order |
| Q-3 | Earlier Experience treatment? | Compact rollup (match PDF) |
| Q-4 | Expose phone and email? | Email only; phone routed through contact form |
| Q-5 | Header location: Decatur or Atlanta? | Atlanta (web consistency with About) |
| Q-6 | Indexable (remove noindex)? | Yes — recruiters should find it |
| Q-7 | Marketing-copywriter scope? | Light polish only; preserve all facts and metrics |
| Q-8 | Print stylesheet? | Yes |
| Q-9 | Metric callouts? | Yes, on most recent role only |

**Decision:** Approved
**Approved by:** Rob Parker
**Date:** 2026-04-17
**Gate annotation:** Accepted all 9 defaults in one round. PDF stays untouched — HTML uses "Atlanta" for site consistency; PDF retains "Decatur" as the canonical document's original wording.

---

## Architecture Review

**Reviewer:** architect-reviewer agent
**Date:** 2026-04-17
**Recommendation:** Approve with conditions (conditions are lightweight implementation choices for Rob's decision)

### Findings

- **Pattern fit:** Strong. The spec reuses SPEC-001 primitives (`.section`, `.section-alt`, `.section-dark`, `.cta-section`, `.btn`/`.btn-primary`/`.btn-white`) and respects the SPEC-002 metric-accessibility pattern (`role="img"` + `aria-label`). The header is intentionally *not* `.hero-profile` — no headshot, document-like — which is correct; building a new lightweight `.resume-header` is cleaner than forking `.hero-profile`. The metric callout block is genuinely new (3-up horizontal group inside a role entry) and warrants its own small component.
- **Complexity:** Appropriately scoped. The only net-new CSS surface is: resume header, experience role card, metric-callouts strip, earlier-experience compact row, skills list, and the print stylesheet. Nothing over-engineered. One under-specified item: the spec does not say whether the metric-callout numbers should be colored with `--primary-color` or `--accent-color`. SPEC-001 established `--primary-color` for `.highlight-metric`; recommend reusing that for consistency (see IG-4).
- **Integration risks:** Minimal. The new `files/` directory is a static-asset convention parallel to `images/`. Cloudflare Pages serves `.pdf` with `Content-Type: application/pdf` by default based on file extension — no `_headers` file required for correctness, but see IG-7 for an optional hardening. No external services introduced.
- **Security:**
  - PDF metadata stripping is necessary but the recommended `exiftool -all=` is sufficient only if followed by verification. Recommend a two-step: strip, then `exiftool files/rob-parker-resume.pdf` to confirm Author/Creator/Producer/LastModifiedBy are empty. Flag if the PDF was produced by Word/Pages — those often embed revision histories in XMP that a flat `-all=` pass will remove, but verification closes the loop.
  - Email-in-plaintext is acceptable. The site already exposes the email via the About page and LinkedIn; adding it to the resume page does not meaningfully expand scrape surface. Confirmed as acceptable trade-off.
  - Phone omission is a good decision and should be preserved across the PDF hygiene step — verify the PDF's visible content still contains the phone (it's on the canonical resume) but the HTML page does not surface it. No action, just awareness.
  - No new attack surface beyond the PDF asset itself. PDFs can theoretically carry JavaScript, but the source is Rob's own document — noted for completeness, no mitigation needed beyond metadata strip.
- **Performance:** Text-heavy page with no new images; CLS/LCP/FID risk is negligible. The 50.5KB PDF is a reasonable default; it is linked, not embedded, so it does not count against the page weight budget. Print stylesheet adds ~30 lines of CSS to the single stylesheet — trivial. No new external dependencies.
- **Accessibility:**
  - Metric callouts: `role="img"` + `aria-label="350% system throughput increase"` pattern (from SPEC-002) is correct. Ensure the label reads as a full sentence for screen-reader clarity, not just the number.
  - Download button `aria-label="Download Rob Parker's resume as PDF (50KB)"` is good. Add `type="application/pdf"` on the anchor for browsers that respect it, plus `download` attribute as the spec already states.
  - Print stylesheet: hiding nav/footer/CTA/download-button via `display: none` is correct and does not harm screen readers because screen readers do not use the print media query. The `a[href]::after { content: " (" attr(href) ")"; }` trick is print-only (scoped inside `@media print`) and therefore does not leak into screen-reader output — confirm scope in the implementation.
  - The `<ol>`/`<ul>` for bullets should include the `role="list"` workaround per the SPEC-001 precedent for Safari/VoiceOver (`list-style: none` strips semantics). Skills section should also use a semantic `<dl>` (recommended) or `<h3>` + `<p>` — not a styled `<div>` stack.
- **Technical debt:**
  - Partial payoff on the SPEC-002 og:image-coverage follow-up — this spec reuses the same absolute-URL headshot, so the gap shrinks by one page. The home page and contact/service placeholders still carry the gap; follow-up remains tracked.
  - New debt introduced: the `files/` directory convention. Minor, intentional, and documented inline — acceptable. Recommend a one-line `governance/stack-quirks.md` entry under a new "Static Assets" heading so the pattern is discoverable for future specs (whitepapers, case studies).
  - Potential drift risk: the HTML resume and the PDF resume are two sources with the same content. Over time, one will be updated and the other will not. Not in scope for this spec, but worth noting as a future process concern (e.g., a retro observation or a "source of truth" note in CLAUDE.md). See follow-up.
- **Evolution:** No obstacles for the Phase 2 AI agent or Phase 3 subscription billing. The `files/` convention actually helps Phase 2: downloadable assets (transcripts, case studies) fit the same pattern. An SSG migration (Hugo/Astro) would absorb both the HTML structure and the print stylesheet without rework. Removing `noindex` is correct and expected for this content.

### Implementation Guidance

| # | Guidance | Status |
|---|---------|--------|
| IG-1 | Build a new `.resume-header` block — do NOT use `.hero` or `.hero-profile`. This is a document-style page, not a hero-style page. Leave SPEC-001/002 hero variants untouched. | Accepted |
| IG-2 | Reuse `.section`/`.section-alt` for section rhythm, and `.cta-section`/`.section-dark`/`.btn-white` verbatim for the bottom CTA — match SPEC-002's pattern. | Accepted |
| IG-3 | Role entries: new `.resume-role` component (h3 role title, company, meta row for dates/location, `<ul role="list">` for bullets). Do not fork `.highlight-card`; the treatment is different (dense, document-like, no card shadow). | Accepted |
| IG-4 | Metric callouts: new `.resume-metrics` flex/grid container with `.resume-metric` items. **Use `--accent-color` for the numeric color** (Rob overrode the architect's `--primary-color` default — metric callouts on the resume should read visually distinct from the home-page highlight metrics). `role="img"` + full-sentence `aria-label` on each item per SPEC-002 IG pattern. | Accepted with override |
| IG-5 | Earlier Experience: semantic `<ul role="list">` with each `<li>` containing a `<strong>` company/title line followed by the one-sentence accomplishment. No card styling — compact text rows. | Accepted |
| IG-6 | Skills: semantic `<dl>` with `<dt>` for each category name and `<dd>` for the comma-separated list. Screen readers will announce the category/list relationship naturally. | Accepted |
| IG-7 | `files/` directory at project root, committed (not gitignored). The PDF is a versioned asset and must travel with the deploy. No `_headers` file needed — Cloudflare Pages auto-assigns `Content-Type: application/pdf` by extension. (Optional: add an `_headers` entry later if you want to force `Content-Disposition: attachment` globally instead of relying on the anchor `download` attribute.) | Accepted |
| IG-8 | PDF hygiene: run `exiftool -all= files/rob-parker-resume.pdf` then verify with `exiftool files/rob-parker-resume.pdf` (confirm Author/Creator/Producer are empty). Document the command in `governance/stack-quirks.md` under a new "PDF Optimization" heading. | Accepted |
| IG-9 | Print stylesheet scoped inside a single `@media print { ... }` block appended to `css/style.css`. Hide `.site-header`, `.site-footer`, `.cta-section`, `.skip-link`, `.resume-download-btn`. Use `a[href^="mailto:"]::after` and `a[href*="linkedin.com"]::after` (targeted, not global `a[href]`) to expand URLs — global expansion would print internal nav URLs unnecessarily. | Accepted |
| IG-10 | Download anchor: `<a href="files/rob-parker-resume.pdf" download type="application/pdf" aria-label="Download Rob Parker's resume as PDF (50KB)" class="btn btn-primary resume-download-btn">Download PDF</a>`. Relative URL is fine (same-origin); `type` hint helps some browsers select the right handler. | Accepted |
| IG-11 | Remove `<meta name="robots" content="noindex">` from `resume.html` — matches SPEC-002 IG-11. | Accepted |
| IG-12 | Reuse the SPEC-002 `@2x` headshot as `og:image` with absolute URL (`https://www.robcparker.com/images/rob-parker-headshot@2x.jpg`) and absolute `og:url` — match SPEC-002's pattern and WHY comment. | Accepted |
| IG-13 | Add `governance/stack-quirks.md` entry under new "Static Assets" heading: one-liner establishing `files/` as the committed-asset directory for downloadable documents, parallel to `images/`. | Accepted |

### Condition Decisions

| Condition | Decision |
|-----------|----------|
| Metric callout color | `--accent-color` (Rob override — visual distinction from home-page highlight metrics) |
| `files/` directory gitignore status | Committed (PDF must ship with deploy) |
| PDF `Content-Disposition` | Rely on anchor `download` attribute; no `_headers` file in this spec |
| Print-URL expansion scope | Targeted selectors (mailto + linkedin only), not global `a[href]` |
| Resume-header component | New `.resume-header` (not a `.hero` variant) |
| Skills markup | Semantic `<dl>`/`<dt>`/`<dd>` |

### Follow-up Tracked

- **og:image coverage gap:** Partially paid off (resume page now has coverage). Remaining: home page and placeholder service/contact pages — still a trivial-tier follow-up post-SPEC-002.
- **HTML ↔ PDF source-of-truth drift:** The HTML resume and the PDF will diverge over time unless a process keeps them in sync. Not an action for this spec, but worth a one-liner in `CLAUDE.md` or a retro observation: "When updating the resume, update both `resume.html` and `files/rob-parker-resume.pdf`; treat the PDF as the canonical document and mirror changes to HTML."
- **PDF download analytics:** Out of scope per spec; revisit if download intent becomes a signal worth tracking.
- **JSON-LD `Person` schema:** Out of scope per spec; low-effort follow-up if SEO traction on the resume page is a priority.
- **Stack-quirks additions:** "Static Assets" heading (files/ convention) and "PDF Optimization" heading (exiftool recipe) should be added during implementation.

### Arch Gate Approval

**Decision:** Approved
**Approved by:** Rob Parker
**Date:** 2026-04-17
**Gate annotation:** All 13 IG items accepted. One override: IG-4 metric callout color switches from architect-recommended `--primary-color` to `--accent-color` for deliberate visual distinction from home-page highlight metrics. HTML↔PDF drift follow-up promoted from "future concern" to immediate CLAUDE.md note.

---

## Code Review

**Reviewer:** code-reviewer agent
**Date:** 2026-04-17
**Result:** No critical findings. 5 important findings (I-1 through I-5) applied. 2 suggestions applied (S-1, S-5). 4 suggestions declined as optional/no-op (S-2, S-3, S-4, S-6).

### Findings Resolved

| # | Severity | Finding | Resolution |
|---|----------|---------|------------|
| I-1 | Important | Meta description 163 chars — exceeds ~150 char ceiling (same class as SPEC-002 WARN 1.4) | Trimmed both `meta name="description"` and `og:description` to 139 chars: "Senior engineering executive. 25+ years building AI-native platforms and scaling teams. Targeting Director/VP at AI-forward SaaS companies." |
| I-2 | Important | Universal `* { !important }` reset in print CSS strips color/border intent from every element — future print styles will be painful to reason about | Replaced with scoped rules: `body` sets black-on-white; specific `.section-alt`/`.resume-metrics`/`.resume-skills-group` neutralize backgrounds; `.resume-role`/`.resume-metrics`/`.resume-skills-group` drop shadow. WHY comment added. |
| I-3 | Important | `.resume-role-company` colored `var(--primary-color)` reads as a link, especially adjacent to hyperlinked header contacts | Changed to `var(--text-color)`; semibold weight retained for hierarchy. WHY comment added. |
| I-4 | Important | Metric callout layout at `<=480px` uses horizontal row-per-callout rather than pure vertical stacking | Confirmed acceptable (three stacked 3xl numbers would waste screen height). WHY comment added documenting the deliberate choice. |
| I-5 | Important | `h2 { page-break-before: auto }` is a no-op (auto is default); intent was likely orphan control | Replaced with `page-break-after: avoid; break-after: avoid;` — modern + legacy aliases. WHY comment added. |
| S-1 | Suggestion | Missing `<link rel="canonical">` despite spec listing it as an SEO requirement | Added canonical to `resume.html` with WHY comment. Site-wide back-fill for home/about tracked as follow-up. |
| S-2 | Suggestion | Desktop underline on right-aligned contact items | Declined — acceptable document-style layout; no functional issue. |
| S-3 | Suggestion | Download button text-decoration check | No fix required — verified clean. |
| S-4 | Suggestion | Positioning-line `&middot;` separators may wrap awkwardly at very narrow viewports | Declined — low priority; only affects extreme widths. |
| S-5 | Suggestion | `.resume-role-bullets` keeps `list-style: disc` (overriding site-wide `list-style: none`); intent not documented | WHY comment added explaining deliberate deviation for document-standard bullets. |
| S-6 | Suggestion | `<strong>` in Earlier Experience used as structural delimiter | Declined — aligned with SPEC-003 IG-5 which explicitly specified `<strong>` markup. |

### Convention Compliance (Verified)

- Typographic entities used consistently (`&mdash;`, `&ndash;`, `&rsquo;`, `&ldquo;`, `&rdquo;`, `&middot;`, `&amp;`)
- Meta/OG completeness verified; canonical added; `og:image` absolute; `noindex` removed with WHY comment
- Nav active-page marking (`class="active" aria-current="page"`) matches SPEC-001/002 pattern
- Download anchor correct per IG-10 (`download` attribute, `type="application/pdf"`, aria-label, href)
- Accessibility: `role="list"` on visually-stripped lists; skip-link present; metric callouts use `role="img"` + full-sentence `aria-label`
- CSS: mobile-first breakpoints 768px/480px; `.resume-metric-number` uses `var(--accent-color)` per IG-4 override; new `.resume-*` classes do not fork `.hero`/`.highlight-card`
- Print stylesheet scoped (mailto + linkedin only, not global)
- Content fidelity: all bullets, Earlier Experience entries, and Skills categories present verbatim
- `main.js` untouched; phone not displayed; email renders as `mailto:`

### Security

- No inline scripts or styles; no new CDN/external resources
- External LinkedIn link: `rel="noopener noreferrer"` + `target="_blank"` + "opens in a new tab" label
- Email plaintext accepted per arch review

### Performance

- No new images; PDF 51KB (within ≤100KB budget); no layout-shift risk

---

## QA Verification

**Reviewer:** qa-expert agent
**Date:** 2026-04-17
**Result:** READY FOR DEPLOYMENT (pending manual browser verification)

### Acceptance Criteria: 22 of 22 PASS

| Category | Pass | Fail | Warn |
|----------|------|------|------|
| Page Structure & Content | 10/10 | 0 | 0 |
| PDF Download | 3/3 | 0 | 0 |
| Print Output | 2/2 | 0 | 0 |
| SEO | 3/3 | 0 | 0 |
| Integration | 4/4 | 0 | 0 |
| **Totals** | **22/22** | **0** | **0** |

### Code Review Fixes Verified

| Fix | Verification | Result |
|-----|-------------|--------|
| I-1 | Both `meta description` and `og:description` trimmed to 139 chars and identical | PASS |
| I-2 | No universal `* { !important }` in print CSS; scoped rules replace it | PASS |
| I-3 | `.resume-role-company` uses `var(--text-color)`, not `--primary-color` | PASS |
| I-4 | WHY comment present on `.resume-metric` at ≤480px block | PASS |
| I-5 | `page-break-after: avoid` + `break-after: avoid` on `h2` in print block | PASS |
| S-1 | `<link rel="canonical">` present in resume.html head | PASS |
| S-5 | WHY comment present on `.resume-role-bullets` | PASS |

### Static Verification Results

- **Content fidelity:** All bullets, earlier experience entries, skills categories, positioning line, CTA copy — verified verbatim vs. spec. Phone absent.
- **Visual/design:** CSS custom properties used consistently in new `.resume-*` block; breakpoints at 768px/480px match convention; `.resume-metric-number` uses `var(--accent-color)` per IG-4 override; all 24 `.resume-*` classes used in HTML have CSS definitions (no orphans); no fork of `.hero`/`.highlight-card`/`.highlight-metric`.
- **Accessibility:** Single `<h1>`; logical heading hierarchy (h1→h2→h3); `role="list"` on all visually-stripped lists; `.resume-role-bullets` correctly omits `role="list"` (markers visible, S-5 comment documents); skills use `<dl>`/`<dt>`/`<dd>` semantic markup; all 3 metric callouts use `role="img"` + full-sentence `aria-label`; download button has descriptive aria-label; LinkedIn link secured with `rel="noopener noreferrer"` + descriptive aria-label; skip-link present and wired to `#main-content`; phone number absent.
- **Security:** No inline scripts/styles; no external/CDN resources; external links secured; email in plaintext (accepted per arch review).
- **Performance:** PDF 51,753 bytes (50.5KB) — within ≤100KB budget; no new `<img>` tags on the page; no external fonts; single stylesheet; deferred script.
- **SEO:** Title matches spec; meta description 139 chars (≤150 limit); canonical URL present (S-1); all 5 OG tags present with absolute URLs; no `noindex`.
- **Print:** `@page { margin: 1in }`; nav/footer/CTA/skip-link/download-button hidden; URL expansion scoped to mailto + linkedin only; metric numbers forced black; `page-break-inside: avoid` on role entries; no universal `*` reset.
- **Governance:** `governance/stack-quirks.md` "Static Assets" + "PDF Optimization" entries present; `CLAUDE.md` resume-sync note present at line 44.
- **SPEC-001/002 regression:** `about.html` untouched from HEAD; new CSS is additive only; nav/footer/hamburger/skip-link infrastructure intact.

### WARN Findings

None. The `--accent-color` contrast characteristic (3.6:1, WCAG AA large-text-only) is an inherited condition from SPEC-001 already documented in CSS — not a new finding.

### Manual Browser Verification Required Before Deployment (Pending — Rob)

1. Resume header layout at all 3 breakpoints (desktop 3-column, 768px collapse, ≤480px download-button full-width)
2. Metric callouts at ≤480px (horizontal row-per-callout, not pure vertical stacking)
3. Print preview (Ctrl/Cmd-P): nav/footer/CTA/download hidden; email and LinkedIn URLs render in parens; 1–2 pages with margins
4. PDF download click — file downloads or opens; file is readable
5. Active-nav highlighting on `resume.html`; confirm highlight moves correctly when navigating to other pages
6. About→Resume link lands on full page (not placeholder)
7. Hamburger menu at <768px (open/close/Escape/outside click)
8. Skip-link focus behavior (tab from page load → visible; activate → focus on `<main>`)
9. Screen reader spot-check (VoiceOver/NVDA): metric callouts announce full aria-label sentence; skills `<dl>` announces as description list
10. OG social card preview (post-deploy, LinkedIn Post Inspector or Facebook Sharing Debugger)

### QA Gate Approval

**Decision:** READY FOR DEPLOYMENT pending manual browser verification
**Date:** 2026-04-17

### Manual Browser Verification

**Completed by:** Rob Parker
**Date:** 2026-04-17
**Result:** All 10 verification items pass

**Status:** SPEC-003 complete. Deployment deferred until all content specs are built and SPEC-000 (Cloudflare Pages setup) is completed.
