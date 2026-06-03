# SPEC-020 — GitHub link on Contact page

## Summary

Add a GitHub entry to the "Or reach out directly" alternate-channels list on
`contact.html`, after the existing LinkedIn and Email items. The list becomes
**LinkedIn → Email → GitHub**. The new item links to Rob's GitHub profile
(`https://github.com/wizzbiff`) and reuses the existing `.alt-channel-item` /
`.alt-channel-label` / `.alt-channel-link` markup and styling — no CSS changes.

**Source:** Promoted from `specs/backlog.md` "GitHub link on Contact page"
(added 2026-04-26; originally scoped as R4 in the SPEC-012 draft, deferred at Spec
Gate because Rob's GitHub profile was not in a state he wanted linked from a
Director/VP candidate site). The promotion trigger — Rob comfortable linking the
profile — was confirmed by the operator on 2026-06-03. The backlog entry is
removed in this same PR.

## Tier

**Trivial.** Single-file, additive copy/markup change reusing an established
pattern with no CSS, no JavaScript, and no new dependencies. Per the Complexity
Tier Defaults table (copy/content updates → Trivial). Decision Rationale section
skipped per Trivial-tier shortcut.

## Requirements

- **R1** — Insert one new `<li class="alt-channel-item">` into the
  `<ul class="alt-channels-list">` in `contact.html`, positioned **after** the
  Email item (i.e., as the third and final list item before `</ul>`).
- **R2** — The new item mirrors the LinkedIn item's structure: a
  `<span class="alt-channel-label">` reading `GitHub`, followed by an `<a>` with
  `class="alt-channel-link"`.
- **R3** — The anchor links to `https://github.com/wizzbiff` and opens in a new
  tab: `target="_blank"` plus `rel="noopener noreferrer"` (matches the LinkedIn
  item exactly).
- **R4** — The anchor carries an accessible `aria-label` following the LinkedIn
  pattern: `"View Rob Parker's GitHub profile (opens in a new tab)"`.
- **R5** — Visible link text reads **`View GitHub Profile`** (operator decision,
  2026-06-03).
- **R6** — No changes to `css/style.css` or `js/main.js`. No changes to the
  Person schema `sameAs` array (out of scope — see below).
- **R7** — Remove the "GitHub link on Contact page" entry from
  `specs/backlog.md` in the same PR (backlog is a holding queue, not a parallel
  record).

## Out of scope

- **Person/JSON-LD `sameAs` schema** — adding the GitHub URL to the structured-data
  `sameAs` array (`contact.html:55-58`) is a separate SEO concern. The bare
  profile state (no name/bio) makes it a weak entity-disambiguation signal today;
  revisit if/when the profile is fleshed out. Logged as a backlog candidate.
- **Footer GitHub link** — the footer currently surfaces LinkedIn only
  (`contact.html:322`). Adding GitHub there is a site-wide footer change, not part
  of this contact-page-scoped spec.
- **Profile polish** — setting display name / bio / pinned repos on GitHub is an
  operator task outside the codebase; operator chose to link the profile as-is.

## Acceptance Criteria

- **AC1** — *Given* the rendered Contact page, *when* a user views the "Or reach
  out directly" list, *then* it shows exactly three items in order: LinkedIn,
  Email, GitHub.
- **AC2** — *Given* the GitHub item, *when* its anchor is inspected, *then*
  `href="https://github.com/wizzbiff"`, `target="_blank"`, and
  `rel="noopener noreferrer"` are all present.
- **AC3** — *Given* the GitHub anchor, *when* a screen reader reads it, *then* the
  accessible name is `"View Rob Parker's GitHub profile (opens in a new tab)"`.
- **AC4** — *Given* the GitHub item, *when* rendered, *then* it inherits
  `.alt-channel-item` / `.alt-channel-label` / `.alt-channel-link` styling
  identically to the LinkedIn item (no visual divergence, no new CSS).
- **AC5** — *Given* the live apex page after deploy, *when* the GitHub link is
  clicked, *then* it resolves to `https://github.com/wizzbiff` (HTTP 200).
- **AC6** — *Given* `specs/backlog.md` after this PR, *when* searched, *then* the
  "GitHub link on Contact page" candidate entry is absent.

## QA checklist (QA-SPEC-020)

- [x] AC1 — three items, correct order (`grep -c` = 3; markup inspected)
- [x] AC2 — href / target / rel attributes correct
- [x] AC3 — aria-label exact string match (character-level)
- [x] AC4 — visual parity with LinkedIn item; `git diff` shows no css/js change
- [x] No console errors on `contact.html` (no JS added)
- [x] Mobile responsive at 768px and 375px — parity structurally guaranteed by class reuse (qa-expert)
- [x] AC6 — backlog entry removed (`grep` = 0)
- [ ] AC5 — deferred to Deploy Gate (live apex verification)

**QA Gate Decision:** Approved 2026-06-03 — SPEC-020 implementation complete. All statically verifiable ACs pass (code-reviewer PASS, qa-expert recommend-approve); AC5 carries to Deploy Gate. PR opens next.

## Open Questions — Spec Gate

- **Q1 — GitHub URL.** Which URL does the link target?
  *PM-Spec recommendation:* `https://github.com/wizzbiff` — the org/owner of the
  `robcparkerdotcom` repo, already public. **Resolved:** confirmed
  `https://github.com/wizzbiff` (operator, 2026-06-03).
