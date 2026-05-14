# SPEC-019: Hero Contact CTA

**Status:** Draft — Spec Gate pending
**Tier:** Trivial (single-file additive change; reuses existing button/link patterns; no new architecture; reversible by removing a single element)
**Author:** PM-Spec (promoted from `specs/backlog.md` entry "Hero CTA — add tertiary 'Get in Touch' link" dated 2026-04-25; surfaced at SPEC-011 Spec Gate Q5; sourced from `robcparker_com_audit.md` Dimension 2 lines 51-53)
**Date:** 2026-05-14
**Branch:** `spec/SPEC-019-hero-contact-cta`

---

## Summary

Give a recruiter landing on the home page a fast landing → contact path by adding a tertiary CTA to the hero. The hero currently exposes two CTAs ("View My Resume" primary, "Learn More About Rob" text-link); a visitor who decides "I want to talk to this person right now" has to either click the resume CTA (wrong intent) or hunt for the nav-bar Contact link (small target, top-right, easy to miss on first scan).

Single-file change at `index.html`; CSS reuse from the existing button vocabulary (`.btn-textlink` or `.btn .btn-secondary`); marketing-copywriter locks the label at Arch Gate.

## Context

### Source

- **Audit:** `robcparker_com_audit.md` Dimension 2 lines 51-53. Severity: Important. Recommendation verbatim: *"Add a tertiary 'Get in Touch' link in the hero, or make the Contact item visually prominent in the nav (slightly bolder weight, or set off by a subtle visual treatment)."*
- **Backlog history:** Surfaced at SPEC-011 Spec Gate Q5 (2026-04-25); scope-cut to keep SPEC-011 focused on advisory removal. Promotion-ready in `specs/backlog.md` since.

### Current hero state — `index.html:135-138`

```html
<div class="hero-cta-stack">
    <a href="resume.html" class="btn btn-primary">View My Resume</a>
    <a href="about.html" class="btn-textlink">Learn More About Rob <span class="arrow" aria-hidden="true">→</span></a>
</div>
```

### Existing button vocabulary — `css/style.css`

- `.btn .btn-primary` — filled magenta, charcoal text. Currently used by "View My Resume."
- `.btn .btn-secondary` — outlined magenta, magenta text. Available; unused in hero today.
- `.btn-textlink` — magenta-underlined inline link with arrow glyph. Currently used by "Learn More About Rob."

`.hero-cta-stack` is `display: flex; flex-direction: column; align-items: flex-start; gap: var(--space-3)`. Adding a third child is layout-neutral on desktop; mobile breakpoint verification belongs at QA Gate, not Spec Gate.

### Audience fit

Per `project_positioning.md` memory: Director/VP hunt at AI-forward SaaS. Recruiter scenario from the audit is the load-bearing use case. The senior-exec recruiter who decides to act in the first 60 seconds of scan is the user this CTA serves.

## Decision Rationale

Three framing choices are pre-resolved here; three more open at Spec Gate (Q1–Q3).

### Pre-resolved framing

- **Hero CTA over nav-emphasis (default).** The audit lists both as alternatives, not both-and. Hero CTA is the more contextual surface for the recruiter-decides-to-act moment (above-the-fold, large click target, contextual to scan flow). Nav-emphasis is a permanent treatment but bound by the nav's tiny visual budget and risks visual asymmetry with peer links. Raised as Q1 in case the user prefers nav-emphasis or both.
- **Reuse existing button vocabulary.** No new CSS class introduced. The site already has three CTA-tier patterns (`.btn-primary`, `.btn-secondary`, `.btn-textlink`); picking from those keeps the visual system coherent and the change reversible.
- **Marketing-copywriter locks the label at Arch Gate, not Spec Gate.** Per `.claude/development-workflow.md`, all public-facing content goes through copywriter. The audit's "Get in Touch" is a stake-in-ground default. Arch Gate copywriter has full site-voice context and may propose "Contact Rob," "Reach Out," "Let's Talk," etc.

### Trade-offs accepted

- The mobile breakpoint adds one more 44px-min-height row + one gap to the hero stack. Below-the-fold consequence on mobile only; verified at QA Gate.
- Per `feedback_credibility_signals_philosophy.md` memory: prefer capability/affordance signals over legitimacy signals. "Get in Touch" reads as capability/affordance — fine.
- Reversible. `git revert` removes the element. No data, no migration, no asset.

## Requirements

