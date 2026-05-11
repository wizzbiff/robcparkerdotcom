# SPEC-016: "How This Site Was Built" Page

**Status:** Spec Gate approved 2026-05-08 — implementation gated on repo scrub pass (per Q3 resolution)
**Tier:** Standard (confirmed at Spec Gate; see Tier Selection below)
**Author:** PM-Spec Agent (derived from Rob's request 2026-05-06: "Add a new page labeled 'How this site was built' that explains our SDD workflow… highlight and explain the agentic development workflow that we are using to build this site… inspired by and expanded from Grant Howe's SDD workflow… provide explanations, architecture diagrams, and an overall point of view on the SDD workflow… should be future proof in the sense of hedging towards not just how the SDD workflow works today, but how it could evolve for the future, and what parts of the workflow are future proof, and which might evolve or currently have problems")
**Date:** 2026-05-06 (Spec Gate approved 2026-05-08)
**Branch:** `spec/SPEC-016-how-this-site-was-built` (to be created at implementation start, after scrub-pass precondition is met)

---

## Summary

Add a new public-facing page to robcparker.com that explains the Spec-Driven Development (SDD) agentic workflow Rob uses to build and evolve the site. The page is a portfolio piece — the audience that hires senior engineering leaders for AI-forward SaaS companies is the same audience that benefits from seeing concrete evidence of AI-native engineering execution. The page covers the SDD methodology, the two-layer agent architecture, the gate / tier / pipeline mechanics, and an honest perspective on what's stable, what's experimental, and what may evolve. It includes architecture diagrams (inline SVG), credits Grant Howe's foundational work as the seed for Rob's adapted SDD pipeline, and reads as both a methodology explainer and a credibility signal.

This is a content + visual design page. It does not introduce new third-party services, authentication, or backend functionality.

## Context

### Why this page exists

Rob is targeting Director / VP of Engineering roles at AI-forward SaaS companies (per `project_positioning.md` memory). The audience evaluates candidates partly on whether they can describe — concretely — how they bring AI-native engineering practices into a real organization. Most candidates can tell that story in an interview; very few can show a working artifact.

This page is the working artifact. It documents:

1. **A real methodology** — not slideware. SDD is what Rob actually uses to build and evolve robcparker.com. Every spec in `specs/` (SPEC-001 through SPEC-014, with SPEC-015 in flight as of 2026-05-06) is an artifact of this process.
2. **A real architecture** — two layers of agents, a gate-based pipeline, a tier system, experimental mechanisms (Decision Rationale, Gate Annotations, Post-Completion Retros, Stack Quirks).
3. **A real point of view** — what's working, what's experimental, what may evolve, what's currently rough.

It is also an attribution piece. The SDD pipeline Rob runs is adapted from Grant Howe's SDD workflow (`https://www.geekbyte.biz/sdd/dashboard`). Grant provided a skeleton set of Claude Code config that Rob expanded and evolved. The page must credit that origin without overstating Grant's involvement in the current adapted form.

### Why "future-proof" framing matters

Rob's request specifically asks for the page to "hedge towards not just how the SDD workflow works today, but how it could evolve for the future, and what parts of the workflow are future proof, and which might evolve or currently have problems." This framing is doing real work for Rob's positioning:

- **Capability over polish.** A senior-exec audience reads "we know what's stable and what's still being figured out" as engineering judgment, not as hedging. Per `feedback_credibility_signals_philosophy.md` (memory), Rob prefers capability signals over legitimacy signals. Honest assessment is a capability signal.
- **Differentiates from marketing-deck SDD.** Many companies talk about agentic workflows as if they were finished products. Rob's framing — "here's what works, here's what's experimental, here's what's broken" — is a clear differentiator.
- **Future-proofs the page itself.** A page that names today's workflow as "the only way to do this" ages poorly. A page that names today's workflow as "one viable shape, here's why it's shaped this way, here's what may change" stays useful as Rob's methodology evolves.

### Source material that already exists

Most of the explanatory content already lives in the repo and can be drawn directly from these sources:

- `CLAUDE.md` — project overview, two-layer agent architecture, pipeline diagram, tier defaults, SDD experimental mechanisms list (Decision Rationale, Gate Annotations, Post-Completion Retros, Stack Quirks)
- `.claude/agents/sdd/pm-spec.md`, `.claude/agents/sdd/architect-review.md`, `.claude/agents/sdd/implementer-tester.md`, `.claude/agents/sdd/deployment.md`, `.claude/agents/sdd/learning-engine.md` — pipeline agent role definitions
- `.claude/agents/architect-reviewer.md`, `.claude/agents/code-reviewer.md`, `.claude/agents/frontend-developer.md`, etc. — specialist agent role definitions (11 files)
- `governance/solo-operator-model.md` — gate ownership model
- `governance/tier-selection-guidelines.md` — tier definitions
- `governance/escalation-protocols.md` — escalation rules
- `governance/external-services.md` — third-party service governance
- `governance/stack-quirks.md` — accumulated platform gotchas
- `.claude/development-workflow.md` — workflow guardrails
- `.claude/qa-checklist.md` — QA process
- `specs/templates/post-completion-retro.md` and `specs/why-capture-learning-log.md` (referenced in CLAUDE.md, may exist or be future)

The page does NOT need to invent content. It needs to synthesize, structure, and visualize what's already documented.

### What this page is NOT

- **Not a tutorial.** The audience is hiring managers and senior engineering peers, not new SDD adopters. A reader should leave understanding *what Rob does and why it works,* not *how to set up SDD on their own repo.*
- **Not a complete agent reference.** Linking out to repo files for completeness is fine; reproducing every agent definition on the page is overkill.
- **Not a public-facing operations dashboard.** No live spec-status feed, no "X specs shipped this month" widget. The page is narrative + diagrams, not telemetry.

## Requirements

### R1: Create the new page

**File:** new file at `how-this-site-was-built.html` (project root, alongside `index.html`, `about.html`, etc.).

**Page slug — Spec Gate must resolve Q1.** Three viable slugs:

| Slug | Read | Pros | Cons |
|------|------|------|------|
| `/how-this-site-was-built.html` | "How This Site Was Built" | Plain language; matches Rob's request verbatim; clear purpose. | Long URL; verbose in nav. |
| `/methodology.html` | "Methodology" | Tight URL; reads as professional. | Less inviting click target; sounds dry. |
| `/sdd.html` | "SDD" | Shortest; matches the technical term. | Acronym in URL is jargon-y; zero discovery value for non-SDD readers. |

**PM-Spec recommendation:** `/how-this-site-was-built.html` (Option 1). Plain language fits Rob's audience and aligns with the curiosity hook ("How did he build this?"). Slug length is a non-issue; nav label can be shortened to "How It's Built" if needed.

**Page structure (HTML5, mobile-first responsive, matches SPEC-008 / SPEC-009 design system):**

- `<head>` — full meta tag set per SPEC-013 SEO conventions (description, OG image, Twitter card). OG image generation per SPEC-013's Pillow recipe.
- Skip-to-content link (matches all other pages).
- Shared `<header>` nav (matches all other pages — see R2 for nav placement decision).
- `<main>` with sections per R3.
- Shared `<footer>` (matches all other pages).

**No new CSS file.** All styling lives in `css/style.css` and reuses the SPEC-008 / SPEC-009 design tokens. New utility classes for the diagrams (R4) live in `css/style.css` alongside existing component classes.

**No new JS.** No interactive widgets. All content static.

### R2: Navigation placement — RESOLVED at Spec Gate (Main Nav)

Spec Gate (2026-05-08) resolved Q2 to **Main nav placement**. Rationale: this page does real positioning work for an AI-forward-SaaS hiring audience, and discoverability outweighs nav-density concerns. Burying it in the footer would reduce the chance a recruiter who lands directly on the home page finds it.

**Implementation (replaces draft footer + bio plan):**

- Add a new nav item **"How It's Built"** (3 words; shorter than the page H1 to fit the existing nav rhythm) to the main nav across all six pages: `index.html`, `about.html`, `resume.html`, `contact.html`, `advisory.html`, and the new `how-this-site-was-built.html`.
- Recommended position in the nav order: **between Resume and Contact** (Home → About → Resume → How It's Built → Contact → Advisory). Rationale: keeps the candidate-evaluation path (Home → About → Resume) clean as the first three items, places the methodology page just before the conversion CTA (Contact), and respects SPEC-011's deliberate placement of Advisory after Contact. `ui-designer` confirms order at implementation; can shift if it visually breaks the nav row at a specific breakpoint.
- Active-page highlighting follows the existing `js/main.js` pattern (the active page gets the active class on its nav item).
- No footer entry added (would be redundant with nav).
- No about-page-bio inline link added (also redundant).

**Mobile considerations:** the existing main nav at the 480px / 768px breakpoints uses a hamburger toggle with a stacked menu. A sixth menu item adds one row to the stacked menu — no layout impact beyond a slightly taller drawer. `ui-designer` confirms.

**Original options table (preserved for traceability):**

<details>
<summary>Original Q2 options — superseded</summary>

| Placement | Pros | Cons |
|-----------|------|------|
| **Main nav** (alongside Home / About / Resume / Contact / Advisory) | Highest visibility; signals Rob believes this is core to his story. | Nav is already 4–5 items; adding a 5th/6th creates clutter on mobile. Advisory is already off-main per SPEC-011; adding another non-core link competes with that prioritization. |
| **Footer-only** | Doesn't compete with primary nav; discoverable but not pushed. | Easy to miss; defeats "this is portfolio" intent. |
| **Footer + a one-line link from About bio** | Discoverable from the narrative ("if you want to see how this site was built, here's the page"); doesn't crowd nav. | Two surfaces to maintain. |

PM-Spec recommendation was Option 3 (footer + bio); Spec Gate chose main nav.

</details>

### R3: Page content sections

The page has **eight sections** in the following order. Each section is a draft outline; marketing-copywriter optimizes copy at implementation.

#### Section 1: Hero

- Headline: "How This Site Was Built" (or per Q1 slug decision — same text either way).
- Subheadline: One sentence framing the page. Draft: "A working portfolio of AI-native engineering practice. Every page on this site was specified, reviewed, built, and tested through a Spec-Driven Development pipeline running on Claude Code agents."
- Two CTAs (matching SPEC-008 hero pattern): primary "See the Pipeline" (anchor link to Section 3), secondary "View the Specs on GitHub" (external link to repo, opens in new tab — `target="_blank" rel="noopener noreferrer"`).
- **Decision required at Spec Gate (Q3):** does Rob want the GitHub link to point at the public repo? If yes, confirm the repo is public. If no, drop the GitHub CTA and replace with anchor to Section 8 (Future Evolution).

#### Section 2: Why this page exists

Two short paragraphs. Draft outline:

> Para 1: Most candidates for senior engineering roles can describe how they would bring AI-native practices to an organization. Few can show a working example. This page is one. Every spec in this site's repo, every commit, every gate decision is an artifact of the SDD methodology I'm describing here. The site itself is the proof.
>
> Para 2: The methodology is adapted from Grant Howe's foundational SDD workflow [link to be confirmed at Spec Gate — see Q5]. Grant provided a skeleton set of Claude Code agent definitions that I extended into the two-layer pipeline this site runs on. What's described below is the version that produced robcparker.com.

**Marketing-copywriter responsibility:** tighten the wording, make sure the Grant attribution lands gracefully (neither overclaiming Rob's adaptations nor understating Grant's seed contribution). The exact wording of the Grant attribution depends on Q5 below.

#### Section 3: The SDD Pipeline

A horizontal flow diagram (R4) showing the seven-stage pipeline:

```
PM-Spec → Spec Gate → Architect-Review → Arch Gate → Implementer-Tester → QA Gate → Deployment → Deploy Gate → Production
```

Below the diagram, one short paragraph per stage describing what happens there. Draft outline:

- **PM-Spec.** Natural-language requirements become a structured Feature Spec with acceptance criteria, dependencies, and a tier recommendation. AI-assisted; human approves at Spec Gate.
- **Spec Gate.** Rob (or an external second reviewer for Critical-tier work) approves the spec. Open questions resolved here, not later.
- **Architect-Review.** Spec validated against existing patterns and architecture; security review if integration-touching.
- **Arch Gate.** Approval to proceed to implementation.
- **Implementer-Tester.** Implementation (frontend-developer agent) + QA strategy (qa-expert) + test automation (test-automator) + code review (code-reviewer).
- **QA Gate.** Approval to commit / merge.
- **Deployment.** Cloudflare Pages auto-deploys from main (when the Pages project is connected — currently deferred per `project_deployment_deferred.md` memory).
- **Deploy Gate.** Confirms the change shipped as expected.

**Marketing-copywriter responsibility:** keep each paragraph tight (1–2 sentences each); the table-stakes detail is in the agent files, not on this page.

#### Section 4: The Two-Layer Agent Architecture

A second diagram (R4) showing the two layers:

- **Layer 1 (Pipeline Agents):** PM-Spec, Architect-Review, Implementer-Tester, Deployment, Learning-Engine. These orchestrate the flow.
- **Layer 2 (Specialist Agents):** Frontend-Developer, Code-Reviewer, Architect-Reviewer, Marketing-Copywriter, UI-Designer, Graphic-Artist, Test-Automator, QA-Expert, Pen-Tester, Error-Detective, Multi-Agent-Coordinator. These do the actual work.

**Diagram intent:** show how Layer 1 invokes Layer 2 (e.g., PM-Spec invokes marketing-copywriter for content-heavy specs; Implementer-Tester invokes frontend-developer + qa-expert + test-automator; Architect-Review invokes architect-reviewer + penetration-tester for security-sensitive specs).

Below the diagram, one paragraph explaining why two layers — the orchestration / execution split lets Rob iterate on the pipeline without rewriting the specialists, and lets the specialists evolve without rewriting the pipeline. This is a real architectural decision worth highlighting; it's the most non-obvious aspect of the design.

#### Section 5: Tiers and Gate Ownership (the Solo Operator Model)

A table summarizing the four tiers (Trivial / Standard / Complex / Critical) with one-line descriptions and gate-depth treatment, drawn directly from `governance/tier-selection-guidelines.md`. Plus a short paragraph naming the Solo Operator Model — Rob owns all gates with AI-agent-structured review, and Critical tier requires an external second reviewer per `governance/solo-operator-model.md`.

**This is one of the more original aspects of Rob's adaptation** of Grant Howe's foundation. Grant's seed config provided the agent skeleton; the tier-and-gate-ownership model is a Rob-specific extension to make the pipeline run with one human in the loop. Section 5 should call that out explicitly without overclaiming.

#### Section 6: Experimental Mechanisms

A short subsection explaining the four SDD-experimental mechanisms in CLAUDE.md, each in 1–2 sentences:

1. **Decision Rationale.** Standard+ specs include a section capturing alternatives considered, constraints, assumptions, and trade-offs. Preserves the *why* behind decisions for future-Rob, agent runs, or external reviewers.
2. **Gate Annotations.** When approving gates, briefly note *why* — especially when overriding recommendations. Prevents the "approved with no context" problem that plagues git history.
3. **Post-Completion Retros.** After production deployment, 2–3 minutes capturing what went well, what surprised, what process learnings emerged. Skip if nothing stood out.
4. **Stack Quirks.** Platform and tool gotchas accumulated through experience, in `governance/stack-quirks.md`. One-liners, not exhaustive docs.

**Honesty note.** The end of this section should explicitly say these mechanisms are experimental and being evaluated. Quote CLAUDE.md: "Evaluate after 10 specs." That phrase signals the same engineering judgment Rob brings to org decisions — define the experiment, define the evaluation criteria, run it, decide.

**Concrete-examples bridge (per Q10 resolution).** Section 6 closes with one inline reference linking to the public repo's `specs/` directory: *"For worked examples of each mechanism above, browse [the `specs/` directory in the repo](https://github.com/wizzbiff/robcparkerdotcom/tree/main/specs)."* Marketing-copywriter refines exact phrasing at implementation. External link convention: `target="_blank" rel="noopener noreferrer"`. The link is only verifiable post-scrub-pass (Q3 precondition); QA Gate confirms the URL resolves anonymously before declaring the page complete.

#### Section 7: What's Working, What's Experimental, What's Rough

This is the **future-proofing section** Rob's request emphasizes. Three subsections. Marketing-copywriter and Rob review wording carefully — this section is the credibility signal.

**Working today (low-change risk):**
- Two-layer agent architecture (pipeline / specialist split has been stable across 14 shipped specs).
- Tier system + escalation triggers (consistently produces the right gate depth).
- Spec-as-source-of-truth pattern (specs survive across context windows; agents pick up where humans left off).
- The Why-capture mechanisms (Decision Rationale, Gate Annotations) — early signal is positive.
- Automated deployment — Cloudflare Pages live; PRs merged to main auto-deploy to production with no further gating beyond what the SDD pipeline produces.

**Experimental (evaluating):**
- Dynamic spec scope decisions (when to bundle related changes vs. ship as separate specs — judgment call, not yet codified).
- The Learning Engine agent (`sdd/learning-engine.md`) — defined but lightly exercised so far.
- Post-Completion Retros — drafted, infrequently triggered.

**Rough or evolving:**
- Solo-operator gate fatigue — one human approving every gate is a cognitive load issue at higher spec velocity. Mitigated by tier system but not solved.
- Cross-spec coordination — sequencing decisions between in-flight specs (the SPEC-012 ↔ SPEC-015 logo-asset rename surfaced at SPEC-015 Spec Gate 2026-05-08 is a current example).
- Memory hygiene — knowing when a memory record has gone stale is harder than writing the record. (Example: the deployment-deferred memory was stale for ~7 days after Cloudflare Pages went live before being caught at SPEC-016 Spec Gate.)
- The hand-off between PM-Spec output and Architect-Review input — sometimes specs need iteration before review can proceed.
- Spec-Gate question backlogs — first-draft specs surface more open questions than they resolve (SPEC-015 had 8; SPEC-016 had 12). Resolving them in one walkthrough is real cognitive work; the Spec Gate walkthrough is becoming its own time-budgeted activity.

**Marketing-copywriter responsibility:** make sure this section reads as engineering judgment, not as "we don't know what we're doing." The framing matters: each item names the issue, names what's being done about it, and signals that the team (Rob + agents) is actively engaging with it.

#### Section 8: Future Evolution

A forward-looking section on where the methodology might go. Two-paragraph outline:

> Para 1: Phase 1 of robcparker.com is a static marketing site. Phase 2 is an AI agent product. Phase 3 is a subscription billing platform. The SDD pipeline that built Phase 1 will need to evolve for Phase 2 — new specialists (backend-developer, db-architect, ai-integrations), new tier triggers (auth, AI safety review, payment compliance), new gates. The pipeline structure itself is designed to absorb that evolution: tiers escalate when the trigger checklist demands it; agents are added by writing new role files in the same shape as the existing ones.
>
> Para 2: What this section signals: the methodology is not a frozen artifact. The two-layer architecture is the load-bearing structure; everything inside is iterable. That property — load-bearing skeleton + replaceable parts — is what makes SDD survive the transition from a static site to a product platform. The same pattern carries to engineering organizations.

**Marketing-copywriter responsibility:** tighten and confirm the framing connects back to Rob's positioning ("the way I bring AI-native practice into an org is the way I bring it into my own work").

#### Closing CTA

A simple block at page bottom: a one-sentence framing of the page as portfolio + a CTA to the contact page. Reuses the existing CTA pattern. Matches SPEC-008 / SPEC-009 design system.

### R4: Architecture diagrams

**Two diagrams** (Section 3 pipeline + Section 4 two-layer architecture).

**Format:** **Inline SVG embedded in HTML.** No external image files, no PNG/JPEG. Justification:

- Inline SVG is text — searchable, accessible (each shape can have a `<title>` element for screen readers), zoomable without quality loss, themeable via CSS custom properties.
- No build step required; matches the "no build process" project constraint per CLAUDE.md.
- Smaller payload than rasterized equivalents.
- `graphic-artist` agent at implementation produces the SVG markup; `ui-designer` reviews layout integration.

**Pipeline diagram (Section 3):**
- Horizontal seven-step flow: rounded rectangles for stages, arrows between them, gate diamonds (or alternate shape) at decision points (Spec Gate, Arch Gate, QA Gate, Deploy Gate).
- Color treatment per existing design tokens (`--primary-color`, `--accent-color`, `--secondary-color` per CLAUDE.md).
- Mobile breakpoint: at ≤768px, the diagram reflows vertically rather than horizontally to remain readable.
- ARIA: `<svg role="img" aria-labelledby="pipeline-diagram-title pipeline-diagram-desc">` with `<title>` and `<desc>` elements describing the diagram for screen readers.

**Two-layer architecture diagram (Section 4):**
- Two horizontal "swim lanes" — top lane = Layer 1 pipeline agents, bottom lane = Layer 2 specialist agents.
- Connecting lines (or arrow patterns) showing which Layer 1 agents invoke which Layer 2 agents.
- Same color/responsive/ARIA conventions as the pipeline diagram.

**Diagram authoring sequence:**
1. `graphic-artist` produces SVG drafts for both diagrams (likely 1–2 iterations to get layout balance right).
2. `ui-designer` reviews integration with the page's surrounding rhythm (band-alt usage per SPEC-008/009 R3.4 — only one alternating section per page).
3. `frontend-developer` embeds final SVG in `how-this-site-was-built.html`.
4. `marketing-copywriter` writes any in-diagram labels and surrounding paragraph copy.

### R5: Grant Howe attribution — design + ethical decision

**Spec Gate must resolve Q5 — Rob is reaching out to Grant separately to confirm scope of attribution.**

Three options:

| Option | Treatment |
|--------|-----------|
| **A. Full attribution + outbound link** | Page Section 2 includes "adapted from Grant Howe's SDD workflow at https://www.geekbyte.biz/sdd/dashboard." Brief biographical phrase. Outbound link in nav `<a>` tag with `rel="noopener noreferrer"`. |
| **B. Attribution mention only, no link** | "adapted from Grant Howe's foundational SDD workflow." No URL. Less risk of link rot or external-state changes; less generous to Grant. |
| **C. Quiet credit** | One sentence at page bottom: "Adapted from Grant Howe's earlier SDD work on Claude Code agents." No URL. Smallest footprint. |

**PM-Spec recommendation:** **A (full attribution + outbound link)** as the default, contingent on Grant approving the framing and link in Rob's outreach. If Grant prefers a quieter mention, fall back to B or C per Grant's preference. Either way, the wording must avoid:

- Overclaiming Grant's involvement in the current adapted form (he provided the seed; Rob built what's running today).
- Understating Grant's seed contribution (the foundation matters; without it, this page wouldn't exist in this shape).
- Implying Grant endorses Rob's adapted workflow (unless Rob's outreach confirms that).

