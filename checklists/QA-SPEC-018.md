# QA-SPEC-018 — QA Gate Checklist

**Spec:** SPEC-018 ("Canonical-Tag Apex Migration")
**Tier:** Standard
**Branch:** `spec/SPEC-018-canonical-apex-migration`
**HEAD commit:** `15f4a3c` ("Remove backlog entry; log Implementation Notes")
**Author (QA-Expert):** Layer-2 specialist agent
**Date:** 2026-05-13
**Status:** QA Gate complete — all PASS-eligible items PASS; Deploy-Gate items deferred with rationale

---

## Evidence Key

- `grep -rn "www\.robcparker\.com" --include="*.html" --include="*.xml" --include="*.txt" .` → 0 matches
- `grep -rn "www\.robcparker\.com" .` → 120 matches (all in `.md` historical record — 0 active canonical signals)
- Lock surface verification: 43/43 PASS via Python line-exact substring match
- JSON-LD validation: `json.loads()` on all 6 pages — 0 parse errors
- Nav baseline: hashes unchanged between SPEC-016 merge commit (75842c7) and HEAD — 0 nav regressions introduced

---

## QA-SPEC-018 Checklist

| ID | Item | Type | Result | Evidence |
|---|---|---|---|---|
| QA-01 | **AC-2: No www.robcparker.com in HTML/XML/TXT.** `grep -rn "www.robcparker.com" --include="*.html" --include="*.xml" --include="*.txt" .` returns 0 matches. Both raw count and true-positive count are 0. | Static | **PASS** | Command output: 0 matches. Verified twice (subprocess + shell). |
| QA-02 | **AC-7i: stack-quirks.md — old backlog-candidate framing removed.** `grep -n "specs/backlog.md candidate" governance/stack-quirks.md` returns 0 matches. | Static | **PASS** | `grep` output: 0 matches. |
| QA-03 | **AC-7ii: stack-quirks.md — SPEC-018 attribution present.** `grep -n "SPEC-018" governance/stack-quirks.md` returns ≥1 match in the Cloudflare section. | Static | **PASS** | `governance/stack-quirks.md:34` — "convention codified in SPEC-018 (2026-05-13)" confirmed. |
| QA-04 | **AC-8: specs/backlog.md — canonical mismatch entry removed.** `grep -n "Canonical-tag" specs/backlog.md` returns 0 matches; lines 30-38 are gone. | Static | **PASS** | `grep` output: 0 matches. Backlog now has 3 remaining candidates with no www-mismatch entry. |
| QA-05 | **AC-11: CLAUDE.md URL declaration on apex.** `grep -n "https://www.robcparker.com" CLAUDE.md` returns 0; `grep -n "https://robcparker.com" CLAUDE.md` returns ≥1. | Static | **PASS** | CLAUDE.md:11 reads `**URL:** https://robcparker.com` — 0 www matches, 1 apex match confirmed. |
| QA-06 | **AC-6: JSON-LD Person.url is homepage canonical on all 6 pages.** Each page's Person JSON-LD has `"url": "https://robcparker.com/"` (trailing slash, homepage form, not per-page URL). | Static | **PASS** | Python json.loads() extraction: all 6 pages return `url=https://robcparker.com/`. Matches SPEC-013 IG-4 / AG-4 invariant. |
| QA-07 | **AC-6: JSON-LD Person.image on apex on all 6 pages.** Each page's Person JSON-LD has `"image": "https://robcparker.com/images/rob-parker-headshot@2x.jpg"`. | Static | **PASS** | Python json.loads() extraction: all 6 pages return correct apex image URL. |
| QA-08 | **JSON-LD block validity — all 6 pages parse as valid JSON.** `json.loads()` on each extracted Person block succeeds without exception. | Static | **PASS** | 6/6 "JSON valid" from Python parser. No parse errors introduced by URL-string edits. |
| QA-09 | **Lock byte-equality — all 43 surfaces match the Arch Gate Pre-Implementation String Lock exactly.** Line-exact substring match for each (file, line, new-string) tuple. | Static | **PASS** | 43/43 PASS from lock-surface verification script. `--- 43 PASS, 0 FAIL ---` |
| QA-10 | **Lock invariant: home trailing slash preserved on 9 surfaces.** Surfaces #1, 2, 6, 12, 18, 24, 30, 36, 37 (index.html canonical, og:url, JSON-LD url; all 5 sub-page JSON-LD url fields; sitemap.xml entry #1) all end with `/` not a path segment. | Static | **PASS** | 9/9 invariant checks PASS. No spurious trailing slash added to sub-page canonicals. |
| QA-11 | **Lock invariant: sub-page canonicals use clean form (no .html).** All 5 sub-page canonical hrefs and og:url values end with path segment only — no `.html` extension. | Static | **PASS** | Python regex scan: `grep "robcparker\.com/.*\.html"` across all HTML returns 0 matches in canonical/og signals. |
| QA-12 | **Lock invariant: SPEC-016 OG image variant preserved.** `how-this-site-was-built.html` uses `og-card-how-this-site-was-built.png` (not the standard `og-card.png`) for both og:image and twitter:image. | Static | **PASS** | Lock surfaces #33 and #34 verified: `https://robcparker.com/images/og/og-card-how-this-site-was-built.png` confirmed on both tags. |
| QA-13 | **Cross-page canonical consistency — all 6 pages.** index=`https://robcparker.com/`, about=`https://robcparker.com/about`, resume=`https://robcparker.com/resume`, contact=`https://robcparker.com/contact`, advisory=`https://robcparker.com/advisory`, how-this-site-was-built=`https://robcparker.com/how-this-site-was-built`. | Static | **PASS** | Python regex extraction on all 6 files: canonical=PASS og:url=PASS on every page. |
| QA-14 | **sitemap.xml validity and loc entries.** XML parses without error; all 6 `<loc>` entries are on apex host; none use www or .html form. | Static | **PASS** | `xml.etree.ElementTree.parse()` succeeds; 6/6 loc entries start with `https://robcparker.com` and contain no `www.` or `.html`. |
| QA-15 | **sitemap.xml lock surfaces #37-42 — line-exact match.** 6 `<loc>` entries at lines 4, 10, 16, 22, 28, 34 match the lock exactly. | Static | **PASS** | Lock surface verification: surfaces #37-42 all PASS. |
| QA-16 | **robots.txt Sitemap directive — lock surface #43.** `robots.txt:4` reads `Sitemap: https://robcparker.com/sitemap.xml`. | Static | **PASS** | Lock surface #43 PASS. File content confirmed: `Sitemap: https://robcparker.com/sitemap.xml`. |
| QA-17 | **HTML well-formedness — no broken tag balance or attribute quoting in changed head blocks.** Attribute quote counts are even on all robcparker.com URL lines across 6 files. JSON-LD `<script>` tags are closed in all 6 files. No `</head>` missing. | Static | **PASS** | Python head-block scan: 0 odd-quote-count lines; 6/6 `</head>` tags present; 6/6 JSON-LD script tags properly closed. |
| QA-18 | **IG-4: Full-repo informational sweep — true-positive active www signals = 0.** Raw count 120 (all in `.md` historical record). Breakdown: SPEC-018.md 68 (43 lock table old-strings + 25 body text), SPEC-013.md 22, SPEC-006.md 8, SPEC-005.md 4, SPEC-016.md 3, SPEC-007.md 3, SPEC-003.md 3, SPEC-015.md 2, SPEC-004.md 2, .claude/skills/SKILL.md 2, SPEC-002.md 1, stack-quirks.md 1 (quoted contrast example), QA-SPEC-016.md 1. | Static | **PASS** | Full-repo `grep -rn "www\.robcparker\.com" .` → 120 raw. 0 active canonical signals confirmed. All matches are historical record per Q4 policy. Note: Implementation Notes stated 119; actual is 120. Discrepancy traced to Implementation Notes mis-counting SPEC-018 body mentions as 67 when the file actually contains 68 (43 lock table + 25 body text). Benign documentation error — the reduction from pre-edit count (47 active migrations removed) is accurate; only the absolute band was wrong. No further action required. |
| QA-19 | **Nav baseline unchanged by SPEC-018.** Nav block sha1 hashes are identical between SPEC-016 merge commit (75842c7) and HEAD for all 6 files. SPEC-018 made no nav changes. | Static | **PASS** | Python sha1 comparison: 6/6 files match between 75842c7 and HEAD. Note: QA-SPEC-016 recorded different baseline hashes (`5309ae6e` / `5db94c23`). Investigation confirmed those were produced by a different nav extraction method on a different commit state. The relevant SPEC-018 check is that SPEC-018 introduced zero nav delta — confirmed by git diff and sha1 comparison. |
| QA-20 | **Implementation edits inventory matches IG-6 prediction.** 36 HTML surfaces + 6 sitemap + 1 robots.txt + 1 CLAUDE.md + 1 stack-quirks + 2 backlog = 47 active migrations. | Static | **PASS** | Implementation Notes report 47. Lock surface count (43 HTML/XML/TXT) + CLAUDE.md (1) + stack-quirks paragraph (1) + backlog entry (2 mentions) = 47. Matches IG-6 prediction exactly. |
| QA-21 | **AC-1: All canonicals on apex.** Verification that all 6 HTML pages carry `<link rel="canonical" href="https://robcparker.com/...">` with the correct apex host and clean path. | Deploy-only | **DEFER-to-Deploy** | Requires `curl -s https://robcparker.com/<path>` against the live Cloudflare-deployed site. Pre-deploy proxy: QA-09 and QA-13 confirm local file state. |
| QA-22 | **AC-3: sitemap.xml on apex with clean paths.** `curl -s https://robcparker.com/sitemap.xml` returns 200 with all 6 `<loc>` entries on apex, clean form. | Deploy-only | **DEFER-to-Deploy** | Requires live site. Pre-deploy proxy: QA-14, QA-15 confirm local file state. |
| QA-23 | **AC-4: robots.txt Sitemap directive on apex.** `curl -s https://robcparker.com/robots.txt` returns 200 with `Sitemap: https://robcparker.com/sitemap.xml`. | Deploy-only | **DEFER-to-Deploy** | Requires live site. Pre-deploy proxy: QA-16 confirms local file. |
| QA-24 | **AC-5: OG image fetchable on apex.** `curl -sI https://robcparker.com/images/og/og-card.png` returns 200; same for `og-card-how-this-site-was-built.png`. This spec does not move image files — verifies apex host serves them without error. | Deploy-only | **DEFER-to-Deploy** | Requires live site. No image files were moved by SPEC-018; risk of failure is very low. |
| QA-25 | **AC-9: Existing 308 redirects unbroken.** `curl -sI https://robcparker.com/resume.html` returns 308 with `Location: /resume`. No-regression check — spec does not touch Cloudflare routing. | Deploy-only | **DEFER-to-Deploy** | Requires live site. SPEC-018 made no routing changes; risk is very low. |
| QA-26 | **AC-10: www host still returns 522.** `curl -sI --max-time 8 https://www.robcparker.com/` returns 522. Confirms no accidental Cloudflare DNS change. | Deploy-only | **DEFER-to-Deploy** | Requires live network check. SPEC-018 is code-only; no DNS changes in scope. |