- **R1: Add a third anchor element** as a tertiary CTA inside `.hero-cta-stack` at `index.html`. Link target: `contact.html`. Position per Q3.
- **R2: Reuse existing CSS classes only.** No new class introduction. Visual emphasis level per Q2.
- **R3: Accessibility.** Keyboard-focusable with visible focus state (inherited from chosen class). No `aria-label` needed if the visible label is self-descriptive.
- **R4: Mobile-responsive.** At 768px and 375px viewport, the 3-CTA stack must not overflow, must keep readable spacing, and must keep each touch target ≥ 44×44px per WCAG 2.5.5 (inherited from `.btn { min-height: 44px }`; `.btn-textlink` adequacy verified at QA Gate).
- **R5: Backlog removal in same PR.** Remove the "Hero CTA — add tertiary 'Get in Touch' link" entry from `specs/backlog.md` lines 11-18 in the same PR per spec-pipeline skill convention.

### Not in scope

- Nav-emphasis treatment. If Q1 pivots scope to nav-emphasis, the spec gets renamed and slug re-issued pre-Stage-2-close. Both-and is also out of scope as a single spec.
- Any other audit Dimension 2 recommendation (contact form intent routing already shipped as SPEC-014; heading hierarchy is a separate concern).
- Copy changes elsewhere on the home page (the audit flags several; out of scope here).
- Any change to the existing "View My Resume" or "Learn More About Rob" CTAs.

## Acceptance Criteria

- **AC1:** `.hero-cta-stack` at `index.html` contains exactly 3 child anchor elements after the change.
- **AC2:** The new anchor's `href` is `contact.html`.
- **AC3:** The new anchor's class list contains only existing classes from `css/style.css` (no new class introduced).
- **AC4:** The new anchor's visible label matches the Arch Gate-locked string byte-identically.
- **AC5:** At ≥ 1024px viewport, the 3 CTAs render in a vertical stack inside `.hero-copy-col` with no horizontal overflow.
- **AC6:** At 768px viewport, the same.
- **AC7:** At 375px viewport, the same.
- **AC8:** Tab order through the hero CTA stack follows the rendered order (per Q3).
- **AC9:** Browser console clean on `index.html` after the change (no new JS errors, no new CSS warnings).
- **AC10:** Backlog entry "Hero CTA — add tertiary 'Get in Touch' link" no longer present in `specs/backlog.md`.

## Open Questions — Spec Gate

### Q1: Hero CTA, nav-emphasis, or both?

- **PM-Spec recommendation:** Hero CTA only.
- **Rationale:** Hero is the higher-discoverability surface for the recruiter-decides-to-act moment. Nav-emphasis is a permanent but visually constrained lever; mixing both in one spec inflates QA scope and mixes change types (markup-add vs. CSS-only nav treatment).
- **Alternatives:** (a) Nav-emphasis only — different scope, separate spec; (b) Both — pushes tier to Standard.

### Q2: Visual emphasis level for the new CTA?

- **PM-Spec recommendation:** `.btn-textlink` matching the existing "Learn More About Rob" tier.
- **Rationale:** Primary stays "View My Resume" (job-search goal). A filled button or outlined button would visually compete with the primary; text-link tier reads correctly as "third option for those who want it." Concrete proposal: `<a href="contact.html" class="btn-textlink">Get in Touch <span class="arrow" aria-hidden="true">→</span></a>`.
- **Alternatives:** (a) `.btn .btn-secondary` outlined button — middle emphasis, would equal primary visually; (b) `.btn .btn-primary` filled — too loud, competes with resume CTA.
- **Note:** Arch Gate's copywriter pass may argue for higher emphasis based on site voice. Locked at Arch Gate.

### Q3: Position of the new CTA in the stack?

- **PM-Spec recommendation:** Third position — after "View My Resume" and "Learn More About Rob."
- **Rationale:** Tertiary by definition. Primary stays first; "Learn More" stays middle (preserves existing rhythm); new CTA goes last.
- **Alternatives:** (a) Second position (between primary and "Learn More") — bumps "Learn More" to tertiary slot; (b) Before primary — overemphasizes contact intent.

## QA Checklist (preview — finalized at Stage 5)

- AC1–AC10 verified observably
- Apex-only live verification post-deploy (`https://robcparker.com/` — never `www.`)
- Browser console clean on `index.html`
- Tab order check (keyboard navigation through hero CTAs)
- Mobile responsive at 768px and 375px (verify 44×44 touch target maintained)
- Cross-page regression smoke (5 other pages still render correctly — no shared CSS regressed)
- Backlog entry removal confirmed

