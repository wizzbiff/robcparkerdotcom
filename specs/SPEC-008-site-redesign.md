# SPEC-008: Site Redesign — Original Visual Identity

**Status:** Arch Gate approved — proceeding to Implementation
**Tier:** Complex
**Author:** PM-Spec Agent
**Date:** 2026-04-21
**Branch:** `spec/SPEC-008-site-redesign`

---

## Summary

End-to-end visual redesign of robcparker.com to establish an original design identity distinct from the site's template origins. Scope covers four coupled changes executed as one bundle:

1. **Palette refresh** — replace the inherited Tailwind-blue palette (`#2563eb` / `#1e40af` / `#3b82f6`) with a charcoal/cream/electric-magenta system (`#111318` / `#F7F6F2` / `#E8449B`).
2. **Typography refresh** — introduce a self-hosted display serif + geometric sans pairing (Fraunces + Inter, tentative), replacing the current system-font stack.
3. **Component & layout refresh** — diverge from the template's centered-hero / three-column-cards / soft-shadow-card grammar toward an editorial-executive composition: asymmetric hero, thin-border card treatment (or sectioned content without cards), sharper button geometry, editorial section rhythm.
4. **Favicon redesign** — replace the guitar-derived SPEC-007 favicon with an AI-inspired mark (SPEC-008 Concept 2 — "Token-Grid": a 3×3 rounded-square grid with four cells lit in the magenta accent), generated as a full modern favicon suite.

Also in scope: a structural overhaul of the `graphic-artist.md` and `ui-designer.md` agent definitions to bake the new design language into future agent invocations and remove the hardcoded template-era palette references that currently anchor both agents to the site's geekbyte-adjacent origins.

**All site content is preserved verbatim.** No copy changes, no page additions, no page removals, no URL changes. This spec is purely a visual identity change.

## Context

### The template-origin problem

The site's current visual language is materially borrowed. The `css/style.css` file, the `graphic-artist.md` agent definition, and the `ui-designer.md` agent definition all trace to geekbyte.biz — a separate B2B advisory site built by the same agent authors. The visual overlap is not accidental; it is structural. Side-by-side, both sites share:

| Layer | Pattern (shared with geekbyte) |
|-------|-------------------------------|
| Primary palette | Tailwind blue-600 (`#2563eb`) on pure white |
| Hero | Centered value-prop block + horizontally-stacked dual CTAs |
| Nav | Horizontal, logo-left, standard corporate layout |
| Content rhythm | Stacked cards in three-column service-offering grids |
| Card treatment | Soft drop-shadows, rounded corners, white surface on white background |
| Button treatment | Pill/rounded-rect filled CTAs in the primary blue |
| Imagery | Minimal functional diagrams, no photography |
| Mood | Professional-blue corporate-B2B advisory aesthetic |

Three of those layers (palette, card grammar, hero composition) are template-fingerprint signals that a design-literate observer would recognize in seconds. Two others (button treatment, content rhythm) are category-standard for B2B advisory sites regardless of origin. The cumulative effect is that robcparker.com currently reads as "the same designer made both sites," which is both true and — for a personal executive brand targeting a Director/VP-of-Engineering hunt at AI-forward SaaS companies — an unhelpful signal.

### Why a redesign now

Per auto-memory `project_deployment_deferred.md`, no production deploys have occurred yet. SPEC-001–007 built the content and structural foundation; SPEC-000 (the foundational/meta spec) is still unwritten. This gap is the cheapest possible moment to replace the visual identity — zero inbound-link exposure, zero SEO equity to preserve, no users to re-educate. A redesign after launch would cost proportionally more.

The positioning context (auto-memory `project_positioning.md`) reinforces the timing: Rob is targeting Director/VP roles at AI-forward SaaS, with advisory secondary. The site's primary audiences — hiring managers, VCs, CEOs — are precisely the readers who parse visual identity as a competence signal. A template-looking site signals "hasn't invested in distinction"; an original site signals "brings judgment and craft to personal brand."

### Why a favicon redo now

SPEC-007 introduced a favicon with an abstract electric-guitar basis (pick silhouette, stylized headstock geometry). That decision was made before SPEC-006 formalized the "strictly professional for now" site posture and before this spec's AI-native design direction was chosen. Rob has since reconsidered: the guitar basis, even as a private structural constraint, is the wrong DNA for a brand targeting AI-forward SaaS leadership. The replacement favicon uses an AI-inspired token-grid pattern that aligns with both the new palette and the positioning.

### Agent definitions as load-bearing artifacts

The `graphic-artist.md` and `ui-designer.md` agents are invoked for every design-adjacent spec. Both currently hardcode the template palette (`--primary-color: #2563eb` et al.) as "the existing design system" in their prompts. Without updating those agent definitions, every future design invocation will regenerate geekbyte-adjacent work, silently drifting the site back toward the template. The agent overhaul is therefore a first-class requirement, not a housekeeping task.

## Requirements

### R1: Design token refresh (`:root` in `css/style.css`)

Replace the current palette and introduce minor typography additions. The baseline values below are the committed starting point; final derivative shades (text-muted variants on cream, border tones on charcoal, etc.) are set by `graphic-artist` during implementation.

**Core palette (committed):**
```css
--color-charcoal: #111318;     /* Primary text + dark surfaces */
--color-cream:    #F7F6F2;     /* Primary background + light surfaces */
--color-magenta:  #E8449B;     /* Electric accent — primary CTAs, focus rings, links */
```

**Derived shades (graphic-artist finalizes — targets below):**
- `--color-text-primary` — charcoal on cream: target ≥ 15:1 contrast (AAA comfort).
- `--color-text-muted` — warm grey derivative of charcoal for secondary text on cream: target ≥ 4.5:1 (AA normal).
- `--color-text-subtle` — used sparingly for captions, timestamps, breadcrumb-style UI: target ≥ 3:1 (AA large only, no normal body copy).
- `--color-text-on-dark` — cream or warm off-cream for text on charcoal surfaces: target ≥ 12:1.
- `--color-surface-elevated` — subtle warm tint of cream for card surfaces on cream background: ~98% L cream derivative with a 1-2% warm shift (graphic-artist tunes).
- `--color-border-hairline` — low-chroma warm grey for thin-border card treatment: ~12-15% L charcoal derivative on cream.
- `--color-magenta-hover` — slightly darker magenta (~8-12% L reduction from base) for button hover.
- `--color-magenta-muted` — low-saturation tint of magenta for subtle backgrounds (badge fills, selected state): ~92% L.

**Semantic token layer (preserved names, new values):**
- `--primary-color` → maps to the new magenta (retains existing variable name to minimize surface-area change across the codebase).
- `--secondary-color` → deprecated and removed, OR mapped to `--color-charcoal` for semantic clarity. `graphic-artist` chooses; update all callsites.
- `--accent-color` → deprecated and removed, OR mapped to `--color-magenta-muted`. Resolve the same way.
- `--text-color`, `--text-muted`, `--text-light`, `--background-color`, `--surface-color`, `--surface-dark`, `--border-color`, `--text-muted-dark`, `--text-subtle-dark`, `--text-on-dark`, `--border-dark` — remap to new-palette values per the shade targets above. Names preserved for codebase stability.

**Contrast verification (mandatory before implementation completes):**
Every palette combination used for text MUST be verified against WCAG 2.1 AA at normal size (4.5:1) or AAA where the current spec already claims it. The existing CSS comment at `style.css:13-17` enumerates five verified combinations; the replacement palette needs a one-to-one verification table recorded in the same comment block. Any combination that fails is either re-tuned by `graphic-artist` or restricted to large-text-only usage with a WHY comment.

**Out of scope at token level:** no introduction of dark-mode variants, no CSS layer reorganization, no variable name refactoring beyond the semantic-layer remapping above, no change to spacing scale, font-size scale, shadow scale, border-radius scale, or transition timings — unless a specific component requirement below requires it.

### R2: Self-hosted typography

Introduce a self-hosted serif-display + geometric-sans pairing. No Google Fonts dependency — resolves the "third-party TBD" question flagged in auto-memory `project_third_party_tbd.md`.

**Tentative pairing (subject to A-2):**
- **Display:** Fraunces (variable, for H1/H2, hero display, occasional editorial accents). Licensed OFL.
- **Body:** Inter (variable, for all body text, nav, UI chrome, buttons, forms). Licensed OFL.

**File structure:**
- Create `/fonts/` directory at site root. Committed to repo.
- Files: `fraunces-variable.woff2`, `inter-variable.woff2` (or subset-to-latin variants to reduce byte weight).
- Subset recommendation: Latin basic + Latin extended + punctuation + numerals. Exclude CJK, Cyrillic, Greek — not used on site.
- Target file sizes: Inter variable subset ≤ 40KB woff2; Fraunces variable subset ≤ 80KB woff2 (display serif variable fonts are inherently larger).

**CSS integration:**
- `@font-face` declarations with `font-display: swap` for both families at the top of `style.css` (after the top comment block, before `:root`).
- `font-family` stacks updated in `:root`:
  - `--font-family-base: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;`
  - `--font-family-display: "Fraunces", Georgia, "Times New Roman", serif;` — **new variable**, not previously in the design system.
  - `--font-family-mono` — preserved as-is (monospace is not part of the identity change).
- Display family applied to `h1`, `h2`, `.hero-headline`, `.section-header h2`, and any other major display contexts — `graphic-artist` enumerates during implementation.
- Body family applied everywhere else (default).

**Preload considerations:** add `<link rel="preload" as="font" type="font/woff2" crossorigin>` for Inter on every page's `<head>` (body font is used immediately); do NOT preload Fraunces (display-only, below-the-fold-resilient, FOUT via `font-display: swap` is acceptable).

**HTTP headers:** verify `_headers` file at site root allows `Cache-Control: public, max-age=31536000, immutable` for `/fonts/*.woff2`. Add rule if missing. (This is the one `_headers`-file touch in scope.)

### R3: Component & layout refresh

This is the substantive design work. The component-level changes below are the required surface of the refresh; `ui-designer` and `graphic-artist` execute with the design principle "editorial + tech-forward + executive; Vercel/Linear-adjacent energy with editorial warmth via cream over pure white."

