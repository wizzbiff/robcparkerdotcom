# SPEC-007: Copy Cleanup and Favicon

**Status:** QA Gate approved — ready for Commit/PR (deployment deferred per project policy)
**Tier:** Standard
**Author:** PM-Spec Agent
**Date:** 2026-04-21
**Branch:** `spec/SPEC-007-copy-cleanup-favicon`

---

## Summary

Site-wide copy cleanup pass plus introduction of a favicon suite. Eight discrete changes bundled into a single pre-deploy cleanup spec:

1. **Name normalization** — "Rob C Parker" → "Rob Parker" across all user-facing HTML *and* internal non-spec artifacts (31 occurrences across 12 files).
2. **Home-page metric correction** — "40+ Engineers Led Directly" → "30+ Engineers Led Directly".
3. **Home-page DevEx metric** — append "and maintaining an 80% DevEx score" to the advisory teaser's 150%/90% retention line.
4. **Home-page employer correction** — "Omnicell" → "Athenahealth" in the about-teaser paragraph.
5. **About-page silo verification** — confirm the 150% / 90% retention sentence already reads as intended (no-op).
6. **Email migration** — `rob.c.parker@gmail.com` → `contact@robcparker.com` site-wide (visible copy, obfuscation data attributes, JS error-state fallbacks, and the Formspree dashboard recipient).
7. **Favicon suite** — full modern favicon set, designed by the `graphic-artist` agent with an abstract/metaphorical electric-guitar basis, expandable into a future company logo.
8. **"Fractional engineering leader" harmonization** — single-sentence rewrite on `index.html:140` to align the home-page advisory framing with SPEC-005's positioning (deferred from SPEC-005 and SPEC-006, bundled here).

## Context

Pre-deploy cleanup pass. No deploys have occurred yet per project memory `project_deployment_deferred.md`; SPEC-000 (foundational/meta spec) is still unwritten. Most of these items are copy drift — factual corrections (engineer count, employer name) or inconsistencies that accumulated across six specs — plus a long-deferred brand asset (favicon, flagged as a future spec since SPEC-001).

Name drift is visible on every page: nav-logo and footer say "Rob C Parker" while titles, meta descriptions, OG tags, hero body copy, and LinkedIn aria-labels already say "Rob Parker". This spec resolves that inconsistency in favor of "Rob Parker" throughout (including internal artifacts like CLAUDE.md and agent prompts, which influence how future agents refer to the owner).

Email migration sets up a role-based inbox at the custom domain, separating professional inbound from Rob's personal gmail account. External pre-reqs are confirmed satisfied — `contact@robcparker.com` is live and receives mail.

Favicon has been explicitly anticipated since SPEC-001 (listed in its Out-of-Scope as "Future spec — graphic-artist agent for custom design"). The abstract electric-guitar basis reconciles with SPEC-006's "strictly professional" posture by treating the guitar as a private structural constraint (pick silhouette, stylized headstock, string/fret geometry) rather than a public content signal. A hiring manager should read the mark as "clean geometric monogram," not "Rob plays guitar."

All eight items are pre-launch corrections. No inbound-link or SEO-equity exposure; no user-facing downtime risk.

## Requirements

### R1: Normalize "Rob C Parker" → "Rob Parker" site-wide

**Scope A — user-facing HTML (21 occurrences across 16 lines in 5 files):**

| File | Line(s) | Location | Count |
|------|---------|----------|-------|
| `index.html` | 31 | nav-logo text + `aria-label` | 2 |
| `index.html` | 209 | footer-logo text | 1 |
| `index.html` | 226 | footer copyright | 1 |
| `about.html` | 35 | nav-logo text + `aria-label` | 2 |
| `about.html` | 94 | hero H1 (`#hero-name`) | 1 |
| `about.html` | 269 | footer-logo text | 1 |
| `about.html` | 285 | footer copyright | 1 |
| `resume.html` | 39 | nav-logo text + `aria-label` | 2 |
| `resume.html` | 325 | footer-logo text | 1 |
| `resume.html` | 341 | footer copyright | 1 |
| `contact.html` | 38 | nav-logo text + `aria-label` | 2 |
| `contact.html` | 239 | footer-logo text | 1 |
| `contact.html` | 255 | footer copyright | 1 |
| `advisory.html` | 35 | nav-logo text + `aria-label` | 2 |
| `advisory.html` | 239 | footer-logo text | 1 |
| `advisory.html` | 255 | footer copyright | 1 |

Line numbers are pre-edit snapshots — locate by content (`Rob C Parker`) not by line, since order of edits within a file can shift numbers.

**Scope B — internal non-spec artifacts (10 occurrences across 7 files):**

| File | Line(s) | Count |
|------|---------|-------|
| `CLAUDE.md` | 5, 28, 29, 135 | 4 |
| `README.md` | 1 | 1 |
| `.claude/agents/marketing-copywriter.md` | 12 | 1 |
| `.claude/agents/penetration-tester.md` | 8 | 1 |
| `.claude/agents/ui-designer.md` | 12 | 1 |
| `.claude/agents/graphic-artist.md` | 12 | 1 |
| `.claude/agents/frontend-developer.md` | 12 | 1 |

**Out of scope (preserved as historical artifacts per SPEC-006 R2 precedent):** all files under `specs/**/*.md`, including this spec's own Context section if it ever references "Rob C Parker" as a historical identifier.

### R2: Home-page "40+" → "30+" Engineers Led Directly

- `index.html:103` — metric digits `40+` → `30+`
- `index.html:103` — aria-label `"40 plus engineers"` → `"30 plus engineers"` (must match the visible digits for screen readers)
- No other edits to the `.highlight-card` — heading and description paragraph unchanged

### R3: Home-page advisory teaser — add DevEx metric

`index.html:155` currently reads (inside the `.about-teaser` paragraph in the "How Rob Engages" section):

> …and scaling an engineering org 150% while holding 90% retention.

The user-supplied insert is "and maintaining an 80% DevEx score" (producing "…while holding 90% retention and maintaining an 80% DevEx score."). Per Spec Gate A-8 decision, `marketing-copywriter` is given a **narrow license** to lightly rephrase the insert for tone consistency with the surrounding paragraph — e.g., "and sustaining an 80% developer experience score" — if that reads more naturally with the register of the surrounding prose. The copywriter's scope is limited to this single clause; all other sentences in the paragraph are preserved verbatim.

Single-clause insert before the closing period. Exact final phrasing resolved at implementation-time in the PR.

### R4: Home-page "Omnicell" → "Athenahealth"

`index.html:176` currently reads (inside the About Teaser block):

> …has led teams at companies including SugarCRM and Omnicell, holding…

Change `Omnicell` → `Athenahealth`. `index.html` is the only file containing "Omnicell" (confirmed by grep) — no other pages affected.

### R5: About-page 150% silo — verification only (no-op)

The cleanup list item ("add a note in the silo regarding scaling teams by 150% that I did this while maintaining 90% retention") is **already satisfied**: `about.html:145` currently reads:

> At SugarCRM, I grew the engineering organization by 150% while sustaining 90% retention — a combination that rarely happens without deliberate systems behind it…

No code change required. Implementer verifies the sentence is present and unchanged; if any prior or concurrent edit removed or modified it, the implementer flags immediately at QA Gate. Kept as an explicit requirement (rather than dropped from scope) to preserve the audit trail that this item was considered and resolved.

### R6: Email migration — `rob.c.parker@gmail.com` → `contact@robcparker.com`

**In-repo touchpoints (4 files, 5 edit sites):**

| File | Line(s) | Change |
|------|---------|--------|
| `resume.html` | 83 | `mailto:rob.c.parker@gmail.com` → `mailto:contact@robcparker.com` AND visible link text (same `<a>`) |
| `contact.html` | 222–223 | `data-user="rob.c.parker"` → `data-user="contact"`; `data-domain="gmail.com"` → `data-domain="robcparker.com"` |
| `js/main.js` | 308–309 | `emailLink.href = 'mailto:contact@robcparker.com'`; `emailLink.textContent = 'contact@robcparker.com'` (inside `renderGenericError`) |
| `js/main.js` | 491–492 | Same pair inside the Turnstile failure fallback block |

**Out-of-repo touchpoint (manual, mandatory):** In the Formspree dashboard, update form `mvzdrbnk` recipient email from `rob.c.parker@gmail.com` to `contact@robcparker.com`. This is not a code change but is a hard dependency for form submissions to arrive at the new address after deploy. Tracked on the QA checklist for SPEC-007.

Visible email text (copy-paste + screen-reader announcement) must be identical to the `mailto:` target: `contact@robcparker.com`.

### R7: Favicon — full modern suite

Introduce a favicon asset set covering current browser and OS expectations. Design by `graphic-artist` agent; approved by Rob at Spec Gate (see A-4).

**Design brief to `graphic-artist`:**

- **Function:** Simple, memorable, legible at 16×16 and 180×180
- **Strategic role:** Expandable into a future company wordmark/logo; this is the primary brand mark, not a throwaway favicon
- **Basis:** Abstract or metaphorical electric-guitar reference — **not literal**. Examples of acceptable abstraction: pick silhouette, stylized headstock line, string/fret geometric pattern, pickup-coil motif, single-note-on-staff glyph
- **Tone constraint:** Professional, executive-facing. Must NOT read as "Rob plays guitar" to a hiring manager. The guitar basis is a private structural reference the owner knows about; the audience perceives "confident geometric mark"
- **Color:** Align with existing site palette — `--primary-color: #2563eb`, `--secondary-color: #1e40af`, `--accent-color: #3b82f6` (from `css/style.css` `:root`). No new color introduced
- **Rendering:** Must hold legibility in both light and dark UI contexts (browser tab strips in dark mode)

**Deliverable set (all committed):**

| Path | Format | Purpose |
|------|--------|---------|
| `/favicon.ico` | ICO (multi-res: 16/32/48) | Legacy browser support + default fetch path |
| `/images/favicon/favicon.svg` | SVG | Vector, modern browsers — also serves as the design master (see A-9) |
| `/images/favicon/favicon-16.png` | PNG | Raster fallback |
| `/images/favicon/favicon-32.png` | PNG | Raster fallback |
| `/images/favicon/favicon-48.png` | PNG | Raster fallback |
| `/images/favicon/apple-touch-icon.png` | PNG, 180×180 | iOS home-screen bookmark icon |
| `/images/favicon/android-chrome-192.png` | PNG, 192×192 | Android home-screen shortcut |
| `/images/favicon/android-chrome-512.png` | PNG, 512×512 | Android splash / PWA candidate size |
| `/site.webmanifest` | JSON | Minimal web manifest — name, short_name, icons, theme_color, display |

**`site.webmanifest` content** (includes `start_url` and `scope` per Arch Gate AG-2):

```json
{
  "name": "Rob Parker",
  "short_name": "Rob Parker",
  "start_url": "/",
  "scope": "/",
  "icons": [
    { "src": "/images/favicon/android-chrome-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/images/favicon/android-chrome-512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#2563eb",
  "background_color": "#ffffff",
  "display": "browser"
}
```

`display: browser` signals "this is a website you bookmarked," not "this is an installed app" — correct because the site has no service worker and no offline support (see A-6). `start_url: "/"` directs the home-screen icon to the site root across Android/Chrome versions; `scope: "/"` covers the entire site (Arch Gate AG-2).

