# SPEC-021 — GitHub in Person JSON-LD `sameAs` schema

## Summary

Add `"https://github.com/wizzbiff"` to the `sameAs` array of the Person JSON-LD
structured-data block, strengthening entity disambiguation for Rob Parker
(distinguishing him from other "Rob Parker"s to search crawlers and knowledge
graphs). This complements the visible GitHub link shipped in SPEC-020.

**Source:** Promoted from `specs/backlog.md` "GitHub in Contact-page JSON-LD
`sameAs` array" (added 2026-06-03 as a SPEC-020 out-of-scope deferral). Promotion
trigger — the `wizzbiff` profile fleshed out into a strong disambiguation signal —
was met when Rob polished the profile (name "Rob Parker", capability-signal bio,
Atlanta GA, robcparker.com backlink) on 2026-06-03. The backlog entry is removed
in this same PR.

## Scope correction vs. backlog (recorded at Spec Gate)

The backlog scoped this to `contact.html:56-58` only. **Pre-flight discovery
corrected this:** the Person JSON-LD block is **byte-identical across six pages**
(verified sha1 `474d04fe…` on `index`, `about`, `resume`, `contact`, `advisory`,
`how-this-site-was-built`). SPEC-013 R5 established this byte-identical invariant
deliberately. Editing only `contact.html` would break it and create schema drift
across the site. **Therefore the change must land identically on all six files.**

Separately, the WHY comment above the block reads "byte-identical across all five
pages" on all six files — stale since SPEC-016 added `how-this-site-was-built.html`
as the sixth page. This spec corrects it to "six pages" in the same pass.

## Tier

**Trivial.** Additive structured-data change, no visible UI, no CSS, no JS, no new
dependencies. The 6-file fan-out raises mechanical surface but not conceptual
complexity. Decision Rationale skipped per Trivial-tier shortcut.

## Requirements

- **R1** — In each of the six pages carrying the Person JSON-LD block (`index.html`,
  `about.html`, `resume.html`, `contact.html`, `advisory.html`,
  `how-this-site-was-built.html`), add `"https://github.com/wizzbiff"` to the
  `sameAs` array as a second entry **after** the existing LinkedIn URL.
- **R2** — LinkedIn stays the **first** `sameAs` entry (primary professional
  signal); GitHub is second. A comma is added after the LinkedIn line.
- **R3** — The edit must keep the Person block **byte-identical across all six
  files** (post-edit sha1 of the block must match across all six).
- **R4** — Update the WHY comment text "byte-identical across all five pages" →
  "byte-identical across all six pages" in all six files, keeping the comment
  itself identical across files. Optionally note the GitHub signal in the comment
  rationale (see Q2).
- **R5** — Resulting JSON-LD must be valid JSON (no trailing comma, correct
  bracket structure).
- **R6** — No changes to visible markup, CSS, or JS. The visible GitHub link from
  SPEC-020 (`contact.html` alt-channels) is untouched.
- **R7** — Remove the "GitHub in Contact-page JSON-LD `sameAs` array" entry from
  `specs/backlog.md` in the same PR.

## Out of scope

- **Footer / visible GitHub links on other pages** — SPEC-020 scope was the
  contact-page visible link; this spec is structured-data only.
- **Other `sameAs` candidates** (e.g., a future blog, speaking profiles) — add when
  they exist.

## Acceptance Criteria

- **AC1** — *Given* each of the six pages, *when* the Person JSON-LD `sameAs` array
  is inspected, *then* it contains exactly two entries in order:
  `https://www.linkedin.com/in/robcparker/` then `https://github.com/wizzbiff`.
- **AC2** — *Given* all six pages post-edit, *when* the Person block sha1 is
  computed per file, *then* all six match (byte-identical invariant preserved).
- **AC3** — *Given* each page's JSON-LD, *when* parsed as JSON, *then* it is valid
  (no trailing comma, well-formed).
- **AC4** — *Given* the WHY comment, *when* read on any of the six pages, *then* it
  says "six pages" (not "five") and is identical across all six.
- **AC5** — *Given* `git diff --stat`, *when* reviewed, *then* only the six HTML
  files and `specs/` files changed — no CSS/JS.
- **AC6** — *Given* `specs/backlog.md` after this PR, *when* searched, *then* the
  "GitHub in Contact-page JSON-LD `sameAs` array" candidate is absent.
- **AC7** — *Given* the live apex pages after deploy, *when* the Person JSON-LD is
  fetched, *then* the `sameAs` array includes the GitHub URL (spot-check
  `contact` + one other page). [Deploy Gate]

## QA checklist (QA-SPEC-021)

- [ ] AC1 — `sameAs` two entries, correct order, all 6 files (grep)
- [ ] AC2 — block sha1 identical across all 6 files
- [ ] AC3 — JSON validity per file (parse check)
- [ ] AC4 — "six pages" comment, identical across 6
- [ ] AC5 — `git diff --stat` shows no CSS/JS
- [ ] AC6 — backlog entry removed
- [ ] AC7 — deferred to Deploy Gate (live apex spot-check)

## Open Questions — Spec Gate

- **Q1 — 6-file scope.** Confirm the change lands on all six pages (not just
  contact) to preserve the SPEC-013 R5 byte-identical invariant.
  *PM-Spec recommendation:* yes — 6 files; editing one breaks the invariant.
- **Q2 — WHY-comment update depth.** Fix "five → six" only, or also append a
  GitHub note to the rationale?
  *PM-Spec recommendation:* fix "five → six" (required correctness) and lightly
  extend the rationale to "LinkedIn + GitHub signals" so the comment stays
  truthful about what the array now contains. Keep it one line.
