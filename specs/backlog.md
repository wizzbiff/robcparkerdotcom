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

### Canonical-tag / live-URL host mismatch (apex vs. www)

- **Source:** Discovered during SPEC-015 post-deploy verification 2026-05-09.
- **Origin:** Live site serves at apex (`https://robcparker.com/`) but every page's `<link rel="canonical">` and OG/Twitter `url` tags point to `https://www.robcparker.com/...html`. The www subdomain returns HTTP 522 (Cloudflare connection timeout) — it is not a working alias. Search engines crawling the live URL see canonical signals pointing at a host that times out, which can suppress indexing or fragment ranking signal between the working apex and the dead www variant.
- **Pre-existing:** NOT introduced by SPEC-015. Canonicals were established in SPEC-003 (resume), SPEC-004 (contact), SPEC-005 (advisory) and rounded out in SPEC-013 R8 (index, about). All five specs predate the live Cloudflare Pages connection (2026-05-01 through 2026-05-08), so the www framing reflected the original deploy assumption.
- **Scope:** Two coordinated changes likely needed: (1) update every `<link rel="canonical">`, `<meta property="og:url">`, `<meta property="og:image">`, `<meta name="twitter:image">`, and any other absolute-URL references across `index.html`, `about.html`, `advisory.html`, `resume.html`, `contact.html` from `https://www.robcparker.com/...` to `https://robcparker.com/...`; (2) update `sitemap.xml` `<loc>` entries similarly; (3) decide whether to also strip `.html` from the canonical paths to match Cloudflare's clean-URL behavior (`/resume.html` 308-redirects to `/resume`) or leave `.html` as the canonical form; (4) update Person JSON-LD `image` and `url` to apex; (5) confirm `governance/stack-quirks.md` / SPEC-013 has the apex convention recorded as the source of truth going forward. Alternative: configure Cloudflare to accept both apex and www (DNS / Cloudflare Pages domain config), then keep canonicals as-is — but that is operator work, not a spec.
- **Tier estimate:** Standard. Multi-component (~10 absolute-URL surfaces across 5 HTML files + sitemap.xml + JSON-LD blocks); SEO-load-bearing; needs a single coherent migration so canonical / OG / sitemap stay consistent.
- **Status:** Idea — ready to promote (no blocker; Rob's call on whether to fix in code or fix at the Cloudflare DNS layer).
- **Date added:** 2026-05-09

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