**HTML `<head>` additions (every page — 5 files):**

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/svg+xml" href="/images/favicon/favicon.svg">
<link rel="apple-touch-icon" href="/images/favicon/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#2563eb">
```

Inserted into `<head>` after the existing `<link rel="canonical">` (or in the equivalent SEO/asset block on each page). All five pages: `index.html`, `about.html`, `resume.html`, `contact.html`, `advisory.html`.

**QA checklist item already exists** at `.claude/qa-checklist.md:32` ("Favicon displays") — no edit to the checklist text required; this spec makes that item live.

### R8: "Fractional engineering leader" harmonization

`index.html:140–141` currently reads:

> Whether you're looking for a fractional engineering leader or a technical thought partner, Rob brings executive-level judgment to the table.

"Fractional" is inconsistent with SPEC-005's advisory framing (which positions advisory as senior sounding-board and focused engagements, never "fractional"). Rob does not identify as a fractional engineering leader. `marketing-copywriter` rewrites this single sentence to align with the advisory-page framing without introducing the word "fractional."

**Scope of rewrite:**
- Only the single sentence at `index.html:140–141`
- Preserve the section heading ("How Rob Engages") and the full unchanged `.about-teaser` paragraph below
- Output must flow naturally into the "Rob works with growth-stage SaaS companies…" paragraph

See Content Requirements for the copywriter brief.

## Content Requirements

`marketing-copywriter` invoked for **two** copy tasks during implementation:

**R3 — DevEx metric tone polish.** Copywriter has narrow license to rephrase the user-supplied clause "and maintaining an 80% DevEx score" if needed for register consistency with the surrounding `.about-teaser` paragraph. Acceptable outcomes:
- Ship the user's exact wording if it reads naturally
- Light rephrase (e.g., "sustaining an 80% developer experience score") to match the paragraph's register
- No other edits to the paragraph

The copywriter does NOT have license to change the metric itself (80%, DevEx) or to relocate the clause.

**R8 — "How Rob Engages" intro sentence rewrite.** Copywriter produces a single-sentence replacement for `index.html:140–141`. Brief:

- Mirrors SPEC-005's advisory framing: senior sounding-board, focused engagements, executive-level judgment — **not "fractional"**
- Keeps the section's function: surface advisory as the primary engagement model on the home page
- Reads naturally above the unchanged `.about-teaser` paragraph
- Single sentence, ~20–30 words, matching the register of surrounding home-page copy

R1, R2, R4, R5, R6, R7 are factual edits, mechanical string replacements, asset creation, or no-ops — no copy judgment involved.

## Out of Scope

- **Spec files (`specs/**/*.md`)** — all prior specs reference "Rob C Parker" in various places. Not rewritten, per SPEC-006 precedent. Historical artifacts preserved.
- **Formspree form rename or form-ID change** — form ID `mvzdrbnk` stays. Only the recipient email changes.
- **Cloudflare Pages project name, domain registrar display name, LinkedIn profile title, or any external-service display names** — may feel inconsistent post-R1 but are outside this spec. Future trivial pass if they become visible.
- **Additional metric or copy changes beyond R2/R3/R4** — cleanup list is authoritative; no scope creep.
- **Full logo / brand refresh alongside the favicon** — the favicon is designed to BE expandable into a logo later. Not shipping a wordmark, business-card set, or marketing logo in SPEC-007. A future brand spec takes the favicon mark and elaborates it.
- **OG images (`og:image`)** — existing headshot reuse unchanged. No new social-card artwork.
- **Site-wide color palette changes** — favicon must use the existing palette; no new colors.
- **Service worker / full PWA treatment** — `site.webmanifest` is minimal (icons + theme, `display: browser`). No SW, no offline, no install prompt.
- **Safari `mask-icon` SVG** — skipped. Safari's pinned-tab affordance is a minority surface and the generic `favicon.svg` renders correctly in its tab strip (see A-5).
- **SPEC-000 (foundational/meta spec)** — still deferred per project memory. SPEC-007 does not write it.
- **Deployment** — still deferred project-wide per `project_deployment_deferred.md`. SPEC-007 ships to branch, opens a PR, merges to main; does not trigger a Cloudflare Pages production promotion.

## Decision Rationale

- **Name normalization scoped to both user-facing and internal artifacts.** HTML-only scope (21 occurrences) would satisfy the user-visible goal, but leaving "Rob C Parker" in CLAUDE.md and agent prompts creates a persistent mismatch between how the project docs refer to the owner and how the site refers to him. Internal artifacts are cheap to update in the same pass. Risk is effectively zero: none of these strings drive logic, git identity already uses "Rob Parker", spec files are excluded. Scope expands by 10 occurrences across 7 files for a consistency win that persists into every future Claude session (since CLAUDE.md is loaded at the start of every session).
- **Spec files excluded from rename.** SPEC-006 established the precedent that historical spec artifacts are not rewritten after the fact; that principle holds here. Spec files are an auditable record of what was decided and when — editing them to normalize a name would create a false history. The inconsistency is audit-visible only, not user-visible.
- **R5 kept as an explicit no-op.** The cleanup list says to add the 90% retention note; the About silo already reads exactly that. Dropping the requirement would hide that it was considered. Keeping it as a verification-only requirement makes the audit trail honest: "considered, confirmed already satisfied, no action." This pattern is reusable for future cleanup specs.
- **Email migration atomic.** In-repo change + Formspree dashboard change must both happen for the migration to work end-to-end. Bundling them into one spec keeps the change atomic from the user's perspective. The Formspree dashboard step is called out as a manual, non-code task so it can't be forgotten during implementation.
- **Favicon: full modern suite, not minimal.** A minimal `favicon.ico` alone satisfies Chrome desktop but leaves iOS home-screen, Android home-screen, and dark-mode SVG rendering to generic browser defaults. At a senior-executive positioning, the site's polish ceiling is visible: an iOS user adding to home screen will see the `apple-touch-icon`, and that mattering is worth ~4 additional PNGs. The full suite also front-loads the brand-asset work so a future logo/wordmark spec composes on top of a known mark rather than starting over.
- **Abstract electric-guitar basis reconciles with SPEC-006's "strictly professional" posture.** The constraint is that the favicon must NOT read as "Rob plays guitar" to a hiring manager. Abstract or metaphorical framing (pick silhouette, headstock geometry, string/fret pattern) lets the guitar reference sit as a private structural constraint the owner knows about while the audience perceives only a "clean geometric mark." The design brief explicitly calls this out so `graphic-artist` holds the line.
- **"Fractional" cleanup bundled now.** Memory flagged this for a future trivial spec. This IS a cleanup spec. The edit is a single-sentence rewrite by a copywriter who is already going to be invoked. Keeping it as a separate spec would add a spec-level artifact for a 15-minute edit. Bundling is cheaper and resolves the drift before SPEC-000 / initial deploy.
- **Standard tier, not Trivial.** Each item individually is Trivial (copy/content update), but composition pushes to Standard: cross-file changes (R1, R6), external-service config (R6 Formspree dashboard), a new asset class + `graphic-artist` invocation (R7), and one copy-judgment item (R8). Standard is the right envelope to force Arch Review to check the favicon asset plumbing (link-tag ordering, manifest semantics, Cloudflare Pages root-path resolution for `/favicon.ico` and `/site.webmanifest`) before implementation. Matches SPEC-006's Standard-tier justification: a bundle of Trivial items plus one design-driven deliverable with an agent invocation.
- **Favicon approved at Spec Gate, not implementation-time.** Per user directive. Brand assets have long half-life — shipping the wrong mark means either re-doing it later or living with it. `graphic-artist` runs during Spec Gate, Rob picks, the chosen mark freezes into the spec so Arch and QA review against a known deliverable. This differs from SPEC-006's copywriter pattern (resolved at implementation-time) because copy is ephemeral/editable and brand marks are cumulative.

## Dependencies

- **SPEC-001 (complete):** Original page scaffold + shared nav/footer pattern edited by R1. Flagged the favicon explicitly as a future spec (SPEC-001 C-2).
- **SPEC-002 (complete):** About page hero H1 edited by R1; silo copy verified by R5.
- **SPEC-003 (complete):** Resume page — email display edited by R6.
- **SPEC-004 (complete):** Contact page — obfuscated email data attributes edited by R6; Formspree dashboard recipient updated out-of-repo. SPEC-004 explicitly flagged this as an "Email alias migration — future trivial-tier spec."
- **SPEC-005 (complete):** Advisory page — nav/footer edited by R1. Advisory framing informs R8's copywriter rewrite.
- **SPEC-006 (complete):** Site structure post-advisory-move and post-guitar-removal. R1 edits the footer/copyright on all 5 post-SPEC-006 pages. R8 closes the "fractional" deferral noted in SPEC-006 Out of Scope.
- **External pre-req (confirmed satisfied by owner):** `contact@robcparker.com` inbox live and routing mail (Cloudflare Email Routing or equivalent).
- **External pre-req (confirmed satisfied by owner):** Formspree dashboard access for form `mvzdrbnk`.

## Non-Functional Requirements

### Performance
- Favicon: adds ~7–10 small files (<20KB combined). Fetched by browser on page load; no runtime JS involvement.
- Text-only edits (R1–R6, R8): net-neutral on payload.
- No new JS, no new CSS.

### Accessibility
- R1: nav-logo `aria-label="Rob Parker — home"` remains a meaningful name for screen readers.
- R2: aria-label for the `30+` metric must match the visible digits (`"30 plus engineers"`). Mismatch is an a11y bug.
- R6: visible email, `mailto:` href, and screen-reader announcement all identical — `contact@robcparker.com`.
- R7: `<link rel="icon">` elements have no direct a11y surface (ignored by screen readers). `apple-touch-icon` and PWA icons inherit naming from `site.webmanifest` — `name` and `short_name` both set to "Rob Parker" so home-screen shortcuts announce correctly.
- R8: copywriter output preserves single-sentence structure above the existing `.about-teaser` paragraph; no heading or list changes.

### SEO
- R1: page titles, meta descriptions, OG titles/descriptions already use "Rob Parker" (verified). R1 touches body copy, nav chrome, and footer — no SEO meta tags changed.
- R2/R3/R4/R8: body copy edits on `index.html` only. No title/description/canonical changes.
- R6: email is not an SEO surface. Formspree recipient change is dashboard-only.
- R7: favicon does not affect search ranking but is visible in tab strips, bookmarks, and OG-card previews in some renderers. `site.webmanifest` name/short_name is visible when the site is added to home screen on Android.

### Responsive
- R7 favicon assets render at native sizes — no responsive CSS required.
- No layout changes anywhere; all existing responsive behavior preserved.

### Security
- R6: Formspree recipient change is dashboard config only — no new script, endpoint, CSP entry, or data surface. Obfuscated-email pattern (split `data-user` / `data-domain`) preserved; same harvester-mitigation approach, new address.
- R7: favicon assets are static files served same-origin. No CSP impact (`img-src` already covers same-origin via `'self'` or default-src). `site.webmanifest` is served with `Content-Type: application/manifest+json` by Cloudflare Pages; no script execution surface. `manifest-src 'self'` is implicitly covered by default-src if a CSP is added later — noted for SPEC-000's CSP work.
- No new third-party integrations, no new PII, no new auth surface.

## Acceptance Criteria

### R1 — Name normalization
- **Given** a grep of all `.html` files for `Rob C Parker`, **When** run, **Then** zero matches
- **Given** a grep of `CLAUDE.md`, `README.md`, and `.claude/agents/*.md` for `Rob C Parker`, **When** run, **Then** zero matches
- **Given** a grep of `specs/**/*.md` for `Rob C Parker`, **When** run, **Then** matches remain (historical artifacts preserved)
- **Given** any page's nav-logo element, **When** inspected, **Then** text reads "Rob Parker" and aria-label reads `"Rob Parker — home"`
- **Given** any page's footer, **When** inspected, **Then** `.footer-logo` and `.footer-copyright` both read "Rob Parker"
- **Given** `about.html`, **When** inspected, **Then** `<h1 id="hero-name">` reads "Rob Parker"

### R2 — 40+ → 30+
- **Given** `index.html:103` after edit, **When** rendered, **Then** metric reads `30+` and `aria-label="30 plus engineers"`
- **Given** the rest of the `.highlight-card`, **When** inspected, **Then** `<h3>` and `<p>` are unchanged

### R3 — DevEx metric appended
- **Given** `index.html:155` after edit, **When** read as prose, **Then** the sentence ends "…scaling an engineering org 150% while holding 90% retention and maintaining an 80% DevEx score."
- **Given** the rest of the `.about-teaser` paragraph, **When** inspected, **Then** all other sentences unchanged

### R4 — Omnicell → Athenahealth
- **Given** `index.html:176` after edit, **When** inspected, **Then** the sentence reads "…has led teams at companies including SugarCRM and Athenahealth…"
- **Given** a grep of all `.html`/`.css`/`.js` files for `Omnicell` (case-insensitive), **When** run, **Then** zero matches

### R5 — About silo verification (no-op)
- **Given** `about.html:145`, **When** read as prose, **Then** the sentence "I grew the engineering organization by 150% while sustaining 90% retention…" is present and unchanged from pre-spec state
- **Given** the post-spec diff on `about.html`, **When** inspected, **Then** line 145 shows no change except any incidental R1 edit within the same file

### R6 — Email migration
- **Given** a grep of all `.html` and `.js` files for `rob.c.parker@gmail.com`, **When** run, **Then** zero matches
- **Given** a grep of all `.html` and `.js` files for `rob.c.parker` (case-insensitive), **When** run, **Then** zero matches
- **Given** a grep of all `.html` and `.js` files for `contact@robcparker.com`, **When** run, **Then** at least 4 matches (`resume.html` mailto + visible text, `js/main.js` two fallbacks)
- **Given** `contact.html` obfuscation container, **When** inspected, **Then** `data-user="contact"` and `data-domain="robcparker.com"`
- **Given** `resume.html:83`, **When** inspected, **Then** `mailto:` href and visible text both read `contact@robcparker.com`
- **Given** `js/main.js` at both error-fallback sites, **When** inspected, **Then** `emailLink.href` and `emailLink.textContent` both reference `contact@robcparker.com`
- **Given** the Formspree dashboard (manual verification), **When** form `mvzdrbnk` is inspected, **Then** the recipient is `contact@robcparker.com`; a test submission routed through the form arrives at that inbox

### R7 — Favicon suite
- **Given** site root, **When** listed, **Then** `favicon.ico` and `site.webmanifest` exist
- **Given** `images/favicon/`, **When** listed, **Then** `favicon.svg`, `favicon-16.png`, `favicon-32.png`, `favicon-48.png`, `apple-touch-icon.png`, `android-chrome-192.png`, `android-chrome-512.png` all exist
- **Given** each of the 5 HTML pages' `<head>`, **When** inspected, **Then** 4 `<link>` tags (icon, icon+SVG, apple-touch-icon, manifest) and 1 `theme-color` `<meta>` are present
- **Given** `site.webmanifest`, **When** parsed, **Then** `name` and `short_name` are `"Rob Parker"`, `theme_color` is `"#2563eb"`, `background_color` is `"#ffffff"`, `display` is `"browser"`, and `icons` references the two android-chrome PNGs with correct `sizes` and `type`
- **Given** the chosen favicon mark, **When** reviewed against the brief, **Then** the mark is abstract/metaphorical (not a literal guitar silhouette), legible at 16×16, and uses only the existing palette colors (no new color introduced)
- **Given** the browser loads any page, **When** the tab strip is inspected, **Then** the favicon renders

### R8 — "Fractional" harmonization
- **Given** `index.html` after edit, **When** the "How Rob Engages" intro sentence is read, **Then** the word "fractional" does not appear
- **Given** a grep of all `.html`/`.css`/`.js` files for `fractional` (case-insensitive), **When** run, **Then** zero matches
- **Given** the rewritten sentence, **When** read, **Then** it flows naturally into the unchanged "Rob works with growth-stage SaaS companies…" paragraph below, preserving the section's function of surfacing advisory as the primary engagement model

### Site integrity
- **Given** a link checker walks the site from `index.html`, **When** run, **Then** zero broken internal links (favicon, manifest, icon paths all resolve)
- **Given** all pages, **When** rendered in a browser, **Then** the favicon appears in the tab strip
- **Given** iOS add-to-home-screen (manual verification at deploy-time), **When** performed, **Then** the apple-touch-icon displays with the correct mark
- **Given** `git diff` for the spec's branch, **When** reviewed, **Then** no changes appear in `specs/SPEC-001` through `specs/SPEC-006` (historical artifacts preserved)

## Effort Comparison

| | AI-Assisted | Human Solo |
|---|---|---|
| Spec creation | ~30 minutes | 3–4 hours |
| Assumptions | PM agent had full repo access; pre-scanned inventories of "Rob C Parker", email, "fractional", "Omnicell", "40+", "150%", and favicon strings; SPEC-006's structure as a reference template; auto-memory confirming pre-deploy state (no redirect/SEO concerns); governance/ confirmed clean of any owner-name occurrences. Tier derived from composing "Copy/content updates" (Trivial) with cross-file changes + new brand-asset class + `graphic-artist` invocation + external-service config → Standard envelope matching SPEC-006's analog composition. |

---

## Approval

**Tier:** Standard
**Gate owner:** Rob Parker
**Requires:** Documented approval with responses to agent-raised ambiguities. Standard tier downstream: ARCH-SPEC-007 + QA-SPEC-007. No DEPLOY gate since deployment is deferred project-wide.

### Structured Review Checklist

- [x] Business intent confirmed (pre-deploy cleanup + favicon introduction)
- [x] Scope boundaries clear (8 requirements, explicit out-of-scope list, spec files explicitly excluded from R1)
- [x] Acceptance criteria testable (Given/When/Then throughout, including grep-verifiable deletions and pre-deploy-only manual steps)
- [x] Dependencies identified (SPEC-001 through SPEC-006; Formspree dashboard access confirmed; `contact@robcparker.com` inbox confirmed live)
- [x] Tier appropriate (Standard — cross-file content edits + new asset class + agent invocation + external-service config)
- [x] No mandatory escalation triggers (no auth, no payments, no new PII surface, no DB, no core-domain-model changes)
- [x] Third-party features verified (Formspree recipient change is documented vendor capability; no new integrations)
- [x] Decision Rationale section included

### Ambiguities Flagged for Spec Gate

| # | Concern | Options | Recommendation |
|---|---------|---------|----------------|
| A-1 | R1 internal-scope boundary — do we edit `.claude/agents/*.md` (which influence how agents refer to the owner)? | (a) HTML only (21 occurrences; zero risk; internal inconsistency persists); (b) HTML + CLAUDE.md + README.md + 5 agent prompts (31 occurrences; near-zero risk; full consistency); (c) Also include `governance/` and `.claude/development-workflow.md` if they contain any "Rob C Parker" matches | **(b)** — `governance/` has zero matches (verified); `.claude/development-workflow.md` not checked in detail but included implicitly in option (b) if any match is found during implementation. No agent has name-based logic; no tests exist; git already uses "Rob Parker". Specs explicitly excluded per SPEC-006 precedent. Low-risk, high-consistency. |
| A-2 | R5 — the copy is already present. Should this requirement exist at all? | (a) Keep as verification-only/no-op (documented intent); (b) Drop from the spec entirely (redundant); (c) Reinterpret as "make the 90% more prominent" (e.g., add to `highlight-label` or a second sentence) | **(a)** — keeps the audit trail honest. Dropping it hides that it was considered. Reinterpreting (c) invents scope the user didn't ask for. |
| A-3 | Email migration ordering — in-repo change and Formspree dashboard change must both happen for end-to-end correctness. Order? | (a) Dashboard first, then repo; (b) Repo first, then dashboard; (c) Simultaneous within the same PR window, both called out on the QA checklist | **(c)** — change is pre-deploy; order within the branch doesn't affect real users. Dashboard step becomes a required QA-checklist item on this spec. |
| A-4 | Favicon approval point | (a) Spec Gate — `graphic-artist` runs pre-Architect-Review, Rob picks at Spec Gate, chosen mark freezes into the spec; (b) Arch Gate — graphic-artist runs post-Spec, Rob picks at Arch Gate once structural plumbing is validated; (c) Implementation-time — copywriter pattern from SPEC-006, mark appears in PR for final review | **(a)** — per user directive. Brand asset has long half-life; lock design before Arch/implementation so downstream gates validate against a known mark rather than a late-arriving one. |
| A-5 | Favicon suite completeness — include a Safari pinned-tab SVG (`mask-icon`)? | (a) Include `mask-icon` + `<link rel="mask-icon" color="...">`; (b) Skip — Safari's pinned-tab affordance has diminished and the generic `favicon.svg` renders in Safari's tab strip; (c) Add only if `graphic-artist`'s SVG master trivially produces a monochrome variant | **(b)** — `mask-icon` is 2016-era spec-chasing; the modern `favicon.svg` is sufficient for Safari. Keeps the suite modern without over-indexing on legacy. |
| A-6 | `site.webmanifest` `display` property | (a) `"browser"` — opens in regular browser (website, not app); (b) `"minimal-ui"` — minimal browser chrome; (c) `"standalone"` — fullscreen app-like shell | **(a)** — site is not a PWA; no service worker, no offline. `standalone` would be misleading. `browser` correctly signals "bookmarked website." |
| A-7 | R8 — how far does the copywriter rewrite extend? | (a) Single sentence only (`line 140–141`) — minimum to remove "fractional"; (b) Whole intro paragraph — copywriter may restructure heading + supporting paragraph together; (c) Whole "How Rob Engages" section | **(a)** — scope is the deferred "fractional" cleanup, not an advisory-surface redesign. SPEC-006 just restructured this section; re-opening it would re-litigate closed decisions. Single-sentence rewrite is MVP. |
| A-8 | Copy-quality check on R3's "80% DevEx score" insert — real metric or marketing phrase? | (a) Ship as-written — user supplied exact phrasing; (b) Copywriter lightly rephrases for tone ("sustaining an 80% developer experience score"); (c) Expand to a clarifying phrase ("80% DevEx score, as measured by…") | **(a)** — user supplied exact phrasing; no copywriter invocation for R3. If the register feels off at Spec Gate, reopen — but the default is to respect the user's wording. |
| A-9 | Favicon SVG source — committed as both deliverable AND design master, or split? | (a) Master in `images/source/` (gitignored, matches repo convention), optimized copy at `images/favicon/favicon.svg` (committed); (b) Single SVG at `images/favicon/favicon.svg` serves both as browser-served favicon AND design master (one file); (c) Commit both — source with artboards in `images/source/`, optimized output in `images/favicon/` | **(b)** — repo convention applies to raster originals (PNG/HEIC/RAW) compressed into multiple JPEGs. A single SVG that IS its own master is a cleaner case — no duplication. |
| A-10 | PR / branch naming | (a) `spec/SPEC-007-copy-cleanup-favicon`; (b) `spec/SPEC-007-cleanup`; (c) `spec/SPEC-007-pre-deploy-cleanup` | **(a)** — describes both halves; grep-friendly; matches SPEC-006's compound-name pattern. |

### Standard-Tier Escalation Check

| Trigger | Applies? | Notes |
|---------|----------|-------|
| Authentication / authorization | No | |
| Payments / financial data | No | |
| PII / PHI handling | No | Email change is a routing swap on the same data surface |
| New external API integration | No | Formspree already integrated; only recipient config changes |
| Database schema change | No | |
| Core domain model modification | No | |
| Framework or platform migration | No | |
| First implementation of new architectural pattern | Partial | Favicon suite + `site.webmanifest` is new to the site. Minimal web manifest (`display: browser`, no SW) is a mild new pattern; Arch Review validates but it does NOT escalate tier. |

**No trigger escalates above Standard.**

### Gate Responses

| Concern | Response |
|---------|----------|
| A-1 | **Option (b) — HTML + internal non-spec artifacts.** Name normalization covers user-facing HTML (21 occurrences) plus `CLAUDE.md`, `README.md`, and the 5 `.claude/agents/*.md` prompt files (10 occurrences). `governance/` confirmed clean. `specs/**/*.md` explicitly excluded as historical artifacts per SPEC-006 R2 precedent. If any additional "Rob C Parker" match surfaces in `.claude/development-workflow.md` or other internal docs during implementation, bundle it under R1 Scope B; do not touch spec files. |
| A-2 | **Option (a) — keep R5 as verification-only/no-op.** The 90% retention note on `about.html:145` is already present. Retaining R5 as an explicit requirement preserves the audit trail ("considered, confirmed already satisfied, no action"). Implementer flags at QA Gate if any prior or concurrent edit removed or altered the sentence. |
| A-3 | **Option (c) — simultaneous within the PR window; both steps on the QA checklist.** In-repo email changes and Formspree dashboard recipient update both happen within the SPEC-007 branch window. Order within the branch is implementer's discretion since nothing is deployed during the edit. Formspree dashboard update is a mandatory QA-checklist item; QA Gate does not close until a test submission arrives at `contact@robcparker.com`. |
| A-4 | **Option (a) — favicon approval at Spec Gate.** `graphic-artist` runs now, before Architecture Review. Rob picks at Spec Gate; the chosen mark freezes into the spec so downstream gates validate against a known deliverable. *Implementation note: since Spec Gate is closing on SPEC-007 now, the graphic-artist invocation runs immediately after this approval; the chosen mark will be appended to this spec as an addendum (or referenced by path) before Architecture Review begins.* |
| A-5 | **Option (b) — skip Safari `mask-icon`.** Modern `favicon.svg` renders correctly in Safari's tab strip; `mask-icon` is 2016-era legacy chasing. Keeps the suite modern without over-indexing on deprecated surfaces. |
| A-6 | **Option (a) — `display: "browser"`.** The site is not a PWA (no service worker, no offline support). `"browser"` correctly signals "bookmarked website, not installed app." `"standalone"` would be misleading. |
| A-7 | **Option (a) — single-sentence rewrite.** R8's copywriter scope is strictly `index.html:140–141`. The section heading ("How Rob Engages"), the unchanged `.about-teaser` paragraph, and the CTA all remain as they are post-SPEC-006. No re-opening of SPEC-006's recent restructure. |
| A-8 | **Option (b) — copywriter lightly rephrases R3's clause for tone.** `marketing-copywriter` gets narrow license to rephrase the "80% DevEx score" insert for register consistency with the surrounding `.about-teaser` paragraph. May ship user's exact wording if it reads naturally; may also produce variants like "sustaining an 80% developer experience score." Copywriter may NOT change the metric, the percentage, or relocate the clause. Content Requirements updated to reflect this as a second copywriter task alongside R8. |
| A-9 | **Option (b) — single SVG serves both deliverable and design master.** `images/favicon/favicon.svg` is committed as the browser-served favicon AND the design master. Repo's `images/source/` gitignore convention applies to raster originals compressed into multiple JPEGs; a single self-mastering SVG is a cleaner case and avoids duplication. |
| A-10 | **Option (a) — branch `spec/SPEC-007-copy-cleanup-favicon`.** Matches SPEC-006's compound-name pattern; describes both halves of the spec; grep-friendly. |

**Decision:** Approved
**Approved by:** Rob Parker
**Date:** 2026-04-21

### Spec Gate Addendum — Favicon Design Lock (2026-04-21)

Per A-4, `graphic-artist` produced four concept variants and Rob selected **Concept 2 — Pick Shield**.

**Chosen mark:** Pick Shield
**Concept basis:** Guitar pick's rounded-triangle silhouette reinterpreted as a heraldic shield / authority badge. Interior horizontal accent bar evokes a string or fret crossing the body; small note-head above the bar provides a secondary focal point and a legibility anchor at 16×16.
**Why chosen:** Strongest small-size silhouette of the four options — the shield shape is what survives at 16px, and the horizontal bar + dot fuse into a recognizable composition. Shield reading carries executive-confidence signal; guitar reading is available only to viewers who already know. Expansion path to a wordmark is clean (shield becomes a lockup mark flanking or preceding "Rob Parker" type).
**Colors used:** `#1e40af` (outer shield), `#2563eb` (inner shield), `#ffffff` at 0.92 / 0.88 opacity (accent bar and note-head). No new palette introduced.
**Concept source (gitignored working file):** `images/source/favicon-concepts/concept-2-pick-shield.svg`
**Committed master (per A-9):** `images/favicon/favicon.svg`
**Full design rationale and risk notes for all four variants:** `images/source/favicon-concepts/CONCEPTS.md`

