# CLAUDE.md — RobCParker Website

## Project Overview

Personal website for Rob Parker and future product platform. Currently a static
marketing site for self promotion around senior engineering leadership. Evolving toward an
AI agent product with subscription billing.

**Owner:** Rob Parker, Senior Engineering Executive
**Methodology:** Spec-Driven Development (SDD) — Solo Operator Model
**URL:** https://www.robcparker.com

## Current State

### Tech Stack
- **Frontend:** Static HTML5, CSS3 (custom properties), vanilla JavaScript (ES6+)
- **Structure:** Multi-page static site with shared nav/footer
- **Styling:** CSS custom properties for theming, Flexbox/Grid, mobile-first responsive
- **JavaScript:** Vanilla JS — mobile nav toggle, contact form validation, smooth scrolling, debounce/viewport utilities
- **Hosting:** Cloudflare (connected to GitHub repository for automatic deployments)
- **Domain:** robcparker.com
- **Frameworks:** None — pure HTML/CSS/JS, no build process
- **Dependencies:** None

### Site Map
```
index.html                          # Home — service overview, hero, CTAs
about.html                          # Page about Rob Parker
resume.html                         # Rob Parker resume
contact.html                        # Contact page with validated form
advisory.html                       # Technical advisory service page
css/
  style.css                         # Main stylesheet with CSS custom properties
js/
  main.js                           # Shared JavaScript (nav, forms, utilities)
images/                             # Committed: web-optimized image assets
  source/                           # Gitignored: unoptimized source files (originals)
```

**Image convention:** Originals (PNG, HEIC, RAW) live in `images/source/` (gitignored). Web-optimized outputs (JPEG at multiple sizes for `srcset`) are committed to `images/`. See `governance/stack-quirks.md` for the exact optimization recipe.

**Resume sync:** The resume exists in two forms — `resume.html` (web) and `files/rob-parker-resume.pdf` (downloadable). The PDF is the canonical source. When updating the resume, update the PDF first, then mirror the changes to `resume.html`.

### CSS Custom Properties
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --accent-color: #3b82f6;
    /* Additional variables in css/style.css */
}
```

### JavaScript Capabilities
- Mobile navigation toggle (hamburger menu)
- Contact form client-side validation (backend integration ready — see main.js)
- Smooth scrolling
- Active page highlighting
- Utility functions: debounce, viewport detection

### Known Issues
- None currently tracked

## Product Roadmap

1. **Current:** Static marketing site (HTML/CSS/JS)
2. **Next:** AI agent product — conversational agent trained on Rob's knowledge
3. **Future:** Subscription payment model for conversational agent

### Architectural Implications
- Phase 1 can stay static or move to a static site generator (Hugo, Astro)
- Phase 2 requires a backend (API, database, AI integration) — this is the critical architecture decision
- Phase 3 requires integration with a payment processor (stripe, etc.)

## Development Methodology: Spec Driven Development (SDD)

### Pipeline
```
PM-Spec → Spec Gate → Architect-Review → Arch Gate → Implementer-Tester → QA Gate → Deployment → Deploy Gate → Production
```

## SDD Pipeline Defaults
- Execute specs through ALL gates (Spec → Arch → Implementation → QA) autonomously unless asked otherwise
- Never mark a gate as approved without explicit user authorization
- After replace_all edits, run a grep verification pass to catch indentation variants
- Verify production deploys against the apex domain (robcparker.com), not the www subdomain

## Git & GitHub Conventions
- Use the configured git author email for ALL commits; if a history rewrite occurs, re-verify author email on subsequent commits
- Do not invent gh CLI flags — run `gh <cmd> --help` first if unsure
- Assume gh CLI may need install/auth on fresh environments; check `gh auth status` early in PR workflows

## Edit Safety
- When editing spec or governance docs (R-numbered sections, gate decisions), re-read the file after edits to confirm no adjacent sections were clobbered
- Prefer targeted edits over replace_all on structured documents


### Agent Architecture: Two Layers

This project uses a **two-layer agent architecture**:

**Layer 1 — SDD Pipeline Agents** (orchestration)
These control the flow of work through the SDD pipeline. They produce and validate
artifacts (specs, checklists) and invoke specialist agents for execution.
- `sdd/pm-spec.md` — Spec authoring and structuring
- `sdd/architect-review.md` — Architecture validation against patterns
- `sdd/implementer-tester.md` — Implementation coordination and QA
- `sdd/deployment.md` — Deployment preparation
- `sdd/learning-engine.md` — Learning event analysis

**Layer 2 — Specialist Agents** (execution)
These do the actual work. They existed before SDD and continue to operate
as they always have, but are now invoked within the pipeline structure.
- `architect-reviewer.md` — System design validation
- `code-reviewer.md` — Code quality and security review
- `error-detective.md` — Error pattern analysis
- `frontend-developer.md` — Frontend implementation
- `graphic-artist.md` — Visual design specs
- `marketing-copywriter.md` — Marketing copy
- `multi-agent-coordinator.md` — Agent orchestration
- `penetration-tester.md` — Security testing
- `qa-expert.md` — Quality assurance strategy
- `test-automator.md` — Test automation
- `ui-designer.md` — UI design

### How the Layers Work Together

When a spec flows through the pipeline:

1. **PM-Spec stage:** `sdd/pm-spec.md` produces the Feature Spec.
   May invoke `marketing-copywriter` for content-heavy specs.

2. **Architect-Review stage:** `sdd/architect-review.md` validates the spec.
   Invokes `architect-reviewer` for design validation.
   Invokes `penetration-tester` for security-sensitive specs.

3. **Implementer-Tester stage:** `sdd/implementer-tester.md` coordinates implementation.
   Invokes `frontend-developer` for HTML/CSS/JS implementation.
   Invokes `ui-designer` and `graphic-artist` for design work.
   Invokes `test-automator` and `qa-expert` for testing.
   Invokes `code-reviewer` for code quality checks.

4. **Deployment stage:** `sdd/deployment.md` prepares release.

5. **Learning Engine:** `sdd/learning-engine.md` analyzes gate events.
   Invokes `error-detective` for escape root cause analysis.

### Gate Ownership (Solo Operator)
All gates owned by Rob Parker with AI agent structured review.
See `governance/solo-operator-model.md` for the full model.
Critical tier requires external second reviewer.

### Conventions
- Spec IDs: `SPEC-NNN` (sequential, starting at 001)
- Checklists: `ARCH-SPEC-NNN`, `QA-SPEC-NNN`, `DEPLOY-SPEC-NNN`
- Branches: `spec/SPEC-NNN-short-description`
- Commits reference spec ID: `[SPEC-NNN] description`

### Complexity Tier Defaults
| Change Type | Default Tier |
|------------|-------------|
| Copy/content updates | Trivial |
| New static page | Standard |
| Styling/layout changes | Trivial or Standard |
| New interactive feature | Standard or Complex |
| Framework migration | Complex |
| AI agent integration | Complex or Critical |
| Auth/user accounts | Critical |
| Payment/subscription | Critical |

### SDD Experimental: Preserving the Why

These additions are experimental. Evaluate after 10 specs.

**Decision Rationale:** Standard+ specs include a `## Decision Rationale` section
capturing alternatives considered, constraints, assumptions, and trade-offs.
See `sdd/pm-spec.md` for guidance. Trivial specs may skip.

