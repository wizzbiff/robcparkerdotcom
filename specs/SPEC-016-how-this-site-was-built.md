# SPEC-016: "How This Site Was Built" Page

**Status:** Spec Gate approved 2026-05-08; scrub-pass precondition cleared 2026-05-11 (SPEC-017 shipped + repo flipped to public) — implementation unblocked, ready for Arch Gate
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
- **Corrected nav baseline (Arch Gate 2026-05-11):** the current production nav is **4 items** (`Home · About · Resume · Contact`), NOT 5. Advisory was removed from main nav AND footer by SPEC-011. Post-SPEC-016 nav is **5 items**: `Home → About → Resume → How It's Built → Contact`. **No Advisory in the nav** — SPEC-011's referral-only placement is preserved.
- Position in the nav order: **between Resume and Contact**. Rationale: keeps the candidate-evaluation path (Home → About → Resume) clean as the first three items, places the methodology page just before the conversion CTA (Contact).
- Active-page highlighting follows the existing `js/main.js` `initActiveNav()` pattern. No JS changes required; the function uses pathname matching, so the new page's nav item receives the active class automatically.
- New `<li>` markup must match existing items byte-for-byte: `<li><a href="how-this-site-was-built.html">How It's Built</a></li>` — **no `class="nav-link"`** (existing items don't carry this class; including it breaks byte-equality verification).
- No footer entry added (would be redundant with nav).
- No about-page-bio inline link added (also redundant).

**Mobile considerations:** the existing main nav at the 480px / 768px breakpoints uses a hamburger toggle with a stacked menu. A fifth menu item adds one row to the stacked menu — no layout impact beyond a slightly taller drawer. UI-designer Arch Gate review confirmed: nav fits comfortably at all breakpoints (≥1024px: trivial; 768–1023px: ~620px nav width in ~720px available space; ≤767px: hamburger drawer; "How It's Built" at 14 chars does not wrap).

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

- Headline: "How This Site Was Built" (per Q1 slug decision).
- **Subheadline (Arch Gate selection, marketing-copywriter primary):** Two-line treatment. Line 1: *"Every page on this site was specified, reviewed, built, and deployed through a multi-agent SDD pipeline — then shipped to production. No slidedeck. No hypothetical."* Line 2: *"Below is how it works, what's stable, and what I'm still figuring out."* (Marketing-copywriter at lock-stage may make minor edits but the "No slidedeck. No hypothetical." beat is load-bearing for the differentiation signal and should not be cut.)
- Two CTAs (matching SPEC-008 hero pattern): primary **"See the Pipeline"** (anchor link to `#pipeline` — Section 3), secondary **"Browse the Pipeline Specs on GitHub"** (external link to repo, opens in new tab — `target="_blank" rel="noopener noreferrer"`, plus `aria-label="… (opens in new tab)"` per contact.html LinkedIn pattern).
- **Q3 resolved by SPEC-017 (2026-05-11):** repo is public; hero GitHub CTA wires directly. Pre-Arch-Gate concern eliminated.

#### Section 2: Why this page exists

Two short paragraphs. Draft outline:

> Para 1: Most candidates for senior engineering roles can describe how they would bring AI-native practices to an organization. Few can show a working example. This page is one. Every spec in this site's repo, every commit, every gate decision is an artifact of the SDD methodology I'm describing here. The site itself is the proof.
>
> Para 2: The methodology is adapted from Grant Howe's foundational SDD workflow [link to be confirmed at Spec Gate — see Q5]. Grant provided a skeleton set of Claude Code agent definitions that I extended into the two-layer pipeline this site runs on. What's described below is the version that produced robcparker.com.

**Marketing-copywriter responsibility:** tighten the wording, make sure the Grant attribution lands gracefully (neither overclaiming Rob's adaptations nor understating Grant's seed contribution). The exact wording of the Grant attribution depends on Q5 below.

#### Section 3: The SDD Pipeline

A horizontal flow diagram (R4) showing the **9-node pipeline (5 stages + 4 gates)**:

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
- Horizontal **9-node flow** (5 stages + 4 gates, terminating at Production): rounded rectangles for stages (`--color-surface-elevated` fill, `--color-border-hairline` 1px stroke); gate diamonds at decision points (Spec Gate, Arch Gate, QA Gate, Deploy Gate) with `--color-magenta-muted` fill; arrows in `--color-border-hairline`; Production terminal node uses `--color-charcoal` fill with `--color-text-on-dark` label text (visually anchors the diagram terminus).
- **Color treatment per actual current design tokens** (Arch Gate correction — CLAUDE.md is stale): use `--color-surface-elevated`, `--color-magenta-muted`, `--color-charcoal`, `--color-border-hairline`, `--color-text-primary`, `--color-text-on-dark`. The legacy alias tokens `--primary-color`/`--secondary-color`/`--accent-color` referenced in CLAUDE.md were removed in SPEC-008 A-7 + SPEC-009 R2; do not reference them in implementation. Full token mapping table is in the Arch Gate Resolutions section below.
- Mobile breakpoint: at ≤768px, the diagram reflows vertically rather than horizontally via the **duplicate-SVG approach** (one horizontal SVG with `class="diagram-desktop"`, one vertical SVG with `class="diagram-mobile"`, toggled via CSS `@media (max-width: 768px)`). Each variant has independent `<title>` and `<desc>` ARIA scaffold.
- ARIA: `<svg role="img" aria-labelledby="pipeline-diagram-title pipeline-diagram-desc" focusable="false">` with `<title>` and `<desc>` elements describing the diagram for screen readers. Wrap each SVG in `<figure>` with `<figcaption>` carrying a one-line caption ("Figure 1: The SDD Pipeline" or similar).

**Two-layer architecture diagram (Section 4):**
- Two horizontal "swim lanes" — top lane = Layer 1 pipeline agents (5 agents: PM-Spec, Architect-Review, Implementer-Tester, Deployment, Learning-Engine), bottom lane = Layer 2 specialist agents (11 agents).
- **Simplified to 3 representative invocation arrows** (Arch Gate / graphic-artist finding): NOT a full invocation graph. Recommended arrows: (1) PM-Spec → marketing-copywriter (labeled "content-heavy specs"); (2) Implementer-Tester → frontend-developer + qa-expert + test-automator (fan of 3 arrows); (3) Architect-Review → penetration-tester (labeled "security-sensitive specs"). Figcaption clarifies "example invocations" so reader understands these are representative, not exhaustive.
- Mobile variant simplifies further: drop invocation arrows entirely, show two labeled groups (Layer 1 with 5 agents, Layer 2 with 11 agents).
- Same color/responsive/ARIA conventions as the pipeline diagram. Layer 1 boxes use `--color-magenta-muted` fill (parallel to gate-node treatment — signals "orchestration layer"); Layer 2 boxes use `--color-surface-elevated` (signals "execution layer").

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

- `<meta name="description">` — **Arch Gate revised (original draft was 197 chars / 37 over budget):** *"robcparker.com is built on a Spec-Driven Development pipeline of Claude Code agents — two-layer architecture, gate system, and honest notes on what's rough."* (157 chars). The phrase "honest notes on what's rough" is intentional positioning — telegraphs Section 7's frank tone and serves as a curiosity hook differentiating from standard methodology pages.
- `<meta property="og:title">` — "How This Site Was Built — Rob Parker"
- `<meta property="og:description">` — same as meta description.
- `<meta property="og:image">` — new OG card at `images/og/og-card-how-this-site-was-built.png`. Production via new script at `images/source/og/og-card-how-this-site-was-built.py` following the SPEC-013 `og-card.py` Pillow + fontTools pattern (per `governance/stack-quirks.md` Image Optimization section). **Direction A** (typographic + pipeline silhouette): charcoal background, Fraunces title, magenta footer stripe, token-grid glyph at upper right, simplified pipeline silhouette (7-node mini-diagram) at right-center. Add `MAGENTA_MUTED = (247, 187, 219)` constant to the new script. Run via `uv run --with fonttools --with brotli --with pillow python3 images/source/og/og-card-how-this-site-was-built.py`. Target ≤100KB output.
- `<meta property="og:url">` — `https://www.robcparker.com/how-this-site-was-built.html` (per the existing canonical-url convention; the apex-vs-www mismatch is a separate backlog item per `governance/stack-quirks.md` Cloudflare section — do NOT silently switch to apex for this page only).
- `<meta name="twitter:card">` — `summary_large_image` (matches SPEC-013 pattern).
- **`<link rel="canonical">`** — `https://www.robcparker.com/how-this-site-was-built.html`. Insert immediately after `<meta name="description">` and before the OG block per SPEC-013 IG-3.
- **JSON-LD Person schema** (added per Arch Gate finding; SPEC-013 R5 / IG-7) — copy verbatim from `index.html:35-58`. Byte-identical across all pages; do NOT modify the `Person.url` (that's Rob's homepage, not the current page).
- **Favicon + manifest + theme-color + Inter font preload** — copy byte-identical from `index.html:60-73` (per SPEC-013 IG-12, the Inter preload includes `crossorigin` attribute).
- All meta tags follow the same character budgets and patterns as existing pages. Per Arch Gate IG: copy `index.html:1-73` as the head-block template, then substitute only the per-page strings (title, description, canonical, og:title, og:description, og:url, og:image, og:image:alt, twitter:title, twitter:description, twitter:image:alt).

### R7: Add "How It's Built" to main nav across all pages

**Per Q2 resolution (Main Nav).**

**Files:** `index.html`, `about.html`, `resume.html`, `contact.html`, `advisory.html`, and the new `how-this-site-was-built.html`.

**Edit:** in each page's `<nav>` block, add a new `<li>` for the "How It's Built" link, positioned between Resume and Contact. **Markup (Arch Gate correction — no `class="nav-link"`):**

```html
<li><a href="how-this-site-was-built.html">How It's Built</a></li>
```

The existing nav `<li>` items do NOT carry `class="nav-link"`; including it on this item would break byte-equality verification (per Arch Gate finding).

**Active-state behavior:** `js/main.js` `initActiveNav()` uses `window.location.pathname` matching, so the new page's nav item receives the active class automatically. No JS change required. Do NOT inline `class="active"` on the new page — let JS handle it.

**Mobile menu:** the hamburger drawer at ≤768px gets one additional row (5 items total). UI-designer Arch Gate review confirmed all breakpoints clear; "How It's Built" at 14 chars does not wrap.

**No footer entry added** (redundant with main-nav placement). **No about-page-bio inline link added** (also redundant).

**Coverage:** five existing pages + the new page itself, six pages total. QA Gate verifies the link is present on all six and points correctly.

**Byte-equality verification (per Arch Gate IG, SPEC-011 IG-3 precedent):** after edits land, sha1sum the `<ul class="nav-links">` block across all 6 files:

```bash
for f in index.html about.html resume.html contact.html advisory.html how-this-site-was-built.html; do
  awk '/<ul class="nav-links"/,/<\/ul>/' "$f" | sha1sum
done
```

Expect 5 identical sha1sums for the non-resume files. `resume.html` is known-divergent (carries an inline `class="active" aria-current="page"` on its own nav item — pre-existing inconsistency, not a SPEC-016 defect; flagged as a follow-on Trivial spec candidate). Any other divergence is a defect.

**Apostrophe normalization (per Arch Gate IG):** pick straight (U+0027) or curly (U+2019) apostrophe and use consistently across all 6 files. The sha1sum check catches drift.

### Implementation Preconditions — Repo Scrub Pass — RESOLVED 2026-05-11

**SPEC-017 shipped the scrub-pass precondition on 2026-05-11.** Three internal-audience files (OPERATOR-TODOS.md + two audit docs) were removed from HEAD and all git history via `git filter-repo`; PR #12 and #17 bodies redacted; author emails normalized to `contact@robcparker.com`; repo flipped to public 2026-05-11. SPEC-016 QA Gate verifications (repo visibility PUBLIC, hero CTA resolves anonymously, sensitive files absent from HEAD/history) are now satisfiable.

**Original Implementation Preconditions table preserved for audit trail:**

<details>
<summary>Original scrub-pass requirements (superseded by SPEC-017)</summary>

| Concern | Treatment options |
|---------|-------------------|
| `OPERATOR-TODOS.md` | Move to a separate private repo, OR scrub sensitive lines and keep in repo, OR git-ignore and migrate to memory. Decision Rob's. |
| `robcparker_com_audit.md`, `website_audit_prompt.md` | Internal-audience audit docs; not written for public view. Move to separate private repo OR git-ignore + remove from history. |
| `specs/scratch/` | Work-in-progress drafts. Review each subdirectory; either tidy for public view or move to separate location. |
| `.claude/settings.local.json` | Verify no secrets / API keys committed; gitignore is the standard treatment. |
| Shipped specs (SPEC-001 → SPEC-015) | Per Q3 resolution, kept public. They are the methodology evidence the page links to. Per-spec scrub of any inadvertent secret/PII references is a per-spec responsibility, not blanket cleanup. |
| Memory files (`~/.claude/projects/.../memory/`) | Already out of repo (gitignored). Safe. |
| Git history | If any sensitive file was committed historically and its history needs purging, use `git filter-repo` or BFG Repo-Cleaner. Force-push only after backup. **Treat as destructive operation** — the SDD destructive-action rule applies; verify backups before force-pushing. |

</details>

**Outcome (per SPEC-017):** all rows resolved. OPERATOR-TODOS.md + audit docs gitignored and removed from history; `specs/scratch/` was already gitignored (never committed); `.claude/settings.local.json` added to repo gitignore for defense-in-depth; shipped specs kept public; memory files unchanged; git history rewritten via `git filter-repo --invert-paths --email-callback`.

**QA Gate for SPEC-016 verifies (all now satisfiable):**
- Repo visibility is "Public" via `gh repo view wizzbiff/robcparkerdotcom --json visibility` (verified 2026-05-11: PUBLIC).
- Hero GitHub CTA resolves to a 200 response from a non-authenticated browser (verified 2026-05-11).
- The Section 6 `specs/` directory link resolves 200 anonymously (per Arch Gate IG-9, added to QA list).
- Sensitive files absent from HEAD AND history: `git log --all -- OPERATOR-TODOS.md robcparker_com_audit.md website_audit_prompt.md` returns empty (verified 2026-05-11 in SPEC-017 R6).

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
- **Given** the rendered page, **When** Section 3 (SDD Pipeline) is read, **Then** the diagram visually shows the 9-node pipeline (5 stages + 4 gates, terminating at Production), and the prose below names each stage with a 1–2 sentence description.
- **Given** the rendered page, **When** Section 4 (Two-Layer Architecture) is read, **Then** the diagram visually shows Layer 1 (5 pipeline agents) above Layer 2 (11 specialist agents) with at least 3 example invocation lines connecting them.
- **Given** the rendered page, **When** Section 5 (Tiers and Solo Operator) is read, **Then** the four-tier table is present with descriptions matching `governance/tier-selection-guidelines.md`.
- **Given** the rendered page, **When** Section 6 (Experimental Mechanisms) is read, **Then** the four mechanisms (Decision Rationale, Gate Annotations, Post-Completion Retros, Stack Quirks) are each described in 1–2 sentences AND the section explicitly notes they are experimental and being evaluated.
- **Given** the rendered page, **When** Section 7 (What's Working / Experimental / Rough) is read, **Then** each of the three subsections has at least 3 items, and the prose framing reads as engineering judgment rather than hedging.
- **Given** the rendered page, **When** Section 8 (Future Evolution) is read, **Then** the methodology is connected to the Phase 2 / Phase 3 product roadmap from CLAUDE.md.

### Diagrams are accessible and responsive

- **Given** the rendered Section 3 pipeline diagram on desktop (≥768px), **When** read by a screen reader (NVDA or VoiceOver), **Then** the SVG `<title>` and `<desc>` elements convey the 9-node pipeline structure (5 stages + 4 gates + Production terminus).
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

---

## Arch Gate Resolutions (2026-05-11)

Architect Review stage invoked **four specialists in parallel** (largest parallel-review fan-out on this project to date): `architect-reviewer` (design validation), `ui-designer` (layout + responsive), `graphic-artist` (SVG diagrams + OG card), `marketing-copywriter` (copy + frank-tone feasibility). `penetration-tester` skipped (content-only page; one external link to a repo we already pen-tested at SPEC-017). All four returned **Approve with conditions**. Conditions absorbed below.

### Blocking findings (convergent across reviewers)

| # | Finding | Source | Resolution |
|---|---------|--------|------------|
| B1 | **Nav-baseline error** — spec described nav going from 5 items (with Advisory) to 6 items. Actual nav is 4 items (Advisory removed by SPEC-011); post-SPEC-016 nav is 5 items NO Advisory. | architect-reviewer A2 + ui-designer Critical Finding | R2 + R7 corrected in spec body. Nav order: `Home → About → Resume → How It's Built → Contact`. No Advisory. |
| B2 | **Pipeline node count inconsistency** — spec said "seven-stage"; actual pipeline is 9 nodes (5 stages + 4 gates + Production terminus per CLAUDE.md line 79). | architect-reviewer A1.c + graphic-artist Finding 1 | Corrected in R3 prose, R4 diagram spec, and 2 AC items: "9-node flow (5 stages + 4 gates)". |
| B3 | **R4 references removed CSS tokens** — spec cited `--primary-color`/`--secondary-color`/`--accent-color`, all removed in SPEC-008 A-7 + SPEC-009 R2. CLAUDE.md is also stale. | architect-reviewer A4 + graphic-artist Finding 3 | R4 updated with current tokens. Full mapping table below. |
| B4 | **Meta description 37 chars over budget** — spec draft was 197 chars; SPEC-013 budget is 160. | marketing-copywriter Focus Area 9 | R6 revised to 157-char version: *"robcparker.com is built on a Spec-Driven Development pipeline of Claude Code agents — two-layer architecture, gate system, and honest notes on what's rough."* |

### Open question resolutions (Rob 2026-05-11)

| Q | Topic | Resolution |
|---|-------|------------|
| AG-Q1 | **Hero subheadline direction** | Marketing-copywriter primary (two lines). Line 1 ends "No slidedeck. No hypothetical." (load-bearing differentiation beat). Line 2 telegraphs Section 7 frank tone. Codified in R3 Section 1 spec text. |
| AG-Q2 | **Section 8 close — Pareto fourth option** | Add standalone callout line BEFORE the closing CTA, keep existing Section 8 paragraphs. Callout: *"The methodology behind this site is the same methodology I'd bring to your engineering organization."* Set in Fraunces display at larger size, visually distinct from surrounding prose. Marketing-copywriter's Pareto-dominant fourth option, matches SPEC-015 retro precedent (specialist found a fourth option the architect alone wouldn't have surfaced). |

### Design-token mapping (Q9 compliance, no new tokens needed)

| Diagram element | CSS token | Hex | Contrast |
|---|---|---|---|
| Stage node fill | `--color-surface-elevated` | `#F3F1EB` | — (bg) |
| Gate node fill | `--color-magenta-muted` | `#F7BBDB` | — (bg) |
| Stage/gate border | `--color-border-hairline` | `#7E7A74` | 3.78:1 on surface-elevated — passes 1.4.11 |
| Stage node label | `--color-text-primary` | `#111318` | 15.6:1 on surface-elevated (AAA) |
| Gate node label | `--color-charcoal` | `#111318` | ~10.2:1 on magenta-muted (AAA) |
| Production node fill | `--color-charcoal` | `#111318` | — (terminal dark) |
| Production node label | `--color-text-on-dark` | `#F7F6F2` | 17.2:1 on charcoal (AAA) |
| Structural arrows | `--color-border-hairline` | `#7E7A74` | non-text |
| Invocation arrows (Section 4) | `--color-magenta-text` | `#A51D65` | non-text |
| Layer 1 boxes (arch diagram) | `--color-magenta-muted` | `#F7BBDB` | parallel to gate-fill — signals orchestration layer |
| Layer 2 boxes (arch diagram) | `--color-surface-elevated` | `#F3F1EB` | parallel to stage-fill — signals execution layer |
| Figcaption text | `--color-text-subtle` | `#8A8480` | 3.41:1 on cream — AA large only, acceptable for caption |

**Important:** the implementer must use `--color-surface-elevated` (`#F3F1EB`), NOT the legacy alias `--surface-color` (`#EDEBE4`). They are different values; the legacy alias is darker.

### Implementation Guidance (IG list for implementer-tester)

| IG # | Item | Source |
|---|---|---|
| AG-IG-1 | After PR merge of any nav-baseline correction, `git checkout main && git pull --rebase origin main` before proceeding. | architect-reviewer |
| AG-IG-2 | Pipeline node count: 9 nodes (5 stages + 4 gates terminating at Production). Reconcile any leftover "seven-stage" prose at lock-stage. | architect-reviewer / graphic-artist |
| AG-IG-3 | Nav byte-equality: sha1sum `<ul class="nav-links">` block across 6 files; expect 5 matches + `resume.html` known-divergent (inline `class="active"` is pre-existing; do not normalize in this spec). | architect-reviewer |
| AG-IG-4 | New-page `<head>` checklist: copy `index.html:1-73` byte-identical (favicon, manifest, theme-color, Inter preload, Person JSON-LD). Substitute only per-page strings. | architect-reviewer A9 |
| AG-IG-5 | SVG accessibility scaffold: each diagram wrapped in `<figure>` with `<figcaption>`; `<svg role="img" aria-labelledby="X-title X-desc" focusable="false">`; `<title>` and `<desc>` as first two children of `<svg>`. Plain `<text>` for labels styled via CSS. Two SVG variants per diagram (desktop + mobile), CSS-toggled at 768px. | architect-reviewer + ui-designer + graphic-artist (convergent) |
| AG-IG-6 | External link a11y: all `target="_blank"` links carry `aria-label="… (opens in new tab)"` matching the contact.html LinkedIn pattern. Hero CTA wording: **"Browse the Pipeline Specs on GitHub"** (marketing-copywriter recommendation; replaces draft "View the Specs on GitHub"). | architect-reviewer + marketing-copywriter |
| AG-IG-7 | Sitemap entry: priority `0.8`, changefreq `monthly`, lastmod = deploy date. Match existing 2-space indentation; do NOT bump existing 5 entries' lastmod. | architect-reviewer A3 |
| AG-IG-8 | Strip `class="nav-link"` from R7 example markup. Existing nav `<li>` items don't carry this class. | architect-reviewer + ui-designer |
| AG-IG-9 | QA Gate verifies BOTH GitHub URLs (hero repo URL + Section 6 `specs/` tree URL) resolve 200 anonymously, not just the hero CTA. | architect-reviewer A8 |
| AG-IG-10 | Apostrophe normalization: pick straight (U+0027) or curly (U+2019); use consistently across all 6 files. | architect-reviewer |
| AG-IG-11 | Cloudflare clean-URL behavior: live URL is `https://robcparker.com/how-this-site-was-built` (apex, no `.html`). Canonical and `og:url` keep `.html` per existing site convention (apex-vs-www mismatch is a separate backlog item). QA verification uses `curl -L` to follow the 308. | architect-reviewer A9 |
| AG-IG-12 | SVG fills via CSS custom properties (`fill: var(--color-surface-elevated)` in `<style>` block inside SVG or via class selector in `css/style.css`), NOT hardcoded hex. Preserves dark-mode upgrade path. | architect-reviewer |
| AG-IG-13 | New utility CSS classes for `style.css`: `.diagram-wrapper { max-width: 100%; overflow-x: auto; margin: var(--space-12) 0; }` and `.diagram-figure figcaption { margin-top: var(--space-3); font-size: var(--font-size-sm); color: var(--color-text-subtle); }`. | ui-designer + graphic-artist |
| AG-IG-14 | Section 5 Tier table: implementer chooses `<table>` (with `overflow-x: auto` wrapper) OR `<dl>` (preferred for mobile UX). Document choice in QA checklist. | ui-designer FA-9b |
| AG-IG-15 | Section 6 mechanism descriptions: use `<dl>` semantic structure (term/definition pairs) rather than `<ul>`. | architect-reviewer A5 + ui-designer FA-9d |
| AG-IG-16 | Section 7 visual treatment: three-card `highlights-grid` with NEUTRAL `--color-surface-elevated` surface. NO warning-colored treatment for the Rough card. Inter semibold H3s at `--font-size-lg` (not Fraunces — these are functional labels). | ui-designer FA-5 + FA-8 |
| AG-IG-17 | One `section-alt` band on the page (recommendation: Section 5 Tier table). The dark closing-CTA section is the page terminus, not counted against the at-most-one alt-band rule per SPEC-008 R3.4. | ui-designer FA-1 |
| AG-IG-18 | Section 4 architecture diagram: **3 representative invocation arrows** only (PM-Spec→marketing-copywriter; Implementer-Tester→fan of 3; Architect-Review→penetration-tester), with figcaption noting "example invocations" not exhaustive. Mobile variant drops arrows entirely. | graphic-artist Finding 2 (unanimous) |
| AG-IG-19 | OG card: new script at `images/source/og/og-card-how-this-site-was-built.py` cloned from SPEC-013 `og-card.py`. Direction A (typographic + pipeline silhouette). Add `MAGENTA_MUTED = (247, 187, 219)` constant. Add `draw_pipeline_silhouette()` helper. Run via `uv run --with fonttools --with brotli --with pillow python3 <script>`. Output: `images/og/og-card-how-this-site-was-built.png`, ≤100KB. | graphic-artist Finding 4 |
| AG-IG-20 | Stage 1 Grant attribution (R5 placeholder): use marketing-copywriter revised wording: *"The SDD methodology described here is adapted from prior work on structured agentic development pipelines using Claude Code. The two-layer architecture, the tier system, and the Solo Operator gate-ownership model are extensions developed for this site."* Names Rob's three substantive extensions, which makes the adaptation legible. | marketing-copywriter Focus Area 3 |
| AG-IG-21 | Stale AC at original spec lines 441-444 (about-bio link AC) is **superseded by Q2 main-nav resolution**. Mark as superseded at lock-stage. | marketing-copywriter Focus Area 6 |
| AG-IG-22 | Section 4 prose carries the architectural principle (orchestration/execution split, why two layers), NOT the agent enumeration. Diagram carries the inventory; prose carries the principle. | marketing-copywriter Focus Area 9 |
| AG-IG-23 | Section 7 frank-tone: marketing-copywriter delivered 13 drafted item framings (see Section 7 drafts block below). Each follows the pattern "name the pattern, name the evidence, name what's being done." Implementer uses these as starting points; lock-stage refines. | marketing-copywriter Focus Area 2 |
| AG-IG-24 | Section 6 mechanism descriptions: marketing-copywriter delivered 4 drafted descriptions (see Section 6 drafts block below). | marketing-copywriter Focus Area 4 |

### Section 7 frank-tone drafts (marketing-copywriter; lock-stage may refine)

**Working Today (low-change risk):**
1. *Two-layer agent architecture* — "The orchestration/specialist split has been the most stable design decision in the pipeline. Across 16 shipped specs, no spec required restructuring either layer."
2. *Tier system and escalation triggers* — "The four-tier system consistently produces the right gate depth without manual judgment at every spec. The tier-selection table is both the policy and the audit trail."
3. *Spec-as-source-of-truth* — "Specs survive context-window resets. An agent picking up a spec mid-pipeline gets the full decision history. This is the property that makes the pipeline actually run with one human in the loop."
4. *Why-capture mechanisms* — "Decision Rationale and Gate Annotations are generating real signal early — the SPEC-015 retro caught a Pareto-dominant copy option that the architect alone would have missed."
5. *Automated deployment* — "Cloudflare Pages connects the repo to production: a PR merge to main triggers a deploy with no further manual steps. The Deploy Gate verifies the outcome — not the mechanism."

**Experimental (evaluating):**
6. *Dynamic spec scope decisions* — "When to bundle two related changes into one spec versus shipping them separately is a judgment call the pipeline doesn't yet codify. Current heuristic: share a dependency → bundle; share only a topic → separate. Not robust enough to be a rule yet."
7. *Learning Engine agent* — "The Learning Engine is defined and produced the SPEC-015 retro. What's thin is the feedback loop: the agent flags patterns, but there's no scheduled review cadence to act on them. Evaluating after 10 specs whether that loop needs more structure."
8. *Post-Completion Retros* — "Retros are in the methodology but only trigger when something worth capturing actually happened. So far: two retros on 17 specs. 'Skip if nothing stands out' is working as designed, but it means the sample size is small."

**Rough or Evolving:**
9. *Solo-operator gate fatigue* — "One human approving every gate is a cognitive load issue. The tier system mitigates by right-sizing depth to risk. That mitigation is real. At higher velocity, it won't be enough."
10. *Cross-spec coordination* — "When two specs touch overlapping assets, sequencing decisions create overhead the pipeline doesn't currently automate. SPEC-015 required a logo-naming coordination note to SPEC-012. The tier system doesn't model inter-spec dependencies — that's a gap."
11. *Memory hygiene* — "The Claude Code memory system requires periodic review. One record stayed stale for roughly a week after Cloudflare Pages went live before being caught at a Spec Gate. Catching it required actively reading memory, not automated expiry."
12. *PM-Spec to Architect-Review hand-off* — "First-draft specs occasionally arrive with open questions that need iteration before review can proceed. This isn't a failure mode — it's expected in any spec-driven system. The friction is recognizing the pattern early enough to budget for iteration."
13. *Spec-Gate question backlogs* — "First-draft specs routinely surface more open questions than they resolve (SPEC-015: 8; SPEC-016: 12). A spec that surfaces 12 questions is doing its job — resolving them at Spec Gate is the correct moment. But the walkthrough is now a time-budgeted activity, not a quick approval step."

### Section 6 mechanism descriptions (marketing-copywriter)

- **Decision Rationale:** "Standard+ specs include a section capturing alternatives considered, constraints, and trade-offs — not for documentation's sake, but because future-Rob and future-agents need the why, not just the what. A decision without its rationale is a landmine for the next change that touches the same surface."
- **Gate Annotations:** "When approving a gate, the gate owner notes why — especially when overriding a recommendation. This prevents the most common failure mode in technical review processes: approvals that carry no context and can't be audited six months later."
- **Post-Completion Retros:** "After production deployment, 2-3 minutes of structured reflection. The trigger is selective — skip if nothing stood out — which means the retros that do get written are worth reading."
- **Stack Quirks:** "Platform and tool gotchas accumulated through experience, in `governance/stack-quirks.md`. One-liners per entry, not exhaustive documentation — close enough to the moment of discovery to be accurate, short enough to actually get written."

**Section 6 closing line:** *"The specs in this repo are worked examples of every mechanism above — browse the `specs/` directory to see them in practice."*

### IG-residual range predictions (for QA Gate, per IG-residual-ranges + docs-heavy multiplier from SPEC-017 retro)

| Grep pattern | Expected raw range | Assertion |
|---|---|---|
| `rg -ni 'how this site was built\|how-this-site-was-built' --glob '!specs/**'` | 20–60 hits | All hits expected to be page itself + 6 nav `<li>` + sitemap entry; zero unexpected |
| `rg -n '<li><a href="how-this-site-was-built\.html"' *.html` | **6 hits exactly** | Nav byte-equality assertion; any miss is a defect |
| `rg -n 'How It[''']s Built' *.html` | 6–12 hits | Apostrophe normalization watch |
| `rg -ni 'grant howe\|geekbyte' --glob '!specs/**'` | Stage 1: 0–1; Stage 2: 2–4 | Two-stage spec produces two valid expected counts |
| `rg -n 'how-this-site-was-built' sitemap.xml` | **1 hit exactly** | Sitemap entry |
| `rg -ni 'SDD\|spec.driven development' --glob '!specs/**' --glob '!.claude/**' --glob '!governance/**'` | 30–120 hits | Docs-heavy multiplier; new page becomes main public SDD prose surface |
| `rg -n '<title id=' how-this-site-was-built.html` | **2 hits exactly** | One per inline SVG diagram |
| `rg -n 'target="_blank"' how-this-site-was-built.html` | 2–3 hits | Hero CTA + Section 6 link + (Stage 2) Grant link |
| `rg -n 'rel="noopener noreferrer"' how-this-site-was-built.html` | Must match `target="_blank"` count | Defect if counts diverge |

### Items considered, not absorbed

| # | Topic | Decision |
|---|-------|----------|
| Tier escalation to Complex | Architect-reviewer flagged inline SVG as borderline new-pattern trigger | Stayed Standard. Inline SVG is a standard HTML5 primitive, not a build/dependency/framework change. Implementation surface is widest on the project but width ≠ tier. |
| In-page TOC | UI-designer considered for long page | Rejected. Hero anchor CTA is sufficient navigation; sticky TOC adds complexity for marginal gain. |
| Footer nav entry | R7 explicitly excludes; ui-designer flagged as inconsistency | Respected R7's exclusion. Flagged as candidate for future cleanup Trivial spec. |
| `resume.html` inline-active normalization | Architect-reviewer flagged divergence | Out of SPEC-016 scope. Pre-existing inconsistency; candidate for follow-on Trivial spec. |
| CLAUDE.md stale design-token references | Architect-reviewer A4 + graphic-artist | Out of SPEC-016 scope. Implementer uses correct tokens; CLAUDE.md cleanup is a follow-on Trivial spec. |
| Apex-vs-www canonical mismatch | Multiple reviewers noted | Already a `specs/backlog.md` candidate. SPEC-016 follows the existing www convention for consistency. |

### Stack-quirks follow-ons (capture at Post-Completion Retro)

- **Inline SVG accessibility pattern** — `<figure>` + `<figcaption>` + `<svg role="img" aria-labelledby focusable="false">` + `<title>` and `<desc>` as first two children. First use on this site; establishes the pattern.
- **Duplicate-SVG responsive pattern** — desktop horizontal + mobile vertical/simplified via CSS media query, NOT CSS transforms or overflow-scroll. Established for diagram-heavy pages.
- **`--color-surface-elevated` vs. `--surface-color` divergence** — the canonical SPEC-008 token `--color-surface-elevated` (`#F3F1EB`) is NOT the same as the legacy alias `--surface-color` (`#EDEBE4`). Use the canonical token in new work.
- **CLAUDE.md design-token section is stale** — references removed `--primary-color`/`--secondary-color`/`--accent-color` tokens. Add to follow-on cleanup.

### Arch Gate Decision

**Approved 2026-05-11** — implementation may begin. Blocking findings (B1–B4) absorbed into spec body. Open questions (AG-Q1, AG-Q2) resolved with Rob in conversation. Standard tier confirmed.

**Arch Gate annotation:** Four-reviewer parallel invocation at Arch Gate (architect-reviewer + ui-designer + graphic-artist + marketing-copywriter) — largest parallel-review fan-out on this project to date. All four returned Approve with conditions; conditions converged on a substantive but mechanical set of fixes. The nav-baseline error and pipeline-node-count inconsistency were caught by multiple reviewers independently — confirms the value of multi-reviewer parallel for content + design specs. Marketing-copywriter delivered concrete copy drafts for all 13 Section 7 items + 4 Section 6 mechanism descriptions, eliminating an entire class of lock-stage discovery work. Per `feedback_credibility_signals_philosophy.md` memory, all reviewer recommendations preserved capability signals over legitimacy signals. Implementer-Tester picks up next.