The remaining three unselected concepts (`concept-1-monogram-string.svg`, `concept-3-fret-grid.svg`, `concept-4-headstock-arc.svg`) remain in `images/source/favicon-concepts/` as design-archive artifacts (gitignored by repo convention). Not intended for future reuse without a new design pass.

**What this locks for Architecture Review:** R7's deliverable set now has a concrete master SVG. Architecture Review validates the asset plumbing (`<link>` tag ordering, `site.webmanifest` semantics, Cloudflare Pages root-path resolution for `/favicon.ico` and `/site.webmanifest`) against this known mark. Raster exports (`.ico`, 16/32/48 PNGs, apple-touch-icon 180×180, android-chrome 192/512) are implementation-time work generated from this committed master.

---

## Architecture Review

**Reviewer:** architect-reviewer agent
**Date:** 2026-04-21
**Recommendation:** Approve with conditions (11 IG items + 7 Arch Gate decisions below)

### Design Findings

| Area | Finding |
|------|---------|
| Pattern fit | Strong. Every requirement in SPEC-007 is either a string edit (R1, R2, R3, R4, R6, R8), a no-op verification (R5), or an asset addition with standard `<link>` / `<meta>` plumbing (R7). No new CSS primitives, no new JS functions, no new build step, no framework introduction. R7's favicon suite uses the same same-origin static-asset pattern already proven for `files/rob-parker-resume.pdf` (PDF delivery via Cloudflare Pages, no `_headers` file required — see stack-quirks "Static Assets" entry). The `site.webmanifest` is a minimal non-PWA manifest (`display: browser`, no service worker) — it is the smallest possible expansion of the site's capability surface consistent with shipping modern favicon assets. No pattern deviation. |
| Line-number verification — R1 Scope A (HTML) | **All 16 line citations verified accurate.** Per-file spot-checks against the current repo: `index.html` L31 (nav-logo text + aria-label — both "Rob C Parker"), L209 (footer-logo), L226 (footer copyright) ✓; `about.html` L35 (nav-logo pair), L94 (`<h1 id="hero-name">Rob C Parker`), L269 (footer-logo), L285 (footer copyright) ✓; `resume.html` L39 (nav-logo pair), L325 (footer-logo), L341 (footer copyright) ✓; `contact.html` L38 (nav-logo pair), L239 (footer-logo), L255 (footer copyright) ✓; `advisory.html` L35 (nav-logo pair), L239 (footer-logo), L255 (footer copyright) ✓. Total occurrences counted by grep: 21 matches across the 5 files, matches the spec's "21 occurrences across 16 lines" claim exactly. No stale line numbers detected in Scope A (unlike SPEC-006's review, which caught stale cites on the WHY comments at `services/tech-advisory.html`). |
| Line-number verification — R1 Scope B (internal artifacts) | **All 10 line citations verified accurate.** `CLAUDE.md` L5 ("Personal website for Rob C Parker"), L28 ("about.html … Page about Rob C Parker"), L29 ("resume.html … Rob C Parker resume"), L135 ("All gates owned by Rob C Parker") — 4 matches, spec claims 4 ✓. `README.md` L1 ("# Professional website for Rob C Parker…") — 1 match ✓. `.claude/agents/marketing-copywriter.md` L12, `graphic-artist.md` L12, `ui-designer.md` L12, `frontend-developer.md` L12 — all on the "Site: Personal website for Rob C Parker" bullet ✓. `.claude/agents/penetration-tester.md` — spec cites L8, which matches the actual `(Rob C Parker)` parenthetical in the agent's opening paragraph ✓. Total 10 matches across 7 files, matches spec exactly. |
| Line-number verification — R2/R3/R4/R5/R6/R8 | **All spot-check cites verified accurate.** `index.html:103` = `aria-label="40 plus engineers">40+</div>` ✓ (R2). `index.html:155` = `"…scaling an engineering org 150% while holding 90% retention."` ✓ (R3 — the retention clause closes the sentence exactly as the spec quotes). `index.html:176` = `"…has led teams at companies including SugarCRM and Omnicell, holding"` ✓ (R4). `about.html:145` = the 150%/90% retention sentence inside the `.highlight-desc` ✓ (R5 — note: the sentence is inside a `.highlight-card`, not a separate paragraph; the spec's "silo" language is accurate — this is the "Scaling Engineering Organizations" highlight card). `resume.html:83` = `<a href="mailto:rob.c.parker@gmail.com" class="resume-contact-item body-link">rob.c.parker@gmail.com</a>` — R6's "mailto + visible text on same `<a>`" description is exact ✓. `contact.html:222–223` = `data-user="rob.c.parker"` and `data-domain="gmail.com"` ✓. `js/main.js:308–309` = `emailLink.href = 'mailto:rob.c.parker@gmail.com'` + `emailLink.textContent = 'rob.c.parker@gmail.com'` (inside `renderGenericError`) ✓. `js/main.js:491–492` = identical pair inside the Turnstile 8-second timeout fallback ✓. `index.html:140–141` = `"Whether you're looking for a fractional engineering leader or a technical thought partner, Rob brings executive-level judgment to the table."` ✓ (R8). Every line cite in the spec matches the repo as of this review. |
| R7 favicon `<head>` insertion point — per-page | **Critical per-page variance.** Not all 5 pages currently carry a `<link rel="canonical">`. Verified by grep: `resume.html:13`, `contact.html:27`, `advisory.html:24` have canonical; `index.html` and `about.html` do not. The spec says "Inserted into `<head>` after the existing `<link rel="canonical">` (or in the equivalent SEO/asset block on each page)" — the parenthetical handles this, but implementation requires an explicit per-page anchor. Recommended insertion anchors: `index.html` — immediately after the `<meta property="og:description">` at L16, before `<link rel="stylesheet">` at L18; `about.html` — after the noindex-removed WHY comment at L22–23, before `<link rel="stylesheet">` at L25; `resume.html` — after `<link rel="canonical">` at L13, before the OG block (placing icon links adjacent to canonical keeps SEO/asset block contiguous); `contact.html` — after `<link rel="canonical">` at L27, before `<link rel="stylesheet">` at L28; `advisory.html` — after `<link rel="canonical">` at L24, before `<link rel="stylesheet">` at L26. All 5 pages end up with the 5 new tags immediately above the `<link rel="stylesheet" href="css/style.css">` line. Order of the 5 new tags should be: `icon` (legacy .ico) → `icon` (SVG) → `apple-touch-icon` → `manifest` → `meta theme-color`. See IG-1. |
| Favicon SVG validation | **Passes all checks.** `images/favicon/favicon.svg` opens and parses as well-formed XML/SVG. Root `<svg>` has `xmlns`, `viewBox="0 0 512 512"`, explicit `width="512" height="512"`. Contains `<title>Rob Parker</title>` and a `<desc>` describing the "guitar-pick silhouette reinterpreted as a shield form" — the `<desc>` surfaces the guitar basis in machine-readable form. **Arch concern flagged:** the `<desc>` explicitly mentions "guitar-pick" and "electric-guitar basis." Per SPEC-006's strictly-professional posture and SPEC-007's Spec-Gate-A-4 rationale ("the guitar basis is a private structural reference the owner knows about; the audience perceives only a 'clean geometric mark'"), a hiring manager viewing page source or running an accessibility tree inspection would see the guitar reference in the `<desc>`. This is a narrow surface (source-view or AT tools, not casual visitors) but the `<desc>` contradicts the "private structural reference" framing. Surfacing as AG-3 for a decision: tighten the `<desc>` to describe only what the audience perceives ("Stylized shield emblem with a horizontal accent bar and centered note-head"), or leave as-is. No scripts, no external resource references, no `<use>` referencing external URLs, no `<image>` embeds, no `<foreignObject>`. Colors: `#1e40af` (outer shield fill), `#2563eb` (inner shield fill), `#ffffff` at opacity 0.92 (accent bar) and 0.88 (note-head). All three hex values are from the existing palette in `css/style.css :root`. **Mental render at 16×16:** shield silhouette survives as the primary read; the accent bar (width 236 of 512 = ~46% of viewbox) and the centered circle (radius 28 of 512 = ~11% of viewbox) fuse into a recognizable stack at 16px without becoming illegible mush. At 180×180 (apple-touch-icon), the two-tone blue shield + white bar + white dot composition reads cleanly; both opacity values are high enough that the bar and dot remain visible against the `#2563eb` inner shield. Legibility holds at both ends. |
| Webmanifest semantics (W3C manifest spec) | **Shippable as-specified, but two W3C-recommended fields are absent.** The spec's exact JSON has `name`, `short_name`, `icons`, `theme_color`, `background_color`, `display` — six fields, all validly formed. The W3C Web App Manifest spec recommends (not requires) two additional fields for bookmark/home-screen consistency: `start_url` (which page the home-screen icon opens to — default is the manifest's URL, which would be `/site.webmanifest` in this case, and some Android versions fall back to the domain root, but explicit is safer) and `scope` (which paths the manifest's context covers — omitting it usually resolves to the manifest's parent URL). `id` is recommended for PWAs with install prompts; not relevant since `display: browser` disables install prompts. Recommend adding `"start_url": "/"` (opens the home page when the icon is tapped) and `"scope": "/"` (full site covered). Surface as AG-2. Skipping is survivable — Android's fallback behavior for an absent `start_url` is "open the manifest's origin root," which is `https://www.robcparker.com/`, which is correct. But explicit is ~12 bytes of JSON and removes any ambiguity across Android/Chrome versions. |
| Cloudflare Pages routing — `/favicon.ico` and `/site.webmanifest` | **`/favicon.ico` works out of the box.** Cloudflare Pages serves root-path static files with correct MIME types based on file extension; `.ico` → `image/vnd.microsoft.icon` is default (matches the SPEC-003-established `files/` pattern where PDFs got `application/pdf` without a `_headers` file). **`/site.webmanifest` is a real gotcha.** The `.webmanifest` extension is registered by the W3C but is not universally recognized by Cloudflare's default MIME mapping (Cloudflare Pages uses Cloudflare Workers Sites MIME database under the hood, which historically has handled `.webmanifest` as `application/manifest+json` correctly on recent deploys — but there are documented cases where the default falls through to `text/plain` or `application/octet-stream`, which some browsers reject for manifests). Recommend one of: (a) add `site.webmanifest` to a `_headers` file at project root to explicitly set `Content-Type: application/manifest+json`; (b) rename to `site.manifest.json` or `manifest.json` — `.json` is universally mapped to `application/json`, which browsers accept for manifests per spec despite not being the canonical MIME type; (c) deploy and verify empirically before accepting. Option (a) is the safest — it is one file (`_headers`) with three lines (`/site.webmanifest` + `Content-Type: application/manifest+json`). Also adds a recorded stack-quirk precedent for future asset work. Surface as AG-4. |
| R6 email touchpoint completeness | **Complete.** Grep for `rob.c.parker` across the repo returns 5 in-repo touchpoints that are user-facing or runtime: `resume.html:83` (mailto + text, counts as one `<a>` but two string occurrences), `contact.html:222` (data-user obfuscation piece), `js/main.js:308–309` (pair in `renderGenericError`), `js/main.js:491–492` (pair in Turnstile-timeout fallback). All 5 sites match the spec's R6 table exactly. Additional grep hits in `specs/SPEC-004-contact-page.md` and the top-level `copy_and_design_changes.txt` are out of scope per SPEC-007's explicit spec-files exclusion and the general cleanup-scratchpad nature of the `.txt` file (which will be deleted or revised in a later cleanup pass — not SPEC-007's concern). No additional touchpoints missed. `contact.html:110` contains `<input type="hidden" name="_subject" value="New contact from robcparker.com">` — not an email, just the Formspree subject-line prefix; unaffected by R6 and correctly out of scope. **R6 is exhaustive.** |
| Copywriter invocation pattern | R3 and R8 both invoke `marketing-copywriter` — R3 for a narrow one-clause tone polish ("…and maintaining an 80% DevEx score"), R8 for a single-sentence rewrite (the "fractional" line). Spec presents them as two separate tasks in the Content Requirements section. **Single combined invocation is architecturally cheaper** (shared context, shared tone calibration against the surrounding paragraph, one PR artifact) and matches the bundling principle SPEC-006 applied (A-2 + A-3 invoked together). However, the two tasks touch different paragraphs (R3 edits the `.about-teaser` paragraph at L149-158, R8 edits the intro paragraph at L140-143), both on `index.html` but not adjacent in context. Either single-invocation-with-two-outputs or two-separate-invocations is defensible. Surface as AG-1. |
| R6 email obfuscation WHY comment — post-edit accuracy | The WHY comment at `contact.html:214–217` reads "Assembling the address client-side from split parts cuts ~70% of naive harvesters. No-JS users see the fallback span — they can still use the form or the LinkedIn link above. textContent assignment in JS prevents XSS." **Post-R6 the comment remains accurate** — R6 changes the data (user, domain) but not the obfuscation mechanism. The ~70%-harvesters claim is mechanism-relative, not data-relative; the no-JS fallback copy ("Contact via the form above") is unchanged; textContent-prevents-XSS note is unchanged. No comment edit required for R6. Similarly at `js/main.js:503-504` the EMAIL OBFUSCATION DECODER block comment is mechanism-level and survives R6. **No WHY comment goes silently stale after R6.** |
| Stack quirks | Reviewed `governance/stack-quirks.md` — two relevant entries: (a) **"Static Assets"** documents that the `files/` directory at project root is served with auto-detected MIME (`application/pdf` for PDFs) by Cloudflare Pages without a `_headers` file. This precedent supports R7's `/favicon.ico` and root-served icon PNGs — auto-MIME will work for `.ico`, `.png`, `.svg`. It does NOT cover `.webmanifest` (see the Cloudflare routing finding above). (b) **"Content Security Policy (future)"** notes a CSP is pending; no CSP is currently enforced. R7's new assets are all same-origin and same-domain; when a CSP is added (likely as part of SPEC-000), the directives `img-src 'self'` and `manifest-src 'self'` will cover them — no new CSP entry needed specifically for favicon. Note for SPEC-000's CSP work: the favicon assets consume no third-party budget. **Stack-quirks addition recommended post-implementation:** if option (a) of AG-4 is chosen (add `_headers` for `.webmanifest`), add a one-liner to stack-quirks.md under "Cloudflare": "Cloudflare Pages serves `.webmanifest` files without a `_headers` entry as `text/plain` or `application/octet-stream`; explicit `Content-Type: application/manifest+json` required via `_headers`. Established in SPEC-007." |
| WHY comments audit — non-obvious constraints | Scanned all `WHY:` comments across the 5 HTML files and `js/main.js`. **No non-obvious constraint is silently broken by SPEC-007.** Relevant checks: (a) `resume.html:59` has the hardcoded `class="active" aria-current="page"` on the Resume nav link — preserved, R1 edits only the nav-logo "Rob C Parker" text on line 39, not the nav-links list. (b) The SPEC-001-era WHY comments on `role="list"`, og:url-absolute, og:image-absolute, noindex-removed, defer-not-async, and the email-obfuscation block — all preserved. (c) The SPEC-004 WHY comments on Turnstile sitekey placeholder, aria-live region pre-registration, submit-disabled-until-token, and honeypot positioning — all preserved. (d) The SPEC-002 WHY comments on eager-loading the hero image, explicit width/height for CLS prevention — untouched. SPEC-007 does not edit or reposition any `WHY:` comment. |
| SEO impact | **Negligible.** R1 touches nav-logo text (body content), nav-logo aria-labels (accessibility), footer-logo text, footer copyright text, and the About page hero H1. Page `<title>`, `<meta name="description">`, `og:title`, `og:description`, `og:url`, `og:image`, and canonical URLs — all verified to already use "Rob Parker" (page titles and descriptions were already canonicalized during SPEC-002/003/004/005 implementation). R1 produces zero SEO-surface edits. R2/R3/R4 edit home-page body copy only — no title/description impact. R6 changes email text and mailto hrefs — email addresses are not SEO-indexed surfaces. R7 adds `<link rel="icon">` and `<meta name="theme-color">` — neither affects search ranking, though the theme-color does drive mobile-browser UI chrome tint on Android. **Confirmed: no SEO meta tag changes required by SPEC-007.** |
| Performance / a11y | R7 adds ~7 favicon asset files (expected combined <20KB per spec — but see AG-6 for realistic sizing). Fetched lazily by browsers on tab-strip / bookmark demand, not on initial page paint — no LCP impact. `theme-color` meta tag has no runtime cost. All 5 new `<head>` tags are short, inline, parse-cheap. R1/R2/R3/R4/R6/R8 are text-in-place edits; net-neutral on payload. A11y: (a) R2 aria-label must match visible digits — spec's "30 plus engineers" label is correct and explicit in the acceptance criteria; (b) R6 screen-reader announcement of the assembled email on `contact.html` decodes `data-user` + `@` + `data-domain` at runtime — post-edit announces `"contact at robcparker dot com"` which screen readers render as a natural email; (c) R1 `aria-label="Rob Parker — home"` on nav-logo remains a meaningful name and preserves the en-dash convention; (d) R7 `<link rel="icon">` elements have no a11y surface (not announced); `apple-touch-icon` inherits naming from `site.webmanifest` `name` field, which is "Rob Parker" — home-screen shortcut announces correctly; (e) R8 copywriter output must preserve the single-sentence structure above the `.about-teaser` paragraph (constrained in Content Requirements). No a11y regression. |
| Technical debt | **Net-negative (debt reduction).** R1 closes a multi-site name-drift inconsistency that has accumulated across six specs. R2/R3/R4 correct drift in factual claims (engineer count, DevEx metric presence, employer name). R6 retires a personal-inbox address that was flagged as "future trivial spec" in SPEC-004 — debt-reduction not debt-creation. R7 introduces a small new asset class (favicon suite + webmanifest) with a known forward path — this is the minimum asset surface consistent with modern browser expectations and was explicitly anticipated in SPEC-001. R8 closes the "fractional" deferral flagged in SPEC-005 and SPEC-006. **One new technical debt item flagged:** if AG-4 is resolved with option (a) (add a `_headers` file), the `_headers` file becomes a new deploy-config artifact — minimal, but new. Worth one line in stack-quirks.md and a mental note that future header-related concerns (CSP, cache directives, HSTS) can compose onto the same file. |

### Implementation Guidance (accept/reject per Arch Gate below)

| # | Guidance |
|---|----------|
| IG-1 | **Per-page `<head>` insertion anchors for R7.** Insert the 5 new tags (4 `<link>` + 1 `<meta theme-color>`) immediately above the existing `<link rel="stylesheet" href="css/style.css">` line on every page, in this order: (1) `<link rel="icon" href="/favicon.ico" sizes="any">`, (2) `<link rel="icon" type="image/svg+xml" href="/images/favicon/favicon.svg">`, (3) `<link rel="apple-touch-icon" href="/images/favicon/apple-touch-icon.png">`, (4) `<link rel="manifest" href="/site.webmanifest">`, (5) `<meta name="theme-color" content="#2563eb">`. Exact insertion lines per file (pre-R1 edit snapshot): `index.html` above L18, `about.html` above L25, `resume.html` above L29, `contact.html` above L28, `advisory.html` above L26. The spec's "after `<link rel="canonical">`" guidance is descriptive, not prescriptive — `index.html` and `about.html` have no canonical. Stylesheet-adjacent is the uniform anchor that works on all 5 pages. |
| IG-2 | **R6 — obfuscation WHY comment does NOT need editing.** The WHY comment at `contact.html:214–217` and the EMAIL OBFUSCATION DECODER comment at `js/main.js:503-504` are both mechanism-level (they explain the obfuscation technique, not the address). Post-R6 they remain accurate. Do not touch them. If the implementer feels a one-liner update is warranted ("now pointing at `contact@robcparker.com`"), that's fine but explicitly not required by the spec or this review. |
| IG-3 | **R1 locate-by-content, not line.** The spec already says this in its R1 preamble, but restating here because line numbers will drift after the first edit in any single file (particularly `index.html`, which carries 4 R1 edits plus R2/R3/R4/R8). Implementer runs `rg -n 'Rob C Parker' --glob '!specs/**'` before and after the edit pass to verify the delta. Expected before: 31 matches across 12 files. Expected after: 0 matches across the 12 non-spec files, same matches preserved across spec files. |
| IG-4 | **R6 grep verification before commit.** Run `rg -n 'rob\.c\.parker' --glob '!specs/**' --glob '!copy_and_design_changes.txt'` — expected zero matches. Run `rg -n 'contact@robcparker\.com'` — expected ≥4 matches in HTML/JS (`resume.html` mailto + text = 2, `js/main.js` 308/309 = 2, `js/main.js` 491/492 = 2 → 6 total string occurrences, possibly reported as 4 lines depending on match mode). The spec's acceptance criterion says "at least 4 matches" — the implementer should document the actual count in the PR. |
| IG-5 | **`copy_and_design_changes.txt` handling.** The root-level scratchpad file `copy_and_design_changes.txt` (untracked per git status) contains the pre-spec cleanup list including the line "Change contact email on every page from rob.c.parker@gmail.com to contact@robcparker.com." Since the file is untracked and is the seed artifact for SPEC-007 itself, no edit is required. **Recommended: delete the file after SPEC-007 merges** — it is the working-notes artifact that SPEC-007 formalizes and is no longer needed. Not a hard requirement of this spec; surface to Rob as a post-merge cleanup item. See AG-7. |
| IG-6 | **Favicon assets — generation from `favicon.svg` master.** Per A-9 the committed SVG is the design master. Raster exports (`favicon.ico` multi-res 16/32/48, `favicon-16.png`, `favicon-32.png`, `favicon-48.png`, `apple-touch-icon.png` 180×180, `android-chrome-192.png`, `android-chrome-512.png`) are generated from the master at implementation-time. Use the Pillow-based recipe established in stack-quirks.md for the PNG exports (`convert("RGB")` for EXIF strip, `Image.LANCZOS` for resize); for `.ico`, Pillow's `save('favicon.ico', format='ICO', sizes=[(16,16),(32,32),(48,48)])` produces a multi-resolution ICO in one call. All raster exports preserve the SVG's flat-fill palette — no per-size hand-tuning needed given the simple geometry (shield, bar, dot). Verify by opening each PNG in a browser preview; the 16×16 should read as a silhouette-identifiable shield with a horizontal bar. |
| IG-7 | **Webmanifest file name consistency.** The spec says `/site.webmanifest` (committed at project root). Per the Cloudflare Pages MIME gotcha (see findings), if Arch Gate decides option (b) of AG-4 (rename to `.json`), the file path changes to `/site.manifest.json` and the HTML `<link rel="manifest" href="/site.webmanifest">` becomes `<link rel="manifest" href="/site.manifest.json">` on all 5 pages. If option (a) is chosen, keep `/site.webmanifest` and add a `_headers` file — no HTML edits. If option (c) is chosen, deploy with `/site.webmanifest` and verify empirically. The HTML edit is identical across pages; the only per-page concern is the href string matching. |
| IG-8 | **`_headers` file format (if AG-4 option (a) chosen).** Project-root `_headers` file with content: `/site.webmanifest\n  Content-Type: application/manifest+json\n`. Cloudflare Pages `_headers` syntax: path on one line, header on an indented line. Single-path entry, single-header value. The `_headers` file becomes the site's first deploy-config artifact and should be noted in stack-quirks.md under "Cloudflare" post-merge. |
| IG-9 | **Favicon mark `<desc>` tightening (if AG-3 option (a) chosen).** The current `<desc>` in `images/favicon/favicon.svg` reads: "Primary brand mark — a guitar-pick silhouette reinterpreted as a shield form, with an interior accent bar and note-head. Abstract electric-guitar basis expressed as an authority emblem." If Arch Gate decides to tighten per the Spec-Gate-A-4 rationale (guitar as private structural reference, not audience-perceivable), replace with: "Primary brand mark — a shield-form emblem with a horizontal accent bar and centered note-head. Two-tone blue on white." Source-view audience sees a professional mark description, not a guitar reference. The committed master file changes but the rendered bitmap does not — no visual impact. |
| IG-10 | **R3 and R8 copywriter — single combined invocation (if AG-1 option (a) chosen).** When `marketing-copywriter` is invoked during implementation, bundle both tasks into one prompt: (1) lightly rephrase "and maintaining an 80% DevEx score" for tone consistency at `index.html:155`; (2) rewrite the single sentence at `index.html:140–141` to remove "fractional" while preserving the section's function. Shared context: both edits are on `index.html`, both target the "How Rob Engages" section (the fractional line is the section intro; the DevEx clause is in the `.about-teaser` one paragraph below), both must preserve register against surrounding home-page copy. Single invocation produces two outputs; Rob reviews at PR time. If AG-1 option (b) chosen, two separate invocations with narrower scope each — slightly more review overhead. |
| IG-11 | **Grep-based acceptance verification before commit.** After implementation, run and record in the PR description: (1) `rg -n 'Rob C Parker' --glob '!specs/**'` → zero matches expected across HTML, CLAUDE.md, README.md, `.claude/agents/*.md`; (2) `rg -n 'rob\.c\.parker' --glob '!specs/**' --glob '!copy_and_design_changes.txt'` → zero matches expected; (3) `rg -n 'contact@robcparker\.com' --glob '!specs/**'` → ≥4 matches expected; (4) `rg -ni 'omnicell' --glob '!specs/**'` → zero matches; (5) `rg -ni 'fractional' --glob '!specs/**'` → zero matches; (6) `rg -n '40\+' index.html` → zero matches (30+ present instead). These double as automated checks on the R1/R2/R4/R6/R8 acceptance criteria. |

### Arch Gate Decisions Required (Rob)

| # | Question | Options | Recommendation |
|---|----------|---------|----------------|
| AG-1 | R3 + R8 copywriter invocation pattern — one call or two? | (a) Single combined invocation with both tasks in one prompt — shared context, one review cycle, matches SPEC-006's bundling precedent; (b) Two separate invocations — narrower scope per task, clearer audit trail per edit, slightly more review overhead; (c) R3 skipped (ship user's exact "80% DevEx score" wording without copywriter); R8 invoked alone | **(a)** — both edits are on `index.html` in the "How Rob Engages" section; shared register calibration argues for one invocation. PR review sees two diffs but one copywriter artifact. Spec Gate A-8 already opened the R3 copywriter license; (a) uses it cleanly. Option (c) is defensible if the user's wording reads naturally — but that's a live-time judgment by the copywriter, so the invocation still needs to happen. |
| AG-2 | R7 webmanifest semantics — add W3C-recommended fields? | (a) Ship as-specified (6 fields: name, short_name, icons, theme_color, background_color, display) — minimum viable, matches the Spec-Gate-approved JSON exactly; (b) Add `"start_url": "/"` and `"scope": "/"` — 2 lines of JSON, removes Android/Chrome version-fallback ambiguity; (c) Add (b) plus `"id": "/"` for future PWA-readiness | **(b)** — 12 additional bytes of JSON, explicit behavior across Android versions, no downside. `start_url: "/"` directs the home-screen icon to the site root. `scope: "/"` covers the entire site. Skipping `id` is correct per the non-PWA intent — (c) overstates the asset's role. The variance is purely additive (no field changes its value). Surface explicitly so Rob can accept or refuse. |
| AG-3 | Favicon SVG `<desc>` — tighten to remove guitar reference? | (a) Tighten to "Primary brand mark — a shield-form emblem with a horizontal accent bar and centered note-head. Two-tone blue on white." — matches the Spec-Gate-A-4 rationale ("guitar is a private structural reference; audience perceives clean geometric mark"); (b) Leave as-is — the current `<desc>` names the guitar basis, which is architecturally honest documentation of the mark's origin; (c) Remove `<desc>` entirely, keep `<title>` only | **(a)** — the Spec-Gate-A-4 framing explicitly says the guitar basis is private. Source-view / accessibility-tree is a narrow surface, but it IS the surface where the `<desc>` is read, and the current `<desc>` directly contradicts the "private structural reference" framing. Tightening costs nothing (the rendered bitmap is unchanged) and the design rationale remains in `images/source/favicon-concepts/CONCEPTS.md` for anyone who needs the history. Option (c) loses a11y surface unnecessarily. |
| AG-4 | `.webmanifest` MIME handling on Cloudflare Pages — how to ensure correct Content-Type? | (a) Add a project-root `_headers` file with one entry mapping `/site.webmanifest` → `Content-Type: application/manifest+json` — explicit, safe, documented; (b) Rename `site.webmanifest` to `site.manifest.json` (universally MIME-mapped as `application/json`, which browsers accept for manifests) — no new config file; (c) Deploy as-is with `.webmanifest` extension and verify empirically; fall back to (a) only if browsers reject | **(a)** — Cloudflare Pages' handling of `.webmanifest` is version-dependent; safest assumption is explicit MIME configuration. The `_headers` file is a zero-dependency deploy-config artifact that composes forward with future CSP / cache directives / HSTS work. Option (b) works but diverges from conventional `.webmanifest` naming every reference material uses. Option (c) defers the gotcha to deploy-time, which contradicts the pre-deploy-cleanup posture of SPEC-007. Adds one stack-quirk entry post-merge (see IG-8). |
| AG-5 | Formspree form ID (`mvzdrbnk`) rotation — required alongside email migration? | (a) Keep form ID `mvzdrbnk`; only change the recipient — matches Spec Gate Out-of-Scope explicit guidance and A-3 resolution; (b) Rotate to a new form ID as defense-in-depth (old ID still exists on Formspree with the old recipient config until deleted) | **(a)** — per Spec Gate Out-of-Scope: "Formspree form rename or form-ID change — form ID `mvzdrbnk` stays. Only the recipient email changes." This AG is surfaced here only because the R6 email migration could introduce a subtle attack surface: the old form ID is still exposed in `contact.html:106` (`action="https://formspree.io/f/mvzdrbnk"`) and routes to whatever recipient is configured at submission time. If the Formspree dashboard update is made correctly, no risk. If misconfigured, submissions could be silently misrouted. Spec Gate decided (a); confirming here so it is arch-recorded. |
| AG-6 | Favicon asset committed byte sizes — enforce spec's "<20KB combined" budget? | (a) Enforce at QA Gate — implementer must document combined size and fail QA if >20KB; (b) Advisory only — document actual size, accept overage within reason (say, <50KB); (c) No limit — favicon assets are cache-cheap and not on critical path | **(b)** — realistic sizes for a simple flat-fill mark are ~28-32KB combined (android-chrome-512.png is the biggest consumer at ~15KB). The NFR's <20KB budget is tight for the full suite. (b) accepts realistic size (still well under the committed headshot JPEG at 62KB) and documents actuals. Minor spec-correction surfaced at Arch Gate. |
| AG-7 | `copy_and_design_changes.txt` — delete after merge, or keep? | (a) Delete after SPEC-007 merges — it is the working-notes artifact SPEC-007 formalizes; (b) Keep as historical artifact, add a header noting "superseded by SPEC-007"; (c) Move to `specs/working-notes/` or similar archive location | **(a)** — the file is currently untracked (per git status), so "delete after merge" simply means not staging it. The SPEC-007 spec document fully supersedes the file's contents. Option (b) adds clutter at project root for historical value SPEC-007 preserves in its Summary and Decision Rationale. Housekeeping AG surfaced for completeness. |

