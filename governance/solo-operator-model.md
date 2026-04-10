# Solo Operator Gate Model — RobCParker Website

## The Problem

SDD states: "Gate owners cannot approve their own specs (no self-review)."
When one person (Rob) is the PM, architect, developer, QA, and ops lead, every
gate is a self-review.

## The Solution: Specialist Agents as Structured Reviewers

This project has 11 specialist agents that provide deep domain expertise. These
agents serve as the "second eyes" at each gate, producing structured reviews that
Rob then applies human judgment to.

The two-step process at each gate:

1. **SDD pipeline agent orchestrates a structured review** — invoking specialist
   agents to evaluate the artifact against patterns, checklists, and the spec.
   This surfaces concerns, gaps, and questions that a solo reviewer might miss.

2. **Rob provides documented human judgment** — reviewing the agents' output
   and making the approval decision with written reasoning. The discipline:
   Rob must respond to each concern raised, even if the response is
   "acknowledged, accepted because [reason]."

## Gate Assignments

| Gate | SDD Pipeline Agent | Specialist Agents Invoked | Rob's Role |
|------|-------------------|--------------------------|-------------|
| Spec Approval | sdd/pm-spec | marketing-copywriter (content specs) | Confirm business intent, approve tier |
| Architecture Review | sdd/architect-review | architect-reviewer, penetration-tester | Review risks, confirm feasibility |
| QA Verification | sdd/implementer-tester | frontend-developer, qa-expert, test-automator, code-reviewer | Verify test adequacy, manual checks |
| Deployment Auth | sdd/deployment | (none currently) | Authorize release, confirm rollback |

## Evidence of Engagement

The key discipline: Rob's approval must include specific responses to
agent-raised concerns. This is not a rubber stamp.

| Tier | Evidence Required |
|------|-------------------|
| Trivial | One-line rationale in commit message |
| Standard | Documented responses to agent concerns (inline in spec or checklist) |
| Complex | Full written responses to all agent concerns |
| Critical | Full responses + 24-hour waiting period + external second reviewer |

## When to Get External Review

Mandatory:
- Any Critical tier spec (payments, auth, PII)
- First implementation of a new architectural pattern
- Annual pipeline audit

Recommended:
- Any spec where Rob is uncertain after agent review
- Major framework or platform decisions

## Scope Discipline: Every Feature Needs a Spec

**Rule:** No new features, framework migrations, or architectural changes without a
spec — even when they seem like "part of" another spec.

**What's allowed inline (no separate spec):**
- Bug fixes encountered while implementing a spec
- Trivial adjustments directly required by the current spec (e.g., fixing a typo
  the spec introduced)

**What requires its own spec:**
- Framework migrations (e.g., vanilla HTML → Astro)
- New architectural patterns (e.g., adding a build step, new dependency system)
- Features that affect more than the spec's stated scope
- Changes to CI/CD pipeline behavior
- Anything that could break existing tests or deployments

**Why this matters:** When scope creep happens inside a spec, it bypasses gates.
For example, if a spec for a dashboard included a full framework migration, that
migration should have been its own Complex/Critical-tier spec with separate gates.
A bundled migration could introduce regressions that would have been caught at its
own QA gate but instead get discovered late in the process.

**The test:** Before starting implementation, ask: "Would a reasonable PM write a
separate spec for this?" If yes, stop and write the spec. Bug fixes are OK inline.
Re-architecture is never OK inline.

## Model Selection Convention

Specialist agents use one of two Claude models, chosen by the nature of the work:

**Opus** — deep reasoning, review, and orchestration roles where analysis quality
is the main constraint:
- architect-reviewer
- code-reviewer
- penetration-tester
- multi-agent-coordinator

**Sonnet** — execution roles where the work is more mechanical and speed/cost
matter more than maximum reasoning depth:
- error-detective
- frontend-developer
- graphic-artist
- marketing-copywriter
- qa-expert
- test-automator
- ui-designer

**Rule of thumb:** If the agent's primary job is to catch what a human reviewer
would miss, use opus. If its primary job is to produce an artifact from a clear
spec, use sonnet. Revisit this convention if specialist outputs consistently fall
short or if cost becomes a concern.

## Process Atrophy Prevention

- **Weekly self-audit:** Re-read one past approval. Would it convince a skeptic?
- **Escape accountability:** Trace production issues back through the pipeline honestly
- **Tier discipline:** Track distribution monthly. >80% Trivial = something's wrong
- **Learning events still happen:** Gate modifications get logged even solo
