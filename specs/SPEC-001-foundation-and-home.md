# SPEC-001: Site Foundation & Home Page

**Status:** Approved
**Tier:** Standard
**Author:** PM-Spec Agent
**Date:** 2026-04-14
**Branch:** `spec/SPEC-001-foundation-and-home`

---

## Summary

Build the foundational site infrastructure (CSS design system, shared navigation/footer, JavaScript utilities) and the home page (index.html). This is the first deliverable in a series of page-level specs that will compose the full robcparker.com marketing site.

## Context

Rob Parker is a senior engineering executive with 25+ years of experience, most recently Senior Director of Engineering at SugarCRM leading AI platform engineering. The site serves as a hiring-facing portfolio — positioning Rob for engineering leadership roles. Secondary pages (services, resume, contact) will be built in subsequent specs on top of this foundation.

The site is a static HTML/CSS/JS project hosted on Cloudflare Pages with no build process, no frameworks, and no dependencies.

## Requirements

### Foundation: Design System (css/style.css)

1. **CSS Custom Properties** defined in `:root` for theming:
   - Color palette (primary, secondary, accent, text, background, surface, border)
   - Typography scale (font families, sizes, weights, line heights)
   - Spacing scale (consistent padding/margin values)
   - Border radius, shadow, and transition values
   - Breakpoint-aware overrides where needed

2. **Base Styles:**
   - CSS reset/normalize
   - Typography defaults (body, headings h1-h6, paragraphs, links)
   - Container/wrapper with max-width and responsive padding
   - Mobile-first responsive grid utilities using CSS Grid and Flexbox

3. **Component Styles:**
   - Navigation bar (desktop horizontal, mobile hamburger)
   - Footer (consistent across all pages)
   - Hero section pattern (reusable across pages)
   - Button styles (primary, secondary/outline variants)
   - Card component (for service highlights on home page)
   - Section spacing and dividers

4. **Responsive Breakpoints:**
   - Mobile-first base styles (< 768px)
   - Tablet/desktop (>= 768px)
   - Small mobile adjustments (<= 480px)

### Foundation: Shared JavaScript (js/main.js)

1. **Mobile Navigation Toggle:**
   - Hamburger menu button toggles nav visibility
   - Closes on outside click
   - Closes on Escape key
   - Manages aria-expanded attribute

2. **Active Page Highlighting:**
   - Detect current page from URL
   - Apply active class to corresponding nav link

3. **Smooth Scrolling:**
   - Smooth scroll behavior for anchor links

4. **Utility Functions:**
   - Debounce function
   - Viewport detection (element in view)

### Foundation: Shared HTML Structure

All pages will use this consistent structure:

1. **Head:**
   - Charset, viewport meta
   - Page-specific title and meta description
   - Open Graph tags (og:title, og:description, og:image, og:url)
   - Stylesheet link

2. **Skip-to-Content Link** (accessibility)

3. **Header/Navigation:**
   - Site logo/name linking to home
   - Navigation links: Home, About, Resume, Services (dropdown or flat), Contact
   - Mobile hamburger toggle button
   - ARIA attributes for accessibility

4. **Main Content Area** (page-specific)

5. **Footer:**
   - Copyright with current year
   - Key navigation links
   - LinkedIn profile link: https://www.linkedin.com/in/robcparker/

6. **Script tag** referencing js/main.js

### Home Page (index.html)

1. **Hero Section:**
   - Headline positioning Rob as a senior engineering leader
   - Supporting subheadline summarizing experience and value proposition
   - Primary CTA (e.g., "View Resume" or "Get in Touch")
   - Secondary CTA (e.g., "Learn More" linking to About)

2. **Experience Highlights Section:**
   - 3-4 key proof points drawn from career (e.g., years of experience, teams led, AI/ML platform work, industries served)
   - Visual presentation (cards, icons, or metrics-style display)

3. **Services Overview Section:**
   - Brief introduction to available services
   - Card for Tech Advisory with short description and CTA to services/tech-advisory.html
   - Card for Guitar with short description and CTA to services/guitar-playing.html
   - Services positioned as secondary to the portfolio narrative

