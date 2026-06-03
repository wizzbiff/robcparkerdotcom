# Job-Market Mode — Toggle Manifest

**Current state: MODE OFF** (neutral capability positioning) — set 2026-06-03 by SPEC-022.

This site can present in two modes:

- **MODE ON** — actively signals Rob is on the job market (open to / targeting Director, VP, CTO roles).
- **MODE OFF** — neutral, capability-forward positioning; reachable but not signaling availability. *(current)*

There is no build step or feature flag — this is a static HTML site. This manifest **is** the toggle:
every job-market string lives in exactly one row below, with both its MODE OFF (current) and MODE ON
(job-market) value.

## How to flip back to MODE ON

For each row in the table: open the named file, find the **MODE OFF string**, and replace it
byte-for-byte with the **MODE ON string**. Anchors are stable locators (element `id`, meta tag, or a
unique surrounding substring) — **not** line numbers, which drift. When done:

1. Flip the state line at the top of this file to `MODE ON`.
2. Restore the resume PDF (see *Operator dependency* below).
3. Update the `project_positioning.md` memory back to a job-hunt framing.
4. Re-verify against the apex domain (`https://robcparker.com`, never `www.`).

To go back to MODE OFF, do the reverse (MODE ON string → MODE OFF string).

## Deliberately untoggled (Q5)

The contact-form **"Hiring opportunity"** intent option (`contact.html`, `<option value="hiring">`)
and its email-subject mapping (`js/main.js`, `SUBJECT_BY_INTENT.hiring`) are **intentionally retained
in both modes** (SPEC-022 Spec Gate Q5). A senior leader fields inbound role conversations regardless
of search status, and the option keeps the SPEC-014 form plumbing intact. **Do not** treat these as
job-market strings; do not toggle them.

---

## Restore table

> Description tags come in identical triplets per page (`meta name="description"`, `og:description`,
> `twitter:description`) — restore all three together. Contact-page **title** strings are also a triplet
> (`<title>`, `og:title`, `twitter:title`).