**Gate Annotations:** When approving gates, briefly note *why* — especially when
overriding recommendations or choosing between alternatives.
See `specs/templates/gate-annotation-guide.md`.

**Post-Completion Retros:** After production deployment, spend 2-3 minutes capturing
what went well, what surprised you, and process observations.
See `specs/templates/post-completion-retro.md`. Skip if nothing stands out.

**Learning Log:** Track whether these mechanisms are useful at
`specs/why-capture-learning-log.md`. Review monthly.

**Stack Quirks:** Platform and tool gotchas discovered through experience.
Add one-liners as you hit them. See `governance/stack-quirks.md`.

## Development Workflow

**Mandatory Process:** See `.claude/development-workflow.md` for complete workflow.

### Key Requirements
1. **Content Review:** All public-facing content MUST be reviewed by `marketing-copywriter` agent before implementation
2. **QA Process:** Complete QA checklist (`.claude/qa-checklist.md`) before every commit
3. **No Exceptions:** Even "small" changes follow the full process

### Quick Reference
- **Before writing content:** Ask "Will users see this?" → YES → Use marketing-copywriter
- **Before every commit:** Run QA checklist, document results in commit message
- **Before every push:** Confirm QA was completed

## Code Conventions

### HTML
- Semantic HTML5 (header, nav, main, section, footer)
- Accessibility: alt text, skip-to-content link, ARIA where needed
- SEO: meta tags, OG tags on every page

### CSS
- CSS custom properties for theming (defined in :root)
- Mobile-first responsive design
- Breakpoints: 768px, 480px
- Flexbox and Grid for layout
- No CSS frameworks

### JavaScript
- Vanilla ES6+ (no frameworks or build tools)
- `main.js` for shared functionality
- Use `// WHY:` prefix for comments explaining non-obvious decisions (searchable, distinct from "what" comments)
- Client-side form validation pattern established
- Event delegation where appropriate

## Security

### Current
- Static site — minimal attack surface
- No user data collection beyond contact form (client-side only)
- No authentication or sessions
- HTTPS enforced via hosting provider

### Future Requirements
- Auth via established provider (not custom-built)
- Payments via Stripe or equivalent (never handle card data directly)
- PII encrypted at rest and in transit
- Rate limiting on API endpoints
- Agent conversation data retention policy
