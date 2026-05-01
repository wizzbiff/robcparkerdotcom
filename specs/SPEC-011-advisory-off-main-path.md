# SPEC-011: Advisory Off the Main Path

**Status:** Spec Gate approved 2026-04-25 · amended 2026-05-01 (R7 added)
**Tier:** Standard
**Author:** PM-Spec Agent (derived from `robcparker_com_audit.md` action #2, audit lines 286-294)
**Date:** 2026-04-25 (amended 2026-05-01)
**Branch:** `spec/SPEC-011-advisory-off-main-path` (to be created at implementation start)

---

## Summary

Move the Advisory page off the main path of the candidate site per audit Option A. The page itself stays live at `/advisory.html` for direct sharing; everything that points cold visitors to it is removed from the candidate-facing surface. In its place, the home page sells exactly one thing — full-time senior engineering leadership.

Concrete changes (seven items):

1. Remove "Advisory" from the shared main nav across all pages (`index.html`, `about.html`, `resume.html`, `contact.html`, `advisory.html`).
2. Remove "Advisory" from the shared footer nav across all pages — recommended at Spec Gate, see Q3.
3. Delete the entire "How Rob Engages" section from `index.html` (currently `index.html:153-184`, including the H2, the intro paragraph, and the full `.about-teaser` block routing to `/advisory.html`).
4. Replace it with a clean full-time-search CTA block (copy drafted below in the Content Requirements section, marketing-copywriter polish at implementation).
5. Rewrite the contact-page hero subheadline at `contact.html:84` to lead with full-time framing; demote advisory to a minor secondary mention with non-equal weight.
6. Site-wide search for any other internal references to advisory (sitemaps, breadcrumbs, structured data, internal copy) and neutralize them — see R6.
7. Repository hygiene: commit the three audit-derived reference docs (`OPERATOR-TODOS.md`, `robcparker_com_audit.md`, `website_audit_prompt.md`) that SPEC-011/012/013/014 all cite, and add `specs/scratch/` to `.gitignore` — see R7.

The advisory page itself is NOT modified. No copy edits, no SEO changes, no design changes to `/advisory.html`. It remains reachable by direct URL or referral link from Rob.

## Context

The audit (`robcparker_com_audit.md` Dimension 5, lines 142-186) argues that mixed advisory + full-time-search signals damage candidacy at Director / VP / CTO level with PE-backed B2B SaaS. The audit's framing: a recruiter landing on the site sees three signals — "How Rob Engages" on home, "actively exploring Director and VP roles" on About, and a full Advisory page in nav — and a reasonable interpretation is "he's hedging." At Director/VP/CTO level with PE-backed buyers, hedging is a real disqualifier. The asymmetry: cold inbound for advisory is unlikely while Rob is job-hunting (advisory inbound flows through referral networks, not Google), so the candidate-signal damage outweighs any advisory traffic loss.

Rob has explicitly accepted the audit's Option A (audit lines 178-180). The advisory page content is well-written; the placement is wrong. Option A keeps the page live for direct sharing — Rob can link a specific referral to `/advisory` directly, and the page is fully functional — but removes it from the cold-visitor flow on the candidate site.

This is reversible. After Rob lands a role, an inverse spec can re-introduce advisory into nav.

Per project memory (`project_advisory_deferrals.md`), pricing, Calendly, testimonials, separate forms, and an overview PDF are already deferred from the advisory page — those remain deferred. SPEC-011 does not change anything on the advisory page itself.

## Decision Rationale

- **Why Option A and not B (separate domain) or C (gated form):** Option B (separate `robparkeradvisory.com` domain) is multi-day work, requires DNS / DNS ownership questions / a second hosting setup, and creates a maintenance footprint Rob does not need while job-hunting. Option C (gate the page behind a contact form) reduces but doesn't eliminate the mixed-signal cost — the page is still listed in nav, recruiters still see it. Option A is the cheapest with the strongest signal correction. (Audit lines 177-185.)
- **Why keep the page live at all:** Rob's referral network is the realistic advisory-inbound channel. A direct link from Rob ("here's what I do" → `/advisory`) is high-trust and converts; a discoverable nav link is what creates the candidate-signal problem. Keeping the page reachable preserves referral utility while eliminating the discovery surface.
- **Why footer removal too (recommendation):** the footer is also a cold-visitor surface. Audit doesn't explicitly mandate footer removal, but the same recruiter who scans the nav also scans the footer. Asymmetric treatment (nav clean, footer dirty) reads as half-committed. Recommended; flagged for Rob at Q3 if he prefers asymmetric treatment.
- **Why delete the home "How Rob Engages" section entirely instead of repurposing the slot:** the section's title, copy, and CTA all advertise advisory. Repurposing for a different message would require a copy rewrite of the same length, which has more drift surface than deletion. The home page's existing About-teaser, hero CTA, and bottom Contact CTA already cover the candidate-side flow. The new section in R3 is the explicit full-time-search asset that takes its place.
- **Why no new internal links to /advisory after this spec:** advisory is now referral-only. Adding internal links would partly reintroduce the discovery surface this spec removes.
- **Trade-off accepted:** if Rob does want to surface advisory to a non-referral visitor in the future (e.g., a CEO he's never met who Googles "Rob Parker advisory"), they currently get there only via direct URL. Acceptable while job-hunting; revisit on landing.
- **Reversibility constraint:** every removal is a deletion of HTML and CSS that exists in the repo history — restoring nav/footer entries and the home section is mechanically straightforward. No data migrations, no third-party setup unwound.

## Requirements

### R1: Remove "Advisory" from the main nav (all pages)

Remove the `<li><a href="advisory.html">Advisory</a></li>` line from every shared `<ul class="nav-links">`. Locations (line numbers are pre-edit snapshots — locate by content, not line):

| File | Element | Pre-edit line |
|------|---------|---------------|
| `index.html` | `<li><a href="advisory.html">Advisory</a></li>` inside `.nav-links` | 65 |
| `about.html` | same | 65 |
| `resume.html` | same | 69 |
| `contact.html` | same | 68 |
| `advisory.html` | same (the advisory page also has a self-referencing nav link with `class="active" aria-current="page"` — implementer verifies whether to keep or remove) | 65 |

**On `advisory.html` specifically:** the page is reachable by direct URL but is no longer in the main nav. Keep the rest of the nav consistent (other pages still listed). Remove the self-referencing Advisory `<li>` so the nav is internally consistent across all pages. (If kept on `advisory.html` only, every other page's nav drops it but the advisory page's own nav keeps it — that asymmetry would be a code-review flag and visually inconsistent.)

After this requirement: nav order on every page is `Home · About · Resume · Contact` (four items).

### R2: Remove "Advisory" from the footer nav (all pages) — recommended

Remove the `<li><a href="advisory.html">Advisory</a></li>` from every shared `<ul class="footer-nav">`. Locations:

| File | Pre-edit line |
|------|---------------|
| `index.html` | 237 |
| `about.html` | 292 |
| `resume.html` | (verify; same `<ul class="footer-nav">` structure) |
| `contact.html` | 257 |
| `advisory.html` | (same) |

**Spec-Gate Q3:** Rob may prefer asymmetric treatment (nav clean, footer keeps Advisory). If Q3 = "keep in footer", the implementer skips R2.

### R3: Delete the home "How Rob Engages" section and replace it

**Delete:** the entire `<section class="section" aria-labelledby="services-heading">` block at `index.html:153-184`. That includes the H2 ("How Rob Engages"), the intro paragraph, and the full `.about-teaser` block routing to `/advisory.html` with the "Explore Advisory Engagements" button.

**Replace with:** a full-time-search CTA section. See Content Requirements R3a and R3b below for the recommended copy. The section sits in the same DOM position so the page rhythm is preserved (alt-band → content section → alt-band → CTA-dark).

**Markup pattern:** the new section must use the existing site primitives. Recommended structure (final structure decided by `frontend-developer` at implementation, with `ui-designer` review if non-trivial cascade interactions emerge):

```html
<!-- FULL-TIME ROLE CTA — replaces the deleted "How Rob Engages" section -->
<section class="section" aria-labelledby="ft-cta-heading">
    <div class="container">
        <div class="section-header">
            <h2 id="ft-cta-heading">{copy from R3a, line 1}</h2>
            <p>{copy from R3a, line 2 — short paragraph}</p>
        </div>
        <div class="cta-actions" style="justify-content:center">
            <a href="contact.html" class="btn btn-primary">{copy from R3a CTA label}</a>
        </div>
    </div>
</section>
```

The replacement section must NOT introduce a new CSS pattern. It reuses `.section`, `.container`, `.section-header`, `.cta-actions`, `.btn-primary` — all existing. If the inline `style="justify-content:center"` is not acceptable per `governance/stack-quirks.md`, the implementer adds a small modifier rule rather than introducing inline styles. (Architect-reviewer judgment at Arch Review.)

### R4: Rewrite the contact-page hero subheadline

**File:** `contact.html`
**Location:** `contact.html:84` — the `<p class="hero-subheadline">` inside `.contact-page-hero`.
**Current copy:** "If you are evaluating senior engineering leaders for a Director or VP of Engineering role, I would welcome the conversation. Advisory inquiries are also open. I reply within a few business days."
**Replace with:** see Content Requirements R4 below.

The H1 ("Get in Touch") and the response-time signal stay. The change is in how full-time and advisory are weighted in the subheadline.

### R5: No new internal links to /advisory

After this spec ships, no page in the candidate-facing flow points to `/advisory` other than direct-URL access. Implementer verifies during implementation that no new internal advisory link has been added in this spec or any concurrent work.

The advisory page is still listed in `sitemap.xml` if/when SPEC-013 generates one — that is intended (the page is a real, indexable page; we just don't surface it on the candidate site). SPEC-011 does not constrain SPEC-013's sitemap behavior.

### R6: Site-wide audit for residual advisory references

Implementer runs the following checks during implementation. Each must return either zero hits or a hit explicitly justified:

```
rg -n 'advisory.html' index.html about.html resume.html contact.html
rg -n 'Advisory' index.html about.html resume.html contact.html      # case-sensitive
rg -ni 'advisory' index.html about.html resume.html contact.html     # case-insensitive sweep
```

Expected post-edit state:
- Zero hits in `index.html`, `about.html`, `resume.html`, `contact.html` for `advisory.html` references in nav, footer, body, links, or scripts.
- Any case-insensitive hits remaining should appear ONLY in incidental contexts (e.g., a body paragraph that happens to use the word "advisory" in a non-link sense) and must be explicitly approved at Arch Review or QA.
- `advisory.html` itself remains untouched and continues to reference its own page (canonical, OG, etc.).

Hidden surfaces to also check during implementation:
- `js/main.js` — search for any pathname-based active-nav matching that includes `advisory.html`. Remove if present (the nav item no longer exists).
- `_headers` — confirm no advisory-specific header rules.
- No JSON-LD or structured data currently lists advisory; verify no SPEC-013 PR has landed first that introduces it.

### R7: Repository hygiene — commit reference docs and gitignore scratch directory

Three reference documents at the repo root are cited by SPEC-011/012/013/014 but are currently untracked. SPEC-011 commits them so downstream specs reference files that exist on `main`. A working-area directory is also gitignored.

**Files to commit (no edits — commit as-is):**

| File | Purpose | Cited by |
|------|---------|----------|
| `robcparker_com_audit.md` | Foundational site audit; the source of all four upcoming spec actions | SPEC-011 (action #2), SPEC-012 (action #3), SPEC-013 (action #4), SPEC-014 (action #5) |
| `OPERATOR-TODOS.md` | Operator-side todo list (out-of-codebase actions like LinkedIn About URL updates) | SPEC-013 (inbound-link acquisition follow-on), SPEC-014 (Q1 cleanup item, Q7 stale memory note) |
| `website_audit_prompt.md` | Provenance — the prompt used to generate `robcparker_com_audit.md` | Not cited by any spec; committed alongside the audit so the audit's origin is reproducible |

**Gitignore addition:**

Append the following pattern to `.gitignore` (existing structure preserves the `# WHY:` comment style):

```
# WHY: Working-area scratch for spec drafts (e.g., arch-review notes, design
# concept dumps). Tracked artifacts go under specs/ proper.
specs/scratch/
```

**Why R7 is in SPEC-011:**

- SPEC-011 is the first spec to cite `robcparker_com_audit.md` after SPEC-010 ships. If the audit is not on `main` when SPEC-011 lands, the spec references a file readers can't open from origin.
- All three reference docs are pre-existing, untouched files. The "commit" is a `git add` — no edits, no derivation, no review beyond confirming no secrets are present.
- The `.gitignore` addition is housekeeping in the same spirit (scope hygiene). Bundling avoids spinning up a separate trivial spec for two near-zero-cost actions.

**Pre-commit secrets check (implementer):** before `git add` of each file, grep for `password`, `secret`, `token`, `api_key`, `BEGIN PRIVATE KEY` (case-insensitive). Confirm zero hits before staging.

## Content Requirements

`marketing-copywriter` agent is invoked at implementation time to polish the copy. The following are PM-Spec drafts placed in this spec as the implementation requirement per `pm-spec.md` step 4 — implementation matches these unless the copywriter pass produces a tighter variant of equal-or-better fit, in which case the variant is approved at QA Gate.

### R3a — Home full-time-search section copy

**Recommended:**
- **H2 (headline):** *"Open to Senior Engineering Leadership Roles."*
- **Paragraph (1-2 sentences):** *"If you are evaluating Director, VP, or CTO of Engineering candidates for an AI-forward SaaS company, I would welcome the conversation. Tell me about the role and the team."*
- **CTA button label:** *"Get in Touch"*

**Alternative (Rob may prefer):**
- **H2:** *"Available for Director, VP, and CTO of Engineering Roles."*
- **Paragraph:** *"I'm actively exploring senior engineering leadership opportunities at AI-forward SaaS companies. If you are evaluating candidates for a role like that, let's talk."*
- **CTA button label:** *"Get in Touch"*

**Why:** the recommended H2 leads with "Open to" — confident without being overeager — and explicitly names Director/VP/CTO so a recruiter scanning the home page sees the role-level fit immediately. The paragraph asks the recruiter to disclose the role and team rather than sending them to a contact form cold; this is the same calibration used elsewhere on the site (Rob's voice: plainspoken, executive register). The alternative is more declarative and may suit Rob if he wants the candidate signal to be even more direct.

The CTA label "Get in Touch" matches the existing pattern at `index.html:215` and the about/contact CTA labels — no new CTA copy is introduced.

### R3b — Forbidden language

The replacement copy must NOT include:
- The words "fractional," "advisory," "consult," "consulting," "advise," or any variant
- Any reference to scoping calls, engagement types, or service offerings
- Any "let's partner to unlock" / "transform your team" marketing register
- Plural "leaders"/"executives" in a way that reads as service-style ("for engineering leaders looking to…")

### R4 — Contact-page hero subheadline copy

**Current:** "If you are evaluating senior engineering leaders for a Director or VP of Engineering role, I would welcome the conversation. Advisory inquiries are also open. I reply within a few business days."

**Recommended:** *"If you are evaluating senior engineering leaders for a Director, VP, or CTO of Engineering role at an AI-forward SaaS company, I would welcome the conversation. I reply within a few business days. Advisory inquiries by direct introduction only."*

**Alternative:** *"I'm actively exploring Director, VP, and CTO of Engineering opportunities at AI-forward SaaS companies — that's where most inbound is welcome. I reply within a few business days. Advisory inquiries by direct introduction only."*

**Why:**
- "Director, VP, or CTO" expands the scope versus "Director or VP" alone — matches Rob's actual scope (CTO is in his recent track record at Salesfusion).
- "AI-forward SaaS company" mirrors the About page line (`about.html:113`) — consistent positioning across the site.
- The advisory line is reduced to a single tail sentence, scoped to "direct introduction only" — preserves the accurate-information signal (advisory IS still possible) while removing the equal-weight framing that was the candidate-signal problem.
- "I reply within a few business days" is preserved verbatim.

### R3 / R4 marketing-copywriter pass

At implementation, `marketing-copywriter` is invoked with this spec attached. The copywriter is empowered to:
- Tighten the recommended H2 / paragraph / CTA label / subheadline to match Rob's existing voice
- Substitute Rob-voice synonyms (e.g., "open to" vs. "available for")
- Reject either the recommended OR the alternative if both feel off and propose a third variant within the constraints
- NOT change the underlying message: full-time search is primary; advisory is secondary, demoted, and referral-only

The copywriter does NOT have license to:
- Re-introduce nav/discovery treatment of advisory
- Add advisory-related CTAs anywhere on home or contact
- Lengthen R3 beyond ~2 sentences (the section is intentionally compact)

## Out of Scope

- Any modification to `advisory.html` itself (content, design, SEO, copy)
- Removing the advisory page from the file system
- Updates to `sitemap.xml` (handled in SPEC-013 as part of SEO foundation)
- Updates to `robots.txt` (handled in SPEC-013)
- `contact.html` head metadata (`<meta name="description">` line 9 and `<meta property="og:description">` line 19) — both contain advisory framing visible in Google SERPs and social-share previews. Handed off to SPEC-013 (SEO fundamentals) per Arch Review AG-2. SPEC-013 must rewrite both in alignment with R4's framing. SPEC-011 does not edit these lines, and QA does not gate on their state.
- The "About" page intro and "Off the Clock" sections — no copy change
- Footer disposition is recommended-include in R2 but configurable via Q3
- Removing references to advisory from internal-only repo files (CLAUDE.md, agent prompts, governance docs) — those are internal documentation, not user-facing
- LinkedIn About update by Rob (operator todo, not in repo)
- Re-design of the home page beyond the deletion + replacement section in R3 and the AG-1 R6-enumerated Contact CTA paragraph edit (see Arch Gate Amendment)

## Dependencies

- **SPEC-005 (complete):** `advisory.html` was built by SPEC-005 and is the page being delisted. No coupling to SPEC-005's structure other than knowing the page exists.
- **SPEC-007 (complete):** SPEC-007's nav structure is the surface SPEC-011 modifies (removing one `<li>`). No conflict.
- **SPEC-009 (complete):** SPEC-009's hero / section primitives are reused for R3's replacement section (`section`, `section-header`, `cta-actions`, `btn-primary`). No new primitives introduced.
- **No third-party services touched.** No external integrations, no API keys, no environment changes.

## Non-Functional Requirements

### Accessibility

- The shared nav after R1 still has four items — no accessibility regression. `aria-current="page"` markers continue to apply on Home/About/Resume/Contact pages.
- The R3 replacement section uses `aria-labelledby` matching the H2 id — same pattern as the rest of the page.
- The R4 contact-page subheadline maintains semantic `<p>` markup; no new ARIA needed.
- Skip-to-content link still functional on every page.

### SEO

- `advisory.html` itself is unchanged — its `<title>`, meta description, OG tags, and canonical remain intact. The page remains crawlable.
- `index.html`'s deletion of the "How Rob Engages" section reduces the home-page word count slightly. The R3 replacement section is shorter than what it replaces. Net SEO impact on the home page: marginal. The home page's primary SEO signals (title, meta, OG, hero copy) are unchanged.
- No changes to `<meta name="robots">`, no `noindex` introduced, no canonical changes.
- **Cross-spec interaction:** SPEC-013 (SEO fundamentals) will add Person schema, OG image production, and per-page metadata. SPEC-011 must not introduce any structured-data hint that conflicts with SPEC-013's planned Person schema (which references the LinkedIn URL via `sameAs`). SPEC-011 introduces no JSON-LD.

### Responsive

- The R3 replacement section uses `.section` + `.container` + the existing CTA-button stack — fully responsive at all SPEC-008/009 breakpoints.
- The contact-hero subheadline rewrite at R4 keeps the existing `.hero-subheadline` class — same responsive treatment as before.

### Performance

- Net byte reduction. Three deletions (nav `<li>` × 5 pages, footer `<li>` × 5 pages contingent on Q3, home section block) outweigh the small replacement section. No new CSS rules required.

## Acceptance Criteria

### Nav and footer

- **Given** the user lands on any page in `{index.html, about.html, resume.html, contact.html, advisory.html}`, **When** the main nav is rendered, **Then** the visible nav items are exactly `Home · About · Resume · Contact` (four items, no Advisory).
- **Given** the user is on `advisory.html`, **When** the main nav is rendered, **Then** the nav matches the four-item set used on every other page (no `class="active"` on a nav-listed item; the page is reachable but not nav-listed).
- **Given** the footer nav is rendered (R2 contingent on Q3), **When** Q3 = "remove from footer", **Then** the footer nav also reads `Home · About · Resume · Contact`.

### Home page section replacement

- **Given** the user loads `index.html`, **When** the page is read top to bottom, **Then** no section heading reads "How Rob Engages".
- **Given** the user loads `index.html`, **When** the section between the experience-highlights band and the about-teaser band is rendered, **Then** the new full-time-search section is present with:
  - An H2 communicating Rob is open to Director/VP/CTO of Engineering roles
  - A short paragraph (≤2 sentences) calibrating the invitation
  - A "Get in Touch" CTA routing to `contact.html`
- **Given** the user loads `index.html`, **When** the page text is searched, **Then** there is zero use of "advisory," "fractional," "consulting," or any variant.
- **Given** the home page CTA button, **When** clicked, **Then** the user lands on `contact.html`.

### Contact page subheadline

- **Given** the user loads `contact.html`, **When** the hero is rendered, **Then** the subheadline leads with full-time-role framing (Director/VP/CTO at AI-forward SaaS), maintains the response-time signal ("I reply within a few business days"), and demotes advisory to a single tail sentence framed as "direct introduction only".
- **Given** a recruiter compares the contact-page subheadline to the home-page R3 section, **When** both are read, **Then** the candidate-side framing is consistent across both pages.

### Site-wide cleanup

- **Given** the implementer runs `rg -n 'advisory.html' index.html about.html resume.html contact.html`, **When** R1, R2 (if Q3=remove), and R3 are applied, **Then** the search returns zero hits.
- **Given** `js/main.js` is inspected, **When** active-nav logic is read, **Then** there is no pathname matcher for `/advisory` or `advisory.html` (or the matcher exists but is dead code with a WHY comment explaining why it's retained).
- **Given** `advisory.html` itself, **When** opened in a browser via direct URL, **Then** the page renders normally — no broken styles, no broken nav, no JS errors. Direct sharing still works.

### Reversibility

- **Given** the diff produced by SPEC-011, **When** reviewed for revert risk, **Then** all changes are mechanical deletions or copy edits that can be reverted from git history with no data migration, no asset re-creation, and no third-party reconfiguration.

### Repository hygiene (R7)

- **Given** SPEC-011 has shipped, **When** `git ls-files` is run from repo root, **Then** `OPERATOR-TODOS.md`, `robcparker_com_audit.md`, and `website_audit_prompt.md` appear as tracked files.
- **Given** SPEC-011 has shipped, **When** the contents of `.gitignore` are inspected, **Then** a `specs/scratch/` entry is present with a `# WHY:` comment matching the existing style.
- **Given** SPEC-011 has shipped, **When** any file is created under `specs/scratch/`, **Then** `git status` does NOT list it as untracked.
- **Given** the implementer's pre-commit secrets grep, **When** run against the three reference docs before staging, **Then** zero hits are returned for `password`, `secret`, `token`, `api_key`, `BEGIN PRIVATE KEY` (case-insensitive).

## Tier Selection — Standard

**Tier:** Standard. Per `governance/tier-selection-guidelines.md`:

| Trigger | Applies? | Notes |
|---------|----------|-------|
| Authentication / authorization changes | No | None |
| Payment or financial data | No | None |
| PII / PHI handling | No | None |
| New external API integration | No | None |
| Database schema change | No | None |
| Core domain model modification | No | Pure copy + nav structure |
| Framework or platform migration | No | None |
| First implementation of new architectural pattern | No | All primitives reused |

**Decision flow:**
1. Does it change any code paths? Yes — HTML structure on five pages, copy on two pages.
2. Does it follow existing patterns? Yes — uses existing nav, section, CTA primitives. Limited scope.
3. Does it affect multiple components or introduce new patterns? Touches multiple pages but no new patterns. Standard.

**Tier rationale:** SPEC-011 touches five HTML files (nav/footer changes), restructures one page (home), and rewrites one piece of copy (contact subheadline). It also has positioning consequences that warrant a Decision Rationale. CLAUDE.md classifies "Styling/layout changes" as "Trivial or Standard" and SPEC-011 is on the Standard side because (a) multiple pages are touched and (b) the home-page section restructure has visual rhythm consequences worth `ui-designer` review.

## Open Questions — Resolved at Spec Gate (2026-04-25)

| # | Question | Resolution |
|---|----------|------------|
| Q1 | R3 H2 copy. | **Confirmed: "Open to Senior Engineering Leadership Roles."** Marketing-copywriter polishes at implementation. |
| Q2 | Self-referencing nav link on `advisory.html`. | **Confirmed: remove (symmetric).** Five-page nav consistency. |
| Q3 | Footer nav disposition. | **Confirmed: remove Advisory from footer too.** R2 executes. |
| Q4 | R4 advisory tail-sentence wording. | **Confirmed: "Advisory inquiries by direct introduction only."** |
| Q5 | Home hero CTA addition (tertiary "Get in Touch"). | **Confirmed: out of scope for SPEC-011.** Captured in `specs/backlog.md` as a future trivial spec. |
| Q6 | Second `.about-teaser` block disposition. | **Confirmed: preserve.** Routes to About, not advisory. |
| Q7 | Home page rhythm after deletion. | **Confirmed: defer to ui-designer at Arch Review** — recommended cream (non-alt) background to maintain alt → cream → alt → cta-dark rhythm. |
| Q8 | Marketing-copywriter invocation timing. | **Confirmed: at implementation.** R3a / R4 are the implementation anchor; copywriter tightens for voice. Final copy approved at QA Gate. |

## Effort Comparison

| | AI-Assisted | Human Solo |
|---|---|---|
| Spec creation | ~50 minutes wall-clock (audit pre-read; current-state file inspection across 5 HTML files; copy drafting per Rob's voice; ambiguity surfacing for Q1-Q8; tier checklist) | 4–6 hours (PM would need: audit absorption, the strategic case for Option A vs. B/C, current-state mapping across five pages, copy drafting + review, AC writing, ambiguity surfacing — sequential and content-heavy). |
| Assumptions | Audit Option A pre-accepted by Rob. Marketing-copywriter pass treated as implementation polish, not gating. SPEC-009 design primitives stable. No new design tokens or breakpoints introduced. |

---

## Spec-Gate Approval

**Decision:** Approved 2026-04-25
**Gate owner:** Rob Parker
**Approval note:** All eight clarification questions resolved (see table above). Q3 = remove Advisory from footer (R2 executes). Q5 hero-CTA recommendation captured as a future trivial spec in `specs/backlog.md`. All other Qs confirmed as recommended by the PM agent. Spec advances to Architecture Review.

### Structured Review Checklist

- [x] Business intent confirmed (audit Option A — advisory off the main path)
- [x] Scope boundaries clear (advisory page itself untouched; only delisting, home replacement, contact subheadline)
- [x] Acceptance criteria testable (Given/When/Then; site-wide cleanup grep checks; reversibility check)
- [x] Dependencies identified (SPEC-005 / SPEC-007 / SPEC-009)
- [x] Tier appropriate (Standard — multiple pages touched, copy + nav, design rhythm consequences)
- [x] No mandatory escalation triggers (no auth, payments, PII, integrations, DB, framework)
- [x] Third-party features verified (none introduced; advisory page itself unchanged)
- [x] Decision Rationale section included
- [x] Marketing-copywriter invocation flagged (implementation-time, with R3a / R4 drafts as anchor)

### Spec-Gate Amendment 2026-05-01 — R7 added

**Decision:** Approved 2026-05-01
**Gate owner:** Rob Parker
**Triggered by:** SPEC-010 implementation surfaced 17 untracked items in the working tree. Audit (this conversation) found three reference docs cited by SPEC-011/012/013/014 with no spec owning their commit, plus a working-area scratch directory that should be gitignored.
**Amendment scope:**
- Added R7 (Repository hygiene) covering: commit `OPERATOR-TODOS.md`, `robcparker_com_audit.md`, `website_audit_prompt.md`; add `specs/scratch/` to `.gitignore`.
- Updated Summary count "six items" → "seven items".
- Added Acceptance Criteria block "Repository hygiene (R7)".
- Tier unchanged (Standard) — R7 adds no new code paths, no behavioral surface, no new dependencies. Pure repo hygiene.
**Why amend rather than spin a separate trivial spec:** R7 is load-bearing for SPEC-011 itself (the audit it cites needs to be on `main` when SPEC-011 lands) and for the other three downstream specs. A separate trivial spec would create a sequencing constraint for no benefit. Bundle.
**Why not in SPEC-010:** SPEC-010 is "resume site reconciliation" — the three reference docs and gitignore tidy are not in scope. SPEC-010 PR is already open (PR #11); polluting it would violate scope discipline.

---

## Architecture Review

**Reviewer:** architect-reviewer agent (specialist) via sdd/architect-review pipeline agent
**Date:** 2026-05-01
**Recommendation:** Approve with conditions (8 IG items + 3 AG decisions)
**Pen-tester:** Not invoked (Standard tier; no auth/payment/PII/external-API/integration surface; R7 reference docs grep'd zero hits for `password|secret|token|api_key|BEGIN PRIVATE KEY|aws_access_key|bearer`)

### Validation summary

- Project principles upheld: static-first, progressive enhancement (R3 markup is plain HTML; no JS dependency), WCAG 2.1 AA (semantic section + aria-labelledby preserved; nav reduces from 5 to 4 items, no a11y regression), no-build-tools (zero new tooling, zero dependencies).
- File/line citations cross-checked end-to-end against current state of all five HTML files. Spec line numbers all accurate (R1 nav `<li>` cites: index 65, about 65, resume 69, contact 68, advisory 65; R2 footer cites: index 237, about 292, contact 257, plus resume 344 and advisory 264 confirmed; R3 home section: index 153-184; R4 contact subheadline: contact 84). No drift since spec authoring.
- CSS primitive scan: `.section` (style.css:822), `.section-alt` (826), `.section-dark` (837), `.section-header` (842), `.container` (297), `.cta-actions` (1339, with `justify-content: center` baked in at 1343), `.btn-primary` (363) all confirmed. R3's recommended markup composes correctly from existing primitives — no new CSS rule required, no new tokens introduced.
- Q7 alt-band rhythm: spec's `class="section"` (no `-alt` modifier) for R3 preserves `hero → alt → cream → alt → dark` after deletion of "How Rob Engages." **Q7 closed at this gate; no further ui-designer pass required for this spec** (see IG-7).
- WHY-comment scan across edit targets: no edit overlaps a `// WHY:` line in HTML. R3 reuses the existing `.about-teaser` precedent (`index.html:163-165` WHY note) only by composition, not by extension.
- `js/main.js` scan: `initActiveNav` matches by `href` against `location.pathname` generically; no advisory-specific code path. With the `<li>` removed from every nav, `initActiveNav` no-ops cleanly on `advisory.html` (which already has no `class="active"` set inline). **No JS edit required** (see IG-4); R6's "active-nav matcher for advisory" expectation is satisfied a priori.
- `_headers` scan: no advisory-specific header rules; no edit required.
- JSON-LD scan: zero hits site-wide; no structured data to neutralize. Cross-spec note for SPEC-013 unchanged.
- R6 baseline grep against current state: ten in-scope `advisory.html` literal hits across the four candidate-side pages will be eliminated by R1/R2/R3. Three additional case-insensitive `advisory` hits exist that R6's expected-state criterion forces this gate to either neutralize-via-amendment or explicitly approve — see AG-1 / AG-2 below.
- R7 reference docs (`OPERATOR-TODOS.md` 14KB, `robcparker_com_audit.md` 28KB, `website_audit_prompt.md` 6KB): zero hits on the secrets grep pattern. Files structurally clean for commit.
- `specs/scratch/` already contains `SPEC-008-arch-review/` and `SPEC-008-favicon-concepts/` working directories — both untracked. Adding the `.gitignore` rule will not orphan any tracked file (see IG-6 for verification step).
- Reversibility AC satisfiable: all R1-R6 changes are mechanical deletions or copy substitutions recoverable from git history. R7's commits revert via `git rm` on three plain markdown files; the gitignore rule is one-line revertible. No data migration, no third-party state change, no asset regeneration.

### Implementation Guidance

| ID | Item |
|---|---|
| IG-1 | **Drop the redundant inline `style="justify-content:center"` from R3's example markup.** `.cta-actions` already centers (style.css:1343). The spec authored the inline override defensively without checking the existing rule. The implementation must use `<div class="cta-actions">` without inline style — keeps the codebase free of an inline-style precedent it otherwise avoids. (See architect-reviewer's deviation note.) |
| IG-2 | **Keep `id="ft-cta-heading"` for R3's H2.** Verified: no collision with the existing `cta-heading` on the contact-CTA section at `index.html:210`. Implementer must not consolidate or "tidy" the id during refactor. |
| IG-3 | **Nav and footer byte-equality check across the five files.** R1/R2 are five-file hand-copy edits. After applying the edits, compute a structural diff (or `sha1sum`) of the `<ul class="nav-links">` block across `index.html`, `about.html`, `resume.html`, `contact.html`, `advisory.html`; same for `<ul class="footer-nav">`. Any divergence is a defect. Make this gating at QA, not advisory. |
| IG-4 | **No `js/main.js` edit required.** `initActiveNav` matches by href generically; with the advisory `<li>` removed everywhere, the matcher no-ops cleanly on `advisory.html`. R6's "active-nav matcher for advisory" check passes by construction. Document this in the QA closure (no JS diff expected for this spec). |
| IG-5 | **R7 secrets grep is gating, not advisory.** Implementer reruns `rg -ni 'password\|secret\|token\|api[_-]?key\|BEGIN PRIVATE KEY\|aws_access_key\|bearer'` against the three reference docs immediately before `git add`. Treat any hit as a hard stop on R7 commits. (Architect-review pre-check confirmed zero hits at gate time, but content can drift between gate and implementation if Rob touches the files.) |
| IG-6 | **Pre-add tracked-file check for `specs/scratch/`.** Before adding the `.gitignore` rule, run `git ls-files specs/scratch/` and confirm zero output. If anything is tracked under that path today, the `.gitignore` rule alone will not ignore it — implementer must `git rm --cached` first or escalate the conflict. (Pipeline pre-check found only untracked content; making this an implementer-time guard against drift.) |
| IG-7 | **Q7 (home page rhythm after deletion) is closed at this gate.** `class="section"` (cream / no `-alt`) is correct and preserves `hero → alt → cream → alt → dark`. No standalone ui-designer pass required for this spec. QA should not reopen Q7. |
| IG-8 | **PR commit ordering for reviewability.** Recommended sequence within the SPEC-011 PR: (1) R7 commits first — three reference doc additions and the `.gitignore` line, each independently reversible; (2) R1/R2 — nav and footer five-file edits as one commit (or one per file if reviewer prefers); (3) R3 — home section deletion + replacement; (4) R4 — contact subheadline; (5) any AG-1/AG-2 amendments last. This ordering keeps each step independently revertible if QA surfaces an issue. |

### Arch Gate Decisions Required (Rob)

| ID | Decision | Options | Recommendation |
|---|---|---|---|
| AG-1 | **Residual #1 — `index.html:212-213` Contact CTA copy.** Current text inside the preserved "Let's Talk" CTA section (lines 207-217): *"If you are evaluating engineering leadership candidates or exploring an advisory engagement, Rob is open to the conversation. Reach out directly."* This is on the home page in the bottom CTA — exactly the surface a recruiter scans last before deciding to engage. R6's expected-state criterion forces this to be either neutralized in this spec or explicitly approved as an "incidental context." | (a) **Amend SPEC-011 with an R6 copy edit** — drop the "or exploring an advisory engagement" clause; rewrite the CTA paragraph to match R3/R4's full-time framing (marketing-copywriter polish at implementation alongside R3a/R4 work). (b) Defer to a follow-on trivial spec. (c) Accept as-is. | **(a)** — load-bearing for the spec's stated intent. The phrase reintroduces equal-weight advisory framing on the home page that R3 is correcting one section above. Trivial copy edit; the alternative ships a home page that contradicts itself. (Architect-reviewer's strong recommendation.) |
| AG-2 | **Residuals #2 and #3 — `contact.html` meta description (line 9) and og:description (line 19).** Both contain advisory framing visible to recruiters in Google SERPs and social-share previews. Spec scope says "Updates to sitemap.xml/robots.txt deferred to SPEC-013" but is silent on per-page metadata, which SPEC-013 (SEO fundamentals) is also planning to rewrite. | (a) Amend SPEC-011 with metadata copy edits paired to R4. (b) **Explicit handoff to SPEC-013** — record both lines in SPEC-011's Out of Scope section with a cross-reference note that SPEC-013 must rewrite them in alignment with R4's framing. (c) Accept as-is. | **(b)** — SPEC-013 is already rewriting per-page metadata; pulling these two lines into SPEC-011 expands scope without architectural benefit and risks drift if SPEC-013 later wants different framing. The handoff must be **explicit** (recorded in Out of Scope), not implicit, so SPEC-013's PM-Spec stage cannot miss it. (Architect-reviewer offered (a) as the load-bearing alternative; (b) is acceptable only if the handoff is written down.) |
| AG-3 | **R7 strategic-content public-readability.** The three reference docs are now untracked but committing them makes them readable by anyone who clones the repo (and any future fork). `robcparker_com_audit.md` candidly discusses positioning ("hedging," candidate-signal damage, audit Option A reasoning); `OPERATOR-TODOS.md` enumerates operator-side work. Zero secrets, but the content is strategic/internal. The repo is currently private but is structured for eventual public-readability (no `_secrets/`-style segregation pattern). | (a) **Acknowledge and ship as-public** — the audit's candor is an asset, not a liability; "I run a structured audit on my own positioning" reads as professionally credible. (b) Move all three to a gitignored `governance/private/` path and reference them by stub (cited specs lose external-readable provenance). (c) Move to a separate private notes repo and reference by URL. | **(a)** — Rob's call. Architect-reviewer raised this as a condition rather than a blocker because the security risk is zero and the reputational read is plausibly net-positive. If Rob disagrees, R7 routes to (b) and the cited specs lose nothing functional (they still cite a path — it's just gitignored). |

### Risks

| Risk | Severity | Likelihood | Mitigation |
|---|---|---|---|
| Five-file nav/footer hand-copy drift (one file's nav diverges from the rest after edits) | Medium (visual + a11y inconsistency, slips QA if not checked) | Medium without IG-3; Low with IG-3 | IG-3 (gating byte-equality check) |
| Home page contradicts itself if AG-1 deferred (R3 rewrites "How Rob Engages" to full-time framing while CTA below still pitches advisory) | Medium (defeats the spec's candidate-signal correction on the very page R3 is fixing) | Medium without AG-1 amendment; near-zero with | AG-1 = (a) |
| Search-result snippets keep advisory framing into SPEC-013 timeline if AG-2 handoff is implicit | Low (SERP impressions are slow-moving; SPEC-013 will fix) | Medium without recorded handoff; Low with | AG-2 = (b) with explicit Out-of-Scope amendment |
| `specs/scratch/` rule lands while a tracked file lives under that path (footgun: rule appears to ignore but doesn't) | Low | Very low (pre-check found none) | IG-6 (pre-add `git ls-files` guard) |
| R7 reference docs are committed with content drift (Rob edits between gate and implementation) reintroducing secrets-grep risk | Low | Low | IG-5 (re-grep at implementation time) |
| `.cta-actions` inline-style precedent ships if IG-1 missed (introduces a pattern the codebase otherwise avoids) | Low (one inline style; easy to revert later) | Low with IG-1 surfaced | IG-1 |

### Effort Comparison

| | AI-Assisted | Human Solo |
|---|---|---|
| Architecture Review | ~25 minutes wall-clock (full spec read; line/file verification across all 5 HTML files; CSS primitive scan; `.cta-actions` rule confirmation; R6 baseline grep across HTML/JS/_headers; R7 secrets grep on three docs; `specs/scratch/` tracked-file check; `js/main.js` `initActiveNav` read; architect-reviewer specialist invocation; synthesis with three residual findings; IG/AG drafting) | 90–150 minutes (read spec; open all 5 HTML files and verify each line citation; open `css/style.css` and read for primitives; open `js/main.js` and reason about `initActiveNav` interaction; open `_headers`; run rg checks manually; secrets-grep three large markdown docs; check `specs/scratch/` state; reason about Q7 rhythm against existing band sequence; identify three residuals independently; draft IG/AG list; write Risk/Effort tables) |
| Assumptions | Reviewer had full repo access, Spec-Gate-and-amendment-approved spec, all governance docs (`solo-operator-model.md`, `stack-quirks.md`), the architect-reviewer specialist's structured second-eye output, and the three reference docs in their current untracked state. CSS primitive ownership confirmed at exact line numbers. `initActiveNav` traced end-to-end. Three residuals independently surfaced by lead, then confirmed by specialist as load-bearing. Pen-tester not invoked: no auth/payment/PII/external-API surface; R7 secrets-grep handled inline. |

### Arch Gate Decisions (2026-05-01)

| ID | Decision | Rob's resolution |
|---|---|---|
| AG-1 | Address residual #1 (`index.html:212-213` Contact CTA copy)? | **(a) Amend SPEC-011** with an R6 copy edit dropping the "or exploring an advisory engagement" clause and rewriting to full-time framing. *Rationale: load-bearing for the spec's stated intent — without the amendment, the home page would carry R3's full-time-only message in the middle of the page and an advisory-equal-weight pitch in the bottom CTA, contradicting itself one section away. Trivial copywriter work alongside R3a/R4. See R6 Enumeration amendment below.* |
| AG-2 | Address residuals #2 and #3 (`contact.html` meta description and og:description)? | **(b) Explicit handoff to SPEC-013** — recorded in this spec's Out of Scope section with a cross-reference note that SPEC-013 must rewrite both lines in alignment with R4's framing. *Rationale: SPEC-013 (SEO fundamentals) is already planning to rewrite per-page metadata; pulling these into SPEC-011 expands scope without architectural benefit. The handoff is written down (not implicit) so SPEC-013's PM-Spec stage cannot miss it. See SPEC-013 Handoff amendment below.* |
| AG-3 | R7 strategic-content public-readability acknowledgment for the three reference docs? | **(a) Acknowledge and ship as-public.** *Rationale: zero secrets, content is candid about positioning in a way that reads as professional credibility ("structured audit on own positioning"). Repo is currently private but structured for eventual public-readability; no segregation pattern needed.* |

### Arch Gate Approval

**Decision:** Approved 2026-05-01
**Gate owner:** Rob Parker
**Approval note:** All three AG decisions resolved as recommended (AG-1 = (a), AG-2 = (b), AG-3 = (a)). All eight IG items binding for the Implementer-Tester stage. Pen-tester non-invocation confirmed (Standard tier; no auth/payment/PII/external-API surface; R7 secrets-grep handled inline at gate). Spec advances to Implementation, with two pre-implementation amendments locked below: (1) R6 Enumeration — the verbatim AG-1 copy edit anchor for `index.html:210-214`; (2) SPEC-013 Handoff — the explicit cross-reference covering `contact.html:9` and `contact.html:19`.

### Arch Gate Amendment 2026-05-01 — R6 Enumeration (AG-1)

Per AG-1 = (a), R6 is enumerated to include a specific copy edit on the home-page Contact CTA section that the original spec preserved unmodified.

**Target:** `index.html:208-217` — the `<section class="section section-dark cta-section" aria-labelledby="cta-heading">` block.

**Specifically the paragraph at `index.html:211-214`:**

```html
<p>
    If you are evaluating engineering leadership candidates or exploring an
    advisory engagement, Rob is open to the conversation. Reach out directly.
</p>
```

**Replacement (PM-Spec anchor — marketing-copywriter polish at implementation):**

```html
<p>
    If you are evaluating senior engineering leadership candidates for a
    Director, VP, or CTO of Engineering role, Rob is open to the conversation.
    Reach out directly.
</p>
```

**Constraints inherited from R3b (forbidden language):** no "advisory," "consult," "consulting," "fractional," "advise" or any variant; no scoping-call / engagement-type / service-offering language; no "let's partner to unlock" register; no plural "leaders/executives" in service-style framing.

**Surrounding markup unchanged:** `<h2 id="cta-heading">Let's Talk</h2>` stays as-is; `<a href="contact.html" class="btn btn-white">Get in Touch</a>` stays as-is. Only the paragraph text is replaced.

**Acceptance Criteria addition (folded into R6 / Site-wide cleanup AC):**
- **Given** the user loads `index.html` and reads through the bottom Contact CTA section, **When** the paragraph between the H2 ("Let's Talk") and the CTA button ("Get in Touch") is rendered, **Then** there is zero use of "advisory," "consult," "fractional," or any variant; the framing matches R3's full-time-search positioning at the role level (Director/VP/CTO of Engineering).

**Marketing-copywriter latitude:** the copywriter at implementation may tighten the recommended replacement to match Rob's voice, may substitute role-name synonyms within the Director/VP/CTO scope, and may shorten if the H2 + paragraph + button reads tight together. The copywriter does NOT have license to reintroduce advisory, expand the role list beyond Director/VP/CTO of Engineering, or extend the paragraph beyond two sentences.

### Arch Gate Amendment 2026-05-01 — SPEC-013 Handoff (AG-2)

Per AG-2 = (b), the two `contact.html` head metadata lines are out of scope for SPEC-011 but are explicitly handed off to SPEC-013 (SEO fundamentals) so the candidate-signal correction propagates to SERP snippets and social-share previews when SPEC-013 ships.

**Lines handed off:**

| File | Line | Current value | Required SPEC-013 disposition |
|---|---|---|---|
| `contact.html` | 9 | `<meta name="description" content="Reach Rob Parker to discuss Director or VP of Engineering roles or advisory engagements. He replies to relevant inquiries within a few business days.">` | Rewrite in alignment with R4's framing — Director/VP/CTO of Engineering at AI-forward SaaS company; advisory by direct introduction only (or omitted from the meta description entirely if SPEC-013 prefers a tighter snippet). |
| `contact.html` | 19 | `<meta property="og:description" content="Rob Parker is actively exploring Director and VP of Engineering roles at AI-forward SaaS companies. Advisory inquiries are welcome. Reach out via the contact form or LinkedIn.">` | Rewrite to remove "Advisory inquiries are welcome" or demote to "by direct introduction only" matching R4. Expand role list to include CTO if SPEC-013's per-page positioning aligns. |

**SPEC-011 obligations:** none beyond recording the handoff. SPEC-011 implementer does not edit these lines; QA does not gate on their state.

**SPEC-013 obligations:** PM-Spec stage for SPEC-013 must verify these two lines are still present (in case the project-state has drifted) and produce replacement copy aligned with R4. Architecture Review for SPEC-013 must confirm the rewrites are not reintroducing equal-weight advisory framing on candidate-facing surfaces.

**Out of Scope addendum (to be applied to the spec body's Out of Scope section by the implementer, OR understood as authoritative here):**

> - `contact.html` head metadata (`<meta name="description">` line 9 and `<meta property="og:description">` line 19) — both contain advisory framing. Handed off to SPEC-013 (SEO fundamentals) per AG-2 of this spec's Architecture Review. SPEC-013 must rewrite in alignment with R4's framing. SPEC-011 does not edit these lines.

**Cross-reference for backlog:** the SPEC-013 backlog entry should be updated to reference this handoff so the SPEC-013 PM-Spec stage starts with the constraint baked in.

---

## Pre-Implementation String Lock (2026-05-01)

Per Architecture Review IG-pattern (mirrors SPEC-010 LOCK convention), the verbatim final strings for R3a, R4, and the AG-1 amendment are locked here before any HTML edits begin. The frontend-developer pastes these strings character-for-character into the HTML; QA verifies byte-equality at close.

**Author:** marketing-copywriter agent (specialist) via sdd/implementer-tester pipeline. **Reviewed and locked by:** Rob Parker (gate close 2026-05-01).

### LOCK-1 — `index.html` R3a home full-time-search section

Replaces the deleted `<section class="section" aria-labelledby="services-heading">` block (`index.html:153-184`).

| Slot | Locked text |
|---|---|
| H2 (id `ft-cta-heading`) | `Open to Senior Engineering Leadership Roles.` |
| Paragraph | `If you are evaluating Director, VP, or CTO of Engineering candidates for an AI-forward SaaS company, I would welcome the conversation. Tell me about the role and the team.` |
| CTA button label | `Get in Touch` |
| CTA href | `contact.html` |
| CTA classes | `btn btn-primary` |

**Markup template (apply verbatim, no inline style per Arch Review IG-1):**

```html
<section class="section" aria-labelledby="ft-cta-heading">
    <div class="container">
        <div class="section-header">
            <h2 id="ft-cta-heading">Open to Senior Engineering Leadership Roles.</h2>
            <p>If you are evaluating Director, VP, or CTO of Engineering candidates for an AI-forward SaaS company, I would welcome the conversation. Tell me about the role and the team.</p>
        </div>
        <div class="cta-actions">
            <a href="contact.html" class="btn btn-primary">Get in Touch</a>
        </div>
    </div>
</section>
```

### LOCK-2 — `contact.html:84` R4 hero subheadline

Replaces the entire `<p class="hero-subheadline">…</p>` element on line 84.

| Slot | Locked text |
|---|---|
| Subheadline (full text inside `<p class="hero-subheadline">`) | `If you are evaluating Director, VP, or CTO of Engineering candidates for an AI-forward SaaS company, I would welcome the conversation. I reply within a few business days. Advisory inquiries by direct introduction only.` |

**Markup edit:** text-only inside the existing `<p class="hero-subheadline">` element. No new spans, no `<br>`, no class changes.

### LOCK-3 — `index.html:211-214` AG-1 home bottom Contact CTA paragraph

Replaces only the `<p>` paragraph text inside the existing `<section class="section section-dark cta-section" aria-labelledby="cta-heading">` block. The H2 ("Let's Talk") and the CTA button ("Get in Touch") are unchanged.

| Slot | Locked text |
|---|---|
| Paragraph (full text inside `<p>`) | `If you are evaluating senior engineering leadership candidates for a Director, VP, or CTO of Engineering role, Rob is open to the conversation. Reach out directly.` |

**Markup edit:** text-only inside the existing `<p>` element nested in the dark CTA section. Whitespace-formatting inside the `<p>` (the original spans three lines) may match the existing indentation pattern but the textual content must be character-equal to the locked string above.

### Cross-slot consistency

A recruiter scanning the home page top-to-bottom hits LOCK-1 first ("Open to Senior Engineering Leadership Roles.") and LOCK-3 last ("Reach out directly."). LOCK-1 invites detail ("Tell me about the role and the team."); LOCK-3 closes with a direct action. LOCK-2 (contact page subheadline) reuses LOCK-1's opening clause verbatim ("evaluating Director, VP, or CTO of Engineering candidates for an AI-forward SaaS company") so the framing carries from home to contact without register shift.

### Implementation notes (binding)

- **No marketing-copywriter re-pass at QA.** Strings are locked; QA verifies byte-equality only.
- **Forbidden language audit (R3b) at QA:** confirm zero use of "advisory," "consult," "consulting," "fractional," "advise," any variant in the three locked strings (LOCK-1/2/3) and across `index.html` body and `contact.html` body. Note: LOCK-2 retains the word "Advisory" in the closing sentence ("Advisory inquiries by direct introduction only.") — this is the *demoted* mention confirmed at Spec Gate Q4 and is in-spec, not a violation.
- **No inline `style="…"` on R3a's `.cta-actions`** (IG-1) — `.cta-actions` already centers via `css/style.css:1343`.
- **Heading id `ft-cta-heading` (IG-2)** — no collision with existing `cta-heading` on the bottom CTA section.

---

*Drafted 2026-04-25 from `robcparker_com_audit.md` Prioritized Action #2 (audit lines 286-294). R7 added 2026-05-01 to capture repo hygiene surfaced during SPEC-010 close-out. Architecture Review appended 2026-05-01. Arch Gate approved 2026-05-01 with AG-1 / AG-2 amendments locked. Pre-Implementation String Lock appended 2026-05-01.*
