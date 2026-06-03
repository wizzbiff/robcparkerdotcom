# Spec Backlog — Future Spec Candidates

This file tracks **spec ideas surfaced but not yet promoted to numbered specs**. Items here have a defined source and concrete scope but have not been written up as `SPEC-NNN-*.md` files. Promote an item to a numbered spec when it is ready to enter the SDD pipeline.

This is **not** a list of out-of-codebase operator todos — those live in `OPERATOR-TODOS.md`. This is also **not** a list of memory items — those live in the auto-memory system. This file is specifically for *would-be specs that have been deferred*.

---

## Open candidates

### Rebrand-credibility sentence — SugarAI platform attribution

- **Source:** SPEC-015 R8 (originally drafted; dropped at Spec Gate 2026-05-08 per Q2 resolution).
- **Origin:** Rob's SPEC-015 request asked for "a brief note somewhere within the existing language on the page to state that my AI-Native platform work set the stage for the rebrand to SugarAI." Dropped at Spec Gate because the public framing of the SugarAI rebrand (CEO open letter at `sugarclub.sugarai.com/engage/b/sugar-news/posts/sugarcrm-is-now-sugarai-an-open-letter-from-our-ceo`, published 2026-04-13) attributes the change to no specific platform, leader, or team — making any Rob-attributed credibility sentence publicly unverifiable. Per `feedback_credibility_signals_philosophy.md` memory, the existing capability copy ("directed teams that built and shipped SugarAI's multi-tenant AI platform on AWS Bedrock") is the publicly defensible signal; layering an explicit attribution sentence on top would have legitimacy-signal texture.
- **Scope:** Single integrated sentence at `about.html:150` bio paragraph (PM-Spec original L2 recommendation), or alternatively at `resume.html:160` Summary as a tight clause. Wording draft (open for marketing-copywriter optimization at promotion): "That platform work set the stage for the company's 2026 rebrand to SugarAI." Avoid first-person possessive overclaim. Capability-signal phrasing only.
- **Promotion trigger:** SugarAI publishes any of (a) a case study naming the multi-tenant AI platform, (b) a customer quote referencing it, (c) an interview / blog post / press piece naming engineering contributors, or (d) any public material that corroborates the platform-as-foundation framing. Any one of these makes the credibility sentence publicly verifiable to the senior-exec audience that takes 90 seconds to skim public material.
- **Tier estimate:** Trivial
- **Status:** Idea — deferred pending SugarAI corroborating public material
- **Date added:** 2026-05-08

---

## How to use this file

- **Add an item** when a spec discussion produces a real, scoped follow-on idea that is not appropriate to bundle into the current spec.
- **Each entry** must have: source, origin (which spec/discussion surfaced it), scope (concrete enough to estimate), tier estimate, status, date added.
- **Promote an item** by writing it up as the next available `SPEC-NNN-*.md` and removing the entry from this file. Note the promotion in the new spec's "Dependencies" or "Context" section so traceability is preserved.
- **Drop an item** if conditions change and it no longer makes sense (note the drop reason in a brief commit message rather than leaving the entry as "abandoned").
