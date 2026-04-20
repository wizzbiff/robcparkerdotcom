# SPEC-005: Tech Advisory Page

**Status:** QA Gate approved — ready for Commit/PR (deployment deferred per project policy)
**Tier:** Standard
**Author:** PM-Spec Agent
**Date:** 2026-04-19
**Branch:** `spec/SPEC-005-tech-advisory` (to be created at implementation start)

---

## Summary

Build the Technical Advisory page (`services/tech-advisory.html`) replacing the current placeholder. The page describes the advisory engagements Rob offers to technology companies and startups that need senior engineering perspective without a full-time executive commitment — positioned as a **secondary** offering alongside Rob's primary Director/VP of Engineering search.

## Context

SPEC-001 scaffolded the page as a `noindex` placeholder with shared chrome wired. SPEC-002 (About), SPEC-003 (Resume), and SPEC-004 (Contact) are complete — the design system, headshot asset, and contact form are all available for reuse.

The home page (`index.html`) already introduces advisory in its "How Rob Engages" section: engagements range from "architecture reviews and team assessments to ongoing advisory relationships — tailored to where your organization is and where it needs to go." This spec delivers the depth page behind that teaser.

**Positioning constraint (non-obvious):** Per active project context, Rob's primary intent is a Director/VP of Engineering role at an AI-forward SaaS company. Advisory is a legitimate secondary offering but must not dilute the FT hiring signal or imply Rob is turning away from permanent leadership roles. The page's tone, calibration, and CTAs need to reflect that hierarchy — advisory is *open*, not *sought after*.

The engagement types are grounded in Rob's proven track record (drawn from `files/rob-parker-resume.pdf` and `files/LinkedInProfile.pdf`): AI platform strategy (AWS Bedrock, multi-tenant, RAG/agentic), AI adoption frameworks (three-tier model with measured 20% developer velocity gain), cloud and microservices modernization (350% throughput, 25% cost reduction), M&A technical due diligence and post-acquisition integration (Salesfusion → SugarCRM, 12 weeks, zero churn), and scaling engineering organizations (150% growth, 90% retention).

## Requirements

### Page Structure

The page flows in this order:

1. **Hero / Positioning** — Heading + framing paragraph + availability signal
2. **Who This Is For** — Short qualifying paragraph describing the target client
3. **Engagement Types** — Card/grid of the specific advisory formats Rob offers, each grounded in a proven capability
4. **Why Rob** — Brief credibility section with 3-4 metric callouts (reusing resume themes)
5. **How It Works** — Light-weight process description (intake → scoping → engagement cadence)
6. **CTA Section** — Single CTA routing to the Contact page

No headshot on this page — the About page owns the profile narrative. No testimonials or case studies in this spec (see Out of Scope).

### Section 1: Hero / Positioning

- **Layout:** Reuse the existing hero pattern (text-only variant — no photo, no stats). Same shell as SPEC-004's Contact hero.
- **Heading:** H1 — "Technical Advisory" or copywriter-preferred variant
- **Framing paragraph:** 2-3 sentences. Plainly states what the service is and who it's for. Leads with the substance (AI-native SaaS platform strategy, scaling, M&A integration) rather than generic "fractional CTO" language.
- **Availability signal:** One short sentence calibrating expectations — e.g., "Selective engagements alongside my primary focus on full-time leadership roles." Exact wording deferred to marketing-copywriter; must not sound reluctant or discouraging.

### Section 2: Who This Is For

- **Section heading:** "Who I Work With" (or copywriter-preferred)
- **Content:** 1-2 short paragraphs describing the ideal client. Should surface:
  - **Stage:** Seed through growth-stage SaaS companies, or later-stage companies with specific inflection points (post-acquisition, modernization, AI platform build-out)
  - **Problem shapes:** Leadership teams weighing an AI platform investment, companies integrating a recent acquisition, engineering orgs scaling past the point where informal processes work, leaders planning cloud/microservices modernization
  - **Not a fit (implicit):** Generic "help me hire engineers" work or role-backfill consulting is out of scope — the page should make the reader self-select
- **Voice:** First-person (Rob speaking). Concise.

### Section 3: Engagement Types

Present 4-5 engagement formats as cards or a structured grid. Reuse the `services-grid` / `service-card` pattern from the home page if it fits; fork only if needed. Each card contains:

- **Title** (h3)
- **Short description** (2-3 sentences)
- **Typical duration/cadence** (one line)
- **Primary outcome** (one line — what the client walks away with)

Proposed engagement types (final set to confirm at Spec Gate — see C-2):

1. **AI Platform & Adoption Strategy**
   - Focus: AI-native platform architecture, RAG/agentic workflow design, AI adoption frameworks, GAI tool governance
   - Grounding: AWS Bedrock multi-tenant AI platform build-out; three-tier AI adoption framework with measured 20% developer velocity gain
   - Typical cadence: Discrete 4-8 week engagement or ongoing monthly advisory

2. **Architecture & Modernization Review**
   - Focus: Cloud-native architecture assessment, microservices/serverless migration strategy, scalability and cost optimization
   - Grounding: .NET monolith → Python microservices + AWS serverless modernization (350% throughput, 25% cost reduction)
   - Typical cadence: 2-4 week discrete engagement with deliverable report