## Risk + Reversibility

- **Risk:** Low. Single anchor element, no new CSS class, no JS, no asset, no dependency.
- **Reversibility:** Trivial. `git revert` removes the element atomically.
- **Operator surface:** None — no Cloudflare config change, no DNS, no third-party service.

---

## Spec Gate Resolutions (2026-05-14)

| Q  | Topic | Resolution |
|----|-------|-----------|
| Q1 | Scope — hero CTA, nav-emphasis, or both | **Hero CTA only.** Nav-emphasis and both-and out of scope. |
| Q2 | Visual emphasis level | **`.btn-textlink`** matching the existing "Learn More About Rob" tier. Concrete markup: `<a href="contact.html" class="btn-textlink">Get in Touch <span class="arrow" aria-hidden="true">→</span></a>`. Label is the stake-in-ground default; Arch Gate copywriter pass locks the byte-string. |
| Q3 | Position in the stack | **Third position** — after "View My Resume" and "Learn More About Rob." |

Stack order after change (top to bottom):
1. `View My Resume` — `.btn .btn-primary`
2. `Learn More About Rob →` — `.btn-textlink`
3. `Get in Touch →` — `.btn-textlink` (NEW; label locked at Arch Gate 2026-05-14)

**Spec Gate Decision:** Approved 2026-05-14. Gate framed the audit's "or" cleanly (hero CTA over nav-emphasis), pre-resolved the visual-emphasis tier against competing-with-primary risk, and pushed CTA-label finalization to Arch Gate where marketing-copywriter has full site-voice context.

---

## Arch Gate (2026-05-14)

### Specialists invoked

- **architect-reviewer** — design correctness, accessibility, breakpoint analysis. Returned: approve, no conditions.
- **marketing-copywriter** — locked the CTA label byte-string with site-voice calibration. Returned: locked `Get in Touch`.
- **penetration-tester** — NOT invoked. Zero security surface (additive markup, internal `href`, no user input handling, no new external resources, no new headers).

Specialists ran in parallel per spec-pipeline skill convention (`feedback_credibility_signals_philosophy.md` + project memories consulted at agent time).

### Architect findings worth recording

- **Breakpoint scope correction (informational, not blocking):** The spec's "below-the-fold consequence on mobile only" framing was tablet-and-mobile, not mobile-only. At 1023px the hero collapses to `1fr 1fr` grid; `.hero-copy-col` becomes the narrower column and the CTA stack absorbs the third row there too. QA scope expanded accordingly (1023px added — see IG-4).
- **Visual rhythm flag (mitigated by label choice):** Two consecutive `.btn-textlink` items (positions 2 and 3) could scan as a paired list rather than primary→secondary→tertiary. Mitigation: the locked label "Get in Touch" is semantically distinct from "Learn More About Rob" (transactional / contact intent vs. informational / about-page intent), so the pairing reads as parallel-by-design — two different affordances at the same visual tier, not accidental duplication. No CSS change required.
- **No CSS change required.** `.hero-cta-stack` (style.css:729-734) is `flex-direction: column` and handles N children identically. `.btn-textlink` (style.css:739-769) has no sibling-selector or nth-child dependencies.

### Pre-Implementation String Lock

This is an *additive* change, not a string replacement. Lock format adapted accordingly: (file, insertion point, new string).

| File | Insertion point | New string (byte-locked) |
|------|-----------------|--------------------------|
| `index.html` | After line 137 (the existing "Learn More About Rob" anchor), before the closing `</div>` at line 138; as the third child of `.hero-cta-stack`; indentation matches the existing two anchors (12 leading spaces) | `<a href="contact.html" class="btn-textlink">Get in Touch <span class="arrow" aria-hidden="true">→</span></a>` |

The implementer ships this exact string. The visible label is `Get in Touch`; the trailing `→` is the existing `.arrow` glyph element matching the "Learn More About Rob" pattern.

### Implementation Guidance (IG list)

- **AG-IG-1** — Insert the new anchor as the third child of `.hero-cta-stack` at `index.html` after line 137 (the "Learn More About Rob" line), before the closing `</div>` at line 138. Use the byte-locked string from the table above. Preserve the existing two anchors byte-identically. *Source: architect-reviewer.*