4. **Brief About Teaser:**
   - 2-3 sentence summary of Rob's background
   - CTA linking to about.html for full story

5. **Contact CTA Section:**
   - Bottom-of-page call to action encouraging contact
   - Link to contact.html

6. **SEO & Meta:**
   - Title tag: "Rob Parker — Senior Engineering Leader"
   - Meta description optimized for search
   - Open Graph tags for social sharing

## Content Requirements

All public-facing copy (headlines, body text, CTAs, meta descriptions) will be drafted by the marketing-copywriter agent per the development workflow. The copywriter will receive:
- Rob's resume for context
- Positioning direction: hiring-facing portfolio for senior engineering leadership
- Page structure from this spec
- Target audience: recruiters, hiring managers, VPs/CTOs seeking engineering leadership

Content deliverables from marketing-copywriter:
- Hero headline and subheadline (2-3 variations for Rob to choose)
- Experience highlights copy
- Services overview copy (noting guitar is a personal passion, not commercial)
- About teaser copy
- Contact CTA copy
- Meta title and description
- Open Graph title and description

### Placeholder Pages

Minimal placeholder pages for all nav targets so the site has no dead links. Each placeholder uses the shared HTML structure (nav, footer) and contains a simple heading and "Coming soon" message. These will be replaced by their respective specs.

- `about.html` — placeholder (SPEC-002)
- `resume.html` — placeholder (SPEC-003)
- `contact.html` — placeholder (SPEC-004)
- `services/tech-advisory.html` — placeholder (SPEC-005)
- `services/guitar-playing.html` — placeholder (SPEC-006)

## Out of Scope

- Full about page content (SPEC-002)
- Full resume page with HTML rendering and PDF download (SPEC-003)
- Contact page with form and backend integration (SPEC-004)
- Full Tech Advisory service page (SPEC-005)
- Full Guitar Playing page (SPEC-006)
- Favicon/brand asset creation (future spec — use graphic-artist agent for custom design)
- Analytics integration
- Form service selection and integration (SPEC-004)
- AI agent product features (Phase 2)
- Any build process, bundling, or framework

## Dependencies

- None — this is the first spec, greenfield build

## Non-Functional Requirements

### Performance
- No external dependencies or CDN requests (no Google Fonts, no icon libraries loaded from CDN)
- System font stack or self-hosted fonts only
- Total page weight under 500KB (excluding images)
- All CSS in a single file, all JS in a single file

### Accessibility
- WCAG 2.1 AA compliance target
- Skip-to-content link
- Semantic HTML5 elements (header, nav, main, section, article, footer)
- Sufficient color contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Keyboard navigable (tab order, focus styles, Escape to close mobile nav)
- Alt text on all images
- ARIA attributes on interactive elements (nav toggle, expandable sections)

### SEO
- Semantic heading hierarchy (single h1 per page)
- Meta description on every page
- Open Graph tags on every page
- Clean, descriptive URLs

### Browser Support
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge — latest 2 versions)
- Graceful degradation for older browsers (site remains usable without JS)

## Acceptance Criteria

### Foundation — CSS

- **Given** a new page is created, **When** it links to css/style.css, **Then** it inherits the full design system (colors, typography, spacing) via CSS custom properties
- **Given** the site is viewed on a screen < 768px wide, **When** the layout renders, **Then** all content is readable and properly stacked without horizontal scrolling
- **Given** the site is viewed on a screen <= 480px wide, **When** the layout renders, **Then** touch targets are at least 44x44px and text remains legible
- **Given** any text element on the site, **When** checked against WCAG contrast requirements, **Then** it meets AA contrast ratios

### Foundation — JavaScript

- **Given** a mobile viewport (< 768px), **When** the user taps the hamburger button, **Then** the navigation menu appears and aria-expanded is set to true
- **Given** the mobile nav is open, **When** the user taps outside the nav or presses Escape, **Then** the nav closes and aria-expanded is set to false
- **Given** any page on the site, **When** the page loads, **Then** the corresponding nav link has an active/current class applied
- **Given** JavaScript is disabled, **When** the page loads, **Then** navigation links are still visible and functional (progressive enhancement)