- **Q2 — Profile readiness.** The profile is currently bare (no display name, no
  bio, only the website repo visible as non-fork). Link as-is, or polish first?
  *PM-Spec note:* per `feedback_credibility_signals_philosophy.md`, a blank
  profile linked from a candidate site is a weak signal. **Resolved:** link as-is
  now (operator, 2026-06-03); profile polish is an out-of-scope operator task.
- **Q3 — Link text.** What visible label?
  *PM-Spec recommendation:* `View GitHub Profile` — neutral, parallels the
  LinkedIn verb pattern, doesn't expose the `wizzbiff` handle in visible text.
  **Resolved:** `View GitHub Profile` (operator, 2026-06-03).

## Spec Gate Resolutions (2026-06-03)

| Q  | Topic            | Resolution                                                        |
|----|------------------|-------------------------------------------------------------------|
| Q1 | GitHub URL       | `https://github.com/wizzbiff`                                     |
| Q2 | Profile readiness| Link as-is now; profile polish out of scope (operator task)       |
| Q3 | Link text        | `View GitHub Profile`                                             |

**Spec Gate Decision:** Approved 2026-06-03. Gate confirmed the GitHub URL, link text, and — notably — surfaced the bare-profile credibility tension so the operator could make an explicit link-as-is call rather than shipping the assumption silently.

## Implementation Guidance (Arch Gate)

Specialists run in parallel (architect-reviewer + marketing-copywriter). Architect
verdict: approve-for-implementation, no conditions.

- **AG-IG-1** — Insert the new `<li class="alt-channel-item">` block between
  `contact.html:290` (`</li>` of the Email item) and `contact.html:291` (`</ul>`).
  Match the LinkedIn item's multi-line attribute formatting (one attribute per
  line) — template at lines 270-276. *Source: architect-reviewer.*
- **AG-IG-2** — Mirror the LinkedIn structure exactly:
  `<span class="alt-channel-label">GitHub</span>` then the anchor with
  `href="https://github.com/wizzbiff"`, `target="_blank"`,
  `rel="noopener noreferrer"`,
  `aria-label="View Rob Parker's GitHub profile (opens in a new tab)"`,
  `class="alt-channel-link"`, visible text `View GitHub Profile`. Do NOT add
  `role="listitem"` — native `<li>` semantics are correct; `role="list"` stays on
  the `<ul>`. No WHY comment needed (plain anchor mirroring an existing pattern).
  *Source: architect-reviewer.*
- **AG-IG-3** — No new CSS. QA verify the reused class exists:
  `grep -c "alt-channel-link" css/style.css` returns **≥1** (expected range 1–3
  across base/responsive blocks; true-positive target: ≥1 rule). If 0, the item
  renders unstyled — fail. *Source: architect-reviewer.*
- **AG-IG-4** — Order/count (AC1): after edit,
  `grep -c "alt-channel-item" contact.html` returns **exactly 3** (LinkedIn,
  Email, GitHub; single template file, no responsive duplication). *Source:
  architect-reviewer.*
- **AG-IG-5** — Exactly one GitHub anchor added:
  `grep -c "github.com/wizzbiff" contact.html` returns **exactly 1**. A count of 2
  means the JSON-LD `sameAs` array was wrongly touched. *Source:
  architect-reviewer.*
- **AG-IG-6** — Backlog removal (R7/AC6):
  `grep -i "github link on contact" specs/backlog.md` returns **0** matches —
  entry fully removed, not commented. *Source: architect-reviewer.*
- **AG-IG-7** — Deferred to Deploy Gate (AC5): live-verify
  `https://robcparker.com/contact` (clean URL, apex not www) renders the GitHub
  item and the link resolves HTTP 200 to `https://github.com/wizzbiff`. *Source:
  architect-reviewer.*

### Do NOT touch (architect-reviewer scope flags)
- JSON-LD `sameAs` array at `contact.html:56-58` — stays LinkedIn-only.
- Footer LinkedIn link at `contact.html:322`.
- Email decode pattern at `contact.html:279-290` — intentionally different; no
  "consistency" refactor.
- No edits to `css/style.css` or `js/main.js`.

## Arch Gate Resolutions (2026-06-03)

| Item   | Topic                | Resolution                                                                                                                               |
|--------|----------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| AG-C1  | Visible link text    | marketing-copywriter proposed "See the Work on GitHub" for verb-register parity. **Rejected** — link target is a bare profile; "see the work" over-promises against a near-empty profile. Keep `View GitHub Profile` (operator, 2026-06-03), which sets accurate expectations. |
| AG-C2  | aria-label / label   | copywriter confirmed both as-is. No change.                                                                                              |

**Arch Gate Decision:** Approved 2026-06-03 with conditions absorbed — implementation may begin. Gate retired the verb-register question by weighing copy against the actual (bare) link target, choosing honesty over polish; all IG items reflected in the spec body.

## Implementation Notes (2026-06-03)

Single targeted edit; no findings. New `<li>` inserted after the Email item
(`contact.html`), mirroring the LinkedIn item verbatim. Backlog entry removed.

Post-edit grep verification (all pass):
- AG-IG-3 `grep -c "alt-channel-link" css/style.css` → **3** (in range 1–3)
- AG-IG-4 `grep -c "alt-channel-item" contact.html` → **3** (LinkedIn, Email, GitHub)
- AG-IG-5 `grep -c "github.com/wizzbiff" contact.html` → **1** (sameAs untouched)
- AG-IG-6 `grep -ic "github link on contact" specs/backlog.md` → **0**
