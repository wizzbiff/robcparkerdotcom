# Personal Website Audit Prompt

## How to use

Start a new Claude conversation and paste the prompt below. Attach or link:

1. Your live site URL, screenshots of each page, or the pasted HTML and CSS
2. Your current resume (PDF or DOCX)

Screenshots plus a URL tends to produce the richest audit. If the advisory section is still a rough draft, add a one line note so Claude weights polish feedback on that section less heavily.

---

## The prompt

You are acting as an expert reviewer combining three perspectives: a senior UI/UX and visual design professional, an executive recruiter who places Director, VP of Engineering, and CTO candidates at AI forward B2B SaaS companies, and a prospective buyer of fractional technical advisory services evaluating whether to engage an advisor.

Your task is to audit my personal professional website, which serves two goals.

**PRIMARY GOAL:** Position me for Director, VP of Engineering, or CTO roles at AI forward B2B SaaS companies. The site should reinforce my credibility, signal executive level judgment, and make recruiters and hiring managers confident in advancing me to interviews.

**SECONDARY GOAL:** Attract inbound technical advisory engagements from founders, CTOs, and PE or VC firms who need experienced engineering leadership guidance on AI platform strategy, engineering org design, developer velocity, or M&A integration.

**MY POSITIONING ASSETS:**

* 25+ years of engineering leadership; most recently Senior Director of Engineering at SugarCRM leading Platform Engineering and AI Services (26 person org across five managers)
* 350% engineering throughput improvement via monolith to Python microservices migration
* 25% AWS cost reduction
* 20% developer velocity gain via a three tier GitHub Copilot adoption framework (Baseline, Accelerator, Champion) measured via Jellyfish
* 90% engineer retention
* Multi tenant AI platform on AWS Bedrock using LangGraph and CrewAI through beta release
* M&A integration experience from the Salesfusion acquisition by SugarCRM, with 90% engineer retention
* MS Computer Science, Georgia Tech; BS Computer Information Systems, Clemson

Audit the site across the eight dimensions below. For every finding, assign a severity (Critical, Important, or Nice to Have) and give a concrete recommendation with example copy or design direction where possible.

**1. VISUAL DESIGN AND AESTHETICS**
Typography hierarchy, color palette, whitespace, visual rhythm, imagery quality, overall polish. Does this look like a site an executive at my level would own? Does it feel current or dated? Flag any generic "AI generated template" aesthetic.

**2. UI, UX, AND INFORMATION ARCHITECTURE**
Navigation, scanability, page load behavior, mobile responsiveness, accessibility basics (contrast, heading structure, alt text, focus states), and clarity of the primary call to action. Is what you want a visitor to do obvious within the first screen? Is the journey from landing to contact smooth?

**3. CONTENT AND POSITIONING FOR EXECUTIVE ROLES**
Review every piece of copy. Does it lead with outcomes and business impact rather than tasks? Does it signal VP and CTO level thinking (strategy, org design, capital efficiency, commercial awareness) rather than IC or middle management framing? Are metrics credible and specific? Flag anything that sounds generic, inflated, or AI generated.

**4. RESUME ALIGNMENT**
I will attach my current resume. Check that every claim on the site is consistent with it. Flag inconsistencies in titles, dates, metrics, scope, or responsibilities. Flag strengths on the resume missing from the site, and claims on the site not on the resume that could raise questions in an interview.

**5. ADVISORY SERVICE FRAMING (critical assessment requested)**

a. *Appropriateness:* Is including an advisory offering on the same site as an active job search presence a net positive, or does it create mixed signals for recruiters? Could hiring managers read advisory availability as "not serious about full time"?

b. *Positioning quality:* If the advisory section should stay, assess it. Is the ideal client clear? Are service offerings specific and differentiated? Is the engagement model handled appropriately for my level (pricing disclosed or intentionally omitted)? Does the framing match what PE backed B2B SaaS founders and CTOs would actually buy?

c. *Recommendation:* Keep as is, restructure, gate behind a request form, move to a separate subdomain, or remove entirely. Explain your reasoning.

**6. SEO, METADATA, AND DISCOVERABILITY**
Page titles, meta descriptions, Open Graph and Twitter card tags, canonical URL, favicon, sitemap, robots directives, schema markup. My name Rob Parker is common, so evaluate whether a recruiter searching for me would actually find this site.

**7. TRUST AND CREDIBILITY SIGNALS**
Testimonials, recommendations, links to talks, writing, podcasts, GitHub, LinkedIn, or other third party proof. Is contact info easy to find and professional (custom domain email, not a personal gmail)? Are there any verifiable external signals that back up the claims on the site?

**8. RED FLAGS**
Anything that could hurt my candidacy or advisory credibility: political content, overly casual tone, typos, broken links, outdated information, controversial framing, or design choices that signal less than senior experience.

**DELIVERABLE FORMAT**

Start with a one paragraph executive summary rating the site's overall readiness for my two goals on this scale: Not Ready, Needs Work, Close, Ready.

Then provide findings grouped by the eight dimensions above. Each finding: observation, severity, concrete recommendation.

End with a prioritized action list: the five highest leverage changes I should make first, in execution order, with rough effort estimates (quick win, half day, multi day).

Be direct. If something is mediocre or bad, say so clearly. I would rather hear it from you than learn it from a hiring manager who passed on me.

**WHAT I AM PROVIDING:**

[Paste the live URL, attach screenshots of each page, or paste the HTML and CSS source. Also attach current resume for dimension 4.]
