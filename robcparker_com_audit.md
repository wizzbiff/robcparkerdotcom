# robcparker.com — Website Audit

**Auditor perspectives:** UI/UX professional, executive recruiter for Director / VP / CTO at AI forward B2B SaaS, prospective buyer of fractional advisory services.

**Sources reviewed:** PDFs of Home, About, Resume, Advisory, and Contact pages; Rob Parker resume; live search visibility checks for `robcparker.com` and "Rob Parker SugarCRM Atlanta" against multiple search queries.

**Method note:** Live HTML fetch returned 403 (Cloudflare bot block, expected and not a problem in itself). Visual / interaction / metadata items I could not verify directly are flagged as "verify yourself" with the specific check to run.

---

## Executive Summary

**Overall rating: Needs Work, leaning Close.**

The content is genuinely strong. Voice and positioning read at executive level, the structure is right, the writing is sharper and more opinionated than 90% of personal sites built by senior engineering leaders. The differentiated framework (three tier AI adoption: Baseline, Accelerator, Champion) is a memorable hook recruiters can repeat back. If the goal were just "have a credible site," you'd be done.

But three problems hold this back from "Close" or "Ready":

1. **Self inflicted credibility risks.** The home page says "30+ engineers led directly"; the resume says 26. The home page claims "an 80% DevEx score" that appears nowhere on the resume. The About page lists tools (Claude Code, CodeRabbit) the resume does not. A diligent recruiter or hiring manager will spot these in 60 seconds and the site loses trust right when it should be earning it.
2. **The advisory page actively hurts the primary goal.** Sitting alongside an active full time search, with its own nav link and a CTA on the home page, it gives recruiters a plausible reason to wonder if you're hedging. At Director / VP / CTO level, hedging is a real disqualifier with PE backed B2B SaaS. The advisory content itself is well written; the placement is wrong.
3. **The site is functionally invisible in search.** Searching for `robcparker.com` in quotes returns zero results from the actual site. Searching for "Rob Parker SugarCRM Atlanta" surfaces LinkedIn, TheOrg, and RocketReach, not your site. With a name as common as yours (NASA engineer, Australian dam consultant, Sweetwater sales engineer, etc.), the site needs aggressive disambiguation or it doesn't get found.

Each of these is fixable in under a day of focused work. The core asset is good. It just needs to stop tripping over itself.

---

## Dimension 1: Visual Design and Aesthetics

**Observation:** Editorial serif wordmark for "Rob Parker" is a strong choice. It signals seriousness and longevity and avoids the generic "Inter on white" SaaS aesthetic that most engineering leaders default to. Generous whitespace. Layout looks current, not dated.
**Severity:** N/A (this is a strength).

**Observation:** The headshot on the About page is the only image on the entire site. For an executive personal site, that one image carries disproportionate weight.
**Severity:** Important.
**Recommendation:** Confirm the headshot is a real professional photo (not AI generated, not a casual snap). If you have any doubt, get a 1 hour session with an Atlanta business headshot photographer ($300 to $600). One quality landscape shot in the home hero, plus the About headshot, would noticeably lift the polish.

**Observation:** Home page hero is text only with no visual anchor. Functional but slightly flat for someone targeting CTO conversations.
**Severity:** Nice to have.
**Recommendation:** Add a single visual element to the hero. Options: a small photo crop, a typographic mark with your initials, or a subtle geometric treatment. Avoid stock illustrations and avoid AI generated abstract gradients.

**Verify yourself:**
- Color palette contrast for body copy on white. Body copy must hit 4.5:1 minimum (WCAG AA).
- Mobile breakpoint behavior at 375px and 414px widths. Stat blocks, in particular, often break poorly on mobile.

---

## Dimension 2: UI, UX, and Information Architecture

**Observation:** Navigation is conventional and clean: Home, About, Resume, Advisory, Contact. No surprises, no dead ends. Good.
**Severity:** N/A (this is a strength).

**Observation:** The home hero CTAs are "View My Resume" and "Learn More About Rob." Resume is the right primary CTA for the job search goal. But there's no contact CTA in the hero, so a recruiter who decides "I want to talk to this person right now" has to navigate to find the contact page.
**Severity:** Important.
**Recommendation:** Add a tertiary "Get in Touch" link in the hero, or make the Contact item visually prominent in the nav (slightly bolder weight, or set off by a subtle visual treatment).