3. **M&A Technical Due Diligence & Integration**
   - Focus: Pre-acquisition technical due diligence, post-acquisition integration planning and execution
   - Grounding: Led full technical track of Salesfusion → SugarCRM acquisition (12 weeks, zero customer churn, 92% employee retention); lived both the CTO and integrating Director roles
   - Typical cadence: Transaction-gated (days for DD, weeks to months for integration)

4. **Engineering Organization Assessment**
   - Focus: Team structure, scaling plans, retention and promotion pipelines, engineering process maturity
   - Grounding: Scaled SugarCRM engineering org 150% with 90% retention; mentored 8 engineers into senior/staff; promoted 3 to engineering manager
   - Typical cadence: 2-3 week assessment + delivery of recommendations

5. **Ongoing Advisory**
   - Focus: Standing engagement with CEOs, CTOs, or engineering leaders who want a senior sounding board. Not implementation work — judgment work.
   - Grounding: Executive-level engineering leadership across SaaS, healthcare tech, enterprise
   - Typical cadence: Monthly or quarterly retainer

### Section 4: Why Rob

- **Section heading:** "Why Work With Rob" (or copywriter-preferred)
- **Lead paragraph:** Short — 2-3 sentences summarizing Rob's credibility for the engagements above. Links to `about.html` and `resume.html` for depth (inline, not as separate CTAs).
- **Metric callouts:** 4 accent-color callouts, same visual pattern established in SPEC-003:
  - **$100M+** SaaS CRM AI platform led to beta (SugarCRM)
  - **12-week** M&A integration with zero customer churn
  - **150%** Engineering organization growth (SugarCRM)
  - **90%** Engineering retention across that scaling period
- **No separate bio rehash.** The About page owns that; this section just asserts credibility and routes readers to it.

### Section 5: How It Works

Three-step lightweight process:

1. **Intake** — Reach out via the contact form with context on what you're working through
2. **Scoping call** — 30-minute free call to understand the problem and confirm fit
3. **Engagement** — If there's a fit, Rob proposes scope, cadence, and terms in writing

- **Visual treatment:** Numbered steps or compact row. Keep it light — this is a page, not a sales funnel.
- **Tone:** Plain and direct. No "unlock value" language.

### Section 6: CTA

- **Section heading:** "Start a Conversation" (or copywriter-preferred)
- **Supporting sentence:** One line inviting a scoping conversation
- **Primary CTA:** "Get in Touch" → `contact.html`
- Reuse `.cta-section` / `.section-dark` / `.btn-white` pattern from SPEC-001/002/003

No secondary CTA — single, clear action.

### Assets

- **No new image assets.** No photo, no illustrations. The page is text + existing design primitives.
- **No PDF or downloadable document.** An "Advisory Overview" one-pager is out of scope for this spec (see Out of Scope).
- **OG image reuse:** `https://www.robcparker.com/images/rob-parker-headshot@2x.jpg` — same asset validated in SPEC-002/003/004

### SEO & Meta

- **Title:** "Technical Advisory — Rob Parker" (or copywriter tightened variant; ≤60 chars)
- **Meta description:** ~150 chars covering advisory engagement types, target client profile, and the secondary-alongside-FT-search positioning
- **OG title:** Same as title
- **OG description:** Same framing as meta description
- **OG image:** `https://www.robcparker.com/images/rob-parker-headshot@2x.jpg` (absolute URL)
- **Remove `noindex` meta tag** — this becomes a real, indexable page
- **Canonical URL:** `https://www.robcparker.com/services/tech-advisory.html`

## Content Requirements

All public-facing copy drafted by the marketing-copywriter agent during implementation (matching the SPEC-002/003/004 pattern). The copywriter receives:

- This spec
- `files/rob-parker-resume.pdf`
- `files/LinkedInProfile.pdf`
- Positioning: **Primary = Director/VP FT search at AI-forward SaaS; Secondary = advisory engagements.** Advisory content must never contradict or compete with FT positioning.
- Tone: Executive, plainspoken, first-person (Rob speaking). No "fractional CTO" buzzwords. No "let's partner to unlock" language. Closer to the About page's register than a marketing landing page.
- Audience: CEOs, CTOs, founders, VCs / PE sponsors looking for senior engineering judgment

Content deliverables from marketing-copywriter:

- Page H1
- Hero framing paragraph + availability signal sentence
- "Who I Work With" section heading + 1-2 paragraphs
- Engagement type titles, 2-3 sentence descriptions, typical-cadence lines, and primary-outcome lines (4-5 engagements per C-2 outcome)
- "Why Rob" section heading + lead paragraph + accessible labels for each metric callout
- "How It Works" section heading + three step descriptions
- CTA section heading + supporting sentence + button label override (if not default "Get in Touch")
- Meta title, meta description, OG title, OG description

## Out of Scope

- Guitar Playing page (SPEC-006) — separate spec
- Changes to the contact form (SPEC-004) — no new routing, no "reason for contact" dropdown
- Calendar embed / scheduler (no Calendly, no integrated booking) — the contact form is the single intake
- Pricing page or published rate card — pricing handled in private scoping conversations
- Testimonials, case studies, or client logos — future spec if/when appropriate (and with explicit client consent)
- Downloadable "Advisory Overview" one-pager — future trivial-tier spec if useful
- Analytics or conversion tracking — future analytics spec
- Separate advisory-specific contact form — reuse the general contact form
- Editing the home page's existing "How Rob Engages" copy — if that teaser drifts from this page's framing, tracked as a trivial follow-up spec
- JSON-LD `Service` or `ProfessionalService` structured data — future SEO spec if useful

