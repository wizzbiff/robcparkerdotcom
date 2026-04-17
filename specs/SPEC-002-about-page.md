# SPEC-002: About Page

**Status:** Complete (deployment deferred)
**Tier:** Standard
**Author:** PM-Spec Agent
**Date:** 2026-04-16
**Branch:** `spec/SPEC-002-about-page`

---

## Summary

Build the About page (`about.html`) replacing the current placeholder. The page establishes Rob Parker's executive credibility, leadership philosophy, and career substance to support a Director/VP of Engineering search at AI-forward SaaS companies.

## Context

SPEC-001 established the site foundation (design system, shared nav/footer, JS utilities) and home page. The About page is the second full content page and the primary destination for readers who want depth beyond the home page teaser. Hiring managers and recruiters are the primary audience.

Rob's LinkedIn profile (`LinkedInProfile.pdf`) provides richer positioning than the resume alone — specifically, the explicit target of Director/VP roles at AI-forward SaaS companies, a stated leadership philosophy, and a unique thought leadership artifact (three-tier AI Adoption Framework).

## Requirements

### Page Structure (Thematic, not Chronological)

The page flows in this order:

1. **Hero / Professional Bio** — Headshot + name + positioning statement + 1-paragraph bio
2. **Leadership Philosophy** — Anchored on Rob's stated belief about teams and people
3. **How I Lead** — Thematic highlights (not chronological career history), each supported by concrete metrics
4. **AI Adoption & Platform Thought Leadership** — The three-tier framework as differentiating content
5. **Outside of Work** — Light personal section (brief, humanizing)
6. **CTA Section** — Dual CTA: View Resume + Get in Touch

### Section 1: Hero / Professional Bio

- **Layout:** Photo on one side (desktop), stacked on mobile
- **Headshot:** Optimized version of `RobParkerHeadshot.png` at appropriate dimensions (likely ~400-500px display, served at 2x for retina)
- **Name:** "Rob Parker" as H1
- **Positioning statement:** Short line under name (e.g., "Senior Engineering Executive · AI-Native Platforms · Targeting Director/VP")
- **Opening bio paragraph:** 3-5 sentences positioning Rob for the Director/VP SaaS search
- **Location context:** "Based in Atlanta, Georgia"

### Section 2: Leadership Philosophy

- **Section heading:** "How I Think About Leadership" (or similar — marketing-copywriter to refine)
- **Anchor quote:** Prominently feature Rob's stated philosophy (based on his LinkedIn wording: *"I believe the best product platforms are built by the best teams, sustainable excellence comes from empowered, well-supported people."* — copywriter may lightly polish for rhythm/punctuation while preserving meaning)
- **Supporting copy:** 2-3 paragraphs expanding the philosophy — what it means in practice, how it shapes decisions, why it matters for scaling engineering organizations
- **Voice:** First-person (written as if Rob is speaking)

### Section 3: How I Lead (Thematic Highlights)

Present 3-4 thematic capability areas, each with a concrete metric or proof point. NOT chronological career history — that belongs on the resume.

Suggested themes (marketing-copywriter to finalize):

1. **Scaling Engineering Organizations**
   - Metric: Grew team 150% with 90% retention; promoted 8 engineers to senior/staff; developed 3 new engineering managers
   - Supporting: Brief narrative on approach (culture, mentorship, career pathways)

2. **Modernizing Platforms for Measurable Value**
   - Metric: 350% throughput increase, 25% cost reduction from monolithic .NET to Python microservices / AWS serverless
   - Supporting: How technical modernization is framed as business outcome delivery

3. **Navigating M&A Complexity**
   - Metric: 12-week Salesfusion-to-SugarCRM integration with zero customer churn; 92% employee retention through consolidation
   - Supporting: Approach to communication, transparency, and career pathway clarity during transitions

4. **Delivering Results at Scale**
   - Metric: $2M budget management; 26-person global organization; 99.95% uptime; 17+ annual releases with <10% sprint variance
   - Supporting: Operational discipline and how it enables predictable delivery

### Section 4: AI Adoption & Platform Thought Leadership

- **Section heading:** "Where Engineering Is Going" or "AI-Native Platform Leadership"
- **Lead paragraph:** Rob's perspective on AI-native engineering as the next organizational capability
- **Featured artifact:** The three-tier AI Adoption Framework (SUMMARY LEVEL ONLY — do not invent tier details beyond what appears on LinkedIn)
  - Tier 1 — Baseline
  - Tier 2 — Accelerator
  - Tier 3 — Champion
  - Tools deployed: Claude Code, GitHub Copilot, CodeRabbit
  - Outcome: 20% developer velocity increase