**Recommended wording for Option A (subject to Grant's review):**

> "The SDD methodology described here is adapted from Grant Howe's earlier work on Claude Code agentic workflows. Grant provided the original skeleton of agent definitions and gate structure; what runs on this site today is an extended adaptation, including the two-layer architecture, the tier system, and the Solo Operator gate-ownership model. See Grant's foundational work at [link]."

**Process safeguard:** R5 implementation does NOT begin until Rob confirms Grant's approval of the chosen attribution language. SPEC-016 ships in two stages if needed — Stage 1 is the page without R5 attribution (placeholder text in Section 2); Stage 2 adds the attribution once Grant confirms. This is documented in the spec's Open Questions Q5.

### R6: Meta tags and OG image

**Per SPEC-013 SEO conventions** (`governance/stack-quirks.md` SEO entry):

- `<meta name="description">` — drafted: "How robcparker.com is built using a Spec-Driven Development pipeline of Claude Code agents. The two-layer agent architecture, the gate system, and the experimental mechanisms behind the methodology." (~158 chars; marketing-copywriter optimizes for ≤ 160).
- `<meta property="og:title">` — "How This Site Was Built — Rob Parker"
- `<meta property="og:description">` — same as meta description.
- `<meta property="og:image">` — new OG card generated per SPEC-013's Pillow recipe. `graphic-artist` produces the OG card design; `frontend-developer` runs the recipe.
- `<meta property="og:url">` — `https://www.robcparker.com/how-this-site-was-built.html`
- `<meta name="twitter:card">` — `summary_large_image` (matches SPEC-013 pattern).
- All meta tags follow the same character budgets and patterns as existing pages.

### R7: Add "How It's Built" to main nav across all pages

**Per Q2 resolution (Main Nav).**

**Files:** `index.html`, `about.html`, `resume.html`, `contact.html`, `advisory.html`, and the new `how-this-site-was-built.html`.

**Edit:** in each page's `<nav>` block, add a new `<li>` for the "How It's Built" link, positioned between Resume and Contact (recommended order — `ui-designer` confirms at implementation). Markup follows the existing nav-item pattern:

```html
<li><a href="how-this-site-was-built.html" class="nav-link">How It's Built</a></li>
```

**Active-state behavior:** when the user is on `how-this-site-was-built.html`, the existing `js/main.js` active-page-highlight logic adds the active class to this nav item automatically. No JS change required if the existing logic keys off the current pathname.

**Mobile menu:** the hamburger drawer at ≤768px gets one additional row. `ui-designer` confirms drawer height fits within the design system rhythm.

**No footer entry added** (redundant with main-nav placement). **No about-page-bio inline link added** (also redundant).

**Coverage:** five existing pages + the new page itself, six pages total. QA Gate verifies the link is present on all six and points correctly.

### Implementation Preconditions — Repo Scrub Pass

**Per Q3 resolution (A3), SPEC-016 implementation does NOT begin until the repo scrub pass is complete.** The scrub pass is operator work (not site-build work) and is logged as a separate work item — likely a follow-on Trivial spec or an `OPERATOR-TODOS.md` action depending on scope. It must address at minimum:

| Concern | Treatment options |
|---------|-------------------|
| `OPERATOR-TODOS.md` | Move to a separate private repo, OR scrub sensitive lines and keep in repo, OR git-ignore and migrate to memory. Decision Rob's. |
| `robcparker_com_audit.md`, `website_audit_prompt.md` | Internal-audience audit docs; not written for public view. Move to separate private repo OR git-ignore + remove from history. |
| `specs/scratch/` | Work-in-progress drafts. Review each subdirectory; either tidy for public view or move to separate location. |
| `.claude/settings.local.json` | Verify no secrets / API keys committed; gitignore is the standard treatment. |
| Shipped specs (SPEC-001 → SPEC-015) | Per Q3 resolution, kept public. They are the methodology evidence the page links to. Per-spec scrub of any inadvertent secret/PII references is a per-spec responsibility, not blanket cleanup. |
| Memory files (`~/.claude/projects/.../memory/`) | Already out of repo (gitignored). Safe. |
| Git history | If any sensitive file was committed historically and its history needs purging, use `git filter-repo` or BFG Repo-Cleaner. Force-push only after backup. **Treat as destructive operation** — the SDD destructive-action rule applies; verify backups before force-pushing. |

**QA Gate for SPEC-016 verifies:**
- Repo visibility is "Public" via `gh repo view --json visibility`.
- Hero GitHub CTA resolves to a 200 response from a non-authenticated browser (i.e., the link works for an anonymous reader).
- Sensitive files identified at scrub-pass scoping are no longer in HEAD nor reachable in history (spot-check via `git log --all -- <path>`).

**Risk note:** the scrub pass is gating SPEC-016 but is itself NOT in this spec's implementation scope. If the scrub pass is delayed or scoped down (e.g., to "make repo public as-is"), SPEC-016's hero CTA may need to fall back to anchor-only (Q3 Option B) and a follow-on spec adds the GitHub link later. The R7 nav placement and R3/R4/R5/R6 page-build work can proceed in parallel with scrub planning; only the hero CTA wiring is on the critical path.

### R8: Sitemap and robots.txt update

**File:** `sitemap.xml`, `robots.txt` per SPEC-013.

The new page must be added to `sitemap.xml` so it's discoverable by search engines. `robots.txt` requires no change (allows crawling by default). Per SPEC-013 conventions, the sitemap entry includes `<loc>`, `<lastmod>`, `<changefreq>`, and `<priority>` fields matching the pattern used for other pages.

## Out of Scope

- **Live spec-status feed / dashboard.** No real-time "X specs shipped this month" widget. The page is static narrative + diagrams.
- **Embedded code samples from agent definition files.** Linking out to repo files is fine; reproducing the full markdown of every agent on the page is overkill.
- **Backend API for spec or gate metrics.** This is a static page.
- **Authentication or paywall** for any portion of the page. Public.
- **Analytics or event tracking.** Project has no analytics yet (per SPEC-014 out-of-scope precedent).
- **Notes / Writing section** — separate audit deferral (per SPEC-012 out-of-scope), not bundled here.
- **Updates to specs/SPEC-001 through SPEC-014** to add cross-links to the new page. The existing specs reference each other internally; linking from a marketing page back into spec docs is one-directional.
- **Public exposure of `OPERATOR-TODOS.md`, `specs/backlog.md`, or memory files.** These are operator-internal artifacts; they are not linked from this page. The audience reads narrative about the methodology, not the operator's running todo list.
- **A "compare to other SDD frameworks" section.** Out of scope; risks turning the page into competitive positioning rather than methodology explainer.
- **Live agent demo / "ask the SDD pipeline a question" widget.** This is the Phase 2 product; that's not what this page is.
- **PDF export of the page.** No.
- **Explicit "fork or adopt this methodology" invitation in Section 2** (per Q12 resolution). Page stays portfolio-focused; the public repo is itself the implicit invitation. License signal at footer is also out of scope; if Rob wants either, follow-on Trivial spec.
- **Inline citations to specific spec files** (per Q10 resolution). Single concrete-examples bridge link at end of Section 6 → public `specs/` directory is the only artifact-to-page link. No SPEC-014 / SPEC-015 / SPEC-N specific inline citations; spec line numbers shift, references rot.
- **Repo scrub pass execution** (per Q3 resolution A3). The scrub is its own work item — operator todo or follow-on Trivial spec. SPEC-016 implementation depends on it being complete but does not perform it.

## Decision Rationale

- **Chose Standard tier over Complex** because the page follows existing static-site patterns (HTML/CSS/JS, no build process), reuses SPEC-008 / SPEC-009 design tokens, and SPEC-013 SEO conventions. Architecture diagrams via inline SVG keep the no-build-tools constraint intact. The novel elements — two diagrams, the new page, the Grant attribution decision — are content + design work, not new architectural patterns. **Trivial would be wrong** because new pages are explicitly listed as Standard in CLAUDE.md complexity tier defaults.
- **Chose inline SVG diagrams over rasterized PNG/JPEG** because text-based SVG is searchable, accessible (per `<title>` element a11y pattern), CSS-themeable, and avoids introducing a new build/optimization step. The Pillow / WOFF2 image pipeline (per `governance/stack-quirks.md`) is reserved for OG cards where the rasterization is unavoidable.
- **Chose footer + about-bio placement (R2 Option 3) over main-nav placement** because the page is portfolio + narrative, not a primary site service. Pulling a curious reader from the bio paragraph (where Rob's career narrative already lives) is a more natural conversion path than competing for nav real estate. Spec Gate can override.
- **Chose to defer R5 (Grant attribution) implementation until Grant confirms** rather than ship with placeholder language. The cost of a Stage 1 / Stage 2 split is small (one PR opens with placeholder; second PR adds the confirmed wording); the cost of shipping wording Grant disagrees with is significantly higher (could damage a real relationship). Capability-signal philosophy applies in both directions — Rob's relationship with Grant is itself a credibility signal.
- **Chose to include Section 7 ("What's Working, What's Experimental, What's Rough")** rather than presenting the methodology as a finished product because intellectual honesty is what differentiates Rob's engineering judgment from marketing-deck SDD. The audience for this site reads "we know what's stable" as senior leadership signal. Per `feedback_credibility_signals_philosophy.md`, this is a capability signal (visible competence), not a hedging move.
- **Chose to NOT include live spec-status telemetry** because (a) it would couple the page to a real-time data source and a backend, breaking the static-site posture; (b) it shifts the page from narrative to dashboard, which dilutes the credibility signal; (c) it adds a maintenance surface (broken telemetry on a portfolio page is worse than no telemetry).
- **Chose to follow the existing eight-section structure** rather than a more freeform layout because (a) the SPEC-008 / SPEC-009 design system is built around section-based rhythm, (b) section-based content is easier for `ui-designer` and `marketing-copywriter` to iterate on, and (c) the structure maps cleanly to the SDD methodology itself (each section is one conceptual unit).

## Dependencies

- **CLAUDE.md** — primary content source for two-layer agent architecture and pipeline.
- **`.claude/agents/sdd/*.md` and `.claude/agents/*.md`** — specialist agent definitions; referenced in Section 4 diagram and prose.
- **`governance/solo-operator-model.md`** — Section 5 content.
- **`governance/tier-selection-guidelines.md`** — Section 5 tier table.
- **`governance/stack-quirks.md`** — Section 6 content (Stack Quirks mechanism).
- **SPEC-008** (Arch Gate approved) — design system, hero pattern, section rhythm.
- **SPEC-009** (QA Gate approved) — subpage design pattern; this page follows the same template.
- **SPEC-011** (Spec Gate approved) — advisory off main path; SPEC-016 navigation choice respects this prioritization.
- **SPEC-013** (Spec Gate approved) — SEO meta-tag conventions, OG image generation recipe, sitemap.xml + robots.txt patterns.
- **SPEC-015** (Draft, in flight as of 2026-05-06) — possible naming-convention dependency if SPEC-015 ships first and the SDD documentation references SugarAI in any cross-cutting copy. **No known conflict;** SPEC-016 doesn't reference Rob's employer in the methodology narrative.
- **External: Grant Howe's website** (`https://www.geekbyte.biz/sdd/dashboard`) — link target if R5 Option A is selected.
- **No new third-party services. No new API keys. No new external integrations.**

## Non-Functional Requirements

### Accessibility

- Semantic HTML5 throughout (`<article>`, `<section>`, `<header>`, `<footer>`, `<nav>`).
- Skip-to-content link present (matches all other pages).
- Architecture diagrams: `<svg role="img" aria-labelledby="...-title ...-desc">` with `<title>` + `<desc>` elements per SVG accessibility convention. All shape text has sufficient contrast against background per WCAG AA.
- Heading hierarchy: H1 once (page title), H2 per section, H3 for sub-points within sections.
- Color contrast: all text meets WCAG AA against page background (4.5:1 for body, 3:1 for large text).
- Keyboard navigation: all links and CTAs are tab-reachable; focus-visible styling per existing pattern.
- Screen reader test (NVDA on Windows or VoiceOver on macOS): page reads top-to-bottom in correct order; diagrams convey structural meaning via `<title>` + `<desc>`.

### Performance

- **Total page weight target: < 200 KB** (HTML + inline SVG + OG card asset reference, no external images embedded).
- Inline SVG keeps payload small (text-based, gzip-compressible, no separate HTTP request).
- No new web fonts (reuses existing Inter / Fraunces self-hosted fonts per memory `project_third_party_tbd.md`).
- No new CSS or JS files. Reuses `css/style.css` (already cached on repeat visits across the site).
- OG image weight: ≤ 100 KB per SPEC-013 budget.
- LCP (largest contentful paint) target: < 2.5s on 3G simulation. Likely dominant element is the first diagram or hero headline — both are inline-renderable without external resource fetch.
- No render-blocking resources beyond what already exists site-wide.

### SEO

- Meta description ≤ 160 chars per SPEC-013 convention.
- OG and Twitter card tags per SPEC-013 pattern.
- New URL added to `sitemap.xml` with `<changefreq>monthly</changefreq>` (page is narrative, not frequently updated).
- Structured-data heading hierarchy (H1 → H2 → H3) supports search engine summarization.
- The page is linkable: every section has an `id` so direct anchor links work (`/how-this-site-was-built.html#pipeline`, `/how-this-site-was-built.html#two-layer-architecture`, etc.).
- Internal-link strategy: page links to `about.html`, `contact.html`, and (optionally) the public GitHub repo. Internal-link weight pattern matches SPEC-013 strategy.

### Security

- No form fields, no auth, no script-injected content, no third-party JS embedded.
- External link to Grant's site (per R5) uses `rel="noopener noreferrer"` and `target="_blank"` per project security pattern.
- External link to GitHub (per Section 1 hero CTA, conditional on Q3) uses the same `rel="noopener noreferrer" target="_blank"` pattern.
- No PII collected or processed.
- No new attack surface beyond what exists site-wide.

### Responsive

- Mobile-first per project convention. Breakpoints at 768px and 480px per CLAUDE.md.
- Diagram reflow at ≤768px: pipeline diagram becomes vertical (top-to-bottom flow); two-layer architecture diagram stacks (Layer 1 row above Layer 2 row stays, but interior elements wrap).
- All text sections single-column on mobile, multi-column on desktop where the existing design system supports it.
- Tap targets meet 44×44 minimum on mobile per WCAG 2.5.5.

### Maintainability

- Page content is plain-text HTML with clearly-labeled section comments matching the SPEC-008 / SPEC-009 commenting pattern (`<!-- SECTION N: NAME -->`).
- Inline SVG markup is wrapped in a section comment naming what it represents and noting the agent (graphic-artist) that produced it.
- All copy is in the HTML file; no external content management. When the methodology evolves, edits are direct.
- Section 7 (What's Working / Experimental / Rough) is structured to be edited frequently as the methodology evolves. The bullets are short on purpose so single-line edits land cleanly.

## Acceptance Criteria

### Page exists and is discoverable

- **Given** the post-implementation site, **When** the user navigates to `https://www.robcparker.com/how-this-site-was-built.html` (or the slug chosen at Q1), **Then** the new page renders with all eight sections present, no broken links, no console errors.
- **Given** the post-implementation site, **When** the footer of any other page is read, **Then** a link to "How This Site Was Built" is present (assuming R2 default; or a nav-item link if R2 main-nav is chosen at Spec Gate).
- **Given** the post-implementation `about.html` bio paragraph, **When** read top-to-bottom, **Then** a one-sentence link to the new page is present (assuming R2 default).

### Page content matches spec

- **Given** the rendered page, **When** Section 1 hero is read, **Then** the headline matches Q1 slug decision and the subheadline names the SDD pipeline.
- **Given** the rendered page, **When** Section 2 ("Why this page exists") is read, **Then** Grant Howe's foundational work is credited per the wording finalized at Q5 and approved by Rob's outreach.
- **Given** the rendered page, **When** Section 3 (SDD Pipeline) is read, **Then** the diagram visually shows the seven-stage pipeline including all four gates (Spec, Arch, QA, Deploy), and the prose below names each stage with a 1–2 sentence description.
- **Given** the rendered page, **When** Section 4 (Two-Layer Architecture) is read, **Then** the diagram visually shows Layer 1 (5 pipeline agents) above Layer 2 (11 specialist agents) with at least 3 example invocation lines connecting them.
- **Given** the rendered page, **When** Section 5 (Tiers and Solo Operator) is read, **Then** the four-tier table is present with descriptions matching `governance/tier-selection-guidelines.md`.
- **Given** the rendered page, **When** Section 6 (Experimental Mechanisms) is read, **Then** the four mechanisms (Decision Rationale, Gate Annotations, Post-Completion Retros, Stack Quirks) are each described in 1–2 sentences AND the section explicitly notes they are experimental and being evaluated.
- **Given** the rendered page, **When** Section 7 (What's Working / Experimental / Rough) is read, **Then** each of the three subsections has at least 3 items, and the prose framing reads as engineering judgment rather than hedging.
- **Given** the rendered page, **When** Section 8 (Future Evolution) is read, **Then** the methodology is connected to the Phase 2 / Phase 3 product roadmap from CLAUDE.md.

### Diagrams are accessible and responsive

- **Given** the rendered Section 3 pipeline diagram on desktop (≥768px), **When** read by a screen reader (NVDA or VoiceOver), **Then** the SVG `<title>` and `<desc>` elements convey the seven-stage pipeline structure.
- **Given** the rendered Section 4 architecture diagram on desktop, **When** read by a screen reader, **Then** the two-layer structure and the invocation pattern are conveyed via `<title>` + `<desc>`.
- **Given** the rendered page on mobile (≤480px), **When** both diagrams are viewed, **Then** they reflow to a vertical / stacked layout that remains readable without horizontal scroll.
- **Given** the SVG markup, **When** inspected, **Then** all text inside the diagram meets WCAG AA contrast (4.5:1 for body text, 3:1 for large text) against the diagram background.

### SEO and meta tags

- **Given** the page `<head>`, **When** inspected, **Then** the meta description, og:description, twitter:description, og:title, og:url, og:image, and twitter:card tags are all present and conform to SPEC-013 character budgets and pattern.
- **Given** `sitemap.xml` post-implementation, **When** parsed, **Then** the new URL is present with `<lastmod>` reflecting the deploy date.
- **Given** `robots.txt`, **When** read, **Then** no disallow directive blocks the new page (default-allow posture preserved).
- **Given** the OG image, **When** rendered, **Then** it follows SPEC-013's Pillow recipe and is ≤ 100 KB.

### Performance and bundle

- **Given** the deployed page, **When** loaded over a 3G simulation in Lighthouse or PageSpeed Insights, **Then** LCP < 2.5s, CLS < 0.1, FID < 100ms.
- **Given** the page payload, **When** measured, **Then** total HTML + inline SVG ≤ 200 KB; no new external CSS or JS files added; no new fonts loaded.

### Grant attribution gate

- **Given** Rob has confirmed Grant's approval of the chosen attribution language (per Q5), **When** R5 is implemented, **Then** Section 2 content reflects the approved wording.
- **Given** Rob has NOT yet confirmed Grant's approval, **When** the page is shipped, **Then** R5 is deferred to a Stage 2 follow-on (the page ships with placeholder neutral language: "adapted from earlier work on Claude Code agentic pipelines"; Stage 2 PR adds the Grant-confirmed wording).

### "Future-proof" tone

- **Given** Section 7 is read by a senior engineering leader, **When** asked to characterize the tone, **Then** the response is "honest engineering judgment" rather than "hedging" or "uncertainty about what they're building."
- **Given** Section 8 is read by a senior engineering leader, **When** asked to characterize the methodology framing, **Then** the response is "they have a load-bearing skeleton and know what's iterable," matching Rob's intended positioning.

### Coverage check

- **Given** the post-implementation repo, **When** `rg -ni 'how this site was built|how-this-site-was-built' --glob '!specs/**'` is run, **Then** the only matches are (a) the new page itself, (b) the footer link added across all pages, (c) the about-page bio link (if R2 default), (d) the sitemap.xml entry. Every other unexpected match is investigated.

## Tier Selection — Standard (proposed)

**Tier:** Standard. Per `governance/tier-selection-guidelines.md`:

| Trigger | Applies? | Notes |
|---------|----------|-------|
| Authentication / authorization changes | No | None |
| Payment or financial data | No | None |
| PII / PHI handling | No | None |
| New external API integration | No | External link to Grant's site is a hyperlink, not an API integration. |
| Database schema change | No | None |
| Core domain model modification | No | None |
| Framework or platform migration | No | None |
| First implementation of new architectural pattern | **Borderline.** Inline SVG diagrams are new to the site (no prior page has embedded SVG diagrams). However, SVG is a standard HTML5 feature requiring no new tooling, no new dependencies, and no new build step. Not a framework or library introduction. |

**Decision flow:**
1. Does it change any code paths? Yes — new HTML page + footer/nav edits across existing pages + sitemap edit.
2. Does it follow existing patterns? Yes — SPEC-008 / SPEC-009 design system, SPEC-013 SEO conventions. Inline SVG is new but trivial to integrate.
3. Does it affect multiple components? Yes — new page + 5 page footers + about-bio edit + sitemap.
4. Does it introduce new patterns? Borderline (inline SVG is new pattern but commonly understood); architect-reviewer confirms during Arch Gate that SVG embedding doesn't require any new architectural primitive.
5. Does it involve auth, payments, PII, or core domain models? No.

**Tier rationale:** Standard. New pages are explicitly listed as Standard in CLAUDE.md ("New static page" → Standard). The architecture diagrams add design and a11y work but no new dependencies. Marketing-copywriter is already factored into Standard-tier content work. Trivial would be wrong (multi-component scope, design surface, new SVG primitive). Complex would be over-tiering (no integration, no new framework, no auth, no payments, no DB).

## Open Questions — Spec Gate

| # | Question | Resolution |
|---|----------|------------|
| Q1 | **Page slug.** `/how-this-site-was-built.html`, `/methodology.html`, or `/sdd.html`? | **RESOLVED 2026-05-08 — `/how-this-site-was-built.html`** (plain language). H1 "How This Site Was Built" matches the slug. Nav label can shorten to "How It's Built" if Q2 places this in main nav. |
| Q2 | **Navigation placement.** Main nav, footer-only, or footer + about-page bio link? | **RESOLVED 2026-05-08 — Main nav.** Adds "How It's Built" as a sixth nav item across all pages. Recruiter discoverability outweighs nav-density concerns; the page does real positioning work and burying it in the footer would reduce the chance an AI-forward-SaaS hiring manager finds it. R7 implementation pivots from "footer + about-bio" to "main-nav edit across all five existing pages + the new page itself." Footer entry not needed (main-nav placement supersedes); about-bio inline link not added (also redundant with nav). |
| Q3 | **Public GitHub repo link in Section 1 hero CTA?** | **RESOLVED 2026-05-08 — Option A3 (make the existing `wizzbiff/robcparkerdotcom` repo public *after* a scrub pass).** The hero CTA stays as drafted ("View the Specs on GitHub" → `https://github.com/wizzbiff/robcparkerdotcom`). **SPEC-016 implementation is gated on the scrub pass completing first.** The scrub pass is its own work item and is captured as a precondition operator todo (see Implementation Preconditions section below). The strongest portfolio move (A1) was rejected because the repo currently contains internal-audience content (`OPERATOR-TODOS.md`, `robcparker_com_audit.md`, `website_audit_prompt.md`, possibly other audit/operator files) that wasn't written for public consumption. The scrub pass produces a public-ready state without losing the verification value of a real linked repo. |
| Q4 | **Inline SVG diagrams or rasterized PNG?** | **RESOLVED 2026-05-08 — Inline SVG.** Accessibility (`<title>` + `<desc>` per shape), theming via existing CSS custom properties, no new build/optimization step, gzip-friendly text payload. Implementation path: `graphic-artist` produces draft layout in any tool (Excalidraw / draw.io / Figma); `frontend-developer` reproduces as inline SVG referencing the existing color tokens. PNG fallback is reversible at implementation if SVG authoring proves harder than expected — `governance/stack-quirks.md` already documents the Pillow recipe. |
| Q5 | **Grant Howe attribution wording.** Stage 1 placeholder + Stage 2 confirmed wording, OR ship with one of Options A/B/C without waiting? | **RESOLVED 2026-05-08 — Stage 1 / Stage 2 split, Stage 2 targets Option A (full attribution + outbound link) contingent on Grant's positive sign-off.** Rob has not yet heard back from Grant as of 2026-05-08. **Stage 1 placeholder wording (ships with the page):** *"The SDD methodology described here builds on earlier work in Claude Code agentic pipelines."* Neutral, accurate, no name. **Stage 2 (separate follow-on PR after Grant's sign-off):** replaces the placeholder with the Option A paragraph naming Grant and linking to `https://www.geekbyte.biz/sdd/dashboard`, with `rel="noopener noreferrer"` and `target="_blank"` per project external-link convention. **Fallback:** if Grant prefers Option B (no link) or Option C (quiet credit) when he replies, Stage 2 adopts his preference. **If Grant declines all three:** Stage 1 placeholder stays as the permanent treatment. |
| Q6 | **Tone register for Section 7 (What's Working / Experimental / Rough).** Frank engineering judgment, or softer marketing-friendly framing? | **RESOLVED 2026-05-08 — Frank engineering judgment.** Aligns with `feedback_credibility_signals_philosophy.md`: senior-exec audience reads honesty as competence. `marketing-copywriter` at implementation ensures each item in the rough list names the problem AND names the mitigation or active engagement, so each bullet ends on a controlled-engineering-judgment note rather than an open problem. |
| Q7 | **Audience target.** Hiring managers (Director/VP search) primary; engineering peers secondary; SDD adopters tertiary. Confirm? | **RESOLVED 2026-05-08 — Default ordering confirmed.** Hiring managers (Director/VP/CTO search at AI-forward SaaS) primary; engineering peers secondary; SDD adopters tertiary. This ordering is load-bearing for Section 7 (frank "rough" subsection serves hiring managers, not adopters) and Section 8 (Phase 2/3 roadmap framing serves hiring managers). Tone, jargon density, and depth calibrate for hiring managers — technical but not insider. Advisory clients are not explicitly modeled but the existing capability-evidence content serves them implicitly. |
| Q8 | **Section 7 specifics — Rob's review of the draft "rough" list.** | **RESOLVED 2026-05-08.** Item 5 (deployment gate dormancy) **removed** — Cloudflare Pages is now live; site serves at `https://robcparker.com/`; PRs merged to main auto-deploy. Item moved into the "Working today" list as "Automated deployment." The "Spec-Gate question backlogs" item from PM-Spec's "considered but didn't include" list is **added** to the rough list. Memory state updated 2026-05-08 (`project_deployment_deferred.md` deleted; `project_site_live.md` and `project_sdd_workflow_optimization_candidates.md` written). The full SDD optimization candidate list (live + considered-but-not-listed) lives in `project_sdd_workflow_optimization_candidates.md` for future workflow optimization sessions. |
| Q9 | **Diagram color treatment.** Use existing tokens, new diagram-specific palette, or hybrid? | **RESOLVED 2026-05-08 — Use existing tokens.** Diagrams visually belong to the site; reuse signals design discipline; if the palette evolves, diagrams update automatically. `graphic-artist` relies on shape, line weight, and label hierarchy for differentiation. SVG-inline (Q4 resolution) makes color cheap to change at implementation if `ui-designer` finds the palette too constrained — small in-implementation decision, not a spec-gate decision. |
| Q10 | **Should the page link to specific spec files as concrete examples?** | **RESOLVED 2026-05-08 — One inline reference to the `specs/` directory** (no per-spec inline links; no per-mechanism citations). Recommended placement: at the end of Section 6 (Experimental Mechanisms), serving as the "in theory vs. in practice" bridge into Section 7. Recommended wording (marketing-copywriter refines at implementation): *"For worked examples of each mechanism above, browse [the `specs/` directory in the repo](https://github.com/wizzbiff/robcparkerdotcom/tree/main/specs)."* External link uses `target="_blank" rel="noopener noreferrer"` per project convention. **Conditional on Q3 scrub-pass completion** — the link only goes live when the repo is public. If scrub is delayed, the page ships with the `<a>` tag's href pointing at the same URL but the repo will return 404 to anonymous browsers until the scrub finishes; QA Gate verifies the link resolves before declaring the page complete. |
| Q11 | **OG image — pipeline-diagram screenshot, hero screenshot, or custom design?** | **RESOLVED 2026-05-08 — Custom design by `graphic-artist`.** Pipeline-diagram screenshot illegible at OG card size (1200×630); hero screenshot is generic. Implementation flow: `graphic-artist` proposes 2–3 concept directions (e.g., stylized pipeline-arrow motif, agent-network motif, strong typographic treatment with page title); `ui-designer` picks; `frontend-developer` runs SPEC-013's Pillow recipe to generate the final asset. Output committed to `images/og/`. Card carries the page's positioning at exactly the surface (LinkedIn / Slack shares) where the audience is most likely to encounter the link. |
| Q12 | **Should Section 2 explicitly invite readers to fork or adopt the methodology?** | **RESOLVED 2026-05-08 — No invitation.** Page stays portfolio-focused for the primary (hiring-manager) audience. The public repo (per Q3) is itself a sufficient implicit invitation — anyone who wants to fork can. Don't crowd the page's positioning for the tertiary (SDD-adopter) audience. If a future spec wants to add an explicit "fork this" CTA or a license signal, it's a trivial follow-on. |

## Effort Comparison

| | AI-Assisted | Human Solo |
|---|---|---|
| Spec creation | ~75–90 minutes wall-clock (read CLAUDE.md, all governance docs, all 16 agent files, SPEC-008/009/013 references; structure 8-section content with eight subsection drafts; identify diagram requirements; surface Grant attribution decision; write 12 open questions). | 5–8 hours (PM would: write outline, decide section structure, identify all source-document dependencies, draft prose for each section, decide diagram approach, navigate Grant attribution decision, write Given/When/Then ACs across content + a11y + perf surfaces, decide tier with new-pattern borderline call). |
| Assumptions | (a) Rob's outreach to Grant succeeds and produces an attribution wording before Stage 2 ships; if not, Stage 1 placeholder is the permanent treatment per Q5 fallback. (b) Repo scrub pass (per Q3 resolution A3) completes before SPEC-016 implementation begins, OR the hero CTA falls back to Q3 Option B (anchor link instead of GitHub link) until scrub finishes. (c) `graphic-artist` and `ui-designer` can produce SVG diagrams within the existing color/typography tokens without escalation. (d) Marketing-copywriter can integrate Section 7 frank tone without it reading as hedging. (e) `specs/templates/` directory exists or will be created if Post-Completion Retro template is referenced. (f) Site is live as of 2026-05-08 (verified — `https://robcparker.com/` serving production traffic; PRs to main auto-deploy; per `project_site_live.md` memory). |

---

## Spec-Gate Approval

**Decision:** Approved 2026-05-08 — implementation gated on repo scrub pass per Q3 resolution
**Gate owner:** Rob Parker
**Approval note:** Approved after a twelve-question Spec-Gate walkthrough on 2026-05-08. Q1 resolved to slug `/how-this-site-was-built.html`. Q2 resolved to **main nav** placement ("How It's Built" between Resume and Contact); R2 and R7 rewritten to reflect the nav-edit path instead of the original footer + about-bio plan. Q3 resolved to **Option A3 (make `wizzbiff/robcparkerdotcom` public after a scrub pass)**; Implementation Preconditions section added documenting the scrub-pass requirements (`OPERATOR-TODOS.md`, audit docs, `specs/scratch/`, settings, history rewrite if needed). SPEC-016 implementation does not begin until scrub completes; if delayed, hero CTA falls back to Q3 Option B (anchor link). Q4 resolved to inline SVG. Q5 resolved to **Stage 1 / Stage 2 split** with Stage 2 targeting Option A (full attribution + outbound link) contingent on Grant's positive sign-off; Stage 1 placeholder *"The SDD methodology described here builds on earlier work in Claude Code agentic pipelines"* ships safely. Q6 resolved to frank engineering judgment in Section 7. Q7 confirmed the audience priority (hiring managers > engineering peers > SDD adopters). Q8 resolved with substantive Section 7 list edits: deployment-gate-dormancy item removed (Cloudflare Pages now live as of 2026-05-08; deployment-deferred memory replaced with `project_site_live.md`); "Spec-Gate question backlogs" item added to the Rough list; full SDD optimization candidate set captured in new `project_sdd_workflow_optimization_candidates.md` memory for future workflow-optimization sessions. Q9 resolved to use existing CSS custom-property tokens for diagram colors. Q10 resolved to a single inline reference at end of Section 6 → public `specs/` directory (no per-spec citations; rot-resistant). Q11 resolved to custom OG card by `graphic-artist`. Q12 resolved to no fork-the-methodology invitation (page stays portfolio-focused; public repo itself is the implicit invitation). Standard tier confirmed independent of all resolutions — multi-component scope (new page + nav edits across 5 existing pages + new OG asset + sitemap edit), inline SVG borderline new pattern, design-system reuse load-bearing.

### Structured Review Checklist

- [x] Business intent confirmed (portfolio + methodology explainer + Grant attribution)
- [x] Scope boundaries clear (new page + main-nav edits across 5 existing pages + sitemap update + new OG asset + scrub-pass precondition; 14 out-of-scope items enumerated including Q10 / Q12 resolutions)
- [x] Acceptance criteria testable (Given/When/Then; coverage check via `rg`; Lighthouse / a11y / SEO checks named; Grant attribution gate per Q5 split; scrub-pass verification via `gh repo view --json visibility` and anonymous-fetch link check)
- [x] Dependencies identified (CLAUDE.md, governance docs, all agent files, SPEC-008/009/011/013/015, Grant Howe's external work; `project_site_live.md` and `project_sdd_workflow_optimization_candidates.md` memories load-bearing)
- [x] Tier appropriate (Standard — new page + design system reuse + main-nav edits across 5 existing pages; SVG embedding is borderline new pattern but not framework-level)
- [x] No mandatory escalation triggers (no auth, payments, PII, integrations, DB, framework migration)
- [x] Third-party features verified (no third-party feature claims; external link to Grant's site is a hyperlink, not an integration; GitHub link target is the project's own repo post-scrub)
- [x] Memory hygiene flag (`project_deployment_deferred.md` deleted; `project_site_live.md` written; `project_sdd_workflow_optimization_candidates.md` written; `project_positioning.md` and `feedback_credibility_signals_philosophy.md` confirmed current)
- [x] Decision Rationale section present (Standard tier requires it per `pm-spec.md`; rationale reflects all 12 Spec-Gate resolutions including the substantive Q2/Q3/Q5/Q8 outcomes)

---

*Drafted 2026-05-06 from Rob Parker's natural-language request to add a portfolio-style page explaining the SDD agentic workflow used to build robcparker.com, with attribution to Grant Howe's foundational work.*
