# SPEC-018: Canonical-Tag Apex Migration

**Status:** Arch Gate approved 2026-05-13 — proceeding to Implementation
**Tier:** Standard (multi-file SEO-load-bearing migration; 43 absolute-URL surfaces across 6 HTML pages + sitemap.xml + robots.txt; requires single coherent change so canonical/OG/sitemap stay consistent)
**Author:** PM-Spec Agent (promoted from `specs/backlog.md` entry "Canonical-tag / live-URL host mismatch (apex vs. www)" dated 2026-05-09; surfaced at SPEC-015 Deploy Gate)
**Date:** 2026-05-13
**Branch:** `spec/SPEC-018-canonical-apex-migration`

---

## Summary

Migrate every absolute-URL canonical signal across the site from `https://www.robcparker.com/...html` to the live host `https://robcparker.com/...` (apex, clean URLs). The www subdomain returns HTTP 522 (Cloudflare connection timeout) and is not a working alias — every `<link rel="canonical">`, `<meta property="og:url">`, `<meta property="og:image">`, `<meta name="twitter:image">`, Person JSON-LD `image`/`url`, sitemap `<loc>`, and robots.txt `Sitemap:` currently points search engines at a host that cannot be fetched.

Surfaces affected: 6 HTML files (`index.html`, `about.html`, `resume.html`, `contact.html`, `advisory.html`, `how-this-site-was-built.html`), `sitemap.xml`, `robots.txt`. Touch count at spec time: **43 absolute-URL strings** across these 8 files. Byte-string enumeration (file, line, old, new) gets locked at Arch Gate as a Pre-Implementation String Lock.

No HTML structure changes. No copy changes. No new pages. No new assets. Pure URL-string migration with byte-equality verification on the live host post-deploy.

## Context

### Why this spec exists

The site went live at the apex `https://robcparker.com/` on or before 2026-05-01 (per `project_site_live.md` memory). Cloudflare Pages serves the apex with clean URLs — `/resume.html` issues an HTTP 308 redirect to `/resume`, `/how-this-site-was-built.html` issues an HTTP 308 to `/how-this-site-was-built`, etc. The www subdomain returns HTTP 522 unconditionally.

Every canonical/OG/sitemap URL in the codebase was authored before the live deploy, when "www" was the design assumption. The pattern was established in SPEC-003 (resume canonical), extended in SPEC-004 (contact), SPEC-005 (advisory), and rounded out in SPEC-013 (index, about, sitemap, JSON-LD across the board). The www framing was inherited; nobody decided it — it was the prevailing convention in every prior spec.

The mismatch surfaced at SPEC-015 Deploy Gate (2026-05-09): the rebrand shipped successfully against the apex, but during post-deploy verification it became visible that every canonical/OG/Twitter/JSON-LD tag points at the 522 host. Logged as a backlog candidate the same day; promoted to this spec 2026-05-13.

### What search engines see today

A search engine crawling `https://robcparker.com/resume`:
1. Receives the page with `<link rel="canonical" href="https://www.robcparker.com/resume.html">`.
2. The canonical points at a different host (`www.`) AND a different path (`.html`).
3. Following the canonical: `www.robcparker.com` returns 522. Signal terminates.

Effect: canonical consolidation breaks. Ranking signal between the working apex URL and the canonical-declared URL may fragment. Social-share previews via OG/Twitter tags fetch `https://www.robcparker.com/images/og/og-card.png` and get 522. The site is functionally live but its discoverability and shareability surface is partially broken.

### Pre-existing — not introduced by recent work

NOT introduced by SPEC-015 (rebrand) or any other recent spec. The www framing predates the live Cloudflare Pages connection. SPEC-015's Deploy Gate is the first stage where the mismatch could have surfaced — and it did.

## Decision Rationale

Three decisions need resolution at Spec Gate (Q1–Q5 below). Two structural framing decisions are pre-resolved here:

- **Code fix, not Cloudflare DNS fix.** An alternative is to configure Cloudflare to accept both apex and www as live aliases, which would let the existing canonicals stay correct. Rejected as a default because (a) it is operator work outside the SDD pipeline, (b) it doesn't solve the `.html` vs clean-URL question (the 308 redirect chain remains), (c) it makes the deploy convention depend on Cloudflare DNS config that is not version-controlled, and (d) the canonical-form decision should match the URL the site actually serves, which is the apex with clean URLs. Codifying the live form as canonical is the durable fix. Raised as Q5 in case Rob wants to take the operator path instead.
- **Don't retroactively rewrite shipped specs.** Per SPEC-015 R3 convention, shipped specs (SPEC-002, -003, -004, -005, -006, -013, -016) contain historical mentions of `https://www.robcparker.com/...html` URLs as the record of what was decided when. SPEC-018 does not edit those files. The historical mentions are correct as the record; they are not active canonical signals. Raised as Q4 in case Rob wants to apply a different policy.

### Trade-offs accepted

- **Existing inbound links to `www.robcparker.com/...html` continue to 522.** This spec changes canonical signal, not Cloudflare DNS. If any external party has linked to the www form, those links will continue to fail until Cloudflare is configured to accept www OR a permanent redirect is set up. Pre-existing condition. Out of scope for this spec.
- **Existing inbound links to `https://robcparker.com/<path>.html` will continue to work via the 308 redirect.** The 308 chain stays in place; the change is only to which URL we *declare* canonical.
- **The change is reversible.** Pure string migration. If a future decision reverses canonical form (e.g., a Cloudflare config change makes www the canonical host), the migration runs in the opposite direction. No data loss, no destructive operation.

