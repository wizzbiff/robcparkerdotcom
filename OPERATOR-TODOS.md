# OPERATOR TODOS — Out-of-Codebase Actions for robcparker.com

**WHAT THIS FILE IS — READ THIS FIRST.**

This file tracks **post-deploy and out-of-repo actions** that fall outside the SDD pipeline and therefore will NOT be done by SPEC-010 through SPEC-014 implementations. These are things only Rob can do — submitting sitemaps to Google, updating LinkedIn About, sourcing logo assets, booking a headshot session, running Lighthouse audits, etc.

This file exists because the audit (`robcparker_com_audit.md`, dated 2026-04-25) surfaced ~10 high-value actions that aren't code changes and would otherwise get lost between gate approvals. They are flagged here loudly so they don't slip.

**How to read this file:**
- Items are grouped by category.
- Each item has: a one-line description, a source pointer (audit dimension/lines), a priority (Critical / Important / Nice to have — mirroring the audit's severity tags), and a rough effort estimate.
- Completion of these items is **independent of spec status** — Rob does them on his own schedule, not gated by Spec / Arch / QA gates.
- **Re-verify before action.** Some items may have shifted or been resolved by the time Rob acts on them. Check the audit, the relevant spec, and current site state before doing the work.

Last updated: 2026-04-25 by PM-Spec agent.

---

## SEO platform actions (post-SPEC-013 deploy)

These unblock the inbound-link / indexing flywheel after SPEC-013 ships. Without them, the metadata + schema + sitemap work in SPEC-013 is mostly dormant.

- [ ] **Submit `/sitemap.xml` to Google Search Console.** Verify domain ownership (DNS TXT record or HTML file upload via Cloudflare). Submit `https://www.robcparker.com/sitemap.xml`. Confirm at least one URL is indexed within 7 days.
  - **Source:** audit lines 204, 308.
  - **Priority:** Critical.
  - **Effort:** ~30 minutes (most of which is property verification).
  - **Note:** verification ideally uses the DNS TXT method via Cloudflare DNS — fastest and most resilient. The Cloudflare dashboard supports this directly without third-party DNS setup.

- [ ] **Submit `/sitemap.xml` to Bing Webmaster Tools.** Same flow — verify property, submit sitemap.
  - **Source:** audit line 204.
  - **Priority:** Important.
  - **Effort:** ~15 minutes.
  - **Note:** Bing Webmaster supports importing the property directly from Google Search Console once the GSC verification is complete. That cuts setup time in half.

---

## External profile updates — inbound link acquisition

The audit (lines 207, 308-310) is direct: "two or three inbound links from properties Google trusts is enough to start indexing." These are what actually drive search visibility once SPEC-013 ships.

- [ ] **Add `https://www.robcparker.com` to LinkedIn About section.** Audit names this as the single highest-leverage inbound link.
  - **Source:** audit lines 208, 310.
  - **Priority:** Critical.
  - **Effort:** <5 minutes.
  - **Note:** also a chance to update the LinkedIn About summary to match the SPEC-010 R5 verb correction ("directed teams that built and shipped" rather than "built and led" the SugarCRM AI platform). LinkedIn is out-of-repo so SPEC-010 cannot do this; flagged here as the operator companion. If Rob wants to maintain the LinkedIn ↔ resume ↔ site three-artifact alignment audit Dimension 4 calls out, this is the moment.

- [ ] **Add `https://www.robcparker.com` to GitHub bio.** If GitHub URL is confirmed for SPEC-012 R4 / SPEC-013 R5 `sameAs`, the URL relationship should be reciprocal — site links to GitHub, GitHub links back to site.
  - **Source:** audit line 208.
  - **Priority:** Important.
  - **Effort:** <5 minutes.

- [ ] **Add to AI Tinkerers community profile if applicable.** Audit specifically calls out AI Tinkerers as an authoritative property in Atlanta tech community.
  - **Source:** audit line 208.
  - **Priority:** Nice to have.
  - **Effort:** <10 minutes (assuming Rob already has the profile).

- [ ] **Add to AngelList / Wellfound profile if applicable.** Same logic.
  - **Source:** audit line 208.
  - **Priority:** Nice to have.
  - **Effort:** <10 minutes.

---

## Visual asset acquisition

- [ ] **Confirm About-page headshot is a real professional photo.** Audit explicitly recommends a 1-hour Atlanta business headshot session ($300-$600) if the current image is anything less than a professional shot. The current asset is at `images/rob-parker-headshot@2x.jpg` (committed) and was originally vetted in SPEC-002.
  - **Source:** audit lines 32-34.
  - **Priority:** Important.
  - **Effort:** <5 minutes if existing photo is professional; multi-day if a new session needs to be booked (~1 hour shoot + 1-2 weeks for delivery + an SDD trivial spec to swap the image and re-run image optimization per `governance/stack-quirks.md`).
  - **Note:** if a new shoot happens, also consider a landscape-orientation shot for the home-page hero (audit line 34 recommends this) and a separate headshot for the branded OG card (SPEC-013 R3) if `graphic-artist` wants a portrait crop in the OG composition.

- [ ] **Source clean monochrome logos for SPEC-012 R2 "Where I've Built" strip.** Six logos: Cisco, Qcept, M2SYS, athenahealth, Salesfusion, SugarCRM. Need monochrome SVG (preferred) or PNG for each. SVG sources from each company's brand pages where available (most B2B SaaS publish brand kits). For older / smaller / less-publicly-branded companies (M2SYS, Qcept), `graphic-artist` may need to recreate from logos visible on archived web pages.
  - **Source:** audit line 229; SPEC-012 R2 + Q5.
  - **Priority:** Important (blocking dependency for SPEC-012 R2).
  - **Effort:** ~1 hour if SVG available across the board; multi-day if recreation needed for 1-2 of the older companies.
  - **Note:** if any one logo cannot be sourced cleanly, ship SPEC-012 R2 with five logos rather than six (or defer R2 entirely per Spec-Gate Q8). Do not block the entire spec on a single missing asset.
  - ↳ **2026-05-08 (SPEC-015 R7 follow-up):** SugarCRM rebranded to SugarAI as of 2026-04-13. When SPEC-012 R2 picks up, source the **SugarAI** brand asset for the most-recent (leftmost) logo slot, not SugarCRM. The SPEC-012 R2 spec text still references `sugarcrm_logo.jpeg` — implementer renames to `sugarai_logo` and updates alt text to "SugarAI" on pickup. Original line above preserved for audit trail per Q8.

- [ ] **Branded OG card design** for SPEC-013 R3.  Already inside SPEC-013 with `graphic-artist` invocation, but production may run multi-day. If the card is not ready by SPEC-013 deploy, the spec ships with the headshot URL placeholder and a follow-on trivial spec swaps the URL once the card is delivered.
  - **Source:** audit line 206; SPEC-013 R3 + Q1.
  - **Priority:** Important (degrades to placeholder; not blocking).
  - **Effort:** ~1 day for `graphic-artist` to design + 1 day for Rob review iteration.

---

## Validation / verification (post-deploy of relevant specs)

These are checks Rob runs after the relevant specs ship to confirm the expected outcomes hold in real browsers / real search-engine views.

- [ ] **Run site through Lighthouse SEO audit** (Chrome DevTools → Lighthouse → SEO). Target 90+ per audit line 215. Do this AFTER SPEC-013 deploys.
  - **Source:** audit line 215.
  - **Priority:** Important.
  - **Effort:** ~10 minutes.
  - **Note:** if score is below 90, capture findings and open a follow-on trivial spec.

- [ ] **Run site through opengraph.xyz and LinkedIn Post Inspector** to verify OG cards render correctly. Test the home page, about, resume, contact, advisory URLs in both tools. Confirm the OG image, title, description appear as expected.
  - **Source:** audit line 324.
  - **Priority:** Important.
  - **Effort:** ~15 minutes.
  - **Note:** if SPEC-013 R3 ships with the headshot placeholder OG image, the cards will render with the headshot — visually adequate but not as branded as the 1200×630 card. Acceptable interim state.

- [ ] **Verify body copy contrast meets WCAG AA 4.5:1.** Use Chrome DevTools' built-in contrast checker on body text and the various color-on-color pairs. Confirm against `governance/stack-quirks.md` and the SPEC-009 D4 contrast block.
  - **Source:** audit line 41.
  - **Priority:** Important.
  - **Effort:** ~15 minutes.
  - **Note:** SPEC-009 already verified contrast for the SPEC-008/009 design language. This is a real-browser confirmation pass.

- [ ] **Verify mobile breakpoints at 375px and 414px viewports.** Chrome DevTools → Device Toolbar. Spot-check stat blocks, hero, logo strip (if SPEC-012 R2 ships), testimonials block (if SPEC-012 R1 ships), contact form select (after SPEC-014 ships).
  - **Source:** audit line 42.
  - **Priority:** Important.
  - **Effort:** ~15 minutes.

- [ ] **Tab through every page; confirm visible focus rings on all interactive elements.** Browser keyboard navigation. Audit explicitly calls this out.
  - **Source:** audit line 65.
  - **Priority:** Important.
  - **Effort:** ~10 minutes (5 pages × ~2 min).

- [ ] **Submit a test message via the contact form** post-SPEC-014 deploy. Verify the new `intent` field value appears in the Formspree dashboard submission view AND in the email delivered to `contact@robcparker.com`. Try at least two values (e.g., "Hiring" and "Advisory") to confirm pass-through.
  - **Source:** SPEC-014 R3 acceptance criteria.
  - **Priority:** Important.
  - **Effort:** ~10 minutes.

- [ ] **Run Google's Rich Results Test** at `https://search.google.com/test/rich-results` against the home, about, resume, contact, and advisory URLs post-SPEC-013 deploy. Confirm the Person schema renders without errors or warnings.
  - **Source:** SPEC-013 R5 acceptance criteria.
  - **Priority:** Important.
  - **Effort:** ~10 minutes.

---

## Memory hygiene (one-time cleanups)

- [ ] **Delete `project_fractional_cleanup_deferred.md` from auto-memory.** "Fractional engineering leader" no longer appears anywhere on the site as of 2026-04-25 — confirmed by Rob during SPEC-007 implementation (the SPEC-007 R8 "fractional" harmonization shipped). The deferral memory item is now stale and should be retired.
  - **File path:** `/home/robparker/.claude/projects/-home-robparker-Documents-dev-robcparkerdotcom/memory/project_fractional_cleanup_deferred.md`
  - **Also remove:** the corresponding line from `MEMORY.md` index.
  - **Source:** auto-memory contents at session start (2026-04-25); Rob confirmed during SPEC-010-014 spec authoring.
  - **Priority:** Nice to have (no functional impact; memory clutter only).
  - **Effort:** <2 minutes.
  - **Trigger:** do this once SPEC-010 through SPEC-014 ship and the SPEC-010-family is closed out.

- [ ] **Update `project_third_party_tbd.md` memory** — Formspree is no longer a "placeholder from template." It is the live, working backend for `contact.html` (form ID `mvzdrbnk`, recipient `contact@robcparker.com` per SPEC-007 R6). The memory file's framing needs updating: Formspree should be removed from the "TBD / placeholder" list, leaving only Google Fonts and CalendarBridge (if those remain placeholders) on that list.
  - **File path:** `/home/robparker/.claude/projects/-home-robparker-Documents-dev-robcparkerdotcom/memory/project_third_party_tbd.md`
  - **Source:** SPEC-014 Q1 / Q7 surfaced the discrepancy.
  - **Priority:** Nice to have.
  - **Effort:** <5 minutes.

- [ ] **Confirm the LinkedIn URL convention used in `sameAs`.** SPEC-013 R5 uses `https://www.linkedin.com/in/robcparker/` — this matches the existing site reference at `index.html:248`. Verify this is Rob's canonical LinkedIn URL (some LinkedIn users have alternate vanity URLs; whatever Rob's actual `/in/` slug is should be the authoritative one). One-time check at SPEC-013 implementation.
  - **Source:** SPEC-013 R5; current site usage.
  - **Priority:** Important (load-bearing for `sameAs` disambiguation).
  - **Effort:** <2 minutes.