| TP | File | Anchor | MODE OFF string (current) | MODE ON string (restore) |
|----|------|--------|---------------------------|--------------------------|
| TP-01 | `index.html` | description triplet | `Rob Parker is a senior engineering executive in Atlanta with 25+ years building AI-native platforms and scaling high-performing engineering teams.` | `Rob Parker is a senior engineering executive in Atlanta with 25+ years scaling AI platforms and high-performing teams. Open to Director, VP, and CTO roles.` |
| TP-02 | `index.html` | `<h2 id="ft-cta-heading">` | `Let's Connect.` | `Open to Senior Engineering Leadership Roles.` |
| TP-03 | `index.html` | `<p>` directly under `#ft-cta-heading` | `If you want to talk engineering leadership, AI platform strategy, or advisory — the contact form is the right first step.` | `If you are evaluating Director, VP, or CTO of Engineering candidates for an AI-forward SaaS company, I would welcome the conversation. Tell me about the role and the team.` |
| TP-04 | `index.html` | `<p>` under `<h2 id="cta-heading">` (dark footer CTA) | `Engineering leadership, AI platform strategy, or advisory — Rob is always open to the right conversation. Reach out directly.` | `If you are evaluating senior engineering leadership candidates for a Director, VP, or CTO of Engineering role, Rob is open to the conversation. Reach out directly.` |
| TP-05 | `index.html` | dev comment above `#ft-cta-heading` section (cosmetic; public source) | `<!-- CONTACT CTA -->` | `<!-- FULL-TIME ROLE CTA — replaces the deleted "How Rob Engages" section -->` |
| TP-06 | `about.html` | description triplet | `Rob Parker builds AI-native engineering organizations at scale. 25+ years experience, 10+ in senior leadership. Atlanta-based senior engineering executive.` | `Rob Parker builds AI-native engineering organizations at scale. 25+ years experience, 10+ in leadership. Atlanta-based; targeting Director, VP, and CTO roles.` |
| TP-07 | `about.html` | `<p class="hero-subheadline">` | `Senior Engineering Executive — AI-Native Platforms, Scaling Engineering Organizations` | `Director/VP of Engineering — AI-Native Platforms, Scaling Engineering Organizations` |
| TP-08 | `about.html` | 3rd `<p>` in `.hero-bio` (the one ending "Based in Atlanta, Georgia.") | `Based in Atlanta, Georgia.` | `I'm now actively exploring Director and VP of Engineering opportunities at AI-forward SaaS companies ready to scale and embrace agentic development. Based in Atlanta, Georgia.` |
| TP-09 | `about.html` | `<p>` under `<h2 id="cta-heading">` | `Whether you're building on AI, scaling an engineering organization, or navigating M&amp;A — I'm worth a conversation.` | `If you are evaluating senior engineering leaders building on AI, I would welcome the conversation.` |
| TP-10 | `resume.html` | description triplet | `25+ years building AI-native platforms and scaling engineering teams. SugarAI (formerly SugarCRM), Salesfusion, athenahealth. Senior engineering executive.` | `25+ years building AI-native platforms and scaling engineering teams. SugarAI (formerly SugarCRM), Salesfusion, athenahealth. Targeting Director, VP, CTO.` |
| TP-11 | `resume.html` | `<p class="resume-positioning">` | `Senior Engineering Executive &middot; AI-Native Platforms &middot; Atlanta, Georgia` | `Senior Engineering Executive &middot; AI-Native Platforms &middot; Targeting Director/VP` |
| TP-12 | `resume.html` | end of `.resume-summary` `<p>` (after "…acquisition by SugarCRM.") | *(no trailing sentence)* | *(append)* ` Targeting Director or VP of Engineering roles at AI-forward companies.` |
| TP-13 | `resume.html` | `<p>` under `<h2 id="cta-heading">` | `If you want to talk engineering leadership or explore an advisory engagement, I'm worth a conversation.` | `If you are evaluating senior engineering leaders for Director or VP roles, I would welcome the conversation.` |
| TP-14 | `contact.html` | title triplet (`<title>`, `og:title`, `twitter:title`) | `Contact Rob Parker &mdash; Senior Engineering Executive, Atlanta` | `Contact Rob Parker &mdash; Director &amp; VP Engineering Roles, Atlanta` |
| TP-15 | `contact.html` | description triplet | `Get in touch with Rob Parker — senior engineering executive in Atlanta. Replies within a few business days.` | `Reach Rob Parker about Director, VP, or CTO of Engineering roles at AI-forward SaaS companies. Replies within a few business days. Atlanta-based.` |
| TP-16 | `contact.html` | `<p class="hero-subheadline">` | `Use the form to get in touch — whether it's about advisory, a speaking opportunity, or anything else. I reply within a few business days.` | `If you are evaluating Director, VP, or CTO of Engineering candidates for an AI-forward SaaS company, I would welcome the conversation. I reply within a few business days. Advisory inquiries by direct introduction only.` |
| TP-17 | `advisory.html` | description triplet | `Selective technical advisory — AI platform strategy, architecture reviews, M&amp;A integration, and engineering org assessments. Rob Parker.` | `Selective advisory engagements alongside a Director or VP search — AI platform strategy, architecture reviews, M&amp;A integration, engineering org assessments.` |
| TP-18 | `advisory.html` | first sentence of `<p class="hero-subheadline">` | `I take on a small number of advisory engagements — selective by design.` | `I take on a small number of advisory engagements alongside my primary focus on full-time Director and VP of Engineering roles.` |
| TP-19 | `how-this-site-was-built.html` | first sentence of the `#why` section `<p>` | `Most engineering leaders can describe how they would bring AI-native practices to an organization.` | `Most candidates for senior engineering roles can describe how they would bring AI-native practices to an organization.` |
| TP-20 | `how-this-site-was-built.html` | last sentence of the closing CTA `<p>` (under `<h2 id="cta-heading">This Page Is the Portfolio</h2>`) | `If you build this way too, let's talk.` | `If you're evaluating engineering leaders who build this way, let's talk.` |

---

## Operator dependency — resume PDF

The canonical downloadable resume (`files/rob-parker-resume.pdf`) is a binary regenerated outside the
repo. In MODE OFF (current) its Summary ends at "…led the technical track of acquisition by SugarCRM."
To restore **MODE ON**, regenerate the PDF with the targeting sentence appended to the Summary
(mirroring TP-12): "Targeting Director or VP of Engineering roles at AI-forward companies." Per CLAUDE.md,
update the PDF first, then confirm `resume.html` (TP-12) matches.

## Notes

- Brand name: `resume.html` uses "SugarAI" (SPEC-015 rebrand); the resume PDF body uses "SugarCRM". This
  predates SPEC-022 and is unrelated to job-market mode — do not change it as part of a toggle.
- This manifest was produced by SPEC-022 (`specs/SPEC-022-job-market-mode-toggle.md`). See that spec's
  Pre-Implementation String Lock for the byte-level rationale behind each MODE OFF string.
- The `project_positioning.md` auto-memory tracks which mode is live; keep it in sync when toggling.