## Requirements

### Required changes

- **R1: HTML canonical/OG/Twitter/JSON-LD URLs.** Update every absolute `https://www.robcparker.com/...` URL in the 6 HTML files to the apex form. Specific tag types per file: `<link rel="canonical">`, `<meta property="og:url">`, `<meta property="og:image">`, `<meta name="twitter:image">`, Person JSON-LD `image`, Person JSON-LD `url`. Person JSON-LD `sameAs` is external (LinkedIn) and out of scope. The exact byte-strings per surface get locked at Arch Gate as a Pre-Implementation String Lock. **Lock format:** a table of `(file, line, old-string, new-string)` for all 43 surfaces, derived from `grep -rn 'www.robcparker.com' --include="*.html" --include="*.xml" --include="*.txt"` at the Arch Gate moment.

- **R2: sitemap.xml `<loc>` entries.** Update all 6 `<loc>` entries (currently at `sitemap.xml:4,10,16,22,28,34`) to the apex form.

- **R3: robots.txt `Sitemap:` directive.** Update the `Sitemap:` URL at `robots.txt:4` to the apex form.

- **R4: Canonical path form decision applied uniformly.** Whichever path form is chosen at Spec Gate Q1 (`.html` vs. clean) is applied to all 6 HTML files, sitemap.xml, and robots.txt without exception. Mixing forms within the same migration would defeat the purpose.

- **R5: governance/stack-quirks.md update.** Remove the language framing the apex-vs-www mismatch as a backlog item (the Cloudflare section currently says "this mismatch is a real SEO concern logged as a `specs/backlog.md` candidate"). Replace with the convention statement that apex is the canonical host going forward, with a reference to SPEC-018 as the convention establisher.

- **R6: specs/backlog.md item removal.** Remove the "Canonical-tag / live-URL host mismatch (apex vs. www)" entry from the backlog (lines 30-38) in the same PR. Per spec-pipeline skill convention: backlog is a holding queue, not a parallel record.

### Not in scope

- **NOT in scope: shipped spec body files.** SPEC-002, -003, -004, -005, -006, -013, -016 are left as-is. Historical record. (Raised as Q4 if user wants different policy.)

- **NOT in scope: email/subject-line references to "robcparker.com".** `contact.html`, `resume.html`, and `js/main.js` contain `robcparker.com` as part of email addresses (`contact@robcparker.com`) and Formspree subject lines (`"New contact from robcparker.com"`). These are not canonical URL surfaces and are not affected.

- **NOT in scope: CLAUDE.md project URL declaration.** `CLAUDE.md:11` declares `**URL:** https://www.robcparker.com`. Internal documentation. (Raised as Q2 if user wants to include.)

- **NOT in scope: Cloudflare DNS configuration.** Operator work, separate from this spec. (Raised as Q5 alternative; follow-on ticket question is Q6.)

- **NOT in scope: 301/308 redirect installation.** Cloudflare Pages handles `/foo.html` → `/foo` automatically. If clean URLs are chosen at Q1, the existing 308 behavior is sufficient.

- **NOT in scope: non-content files verified clean at spec time.** `_headers`, `site.webmanifest`, `js/main.js`, `css/style.css` were spot-grepped for `www.robcparker.com` references at spec drafting (2026-05-13) and contain zero matches. They are not enumerated in the lock or AC sweep.

## Open Questions — Spec Gate

### Q1: Should canonical paths use `.html` or clean form?

**Live URL behavior (verified 2026-05-13):**
- `https://robcparker.com/` → 200
- `https://robcparker.com/resume.html` → 308 → `/resume`
- `https://robcparker.com/resume` → 200
- `https://robcparker.com/how-this-site-was-built.html` → 308 → `/how-this-site-was-built`
- `https://robcparker.com/how-this-site-was-built` → 200

**Options:**
- **(a) Keep `.html` form** — canonical = `https://robcparker.com/resume.html`. Matches the convention established in SPEC-003/004/005/013; canonical strings change minimally (host only). Search engines following the canonical hit a 308 → 200 chain; the final destination is `/resume` (without `.html`), which then creates a soft conflict: canonical declares `/resume.html` but the URL it resolves to is `/resume`.
- **(b) Switch to clean form** — canonical = `https://robcparker.com/resume`. Matches the URL that returns 200 directly with no redirect. Removes the 308-in-canonical-chain conflict. Aligns canonical signal with the URL search engines and social previews actually land on. Larger string change (host + path).
- **(c) Mixed: canonical clean, sitemap `.html`** — explicit asymmetry. Not coherent; rejected.

**PM-Spec recommendation: (b) clean form.** Canonical best practice is to point at the URL the resource lives at after all redirects resolve. Pointing canonical at a URL that 308s contradicts the redirect's "the canonical URL is the target" semantics. Cloudflare's clean-URL behavior is the live convention; codifying it as canonical removes the conflict permanently. The string change is mechanical (drop `.html` in six places per page-set, plus six sitemap entries) and is already a Pre-Implementation String Lock candidate.

### Q2: Should `CLAUDE.md` line 11 be updated as part of this spec?