---

## Nav Baseline Note (QA-19 expanded)

The QA-SPEC-016 checklist recorded nav block hashes of `5309ae6e` (5 pages) and `5db94c23` (resume.html, known-divergent). The current nav hashes for the same 6 files do NOT match those values — but this is NOT a SPEC-018 regression. Git diff confirms SPEC-018 made zero changes to any nav block. The QA-SPEC-016 baseline was computed from a different commit state (likely the pre-Q2-reversal state, before nav `<li>` entries were stripped). The relevant SPEC-018 regression check is delta-from-SPEC-016-merge-to-HEAD, which is 0 for all nav blocks on all 6 files.

---

## IG-4 Count Discrepancy Note (QA-18 expanded)

Implementation Notes state the full-repo post-edit count is 119. QA measurement yields 120. The discrepancy traces to SPEC-018's own spec file: it contains 68 `www.robcparker.com` matches (43 in the lock table's old-string column + 25 in body text), but Implementation Notes claim 67. The 43-row lock table accounts for 43 matches; the remaining 25 appear in the Summary, Context, Requirements, Decision Rationale, ACs, IG-3 old-substring, IG-5 OPERATOR-TODOS text, Q5/Q6 body, and the Implementation Notes discussion itself. This is a benign off-by-one in the Implementation Notes count; it does not indicate any missed migration. The reduction of 47 active www signals (all verified removed) is accurate.