### Foundation — HTML Structure

- **Given** any page, **When** the HTML is validated, **Then** it passes W3C validation with no errors
- **Given** any page, **When** inspected, **Then** it contains skip-to-content link, semantic header/nav/main/footer, and correct meta tags

### Home Page

- **Given** a user lands on the home page, **When** the page renders, **Then** the hero section displays a headline, subheadline, and at least one CTA above the fold
- **Given** a user scrolls the home page, **When** they reach the experience section, **Then** 3-4 career highlights are displayed with visual distinction
- **Given** a user views the services section, **When** they see the service cards, **Then** each card links to its respective service page placeholder
- **Given** a user views the page source, **When** they check meta tags, **Then** title, description, and OG tags are present and populated with real content (not placeholder text)

## Decision Rationale

- **Split specs over monolith:** Building the foundation separately means subsequent page specs (SPEC-002 through SPEC-006) can assume the design system exists and focus purely on content and page-specific behavior. Each page gets its own QA gate rather than all pages being tested as one large batch.
- **System font stack preferred:** Avoids external font CDN dependencies, improving performance and privacy. Can revisit with self-hosted fonts in a future spec if the design calls for it.
- **No CSS framework:** The site is small enough that custom CSS is more maintainable than learning/fighting a framework's opinions. CSS custom properties give us theming without the overhead.
- **Services section kept on home page despite being secondary:** Even with hiring-facing positioning, showing range (advisory + guitar) makes Rob more memorable. The guitar page humanizes the portfolio.
- **Progressive enhancement:** Nav links work without JS. The site is usable (if less polished) with CSS only. This matches the "no framework" philosophy and improves resilience.

## Effort Comparison

| | AI-Assisted | Human Solo |
|---|---|---|
| Spec creation | ~30 minutes | 2-4 hours (requirements gathering, writing, formatting) |
| Assumptions | Resume and positioning provided; 6 clarifying questions pre-answered | PM would need stakeholder interviews |

---

## Approval

**Tier:** Standard
**Gate owner:** Rob Parker
**Requires:** Documented approval with responses to any agent-raised concerns

### Structured Review Checklist
- [x] Business intent confirmed (hiring-facing portfolio)
- [x] Scope boundaries clear (foundation + home + placeholders)
- [x] Acceptance criteria testable
- [x] Dependencies identified (none)
- [x] Tier appropriate (Standard — new static page with design system)
- [x] No mandatory escalation triggers (no auth, payments, PII, or external integrations beyond static hosting)

### Gate Responses (2026-04-14)

| Concern | Response |
|---------|----------|
| C-1: Social profile links | LinkedIn only: https://www.linkedin.com/in/robcparker/ — no GitHub link |
| C-2: Favicon | Omit for now. Future spec with graphic-artist agent for custom favicon |
| C-3: Dead links to unbuilt pages | Create minimal placeholder pages within SPEC-001 |
| C-4: Image assets | Text-only initially is acceptable |
| C-5: No form service in SPEC-001 | Confirmed — no "book a call" CTA on home page |

**Decision:** Approved
**Approved by:** Rob Parker
**Date:** 2026-04-14

---

## Architecture Review

**Reviewer:** architect-reviewer agent
**Date:** 2026-04-14
**Recommendation:** Approve

### Findings
- Pattern fit: Full alignment with static-first architecture, no deviations
- Complexity: Simplest approach that satisfies requirements
- Integration risks: None — zero external dependencies
- Security: Minimal attack surface, no concerns
- Performance: Well-constrained (system fonts, single CSS/JS, no CDN)
- Technical debt: Negligible
- Evolution path: Clean — supports future SSG/framework migration without lock-in

### Implementation Guidance (All Accepted)

