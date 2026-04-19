# Tier Selection Guidelines — RobCParker Website

## Quick Reference

| Tier | Use When | Gate Depth |
|------|----------|-----------|
| Trivial | Copy fix, config change, image swap | Inline approval, no checklists |
| Standard | New page, bug fix, minor feature, styling overhaul | Full spec, inline arch, required QA, inline deploy |
| Complex | New integration, framework migration, significant refactor | All checklists required |
| Critical | Auth, payments, PII, core data model changes | All checklists enhanced + external reviewer |

## Decision Flow

1. Does it change any code paths? No → Trivial. Yes → continue.
2. Does it follow existing patterns? Yes, limited scope → Standard. No → continue.
3. Does it affect multiple components or introduce new patterns? Yes → Complex.
4. Does it involve auth, payments, PII, or core domain models? Yes → Critical.

## Mandatory Escalation Triggers

| Trigger | Minimum Tier |
|---------|-------------|
| Authentication or authorization changes | Complex |
| Payment or financial data | Critical |
| PII or PHI data handling | Critical |
| New external API integration | Complex |
| Database schema change | Standard |
| Core domain model modification | Complex |
| Framework or platform migration | Complex |
| First implementation of any new architectural pattern | Complex |

## Examples for This Project

**Trivial:** Fix typo, update copyright year, swap image, update meta descriptions
**Standard:** Fix About page 404, add new content page, responsive design fixes, analytics
**Complex:** Migrate to framework, integrate AI agent, add blog system, first DB integration
**Critical:** User authentication, subscription billing, store/process PII, payment flows

## Rules
- When in doubt, use the higher tier
- Any gate review can escalate upward
- Tier can only be reduced with documented rationale and re-check of triggers

## PII Handling — Processor Distinction

The "PII handling" mandatory escalation trigger (Critical minimum tier) applies when the site stores, analyzes, or authenticates against user data locally. A thin processor relationship — where a third-party service such as Formspree receives form submissions and delivers them off-site with no local storage, no analytics, and no auth — does not automatically trigger Critical; Complex is defensible and was accepted for SPEC-004. Escalate to Critical the moment any of those conditions change: if submission data is stored locally, analyzed in our systems, or tied to an authenticated session. SPEC-004 is the established precedent for the processor-only PII exception.