---

## Summary Table

| Category | PASS | FAIL | DEFER-to-Deploy |
|---|---|---|---|
| AC coverage (pre-deploy observable) | 5 of 5 | 0 | — |
| AC coverage (deploy-only) | — | — | 6 of 6 |
| Lock byte-equality (43 surfaces) | 43 of 43 | 0 | — |
| Lock invariants | 3 of 3 | 0 | — |
| JSON-LD validity | 6 of 6 | 0 | — |
| HTML well-formedness | 1 of 1 | 0 | — |
| sitemap.xml validity | 1 of 1 | 0 | — |
| Full-repo residual sweep | 1 of 1 | 0 | — |
| Nav baseline (regression) | 1 of 1 | 0 | — |
| Implementation inventory | 1 of 1 | 0 | — |
| **Total** | **20 of 20** | **0** | **6** |

---

## Deploy Gate Verification Script

Run these once Cloudflare Pages confirms the deploy is live (typically within 2 minutes of merge per stack-quirks.md).

```bash
# AC-1: Canonicals on apex (spot-check 3 pages)
curl -s https://robcparker.com/ | grep '<link rel="canonical"'
curl -s https://robcparker.com/resume | grep '<link rel="canonical"'
curl -s https://robcparker.com/how-this-site-was-built | grep '<link rel="canonical"'

# AC-3: sitemap.xml on apex
curl -s https://robcparker.com/sitemap.xml | grep '<loc>'

# AC-4: robots.txt Sitemap directive
curl -s https://robcparker.com/robots.txt

# AC-5: OG images fetchable
curl -sI https://robcparker.com/images/og/og-card.png | grep 'HTTP/'
curl -sI https://robcparker.com/images/og/og-card-how-this-site-was-built.png | grep 'HTTP/'

# AC-9: 308 redirects unbroken
curl -sI https://robcparker.com/resume.html | grep -E 'HTTP/|Location'

# AC-10: www still 522 (not fixed by this spec)
curl -sI --max-time 8 https://www.robcparker.com/ | grep 'HTTP/' || echo "Connection failed (expected)"
```

---

## QA Gate Recommendation

**Approve for PR + merge + auto-deploy.**

All 20 PASS-eligible items pass. No failures. The six DEFER-to-Deploy items (AC-1, AC-3, AC-4, AC-5, AC-9, AC-10) are inherently live-site checks that cannot be run pre-deploy; all have strong pre-deploy proxies that passed. Two process observations are logged (nav baseline hash discrepancy and IG-4 count off-by-one) — both investigated and confirmed benign; neither indicates a missed migration or a regression.