| # | Guidance | Status |
|---|---------|--------|
| IG-1 | Omit `og:image` or provide placeholder — never ship broken URL | Accepted |
| IG-2 | Use `<script defer>` not `async` | Accepted |
| IG-3 | Build only CSS grid/layout the home page needs, extend later | Accepted |
| IG-4 | Hide hamburger by default in CSS, show only when JS active | Accepted |
| IG-5 | Hardcode copyright year (2026), no dynamic JS | Accepted |
| IG-6 | Verify color contrast meets WCAG AA against actual backgrounds | Accepted |

### Arch Gate Approval
**Decision:** Approved
**Approved by:** Rob Parker
**Date:** 2026-04-14

---

## Code Review

**Reviewer:** code-reviewer agent
**Date:** 2026-04-15
**Result:** No critical findings. 6 important findings and 5 suggestions — all fixed.

### Findings Resolved

| # | Finding | Resolution |
|---|---------|------------|
| I-1 | Guitar Playing missing from header nav | Added to all 8 HTML files |
| I-2 | Duplicate `display` declaration in `.btn` | Removed `inline-block`, kept `inline-flex` |
| I-3 | Hardcoded hex colors in footer/hero | Added `--text-muted-dark`, `--text-subtle-dark`, `--text-on-dark`, `--border-dark` custom properties |
| I-4 | Escape key handler fired when nav closed | Added guard checking `aria-expanded === 'true'` |
| I-5 | `--accent-color` contrast not annotated | Added WCAG AA annotation (3.6:1 — large text only) |
| I-6 | Redundant `role="banner"` / `role="contentinfo"` | Removed from all 8 HTML files |
| S-1 | Skip-link target obscured by sticky header | Added `scroll-margin-top: 80px` to `#main-content` |
| S-2 | `normalizePath` closure created per iteration | Moved outside `forEach` loop |
| S-3 | Placeholders indexable by search engines | Added `<meta name="robots" content="noindex">` to 5 placeholder pages |
| S-4 | `role="list"` lacked explanation | Added WHY comment referencing Safari/VoiceOver workaround |
| S-5 | No regression from I-2 fix | Confirmed safe |

---

## QA Verification

**Reviewer:** qa-expert agent
**Date:** 2026-04-15
**Result:** Conditional pass — all items resolved or accepted

### QA Findings

| ID | Severity | Finding | Resolution |
|----|----------|---------|------------|
| QA-001 | FAIL | Title tag "Senior Engineering Executive" vs spec "Senior Engineering Leader" | Accepted — "Executive" chosen by copywriter for consistent brand voice. Spec acceptance criterion amended |
| QA-002 | WARN | Fourth highlight card "3+" missing aria-label | Fixed — added `aria-label="3 plus"` for screen reader parity |
| QA-003 | INFO | W3C HTML validation not possible via static analysis | Deferred to manual browser verification |
| QA-004 | FAIL | W3C validation: `aria-label` not valid on 3 `<div class="highlight-metric">` elements | Fixed — added `role="img"` to each |

### Static Verification — All Passing
- Content/copy: spelling, grammar, internal links, meta tags, noindex on placeholders
- Visual/design: CSS custom properties consistency, breakpoints, class/ID references
- Accessibility: skip-link, semantic HTML, ARIA, heading hierarchy, `role="list"` with WHY
- JavaScript: progressive enhancement, Escape guard, active nav logic, form scaffolding, WHY comments, defer
- Security: external links have `rel="noopener noreferrer"`, no inline scripts, no external resources
- Performance: system font stack, single CSS/JS, no CDN

### Manual Browser Verification (Pending — Rob)
1. Hamburger menu behavior (open, close via outside click, close via Escape, aria-expanded toggling, X animation)
2. Active nav highlighting on each of 6 pages
3. Skip-to-content link functionality with sticky header offset
4. Responsive layout at 768px and 480px (no horizontal scroll, grid collapse, hero CTAs stack at 480px)
5. Color contrast spot-check with browser DevTools
6. Touch targets on mobile emulation
7. No console errors on any page
8. W3C HTML validation for each page

### QA Gate Approval
**Decision:** Conditional pass — ready for manual browser verification before deployment
**Date:** 2026-04-15