## Dependencies

- **SPEC-001 (complete):** Design system, shared nav/footer, `services-grid` / `service-card` / `cta-section` patterns, placeholder page in place
- **SPEC-002 (complete):** Headshot asset for OG image reuse; metric-callout pattern
- **SPEC-003 (complete):** Metric-callout pattern (accent-color numeric callouts with accessible labels) — reused here
- **SPEC-004 (complete):** Contact form is the single intake route; this page's primary CTA assumes the real Contact page is live
- **No external integrations.** No new vendors, no new API keys, no new secrets.

## Non-Functional Requirements

### Performance

- No new external dependencies (no icon library, no fonts beyond SPEC-001 baseline)
- Text-heavy page with no new assets — no CLS risk from this page's own content
- Metric callouts styled via existing CSS primitives

### Accessibility

- Semantic HTML throughout (single `<h1>`, logical `<h2>`/`<h3>` hierarchy)
- Engagement cards use semantic article/section markup; card titles are `<h3>`
- Metric callouts follow the pattern from SPEC-002/003: `role="img"` with `aria-label` describing the full metric sentence
- Color contrast AA+ across all text including metric callouts
- Inline About/Resume links have non-ambiguous link text (avoid "click here")
- Skip-link functional (inherited from shared chrome)

### SEO

- Full meta tags including og:image (reuse headshot)
- Remove `noindex`
- Clean URL preserved (`services/tech-advisory.html`)
- Meta description emphasizes both the engagement types AND the secondary-to-FT positioning so search snippets align with Rob's actual availability posture

### Responsive

- Hero: text stacks cleanly on mobile
- Engagement-type grid: 2-column (or 1-column) on mobile, 2-3 column on desktop per design judgment
- Metric callouts: horizontal on desktop, stacked/wrapping on mobile
- Process steps: horizontal row on desktop, vertical stack on mobile
- CTA: full-width button on mobile

## Acceptance Criteria

### Page Structure & Content

- **Given** a user lands on `services/tech-advisory.html`, **When** the page renders, **Then** the hero heading, framing paragraph, and availability-signal sentence are visible above the fold
- **Given** the page loads, **When** the user scrolls, **Then** they encounter (in order) Who This Is For, Engagement Types, Why Rob, How It Works, and a single CTA section
- **Given** the Engagement Types section, **When** rendered, **Then** 4-5 engagement cards are present, each with a title, 2-3 sentence description, typical cadence, and primary outcome
- **Given** the Why Rob section, **When** rendered, **Then** 4 metric callouts are present with accessible labels, and inline links to About and Resume are present
- **Given** the How It Works section, **When** rendered, **Then** three numbered steps are shown
- **Given** the end of the page, **When** reached, **Then** a single CTA routes to `contact.html`

### Positioning Integrity

- **Given** the page copy, **When** read as a whole, **Then** advisory is clearly framed as a selective, secondary offering — not as Rob's primary focus
- **Given** the hero, **When** read, **Then** nothing in the framing contradicts the "Targeting Director/VP" positioning elsewhere on the site

### SEO

- **Given** the Tech Advisory page is crawled, **When** meta tags are inspected, **Then** `noindex` is NOT present
- **Given** meta tags are inspected, **When** compared to SPEC-005 requirements, **Then** title, meta description, OG title, OG description, og:image, and canonical are all populated with real content
- **Given** the meta description, **When** inspected, **Then** it surfaces both the engagement types AND the "selective / alongside FT search" posture

### Integration

- **Given** a user on the Home page, **When** they click "Explore Technical Advisory", **Then** they land on the full Tech Advisory page (not the placeholder)
- **Given** any page, **When** the Advisory nav link is clicked, **Then** the Tech Advisory page loads correctly and the active-nav state highlights Advisory
- **Given** the Tech Advisory page CTA, **When** clicked, **Then** the user lands on the real Contact page

### Accessibility

- **Given** a screen reader user, **When** they traverse the page, **Then** heading structure is logical (single h1; h2 per section; h3 per engagement card) with no skipped levels
- **Given** the metric callouts, **When** announced by screen readers, **Then** the full metric sentence is read via `aria-label` (e.g., "25 plus years in engineering")
- **Given** inline links within the Why Rob paragraph, **When** read out of context, **Then** link text is descriptive (e.g., "Rob's resume", not "here")

## Decision Rationale