- **Supporting copy:** Why this framework matters; what it signals about scaling AI adoption deliberately. Keep descriptions of individual tiers at summary level — do not fabricate specifics
- **Visual treatment:** Could be styled as a card, callout, or stepped visual (design decision at implementation)

### Section 5: Outside of Work (Light Personal Touches)

- **Section heading:** "Off the Clock" or "Beyond Engineering"
- **Length:** Short — 1-2 short paragraphs maximum
- **Content suggestions** (marketing-copywriter to draft, Rob approves):
  - Atlanta-based; husband and father of three
  - Guitar as a longstanding passion; link to Guitar page
  - Brief connection between craft/creativity outside work and leadership approach
- **Voice:** Keep it warm but brief — humanizes without being indulgent

### Section 6: CTA Section

- **Section heading:** "Let's Connect" or similar
- **Supporting sentence:** Framed for the Director/VP audience
- **Primary CTA:** "View My Resume" → `resume.html`
- **Secondary CTA:** "Get in Touch" → `contact.html`
- **Layout:** Side-by-side buttons (desktop), stacked (mobile)

### Assets

1. **Create `images/` directory** at project root for optimized output
2. **Create `images/source/` directory** for the unoptimized source PNG (gitignored — do not commit the 793KB source)
3. **Move** `RobParkerHeadshot.png` from repo root to `images/source/` and add `images/source/` to `.gitignore`
4. **Headshot asset processing:**
   - Source: `images/source/RobParkerHeadshot.png` (793KB — gitignored)
   - Output format: **Single JPEG** (not WebP, not `<picture>` fallback — see Arch Gate decisions)
   - Produce two sizes via local CLI (cwebp/ImageMagick/jpegoptim/mozjpeg):
     - `images/rob-parker-headshot.jpg` (400x400 @ quality 82, progressive)
     - `images/rob-parker-headshot@2x.jpg` (800x800 @ quality 80, progressive)
   - **Performance target: ≤100KB per delivered file** (budget applies to the file served to the current viewport, not combined)
   - Strip EXIF metadata during export (removes GPS/device metadata)
   - Alt text: "Professional headshot of Rob Parker"
5. **Document image optimization recipe in `governance/stack-quirks.md`** — exact CLI command used so future specs follow the same recipe

### SEO & Meta

- **Title:** "About Rob Parker — Senior Engineering Executive"
- **Meta description:** ~150 chars about Rob's background, positioning, and what he brings to Director/VP roles
- **OG title:** Same as title
- **OG description:** Same framing as meta description
- **OG image:** Use the optimized @2x headshot. Must be absolute URL (`https://www.robcparker.com/images/rob-parker-headshot@2x.jpg`) — verify with social preview debuggers post-deploy
- **Remove `noindex` meta tag** — this is now a real page, not a placeholder

## Content Requirements

All public-facing copy will be drafted by the marketing-copywriter agent. The copywriter receives:
- This spec
- Rob's resume (`Rob Parker Resume.pdf`)
- Rob's LinkedIn profile (`LinkedInProfile.pdf`)
- Positioning: Director/VP at AI-forward SaaS companies
- Tone: Professional-first with light personal touches
- Voice: First-person throughout (Rob speaking)

Content deliverables from marketing-copywriter:
- Positioning statement under name
- Opening bio paragraph
- Leadership philosophy section (heading + supporting paragraphs, anchored on the LinkedIn quote)
- Thematic highlights copy (4 themes with metrics and narrative)
- AI Adoption Framework section copy
- Outside of Work copy (short, warm)
- CTA section copy
- Meta title and description
- OG title and description
- (Alt text pre-specified: "Professional headshot of Rob Parker")

## Out of Scope

- Resume page (SPEC-003) — About page links to it but doesn't duplicate it
- Contact page (SPEC-004)
- Tech Advisory page (SPEC-005)
- Guitar Playing page (SPEC-006)
- Custom illustrations or graphics beyond the headshot (future spec if desired)
- Video content (future consideration)
- Testimonials or recommendations (future spec if desired)
- Revision of SPEC-001 home page positioning (tracked separately)

