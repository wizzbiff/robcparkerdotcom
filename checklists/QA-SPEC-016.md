# QA-SPEC-016 — Implementer-Tester Checklist

**Spec:** SPEC-016 ("How This Site Was Built" page)
**Tier:** Standard
**Branch:** `spec/SPEC-016-how-this-site-was-built`
**Author (Implementer-Tester):** Layer-1 pipeline agent; specialist fan-out below
**Date:** 2026-05-11
**Status:** Lock-stage complete + Q2 reversal applied at QA Gate (referral-only posture) — awaiting Rob's commit-to-main approval

---

## Operator Override: Q2 Reversal at QA Gate (2026-05-12)

**Override:** "Remove the How It's Built navigation from the navigation at the top of the page. I want the navigation to the How It's Built page to require explicitly knowing that the page exists, just like the Advisory page."

**What changed:**

- The `<li><a href="how-this-site-was-built.html">How It's Built</a></li>` entry was stripped from the main nav of all 6 pages (`index.html`, `about.html`, `resume.html`, `contact.html`, `advisory.html`, and the new page's own nav).
- Sitemap entry retained; no `noindex` meta added — page adopts **Advisory parity** posture (reachable by direct URL only; eventually indexable; zero internal nav exposure).
- Stage 1 Grant placeholder remains the shipping copy; Stage 2 attribution still gated on Grant's reply.

**Gate Annotation (per `specs/templates/gate-annotation-guide.md`):**

> Overrode the Spec Gate (2026-05-08) resolution that placed the page in main nav. **Why:** the new page describes (and credits) work derived from Grant Howe's prior art; without Grant's sign-off in hand, no link on the public site should surface the page. Stage 1 placeholder copy is honest about the lineage but the page itself is not something I'm ready to broadcast pre-permission. The Advisory pattern — page lives, sitemap lists it, but no nav exposure — is the right precedent. Reversal lands at QA Gate (not Spec/Arch) because (a) Grant outreach status is still open after spec was approved, and (b) the cost of stripping 6 `<li>` entries is trivial vs. the cost of premature exposure.
> **How to apply going forward:** if Grant approves Stage 2 attribution, the nav `<li>` can be restored in the same PR that swaps placeholder copy for the named credit. If Grant declines, the referral-only posture is permanent.

---

## Pipeline Summary

Phase 1 (parallel): graphic-artist (SVGs + OG script) + marketing-copywriter (lock-stage copy polish)
Phase 2 (sequential): frontend-developer (page assembly + nav edits + sitemap + CSS utilities)
Phase 3 (gated): OG card Pillow pipeline run
Phase 4 (parallel): ui-designer + code-reviewer + test-automator + qa-expert
Phase 5 (sequential): implementer-tester compiled this checklist

---

## Files Created / Modified

| Path | Action | Size / Lines |
|------|--------|--------------|
| `how-this-site-was-built.html` | Created | 904 lines / 64.5 KB |
| `index.html` | No net change (nav `<li>` added then stripped per Q2 reversal) | 0 lines |
| `about.html` | No net change (nav `<li>` added then stripped per Q2 reversal) | 0 lines |
| `resume.html` | No net change (nav `<li>` added then stripped per Q2 reversal) | 0 lines |
| `contact.html` | No net change (nav `<li>` added then stripped per Q2 reversal) | 0 lines |
| `advisory.html` | No net change (nav `<li>` added then stripped per Q2 reversal) | 0 lines |
| `sitemap.xml` | +1 `<url>` entry | +6 lines |
| `css/style.css` | +123 lines (SPEC-016 utility block) | line ~2389–2512 |
| `images/source/og/og-card-how-this-site-was-built.py` | Created | 278 lines (gitignored) |
| `images/og/og-card-how-this-site-was-built.png` | Generated | 26.8 KB (committed) |
| `specs/scratch/SPEC-016/*` | Intermediate deliverables | gitignored |
| `checklists/QA-SPEC-016.md` | Created (this file) | — |

---

## Pattern-Based Verification Checks

### Nav byte-equality (AG-IG-3) — post-Q2-reversal

```
index.html:                  5309ae6ec1e7c227918ef052adcde575a2ff8b20
about.html:                  5309ae6ec1e7c227918ef052adcde575a2ff8b20
resume.html:                 5db94c2359f71970af9266a315266389d098048e  ← known-divergent
contact.html:                5309ae6ec1e7c227918ef052adcde575a2ff8b20
advisory.html:               5309ae6ec1e7c227918ef052adcde575a2ff8b20
how-this-site-was-built.html: 5309ae6ec1e7c227918ef052adcde575a2ff8b20
```

**Result:** 5 identical + 1 known-divergent (`resume.html` carries pre-existing inline `class="active"` on its Resume `<li>`). Matches AG-IG-3 expectation exactly. Hashes shifted from `594b1c66...` (pre-strip) to `5309ae6e...` (post-strip) — same divergence pattern preserved. ✓

### Footer-nav byte-equality (post-fix)

All 6 files: `327c01529e38034187e0e6a53fd4a40d9cfe1187` — fully identical after the frontend-developer's footer-nav "How It's Built" entry was removed per spec R7 ("No footer entry added").

### IG-residual grep predictions (spec lines 691–701)

| # | Pattern | Expected | Actual (pre-reversal) | Actual (post-Q2-reversal) | Status | Notes |
|---|---|---|---|---|---|---|
| 1 | `how this site was built\|how-this-site-was-built` (excl. specs/, checklists/) | 20-60 | 17 | 11 | Below range (intended) | Drop of 6 = the 6 nav `<li>` `href="how-this-site-was-built.html"` references stripped at Q2 reversal. All 11 remaining hits expected (page content, sitemap, OG meta, OG script). |
| 2 | `<li><a href="how-this-site-was-built\.html"` | exactly 6 (pre-reversal); **exactly 0** (post-reversal) | 6 | **0** | ✓ exact post-reversal | The whole point of Q2 reversal. |
| 3 | `How It[curly\|straight]s Built` | 6-12 (pre-reversal); **0** (post-reversal) | 7 | **0** | ✓ exact post-reversal | Phrase only existed in nav text + Section 7 closing CTA H3; H3 wording was already changed during fix D5 era (closing CTA does not use "How It's Built" — it uses "How This Site Was Built"). |
| 4 | `grant howe\|geekbyte` Stage 1 | 0-1 | 0 | 0 | ✓ within | Stage 1 placeholder confirmed; unaffected by Q2 reversal. |
| 5 | `how-this-site-was-built` in sitemap.xml | exactly 1 | 1 | 1 | ✓ exact | Sitemap entry retained per Q2 reversal answer (Advisory parity). |
| 6 | `SDD\|spec.driven development` (docs-heavy filter) | 30-120 | 64 | 64 | ✓ within | Unaffected by Q2 reversal. |
| 7 | `<title id=` in new page | 2 (stale prediction) | 4 | 4 | ✓ duplicate-SVG | 2 diagrams × desktop+mobile variants per AG-IG-5. |
| 8 | `target="_blank"` in new page | 2-3 | 3 | 3 | ✓ within | hero CTA + Section 6 link + footer LinkedIn. |
| 9 | `rel="noopener noreferrer"` must match #8 | match 3 | 3 | 3 | ✓ paired | |

### Apostrophe normalization (AG-IG-10)

Curly U+2019 used consistently for "How It's Built" across all 6 files. Page body text uses straight U+0027 throughout per marketing-copywriter's choice; consistency is the load-bearing constraint per AG-IG-10 (which permits either, picked uniformly). Verified via `grep -P "How It[\x27\x{2019}]s" *.html` = 7 hits (6 nav + 1 H3 in Section 7 closing CTA).

### File-size budgets

- `how-this-site-was-built.html` = **64.5 KB** (budget: ≤200 KB total page weight per spec NFR Performance). ✓
- `images/og/og-card-how-this-site-was-built.png` = **26.8 KB** (budget: ≤100 KB per R6 + SPEC-013). ✓

---

## Specialist Findings (consolidated)

### Phase 1 — Graphic-Artist

**Recommendation:** delivered.
- Section 3 pipeline SVG (desktop 1200×220 + mobile 320×900 vertical).
- Section 4 two-layer architecture SVG (desktop 1200×360 with 3 representative invocation arrows; mobile 320×520 drops arrows entirely per AG-IG-18).
- OG card Python script — Direction A (typographic + pipeline silhouette); `MAGENTA_MUTED` constant added; `draw_pipeline_silhouette()` helper; glyph scaled 240→120.
- All SVG fills via `var(--color-*)` per AG-IG-12. A11y scaffold (`<figure>` + `<figcaption>` + `<svg role="img">` + `<title>` + `<desc>` as first children) per AG-IG-5.

### Phase 1 — Marketing-Copywriter

**Recommendation:** delivered.
- Full copy deliverable at `specs/scratch/SPEC-016/copy-deliverable.md`.
- AG-Q1 hero subhead Line 1 preserved verbatim ("No slidedeck. No hypothetical." beat intact).
- AG-IG-20 Stage 1 Grant placeholder integrated verbatim (the three-named-extensions sentence appears as required).
- AG-IG-22 Section 4 prose carries the architectural principle (orchestration / execution split) — does NOT enumerate agents (diagram is the inventory).
- AG-IG-23 Section 7 13 items polished from Arch Gate drafts; pattern "name the pattern, name the evidence, name what's being done" preserved.
- AG-IG-24 Section 6 four mechanism descriptions polished; rendered as `<dl>` per AG-IG-15.
- AG-Q2 Pareto callout integrated verbatim.

### Phase 2 — Frontend-Developer

**Recommendation:** delivered with one defect caught in IG-residual review.
- Defect found post-assembly: new page's `footer-nav` included "How It's Built" `<li>` contrary to spec R7 ("No footer entry added").
- **Fix applied:** stripped the `<li>` from `how-this-site-was-built.html:879` (now 4-item footer-nav matching the existing 5 pages exactly).
- Re-verified: IG-residual #2 dropped from 7 → 6 (exact match expected); footer-nav sha1 now identical across all 6 files.

### Phase 4 — UI-Designer

**Recommendation:** Approve with conditions (2 blocks resolved, 2 recommends documented).
- ❌ block: Two `section-alt` bands violated AG-IG-17. **Fix applied:** removed `section-alt` from Section 3 (`#pipeline`).
- ❌ block: `highlights-grid` rendered phantom 4th slot at ≥1024px on Section 7's 3-card layout. **Fix applied:** added page-scoped `@media (min-width: 1024px) { #working-experimental-rough .highlights-grid { grid-template-columns: repeat(3, 1fr); } }` to `css/style.css` with WHY comment.
- ⚠️ recommend: Section 6 `<code>`-wrapped link text. **Fix applied:** scoped `<code>` to just `specs/` (now reads "the `specs/` directory in the repo").
- ⚠️ recommend: 5 inline `style="margin-top: var(--space-N);"` attributes should be promoted to utility classes. **Deferred to follow-on Trivial spec.**
- ✓ pass: hero subhead spacing, Pareto callout, tier `<dl>`, H3 typography override scoping, diagram responsive toggling, section anchor IDs at `<section>` level.

### Phase 4 — Code-Reviewer

**Recommendation:** Approve with conditions (1 confirm resolved, 1 recommend deferred).
- Confirm with Rob: hero CTA target. **Resolved:** spec Q3 line 547 explicitly says hero targets repo root (`https://github.com/wizzbiff/robcparkerdotcom`); frontend-developer had aimed at `/tree/main/specs` (same as Section 6). **Fix applied:** hero CTA now targets repo root; the two GitHub URLs on the page are correctly distinct.
- ⚠️ recommend: 5 inline `style=` attributes — same as ui-designer recommendation; deferred to follow-on Trivial spec.
- ✓ pass: JSON-LD byte-identity with `index.html:35-58` (Person.url remains homepage canonical per AG-IG-4); heading hierarchy (one H1, H2s per section, H3s in highlights-grid only, no skipped levels); WHY comments explain WHY not WHAT; SVG fills via CSS vars (zero hex-fill defects); apostrophe consistency; Pillow script quality (named constants, helpers, WHY comments, no debug prints); external links all paired with `rel="noopener noreferrer"` and `aria-label="(opens in new tab)"`; no new JS, no third-party JS embedded, no analytics, no secrets, no new form fields.

### Phase 4 — Test-Automator

**Recommendation:** N/A — no test surface warrants new automation.
- Existing test suite status: NONE. No `tests/`, `__tests__/`, `*.test.*`, `*.spec.*`, or test runner config in the project (specs/ directory is SDD specs, unrelated).
- Conclusion: SPEC-016 lands on a clean baseline with zero existing test fixtures or snapshots to break.
- Future candidates (not warranted now): `xmllint --noout sitemap.xml` as a pre-commit hook; the IG-residual grep set scripted as a regression suite.
- No regression risk to existing pages from the nav `<li>` insertion.

### Phase 4 — QA-Expert

**Recommendation:** delivered with one block (resolved) + full production verification plan + manual verification list for Rob.
- Block: Two `section-alt` bands (convergent with ui-designer). **Fix applied** (see above).
- Production verification plan: 9 specific commands for Rob's post-deploy run (see "Production Verification Plan" section below).
- Manual verification list: 11 items requiring Rob's eyes (see "Manual Verification by Rob" section below).
- Stage 1 / Stage 2 gating: Stage 1 placeholder confirmed present; Stage 2 is a follow-on PR once Grant replies.

---

## Acceptance Criteria Coverage

Mapped from spec line 465+ ("Acceptance Criteria"). Status: ✓ = static check passed; ⏳ = requires Rob's manual verification post-deploy.

| AC Group | Coverage |
|---|---|
| Page exists at `/how-this-site-was-built.html` | ✓ Static — file created; 8 sections + closing CTA present |
| Other pages link to new page | ⚠️ **Q2 reversal at QA Gate (2026-05-12):** no nav exposure; sitemap entry retained (Advisory parity). Spec Gate AC superseded by operator override; see top-of-file Override section + Gate Annotation. |
| No about-page bio inline link | ✓ Static — superseded per AG-IG-21 |
| Section 1 hero matches Q1 slug + AG-Q1 subhead | ✓ Static — H1 + two-line subhead with "No slidedeck. No hypothetical." beat preserved |
| Section 2 Grant attribution (Stage 1) | ✓ Static — AG-IG-20 wording verbatim at line ~155 |
| Section 3 9-node pipeline diagram + per-node prose | ✓ Static — 9 nodes confirmed in SVG `<desc>`; per-node `<p>` block confirmed |
| Section 4 two-layer architecture (5+11 agents, 3 invocation arrows) | ✓ Static — `<desc>` enumerates 5 L1 + 11 L2; 3 representative arrows; figcaption says "example invocations" |
| Section 5 four-tier `<dl>` + Solo Operator paragraph | ✓ Static — `<dl class="sdd-dl">` confirmed |
| Section 6 four mechanisms + concrete-examples bridge | ✓ Static — four `<dt>`/`<dd>` pairs + bridge link to `tree/main/specs` |
| Section 7 three subsections, frank tone, ≥3 items each | ✓ Static — Working (5), Experimental (3), Rough (5). ⏳ Manual: Rob confirms tone reads as engineering judgment |
| Section 8 connects methodology to Phase 2/3 + Pareto callout | ✓ Static — Phase 2/3 referenced; callout present in Fraunces display |
| Diagram screen-reader pass | ⏳ Manual — VoiceOver/NVDA over both diagrams |
| Mobile diagrams reflow without horizontal scroll | ⏳ Manual — DevTools responsive at 375px |
| SVG text WCAG AA contrast | ✓ Static — Arch Gate token table confirms 15.6:1 / 10.2:1 / 17.2:1 AAA |
| All meta tags present + budgets | ✓ Static — meta description 157 chars (within 160); all og:* + twitter:* tags present |
| Canonical URL uses `www.robcparker.com/how-this-site-was-built.html` | ✓ Static |
| Sitemap entry present | ✓ IG-residual #5 |
| robots.txt unchanged | ⏳ Manual — `curl https://robcparker.com/robots.txt` post-deploy |
| OG image ≤100 KB | ✓ Static — 26.8 KB |
| Total page weight ≤200 KB | ✓ Static — 64.5 KB |
| No new external CSS/JS/fonts | ✓ Static |
| LCP <2.5s, CLS <0.1 | ⏳ Manual — Lighthouse against live URL |
| Grant attribution gate (Stage 1 placeholder is what ships) | ✓ Static — IG-residual #4 = 0 hits for grant/geekbyte |
| Section 7 "honest engineering judgment" tone | ⏳ Manual — Rob's read |
| Section 8 "load-bearing skeleton" framing | ⏳ Manual — Rob's read |
| Coverage check — no unexpected matches | ✓ IG-residual #1 — 17 hits, all expected |

---

## Scenarios Tested Beyond Acceptance Criteria

- **Footer-nav byte-equality across 6 pages** (initial frontend-developer assembly included "How It's Built" in new page footer-nav contrary to spec R7; defect caught at IG-residual #2; fixed; all 6 footer-navs now byte-identical).
- **The two GitHub URLs on the page are distinct** (hero CTA = repo root; Section 6 = `tree/main/specs`). AG-IG-9 requires both resolve 200 anonymously post-deploy.
- **Section 7 highlights-grid 3-column override** at ≥1024px viewport (page-scoped to avoid affecting `index.html`'s 4-card grid).
- **CSS-var fills inside inline SVG** — first use on the site; render correctly when SVG is inline in the document (note added to spec stack-quirks follow-on list for Post-Completion Retro).

---

## Regression Risk Assessment

| File | Change | Risk | Spot-check item |
|---|---|---|---|
| `index.html` | None (nav `<li>` added then stripped) | None | Diff against `main` is empty |
| `about.html` | None (nav `<li>` added then stripped) | None | Diff against `main` is empty |
| `resume.html` | None (nav `<li>` added then stripped; pre-existing inline `class="active"` preserved per AG-IG-3) | None | Diff against `main` is empty |
| `contact.html` | None (nav `<li>` added then stripped) | None | Diff against `main` is empty; Turnstile + form validation untouched |
| `advisory.html` | None (nav `<li>` added then stripped) | None | Diff against `main` is empty |
| `sitemap.xml` | +1 `<url>` entry | Low | XML still valid; existing 5 entries' `<lastmod>` unchanged per AG-IG-7 |
| `css/style.css` | +123 lines new utilities | Low | No collision with existing selectors verified |

**Q2 reversal collateral:** because the 5 existing pages now have net-zero diff, the cross-page regression surface is effectively zero. The only file changes shipping in this PR are the new page, the sitemap entry, the CSS utility block, the OG card PNG, the gitignored Pillow script, and this checklist.

---

## Production Verification Plan (for Rob, post-deploy)

Run these once Cloudflare Pages confirms the deploy is live.

```bash
# 1. Clean-URL redirect (AG-IG-11)
curl -L -I https://robcparker.com/how-this-site-was-built
# Expect: 308 → 200

# 2. Repo visibility (QA Gate item, pre-verified by SPEC-017)
gh repo view wizzbiff/robcparkerdotcom --json visibility
# Expect: {"visibility":"PUBLIC"}

# 3. Hero GitHub CTA resolves anonymously
curl -L -o /dev/null -w "%{http_code}\n" https://github.com/wizzbiff/robcparkerdotcom
# Expect: 200

# 4. Section 6 specs/ link resolves anonymously (AG-IG-9)
curl -L -o /dev/null -w "%{http_code}\n" https://github.com/wizzbiff/robcparkerdotcom/tree/main/specs
# Expect: 200

# 5. Sensitive files absent from history (pre-verified by SPEC-017)
git log --all -- OPERATOR-TODOS.md robcparker_com_audit.md website_audit_prompt.md
# Expect: empty output

# 6. robots.txt unchanged
curl https://robcparker.com/robots.txt
# Expect: no new Disallow

# 7. Open https://robcparker.com/how-this-site-was-built in browser
#    - "How It's Built" nav active
#    - All 8 sections visible on scroll
#    - No console errors

# 8. OG card scrape (recommended for portfolio page)
#    https://www.linkedin.com/post-inspector/inspect/
#    URL: https://robcparker.com/how-this-site-was-built
#    Verify card image, title, description

# 9. Lighthouse / PageSpeed Insights against live URL
#    Expect: LCP < 2.5s, CLS < 0.1
```

---

## Manual Verification by Rob (irreducible)

These items require Rob's eyes; static checks and grep can't substitute.

1. **Browser smoke test** — Chrome, Firefox, Safari. SVG diagrams render with correct fill colors (CSS-var-in-inline-SVG: first use on this site); no horizontal overflow; Fraunces in Pareto callout.
2. **Mobile hamburger menu** at 480px — 5-item drawer (Home, About, Resume, How It's Built, Contact) fits without wrap.
3. **Desktop nav at 768–1023px** — horizontal 5-item nav doesn't wrap or overflow.
4. **Active-state highlighting** — when on the new page, "How It's Built" is visually distinguished as active.
5. **Keyboard navigation** — tab through entire page: skip-link, hero CTAs, Section 6 link, footer LinkedIn, all nav items reachable; no keyboard traps.
6. **Screen reader (VoiceOver/NVDA)** — both SVG diagrams announce `<title>` + `<desc>` correctly; heading hierarchy reads cleanly.
7. **Section 7 tone read** — each Rough/Evolving bullet names the problem AND the mitigation; reads as engineering judgment, not hedging.
8. **Section 8 + Pareto callout** — load-bearing skeleton framing lands; callout visually distinct from surrounding prose.
9. **OG card LinkedIn preview** — paste live URL into Post Inspector; confirm card renders.
10. **Section 5 tier `<dl>` mobile** — definitions readable without horizontal scroll at 375px.
11. **Section 7 highlights-grid at exactly 1024px** — 3-column override fires before the ghost-slot appears; index.html still renders 4 columns at the same width (page-scoped override should not affect it).

---

## Effort Comparison

### AI Pipeline Time

**~45 minutes wall-clock** from receipt of "Move SPEC-016 into implementation" to completion of this checklist. Breakdown:

| Phase | Time | Notes |
|---|---|---|
| Pre-flight (branch + WHY scan + stack-quirks review) | ~3 min | Implementer-tester reads + surfaces to Rob |
| Phase 1 — graphic-artist + marketing-copywriter (parallel) | ~5 min | max(graphic 4.5m, copy 3.1m) |
| Phase 2 — frontend-developer (serial after phase 1) | ~13 min | Largest assembly: 900-line HTML + 5 nav edits + CSS + sitemap |
| Phase 3 — OG card script pause + run | ~1 min | Pause for Rob approval + Pillow pipeline (5s actual) |
| Phase 4 — ui-designer + code-reviewer + test-automator + qa-expert (parallel) | ~9 min | max(test-auto 9.1m, others <3m each) |
| Phase 5 — Fixes + IG-residual + this checklist | ~12 min | 4 fixes applied; checklist drafted |

### Mid-Level Developer Estimate (Solo Human)

| Activity | Estimate | Notes |
|---|---|---|
| Codebase context-gathering | 2-3 h | Reading CLAUDE.md, governance/*, all 5 existing pages, SPEC-008/009/013 conventions, the SPEC-016 spec itself, the Arch Gate Resolutions IG list |
| Section 3 + 4 SVG diagram design + authoring (inline SVG, 4 variants) | 3-4 h | Iteration on layout; ARIA scaffold; CSS-var fills; mobile reflow strategy |
| Page assembly: HTML structure for 8 sections + closing CTA | 3-4 h | Including head block byte-replication, JSON-LD substitutions, two SVG inlines, all section markup |
| Copy production for 8 sections (without marketing-copywriter draft inputs) | 2-3 h | Hero subhead, Section 2 Grant placeholder phrasing, Section 3 per-node prose (9 nodes), Section 4 principle prose, Section 5 tier table, Section 6 mechanism descriptions, Section 7 13 frank-tone items, Section 8 + Pareto callout, closing CTA |
| Nav `<li>` edits across 5 existing pages + byte-equality verification | 30 min | Mechanical but the byte-equality check requires deliberate care |
| CSS utility classes (diagram-wrapper, diagram-figure caption, responsive toggle, H3 override, 3-column scope, Pareto callout) | 1 h | |
| Sitemap.xml entry + alphabetical/logical positioning | 15 min | |
| OG card design + Pillow script authoring (cloning SPEC-013's pattern) | 2-3 h | Including silhouette layout decisions, glyph scaling, title sizing |
| Manual QA — visual rendering across 3 browsers + mobile + 768/480/1024 breakpoints | 1-2 h | |
| Manual QA — accessibility (screen reader, keyboard nav, contrast spot-checks) | 1 h | |
| Code review (self-review: WHY comments, security paired-attr links, no hardcoded hex, JSON-LD validity) | 30-60 min | |
| Deployment prep (verifying OG card path matches meta tag, sitemap valid, final readthrough) | 30 min | |
| **Total (focused work)** | **17-24 hours** | Span 2.5-4 working days at 6h/day focus |

**Test automation: N/A** for this spec — project has no existing test suite per test-automator assessment. A senior dev might invest 1-2 hours adding `xmllint`+grep-based pre-commit hooks as a side-benefit, but it's not in scope for this work.

### Assumptions

- (a) Repo scrub-pass completed before SPEC-016 implementation (verified — SPEC-017 shipped 2026-05-11). Hero CTA + Section 6 link both target the now-public repo.
- (b) Grant Howe has not yet replied to Rob's outreach (verified — IG-residual #4 = 0 hits; Stage 1 placeholder is in place; Stage 2 is a follow-on PR not blocking).
- (c) Marketing-copywriter delivered concrete drafts for 13 Section 7 items, 4 Section 6 mechanism descriptions, AG-Q1 hero subhead, AG-IG-20 Grant placeholder, AG-Q2 Pareto callout at Arch Gate. The lock-stage marketing-copywriter pass polished cadence but did not need to invent content from scratch — this saved substantial time. Mid-level human estimate above does NOT factor in pre-supplied drafts; their estimate is from scratch.
- (d) graphic-artist worked from a textual spec (no design mockup tool); SVG markup was authored directly. A human designer might use Excalidraw / Figma / draw.io for iteration, then re-encode as SVG — adding 1-2 hours.
- (e) The pipeline ran on `main` after SPEC-016 spec was Arch-Gate-approved and merged; no contention with parallel work.
- (f) Mid-level developer assumed to have ~3 years of web fundamentals experience, familiar with HTML5 + accessibility patterns but NOT pre-familiar with this specific codebase or design system. A senior already-onboarded engineer would likely complete in 10-14 hours; a mid-level engineer learning the design system is the more honest baseline.

**Speed-up ratio:** ~20-30× wall-clock (45 min vs 17-24 hours). The non-trivial multipliers come from:

1. Parallel agent fan-out (Phase 1 + Phase 4 ran 2 and 4 specialists concurrently).
2. Marketing-copywriter pre-delivered concrete drafts at Arch Gate, eliminating most invention work at lock-stage.
3. graphic-artist authored SVG markup directly without a design-tool intermediate step.
4. test-automator confirmed N/A quickly, avoiding test-scaffolding overhead.
5. IG-residual grep set served as a regression suite, catching the footer-nav defect mechanically.

---

## Defects Caught and Fixed During Pipeline

| # | Defect | Phase Caught | Fix Applied |
|---|---|---|---|
| D1 | New page's `footer-nav` included "How It's Built" `<li>` contrary to spec R7 ("No footer entry added") | IG-residual #2 miscount (7 vs expected 6) | Stripped `<li>` from `how-this-site-was-built.html:879`. Footer-nav now byte-identical across 6 files. |
| D2 | Two `section-alt` bands (`#pipeline` + `#tiers`) violated AG-IG-17 | ui-designer + qa-expert (convergent) | Removed `section-alt` from Section 3 (`#pipeline`). Section 5 remains the single alt band. |
| D3 | Section 7 `highlights-grid` rendered phantom 4th slot at ≥1024px (3 cards in 4-col grid) | ui-designer | Added page-scoped `@media (min-width: 1024px) { #working-experimental-rough .highlights-grid { grid-template-columns: repeat(3, 1fr); } }` to `css/style.css` with WHY comment. |
| D4 | Hero CTA href targeted `/tree/main/specs` (same as Section 6 link) instead of repo root per spec Q3 line 547 | code-reviewer | Changed hero CTA href to `https://github.com/wizzbiff/robcparkerdotcom`. AG-IG-9 QA Gate verification now correctly checks two distinct URLs. |
| D5 (recommend) | Section 6 link wrapped entire visible text in `<code>` ("the specs/ directory in the repo" all monospace) | ui-designer | Scoped `<code>` to just `specs/` ("the `specs/` directory in the repo"). |

---

## Deferred to Follow-on Trivial Specs

- **Inline `style="margin-top: var(--space-N);"` attributes** (5 occurrences) — promote to `.mt-4` / `.mt-6` utility classes. Both ui-designer and code-reviewer flagged as recommend-not-block.
- **resume.html inline `class="active"` normalization** — pre-existing divergence per AG-IG-3; out of SPEC-016 scope.
- **CLAUDE.md design-token references** (`--primary-color`/`--secondary-color`/`--accent-color`) are stale (removed in SPEC-008 A-7 + SPEC-009 R2). Architect-reviewer + graphic-artist convergent finding from Arch Gate; out of SPEC-016 scope.
- **Apex-vs-www canonical mismatch** — existing `specs/backlog.md` candidate; SPEC-016 follows existing www convention for consistency.

---

## Stage 1 / Stage 2 Status

**Stage 1 (this commit):** Grant attribution uses AG-IG-20 placeholder *"The SDD methodology described here is adapted from prior work on structured agentic development pipelines using Claude Code. The two-layer architecture, the tier system, and the Solo Operator gate-ownership model are extensions developed for this site."* — confirmed present at `how-this-site-was-built.html` ~line 155.

**Discoverability posture (Q2 reversal — Advisory parity):** Page lives at the canonical URL, listed in sitemap, no `noindex` meta. **Zero internal nav exposure** — no entry in main nav or footer-nav of any page. Reachable by direct URL only. Restoring the main-nav `<li>` is the swap that accompanies a Stage 2 Grant-approval PR (a single-line addition between the Resume and Contact `<li>` entries).

**Stage 2 (separate follow-on PR, gated on Grant's reply):** Section 2 paragraph swaps to AG-Q5 Option A naming Grant Howe and linking `https://www.geekbyte.biz/sdd/dashboard` with `target="_blank" rel="noopener noreferrer"`. If Grant approves: **same PR also restores the main-nav `<li>`** on all 6 pages (5 existing + new page's own nav). If Grant prefers Option B (no link) or C (quiet credit), Stage 2 adopts his preference and the nav restoration question is reopened. If Grant declines all three, Stage 1 wording is permanent and the page remains referral-only indefinitely.

---

## Stack-Quirks Follow-Ons (capture at Post-Completion Retro)

Per spec line 714–719 — confirmed at lock-stage these are real new patterns:

- **Inline SVG accessibility pattern** — `<figure>` + `<figcaption>` + `<svg role="img" aria-labelledby focusable="false">` + `<title>` and `<desc>` as first two children. First use on this site; SPEC-016 establishes the pattern.
- **Duplicate-SVG responsive pattern** — desktop horizontal + mobile vertical/simplified via CSS media query, NOT CSS transforms or overflow-scroll. Documented for diagram-heavy pages.
- **CSS-var fills inside inline SVG** — render correctly when SVG is inline in the document where `:root` is defined. Would silently fail back to default if served standalone or via `<img>`. Inline-only.
- **`--color-surface-elevated` vs. `--surface-color` divergence** — canonical SPEC-008 token `--color-surface-elevated` (`#F3F1EB`) is NOT the same as legacy alias `--surface-color` (`#EDEBE4`). Use the canonical token in new work.
- **CLAUDE.md design-token section is stale** — references removed `--primary-color`/`--secondary-color`/`--accent-color` tokens; cleanup pending.
- **IG-residual range under-prediction** — page-name pattern came in 17 vs predicted 20-60. Pattern: page-as-its-own-target produces fewer matches than ambient text references on a docs-heavy spec. Worth folding into SPEC-017's docs-heavy-multiplier learning.

---

## Implementer-Tester Recommendation

**Approve for Rob's QA Gate review and commit-to-main.**

All convergent reviewer findings absorbed (4 fixes applied + 1 recommend resolved); 2 recommends deferred to follow-on Trivial specs. IG-residual greps all within range or matching exact assertions (post-Q2-reversal counts logged in the residual table). Static checks pass. Manual verification list documented for Rob's post-deploy run. Stage 1 placeholder confirmed; Stage 2 is a separate PR. Stack-quirks follow-ons documented for Post-Completion Retro.

**Q2 reversal absorbed:** nav-strip applied across all 6 files; 5 existing pages now have net-zero diff vs. `main`; sitemap entry retained per Advisory-parity decision; Gate Annotation captured at top of this file.

**Awaiting:** Rob's QA Gate approval + decision to commit-to-main.