- **Standard tier, not Complex:** No external integrations (reuses SPEC-004's contact form), no PII beyond what the contact form already collects, no new architectural patterns. Matches the "new static page" row of the CLAUDE.md tier table and the SPEC-002/003 precedent.
- **Advisory framed as secondary, not primary:** Rob's stated near-term intent is a Director/VP FT role. A page that leads with "hire me as your fractional CTO" energy would contradict the Home/About/LinkedIn positioning and weaken the FT signal. The availability-signal sentence and the "Who I Work With" qualification paragraph handle this explicitly so hiring managers landing on this page via search don't misread intent.
- **Engagement types grounded in resume/LinkedIn reality:** Every proposed engagement maps to a specific proven outcome in Rob's track record. No made-up service lines. Reduces credibility risk and lets marketing-copywriter use real metrics without hedging.
- **Reuse contact form, don't fork:** A separate "advisory inquiry" form would add friction, a second Formspree form, a second Turnstile site key — all for a secondary offering. The existing contact form is sufficient; volume is expected to be low.
- **No pricing on the page:** Advisory pricing varies substantially by engagement type, duration, and client profile. A published rate card would either be too generic to be useful or would lock Rob into pricing that doesn't flex with the conversation. Handled in private scoping calls.
- **No testimonials in this spec:** Testimonials require explicit client consent and legal review of what's quotable about prior employers. Deferring that work keeps this spec shippable.
- **Single CTA, no secondary button:** This is a terminal page in the advisory funnel. The contact form is the next step. Adding a "View Resume" secondary CTA would dilute the primary action and is redundant with the inline About/Resume links in the Why Rob section.
- **No Calendly or scheduler:** Booking friction belongs after a scoping conversation, not before. Premature scheduling embeds would attract unqualified inquiries. If advisory volume justifies it later, a future spec can revisit.
- **Reuse existing metric-callout pattern (SPEC-002/003):** The visual language for "accent-color number + accessible label" is already established. Introducing a new treatment would fork styles unnecessarily.

## Effort Comparison

| | AI-Assisted | Human Solo |
|---|---|---|
| Spec creation | ~40 minutes | 3-5 hours |
| Assumptions | Engagement types, positioning hierarchy, and tier pre-derived from resume + LinkedIn + memory ("advisory is secondary") + home page teaser. Existing SDD spec format (SPEC-002/003/004) used as structural template. | PM would need to interview Rob on advisory intent, research comparable independent-advisor pages, draft engagement taxonomy from scratch, and resolve positioning tension with the FT hunt. |

---

## Approval

**Tier:** Standard
**Gate owner:** Rob Parker
**Requires:** Documented approval with responses to agent-raised concerns. Standard tier downstream: ARCH-SPEC-005 + QA-SPEC-005. No DEPLOY gate since deployment is deferred project-wide.

### Structured Review Checklist

- [x] Business intent confirmed (secondary advisory offering that does not dilute FT Director/VP hunt)
- [x] Scope boundaries clear (Tech Advisory page only; no pricing, no testimonials, no scheduler, no form changes)
- [x] Acceptance criteria testable (Given/When/Then throughout)
- [x] Dependencies identified (SPEC-001/002/003/004 all complete)
- [x] Tier appropriate (Standard — new static page with no external integrations)
- [x] No mandatory escalation triggers (no auth, no payments, no new PII, no new external integrations, no DB, no core domain changes)
- [x] Third-party features verified (none introduced)
- [x] Decision Rationale section included

### Ambiguities Flagged for Spec Gate

| # | Concern | Options | Recommendation |
|---|---------|---------|----------------|
| C-1 | Availability-signal wording — how explicit should the "secondary-to-FT-hunt" framing be? | (a) Explicit: "alongside my primary focus on full-time leadership roles"; (b) Softer: "selective engagements"; (c) No signal — let scope/tone do the work | (a) — matches the memory-level intent cleanly and pre-empts misreads from hiring managers who land here. Safer than relying on implicit tone. |
| C-2 | Final set of engagement types | (a) All five proposed (AI Platform, Architecture/Modernization, M&A, Org Assessment, Ongoing Advisory); (b) Drop Ongoing Advisory — less discrete, harder to close; (c) Drop Org Assessment — too close to executive-search-adjacent work; (d) Fewer than four — keep the page tight | (a) — all five map cleanly to resume/LinkedIn strengths. None are invented. Page can handle 4-5 cards visually. |
| C-3 | Pricing display | (a) None on page (proposed); (b) "On request" text; (c) Ranges by engagement type; (d) Published rates | (a) — ranges risk anchoring low or scaring off qualified clients; published rates lock Rob in. Private scoping calls are the right surface. |
| C-4 | Conflict / moonlighting posture — should the page say anything about advisory being compatible with an FT role? | (a) Silent (proposed); (b) Short note that advisory engagements wind down or pause on signing an FT role; (c) Proactive statement that advisory is scope-bound and non-competing | (a) — any statement on this invites more questions than it answers. Handle case-by-case in scoping calls. |
| C-5 | Process step 2 — "30-minute free scoping call" | (a) Free as proposed; (b) Paid discovery call ($500 flat, refundable against engagement); (c) No specified duration/cost — just "scoping call" | (a) — low friction for qualified leads; Rob's time filter is the contact form, not a paywall. Revisit if volume becomes unwieldy. |
| C-6 | "Why Rob" metric callouts — which four? | Proposed: 25+ years, $100M+ SaaS AI platform, 12-week M&A, 20% AI velocity. Alternatives include: 350% throughput, 25% cost reduction, 150% team growth, 90% retention | Use the proposed set — it spans breadth, scale, M&A, and AI leadership without repeating the exact callouts on the Resume page. |
| C-7 | "How It Works" — should this section exist, or is it over-explaining? | (a) Keep (proposed); (b) Drop the section — readers who want a call will use the CTA; (c) Merge into the CTA section as a one-line "Start with a 30-minute call" | (a) — three-step process sets expectations and reduces intake friction. But (c) is a defensible simpler alternative if Rob prefers a tighter page. |
| C-8 | Engagement cards on this page vs. home-page "service-card" styling alignment | (a) Reuse `services-grid`/`service-card` as-is; (b) New `.engagement-card` variant with extra fields (cadence, outcome) | (b) — the cadence + outcome rows are new structured content; extending the primitive is cleaner than overloading `service-card`. Arch-review will confirm. |

### Standard-Tier Escalation Check

| Trigger | Applies? | Notes |
|---------|----------|-------|
| Authentication / authorization | No | Public page |
| Payments / financial data | No | No pricing; no payment processing |
| PII / PHI handling | No | No new PII surface; reuses SPEC-004 contact form posture |
| New external API integration | No | None introduced |
| Database schema change | No | No DB |
| Core domain model modification | No | |
| Framework or platform migration | No | |
| First implementation of new architectural pattern | No | Reuses SPEC-002/003 primitives; the only new CSS primitive is the engagement card (per C-8), which is additive and non-architectural |

**No trigger escalates above Standard.**

### Gate Responses

| Concern | Response |
|---------|----------|
| C-1 | **Explicit.** Availability-signal uses the explicit framing (e.g., "alongside my primary focus on full-time leadership roles"). Pre-empts misreads from hiring managers landing on this page. |
| C-2 | **Confirmed — all five engagement types.** AI Platform & Adoption Strategy, Architecture & Modernization Review, M&A Technical Due Diligence & Integration, Engineering Organization Assessment, and Ongoing Advisory. |
| C-3 | **No pricing displayed.** Pricing handled in private scoping conversations; no "on request" label, no ranges, no rate card. |
| C-4 | **Silent on conflict / moonlighting posture.** Page makes no statement about how advisory interacts with a future FT role; handled case-by-case in scoping conversations. |
| C-5 | **Free 30-minute scoping call.** Contact form is the time filter, not a paywall. Revisit only if volume warrants. |
| C-6 | **Revised metric set (4 callouts):** $100M+ SaaS AI platform led to beta · 12-week M&A integration with zero customer churn · 150% engineering organization growth · 90% engineering retention. (Swaps out the originally proposed "25+ years" and "20% AI velocity" in favor of the scaling-and-retention pair, which pairs cleanly with the M&A metric and keeps the page differentiated from the Resume callouts.) |
| C-7 | **Keep "How It Works" section** as three steps (Intake → Scoping call → Engagement). Sets expectations; reduces intake friction. |
| C-8 | **New `.engagement-card` variant.** Cadence + outcome rows are structured content that overloads the existing `service-card`. Architect-review will formally spec the primitive. |

**Decision:** Approved
**Approved by:** Rob Parker
**Date:** 2026-04-19

---

## Architecture Review

**Reviewer:** architect-reviewer agent
**Date:** 2026-04-19
**Recommendation:** Approve with conditions (10 IG items, plus Arch Gate decisions below)

### Design Findings

| Area | Finding |
|------|---------|
| Pattern fit | Solid. Every primitive the spec names exists and is production-proven: `.hero` (text-only variant used on Contact page hero — same shell), `.container`, `.section` / `.section-alt` / `.section-dark`, `.services-grid` / `.service-card`, `.highlights-grid` / `.highlight-card`, `.cta-section`, `.btn-white` / `.btn-outline-white` / `.btn-secondary`, `.skip-link`, `.section-header`, `.section-heading-standalone`, `.body-link`. **No gaps.** Contact page's `.hero` (no eyebrow, no stats, no subheadline styling beyond the existing class) is the correct reference pattern — reuse the same shell with `<h1>` + subheadline + any availability-signal element. **One primitive the spec does NOT name but should reuse:** `.body-link` (in `css/style.css` line 984) — established in SPEC-002 for subtle in-body inline links; is the right class for the inline About/Resume links inside the Why Rob paragraph, and matches the spec's a11y requirement for descriptive link text integrated into flowing copy. |
| .engagement-card primitive | **Primary design decision.** Recommend `.engagement-card` as a **composition** on top of `.service-card`, not a standalone primitive. The `.service-card` already provides the base card container (padding, background, radius, border, shadow, hover lift, flex column) — duplicating that base creates drift risk (two cards needing the same shadow/radius/border refresh later). Structure: `<article class="service-card engagement-card">` reuses the base; `.engagement-card` adds the new sub-element styles only. New sub-elements needed: `.engagement-card-desc` (2-3 sentence paragraph, inherits `.service-card p` but without the `flex:1` + `margin-bottom:var(--space-8)` that exist specifically for pushing a CTA button to the card bottom — the engagement card has no CTA button, so that rule should be neutralized or scoped off). Cadence + outcome pair: recommend semantic `<dl>` with `<dt>`/`<dd>` pairs (`.engagement-card-meta`), matching the `.resume-skills` precedent already in the codebase (line 1252) — gives screen readers correct label+value semantics instead of relying on visual proximity. Card title stays `<h3>` (no change to existing `.service-card h3` rule). |
| 5-card grid layout | The 5-item orphan problem. `.highlights-grid` on `index.html` has 4 items and uses `1fr` mobile → `2col` at 768px → `4col` at 1024px — a divisible 4 at every breakpoint. `.services-grid` uses `1fr` → `2col` at 768px only (no 4col). For 5 engagement cards: a straight `.services-grid` gives 3+2 or 2+2+1 depending on column count. Recommend **3-col desktop (≥1024px) / 2-col tablet (768-1023px) / 1-col mobile**, accepting the trailing row (3+2 at desktop is fine visually — the second row's two cards stretch naturally via `1fr`; 2+2+1 at tablet is the worst case and still reads as a list not a broken grid). This is simpler than adding `grid-auto-flow: dense` tricks. A new modifier `.engagements-grid` (or reuse `.services-grid` with a modifier) should define this breakpoint ladder — **do not alter `.services-grid` itself** (home-page 2-up would break). |
| Positioning integrity | Real implementation lever. The "selective, secondary" signal should live in the hero as a **`.hero-eyebrow`-style callout above the H1**, not buried inside the framing paragraph. `.hero-eyebrow` (line 565) already renders uppercase, letter-spaced, accent-color text — semantically a kicker, and sets expectations before the H1 lands. Example intent: eyebrow reads "Selective Engagements", H1 reads "Technical Advisory", then the availability-signal sentence is the first sentence of the framing paragraph so it's picked up by the meta-description-aligned opening lines. This gives three reinforcing touchpoints (eyebrow → H1 → opening sentence) without making the page feel apologetic. Meta description should lead with the availability posture, not with the engagement list, so search snippets align. |
| SEO | Indexable and complete without JSON-LD. `Service` structured data is optional; absence does not suppress indexing. Title, meta description, canonical, OG set (title/description/image/url/type) per spec are sufficient and match the SPEC-002/003/004 pattern. **Must remove** `<meta name="robots" content="noindex">` currently at `services/tech-advisory.html:18`. |
| Home-page teaser alignment | No drift created by this spec. Home teaser copy (`index.html` lines 147-159) already says "engagements range from architecture reviews and team assessments to ongoing advisory relationships — tailored to where your organization is and where it needs to go" — this generalizes cleanly over the five specific engagement types in SPEC-005. CTA label "Explore Technical Advisory" matches the destination. **One soft drift risk:** the home teaser says "fractional engineering leader" in the surrounding `#services-heading` intro (line 141) — SPEC-005 explicitly avoids "fractional CTO" buzzwords. This should eventually harmonize (home should not imply "fractional" framing if advisory copy rejects it), but the spec's out-of-scope note (line 171) correctly defers this to a trivial follow-up. No Arch Gate decision required. |
| Performance / a11y | NFRs adequate. No new assets, no new JS, no external deps — cached CSS + minimal HTML growth only. CLS-safe by construction (no async-loaded content). A11y items to lock in during implementation: single `<h1>`, `<h2>` per top-level section, `<h3>` per engagement card, `<article>` as the engagement card element (matching the `.highlight-card` pattern on `index.html`), metric callouts use the `role="img"` + `aria-label` pattern established in SPEC-002/003 (see `index.html:95`, `103`, `122`), `<dl>`/`<dt>`/`<dd>` for cadence+outcome pairs, and the inline About/Resume links use `.body-link` with full descriptive phrases ("Rob's About page", "Rob's resume" — not "here" or "this page"). |
| Technical debt | **Minimal, but real.** The `.engagement-card` composition approach (rather than a fork) keeps debt near-zero — one shared base (`.service-card`), one additive layer. Real risk: if a future spec needs a third card variant, a shared base token would be cleaner than three siblings extending `.service-card`. Not worth pre-optimizing here; revisit if/when a third variant arrives. Document the composition rule in a WHY comment so the next editor doesn't accidentally fork. |

### Implementation Guidance (accept/reject per Arch Gate below)

| # | Guidance |
|---|----------|
| IG-1 | **Engagement card composition.** Render each card as `<article class="service-card engagement-card">`. Do NOT define standalone card chrome (padding, background, radius, border, shadow, hover) on `.engagement-card` — inherit all of that from `.service-card`. `.engagement-card` only defines the new sub-element styles (description spacing, meta list layout, optional visual separator between description and meta). Add a WHY comment at the top of the `.engagement-card` CSS block documenting that it is a composition on `.service-card`, not a fork. |
| IG-2 | **Engagement card internal structure.** HTML skeleton:<br>`<article class="service-card engagement-card">`<br>`  <h3>{title}</h3>`<br>`  <p class="engagement-card-desc">{2-3 sentence description}</p>`<br>`  <dl class="engagement-card-meta">`<br>`    <dt>Typical cadence</dt><dd>{cadence}</dd>`<br>`    <dt>Primary outcome</dt><dd>{outcome}</dd>`<br>`  </dl>`<br>`</article>`<br>The `<dl>` gives screen readers true label+value semantics. Style `<dt>` uppercase/small/letter-spaced (match the `.resume-skills dt` precedent at `style.css:1265`) and `<dd>` as plain body text. |
| IG-3 | **Neutralize `.service-card p` flex behavior inside `.engagement-card`.** Existing rule `.service-card p { flex: 1; margin-bottom: var(--space-8); }` (line 701) exists to push a CTA button to the card footer. Engagement cards have no CTA button — the rule will create unwanted trailing whitespace under the description. Scope override: `.engagement-card .engagement-card-desc { flex: initial; margin-bottom: var(--space-6); }` (or similar). |
| IG-4 | **Grid — introduce `.engagements-grid` as a new modifier, do not alter `.services-grid`.** Breakpoints: `grid-template-columns: 1fr` base; `repeat(2, 1fr)` at ≥768px; `repeat(3, 1fr)` at ≥1024px. Gap `var(--space-6)` (matches `.services-grid`). Five cards produce 5 / 3+2 / 2+2+1 per breakpoint — all acceptable. Place the grid rules adjacent to `.services-grid` in the CSS file so future maintainers see both together. |
| IG-5 | **Hero — text-only variant.** Reuse `.hero` + `.hero-content` shell (identical to Contact page, `contact.html:72-79`). Inside the content:<br>`<span class="hero-eyebrow">Selective Engagements</span>` (or copywriter-preferred — this is the availability-signal kicker)<br>`<h1>{H1}</h1>`<br>`<p class="hero-subheadline">{2-3 sentence framing paragraph, opening with the availability posture}</p>`<br>No `.hero-actions` block — the CTA lives only in the bottom `.cta-section`. Single action per page reinforces "selective" framing. |
| IG-6 | **Why Rob metric callouts — reuse the home-page pattern exactly.** Use `<article class="highlight-card">` with `<div class="highlight-metric" role="img" aria-label="{spoken form}">` + `<h3 class="highlight-label">` + `<p class="highlight-desc">`. This matches `index.html:94-129` and gives you 1-col mobile / 2-col tablet / 4-col desktop responsiveness for free via `.highlights-grid`. The spec's 4-metric count (C-6 revised) aligns perfectly with that grid's 4-col desktop breakpoint — no 5-card orphan problem here. |
| IG-7 | **Inline About/Resume links in the Why Rob paragraph — use `.body-link`.** The class exists at `style.css:984` specifically for subtle in-body inline links (SPEC-002 precedent). Descriptive link text required — "Rob's About page" / "Rob's resume" / similar. Not "here", not "this page", not "click for more". |
| IG-8 | **How It Works section — use the existing stepped-list pattern.** The `.ai-framework-list` counter-based numbered list (`style.css:870`) is the established pattern for numbered process steps on this site. If the three advisory steps feel too visually heavy with that treatment (it has a background, border, primary-color numbered circles), a lighter variant is acceptable — but keep the CSS counter + `<ol>` pattern for a11y (numbered `<ol>` gives screen readers the ordering semantics natively; visual numbers are decorative). Do not invent a third numbered-list styling. Confirm lighter-vs-standard in implementation. |
| IG-9 | **Remove `<meta name="robots" content="noindex">`** from `services/tech-advisory.html:18`. Match the pattern established in SPEC-002 (about.html:22-23), SPEC-003 (resume.html:26-27), and SPEC-004 (contact.html:24-25): replace with a short WHY comment documenting the removal. |
| IG-10 | **Subdirectory-path WHY comments already exist** on `services/tech-advisory.html:20, 101` covering `../css/` and `../js/` paths; preserve them verbatim during the rewrite — don't lose them in the placeholder-to-full-page churn. |

### Arch Gate Decisions Required (Rob)

| # | Question | Options | Recommendation |
|---|----------|---------|----------------|
| AG-1 | `.engagement-card` strategy — composition on `.service-card` (IG-1) or standalone primitive? | (a) Composition (`<article class="service-card engagement-card">`, inherits base chrome, adds only sub-element styles); (b) Standalone — duplicate base chrome rules under `.engagement-card`, keep fully independent | (a) — minimizes CSS duplication, eliminates drift risk when the card's base visual identity evolves. Spec's C-8 acceptance ("new variant") explicitly permits this composition interpretation. |
| AG-2 | 5-card grid layout at desktop (≥1024px) | (a) 3-col (3+2 trailing row, IG-4); (b) 2-col (3 rows of 2+2+1); (c) Flex-based with auto wrap; (d) Drop to 4 engagement types to fit a 2x2 grid cleanly | (a) — 3-col reads as a curated set; 3+2 trailing row is visually fine (1fr stretching handles width). (d) would contradict spec C-2 which already confirmed all 5 engagements. |
| AG-3 | Availability-signal placement | (a) `.hero-eyebrow` above H1 ("Selective Engagements") + first sentence of framing paragraph carries the explicit "alongside full-time leadership" framing (IG-5); (b) Framing paragraph only (no eyebrow); (c) Standalone paragraph below H1 | (a) — three reinforcing touchpoints (eyebrow → H1 → opening sentence), uses an existing primitive, avoids inventing a new element, reads as confident calibration rather than apology. |
| AG-4 | Cadence/outcome semantics inside the engagement card | (a) Semantic `<dl>` with `<dt>`/`<dd>` pairs (IG-2) — true label+value; (b) Plain `<p>` paragraphs with bold labels; (c) Two `<div>` rows with `.label` / `.value` spans | (a) — correct semantics, established precedent in `.resume-skills`, no downside. |
| AG-5 | "How It Works" visual treatment (IG-8) | (a) Reuse `.ai-framework-list` styling as-is (heavy — background, border, circle-numbered); (b) Create a lighter `.process-steps` variant sharing the CSS counter pattern; (c) Plain `<ol>` with default styling | (b) — (a) is visually too heavy for a secondary page; (c) looks unfinished. A lighter variant that reuses the counter pattern but drops the card chrome is the right middle. Final visual tuning can defer to frontend-developer during implementation. |

### Effort Comparison (Arch Review stage)

| | AI-Assisted | Human Solo |
|---|---|---|
| Arch review | ~8 minutes | 2-3 hours |
| Assumptions | Reviewer had full repo access + prior SPEC-002/003/004 ARCH-reviews as reference. No security review run (Standard tier, no PII/auth/payment surface introduced). Stack-quirks confirmed irrelevant (no images, no external services introduced by this spec). |

### Arch Gate Decisions (2026-04-19)

| # | Decision | Status |
|---|----------|--------|
| AG-1 | `.engagement-card` strategy → **Composition on `.service-card`** (option a) | Accepted |
| AG-2 | 5-card grid layout at desktop → **3-col** (3+2 trailing row; 2-col tablet; 1-col mobile) (option a) | Accepted |
| AG-3 | Availability-signal placement → **`.hero-eyebrow` above H1 + opening-sentence framing** (option a) | Accepted |
| AG-4 | Cadence/outcome semantics → **Semantic `<dl>` / `<dt>` / `<dd>`** (option a) | Accepted |
| AG-5 | "How It Works" visual treatment → **Lighter `.process-steps` variant** sharing the CSS-counter pattern (option b) | Accepted |

All 10 IG items (IG-1 through IG-10) accepted as-written.

### Arch Gate Approval

**Decision:** Approved
**Approved by:** Rob Parker
**Date:** 2026-04-19

---

## QA Review

**Reviewers:** qa-expert + code-reviewer agents (parallel)
**Date:** 2026-04-20
**QA Verdict:** PASS with observations (no FAILs)
**Code Review Verdict:** APPROVE with minor notes (no blocking issues)

### Summary

All 17 spec acceptance criteria passed. All 10 IG items verified as correctly implemented. No security findings. No accessibility regressions. Active-nav highlighting confirmed to fire correctly via `main.js` pathname-match on `/services/tech-advisory.html`. Home-page teaser integration preserved. All inline links resolve; external LinkedIn link carries `target="_blank"` + `rel="noopener noreferrer"`.

### QA Gate Decisions (2026-04-20)

| # | Finding | Decision |
|---|---------|----------|
| QG-1 | **Section heading "Why This Background Matters"** (copywriter variant; spec proposed "Why Work With Rob") | **Keep as-is** — reframes credibility in terms of engagement relevance rather than personal promotion; better fit for advisory-secondary positioning. |
| QG-2 | **`.process-steps` CSS placement** — originally landed inside the AI Framework block as `15c-ii`, splitting an unrelated ruleset | **Fixed** — relocated adjacent to `.engagement-card` / `.engagements-grid` as section `12c` (grouped with other SPEC-005 primitives). Double-blank-line artifact resolved. |
| QG-3 | **Unescaped `M&A` in meta description and og:description** (`services/tech-advisory.html:9, 16`) — browsers are lenient but strict social-card validators prefer entity-escaped | **Fixed** — `M&A integration,` → `M&amp;A integration,` in both meta tags. Body copy already used `M&amp;A` correctly. |
| QG-4 | **Missing WHY comment on `.engagement-card .engagement-card-desc` specificity bump** — the descendant selector (0,2,0) intentionally overrides `.service-card p` (0,1,1) | **Fixed** — added rule-local WHY comment explaining the specificity is required to neutralize the service-card CTA-footer stretch behavior. |

All other observations/minor notes (link resolution, meta description length at 158 chars, `aria-label` phrasing consistency, referrer meta omission, hero-pattern similarity note) confirmed as intentional and consistent with peer specs — no action required.

### Deferred to deploy-time verification

Per the project-wide deployment deferral (see auto-memory `project_deployment_deferred.md`), a runtime browser check is not performed until all of SPEC-001–006 are complete and SPEC-000 is written. At deploy time, re-verify:

1. `https://www.robcparker.com/services/tech-advisory.html` loads with no 404
2. Advisory nav link receives `class="active"` / `aria-current="page"` when on this page
3. Home-page "Explore Technical Advisory" button resolves here
4. CTA "Get in Touch" button resolves to the real Contact page
5. Social-card renderers (LinkedIn Post Inspector, etc.) correctly render og:title / og:description / og:image
6. `services/guitar-playing.html` nav link resolves (placeholder from SPEC-001 should still be present)

### Effort Comparison (QA stage)

| | AI-Assisted | Human Solo |
|---|---|---|
| QA + code review | ~10 minutes (two agents in parallel) + ~2 minutes of fix-up edits | 2-3 hours (QA engineer walking acceptance criteria + code reviewer reading diff, sequential) |
| Assumptions | Reviewers had repo access, all prior gates' artifacts (spec, copy brief, architect-review), and the full diff. No browser runtime available in this session — all checks were code-level. |

### QA Gate Approval

**Decision:** Approved
**Approved by:** Rob Parker
**Date:** 2026-04-20