## Dependencies

- **SPEC-001 (complete):** Design system, shared nav/footer, JS utilities, about.html placeholder in place
- **Headshot asset:** `RobParkerHeadshot.png` available in project root
- **LinkedIn context:** `LinkedInProfile.pdf` available for copywriter reference

## Non-Functional Requirements

### Performance
- Headshot optimized to ≤100KB per delivered file (per-request, not combined)
- No new external dependencies
- Image served via `<img srcset>` (1x and 2x variants) — mobile receives smaller asset
- Hero headshot uses `loading="eager"` and `fetchpriority="high"` (above the fold — do NOT lazy-load)
- Explicit `width` and `height` attributes on `<img>` to prevent cumulative layout shift (CLS)

### Accessibility
- Meaningful alt text on headshot
- Semantic HTML (section hierarchy, single h1, logical heading order)
- AI Adoption Framework tiers should use semantic list markup if styled as a stepped pattern
- Any visual metrics (large numbers) need accessible labels (pattern established in SPEC-001)

### SEO
- Full meta tags including og:image (now available with headshot)
- Remove `noindex` from this page
- Clean URL preserved (`about.html`)

### Responsive
- Hero layout: photo+text side-by-side on desktop, stacked on mobile
- Thematic highlights: grid pattern similar to home page (may reuse `highlights-grid`)
- AI Framework section: visual treatment works at all breakpoints
- CTAs: side-by-side on desktop, stacked on mobile

## Acceptance Criteria

### Page Structure & Content

- **Given** a user lands on `about.html`, **When** the page renders, **Then** the hero section shows Rob's headshot, name, positioning line, and opening bio above the fold (or within one scroll on mobile)
- **Given** a user scrolls the page, **When** they reach the Leadership Philosophy section, **Then** Rob's anchor quote is prominently displayed with supporting copy
- **Given** the How I Lead section, **When** a user reads it, **Then** 3-4 thematic capabilities are each supported by at least one concrete metric from Rob's actual experience
- **Given** the AI Adoption section, **When** rendered, **Then** the three-tier framework is clearly presented with named tiers, tools, and the 20% velocity outcome
- **Given** the Outside of Work section, **When** rendered, **Then** it is brief (≤2 short paragraphs) and links to the Guitar page
- **Given** the end of the page, **When** reached, **Then** both primary (Resume) and secondary (Contact) CTAs are visible

### Assets

- **Given** the About page loads, **When** the headshot renders, **Then** the file served is ≤100KB and appropriately sized for the viewport
- **Given** a user inspects the image, **When** they check alt text, **Then** it describes Rob meaningfully for screen readers
- **Given** the page source, **When** meta tags are inspected, **Then** `og:image` references the headshot

### SEO

- **Given** the About page is crawled, **When** meta tags are inspected, **Then** `noindex` is NOT present (removed from placeholder version)
- **Given** the title and meta description, **When** compared to SPEC-002 requirements, **Then** they use real copy (not placeholder content from SPEC-001)

### Integration

- **Given** a user on the home page, **When** they click the "Learn More About Rob" CTA, **Then** they land on the full About page (not the placeholder)
- **Given** a user on the About page, **When** they click either CTA at the bottom, **Then** they navigate to the correct target (Resume or Contact)
- **Given** any page, **When** the About nav link is clicked, **Then** the About page loads correctly

## Decision Rationale

- **Thematic over chronological:** The resume page (SPEC-003) handles chronological career history. The About page should surface *how* Rob leads, not *where* he worked. This differentiation makes each page earn its place.
- **Philosophy quote as anchor:** The LinkedIn quote is in Rob's own voice and articulates the "why" behind the achievements. Anchoring a whole section on it signals authenticity over marketing polish.
- **AI Adoption Framework as its own section:** This is differentiating thought leadership most competitors won't have. Giving it dedicated real estate (not burying it inside another section) signals that Rob doesn't just "do AI" — he has a repeatable framework for organizational AI adoption.
- **Light personal touches, not deep:** Director/VP searches prioritize executive substance. Guitar/Atlanta get brief acknowledgment to humanize without diluting the hiring narrative.
- **Headshot included in SPEC-002 rather than deferred:** With an available asset and hiring-focused positioning, skipping the photo would leave credibility value on the table.
- **Remove noindex:** SPEC-001 correctly set noindex on placeholders; this spec replaces the placeholder with real content that should be indexed.