- **AG-IG-2** — Post-edit grep verification on `index.html`:
  - `class="btn-textlink"` — raw count range 2–3, true-positive count asserted = **2** (both inside `.hero-cta-stack`).
  - `href="contact.html"` — raw count range 1–3, true-positive count asserted = **at least 1 new occurrence** inside `.hero-cta-stack` (header nav and footer may already contain other contact links — those are pre-existing, not regressions).
  - *Source: architect-reviewer. Range framing per `feedback_ig_residual_counts_as_ranges.md`.*

- **AG-IG-3** — Ship the locked label `Get in Touch` byte-identically per AC4. If a future iteration changes the label, update the spec's stack-order block (the line in this spec reading "`Get in Touch →` — `.btn-textlink` (NEW…)") in the same commit so spec and code stay aligned. *Source: architect-reviewer.*

- **AG-IG-4** — Visual verification at three breakpoints: **1023px (tablet — narrowest column-width context, strictest stacking test), 768px, 375px**. Not just 375px as the original spec preview implied. *Source: architect-reviewer (corrects spec framing).*

- **AG-IG-5** — Remove `specs/backlog.md` lines 11-18 (the "Hero CTA — add tertiary 'Get in Touch' link" entry) in the same commit per R5 / AC10. Post-edit grep `specs/backlog.md` for `"Get in Touch"` — expected match count 0 (true-positive asserted = 0). *Source: architect-reviewer + spec R5.*

- **AG-IG-6** — Browser console check on `index.html` post-deploy — clean per AC9. *Source: architect-reviewer.*

### Copywriter rationale (locked)

"Get in Touch" is the locked byte-string. Direct, low-friction, recruiter-idiomatic. At the tertiary tier — after the resume CTA has established Rob's credentials — the right move is a clean affordance, not a pitch. The phrase does no legitimacy work (no prestige hook, no vanity signal), aligning with `feedback_credibility_signals_philosophy.md`. Reads as an open door, not a command. Trailing arrow glyph lands naturally: `Get in Touch →` scans as forward action without grammatical awkwardness.

Alternatives considered and rejected:
- *"Let's Talk"* — Warmer; risks softening the authority the hero headline ("Engineering Teams That Ship — at Scale") establishes at the Director/VP tier. Viable A/B candidate for a future test, not the right default.
- *"Reach Out"* — Verb-forward but more generic than "Get in Touch"; no advantage.

**Arch Gate Decision:** Approved 2026-05-14 with conditions absorbed — implementation may begin. Two-reviewer parallel pattern retired both the design-correctness risk (architect: tablet-breakpoint scope correction, visual-rhythm flag resolved by label semantics) and the public-content risk (copywriter: locked byte-string with site-voice rationale).

---

## Implementation Notes (2026-05-14)

### Finding 1 — Locked label aligns with existing site vocabulary (consistency, not regression)

Post-edit verification surfaced that the locked CTA label `Get in Touch` already appears as the visible button text on two other home-page CTAs the copywriter did not have explicit visibility into during the Arch Gate lock pass:

- `index.html:229` — `<a class="btn btn-primary">Get in Touch</a>` inside the "Open to Senior Engineering Leadership Roles" section.
- `index.html:264` — `<a class="btn btn-white">Get in Touch</a>` inside the closing CTA section (h2 = "Let's Talk", which is one of the copywriter's *rejected alternatives*).

The hero CTA (text-link tier) now joins these two existing instances (filled-primary tier and white-on-dark tier) using consistent label text across three visual treatments. Doubly consistent: the site already establishes both "Get in Touch" (as button labels) and "Let's Talk" (as a section heading) — the copywriter's choice aligns with the page's existing voice across both rejection rationales and the locked recommendation.

**Disposition:** Resolve inline. Strengthens (does not weaken) the lock. No action required; logged for retro consideration.

### Verification results

- `class="btn-textlink"` in `index.html` — raw count **2**, true-positive count **2** (both inside `.hero-cta-stack`). Matches AG-IG-2 prediction.
- `href="contact.html"` in `index.html` — raw count **5**, true-positive count **1** new (line 138, hero CTA). Four pre-existing: header nav (107), section CTAs (229, 264), footer nav (286). Matches AG-IG-2 framing.
- `"Get in Touch"` in `specs/backlog.md` — **0**. Matches AG-IG-5 prediction.
- `"Hero CTA"` in `specs/backlog.md` — **0**. Backlog cleanup complete per AC10.
- New anchor indentation: 28 spaces, matches existing `.hero-cta-stack` children. UTF-8 arrow glyph (`→`) preserved.

---