`CLAUDE.md:11` reads: `**URL:** https://www.robcparker.com`. This is internal project documentation, not a search-engine signal. Updating it is a one-line edit; leaving it stale would be the only remaining www reference in non-spec code.

**Options:**
- **(a) Update in this spec** — single-line consistency improvement; no risk; matches the rest of the work.
- **(b) Leave for a separate cleanup** — strictly speaking outside the canonical-signal scope.

**PM-Spec recommendation: (a) update in this spec.** Trivial line; in the spirit of "single coherent migration"; avoids leaving a known-stale reference in the load-bearing project doc.

### Q3: How should `governance/stack-quirks.md` be updated post-migration?

The current Cloudflare section (lines 33-34) frames the mismatch as: "The repo's existing `<link rel="canonical">` and OG/sitemap URLs still point to `www.robcparker.com/...html` — this mismatch is a real SEO concern logged as a `specs/backlog.md` candidate." This framing is correct *before* SPEC-018; it becomes false the moment SPEC-018 ships.

**Options:**
- **(a) Update the existing entry to record the convention.** Replace the mismatch-as-backlog-item sentence with "Canonical convention is the apex with clean URLs; established by SPEC-018 (2026-05-13)." Keeps the entry as the single source of truth for the Cloudflare gotcha.
- **(b) Add a new entry; leave the old as historical record.** Two entries; one historical.

**PM-Spec recommendation: (a) update in place.** The stack-quirks file is operational reference, not changelog. The whole point of the entry is "what's the apex/www situation right now" — and right now after this spec is shipped is "apex is canonical." Update keeps the doc actionable.

### Q4: Should shipped spec body files be updated to match the new convention?

SPEC-002, -003, -004, -005, -006, -013, -016 contain `https://www.robcparker.com/...html` URLs in their body text as historical records of what was decided when.