## Effort Comparison

| | AI-Assisted | Human Solo |
|---|---|---|
| Spec creation | ~30 minutes | 2-4 hours |
| Assumptions | Resume, LinkedIn, and 5 clarifying questions pre-answered | PM would need content strategy + stakeholder interviews |

---

## Approval

**Tier:** Standard
**Gate owner:** Rob Parker
**Requires:** Documented approval with responses to any agent-raised concerns

### Structured Review Checklist
- [x] Business intent confirmed (Director/VP SaaS hunt positioning)
- [x] Scope boundaries clear (About page only, not Resume/Contact/etc.)
- [x] Acceptance criteria testable
- [x] Dependencies identified (SPEC-001 complete, headshot available, LinkedIn context available)
- [x] Tier appropriate (Standard — new page with image asset, no external integrations)
- [x] No mandatory escalation triggers (no auth, payments, PII, or external integrations)

### Gate Responses (2026-04-17)

| Concern | Response |
|---------|----------|
| C-1: AI Adoption Framework confidentiality | Comfortable discussing publicly; keep content at summary level (no invented tier specifics) |
| C-2: SugarCRM metrics attribution | No concerns — public on LinkedIn, fine to repeat |
| C-3: Philosophy quote wording | Copywriter may lightly polish while preserving meaning |
| C-4: Location | "Atlanta, Georgia" |
| C-5: Personal depth | Include: husband and father of three |
| C-6: Headshot alt text | "Professional headshot of Rob Parker" |

**Decision:** Approved
**Approved by:** Rob Parker
**Date:** 2026-04-17

---

## Architecture Review

**Reviewer:** architect-reviewer agent
**Date:** 2026-04-17
**Recommendation:** Approve with conditions (all conditions accepted)

### Findings
- Pattern fit: Strong — reuses SPEC-001 primitives (hero, highlights-grid, cta-section, btn variants)
- Complexity: Over-engineered image pipeline simplified (single JPEG, not WebP + fallback)
- Integration risks: None — no new external dependencies
- Security: EXIF stripping added to prevent metadata leak (GPS/device info)
- Performance: 100KB budget realistic per-request with `srcset`; hero must be eager + fetchpriority=high
- Accessibility: AI Adoption Framework must be semantic `<ol>`, CSS-only stepped visual
- Technical debt: Minor — og:image coverage gap on other pages tracked as follow-up
- Evolution: Clean — no SSG migration obstacles introduced

### Implementation Guidance (All Accepted)

| # | Guidance | Status |
|---|---------|--------|
| IG-1 | `images/` for optimized output only; source PNG to `images/source/` (gitignored) | Accepted |
| IG-2 | Single JPEG format (not WebP, not `<picture>` fallback) | Accepted |
| IG-3 | `<img srcset="jpg 1x, @2x.jpg 2x">` with explicit `width`/`height` to prevent CLS | Accepted |
| IG-4 | Hero headshot: `loading="eager"` + `fetchpriority="high"` | Accepted |
| IG-5 | Strip EXIF metadata during export | Accepted |
| IG-6 | `og:image` must be absolute URL | Accepted |
| IG-7 | AI Framework as semantic `<ol>`, CSS-only stepped visual, all text in DOM | Accepted |
| IG-8 | New `hero-profile` variant of `.hero` — don't fork base styles | Accepted |
| IG-9 | Reuse `highlights-grid`/`highlight-card` for "How I Lead" section | Accepted |
| IG-10 | Reuse `.cta-section`/`.section-dark` + `.btn-white`/`.btn-outline-white` | Accepted |
| IG-11 | Remove `noindex` from `about.html` | Accepted |
| IG-12 | Document image optimization recipe in `governance/stack-quirks.md` during SPEC-002 | Accepted |
| IG-13 | Keep alt text "Professional headshot of Rob Parker" with WHY comment | Accepted |

### Condition Decisions

| Condition | Decision |
|-----------|----------|
| Image format | Single JPEG (no `<picture>` fallback) |
| <100KB budget | Per-request (per delivered file to viewport) |
| Source file location | Move to `images/source/` (gitignored) |
| Image optimization tool | Local CLI (cwebp/ImageMagick/jpegoptim/mozjpeg) |

### Follow-up Tracked
- og:image coverage gap on other pages → trivial-tier follow-up after this spec