#### R3.1 — Hero composition (all 5 pages)

**Current pattern:** centered headline + centered subhead + horizontally-stacked dual CTAs (home) or single centered CTA (subpages). Matches geekbyte layout grammar directly.

**Required divergence:** move away from centered-and-stacked toward an asymmetric editorial composition. Specific options in A-3.

Baseline requirement for all 5 pages:
- Display-serif headline in Fraunces at a large editorial scale (target: 4-5rem desktop, responsive reduction at breakpoints).
- Asymmetric weight distribution — the hero's visual weight must not be centered on the horizontal axis.
- CTAs (where present) must not use the horizontally-stacked-dual-button pattern. Options: single primary CTA with a secondary text-link variant below it; inline "→" arrow glyph text CTAs; or no CTA in the hero at all with CTAs moved to dedicated sections below.

#### R3.2 — Card treatment refresh

**Current:** `.highlight-card`, `.service-card`, `.engagement-card`, `.about-teaser` use soft drop-shadows (`box-shadow: var(--shadow-md)`), rounded corners (`border-radius: var(--border-radius-lg)`), and white surface on white background. Classic SaaS-template card grammar.

**Required divergence:** drop the soft-shadow treatment site-wide. Replace with one of the patterns in A-4:
- Thin-hairline border cards on elevated surface.
- Borderless cards on alternating surface tints.
- Sectioned content with typographic dividers, no card containers at all.

All existing `.service-card` / `.engagement-card` composition rules (load-bearing for the advisory page per SPEC-005 AG-1) MUST remain CSS-compositional: `.engagement-card` continues to extend `.service-card` regardless of which card pattern is chosen.

Border-radius on cards: reduced from `--border-radius-lg` (12px) to `--border-radius-sm` (4px) or removed entirely (0px) — `graphic-artist` chooses during implementation; no pill/heavily-rounded card surfaces remain.

#### R3.3 — Button treatment

**Current:** `.btn-primary` filled blue rounded-rect, `.btn-secondary` outlined blue rounded-rect. Matches category-standard SaaS CTA pattern.

**Required divergence:**
- Primary button: filled magenta on cream, sharper corner radius (2-4px or 0px), display-sans (Inter) semibold with optically-adjusted letterspacing.
- Secondary button: magenta outline + magenta text on cream, matching corner radius.
- Text-link variants: introduce an inline editorial CTA style — "Read more →" with a magenta underline and arrow glyph — for in-body use where a filled button would be visually heavy (e.g., in the About "Off the Clock" section, resume section headers, advisory body prose).
- Hover state: background/color shift + ≤ 1px transform, no box-shadow glow.
- Focus ring: magenta 2-3px outline with 2px offset — matches new accent, higher visibility than existing blue ring.

#### R3.4 — Section rhythm

**Current:** sections separated via `--space-16` / `--space-20` vertical padding and alternating `--background-color` / `--surface-color` band treatment.

**Required divergence:**
- Keep the vertical-padding baseline (spacing scale preserved), but reduce reliance on alternating-band surface swaps. At most one alternating band per page (e.g., the dark "Let's Talk" bottom CTA) rather than three or four.
- Introduce thin hairline horizontal rules (using `--color-border-hairline`) as section separators on editorial pages (About, Resume), treated as an editorial typographic move rather than a visual bar.
- `.section-header` typography updated — H2 in Fraunces display serif, optional small-caps Inter eyebrow label above the H2 (e.g., "01 · Background", "02 · Approach"), `graphic-artist` decides whether to introduce eyebrow labels or keep headings clean.

#### R3.5 — Nav & footer

**Nav:** retained as horizontal logo-left — this is category-standard and not a template-fingerprint signal in the same way the hero is. Visual changes only:
- Nav logo wordmark in Inter semibold (not the new Fraunces display — would feel over-decorated at nav scale).
- Active-page indicator: magenta underline or magenta 2px border-bottom on the active link, replacing the current color-swap approach. Preserves existing `main.js` `initActiveNav()` logic — no JS changes.
- Nav hover: subtle magenta underline fade-in, no color change on the text itself.