**Observation:** The contact form is one bucket. Name, email, message. No way to differentiate "I have a VP role to discuss" from "I'd like to hire you for a 4 week advisory engagement" from "Can we get coffee."
**Severity:** Important.
**Recommendation:** Add a "What's this about?" select field with options: Hiring opportunity / Advisory inquiry / Networking / Press or speaking / Other. This gives you triage signal, lets you set different reply templates, and gives you a paper trail of inbound type for retrospective.

**Observation:** Footer / contact redundancy is good. LinkedIn and email are listed below the form so the form failing or being intimidating doesn't kill the conversation.
**Severity:** N/A (this is a strength).

**Verify yourself:**
- Heading hierarchy is semantic. The eyebrow "SENIOR ENGINEERING EXECUTIVE" should not be the page h1; "Rob Parker" should be. Inspect with browser dev tools or the [W3C HTML validator](https://validator.w3.org/).
- Alt text on the headshot. "Rob Parker, Senior Engineering Executive, Atlanta, Georgia" is a reasonable default.
- Visible focus states on all interactive elements. Tab through the page and confirm every focusable element has a visible ring.

---

## Dimension 3: Content and Positioning for Executive Roles

This is the strongest dimension. The voice is confident without being grandstanding. A few specific calls.

**Strengths to keep:**
- Opening line ("I build engineering organizations that ship, and keep shipping, at scale") is outcome focused and memorable.
- "The full arc of organizational complexity: building from scratch, scaling through hypergrowth, surviving M&A, and modernizing platforms that couldn't afford to stand still." This is genuine VP/CTO framing.
- "Leadership at the Director and VP level is also about holding the line between two things that appear to be in tension: technical excellence and business velocity." Reads like someone who has actually had to make those calls.
- "Dropping a coding assistant on a team and calling it AI adoption is not a strategy." Sharp opinion. Worth gold to a recruiter screening 200 candidates.
- The Three Tier AI Adoption Framework is a named, defensible artifact recruiters and CTOs will remember. This is your single best differentiation asset on the site.

**Weaknesses:**

**Observation:** Home page says "Currently driving AI platform strategy." Per resume, the SugarCRM tenure ended March 2026.
**Severity:** Important.
**Recommendation:** Change to "Most recently led AI platform strategy" or "Recently directed enterprise AI platform engineering." Present tense reads either inaccurate or stale depending on how the reader interprets it.

**Observation:** Home page stat row uses "AI/ML" as one of four featured numbers. Category, not a metric. Weakest item in the row.
**Severity:** Nice to have.
**Recommendation:** Replace with an actual quantitative anchor. Options drawn from your resume: "$2M" (engineering budget), "17+" (major releases annually), "5" (engineering managers built and developed), or even "Multi tenant" with a specific lead like "AI platform on AWS Bedrock through beta release." Anything is stronger than a category label.

**Observation:** "3+ Across High Stakes Industries" stat. The "+" on a single digit number reads weak. If the answer is 3, just say 3. If the answer is more, give the number.
**Severity:** Nice to have.

**Observation:** The "How Rob Engages" home page block reads soft for a CTO audience. "Senior engineering sounding board, focused engagements, specific problems, executive level judgment applied where it counts" is fine, but it doesn't tell a buyer what they walk out with.
**Severity:** Nice to have.
**Recommendation:** Either tighten with a specific outcome ("a written modernization roadmap, a team structure recommendation, a technical due diligence report"), or remove this section entirely (see Dimension 5 on advisory placement).

---

## Dimension 4: Resume Alignment

I cross checked every numeric and named claim on the site against your resume. Three issues are interview tripwires.

### Critical inconsistencies

**1. "30+ Engineers Led Directly" (Home) vs "26 engineers through 5 managers" (Resume).**
**Severity:** Critical.
**Recommendation:** Change to "26 Engineers Led" or "Up to 26 Engineers." Inflating from 26 to 30+ is the kind of small lie that gets caught in 30 seconds and costs you the room.

**2. "80% DevEx score" on Home page ("scaling an engineering org 150% while holding 90% retention and maintaining an 80% DevEx score") — not on resume, no source.**
**Severity:** Critical.
**Recommendation:** Either remove this claim, or source it precisely. If it's from Jellyfish, say so. If it's from DX (the company, formerly GetDX), say so. If it's an internal eNPS or developer survey, frame it that way ("80% positive engineering NPS"). And then add the same metric, with the same source language, to your resume so the two artifacts align. Unsourced metrics in a senior engineering interview process are a high probability red flag.

### Important inconsistencies

**3. Tools listed on About page (Claude Code, GitHub Copilot, CodeRabbit) vs resume (only GitHub Copilot).**
**Severity:** Important.
**Recommendation:** Either add Claude Code and CodeRabbit to the resume in the relevant Sr. Director bullet, or scope the site claim more narrowly ("evaluated and piloted Claude Code and CodeRabbit; deployed GitHub Copilot at scale"). Hiring managers ask "tell me how you rolled out Claude Code" and the answer needs to match the claim.

**4. Resume Summary says "built and led SugarCRM's multi tenant AI platform" while the About page says "directed teams that built and shipped a multi tenant AI platform." The site language is more accurate to your actual role; the resume is slightly stronger than warranted.**
**Severity:** Important.
**Recommendation:** Revise the resume Summary to match the site's "directed" framing. This is one of the most likely interview tripwires you have. If a sharp CTO asks "walk me through the architectural decisions you personally made on the Bedrock platform," the answer needs to match how you've positioned it.

### Nice to have

**5. "Athenahealth" on home vs "athenahealth" (lowercase) which is the actual company brand.**
**Severity:** Nice to have.
**Recommendation:** Match brand convention. Lowercase.

**6. SOC 2 Type II and ISO 27001 are mentioned on the About page in the "99.95%" stat block. The resume correctly attributes those to the Salesfusion CTO period. The site doesn't make the period clear, which is fine for marketing but could create interview confusion ("which company earned those certifications under your leadership?").**
**Severity:** Nice to have.
**Recommendation:** Either tie them explicitly to Salesfusion in the site copy, or leave the implicit framing but be ready in interviews.

### Strengths on resume that are missing or under leveraged on site

- **$2M annual engineering budget and P&L responsibility** is mentioned on About but absent from the home stat row. For VP/CTO conversations, P&L scope is a key signal.
- **Promoted 8 to senior/staff and 3 to engineering manager** is on About. Worth surfacing on Home as well, or in a "leadership philosophy" section.
- **25% improvement in customer retention metrics** from platform integration is on the resume. Not on the site. This is the most commercially aware metric on your resume and CTO conversations should see it.
- **M2SYS biometric platform scaled to 80M+ records, 99.99% availability** is real platform credibility for the Advisory page Architecture Review service offering.

---

## Dimension 5: Advisory Service Framing — Critical Assessment

You asked for the critical version. Here it is.

### a. Appropriateness: net positive or mixed signals?

**As currently structured, net negative for the primary goal.**

A recruiter or hiring manager landing on robcparker.com sees three signals on the same site:
1. Home: "How Rob Engages" with "focused engagements, specific problems."
2. About: "I'm now actively exploring Director and VP of Engineering opportunities."
3. Advisory: A full page with engagement types, cadences, and a free 30 minute scoping call.

A reasonable recruiter has three plausible interpretations:
- "He's available now and wants a full time role."
- "He's hedging. He'll keep advisory clients on the side once he lands."
- "The job search has been long enough that he needs to monetize while he searches."

The first interpretation is what you want. The second and third are damaging. PE backed B2B SaaS, in particular, wants undivided attention from its senior engineering leader. The advisory page tells them, accurately or not, that they may not get it. Even your most charitable hiring manager pauses on interpretation #2.

There's a reverse asymmetry too: the advisory page won't generate meaningful inbound while you're job searching anyway. PE firms and CTOs hiring fractional advisors find them through referral networks (Riviera, ON Partners, T Squared, AcademyHire equivalents), not through Google. The advisory page is theoretical inbound. The candidate signal damage is concrete.

### b. Positioning quality (if it stays)

The content is strong. Specifically:
- **ICP is clear.** Seed through growth stage SaaS, specific inflection points (AI platform, M&A integration, org scaling, cloud modernization).
- **Engagement types are specific** with defined deliverables, cadences, and primary outcomes. This is better than 90% of fractional CTO landing pages, which traffic in generality.
- **Disqualifying language is explicit.** "Not a good fit for staff augmentation, role backfill, or broad 'help us improve engineering' mandates without a defined problem at the center." This filters out the worst clients before they reach you.
- **Pricing is intentionally omitted.** Correct call at this level. Engagements are scoped per opportunity.
- **"Ongoing Advisory" is correctly framed as judgment work, not implementation.**

The content is not the problem. The placement is.

### c. Recommendation

**Move the advisory off the main path. Three options, ranked by effectiveness.**

**Option A (recommended, half day).** Keep the advisory content live at robcparker.com/advisory but remove it from main navigation. Remove the "How Rob Engages" block from the home page; replace with a clean full time search CTA. Anyone you specifically want to engage on advisory (e.g., a referral from your network) gets a direct link from you. The page is hidden from cold visitors but accessible when you choose. Best balance of optionality and focus.

**Option B (multi day).** Two distinct sites. robcparker.com is the candidate site, full stop. A separate domain (e.g., robparkeradvisory.com) houses advisory. They link to each other only in the contact path, never in nav. Cleanest separation but most work.

**Option C (quick win, weakest).** Keep the page in nav but gate behind a contact form ("If you are evaluating a senior engineering advisor, send a brief note and I'll send a one pager"). Remove the home page advisory CTA. Reduces the signal cost but doesn't eliminate it.

Strong recommendation: **Option A.** The signal cost of mixed messaging at the Director / VP / CTO level is real and underestimated. You can revisit this after you land the role; until then, the home page should sell exactly one thing.

---

## Dimension 6: SEO, Metadata, Discoverability

This is the second biggest problem on the site, and it's invisible to you because you presumably navigate to your own site by typing the URL.

**Observation:** A search for `"robcparker.com"` (in quotes) returns zero results from the actual site. The site is not indexed, has no inbound links, or both.
**Severity:** Critical.

**Observation:** A search for "Rob Parker SugarCRM engineering Atlanta" returns LinkedIn, TheOrg, RocketReach, and unrelated Rob Parkers. Your personal site does not appear in the first page of results.
**Severity:** Critical.

**Observation:** "Rob Parker" is genuinely common. The first page of results for the name alone is dominated by NASA engineer Rob Parker, an Australian engineering consultant at robparker.com.au, the wine critic Robert Parker (robertparker.com), and a Sweetwater sales engineer. The competition is real.
**Severity:** Important context.

**Recommendation:** A coordinated push. In execution order:

1. **Submit sitemap.xml to Google Search Console and Bing Webmaster Tools.** If Cloudflare Pages didn't generate sitemap.xml automatically, generate one. Verify the property and submit. (30 minutes, prerequisite for everything else.)
2. **Audit and set page level metadata.** Title tags should always include disambiguators: "Rob Parker, Senior Engineering Executive, AI Platforms, Atlanta" not "Rob Parker." Meta descriptions, 150 to 160 chars, written for a recruiter who is screening 50 candidates.
3. **Set Open Graph and Twitter card metadata on every page.** Include a branded OG image (1200x630) with your name, title, and one differentiator. This is what shows up when anyone shares a link to your site on LinkedIn, Slack, or X. Without it, links render as a wall of grey text.
4. **Add Person schema (JSON LD) to every page.** Include name, jobTitle, image, url, and `sameAs` array linking to your LinkedIn profile. This gives Google a structured signal that this site and that LinkedIn profile are the same person.
5. **Get inbound links.** The fastest wins: add the URL to your LinkedIn About section, your AngelList profile if you have one, your AI Tinkerers community profile if available, and your GitHub profile bio. Two or three inbound links from authoritative properties is enough to start indexing.

**Verify yourself:**
- robots.txt at robcparker.com/robots.txt. Should not block crawlers.
- sitemap.xml at robcparker.com/sitemap.xml.
- Favicon set on every page.
- Each page has a unique title and meta description.
- Lighthouse SEO score (run from Chrome DevTools). Target 90+.

---

## Dimension 7: Trust and Credibility Signals

This is the dimension with the largest gap between what's available and what's surfaced.

**Observation:** No testimonials or recommendations on the site. Your LinkedIn has substantive recommendations from former colleagues at Salesfusion, Qcept, and earlier roles, including one explicitly about your architecture judgment and another about your ability to lead through legacy refactoring. None of this carries over.
**Severity:** Critical.
**Recommendation:** Pull two or three of the strongest LinkedIn recommendations. Use the recommender's name, title, and company at the time. Place on the home page or About. This is the single highest leverage credibility add available to you, and the source material already exists.

**Observation:** No company logos visible. Your career path through SugarCRM, Salesfusion, athenahealth, M2SYS, Qcept, and Cisco is genuinely impressive at a glance. Without logos, a recruiter has to read body copy to absorb that.
**Severity:** Important.
**Recommendation:** Add a "Where I've Built" logo strip on the home page or About. Five to seven monochrome logos in a row, no descriptions. Cisco's logo alone signals depth a recruiter notices.

**Observation:** No links to talks, writing, podcasts, or external commentary. Per LinkedIn search results, you've posted commentary on QA, customer success in the post ZIRP era, and other topics. None of it surfaces here.
**Severity:** Important.
**Recommendation:** Either start a small Notes / Writing section with three to five short essays (M&A integration playbook, three tier AI adoption framework deep dive, developer velocity measurement), or surface the LinkedIn posts you've already written via a "Recent Writing" block linking out.

**Observation:** No GitHub link. Even for a senior leader, an active or even sparse GitHub signals you're still close to the work.
**Severity:** Nice to have.
**Recommendation:** Add to the Contact page footer alongside LinkedIn.

**Observation:** Education (MS Computer Science, Georgia Tech; BS Computer Information Systems, Clemson) is on the resume page but not on About. For an executive site, this should be visible on the About page.
**Severity:** Nice to have.
**Recommendation:** Add a one line credentials line at the bottom of the About bio: "MS Computer Science, Georgia Tech. BS, Clemson University."

**Observation:** Custom domain email (contact@robcparker.com) is in place. LinkedIn link is prominent. These are correct.
**Severity:** N/A (these are strengths).

---

## Dimension 8: Red Flags

I reviewed for political content, casual tone, typos, broken links, outdated information, controversial framing.

**Already covered:**
- "30+ engineers" claim contradicts resume (Critical, Dimension 4).
- "80% DevEx score" claim with no source (Critical, Dimension 4).
- "Currently driving AI platform strategy" reads as present tense after a March 2026 SugarCRM end date (Important, Dimension 3).
- "Built and led" SugarCRM AI platform language on resume slightly overstates personal architecture role (Important, Dimension 4).

**Other:**

**Observation:** No typos I caught in the PDFs. Tone is appropriately professional throughout. No political content. No broken links visible.
**Severity:** N/A (these are absences of red flags, which is good).

**Observation:** "Husband and father of three" on About. Per memory and resume context this matches. Mention is appropriate and personalizes without oversharing.
**Severity:** N/A.

**Observation:** Three of the four engagement types on the Advisory page reference work you "led" in past roles. Done right, this is honest sourcing of advisory credibility from operating experience. Done wrong, it reads as "I have one job's worth of stories I'm reselling four ways." A skeptical CTO buyer might ask whether you've ever delivered any of these specific engagements as advisory before, not just done the underlying work as an operator.
**Severity:** Important (for advisory goal only).
**Recommendation:** If you keep advisory active, consider adding a sentence to each engagement type acknowledging the line ("This engagement type draws on my operating experience leading the same work at SugarCRM and Salesfusion. I'm building advisory case studies as engagements complete.") That framing is honest and disarms the most likely buyer objection.

---

## Prioritized Action List

Five highest leverage changes, in execution order.

### 1. Fix the resume / site metric inconsistencies. Effort: quick win (30 to 60 minutes).

This is the most damaging issue on the site and the cheapest to fix. Specifically:

- Change "30+ Engineers Led Directly" to "26 Engineers Led" on the home page.
- Either remove "an 80% DevEx score" from the home page, or source it explicitly ("80% engineering NPS, internal survey" or "80% DX score" depending on actual source) and add the matching language to your resume.
- Reconcile the tools list: either add Claude Code and CodeRabbit to your resume, or scope the About page tools claim to "evaluated and piloted Claude Code and CodeRabbit; deployed GitHub Copilot at scale."
- Change "Currently driving AI platform strategy" to "Most recently led AI platform strategy" on the home page.
- Update resume Summary "built and led SugarCRM's multi tenant AI platform" to "directed teams that built and shipped SugarCRM's multi tenant AI platform" to match your actual role and the more accurate site copy.

### 2. Move the advisory page off the main path. Effort: half day.

Recommended Option A from Dimension 5. Specifically:

- Remove "Advisory" from main navigation.
- Remove the "How Rob Engages" block from the home page.
- Replace with a clean, full time role focused CTA ("If you are evaluating senior engineering leaders for a Director, VP, or CTO role, I would welcome the conversation. Get in Touch.").
- Keep the advisory page accessible at robcparker.com/advisory for direct sharing to specific referral targets.
- Update the Contact page intro to lead with the full time framing; advisory becomes a secondary line, not equal weight.

### 3. Add credibility signals: testimonials, company logos, education. Effort: half day.

- Pull two or three LinkedIn recommendations. Use full attribution (name, title at time of writing, company). Place on home page as a single testimonial block, or on About above the "Off the Clock" section.
- Add a "Where I've Built" company logo strip on the home page. Monochrome, six logos: SugarCRM, Salesfusion, athenahealth, M2SYS, Qcept, Cisco.
- Add a credentials line to the About page bio: "MS Computer Science, Georgia Tech. BS, Clemson University."
- Add GitHub link to the Contact page alongside LinkedIn (even if profile is sparse).

### 4. Fix the SEO fundamentals. Effort: half day.

In execution order:
- Submit sitemap.xml to Google Search Console and Bing Webmaster Tools. If sitemap doesn't exist, generate one (Cloudflare Pages plugin, or static `/sitemap.xml` file).
- Update title tags and meta descriptions to include disambiguators on every page. "Rob Parker, Senior Engineering Executive, AI Platforms, Atlanta" not "Rob Parker."
- Add Open Graph and Twitter card tags to every page with a branded OG image (1200x630, includes name + title + one differentiator).
- Add Person schema (JSON LD) on every page with `sameAs` array linking to your LinkedIn profile.
- Add the URL to your LinkedIn About section, GitHub bio, and any other authoritative profile you have. Goal: two or three inbound links from properties Google trusts.

### 5. Add intent routing to the contact form. Effort: quick win (30 to 60 minutes).

Add a "What's this about?" select field with options: Hiring opportunity, Advisory inquiry, Networking, Press or speaking, Other. This gives you immediate triage signal and lets you set up reply templates per type.

---

## Items not in the top five but worth doing eventually

- **Notes / Writing section.** Three to five short essays (under 1,000 words each) on the topics you've already operationalized: three tier AI adoption deep dive, M&A integration playbook in 12 weeks, developer velocity measurement that doesn't lie. Multi day effort. Pays off across both goals.
- **Downloadable PDF resume button** on the resume page. Quick win. Recruiters often want a file to attach to internal systems.
- **Subtle visual treatment** in the home hero (small portrait crop, typographic mark, geometric element). Nice to have.
- **Atlanta tech community signals.** AI Tinkerers attendance, refugee volunteer involvement (if you want it visible). Optional and depends on whether you want personal life signals on the site at all.
- **Open Graph image testing.** Run your site through opengraph.xyz or LinkedIn's Post Inspector after metadata is set. Verify the cards render the way you want.

---

## Closing note

The hard part of this site, the writing, is already done well. The issues above are mostly tactical and mostly cheap to fix. Two days of focused work moves the rating from "Needs Work" to "Ready" for both goals. The single most important hour you'll spend on this is fixing the metric inconsistencies. Do that first, before a recruiter sees the site again.