### Arch Gate Approval
**Decision:** Approved
**Approved by:** Rob Parker
**Date:** 2026-04-17

---

## Code Review

**Reviewer:** code-reviewer agent
**Date:** 2026-04-17
**Result:** No critical findings. 8 important findings and 8 suggestions — all fixed.

### Findings Resolved

| # | Finding | Resolution |
|---|---------|------------|
| I-1 | CSS width/height override HTML attributes — CLS protection fragile | WHY comment added documenting intent |
| I-2 | AI Framework `<ol>` missing `role="list"` | Added with WHY comment |
| I-3 | CSS counter + `<ol>` may cause screen reader redundancy | WHY comment documenting accepted trade-off |
| I-4 / S-5 | `.hero-profile-text h1` font-size override broke responsive cascade | Removed override; responsive cascade restored |
| I-5 | No placeholder background during image load | Added `background-color: var(--border-dark)` |
| I-6 | Inline "Off the Clock" link too prominent | New `.body-link` modifier class applied |
| I-7 | `<blockquote>` lacks attribution | Added `<footer>— <cite>Rob Parker</cite></footer>` |
| I-8 | Straight ASCII quotes in displayed content | Replaced with `&ldquo;`/`&rdquo;` |
| S-1 | og:url needs WHY comment | Added |
| S-2 | Skip-link comment parity with index.html | Added |
| S-3 | Section 4 section-header whitespace with no descriptor | Removed wrapper; new `.section-heading-standalone` class |
| S-4 | Redundant 20% mention in supporting paragraph | Paragraph trimmed |
| S-6 | Margin shorthand cleanup (`margin: 0 0 X`) | Changed to `margin-bottom: X` |
| S-7 | Document `images/source/` convention in CLAUDE.md | Added |
| S-8 | Document why Pillow used instead of spec-listed tools | Added to stack-quirks.md |

---

## QA Verification

**Reviewer:** qa-expert agent
**Date:** 2026-04-17
**Result:** READY FOR DEPLOYMENT

### Acceptance Criteria: All 14 PASS

All 16 applied fixes (I-1 through I-8, S-1 through S-8) verified in place. SPEC-001 regression check clean.

### WARN Findings (Both Resolved)

| ID | Finding | Resolution |
|----|---------|------------|
| WARN 1.4 | Meta description 155 chars (spec said ~150) | Trimmed to 146 chars |
| WARN 2.7 | `.cta-actions` buttons don't stack full-width at 480px | Added `.cta-actions` responsive rules matching `.hero-actions` pattern |

### Static Verification — All Passing
- Content/copy: spelling, grammar, internal links, meta tags, noindex removed, typographic quotes, no redundant metrics
- Visual/design: CSS custom properties consistency, responsive breakpoints, all classes exist, pattern reuse correct, new CSS additive
- Accessibility: skip-link, semantic HTML, single H1 hierarchy, role="list" on ol and uls, role="img"+aria-label on metrics, blockquote attribution, no redundant roles, color contrast AA+
- JavaScript: no main.js changes, defer attribute, progressive enhancement intact
- Security: external links secured, no inline scripts/styles, no external resources, EXIF stripped
- Performance: 1x=21.7KB, 2x=61.8KB (both under 100KB), eager+fetchpriority=high, explicit width/height for CLS, system font stack, no CDN
- Asset management: source gitignored, recipe documented, CLAUDE.md updated

### Manual Browser Verification Required Before Deployment (Pending — Rob)
1. Hero photo at all 3 breakpoints (placeholder background visible on slow load)
2. Skip link functionality with sticky header offset
3. Hamburger menu at <768px (open/close/Escape/outside click)
4. AI Framework stepped visual at all breakpoints
5. Active nav highlighting on about.html
6. Bottom CTA buttons stack full-width on mobile
7. OG social card preview (post-deploy, LinkedIn Post Inspector)
8. Progressive JPEG load behavior on throttled connection
9. VoiceOver announcement of aria-label metric values
10. VoiceOver announcement of blockquote attribution

### QA Gate Approval
**Decision:** READY FOR DEPLOYMENT pending manual browser verification
**Date:** 2026-04-17

### Manual Browser Verification
**Completed by:** Rob Parker
**Date:** 2026-04-17
**Result:** All 10 verification items pass

**Status:** SPEC-002 complete. Deployment deferred until all content specs are built and SPEC-000 (Cloudflare Pages setup) is completed.