**Footer:** retains current structure (four-column on desktop, stacked on mobile). Visual changes only:
- Background swap: dark charcoal (`--color-charcoal`) replaces the current `--surface-dark: #1e293b` slate.
- Footer text: cream on charcoal per `--color-text-on-dark`.
- Footer links: cream with magenta hover (no magenta-colored links at rest — too visually hot against the footer's large dark field; reserved for hover affordance only).

#### R3.6 — Forms (contact page)

Contact form on `contact.html`:
- Input borders: hairline charcoal on cream input surfaces (no filled grey backgrounds).
- Focus state: magenta 2px border + magenta 2px outline with 2px offset.
- Labels: Inter semibold, slightly smaller than body text, with letterspacing.
- Validation error state: magenta border + magenta error text (magenta serves both accent and error-signal roles — there is no separate red error color in the palette). Acceptable because error state is paired with text messaging, not color-alone.
- Submit button: primary-magenta filled per R3.3.

### R4: Anti-pattern list — explicit divergence from geekbyte

This is a mandatory checklist. The final design MUST NOT carry any of the following patterns when compared side-by-side with geekbyte.biz:

| # | Anti-pattern | Acceptable alternative |
|---|-------------|----------------------|
| AP-1 | Tailwind blue-family primary color | Magenta `#E8449B` |
| AP-2 | Pure white (`#ffffff`) primary background | Cream `#F7F6F2` |
| AP-3 | Centered hero + horizontally-stacked dual CTAs | Asymmetric editorial hero per R3.1 |
| AP-4 | Three-column stacked service cards with soft shadows | Thin-border / borderless / sectioned-content per R3.2 |
| AP-5 | Pill / heavily-rounded button corners | Sharp (≤ 4px) or squared button corners per R3.3 |
| AP-6 | System-font stack default | Self-hosted Fraunces + Inter per R2 |
| AP-7 | Heading typography in a generic sans at standard scale | Display-serif H1/H2 at editorial scale per R3.4 |
| AP-8 | All-caps small-label "eyebrow" above hero-H1 in color-accent (template move) | Acceptable IF done, must be Inter small-caps in charcoal at hairline weight, not a color-block accent |

QA Gate includes a visual diff check against this anti-pattern list — any AP-N that cannot be cleanly confirmed "not present" fails QA.

### R5: Favicon redesign — Concept 2 (Token-Grid) in magenta

Replace the entire SPEC-007 favicon suite with a new Token-Grid design.

**Design basis:** `specs/scratch/SPEC-008-favicon-concepts/concept-2-token-grid-magenta.svg` — 3×3 rounded-square grid on charcoal base; four cells lit in magenta `#E8449B` forming a diagonal selection pattern (top-center, top-right, center-center, bottom-left); five cells rendered in a dim cream tone to near-invisibility. AI cue: attention-mask / token-sampling / transformer output block-structure. No letterform.

**Deliverables (full modern favicon suite):**
- `favicon.ico` — 16×16, 32×32, 48×48 multi-resolution ICO. 16×16 variant MAY simplify to a 2×2 grid if the 3×3 fails legibility tests; `graphic-artist` decides.
- `favicon.svg` — the primary SVG (from the scratch file, possibly tuned for production).
- `apple-touch-icon.png` — 180×180 PNG, magenta-on-charcoal, no rounded corners applied (iOS applies its own mask).
- `icon-192.png` — 192×192 maskable PNG for Android home-screen.
- `icon-512.png` — 512×512 maskable PNG for PWA install.
- `safari-pinned-tab.svg` — monochrome SVG variant (charcoal only, no magenta) using the mono variant `specs/scratch/SPEC-008-favicon-concepts/concept-2-token-grid-mono.svg` as the basis.

**HTML integration (every page's `<head>`):**
- `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`
- `<link rel="icon" type="image/png" sizes="32x32" href="/icon-32.png">` (optional extra — or rely on ICO)
- `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`
- `<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#111318">`
- `<link rel="manifest" href="/site.webmanifest">`

**Manifest update (`site.webmanifest`):**
- `icons` array: 192×192 + 512×512 maskable entries.
- `theme_color`: `#111318` (charcoal — top-bar color on mobile browsers).
- `background_color`: `#F7F6F2` (cream — PWA splash background).
- `name` / `short_name`: preserved from SPEC-007 (no content changes).

**Cleanup:** delete the SPEC-007 guitar-derived favicon files entirely before new files are generated. The new suite replaces rather than augments.

**Out of scope:** no new app-store or marketing-icon sizes beyond the above; no dynamic dark-mode favicon (prefers-color-scheme-aware SVG icons are a nice-to-have, not a must).

### R6: Agent `.md` overhaul

Rewrite both `graphic-artist.md` and `ui-designer.md` to bake in the new SPEC-008 design language and remove the geekbyte-era anchors that currently hardcode the old palette.

#### R6.1 — `graphic-artist.md` rewrite

Current state (`/.claude/agents/graphic-artist.md`): 59 lines, includes a hardcoded "Existing Design System" block at lines 17-24 with `--primary-color: #2563eb` / `--secondary-color: #1e40af` / `--accent-color: #3b82f6`. That block is load-bearing — it's the first concrete design signal the agent sees when invoked.

**Rewrite requirements:**
- Replace the hardcoded palette block with the new SPEC-008 token system (R1).
- Add a "Design Language" section that captures the editorial-executive mood target: Fraunces + Inter pairing, editorial-asymmetric hero grammar, thin-border / borderless card treatment, sharp-cornered buttons, magenta-accent signature.
- Add an "Anti-Pattern Guardrails" section enumerating the R4 divergence list — future design work must explicitly not regenerate those patterns.
- Preserve the existing "Responsibilities" and "Output Format" sections with minor updates to reference Fraunces/display-family where relevant.
- Add a WHY comment at the top of the file noting SPEC-008 as the design-system reset, so future edits don't silently revert.

#### R6.2 — `ui-designer.md` rewrite

Current state (`/.claude/agents/ui-designer.md`): 64 lines, generic "clean and professional" design principles with no project-specific design-language anchor. Doesn't hardcode the old palette (that's in `graphic-artist.md`) but also doesn't carry any counterweight against generic-SaaS-template regeneration.

**Rewrite requirements:**
- Add a "Project Design Language" section mirroring the one added to `graphic-artist.md` (R6.1) — same mood target, same typography, same component vocabulary.
- Replace the generic "Clean and professional" principle with a more specific "Editorial-executive; Vercel/Linear-adjacent with editorial warmth" principle. Retain "Content-first," "Mobile-first," "Accessible," "Consistent."
- Add a component vocabulary list — hero composition, card treatment, button treatment, section rhythm — each with a one-line "this project uses [X], not [Y]" directive pulled from R3.
- Add an "Anti-Pattern Guardrails" section mirroring R6.1.
- Preserve the "Responsibilities" and "Output Format" sections structurally; update references to reflect the new component language.

#### R6.3 — Cross-agent consistency check

After both rewrites, both agent files should agree on:
- The design-language mood statement (identical wording in both).
- The anti-pattern list (identical enumeration in both).
- The typography pairing (Fraunces + Inter).
- The accent color (magenta `#E8449B`).

A divergence between the two files would manifest as inconsistent output in future specs. `implementer-tester` runs a consistency diff as part of QA.

### R7: Site-wide integration verification

Every HTML page (`index.html`, `about.html`, `resume.html`, `contact.html`, `advisory.html`) must render coherently under the new design system. This is not a "per page edit" requirement — the bulk of the change lives in `css/style.css` and the new `<link rel>` and `<head>` additions. HTML structural changes are expected to be minimal and limited to:

- New `<link>` tags for favicon suite (R5).
- New `<link rel="preload">` for Inter font (R2).
- `<meta name="theme-color">` update to `#111318` (matching manifest).
- Removal of SPEC-007 favicon `<link>` tags (replaced by R5 additions).
- Hero section HTML — may require new wrapper divs or reordering for the asymmetric composition (R3.1); minimize but permit.
- Eyebrow labels on section headers — new `<span class="eyebrow">` elements IF `graphic-artist` decides to introduce them (R3.4).

No changes permitted to:
- Body copy on any page.
- Nav or footer content/links.
- Form fields or form action.
- Inline links in body prose.
- Meta description, OG tags, canonical URLs, any SEO element.
- `js/main.js` (the design system is CSS-delivered; JS stays as-is).

## Content Requirements

No copywriting scope. `marketing-copywriter` is NOT invoked for this spec. All page content is preserved verbatim.

`graphic-artist` is the primary specialist invoked during implementation — for palette token finalization (R1), typography integration (R2), component refresh execution (R3), favicon production (R5), and agent-file rewrites (R6).

`ui-designer` is invoked for layout-grammar decisions (R3.1, R3.4) and the agent-file rewrites (R6).

`frontend-developer` is invoked to execute the CSS and HTML changes per the design specs produced by `graphic-artist` and `ui-designer`.

`code-reviewer` and `qa-expert` run in parallel at QA Gate.

`architect-reviewer` runs at Arch Gate for the component composition strategy and CSS structural review.

`penetration-tester` is NOT invoked — no auth, no PII, no payment, no new external integration, no new JS. Self-hosted font files introduce no new attack surface.

## Out of Scope

- **Any copy change** on any page — enforced. If the design requires a copy adjustment for coherence (e.g., hero headline line-breaks in a new serif), the adjustment is layout-only (CSS `word-spacing` / `<br>` placement), not wording.
- **Dark mode / `prefers-color-scheme` support** — future spec if introduced at all. The new palette is designed light-first with cream base; a dark-mode variant would be substantial additional work and is deferred.
- **New pages or page deletions** — SPEC-001–007 settled the site structure. No additions here.
- **Framework migration** (to Astro, Hugo, Next.js, etc.) — stays pure HTML/CSS/JS.
- **Build process introduction** (bundlers, preprocessors, PostCSS) — stays build-free.
- **Analytics / tracking / telemetry** — no change.
- **SEO restructuring** — no meta, canonical, robots, sitemap changes. (No sitemap exists; not introduced here.)
- **Deployment** — still deferred project-wide per `project_deployment_deferred.md` until SPEC-000 is written.
- **"Fractional engineering leader" copy cleanup** at `index.html:141` — still deferred per auto-memory `project_fractional_cleanup_deferred.md`. Not bundled here despite the redesign context; remains a separate trivial-tier follow-up.
- **Imagery refresh** — the site's hero images / about photo remain unchanged. If the new design composition calls for a different image crop or placement, the existing source files in `images/source/` can be re-optimized per the existing recipe, but no new photography is produced.
- **Logo / wordmark design** — site uses the text string "Rob Parker" as its wordmark in the nav. No graphic logo introduced in this spec. (A wordmark treatment change — e.g., the wordmark in Fraunces vs. Inter — is in scope per R3.5; a new graphic mark beyond that is out.)
- **Component library / design system extraction** — the CSS stays in a single `style.css` file. No separation into tokens-file + components-file structure.
- **A/B testing infrastructure** — no.
- **The CLAUDE.md document** — no edits; CLAUDE.md's "Current State" block references the old palette but is structurally documentation of how the project is organized, not the design system itself. Update in a follow-up after SPEC-008 lands if desired.

## Decision Rationale

- **Why magenta over lime.** Concept 2 (the chosen favicon) already carries strong AI-native signal via the attention-grid pattern itself — the color doesn't need to reinforce "AI tool." Lime on a grid-based mark lands in a crowded accent family (Linear, Supabase, Vercel, Cursor all use lime/mint/electric-green). Magenta is rare in the B2B engineering-leadership space, creates productive tension with the cool precise geometry (cool form + warm color reads editorial-distinctive, not generic-product), and delivers a site-wide signature across buttons/links/hover states that people remember. The tradeoff — lime would read more conventionally AI-ecosystem to a hiring manager skimming quickly, magenta is a bolder move rewarding a second look — resolved in favor of memorability for a personal executive brand.

- **Why self-host fonts over Google Fonts.** Google Fonts introduces a third-party dependency that auto-memory `project_third_party_tbd.md` flags as unresolved. Self-hosting eliminates the dependency decision, removes a DNS lookup on first paint, keeps the font files under the site's own cache-control rules, and adds no meaningful operational burden (woff2 files are static assets served by the same Cloudflare Pages deployment). Subsetting Inter + Fraunces to Latin-only keeps total font payload under 120KB compressed.

- **Why Fraunces + Inter specifically.** Fraunces is a variable display serif with editorial warmth that reads as "print-adjacent executive" rather than "bookish academic" — the wedge between literary magazine and business publication that matches the target mood. Inter is the de-facto modern geometric sans in the tech sector with exhaustive weight/feature coverage at variable scale. The pairing is a known-good combination (used by Substack, Every.to, Stripe editorial, and numerous Linear-adjacent brands) without being so common as to feel derivative. Alternatives considered in A-2.

- **Why component refresh not full rebuild.** (D3 decision.) A palette-only swap keeps the geekbyte layout grammar intact and the site would still read template-adjacent. A full rebuild of every component, page layout, and interaction pattern exceeds the scope justified by the Director/VP hunt timeline. The component refresh is the sufficient cut: hero composition, card treatment, button treatment, and section rhythm are the four layers that carry template-fingerprint weight; changing those four while preserving spacing scale, breakpoints, and layout container geometry delivers a visibly different site with bounded implementation risk.

- **Why Complex tier.** Per CLAUDE.md tier table, "Styling/layout changes" defaults to Trivial or Standard. SPEC-008 exceeds Standard on multiple dimensions: touches every HTML page (5 files), rewrites the central CSS file (2,074 lines) structurally, introduces new asset categories (woff2 font files, new favicon suite), rewrites two load-bearing agent definitions, and sets the design-language baseline for all future specs. Complex tier triggers full `architect-reviewer` involvement on composition strategy and QA parallel review — both warranted.

- **Why bundle favicon + palette + typography + components + agents in one spec.** These are coupled by shared visual language: the favicon's magenta references the site's magenta; the component refresh uses the new typography; the agent definitions reference the new component vocabulary. Splitting would force the site into a transitional state (new palette + old favicon, or new favicon + old palette) that is worse than the worst day of a single spec. The coupling argues for a unified deliverable.

- **Why rewrite agent `.md` files deeply rather than surgically.** A surgical palette swap in `graphic-artist.md` (just update the hex codes) would leave the agent's "principles" still at a generic SaaS default. The next design task would regenerate template-looking work because the anchoring language doesn't change. A deeper rewrite bakes the new design language into the prompt itself, which is what actually controls future output.

- **Why no copy changes.** The Director/VP hunt timeline favors shipping an original visual identity sooner over bundling a simultaneous copy pass. Copy has already been reviewed by `marketing-copywriter` across SPEC-001–007; it is in good shape. Opening a copy pass here would extend the spec-gate cycle, widen the review surface, and dilute the visual-identity focus. Copy adjustments can be a follow-up spec if needed after the design lands.

- **Why no dark mode.** Dark mode on a cream-based light-first palette is not a simple variable swap — cream surfaces don't invert cleanly; magenta accent needs saturation tuning on dark backgrounds; display-serif readability at small sizes on dark backgrounds is a separate engineering problem. Properly-executed dark mode is its own spec. Attempting it as a subsidiary of SPEC-008 would either ship a broken dark mode or inflate this spec past Complex into multi-week territory.

- **Why keep the navigation structure unchanged.** Horizontal logo-left nav is category-standard across virtually all personal-brand, advisory, and executive sites regardless of visual identity — it's not a template-fingerprint signal in the same class as the centered-hero or the three-column cards. Changing it would add risk (mobile nav is already working correctly) without contributing to the originality goal.

## Dependencies

- **SPEC-001 (complete):** Foundation + home page — scaffolded the CSS token structure and the shared nav/footer pattern that SPEC-008 restyles.
- **SPEC-002 (complete):** About page — subject to the design refresh; no structural change.
- **SPEC-003 (complete):** Resume page — subject to the design refresh; no structural change.
- **SPEC-004 (complete):** Contact page — subject to the design refresh including the form styling (R3.6).
- **SPEC-005 (complete):** Tech Advisory — the `.engagement-card` / `.service-card` composition is preserved per R3.2 and AG-1 from that spec; SPEC-008 does not break that composition, only restyles its surface.
- **SPEC-006 (complete):** Site re-org to professional-only — no structural conflict.
- **SPEC-007 (complete):** Copy cleanup + original favicon — SPEC-008 replaces the SPEC-007 favicon suite entirely per R5.
- **No external integrations added.** Self-hosted font files are additions to the existing static-assets bundle served by the same Cloudflare Pages deployment; no new services, no new vendors, no new API surface.
- **Cloudflare Pages hosting (auto-memory `project_hosting.md`):** unchanged. The `_headers` file gets one new rule for font cache-control per R2; no routing changes.

## Non-Functional Requirements

### Performance

- **First Contentful Paint:** The asymmetric editorial hero uses display-serif typography which requires font loading. Mitigation: `font-display: swap` on Fraunces so text renders in Georgia fallback immediately, then swaps when Fraunces loads. Inter (body font) is preloaded on every page so body copy does not FOUT.
- **Font payload:** Target total font weight ≤ 120KB compressed (Inter subset ~40KB + Fraunces subset ~80KB). `graphic-artist` verifies against the actual subset during implementation. If exceeded, narrow the subset further or drop Fraunces variable in favor of a single cut (regular + semibold static).
- **CSS payload:** current `style.css` is ~60KB uncompressed, ~15KB gzipped. Redesign should not materially increase payload — component refresh replaces existing rules rather than augmenting them. Target: ≤ 18KB gzipped post-redesign.
- **Favicon payload:** SVG + ICO + PNG sizes total ~30KB. Cached aggressively via browser default ICO caching.
- **No JavaScript added.** `js/main.js` unchanged, same 6KB footprint.

### Accessibility

- **All text/background combinations verified against WCAG 2.1 AA.** See R1 contrast requirements. Existing CSS comment block at `style.css:13-17` maintained and updated with new-palette verification table.
- **Focus states** newly emphasized via magenta 2-3px outline (R3.3) — stronger than existing blue focus ring.
- **Form error state** uses magenta + text messaging (not color-alone) — compliant with WCAG SC 1.4.1 Use of Color.
- **Heading hierarchy** preserved on every page — R3 component changes are surface-level, not structural.
- **Skip-to-content link** preserved and restyled to magenta-on-cream focus state (matches rest of focus-ring treatment).
- **`prefers-reduced-motion`** honored — any new micro-animation introduced (button hover transitions, nav underline fade) must be wrapped in `@media (prefers-reduced-motion: reduce)` with instant-state fallbacks.
- **Touch targets on mobile** — remain ≥ 44×44 per R3.3 button treatment (sharper corners do not reduce tap area).
- **Serif body text caveat** — Fraunces is used for headings only, NOT body. Serif body text at small sizes is a legibility risk; Inter (sans) handles all body copy.

### SEO

- **No URL changes.** No canonical, meta, OG, sitemap impact.
- **`theme-color` meta tag update** from current value to `#111318` — cosmetic only (mobile browser chrome color).
- **LCP element** may shift due to hero composition change — track at QA Gate via Lighthouse run; must remain ≤ 2.5s locally on throttled build.

### Responsive

- **Breakpoints preserved** — 768px, 480px. No new breakpoints introduced.
- **Hero composition at mobile** — the desktop asymmetric layout (R3.1) stacks to centered-column at mobile. Centered at mobile is acceptable because geekbyte divergence is read at desktop; mobile-stacked hero is category-default regardless.
- **Card treatment at mobile** — borderless variant (if chosen in A-4) may need a background-tint variant at mobile to preserve card boundaries on small screens. `graphic-artist` handles.
- **Typography scale** — display-serif hero size drops significantly at mobile (4-5rem desktop → 2.5-3rem mobile 768px → 2-2.5rem mobile 480px); `graphic-artist` tunes.

### Browser support

- **Targets** preserved from current site: modern evergreen browsers (Chrome, Edge, Firefox, Safari last 2 major versions). Variable fonts supported in all targets. CSS custom properties, Grid, Flexbox — all already in use.
- **IE11:** not supported (already unsupported).
- **Fallback chain** — every new custom property has a reasonable fallback (cream → Georgia; Inter → system sans; magenta → a blue close to the old primary IF a font-face fails in a way that also trashes custom properties — extremely unlikely).

## Acceptance Criteria

### Design tokens (R1)

- **Given** `css/style.css:root`, **When** inspected, **Then** `--color-charcoal`, `--color-cream`, `--color-magenta` are defined with the committed values.
- **Given** the stylesheet, **When** grep'd for `#2563eb`, `#1e40af`, or `#3b82f6`, **Then** zero matches.
- **Given** the stylesheet, **When** the verification comment block at `:root` is read, **Then** it enumerates at least five text/background contrast combinations each with a measured ratio and a WCAG pass statement.
- **Given** every CSS rule that references text color on a background, **When** the pairing is checked, **Then** it meets WCAG 2.1 AA (4.5:1 normal text / 3:1 large text / 3:1 UI components) OR is marked with a WHY comment explaining a large-text-only restriction.

### Typography (R2)

- **Given** the repo, **When** `/fonts/` directory is inspected, **Then** `inter-variable.woff2` and `fraunces-variable.woff2` (or equivalently-named subset variants) are present.
- **Given** `style.css`, **When** inspected, **Then** `@font-face` declarations for both families are present with `font-display: swap` and `font-style: normal`.
- **Given** any HTML page, **When** `<head>` is inspected, **Then** a `<link rel="preload" as="font" type="font/woff2" crossorigin>` tag for Inter is present.
- **Given** the `_headers` file, **When** inspected, **Then** a rule applying long-lived immutable cache to `/fonts/*` exists.
- **Given** any H1 or H2 on any page, **When** inspected via computed styles, **Then** `font-family` resolves to Fraunces (or its fallback chain).
- **Given** any paragraph, nav link, button label, or form input, **When** inspected via computed styles, **Then** `font-family` resolves to Inter (or its fallback chain).

### Components (R3)

- **Given** every page's hero section, **When** inspected visually and via layout, **Then** the composition is not centered-with-horizontally-stacked-dual-CTAs (AP-3).
- **Given** every `.highlight-card`, `.service-card`, `.engagement-card`, `.about-teaser`, **When** inspected via computed styles, **Then** `box-shadow` is either `none`, a hairline `0 0 0 1px` border-like shadow, or a minimal hover-only shadow — never the current `var(--shadow-md)` 10-15px blur.
- **Given** `.btn-primary` and `.btn-secondary`, **When** inspected via computed styles, **Then** `border-radius` ≤ 4px.
- **Given** primary buttons, **When** rendered, **Then** background is magenta and text is cream (or equivalent charcoal on magenta-muted if graphic-artist chooses that inversion for specific contexts).
- **Given** the nav on any page, **When** the active page link is inspected, **Then** it carries a magenta underline or border indicator (not a color-only swap).
- **Given** the footer on any page, **When** inspected, **Then** background is `--color-charcoal` (`#111318`), not the current `#1e293b`.
- **Given** form inputs on `contact.html`, **When** focused, **Then** a magenta 2px border + 2px offset outline is rendered.

### Anti-patterns (R4)

- **Given** the deployed (or locally-rendered) site and geekbyte.biz side-by-side, **When** each AP-1 through AP-8 pattern is checked, **Then** none are present on robcparker.com.

### Favicon (R5)

- **Given** the site root, **When** inspected, **Then** `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `safari-pinned-tab.svg` are all present.
- **Given** `site.webmanifest`, **When** inspected, **Then** `icons` array contains 192×192 and 512×512 entries; `theme_color` is `#111318`; `background_color` is `#F7F6F2`.
- **Given** every HTML page's `<head>`, **When** grep'd, **Then** the SPEC-007 guitar-era favicon link tags are absent and the SPEC-008 Token-Grid link tags are present.
- **Given** `favicon.svg`, **When** opened, **Then** the mark matches the Token-Grid Concept 2 magenta variant (3×3 rounded-square grid, four diagonal cells in magenta on charcoal base).
- **Given** the repo, **When** inspected, **Then** no guitar-era favicon source files remain.

### Agent `.md` overhaul (R6)

- **Given** `.claude/agents/graphic-artist.md`, **When** grep'd for `#2563eb` / `#1e40af` / `#3b82f6`, **Then** zero matches.
- **Given** the same file, **When** inspected, **Then** a "Design Language" section references Fraunces, Inter, magenta `#E8449B`, charcoal, cream.
- **Given** the same file, **When** inspected, **Then** an "Anti-Pattern Guardrails" section enumerates the R4 anti-pattern list (or references SPEC-008 R4 by name).
- **Given** `.claude/agents/ui-designer.md`, **When** inspected, **Then** it contains the same design-language statement and anti-pattern list (verbatim match required across the two files for those two sections).
- **Given** both agent files, **When** a design task is mock-invoked with minimal context, **Then** the response does not regenerate any AP-1 through AP-8 pattern — this is a judgment check at QA Gate.

### Site integration (R7)

- **Given** all 5 HTML pages, **When** loaded in a modern browser, **Then** each renders coherently under the new design system with no unstyled-content flashes, no broken layouts, no overlapping elements.
- **Given** each page, **When** loaded on a 375×667 viewport (mobile), then 768×1024 (tablet), then 1440×900 (desktop), **Then** layout reflows correctly at every breakpoint without horizontal scroll.
- **Given** every page, **When** grep'd for body-copy content in a sample of three paragraphs per page, **Then** the content matches pre-SPEC-008 content byte-for-byte.
- **Given** a link checker walk from `index.html`, **When** run, **Then** zero broken internal links.
- **Given** Lighthouse run on `index.html` locally, **When** compared to pre-SPEC-008 baseline, **Then** Accessibility score ≥ 95, Performance score no more than 5 points lower than baseline.

## Effort Comparison

| | AI-Assisted | Human Solo |
|---|---|---|
| Spec creation | ~45 minutes | 4-6 hours |
| Assumptions | PM agent had full repo access, SPEC-005/006/007 as structural references, completed Spec-Gate-pre-work (D1–D7 decision sequence resolved with Rob including geekbyte audit + favicon concept selection), current CSS and HTML fully scanned, graphic-artist agent's favicon-concept scratch output as the basis for R5. Tier derived from the CLAUDE.md table with multi-dimension escalation: touches every page, every component surface, two agent definitions, a new asset category (fonts), and sets the design-language baseline for all future specs. | PM would need to audit the site manually, hand-source and vet a font pairing, produce favicon concepts from scratch or outsource them, articulate the geekbyte divergence argument in writing, and interview Rob on each ambiguity. The font licensing review alone takes a human 30-60 minutes. |

---

## Approval

**Tier:** Complex
**Gate owner:** Rob Parker
**Requires:** Documented approval with responses to agent-raised ambiguities. Complex tier downstream: ARCH-SPEC-008 (with `architect-reviewer` on composition strategy, CSS structural review, font-loading-strategy review) + QA-SPEC-008 (parallel `qa-expert` + `code-reviewer`). No DEPLOY gate since deployment is deferred project-wide. No `penetration-tester` invocation — no security surface change.

### Structured Review Checklist

- [x] Business intent confirmed (site diverges from geekbyte template; establishes original visual identity aligned with Director/VP hunt)
- [x] Scope boundaries clear (visual identity only; no copy changes; no structural additions)
- [x] Acceptance criteria testable (Given/When/Then across all seven requirement blocks; contrast table and anti-pattern checklist are both automatable/scriptable)
- [x] Dependencies identified (SPEC-001–007; no external integrations; Cloudflare Pages hosting unchanged)
- [x] Tier appropriate (Complex — site-wide surface touch + new asset category + agent-definition rewrites + design-language reset for future specs)
- [x] No mandatory escalation triggers (no auth, no payments, no PII, no new external integrations, no DB)
- [x] Third-party features verified (self-hosted fonts — no new third-party dependencies; removes Google Fonts from the TBD list)
- [x] Decision Rationale section included

### Ambiguities Flagged for Spec Gate

| # | Concern | Options | Recommendation |
|---|---------|---------|----------------|
| A-1 | Derivative shade values — the committed palette is three base colors (charcoal, cream, magenta); derivative shades (text-muted, border-hairline, surface-elevated, magenta-hover, magenta-muted) are left for `graphic-artist` to finalize during implementation. Where in the pipeline does Rob see and approve those values? | (a) Spec Gate — copy back with `graphic-artist` producing a full token table before Spec Gate signs off; (b) Arch Gate — `graphic-artist` produces the full table during Arch Review; Rob approves alongside arch decisions; (c) Implementation-time — values appear in the PR with the CSS; Rob reviews in PR | **(b)** — Arch Gate is the natural gate for design-token finalization because architect-reviewer is already reviewing the composition strategy. Saves a round-trip vs (a); gives Rob a structured review point vs the open-ended PR review of (c). |
| A-2 | Typography pairing — Fraunces + Inter is tentative. Alternatives exist. | (a) Lock Fraunces + Inter now (as tentatively specified); (b) Have `graphic-artist` propose 2-3 display-serif options alongside Inter (e.g., Instrument Serif, Newsreader, Source Serif 4) during Arch Review and Rob picks; (c) Defer entirely — pair gets chosen during implementation, Rob sees in PR | **(b)** — the pairing is a high-leverage identity decision and the three-option review is low-cost (30 minutes of graphic-artist time) compared to the risk of locking on a font that doesn't land in practice. Inter is settled; only the display serif needs the option pass. |
| A-3 | Hero composition — R3.1 requires asymmetric editorial treatment but does not pre-specify a layout pattern. | (a) Two-column asymmetric: display-serif headline spanning 60-70% of the left column; supporting text + single CTA in the right 30-40%, bottom-aligned; (b) Full-bleed editorial: hero headline left-aligned at oversize scale, takes the full container width; subhead and CTA stacked below, left-aligned; asymmetry comes from headline scale + page-bottom weight; (c) Vertical-rhythm editorial: small eyebrow label + large display headline + short hairline rule + body prose paragraph + text-link CTA, all left-aligned in a single column narrower than the page container; (d) `ui-designer` proposes 2-3 concepts at Arch Review | **(d)** — same logic as A-2; hero composition is identity-defining and low-cost to produce options for. `ui-designer` produces three hero layout options at Arch Review using the home page as the reference; Rob picks one and it propagates to the subpages (with page-appropriate headline content preserved). |
| A-4 | Card treatment — R3.2 specifies dropping soft-shadows but leaves the replacement pattern open. | (a) Thin-hairline border cards on `--color-surface-elevated` (subtle warm tint); (b) Borderless cards with alternating surface tint between adjacent cards for boundary definition; (c) No card containers — convert `.highlight-card` and `.engagement-card` content blocks into sectioned typographic blocks with Fraunces eyebrow labels and hairline horizontal rules between blocks; (d) `ui-designer` proposes the three above as visual mockups at Arch Review | **(a)** — thin-hairline borders on a subtly-tinted surface are the safest of the three; it preserves the card affordance (user sees "this is a group of related items") while dropping the template-y drop-shadow. Option (c) is more editorially bold but restructures the HTML semantics of multi-card sections and increases scope. Option (b) is technically workable but risks a zebra-striping reading that's more distracting than editorial. If Rob wants to see options at Arch Review, (d) is acceptable as a fallback; otherwise lock (a) at Spec Gate. |
| A-5 | Font file sourcing — where do the woff2 files come from? | (a) google-webfonts-helper (gwfh.mranftl.com) — subsets the official Google-hosted variable fonts to woff2 with configurable unicode-range; well-maintained community tool; (b) Source directly from the respective project GitHub repos (rsms/inter, undercase-type/fraunces) and subset via `pyftsubset` locally; (c) Use full unsubsetted variable fonts — simpler, larger payload (~80KB + 140KB) | **(a)** — google-webfonts-helper is the standard path for this exact use case. Produces small woff2 subsets with no build step, no licensing ambiguity (both fonts are OFL), no Google dependency at runtime. Option (b) introduces a local build dependency (`pyftsubset`) for no meaningful gain. Option (c) doubles the font payload unnecessarily. |
| A-6 | Favicon suite production — what tool generates the full suite from the SVG source? | (a) realfavicongenerator.net (online tool, well-maintained, produces all required sizes + manifest entries); (b) Local pipeline via `rsvg-convert` + ImageMagick/`magick` for PNG sizing + `png2ico` for the ICO; (c) Hand-author each file (SVG for `favicon.svg` is direct; PNGs rendered via browser + export; ICO via command line) | **(a)** — realfavicongenerator is the category-standard tool, produces iOS-appropriate apple-touch-icon (with correct background treatment so it doesn't get iOS-auto-masked badly), handles the 16×16 ICO simplification intelligently, and generates the full `<link>` tag set as a copy-paste snippet. Output is validated against Apple / Google / Microsoft platform requirements. Option (b) is a reasonable self-hosted alternative but requires local tool installation; (c) is over-manual. |
| A-7 | `--secondary-color` and `--accent-color` CSS variable fates — R1 says "deprecated and removed, OR mapped to [new value]." | (a) Remove both variables entirely and update all callsites to reference the new-system names (`--color-charcoal`, `--color-magenta-muted`, etc.); (b) Keep both names mapped to new-palette values (backward compatibility for any external stylesheet consumer that references them — irrelevant here since no external consumer exists); (c) Keep `--accent-color` (used more widely in current CSS) mapped, remove `--secondary-color` | **(a)** — no external consumer; cleaner to remove. The remapping noise in the CSS is bigger than the rename noise; a global-find-and-replace handles the callsite updates. `graphic-artist` performs the rename at implementation time. |
| A-8 | Anti-pattern check at QA — R4 requires a "visual diff" vs geekbyte. What tool / process? | (a) Manual side-by-side visual inspection at two breakpoints (desktop 1440, mobile 375) during QA Gate; (b) Side-by-side screenshots committed to the PR as a documentation artifact, compared against a geekbyte screenshot captured once at SPEC-008 kickoff; (c) Automated pixel-diff (not useful here — the point is that the sites should be different, not that any specific pixel should match) | **(b)** — screenshot side-by-side is the right cadence for this level of check. Easy to capture, easy to review in the PR, creates a durable artifact of the divergence decision. `qa-expert` handles during QA. |
| A-9 | Dark mode — Out of Scope list says no dark mode. Confirm. | (a) Confirm — dark mode is out of scope for SPEC-008, remains a future spec if ever; (b) Invert — include a basic dark mode in SPEC-008 despite the scope cost; (c) Defer decision to Arch Gate | **(a)** — per Decision Rationale. Confirming at Spec Gate closes it. |
| A-10 | Order of operations during implementation — what gets built first? | (a) Tokens first (R1) → fonts next (R2) → components (R3) → favicon (R5) → agent rewrites (R6) → integration check (R7) — bottom-up; (b) Agent rewrites first (R6) so the rewritten agent definitions guide the component work that follows; (c) Favicon first (R5) so it's visible early and any palette adjustment can respond to how it looks at small sizes | **(a)** — the bottom-up order minimizes churn. Tokens are the foundation; components reference tokens; the favicon uses tokens (accent magenta); agent rewrites reference the completed design language so the documentation lands once, not twice. Option (b) is appealing in theory but the agent rewrites need the completed new-palette hex codes and component vocabulary as inputs, which argues for rewrites last. |

### Complex-Tier Escalation Check

| Trigger | Applies? | Notes |
|---------|----------|-------|
| Authentication / authorization | No | Public content only |
| Payments / financial data | No | None |
| PII / PHI handling | No | No new PII surface; contact form unchanged |
| New external API integration | No | Self-hosted fonts — no runtime third-party dependency |
| Database schema change | No | No DB |
| Core domain model modification | No | |
| Framework or platform migration | No | Stays pure HTML/CSS/JS, no build process |
| First implementation of new architectural pattern | Yes — design-language reset | Architect-reviewer handles in Arch Review; no security surface change, so `penetration-tester` is not triggered |

**Complex tier confirmed — no escalation above Complex.**

### Gate Responses

| Concern | Response |
|---------|---------|
| A-1 | **Option (b)** — Arch Gate. `graphic-artist` produces the full derivative-shade table during Arch Review. |
| A-2 | **Option (b)** — three-option pass. `graphic-artist` proposes 2-3 display-serif alternatives alongside Fraunces + Inter at Arch Review. |
| A-3 | **Option (d)** — `ui-designer` proposes three hero composition options at Arch Review using the home page as the reference. Picked option propagates to the other 4 pages. |
| A-4 | **Option (a)** — thin-hairline border on subtly-tinted elevated surface. Locked at Spec Gate to bound scope; `graphic-artist` finalizes exact border and surface tint at Arch Gate. |
| A-5 | **Option (a)** — google-webfonts-helper. |
| A-6 | **Option (a)** — realfavicongenerator. |
| A-7 | **Option (a)** — remove `--secondary-color` and `--accent-color` entirely; update callsites to new token names. |
| A-8 | **Option (b)** — side-by-side screenshots committed to the PR as a durable artifact. `qa-expert` executes. |
| A-9 | **Option (a)** — dark mode confirmed Out of Scope. |
| A-10 | **Option (a)** — bottom-up implementation order: tokens → fonts → components → favicon → agent rewrites → integration. |

**Decision:** Approved
**Approved by:** Rob Parker
**Date:** 2026-04-21

---

## Architecture Review

**Reviewer:** architect-reviewer agent (composition, CSS structural, font-loading) + graphic-artist agent (A-1 derived shades, A-2 typography options, A-7 migration) + ui-designer agent (A-3 hero composition concepts)
**Date:** 2026-04-21
**Recommendation:** Approve with conditions (16 IG items + 7 Arch Gate decisions)

### Design Findings

| Area | Finding |
|------|---------|
| Pattern fit | Strong — within static-first principles. No build tool introduced, no new runtime dependencies, no new JS. Self-hosted fonts are additive static assets served by the existing Cloudflare Pages deployment. The changes are confined to (a) CSS tokens + rules, (b) font files + `@font-face`, (c) favicon asset swap + `<head>` link rewrites, (d) agent `.md` rewrites, (e) minimal HTML `<head>` updates per page. Composition-preservation posture (`.engagement-card` extends `.service-card`) is explicitly respected per R3.2. The spec does not advance a framework migration; it stays within the Phase 1 static envelope. |
| Variable-reference audit — `--primary-color` | **30 usages across `css/style.css`** (excluding the `:root` declaration and comment references). Every callsite remains valid under R1's semantic-layer remapping (`--primary-color` → new magenta). No callsite requires rewriting **if the variable is retained**; the color shift flows through automatically. The focus-ring callsites (line 209 `:focus-visible`, line 1775 `.form-input:focus`) inherit the new magenta as-is — matches R3.3/R3.6 intent. Skip-link background (line 195) + border-left on `.philosophy-quote` (line 950) + AI-framework-outcome block background (line 1063) + nav active border (line 377) all become magenta surfaces, which is the spec's intent. |
| Variable-reference audit — `--secondary-color` | **9 active callsites** (line 166 link hover, 282/283 primary button hover bg+border, 300/307 `.btn-white` text, 318 `.btn-outline-white` hover text, 2004/2021 alt-channel-link hover). Plus the contrast comment at line 14 and `:root` declaration at line 20. **Under A-7's "remove entirely," all 9 must be rewritten.** Most load-bearing are the four button hover callsites (282, 283, 300, 307, 318) — these define the primary hover contract and will need a new `--color-magenta-hover` or equivalent per R1's derived-shade list. The two alt-channel hover callsites (2004, 2021) are the same pattern in the contact-page context. The link hover at line 166 is the site-wide anchor hover treatment — also needs a hover token. **Risk:** if `graphic-artist` does not produce `--color-magenta-hover` during A-1's derived-shade finalization, these 9 callsites have no landing value. IG-2 codifies this dependency. |
| Variable-reference audit — `--accent-color` | **4 active callsites** (line 500 `.footer-logo:hover`, line 571 `.hero-eyebrow` color, line 810 `.process-steps li::before`, line 1312 `.resume-metric-number`). Plus the declaration at line 24 and two WHY comment references (21, 1286). **Under A-7's "remove entirely," all 4 must be rewritten.** Most load-bearing: (a) `.hero-eyebrow` at line 571 — sets the eyebrow label color on every page's hero in the dark-hero pattern; under R3 this may become magenta (consistent with AP-8 guidance if eyebrow is kept) or shift to a cream/subtle treatment on the new charcoal hero. `graphic-artist` decides. (b) `.resume-metric-number` at line 1312 is deliberately distinct from `--primary-color` per a WHY at 1285-1288 — the replacement must preserve a *deliberate distinction* from the primary magenta or the WHY note becomes stale. (c) `.footer-logo:hover` and `.process-steps li::before` are surface-level and take whichever replacement token `graphic-artist` maps. |
| Hardcoded color leak | **`style.css:1776`** contains a hardcoded `rgb(37 99 235 / 0.15)` in the form-input focus-ring box-shadow — bypasses the token system with an RGB-decomposed version of the Tailwind blue. **Must be rewritten** during R1; otherwise the new-magenta focus ring leaks a blue glow at ~15% alpha. A parallel pattern at line 1785 uses `rgb(220 38 38 / 0.12)` (the red validation-error glow) — separate semantic color (error), addressed by IG-3 below. |
| Line-number accuracy | Spec cites `style.css:13-17` for the existing contrast comment block. **Partially accurate.** The five contrast entries live at lines 13-17 exactly. The enclosing comment opens at line 11 (`/* Color Palette`) and closes at line 18 (`*/`). Implementers should treat **11-18** as the block to rewrite. IG-4 restates the full block range for precision. |
| CSS structure & `@font-face` placement | Current `style.css`: top comment (lines 1-4), then `:root` at line 10. **No existing `@font-face` declarations anywhere in the file.** R2's proposed placement ("top of `style.css`, after top comment block, before `:root`") fits cleanly between line 4 and line 10 without disturbing the existing section numbering. Recommendation: insert a new `0. TYPOGRAPHY — @font-face` section. `body { font-family: var(--font-family-base); }` at line 121 is the load-bearing consumer — Inter will flow through automatically once the token is updated. |
| Composition preservation — `.service-card` / `.engagement-card` | **Verified intact.** `.service-card` lives at `style.css:679-704`. `.engagement-card` at `style.css:721-751` defines only delta properties — no base chrome duplication. The composition is exactly as SPEC-005 AG-1 committed. **R3.2 must not fork.** The card refresh must be applied to `.service-card` only; `.engagement-card` will inherit automatically. The card hover-lift at lines 690-693 (`box-shadow: var(--shadow-lg); transform: translateY(-2px)`) conflicts with R3.2's "drop soft-shadow treatment site-wide" — **hover treatment must be redesigned**; AG-2 resolves. |
| Favicon suite — current state | Each HTML page carries 5 favicon-adjacent tags in `<head>`. Current files live at `images/favicon/` (not site root). **R5 implicitly moves the suite to site root** — every `<head>` href needs rewriting as well as the file moves. `site.webmanifest` currently references `android-chrome-{192,512}.png` paths + `#2563eb` theme / `#ffffff` background — all need updating. IG-6 and IG-8 codify. |
| Agent `.md` rewrite scope | `graphic-artist.md`: 59 lines. Hardcoded palette at 17-24 matches R6.1 citation. Post-rewrite expected ~100-120 lines (Design Language + Anti-Pattern Guardrails sections are new). `ui-designer.md`: 63 lines. No hardcoded palette. Design Principles block at 18-24 and component vocabulary at 34-40 are direct hooks for R6.2. Post-rewrite ~90-110 lines. |
| Anti-pattern enforcement — R4 | The 8 anti-patterns split into automatable (AP-1, AP-2, AP-5, AP-6 — via grep) vs manual visual-identity judgments (AP-3, AP-4, AP-7 — via side-by-side screenshot per A-8). IG-15 consolidates automatable checks. |
| `main.js` dependency check | **Verified visual-agnostic.** `initActiveNav()` at `js/main.js:74-95` applies `class="active"` + `aria-current="page"` only — zero inline styles, zero color references. The `.active` CSS rule at `style.css:375-378` is a pure CSS change. **Confirmed: `js/main.js` requires zero edits for SPEC-008.** Spec R7 line on this is accurate. |
| WHY comments referencing old palette | Four WHY comments carry old-palette references: `style.css:21-23` (delete — obsoleted by A-7), `style.css:1250-1252` (update token ref or leave verbatim), `style.css:1285-1288` (rewrite — load-bearing distinction logic for resume metric vs home-page metric), `style.css:799-804` (same load-bearing distinction for process-steps counter). IG-7 enumerates. |
| Sitemap / robots / `_headers` / redirects | `_headers` at project root contains one rule for `site.webmanifest` Content-Type. **No rule for `/fonts/*`** — net addition required. No sitemap, no robots.txt, no `_redirects`. IG-9 gives exact format. |
| Stack quirks | Four entries applicable or indirectly relevant. Cloudflare Pages serves `*.woff2` with correct Content-Type automatically — **only the cache rule is needed**. No CSP impact from SPEC-008 (no new inline styles). IG-16 flags a one-liner stack-quirks addition post-SPEC-008 for self-hosted-woff2 caveats. |
| SEO impact | **Minimal.** No URL changes, no canonical updates, no meta description edits, no OG image swap. Only `theme-color` value flips — cosmetic. LCP element may shift (R3.1); tracked at QA via Lighthouse per NFR. |
| Performance | Net payload increase ~120KB (font files). Offset by Inter preload, Fraunces `font-display: swap`, elimination of Google Fonts DNS. CSS target ≤ 18KB gzipped. Favicon net-neutral vs SPEC-007 suite. No new JS. |
| Accessibility | R1's contrast targets are more ambitious than current (AAA comfort for charcoal on cream). Magenta `#E8449B` on cream fails AA at ~3.4:1 for normal text — `graphic-artist`'s A-1 table produces a darker `--color-magenta-text` variant for inline links; decorative magenta stays at base hex. R3.6's magenta-for-error-AND-accent dual role is WCAG-1.4.1 compliant because error state is always paired with text messaging. Serif body-text caveat correctly constrained to headings only. |
| Technical debt impact | **Net-negative (debt reduction).** Removes 3 inherited Tailwind-blue hex codes (template-fingerprint source), removes `--secondary-color` and `--accent-color` semantic-layer cruft (A-7), closes the hardcoded-RGB leak at line 1776. Adds modest ongoing cost: self-hosted font maintenance + cross-agent `.md` consistency check. Net: debt reduction. |
| HTML structural scope per page | Per-page touch list verified: 5 favicon tags + theme-color meta + Inter preload on each of the 5 pages. Hero section wrapper may need adjustment for R3.1 asymmetric layout on `index.html`, `advisory.html`, and `contact.html`; `about.html`'s `.hero-profile` and `resume.html`'s `.resume-header` are distinct variants requiring `ui-designer` judgment on whether they inherit or get distinct refreshes. |

### Implementation Guidance (accept/reject per Arch Gate below)

| # | Guidance |
|---|----------|
| IG-1 | **Token rename verification greps before commit.** `rg -n '#2563eb\|#1e40af\|#3b82f6' css/ *.html site.webmanifest` → zero; `rg -n 'rgb\(37 99 235' css/` → zero (line 1776 leak closed); `rg -n -- '--secondary-color\|--accent-color' css/ *.html` → zero (A-7 executed); `rg -n '@font-face' css/style.css` → at least 2; `rg -n 'var\(--font-family-display\)' css/style.css` → matches on H1/H2 rules. |
| IG-2 | **Derived-shade dependency chain.** Per A-1, `graphic-artist`'s derived-shade table MUST include `--color-magenta-hover` (9 secondary-color callsites), `--color-border-hairline`, `--color-surface-elevated` (consumed by 8+ card/surface rules), `--color-text-muted`/`--color-text-subtle` remaps, `--color-text-on-dark`, plus replacements for each `--accent-color` callsite. Architect-reviewer at Arch Gate validates every current-CSS consumer has a mapped replacement token before implementation proceeds. |
| IG-3 | **Form error + warning palette fate.** `style.css:1784-1843` contains `#dc2626` (error red), `#fef2f2`/`#fecaca` (error bg/border), `#fffbeb`/`#fde68a`/`#92400e` (warning). **Recommendation:** retain as semantic palette; R3.6's magenta-for-error applies to form-input border + error text only; banner backgrounds stay red/yellow. Overloading magenta to banner backgrounds dilutes the identity signal. AG-3 resolves. |
| IG-4 | **Contrast comment block replacement — full range lines 11-18, not 13-17.** Delete the entire block from line 11 (`/* Color Palette`) through line 18 (`*/`). Replace with new comment enumerating minimum five WCAG-measured pairings for the new palette. `graphic-artist` produces the measurement table. |
| IG-5 | **Card refresh must mutate, not duplicate.** Edit `.service-card` at `style.css:679-704` in place. Do NOT introduce `.service-card--refreshed`. Hover treatment redesigned per AG-2. Same refresh applies to `.highlights-grid` / `.highlight-card` at 634-667. Verify post-refresh that `advisory.html` engagement cards and home-page highlights still render as expected. |
| IG-6 | **Favicon suite locations + href rewrites.** Current files live at `images/favicon/` + root `/favicon.ico`. Implementation: (a) delete all 7 existing files under `images/favicon/` + root `/favicon.ico`; (b) generate new suite via realfavicongenerator.net; (c) commit to **site root**; (d) rewrite every `<head>` `<link>` in all 5 HTML pages to use root-relative paths; (e) add `<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#111318">`. |
| IG-7 | **WHY-comment updates.** `style.css:21-23` delete. `style.css:1250-1252` update or leave verbatim. `style.css:1285-1288` + `style.css:799-804` rewrite if the `--accent-color` → `--primary-color` distinction logic is preserved in new palette, else delete. `graphic-artist` flags fate of each during implementation. |
| IG-8 | **Manifest updates.** `site.webmanifest`: `theme_color: "#111318"`, `background_color: "#F7F6F2"`, both `icons[]` entries re-pathed to `/icon-{192,512}.png`, each icon entry adds `"purpose": "maskable"`. `name`/`short_name`/`start_url`/`scope`/`display` preserved. |
| IG-9 | **`_headers` rule for fonts.** Append: `/fonts/*` on one line, then `  Cache-Control: public, max-age=31536000, immutable` indented two spaces. Cloudflare Pages infers `Content-Type: font/woff2` automatically. |
| IG-10 | **Font file sourcing workflow.** Visit google-webfonts-helper. For Inter: woff2 only, latin + latin-ext, variable weight (or static 400/600). Same for Fraunces. Commit to `/fonts/`. Record unicode-range in `/fonts/SOURCE.md` for reproducibility. |
| IG-11 | **`@font-face` declaration syntax.** Insert after style.css:4 (before section 1): `@font-face { font-family: "Inter"; src: url("/fonts/inter-variable.woff2") format("woff2-variations"), url("/fonts/inter-variable.woff2") format("woff2"); font-weight: 100 900; font-style: normal; font-display: swap; }`. Same pattern for Fraunces. Static-weight fallback: separate blocks per cut. |
| IG-12 | **Font preload `<link>` syntax — every page's `<head>`.** `<link rel="preload" href="/fonts/inter-variable.woff2" as="font" type="font/woff2" crossorigin>`. The `crossorigin` attribute is required even for same-origin — without it the preload is discarded. Do NOT preload Fraunces. |
| IG-13 | **Favicon generation — realfavicongenerator.net.** Upload Concept 2 magenta SVG as primary + mono SVG for Safari pinned-tab. iOS settings: background `#111318`, no rounded corners. Android/PWA: background `#F7F6F2`, theme `#111318`. Windows Tile: magenta `#E8449B`. |
| IG-14 | **Agent `.md` rewrite — what's removed/added.** `graphic-artist.md`: remove lines 17-24 (hardcoded palette); add "Project Design Language" section referencing new tokens; add "Anti-Pattern Guardrails" enumerating R4 AP-1..AP-8; update "Responsibilities → Color & Typography" to reference `--font-family-display`; prepend SPEC-008 WHY marker. `ui-designer.md`: replace "Clean and professional" with "Editorial-executive"; insert "Project Design Language" (verbatim match with graphic-artist per R6.3); add "Component Vocabulary" subsection enumerating R3 "uses X, not Y" directives; insert "Anti-Pattern Guardrails" verbatim. **Cross-agent diff command** (per R6.3): `diff <(sed -n '/Project Design Language/,/^## /p' .claude/agents/graphic-artist.md) <(sed -n '/Project Design Language/,/^## /p' .claude/agents/ui-designer.md)` — expect near-empty diff. QA ticks this off. |
| IG-15 | **Pre-commit grep bundle.** Twelve-item check consolidating IG-1 + favicon file existence + manifest updates + agent `.md` consistency. Any non-zero failure blocks commit. Full list in architect-reviewer scratch output. |
| IG-16 | **Stack-quirks addition post-completion.** After SPEC-008 lands, append one-liners to `governance/stack-quirks.md`: (a) Cloudflare Pages auto-sets `Content-Type: font/woff2`, (b) `<link rel="preload" as="font">` requires `crossorigin` even for same-origin, (c) google-webfonts-helper as established subset workflow. |

### Arch Gate Decisions Required (Rob)

| # | Question | Options | Recommendation |
|---|----------|---------|----------------|
| AG-1 | Derived-shade table minimum coverage at Arch Gate | (a) 8 derived shades in R1 only; (b) Above + 11 legacy-token remaps (text-color, text-muted, text-light, background-color, surface-color, surface-dark, border-color, text-muted-dark, text-subtle-dark, text-on-dark, border-dark); (c) Above + error/warning semantic colors | **(b)** as minimum, **(c)** as same-session add-on. `graphic-artist` has delivered (b) and flagged (c) in the scratch output — see summary below. |
| AG-2 | Card hover treatment replacement | (a) No shadow; translateY(-2px) lift only; (b) Hairline border-color darken + translateY; (c) Magenta-accent border on hover (dilutes CTA signal); (d) No hover effect | **(b)** — keeps card-as-object affordance without unwanted shadow and without over-signaling click (magenta is CTA-exclusive). |
| AG-3 | Error / warning palette fate (IG-3) | (a) Retain red/yellow semantic palettes; magenta only on form-input border + error text; (b) Redesign error banner to magenta-muted + charcoal; (c) Drop warning banner entirely | **(a)** — magenta = accent + focus + form-input-error-border; red + yellow = banner-level convention. Overloading magenta dilutes identity signal. |
| AG-4 | Hero composition approval path | (a) `ui-designer` produces 3 static HTML mockups at Arch Review; Rob picks now; picked option propagates to subpages where applicable; (b) Textual descriptions only; (c) Defer to implementation-time | **(a)** — delivered per Spec-Gate A-3 resolution. See ui-designer summary below; three concepts ready for selection. |
| AG-5 | Typography pairing approval path | (a) `graphic-artist` proposes 3 display-serifs at Arch Review; Rob picks now; (b) 2 alternatives + Fraunces default; (c) Lock Fraunces now | **(a)** — delivered. `graphic-artist` recommends Fraunces. See summary below. |
| AG-6 | Agent `.md` cross-consistency enforcement — R6.3 | (a) Manual `diff` review at every agent-file edit (per IG-14); (b) New shared-reference file pattern; (c) Accept drift risk | **(a)** — option (b) introduces a flat-agent-file convention break for one spec. Option (a) is mechanical and cheap. |
| AG-7 | Implementation order reconfirmation | (a) Keep A-10's bottom-up order; derived-shade table is R1 input, not separate phase; (b) Insert explicit derived-shade finalization step; (c) Move agent rewrites before components | **(a)** — derived-shade table accepted at Arch Gate IS the R1 input; no new phase needed. |

### Effort Comparison (Arch Review stage)

| | AI-Assisted | Human Solo |
|---|---|---|
| Arch review (3 agents parallel: architect-reviewer + graphic-artist + ui-designer) | ~18 minutes wall-clock (parallel execution) | 12-20 hours (audit + shade table with contrast verification + font research + 3 hero mockups + IG synthesis, sequential) |
| Assumptions | Full repo access for all three reviewers, SPEC-006 as Arch Review structural template, complete SPEC-008 spec with all 10 Spec-Gate ambiguities resolved, full grep audit of every `--primary-color` / `--secondary-color` / `--accent-color` callsite in `css/style.css`, full `<head>`-block read of all 5 HTML pages, full read of `js/main.js` for visual-dependency check, WCAG contrast formulas applied directly (not approximated), three hero HTML mockups produced as openable browser files. Line numbers on existing code verified at review time. Stack-quirks reviewed end-to-end. No browser runtime — all findings are code-level. |

### Arch Gate Decisions (2026-04-21)

| # | Decision | Status |
|---|----------|--------|
| AG-1 | Derived-shade table coverage → **Option (b)+(c)** — graphic-artist delivered full 9-token derived table + semantic error/warning pair (red/yellow retained). Callsite-to-token migration table complete for all 36 callsites. | Accepted |
| AG-2 | Card hover treatment → **Option (b)** — hairline border-color darken on hover + `translateY(-2px)` lift. No shadow. Magenta reserved for CTA affordance. | Accepted |
| AG-3 | Error / warning palette fate → **Option (a)** — retain red (`#dc2626` family) + yellow (`#fffbeb` family) as banner-level semantic palette outside identity system. Magenta applies to form-input border + error text only per R3.6. | Accepted |
| AG-4 | Hero composition → **Concept A — Two-Column Asymmetric** (58/42 grid split, bottom-aligned, vertical CTA stack with primary magenta button + secondary magenta-underline text-link). Propagates to all 5 pages with page-appropriate content. | Accepted |
| AG-5 | Display serif pick → **Fraunces** (OFL, variable font with opsz + wght axes, ~70-80KB latin subset via google-webfonts-helper). Paired with Inter as body. | Accepted |
| AG-6 | Agent `.md` cross-consistency → **Option (a)** — manual `diff` check at every agent-file edit per IG-14. Added to QA checklist template. | Accepted |
| AG-7 | Implementation order → **Option (a)** — bottom-up: tokens → fonts → components → favicon → agent rewrites → integration. Derived-shade table IS the R1 input, not a separate phase. | Accepted |

**A-7 migration splits (resolved):**
- **Split 1** (`.btn-secondary` text vs border) — text uses `--color-magenta-text`, border uses `--color-magenta`. Mechanical resolution, no Rob decision needed.
- **Split 2** (`.hero-eyebrow` color) — under AG-4 Concept A, hero retains eyebrow label on dark hero surface; maps to `--color-magenta` (5.07:1 AA on charcoal).
- **Split 3** (`.resume-metric-number` vs `.highlight-metric`) — **unify to `--color-magenta`**; old blue-family micro-distinction has no semantic value in new palette.

All 16 IG items (IG-1 through IG-16) accepted as-written.

### Arch Gate Approval

**Decision:** Approved
**Approved by:** Rob Parker
**Date:** 2026-04-21

---

## QA Review (2026-04-22)

Two reviewers ran the QA Gate: `code-reviewer` (quality/security/correctness) and `qa-expert` (acceptance criteria + WCAG + anti-pattern divergence). Initial verdict from both: **REQUEST CHANGES**. After fixes below, the implementation meets acceptance.

### Block findings (resolved)

| # | Finding | File:Line | Resolution |
|---|---------|-----------|------------|
| CR-1 | About-page hero rendered cream-on-cream after `.hero` background switched to cream. `.hero-profile-text h1`, `.hero-positioning`, `.hero-bio p` all used `--text-light` / `--text-on-dark`. `.hero-profile-photo img` had `rgba(255,255,255,0.2)` border + `--shadow-lg` — designed for dark hero. | `css/style.css:1106-1148` | Swapped text tokens to `--color-text-primary` / `--color-text-muted`. Profile photo border → hairline, shadow removed, placeholder tint → `--color-surface-elevated`. |
| CR-2 | `.hero h1` cascade collision: `@media (min-width: 768px) .hero h1 { font-size: var(--font-size-5xl) }` at old line 1648-1650 and `@media (max-width: 480px) .hero h1 { font-size: var(--font-size-3xl) }` at old line 1768-1770 shadowed the intended `clamp(3rem, 5vw, 4.75rem)` on all desktop/mobile renders — H1 rendered at 3rem (48px) instead of scaling to 4.75rem. User-flagged during preview. | `css/style.css:1648-1650, 1768-1770` | Both colliding rules deleted. Cascade is now: base `clamp(3rem, 5vw, 4.75rem)` → `@media (max-width: 1023px) clamp(2.25rem, 4vw, 3.25rem)` → `@media (max-width: 767px) 2.25rem` → `@media (max-width: 480px) 2rem`. Single source of truth for hero H1 scale. |
| QA-B2 | Global `:focus-visible` outline used `var(--primary-color)` legacy alias rather than canonical `--color-magenta`. Focus rings are WCAG-critical; alias redirection risks silent breakage. Same issue on mobile nav active/hover border. | `css/style.css:274, 547` | Both swapped to `var(--color-magenta)`. |

### Block finding re-classified as false-positive

| # | Finding | Resolution |
|---|---------|------------|
| QA-B1 | `qa-expert` flagged `.form-status--error` / `.form-status--warning` as out-of-palette red/yellow and proposed magenta-only. | **False positive.** Arch Gate AG-3 explicitly retained the red + yellow banner palette as a semantic layer outside the SPEC-008 identity system. R3.6 applies only to inline validation (`.form-input[aria-invalid]` border + `.form-error` text) — those ARE magenta. The banner block (`.form-status--error`) was correctly left red. Inline border/text were migrated to `var(--color-magenta)` + `var(--color-magenta-text)` during this pass and a WHY comment now pins AG-3 at the callsite to prevent future drift. |

### Notes resolved in this pass

- **N-2** — `.ai-framework-list li` (about page) migrated to sharp card grammar: `--border-radius-sm`, `--color-surface-elevated` tint, hairline border. `css/style.css:1221-1233`.
- **N-3** — `.alt-channel-item` (contact page) migrated to sharp card grammar: `--border-radius-sm`, `--color-surface-elevated` tint, hairline border, **shadow removed** per AP-4. `css/style.css:2180-2191`.
- **N-5** — `prefers-reduced-motion: reduce` block added at end of stylesheet. Neutralizes `.btn-textlink` arrow transform, `.highlight-card` / `.service-card` `translateY` hover, and global transitions. Addresses SPEC-008 NFR accessibility mandate. `css/style.css:2293-2315`.
- **N-7** — `.success-state` migrated to sharp card grammar: `--border-radius-sm`, canonical `--color-magenta` left accent (was `--primary-color` legacy alias), hairline border. `css/style.css:2121-2131`.

### Follow-up items (deferred)

| # | Finding | Deferred because |
|---|---------|------------------|
| CR-3 | `--color-surface-elevated` and legacy `--surface-color` resolve to identical `#F3F1EB` — card elevation inside `.section-alt` bands is visually flattened (card == band). | Aesthetic refinement, not a correctness issue. Address in a follow-up trivial spec if/when the flattening becomes visually objectionable. |
| N-1 | `.form-status--warning` amber palette off-token. | Arch Gate AG-3 retained the banner-level yellow; identical decision to AG-3 red treatment. Not a migration target. |
| N-6 | Inter woff2 is 48KB vs 40KB target. | Byte-level optimization; Cloudflare delivers pre-compressed woff2 unchanged, so compression won't close the gap. Subset tightening is a dedicated font-pipeline task, not in-scope here. |
| Subpage hero propagation | `about.html`, `resume.html`, `contact.html`, `advisory.html` still use legacy `.hero-content` single-column markup — Concept A was migrated to index.html only per implementation plan. | Documented as the next follow-up spec (SPEC-009 candidate). Subpages still function correctly post CR-1 fix. |
| Remaining `--primary-color` callsites | 4 non-critical legacy alias usages at `css/style.css:433, 855, 1162, 1981`. Functional (alias maps to magenta) but should migrate to canonical token for consistency. | Nitpick-level; A-7 migration table anticipated gradual cleanup. Add to subpage migration spec. |
| `resume.html` three `section-alt` bands | Violates R3.4 "at most one alternating band per page." | Pre-existing structural pattern; falls within the subpage migration scope. |

### Acceptance criteria — final status

| AC | Verdict | Notes |
|----|---------|-------|
| R1 — Token refresh | PASS | Full 9-token derived palette + 5 verified contrast pairs in `:root`. Legacy aliases remapped per A-7 table. |
| R2 — Self-hosted fonts | PASS | Fraunces + Inter woff2 present, `@font-face` declared, Inter preloaded with `crossorigin`. Inter at 48KB vs 40KB target — deferred (N-6). |
| R3.1 — Hero composition (Concept A) | PASS on index.html, deferred on subpages | Per implementation plan. |
| R3.2 — Card treatment | PASS | All primary card types now sharp-corner + hairline + no shadow. |
| R3.3 — Button treatment | PASS | `.btn-primary` / `.btn-secondary` / `.btn-textlink` all conform. Focus ring uses canonical token. |
| R3.4 — Section rhythm | PASS on index.html | Resume multi-band deferred with subpage migration. |
| R3.5 — Nav / footer | PASS | Magenta active underline, charcoal footer, cream text. |
| R3.6 — Form styling | PASS | Inline validation = magenta per spec. Banner-level = red per AG-3 gate decision. |
| R4 — Anti-pattern checklist (AP-1..AP-8) | PASS | Verified via grep for Tailwind-blue hexes and `#ffffff` page backgrounds; none present. Card/button/hero grammar conforms. |
| R5 — Favicon suite | PASS | All 6 assets at root, HTML integration on all 5 pages, webmanifest updated. |
| R6 — Agent rewrites | PASS | `ui-designer.md` and `graphic-artist.md` updated with identical "Project Design Language" and "Anti-Pattern Guardrails" sections (IG-14 lockstep verified). |
| R7 — Site-wide integration (copy, SEO, JS untouched) | PASS | No changes to copy, meta, OG, or `js/main.js`. |

### QA Gate approval

**Decision:** Approved
**Approved by:** Rob Parker
**Reviewers run:** `code-reviewer` (initial: REQUEST CHANGES → all blocks resolved), `qa-expert` (initial: REQUEST CHANGES → 1 block resolved, 1 re-classified as false-positive against AG-3, 4 notes resolved, 5 deferred to follow-up)
**Date:** 2026-04-22