- **Q3 — `sameAs` order.** LinkedIn first or GitHub first?
  *PM-Spec recommendation:* LinkedIn first (primary professional identity), GitHub
  second. Order is not semantically significant to schema.org but reads as
  priority to humans reviewing the source.

## Spec Gate Resolutions (2026-06-03)

| Q  | Topic              | Resolution                                                                 |
|----|--------------------|----------------------------------------------------------------------------|
| Q1 | 6-file scope       | All six pages — preserve SPEC-013 R5 byte-identical invariant.             |
| Q2 | WHY-comment depth  | Fix "five → six" AND note "LinkedIn + GitHub signals" in rationale, one line.|
| Q3 | `sameAs` order     | LinkedIn first, GitHub second.                                            |

**Spec Gate Decision:** Approved 2026-06-03. Gate's pre-flight discovery caught that the backlog's single-file scope was wrong — the byte-identical-across-six-pages invariant (SPEC-013 R5) makes this a 6-file change; a one-file edit would have shipped schema drift.

## Implementation Guidance (Arch Gate)

architect-reviewer verdict: approve-for-implementation with conditions. Target block:

```
      "sameAs": [
        "https://www.linkedin.com/in/robcparker/",
        "https://github.com/wizzbiff"
      ]
```

Comma **after** the LinkedIn line; the GitHub line carries **no** trailing comma
(the classic JSON failure). URL indent is **8 spaces**, matching the LinkedIn line.

- **AG-IG-1** — sameAs edit applied to all six files. Verify
  `grep -rn '"https://github.com/wizzbiff"' index.html about.html resume.html contact.html advisory.html how-this-site-was-built.html`
  → **exactly 6** (range 6–6; one per file, inside JSON-LD only — SPEC-020's
  visible link uses a different string form, so a quoted-bare-URL match should be
  6 exactly; 7+ means a stray visible-markup hit).
- **AG-IG-2** *(gate-blocker, AC2)* — Person block byte-identity. Extract the
  `<script type="application/ld+json">…</script>` block per file, sha1 each →
  **exactly 1 distinct hash across 6 files**. (New hash ≠ pre-edit `474d04fe…`;
  assertion is cross-file equality, not equality to the old hash.)
- **AG-IG-3** *(gate-blocker, AC3/R5)* — JSON validity. Pipe each extracted block
  through a strict parser (`python3 -m json.tool` / `jq .`); **6/6 exit 0**.
  `sameAs` has exactly 2 string elements; no comma before the closing `]`.
- **AG-IG-4** — WHY comment (AC4/R4). `grep -rc 'across all five pages' *.html` →
  **0**; `grep -rc 'across all six pages' *.html` → **6**; the appended
  "(LinkedIn + GitHub signals)" phrase grep → **6** (character-identical).
- **AG-IG-5** — No CSS/JS/visible drift (AC5/R6). `git diff --stat` = only the six
  HTML files + `specs/`; `git diff -- css/ js/` empty. Footer/contact/resume
  visible LinkedIn `href` links untouched.
- **AG-IG-6** — Backlog removed (AC6/R7).
  `grep -c 'GitHub in Contact-page JSON-LD' specs/backlog.md` → **0**.
- **AG-IG-7** — Deferred to Deploy Gate (AC7): live apex spot-check (`contact` +
  one other page) that fetched JSON-LD includes the GitHub URL. Apex, not www.

### Do NOT touch
- Visible LinkedIn `href` links (footers all six, contact alt-channels, resume
  contact) — these are not `sameAs`.
- SPEC-020 visible GitHub link on contact page.
- `Person.url` / `image` / `alumniOf` / `address` — only `sameAs` + WHY comment change.
- Other speculative `sameAs` candidates (blog, speaking) — defer until they exist.

## Arch Gate Conditions (2026-06-03)

1. Per-file **exact-match Edit** with character-identical old/new strings (8-space
   URL indent); no cross-file `replace_all`.
2. QA must run **AG-IG-2** (cross-file block sha1 = 1 distinct hash) and
   **AG-IG-3** (strict JSON parse, no trailing comma) before QA Gate — gate-blockers.
3. Confirm the `wizzbiff` GitHub profile is public at implementation time
   (operational precondition — verified polished/public 2026-06-03).

**Arch Gate Decision:** Approved 2026-06-03 with conditions absorbed — implementation may begin. Gate locked the per-file exact-match edit mechanism and the two gate-blocker verifications (cross-file sha1 + strict JSON parse) that protect the byte-identity invariant and guard the trailing-comma failure.

## Implementation Notes (2026-06-03)

Per-file exact-match Edits applied to all six files (sameAs + WHY comment), per
Arch Gate condition 1. No `replace_all`. Both gate-blockers pass:
- AG-IG-2: Person block sha1 = single distinct hash `5dd5da37…` across all six
  (byte-identity preserved; differs from pre-edit `474d04fe…` as expected).
- AG-IG-3: all six JSON-LD blocks parse clean (`python3 -m json.tool`); no
  trailing comma; `sameAs` has exactly 2 elements.

**Finding 1 (benign — IG-residual-range).** AG-IG-1 predicted "exactly 6" matches
for `"https://github.com/wizzbiff"` site-wide; raw count came in at **7**.
The extra is `contact.html:296` — SPEC-020's visible-link `href`, which (contrary
to the Arch prediction that it used "a different string form") *also* wraps the URL
in double quotes. Verified the in-block (`sameAs`) count is exactly **1 per file**
across all six — the true-positive assertion holds. Reinforces
`feedback_ig_residual_counts_as_ranges.md`: even a "this one's obviously 6"
prediction benefits from the range + true-positive framing.

Other IGs: AG-IG-4 (five→six: 0/6), AG-IG-5 (no css/js diff), AG-IG-6 (backlog
removed: 0) — all pass.