---

## Inbox configuration (post-SPEC-014)

- [ ] **Set up reply templates and inbox filtering for the five intent values.** Once SPEC-014 R1 ships, every inbound contact-form message arrives with an `intent: ` line in the email body. Worth setting up:
  - Gmail filter / label per intent value (auto-label "Hiring" "Advisory" "Networking" etc. on incoming `contact@robcparker.com` mail)
  - Pre-drafted reply templates per intent (Hiring → "thanks for reaching out, here's my availability and current calibration"; Advisory → "advisory inquiries are by direct introduction; can you share who suggested you reach out?"; etc.)
  - **Source:** SPEC-014 Out-of-Scope note + audit line 314.
  - **Priority:** Nice to have (works without; just less efficient triage).
  - **Effort:** ~30-45 minutes upfront; saves time per-message thereafter.

---

## How to use this list

- **This list is not a backlog and not a spec.** Items here are not tracked through Spec / Arch / QA gates. They're operator actions that complement the deployed code.
- **Completion is independent of spec status.** A spec can ship without its companion operator-todos being done. The operator items happen on Rob's calendar, not the SDD pipeline's.
- **Re-verify before acting.** This list was built in one sitting on 2026-04-25 alongside SPEC-010 through SPEC-014. By the time any item is acted on, the spec landscape, the audit interpretation, or Rob's priorities may have shifted. Cross-check against:
  - The relevant spec (linked by source pointer)
  - The audit (`robcparker_com_audit.md`)
  - The current state of the site
- **Add new items as they surface.** When a spec generates a new operator-side companion action (post-deploy verification, third-party setup, asset acquisition), append to the relevant section above. Don't let the file go stale by not updating it.
- **Remove items as they're done.** Check the box and leave the item in place for one cycle (so the next review can confirm completion); after that, it's safe to archive or delete the line.
- **Priority labels mirror the audit:**
  - **Critical** = candidate-credibility-impacting or indexing-blocking (do these first)
  - **Important** = closes a real gap but won't kill the site if delayed a week
  - **Nice to have** = polish or convenience; ship if there's slack

---

*Generated 2026-04-25 by PM-Spec agent alongside SPEC-010 through SPEC-014. Sourced from `robcparker_com_audit.md` (audit dated 2026-04-25).*
