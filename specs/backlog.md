# Spec Backlog — Future Spec Candidates

This file tracks **spec ideas surfaced but not yet promoted to numbered specs**. Items here have a defined source and concrete scope but have not been written up as `SPEC-NNN-*.md` files. Promote an item to a numbered spec when it is ready to enter the SDD pipeline.

This is **not** a list of out-of-codebase operator todos — those live in `OPERATOR-TODOS.md`. This is also **not** a list of memory items — those live in the auto-memory system. This file is specifically for *would-be specs that have been deferred*.

---

## Open candidates

### Hero CTA — add tertiary "Get in Touch" link

- **Source:** `robcparker_com_audit.md` Dimension 2 (lines 51-53)
- **Origin:** Surfaced during SPEC-011 Spec Gate (Q5); scope-cut from SPEC-011 to keep that spec focused on advisory removal.
- **Scope:** Add a tertiary "Get in Touch" link to the home hero CTA stack at `index.html:94-97` (currently has "View My Resume" and "Learn More About Rob"), OR alternatively make the Contact item visually prominent in the main nav (slightly bolder weight, or a subtle visual treatment). Goal: give a recruiter who decides "I want to talk to this person right now" a fast path from landing → contact.
- **Tier estimate:** Trivial
- **Status:** Idea — ready to promote
- **Date added:** 2026-04-25

### GitHub link on Contact page

- **Source:** `robcparker_com_audit.md` Dimension 7 (lines 235-237)
- **Origin:** Scoped as R4 in SPEC-012 draft; deferred at Spec Gate (2026-04-26) because Rob's GitHub profile is not currently in a state he wants linked from a Director/VP candidate site.
- **Scope:** Add a third `<li class="alt-channel-item">` to `contact.html:211-235` (the `<ul class="alt-channels-list">`) after LinkedIn and Email. List becomes LinkedIn → Email → GitHub. Markup reuses `.alt-channel-item`, `.alt-channel-label`, `.alt-channel-link` (no CSS changes). Uses `target="_blank"` + `rel="noopener noreferrer"` + accessible aria-label matching the LinkedIn pattern at `contact.html:215-220`.
- **Promotion trigger:** Rob has populated his GitHub profile (e.g., starter README, a few visible repos) to a state he's comfortable linking from the candidate site.
- **Tier estimate:** Trivial
- **Status:** Idea — promotion-ready once profile is updated
- **Date added:** 2026-04-26

---

## How to use this file

- **Add an item** when a spec discussion produces a real, scoped follow-on idea that is not appropriate to bundle into the current spec.
- **Each entry** must have: source, origin (which spec/discussion surfaced it), scope (concrete enough to estimate), tier estimate, status, date added.
- **Promote an item** by writing it up as the next available `SPEC-NNN-*.md` and removing the entry from this file. Note the promotion in the new spec's "Dependencies" or "Context" section so traceability is preserved.
- **Drop an item** if conditions change and it no longer makes sense (note the drop reason in a brief commit message rather than leaving the entry as "abandoned").