### Effort Comparison (Arch Review stage)

| | AI-Assisted | Human Solo |
|---|---|---|
| Arch review | ~14 minutes | 2-3 hours |
| Assumptions | Reviewer had full repo access, SPEC-006's Architecture Review as structural template, the complete SPEC-007 spec with Spec Gate Addendum locking the favicon design, and the graphic-artist-produced `favicon.svg` master committed and inspectable. No pentester invoked (Standard tier, no auth/PII/payment/external-integration surface — R6 is a routing-change on an existing obfuscation pattern; R7 introduces only static same-origin assets and a non-executable JSON manifest; no new CSP entries required). Stack-quirks reviewed and confirmed: `files/` PDF precedent supports icon MIME auto-handling; `.webmanifest` MIME is flagged as a real Cloudflare-specific gotcha requiring explicit handling (AG-4). Full line-number verification performed across all 16 R1 Scope A cites + all 10 R1 Scope B cites + R2/R3/R4/R5/R6/R8 spot cites (26 line citations total, 0 discrepancies found — unlike SPEC-006 where 2 of the cited WHY-comment lines were stale). Per-page favicon insertion point verified against each page's `<head>` structure (2 of 5 pages lack `<link rel="canonical">` — spec's "after canonical" language needed a stylesheet-adjacent fallback, surfaced in IG-1). Favicon SVG opened and validated: well-formed XML, palette-compliant, no scripts/external refs, `<title>` + `<desc>` present; `<desc>` flagged as potentially over-disclosing the guitar basis (AG-3). Webmanifest JSON cross-checked against W3C spec (AG-2). |

### Arch Gate Decisions (2026-04-21)

| # | Decision | Status |
|---|----------|--------|
| AG-1 | R3 + R8 copywriter invocation → **Single combined invocation** (option a) — both tasks bundled into one `marketing-copywriter` prompt during implementation per IG-10 | Accepted |
| AG-2 | Webmanifest semantics → **Add `start_url: "/"` and `scope: "/"`** (option b) — R7's JSON block updated inline to reflect this; `id` field not added (non-PWA) | Accepted — R7 JSON block updated |
| AG-3 | Favicon SVG `<desc>` → **Tighten to remove guitar reference** (option a) — applied pre-implementation to `images/favicon/favicon.svg`; new `<desc>` reads "Primary brand mark — a shield-form emblem with a horizontal accent bar and centered note-head. Two-tone blue on white." Design rationale preserved in `images/source/favicon-concepts/CONCEPTS.md` | Accepted — `favicon.svg` updated |
| AG-4 | `.webmanifest` MIME handling → **Add `_headers` file with explicit `Content-Type: application/manifest+json`** (option a) per IG-8. Creates the site's first deploy-config artifact; future CSP / cache / HSTS directives can compose onto the same file. Stack-quirks.md entry to be added post-merge per implementation scope | Accepted |
| AG-5 | Formspree form ID → **Keep `mvzdrbnk`; change recipient only** (option a) — confirms Spec Gate A-3 / Out-of-Scope decision at Arch-Gate level | Accepted |
| AG-6 | Favicon asset byte-size budget → **Advisory only** (option b) — NFR "<20KB combined" relaxed; implementer documents actual combined size in PR, accepts realistic ~28–32KB for the full suite (still well under the 62KB committed headshot precedent) | Accepted — NFR superseded |
| AG-7 | `copy_and_design_changes.txt` handling → **Keep for now; Rob deletes later after confirming changes** (option b-variant) — diverges from agent recommendation (option a). File stays untracked at project root during SPEC-007 implementation and merge; Rob deletes manually after independently verifying the SPEC-007 changes match the source scratchpad | Accepted — variant of option b |

All 11 IG items (IG-1 through IG-11) accepted as-written.

### Arch Gate Approval

**Decision:** Approved
**Approved by:** Rob Parker
**Date:** 2026-04-21

---

## QA Review

**Reviewers:** qa-expert + code-reviewer agents (parallel)
**Date:** 2026-04-21
**QA Verdict:** PASS with observations (two resolved inline before commit; see QG-15 and QG-21)
**Code Review Verdict:** APPROVE with minor notes (CR-13 resolved inline)

### Summary

All eight requirements (R1–R8) and all eleven IG items verified. Every acceptance criterion passes. All six IG-11 grep checks return the expected zero / non-zero results. Favicon suite exists at all ten expected paths (7 under `images/favicon/` + `favicon.ico`, `site.webmanifest`, `_headers` at root), combined size 25.8KB — within AG-6's advisory ceiling. `site.webmanifest` is valid JSON with AG-2 additions (`start_url: "/"` and `scope: "/"`). `_headers` correctly maps `Content-Type: application/manifest+json` per AG-4. SVG master carries the AG-3-tightened `<desc>`. `node --check js/main.js` passes; both email-fallback edits are surgical with no orphaned braces. Email obfuscation mechanism intact, no new attack surface.

Two observations were surfaced by the reviewers AND resolved inline before commit as in-scope scope expansions (analogous to SPEC-006's QG-13 inline fix for pre-existing `M&A` escape): (1) **CR-13** — the favicon SVG's inline `<!-- HTML comments -->` still referenced "pick / shield form," "Interior pick form," and "string/fret crossing the body" even though the `<desc>` was tightened for AG-3. Fixed by updating the three comments to audience-facing geometric descriptions ("Outer shield form," "Inner shield form," "Horizontal accent bar across the body"); rendered bitmap unchanged. (2) **QG-21** — CLAUDE.md's sitemap block (`CLAUDE.md:31-33`) still listed `services/`, `services/tech-advisory.html`, and `services/guitar-playing.html` despite SPEC-006 removing all three. Fixed by collapsing the three lines into `advisory.html` at the root level, matching current filesystem state. Both fixes are in files SPEC-007 was already editing. No other observations escalated.

One prose-judgment observation (QG-15, the back-to-back "Rob works with" openings created by R8's Variant C sentence above the unchanged `.about-teaser` paragraph) is left for Rob's PR review. Copywriter Variants A and B are recorded in the implementation-time Agent output for easy swap if Rob prefers a different opening construction.

### QA Gate Decisions (2026-04-21)

| # | Finding | Decision |
|---|---------|----------|
| QG-1 | **R1 grep — zero matches.** `rg -n 'Rob C Parker' --glob '!specs/**' --glob '!copy_and_design_changes.txt'` returns no output. All 21 user-facing HTML occurrences (nav-logo text, nav-logo aria-label, footer-logo, footer copyright, `about.html` hero H1) and all 10 internal-artifact occurrences (CLAUDE.md, README.md, five agent prompt files) resolve to "Rob Parker." | PASS — no action. |
| QG-2 | **R1 spec-file preservation.** `git diff main -- specs/SPEC-001*.md specs/SPEC-002*.md specs/SPEC-003*.md specs/SPEC-004*.md specs/SPEC-005*.md specs/SPEC-006*.md` returns empty. Historical spec artifacts untouched per SPEC-006 precedent. | PASS — no action. |
| QG-3 | **R2 — 30+ metric and aria-label.** `index.html` highlight card reads `<div class="highlight-metric" role="img" aria-label="30 plus engineers">30+</div>`. Visible digits and aria-label match exactly (a11y-correct). `rg -n '40\+' index.html` returns zero matches. | PASS — no action. |
| QG-4 | **R3 — DevEx metric appended.** `index.html` reads "…scaling an engineering org 150% while holding 90% retention and maintaining an 80% DevEx score." Copywriter shipped Variant A (user's exact wording) per narrow license judgment — the clause reads naturally in context. Other sentences in the paragraph unchanged. | PASS — no action. |
| QG-5 | **R4 — Athenahealth substitution.** `index.html` about-teaser reads "…has led teams at companies including SugarCRM and Athenahealth, holding…". `rg -ni 'omnicell' --glob '!specs/**' --glob '!copy_and_design_changes.txt'` returns zero matches. | PASS — no action. |
| QG-6 | **R5 — About silo retention sentence verified.** `about.html:145` reads "At SugarCRM, I grew the engineering organization by 150% while sustaining 90% retention…" — unchanged. `git diff main -- about.html` shows this line not in the diff except for incidental R1 Scope B edits to the footer/copyright. | PASS — no action. |
| QG-7 | **R6 — email migration complete.** `rg -n 'rob\.c\.parker' --glob '!specs/**' --glob '!copy_and_design_changes.txt'` returns zero matches. `rg -n 'contact@robcparker\.com'` returns 5 non-spec line matches: `resume.html:89` (mailto + visible text on same `<a>`), `js/main.js:308-309` (renderGenericError pair), `js/main.js:491-492` (Turnstile-timeout pair). `contact.html:222-223` carries `data-user="contact"` and `data-domain="robcparker.com"`. `node --check js/main.js` passes. | PASS — no action. |
| QG-8 | **R6 — Formspree dashboard update (deferred to deploy-time).** Form `mvzdrbnk` recipient update is an out-of-repo manual step. Does not gate QA Gate; gates deploy-time per project-wide deployment deferral. Listed below in deferred verification. | PASS — deferred verification logged. |
| QG-9 | **R7 — favicon asset existence and sizes.** All 7 files in `images/favicon/` present: `favicon.svg` (1,230 B), `favicon-16.png` (396 B), `favicon-32.png` (740 B), `favicon-48.png` (1,174 B), `apple-touch-icon.png` (3,721 B), `android-chrome-192.png` (3,923 B), `android-chrome-512.png` (11,601 B). Root files present: `favicon.ico` (3,004 B), `site.webmanifest` (391 B), `_headers` (60 B). Combined suite ≈ 25.8KB — within AG-6 advisory ceiling (~50KB). All files nonzero. | PASS — no action. |
| QG-10 | **R7 — HTML link tags on all 5 pages.** All pages carry the exact 5-tag block in IG-1 order (icon.ico → icon SVG → apple-touch-icon → manifest → theme-color), inserted immediately above `<link rel="stylesheet" href="css/style.css">`. Consistent across `index.html`, `about.html`, `resume.html`, `contact.html`, `advisory.html`. All paths absolute (`/favicon.ico`, `/images/favicon/...`, `/site.webmanifest`). | PASS — no action. |
| QG-11 | **R7 — `site.webmanifest` JSON validity.** Parses as valid JSON. Fields match the spec's R7 block (AG-2-amended): `name: "Rob Parker"`, `short_name: "Rob Parker"`, `start_url: "/"`, `scope: "/"`, `theme_color: "#2563eb"`, `background_color: "#ffffff"`, `display: "browser"`, `icons` array with both android-chrome PNGs (192 + 512). | PASS — no action. |
| QG-12 | **R7 — `_headers` file.** Project-root file, 60 bytes, correct Cloudflare Pages format: path `/site.webmanifest` on line 1, indented `Content-Type: application/manifest+json` on line 2. Scoped to one exact path — no wildcards, no overreach to other assets. Implements AG-4 option (a) as accepted. | PASS — no action. |
| QG-13 | **R7 — SVG `<desc>` tightened per AG-3.** `images/favicon/favicon.svg` contains `<desc>Primary brand mark — a shield-form emblem with a horizontal accent bar and centered note-head. Two-tone blue on white.</desc>` — no guitar, pick, or string/fret references in the machine-readable a11y surface. SVG well-formed XML; colors `#1e40af`, `#2563eb`, `#ffffff`; no scripts, external refs, `<image>` embeds, `<foreignObject>`, or remote `<use xlink:href>`. | PASS — no action. |
| QG-14 | **R8 — "fractional" fully removed.** `rg -ni 'fractional' --glob '!specs/**' --glob '!copy_and_design_changes.txt'` returns zero matches. `index.html` "How Rob Engages" intro reads the copywriter's Variant C: "Rob works with leadership teams as a senior engineering sounding board — focused engagements, specific problems, executive-level judgment applied where it counts." Section heading and the full `.about-teaser` paragraph below are unchanged. | PASS — no action. |
| QG-15 | **R8 prose observation — back-to-back "Rob works with" openings.** R8 Variant C sentence (section-header paragraph) opens with "Rob works with…"; the unchanged `.about-teaser` body paragraph immediately below also opens with "Rob works with growth-stage SaaS companies…". The two sentences sit in distinct HTML containers (`.section-header` vs `.about-teaser-text`) with visual separation, but the lexical repetition is noticeable on a close read. Not a functional defect. Copywriter Variants A ("Rob takes on a small number of focused engagements…") and B ("If you're working through a high-stakes engineering decision…") were produced in the same implementation-time invocation and are a trivial swap at PR review if Rob prefers a different opening. | Observation only — left for Rob's PR review; prose-judgment call. |
| QG-16 | **Nav/footer integrity — all 5 pages.** Every page's `.nav-links` and `.footer-nav` carries exactly 5 `<li>` items in order: Home → About → Resume → Advisory → Contact. No empty `<li>`, no Guitar entry. `role="list"`, `aria-label="Main navigation"`, and `aria-label="Footer navigation"` preserved. R1 name edits caused zero regression. | PASS — no action. |
| QG-17 | **Heading hierarchy — single H1 per page.** `index.html:70` (`#hero-headline`), `about.html:94` (`#hero-name`), `resume.html:77` (`#resume-name`), `contact.html` (`#contact-heading`), `advisory.html` (`#advisory-heading`) — one H1 each. No orphaned or duplicate H1; no heading-level gaps. | PASS — no action. |
| QG-18 | **A11y spot-checks.** Skip-link present on all 5 pages. All `target="_blank"` instances (8 total across the site) paired with `rel="noopener noreferrer"` (grep-counted, match). No new inline `<script>` or `<style>` introduced. No `href="javascript:..."` patterns. `aria-current="page"` logic in `js/main.js:initActiveNav()` untouched. | PASS — no action. |
| QG-19 | **JS functional integrity.** `node --check js/main.js` passes. `git diff main -- js/main.js` shows exactly two clean two-line hunks (lines 308-309 and 491-492). No orphaned braces, no new functions, no logic changes beyond the email-string replacement. Obfuscation decoder at `js/main.js:510-527` unchanged — `textContent` assignment preserved (XSS-safe). | PASS — no action. |
| QG-20 | **WHY comment audit.** All pre-existing WHY comments intact and accurate post-SPEC-007. Email-obfuscation WHY at `contact.html:214-217` remains mechanism-accurate (~70% harvester mitigation claim is mechanism-relative, not data-relative). EMAIL OBFUSCATION DECODER block comment at `js/main.js:503-504` unchanged. All other SPEC-001/002/003/004/005/006 WHY comments preserved untouched. | PASS — no action. |
| QG-21 | **CLAUDE.md site map drift — pre-existing from SPEC-006; fixed inline.** The site map at `CLAUDE.md:31-33` still listed `services/`, `services/tech-advisory.html`, and `services/guitar-playing.html` — all three removed or moved by SPEC-006. Since R1 Scope B established internal-artifacts cleanup as SPEC-007 territory and `CLAUDE.md` was already in the diff, this was resolved inline: the three lines collapsed into a single `advisory.html` entry at the root level. No scope escalation; mirrors SPEC-006's QG-13 pattern of fixing a pre-existing drift discovered during QA. | **Fixed** — CLAUDE.md sitemap updated. |
| QG-22 | **SVG internal comments — CR-13 fixed inline.** Code reviewer flagged that while the `<desc>` was tightened per AG-3, three internal `<!-- HTML comments -->` inside `images/favicon/favicon.svg` still referenced "pick / shield form," "Interior pick form," and "string/fret crossing the body." SVG comments are visible in page source view (source-view surface explicitly named in the AG-3 rationale). Resolved inline: comments updated to "Outer shield form," "Inner shield form," and "Horizontal accent bar across the body." Rendered bitmap unchanged (comments are source-level annotations only); raster exports do not need regeneration. SVG re-validated as well-formed XML after edits. | **Fixed** — SVG comments tightened. |
| QG-23 | **Post-fix re-verification.** After QG-21 and QG-22 fixes applied, re-ran: `rg -ni 'guitar' --glob '!specs/**' --glob '!images/source/**' --glob '!copy_and_design_changes.txt'` returns zero matches. `rg -n 'pick\|string\|fret\|guitar' images/favicon/favicon.svg` returns zero matches. `node --check js/main.js` passes. `python3 -c "import json; json.load(open('site.webmanifest'))"` passes. `python3 -c "import xml.etree.ElementTree as ET; ET.parse('images/favicon/favicon.svg')"` passes. All IG-11 greps still return expected results. | PASS — no action. |

### Code Review Summary

| # | Area | Finding | Severity |
|---|------|---------|----------|
| CR-1 | R1 case-sensitivity | No case-drift ("rob c parker", "ROB C PARKER") introduced anywhere. "RobCParker" in CLAUDE.md header / agent prompts is the repo/domain string (not a person-name drift) and correctly preserved. | Info |
| CR-6 | R6 obfuscation mechanism | `data-user`/`data-domain` split preserved; `js/main.js` decoder continues to use `textContent = address` (XSS-safe). No new attack surface from R6 data change. | Info |
| CR-8 | JS syntax integrity | Both edit pairs (L308-309, L491-492) preserve enclosing function structure. Surrounding braces, parens, semicolons balanced. `node --check` passes. | Info |
| CR-10 | Webmanifest validity | Valid JSON. All AG-2 fields present and correctly typed. `theme_color` is valid hex (`#2563eb`); `display: "browser"` matches non-PWA intent. | Info |
| CR-11 | `_headers` scope | Cloudflare Pages syntax correct; scoped to exactly one path (`/site.webmanifest`). No wildcards; no overreach to other paths. No unintended headers added. | Info |
| CR-12 | SVG security | No `<script>`, no `<foreignObject>`, no `<image>`, no remote `<use xlink:href>`, no external URLs. Static shapes only. Well-formed XML. | Info |
| CR-13 | SVG internal comments | **Fixed inline as QG-22.** Three `<!-- HTML comments -->` referencing guitar parts (pick, string/fret) updated to shield-form / accent-bar framing. | Resolved |
| CR-15 | Debug artifacts | No `console.log`, `console.debug`, `debugger`, `eval(`, `Function(`, or `innerHTML =` introduced. No trailing whitespace. | Info |
| CR-16 | Same-origin boundary | All R7 assets served same-origin. No new third-party hosts. `site.webmanifest` has no external references. | Info |
| CR-19 | Secrets scan | No API keys, tokens, credentials, Formspree/Turnstile secrets in the diff. `.gitignore` secret-defense patterns intact. | Info |
| CR-20 | LinkedIn URL unchanged | `https://www.linkedin.com/in/robcparker/` correctly preserved (external URL slug is not a person-name drift). | Info |

### IG-11 grep results (recorded for audit)

```
$ rg -n 'Rob C Parker' --glob '!specs/**' --glob '!copy_and_design_changes.txt'
(no output)

$ rg -n 'rob\.c\.parker' --glob '!specs/**' --glob '!copy_and_design_changes.txt'
(no output)

$ rg -n 'contact@robcparker\.com' --glob '!specs/**'
resume.html:89:                        <a href="mailto:contact@robcparker.com" class="resume-contact-item body-link">contact@robcparker.com</a>
js/main.js:308:        emailLink.href = 'mailto:contact@robcparker.com';
js/main.js:309:        emailLink.textContent = 'contact@robcparker.com';
js/main.js:491:            emailLink.href = 'mailto:contact@robcparker.com';
js/main.js:492:            emailLink.textContent = 'contact@robcparker.com';

$ rg -ni 'omnicell' --glob '!specs/**' --glob '!copy_and_design_changes.txt'
(no output)

$ rg -ni 'fractional' --glob '!specs/**' --glob '!copy_and_design_changes.txt'
(no output)

$ rg -n '40\+' index.html
(no output)

# Post-fix verifications (QG-21, QG-22):
$ rg -ni 'guitar' --glob '!specs/**' --glob '!images/source/**' --glob '!copy_and_design_changes.txt'
(no output)

$ rg -n 'pick|string|fret|guitar' images/favicon/favicon.svg
(no output)
```

### Deferred to deploy-time verification

Per the project-wide deployment deferral (`project_deployment_deferred.md`), runtime browser checks are deferred until SPEC-000 is written and all specs are merged. At deploy time, re-verify:

1. `https://www.robcparker.com/favicon.ico` loads with `Content-Type: image/vnd.microsoft.icon` (or `image/x-icon`)
2. `https://www.robcparker.com/site.webmanifest` loads with `Content-Type: application/manifest+json` (confirms the `_headers` file is parsed by Cloudflare Pages)
3. Tab strip shows the Pick Shield mark across Chrome / Firefox / Safari desktop (light and dark mode)
4. iOS "Add to Home Screen" uses `apple-touch-icon.png` (180×180) with correct rendering
5. Android Chrome "Add to Home Screen" uses `android-chrome-192.png`; manifest `name` ("Rob Parker") announces correctly
6. **Formspree dashboard:** form `mvzdrbnk` recipient confirmed as `contact@robcparker.com`; a test submission arrives at that inbox (the manual out-of-repo R6 step)
7. `contact@robcparker.com` visible on `/resume.html`; mailto opens compose window addressed correctly
8. Contact form generic-error and Turnstile-timeout fallbacks display `contact@robcparker.com` (requires simulating form failure)
9. LinkedIn social-card preview on all pages — `og:title` / `og:description` continue using "Rob Parker" (confirming R1 did not disturb meta tags)
10. Theme-color `#2563eb` drives Android Chrome's UI chrome tint

### Effort Comparison (QA stage)

| | AI-Assisted | Human Solo |
|---|---|---|
| QA + code review | ~14 minutes (two agents in parallel) + ~2 minutes inline-fix-and-reverify | 2–3 hours (QA engineer walking 8 requirements + 23 QG items + code reviewer reading diff, sequential, plus another hour for the fix cycle) |
| Assumptions | Reviewers had full repo access, all prior gate artifacts including Arch Gate decisions (AG-1 through AG-7), the AG-3-tightened SVG master, and the Spec Gate Addendum design lock. All checks were code-level: six IG-11 greps, file-size measurements via `ls -la`, webmanifest parsed with `python3 -c 'import json; json.load(...)'`, SVG read and `<desc>` inspected for AG-3 compliance, JS diff read line-by-line and `node --check` run, heading structure extracted via grep, `target="_blank"` instances cross-referenced with `rel="noopener noreferrer"` counts. Two observations (CR-13, QG-21) were resolved inline before commit as in-scope fixes matching SPEC-006's QG-13 precedent for pre-existing drift. QG-15 prose observation left for Rob's PR review. |

### QA Gate Approval

**Decision:** Approved
**Approved by:** Rob Parker
**Date:** 2026-04-21