**Options:**
- **(a) Leave as-is** — per SPEC-015 R3 convention (shipped specs are the historical record; don't retroactively rewrite). The www URLs there are correct as the record of pre-SPEC-018 state.
- **(b) Rewrite shipped specs** — would consolidate "what's the convention" in every spec body, but invalidates the historical-record property and inflates this spec's blast radius significantly (7 specs, dozens of mentions).

**PM-Spec recommendation: (a) leave as-is.** Codified in SPEC-015 R3; the project has been consistent about this; doing otherwise loses traceability.

### Q5: Should we instead fix this at the Cloudflare DNS layer (make www work) and leave canonicals as-is?

Alternative path entirely outside SDD: configure Cloudflare to serve the same site at both `https://www.robcparker.com/` and `https://robcparker.com/`, with one canonical via 301 redirect to the other. This would let the existing canonicals stay correct.

**Options:**
- **(a) Proceed with SPEC-018 as drafted (canonicals migrate to apex).** Solves the canonical-form question (Q1) as part of the same change. Version-controlled, traceable, reversible.
- **(b) Skip SPEC-018; fix at Cloudflare instead.** Operator work, not in the SDD pipeline. Doesn't address the .html vs clean URL conflict (the 308 chain stays). Cloudflare config is not version-controlled in this repo.
- **(c) Both: fix Cloudflare AND migrate canonicals.** Over-engineered for the current site scale.

**PM-Spec recommendation: (a) proceed with SPEC-018.** Code-level fix is the durable, version-controlled answer; matches the live URL the site actually serves; solves the .html vs clean question in the same change.

### Q6: Open a follow-on operator ticket for `www.robcparker.com` → apex 301 at Cloudflare?

Independent of SPEC-018's canonical migration: the `www` subdomain currently returns 522. Any historical share (LinkedIn post, email signature, an older social-card cache, a search-engine-indexed `www` URL) continues to fail post-deploy. Configuring Cloudflare to 301 `www` → apex closes that loss permanently.

**Options:**
- **(a) Open a follow-on `OPERATOR-TODOS.md` item.** Track separately; not bundled into SPEC-018. The canonical migration ships clean; the operator action happens on Rob's schedule.
- **(b) Treat as accepted loss; no follow-on.** Pre-existing condition. Inbound www traffic was already broken; this spec doesn't make it worse.
- **(c) Bundle Cloudflare config work into a sibling spec.** Heavier; not on the critical path.

**PM-Spec recommendation: (a) open follow-on operator ticket.** Low-effort permanent fix; closes a real SEO/share-loss surface that SPEC-018 does not address. Tracked outside the SDD pipeline because it is Cloudflare-dashboard work, not code.

## Acceptance Criteria

The exact strings get locked at Arch Gate. These ACs are framed against the post-deploy live state:

- **AC-1: All canonicals on apex.** `curl -s https://robcparker.com/<path> | grep '<link rel="canonical"'` returns the apex-form URL for each of the 6 pages (with `<path>` = `/`, `/about`, `/resume`, `/contact`, `/advisory`, `/how-this-site-was-built` assuming Q1 = clean; equivalent `.html` paths if Q1 = `.html`).
- **AC-2: No www in HTML/XML/TXT at repo root.** `grep -rn "www.robcparker.com" --include="*.html" --include="*.xml" --include="*.txt"` returns **0 matches**, full stop. The `--include` filter excludes `.md` files entirely, so historical mentions in `specs/` / `governance/` / `.claude/` / `checklists/` / `OPERATOR-TODOS.md` (all `.md`) do not appear in this sweep. Both raw count and true-positive count are asserted to be exactly 0. (For the broader informational full-repo sweep including `.md` historical record, see IG-4 in Arch Gate; predicted raw band is 65–95, asserted true-positives 0.)
- **AC-3: sitemap.xml on apex with chosen path form.** `curl -s https://robcparker.com/sitemap.xml` returns 200 with all 6 `<loc>` entries on the apex host and in the path form chosen at Q1.
- **AC-4: robots.txt Sitemap directive on apex.** `curl -s https://robcparker.com/robots.txt` returns 200 with `Sitemap: https://robcparker.com/sitemap.xml`.
- **AC-5: OG image fetchable.** `curl -sI https://robcparker.com/images/og/og-card.png` returns 200 (and for SPEC-016's variant: `og-card-how-this-site-was-built.png`). Verifies the OG image URL change resolves on the apex.
- **AC-6: JSON-LD Person `url` and `image` on apex.** Each page's Person JSON-LD block has `"url": "https://robcparker.com/"` and `"image": "https://robcparker.com/images/rob-parker-headshot@2x.jpg"`.
- **AC-7: governance/stack-quirks.md reflects new convention.** Two greppable assertions: (i) `grep -n "specs/backlog.md candidate" governance/stack-quirks.md` returns 0 matches; (ii) `grep -n "SPEC-018" governance/stack-quirks.md` returns ≥1 match in the Cloudflare section.
- **AC-8: specs/backlog.md no longer lists the canonical mismatch.** Lines 30-38 (the original entry) are gone.
- **AC-9: Existing 308 redirects unbroken.** `curl -sI https://robcparker.com/resume.html` still returns 308 with `Location: /resume`. Spec doesn't touch redirect behavior; this AC is a no-regression check.
- **AC-10: www host still returns 522 (no Cloudflare DNS change).** `curl -sI --max-time 8 https://www.robcparker.com/` returns 522. Confirms the spec did not implicitly attempt a DNS fix.

- **AC-11: CLAUDE.md URL declaration on apex.** `grep -n "https://www.robcparker.com" CLAUDE.md` returns 0 matches; `grep -n "https://robcparker.com" CLAUDE.md` returns ≥1 match (the line 11 URL declaration).

## Risk + Reversibility

| Risk | Likelihood | Severity | Mitigation |
|---|---|---|---|
| Canonical-path-form decision (Q1) reversed later | Low | Low | Pure string migration; rerun in reverse. Codify the chosen form in stack-quirks so future contributors don't drift. |
| Some absolute-URL surface missed in the lock | Medium | Medium | Pre-Implementation String Lock at Arch Gate enumerates every byte; post-edit grep at Implementation verifies residual count = 0; QA Gate re-verifies; Deploy Gate verifies on live host. Four overlapping checks. |
| Social-share preview caches show old www URLs | High | Low | Pre-existing; Facebook/LinkedIn/Twitter cache OG cards for ~24h–7d. Submit cache refresh manually post-deploy if any specific shareable URL needs it. Out of acceptance criteria; logged as operator follow-on. |
| Google Search Console has crawl records pointing at www | Medium | Low | GSC will re-crawl on its own cadence; canonical-on-apex signal will propagate within a crawl cycle. No action required. |
| Indentation or whitespace variants of www URLs missed | Low | Low | Per CLAUDE.md "post-edit grep" pattern: after `replace_all`, run a follow-up grep stripped of whitespace to catch variants. |
| 308 redirects from `.html` paths break (if Q1 = clean) | Low | High | Spec does not touch Cloudflare config or routing. AC-9 verifies. |
| Build/deploy fails post-merge (Cloudflare Pages parse error) | Very Low | Medium | Sitemap.xml change is XML-valid text. HTML changes are within `<head>` tags. Robots.txt change is one line. No structural risk to the build. |

**Reversibility: high.** Pure string migration; revertable via `git revert <merge-sha>`. Cloudflare auto-deploys the revert within ~1–2 minutes per `governance/stack-quirks.md`.

## Dependencies

- **None blocking.** Site is live; convention is established as a backlog item; promotion criteria met.
- **Promotion source:** `specs/backlog.md` lines 30-38, dated 2026-05-09, surfaced at SPEC-015 Deploy Gate.
- **Consumes:** the live Cloudflare Pages clean-URL behavior (308s on `.html` paths). Codified in `governance/stack-quirks.md`.
- **Sets precedent for:** future content additions. Q1's resolution becomes the going-forward canonical convention; new pages adopt the chosen form from the first commit.

## Arch Gate Review (2026-05-13)

Conducted by `architect-reviewer` (Layer 2). No `penetration-tester` invocation: SPEC-018 is byte-string URL migration with zero injection surface, no user input handling, no auth/payment scope. Standard-tier non-security-relevant default per spec-pipeline skill.

### Architectural findings

| ID | Severity | Finding | Disposition |
|---|---|---|---|
| AG-1 | Should-fix | R5 stack-quirks edit must be surgical, not replace_all on the Cloudflare paragraph. | **Accepted.** Targeted Edit on the apex/www-mismatch substring only; preserves Turnstile + 308 context. See IG-3. |
| AG-2 | Should-fix | AC-2's 6–15 raw-count range was the wrong shape: `--include=*.html,*.xml,*.txt` excludes `.md`, so the actual residual is 0 outright. | **Accepted.** AC-2 rewritten — both raw and true-positive counts asserted = 0; broader informational sweep moved to IG-4. |
| AG-3 | Should-fix | Home page canonical/og:url is `https://robcparker.com/` (trailing slash) — explicit lock-stage callout needed to prevent a one-character regression. | **Accepted.** Lock invariants line in PART B; SPEC-013 IG-3 prior art preserved. |
| AG-4 | Nice-to-have | JSON-LD `url` is the Person entity homepage on every page (SPEC-013 IG-4); lock must NOT switch to per-page URLs. | **Accepted.** Lock invariants line in PART B. |
| AG-5 | Nice-to-have | No AC verified CLAUDE.md:11 was updated. | **Accepted.** AC-11 added. |
| AG-6 | Nice-to-have | OPERATOR-TODOS.md ticket text should be surfaced as an IG artifact for paste post-merge. | **Accepted.** IG-5 produces the suggested text. |
| AG-7 | Nice-to-have | AC-10 `--max-time 8` is harmless but unnecessary. | **Accepted as-is** (harmless; no change). |

### Pre-Implementation String Lock — 43 surfaces

All replacements: `https://www.robcparker.com` → `https://robcparker.com`. The 12 sub-page path surfaces (canonical + og:url across 5 sub-pages + how-this-site-was-built) and 5 sitemap entries also drop `.html`; home `/` paths keep the trailing slash unchanged.

| # | File | Line | Old string | New string |
|---|---|---|---|---|
| 1 | index.html | 13 | `<link rel="canonical" href="https://www.robcparker.com/">` | `<link rel="canonical" href="https://robcparker.com/">` |
| 2 | index.html | 17 | `<meta property="og:url" content="https://www.robcparker.com/">` | `<meta property="og:url" content="https://robcparker.com/">` |
| 3 | index.html | 21 | `<meta property="og:image" content="https://www.robcparker.com/images/og/og-card.png">` | `<meta property="og:image" content="https://robcparker.com/images/og/og-card.png">` |
| 4 | index.html | 30 | `<meta name="twitter:image" content="https://www.robcparker.com/images/og/og-card.png">` | `<meta name="twitter:image" content="https://robcparker.com/images/og/og-card.png">` |
| 5 | index.html | 42 | `"image": "https://www.robcparker.com/images/rob-parker-headshot@2x.jpg",` | `"image": "https://robcparker.com/images/rob-parker-headshot@2x.jpg",` |
| 6 | index.html | 43 | `"url": "https://www.robcparker.com/",` | `"url": "https://robcparker.com/",` |
| 7 | about.html | 12 | `<link rel="canonical" href="https://www.robcparker.com/about.html">` | `<link rel="canonical" href="https://robcparker.com/about">` |
| 8 | about.html | 18 | `<meta property="og:url" content="https://www.robcparker.com/about.html">` | `<meta property="og:url" content="https://robcparker.com/about">` |
| 9 | about.html | 22 | `<meta property="og:image" content="https://www.robcparker.com/images/og/og-card.png">` | `<meta property="og:image" content="https://robcparker.com/images/og/og-card.png">` |
| 10 | about.html | 31 | `<meta name="twitter:image" content="https://www.robcparker.com/images/og/og-card.png">` | `<meta name="twitter:image" content="https://robcparker.com/images/og/og-card.png">` |
| 11 | about.html | 43 | `"image": "https://www.robcparker.com/images/rob-parker-headshot@2x.jpg",` | `"image": "https://robcparker.com/images/rob-parker-headshot@2x.jpg",` |
| 12 | about.html | 44 | `"url": "https://www.robcparker.com/",` | `"url": "https://robcparker.com/",` |
| 13 | resume.html | 13 | `<link rel="canonical" href="https://www.robcparker.com/resume.html">` | `<link rel="canonical" href="https://robcparker.com/resume">` |
| 14 | resume.html | 19 | `<meta property="og:url" content="https://www.robcparker.com/resume.html">` | `<meta property="og:url" content="https://robcparker.com/resume">` |
| 15 | resume.html | 23 | `<meta property="og:image" content="https://www.robcparker.com/images/og/og-card.png">` | `<meta property="og:image" content="https://robcparker.com/images/og/og-card.png">` |
| 16 | resume.html | 32 | `<meta name="twitter:image" content="https://www.robcparker.com/images/og/og-card.png">` | `<meta name="twitter:image" content="https://robcparker.com/images/og/og-card.png">` |
| 17 | resume.html | 44 | `"image": "https://www.robcparker.com/images/rob-parker-headshot@2x.jpg",` | `"image": "https://robcparker.com/images/rob-parker-headshot@2x.jpg",` |
| 18 | resume.html | 45 | `"url": "https://www.robcparker.com/",` | `"url": "https://robcparker.com/",` |
| 19 | contact.html | 14 | `<link rel="canonical" href="https://www.robcparker.com/contact.html">` | `<link rel="canonical" href="https://robcparker.com/contact">` |
| 20 | contact.html | 19 | `<meta property="og:url" content="https://www.robcparker.com/contact.html">` | `<meta property="og:url" content="https://robcparker.com/contact">` |
| 21 | contact.html | 23 | `<meta property="og:image" content="https://www.robcparker.com/images/og/og-card.png">` | `<meta property="og:image" content="https://robcparker.com/images/og/og-card.png">` |
| 22 | contact.html | 32 | `<meta name="twitter:image" content="https://www.robcparker.com/images/og/og-card.png">` | `<meta name="twitter:image" content="https://robcparker.com/images/og/og-card.png">` |
| 23 | contact.html | 44 | `"image": "https://www.robcparker.com/images/rob-parker-headshot@2x.jpg",` | `"image": "https://robcparker.com/images/rob-parker-headshot@2x.jpg",` |
| 24 | contact.html | 45 | `"url": "https://www.robcparker.com/",` | `"url": "https://robcparker.com/",` |
| 25 | advisory.html | 11 | `<link rel="canonical" href="https://www.robcparker.com/advisory.html">` | `<link rel="canonical" href="https://robcparker.com/advisory">` |
| 26 | advisory.html | 16 | `<meta property="og:url" content="https://www.robcparker.com/advisory.html">` | `<meta property="og:url" content="https://robcparker.com/advisory">` |
| 27 | advisory.html | 20 | `<meta property="og:image" content="https://www.robcparker.com/images/og/og-card.png">` | `<meta property="og:image" content="https://robcparker.com/images/og/og-card.png">` |
| 28 | advisory.html | 29 | `<meta name="twitter:image" content="https://www.robcparker.com/images/og/og-card.png">` | `<meta name="twitter:image" content="https://robcparker.com/images/og/og-card.png">` |
| 29 | advisory.html | 41 | `"image": "https://www.robcparker.com/images/rob-parker-headshot@2x.jpg",` | `"image": "https://robcparker.com/images/rob-parker-headshot@2x.jpg",` |
| 30 | advisory.html | 42 | `"url": "https://www.robcparker.com/",` | `"url": "https://robcparker.com/",` |
| 31 | how-this-site-was-built.html | 11 | `<link rel="canonical" href="https://www.robcparker.com/how-this-site-was-built.html">` | `<link rel="canonical" href="https://robcparker.com/how-this-site-was-built">` |
| 32 | how-this-site-was-built.html | 15 | `<meta property="og:url" content="https://www.robcparker.com/how-this-site-was-built.html">` | `<meta property="og:url" content="https://robcparker.com/how-this-site-was-built">` |
| 33 | how-this-site-was-built.html | 18 | `<meta property="og:image" content="https://www.robcparker.com/images/og/og-card-how-this-site-was-built.png">` | `<meta property="og:image" content="https://robcparker.com/images/og/og-card-how-this-site-was-built.png">` |
| 34 | how-this-site-was-built.html | 27 | `<meta name="twitter:image" content="https://www.robcparker.com/images/og/og-card-how-this-site-was-built.png">` | `<meta name="twitter:image" content="https://robcparker.com/images/og/og-card-how-this-site-was-built.png">` |
| 35 | how-this-site-was-built.html | 39 | `"image": "https://www.robcparker.com/images/rob-parker-headshot@2x.jpg",` | `"image": "https://robcparker.com/images/rob-parker-headshot@2x.jpg",` |
| 36 | how-this-site-was-built.html | 40 | `"url": "https://www.robcparker.com/",` | `"url": "https://robcparker.com/",` |
| 37 | sitemap.xml | 4 | `<loc>https://www.robcparker.com/</loc>` | `<loc>https://robcparker.com/</loc>` |
| 38 | sitemap.xml | 10 | `<loc>https://www.robcparker.com/about.html</loc>` | `<loc>https://robcparker.com/about</loc>` |
| 39 | sitemap.xml | 16 | `<loc>https://www.robcparker.com/resume.html</loc>` | `<loc>https://robcparker.com/resume</loc>` |
| 40 | sitemap.xml | 22 | `<loc>https://www.robcparker.com/how-this-site-was-built.html</loc>` | `<loc>https://robcparker.com/how-this-site-was-built</loc>` |
| 41 | sitemap.xml | 28 | `<loc>https://www.robcparker.com/contact.html</loc>` | `<loc>https://robcparker.com/contact</loc>` |
| 42 | sitemap.xml | 34 | `<loc>https://www.robcparker.com/advisory.html</loc>` | `<loc>https://robcparker.com/advisory</loc>` |
| 43 | robots.txt | 4 | `Sitemap: https://www.robcparker.com/sitemap.xml` | `Sitemap: https://robcparker.com/sitemap.xml` |

**Lock invariants:**
- Surfaces 1, 2, 6, 12, 18, 24, 30, 36, 37: **home-form (`/`) — host changes only, NO path edit. DO NOT drop the trailing slash.** SPEC-013 IG-3 prior art.
- Surfaces 5, 11, 17, 23, 29, 35: JSON-LD `image` — host changes only.
- Surfaces 6, 12, 18, 24, 30, 36: JSON-LD `url` is the **Person entity homepage** (SPEC-013 IG-4); host changes only — do NOT switch to per-page URL.
- Surfaces 3, 4, 9, 10, 15, 16, 21, 22, 27, 28, 33, 34: image path absolute URLs — host changes only.

### Implementation Guidance (IG)

**IG-1 (CLAUDE.md:11 — Q2):**
- Old: `**URL:** https://www.robcparker.com`
- New: `**URL:** https://robcparker.com`
- Single-line targeted edit; re-read post-edit per CLAUDE.md edit-safety rule.

**IG-2 (specs/backlog.md — R6):** Delete the `### Canonical-tag / live-URL host mismatch (apex vs. www)` entry (lines 30–38 inclusive) along with one trailing blank line so the next sibling `### Rebrand-credibility sentence…` heading is separated by exactly one blank line. Targeted edit, not replace_all.

**IG-3 (governance/stack-quirks.md — R5):** Surgical replacement on line 34 within the Cloudflare-section paragraph.

- Old substring:
  > `For live-site verification, hit the apex with clean paths or use \`curl -L\` to follow the 308. The repo's existing \`<link rel="canonical">\` and OG/sitemap URLs still point to \`www.robcparker.com/...html\` — this mismatch is a real SEO concern logged as a \`specs/backlog.md\` candidate (canonical-tag / live-URL host mismatch). Established in SPEC-015 Deploy Gate (2026-05-09).`

- New substring:
  > `For live-site verification, hit the apex with clean paths or use \`curl -L\` to follow the 308. Canonical convention is the **apex with clean URLs** (e.g., \`https://robcparker.com/resume\`, not \`https://www.robcparker.com/resume.html\`); all \`<link rel="canonical">\`, OG/Twitter, JSON-LD, sitemap \`<loc>\`, and robots.txt \`Sitemap:\` URLs use this form. Home canonical retains the trailing slash (\`https://robcparker.com/\`). Established in SPEC-015 Deploy Gate (2026-05-09); convention codified in SPEC-018 (2026-05-13).`

Preserves the Turnstile sentence and Cloudflare Pages 308 fact ahead of the edited region. Post-edit, re-read lines 30–36 to confirm no clobber.

**IG-4 (Post-edit verification — predicted residual ranges):**

In-scope sweep (HTML/XML/TXT at repo root):
```
grep -rn "www\.robcparker\.com" --include="*.html" --include="*.xml" --include="*.txt"
```
- **Asserted raw count post-edit:** 0
- **Asserted true-positive count:** 0

Full-repo sweep (informational only):
```
grep -rn "www\.robcparker\.com" .
```
- **Pre-edit raw count (verified 2026-05-13):** 115
- **Predicted post-edit raw count band:** **65–95** (43 in-scope removals + IG-1 + IG-3 + IG-2 ≈ 47 removals; lock-stage spec body additions add ~5–15; landing band informational)
- **Asserted true-positive count:** 0 active canonical signals; all remaining matches are historical mentions in `specs/`, `checklists/`, `.claude/`, and SPEC-018's own body (per Q4: shipped specs untouched)
- If raw count exceeds 95: investigate for newly-introduced active references. Below or within range is passing.

**IG-5 (OPERATOR-TODOS.md ticket text — Q6 follow-on; user pastes post-merge into local-gitignored file):**

```
### Cloudflare: 301 www → apex for robcparker.com

- Source: SPEC-018 Q6 resolution (2026-05-13).
- What: Configure Cloudflare to serve https://www.robcparker.com/* as a permanent 301
  redirect to https://robcparker.com/* (preserving path). Currently www returns HTTP 522.
- Why: Any historical inbound link (LinkedIn post, email signature, indexed www URL,
  cached social-share card) continues to fail until www is a working redirect target.
  SPEC-018 fixed the canonical signal in code; this fixes the live host.
- How: Cloudflare dashboard → Pages → robcparker.com project → Custom domains, or
  Cloudflare Rules → Redirect Rules at the zone level (whichever operator prefers).
  301 (permanent), preserve path and query string, force HTTPS.
- Verify: `curl -sI https://www.robcparker.com/resume` returns 301 with
  Location: https://robcparker.com/resume.
- Tier estimate: Operator (Cloudflare-dashboard work, not code).
- Status: Open.
- Date added: 2026-05-13.
```

**IG-6 (Edit ordering recommendation):** Batch by file to minimize re-read overhead. Suggested order: `index.html` → `about.html` → `resume.html` → `contact.html` → `advisory.html` → `how-this-site-was-built.html` → `sitemap.xml` → `robots.txt` → `CLAUDE.md` → `governance/stack-quirks.md` → `specs/backlog.md`. Run IG-4 in-scope grep after each HTML file; running raw count should decrement by 6 per HTML file, 6 for sitemap, 1 for robots, then 1 for CLAUDE.md, 1 for stack-quirks paragraph, 2 for backlog entry = 47 in-scope removals total.

**IG-7 (AC-2 wording correction):** AC-2 is already corrected in this spec revision (raw + true-positive both asserted = 0; informational broader sweep moved to IG-4). No additional action required.

**Arch Gate Decision:** Approved 2026-05-13 with conditions absorbed — implementation may begin. AG-2 was the load-bearing catch: AC-2's residual-count range was the wrong shape because `--include` filters excluded the `.md` files the range was estimating; correcting the assertion to "0, full stop" + moving the broader sweep to IG-4 prevents a false-positive QA failure on a number that didn't apply to the sweep it filters.

## Implementation Notes (2026-05-13)

Implementation walked IG-1 through IG-7 in IG-6 order. All 43 in-scope lock surfaces migrated byte-correctly; lock invariants verified intact (home trailing slash on 9 surfaces, JSON-LD `url` homepage-canonical on all 6 pages, SPEC-016 OG image variant preserved).

### Verification results (local pre-deploy)

| Check | Predicted | Actual | Status |
|---|---|---|---|
| AC-2 in-scope sweep | 0 | 0 | PASS |
| AC-7 stack-quirks (specs/backlog.md candidate framing removed) | 0 | 0 | PASS |
| AC-7 stack-quirks (SPEC-018 attribution present) | ≥1 | 1 | PASS |
| AC-8 backlog entry removed | 0 | 0 | PASS |
| AC-11 CLAUDE.md migrated | 0 www / ≥1 apex | 0 / 1 | PASS |
| IG-4 full-repo raw (informational) | 65–95 band | 119 | Below band — see Finding 1 |

### Finding 1: IG-4 full-repo informational band was too narrow

The architect predicted the full-repo `www.robcparker.com` raw count would land at 65–95 post-edit. Actual landed at **119**, with **52 historical mentions outside SPEC-018's own body** (67 within SPEC-018's lock table per Q4 — those are intentional and stay).

**Root cause:** The architect's pre-edit baseline (115 mentions) was measured BEFORE SPEC-018's Arch Gate commit added the 43-row lock table (which itself contains 67 www mentions in its old-string column). The actual pre-edit baseline at implementation time was 165, not 115. The architect's reduction estimate (~47 active migrations) was accurate (actual delta: 46); only the absolute band was offset.

**Disposition:** Benign. Asserted true-positive count is still 0 (no active canonical signals remain on www). The 52 non-SPEC-018-body mentions are all historical record in shipped specs, checklists, governance/stack-quirks.md's new example string, and `.claude/skills/` — all explicitly out of scope per Q4. Logging as a process observation: future Arch-Gate range estimates should account for the spec body's own contribution to the full-repo grep when the lock table is large and quoted verbatim.

### Finding 2: Lock-stage spec body addition smaller than predicted

IG-4 predicted "~5–15" lock-stage additions to SPEC-018's body during implementation. Actual additions to SPEC-018's body during this Implementation stage: this Implementation Notes section contains 2 www mentions (in the architect prediction discussion above). Materially smaller than the upper bound; consistent with the lower bound. No spec retention deviation.

### Edits inventory (47 active migrations, matching IG-6 prediction)

- 36 HTML surfaces across 6 pages (index, about, resume, contact, advisory, how-this-site-was-built)
- 6 sitemap.xml `<loc>` entries
- 1 robots.txt `Sitemap:` directive
- 1 CLAUDE.md URL declaration (IG-1)
- 1 governance/stack-quirks.md Cloudflare paragraph (IG-3)
- 2 specs/backlog.md mentions removed via entry deletion (IG-2)

Total: 47 active migrations. Matches IG-6 prediction exactly.

### Operator-side follow-on

IG-5 OPERATOR-TODOS.md ticket text (Cloudflare www→apex 301) is to be pasted into the local-gitignored `OPERATOR-TODOS.md` post-merge by Rob, on his own schedule. Not part of this commit (file is gitignored per SPEC-017).

## Spec Gate Open Question Summary

| Q# | Topic | PM-Spec Recommendation | Resolution |
|---|---|---|---|
| Q1 | `.html` vs clean canonical path form | **(b) clean form** | **(b) clean form** |
| Q2 | Include `CLAUDE.md:11` URL update | **(a) yes** | **(a) update in this spec** |
| Q3 | `governance/stack-quirks.md` update style | **(a) update in place** | **(a) update in place** |
| Q4 | Rewrite shipped specs to new convention | **(a) leave as-is** | **(a) leave as-is** |
| Q5 | DNS-level fix instead of canonical migration | **(a) proceed as drafted** | **(a) proceed as drafted** |
| Q6 | Follow-on operator ticket for `www`→apex 301 | **(a) open follow-on in `OPERATOR-TODOS.md`** | **(a) open follow-on ticket** |

## Spec Gate Resolutions (2026-05-13)

| Q# | Topic | Resolution |
|---|---|---|
| Q1 | Canonical path form | Clean URLs (no `.html`) — match the URL that returns 200 directly. Apply uniformly across all 6 HTML pages, sitemap.xml, robots.txt. Home page canonical stays `https://robcparker.com/` (trailing slash, no path) — already correct in spirit. |
| Q2 | `CLAUDE.md` line 11 | Update in this spec from `https://www.robcparker.com` to `https://robcparker.com`. Single-line edit included in the migration commit. |
| Q3 | `governance/stack-quirks.md` Cloudflare section | Update in place: remove the "mismatch is a backlog item" framing; replace with the apex/clean-URL convention statement attributed to SPEC-018 (2026-05-13). |
| Q4 | Shipped spec body files | Leave as-is. SPEC-002/003/004/005/006/013/016 are the historical record; SPEC-015 R3 convention applies. www URLs in them are correct as the record of pre-SPEC-018 state. |
| Q5 | DNS-layer alternative | Proceed with SPEC-018 as drafted. Code-level fix is version-controlled, traceable, reversible. |
| Q6 | `www`→apex 301 follow-on | Open a follow-on `OPERATOR-TODOS.md` ticket. Independent of SPEC-018; tracked separately. SPEC-018 ships clean. |

**Spec Gate Decision:** Approved 2026-05-13. Resolved the canonical-form sub-decision (Q1: clean URLs over `.html`) before Arch Gate so the Pre-Implementation String Lock has a single coherent target; promoted www→apex 301 follow-on from a silently-accepted trade-off to an explicit operator ticket (Q6).
