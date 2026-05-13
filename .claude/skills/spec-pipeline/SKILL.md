---
name: spec-pipeline
description: Run a SPEC through the RobCParker SDD pipeline — branch creation, Spec Gate, Arch Gate, Implementation, QA Gate, and PR open. Trigger whenever the user mentions kicking off a SPEC, advancing one through a gate, "running the pipeline," approving Spec/Arch/QA gates, opening a PR for a SPEC, or any phrase like "let's start SPEC-018," "do Arch for SPEC-NNN," "ship the pipeline," "open the PR with gate summary." Use even when the user uses shorthand like "SPEC-NNN time" or just names the next stage — the SDD pipeline is the spine of this repo and almost every multi-step content/code change runs through it. Bakes in the operational gotchas from the last several SPEC retros (IG-residual ranges, parallel specialists, apex-domain verification, post-edit grep, `gh` silent-failure traps, never-auto-approve discipline).
---

# SDD Pipeline — Solo Operator

Use this skill any time work on this repo needs to travel through the spec → gate → implement → ship loop. It encodes the operating procedure derived from the most recent SPEC retros (SPEC-015, SPEC-016, SPEC-017) and the canonical entries in `governance/stack-quirks.md`. Patterns get heavier here than they look on paper *because* they came from incidents — each rule has a referenced retro source so future-you can judge edge cases instead of blindly following.

This skill is the operational checklist. Authoritative docs:
- `CLAUDE.md` — pipeline diagram, two-layer agent architecture, tier defaults, SDD experimental mechanisms
- `governance/stack-quirks.md` — platform gotchas (read top to bottom before any history/deploy work)
- `governance/solo-operator-model.md` — gate-ownership model, critical-tier second-reviewer rule
- `.claude/agents/sdd/*.md` — Layer-1 pipeline agents (pm-spec, architect-review, implementer-tester, deployment, learning-engine)
- `specs/templates/` — spec/gate-annotation/retro templates

---

## Two non-negotiable disciplines

These two override convenience every time. They come straight from `CLAUDE.md` "SDD Pipeline Defaults" and are reinforced in every recent retro:

1. **Never auto-approve any gate.** The user owns every gate decision (Solo Operator model). The pipeline runs autonomously through ALL gates *up to but not past* the approval moment. Surface the gate decision package; wait for the user's explicit "approved" / "approve with conditions" / "reject" before writing `**<Gate> Decision:** Approved <date>` into the spec. *Why this matters:* the gate IS the human-in-the-loop checkpoint — auto-approving collapses the entire methodology.

2. **Verify-after-write for any state-changing operation that has a silent-failure mode.** PR body edits, GitHub API patches, history rewrites, `replace_all` edits. SPEC-017 R9c shipped with exit code 0 and unchanged PR bodies — only post-write verification caught it. Default: every state-changing op gets a follow-up read that confirms the change landed.

---

## Stage 0 — Pre-flight

Run these before touching any spec, not partway through:

- **`gh auth status`** — confirm gh CLI is installed and authenticated. On a fresh environment this may need install + auth before the PR-open stage. Catching it now saves hours.
- **`git config user.email`** — must read `contact@robcparker.com` for any commit going into this repo. If it shows `rob.c.parker@gmail.com`, run `git config user.email contact@robcparker.com` BEFORE the first commit. *Why:* SPEC-017 R5 normalized history then the very next commit re-introduced the gmail address because local config was untouched. The R5 rewrite is history-only.
- **Branch state** — `git status` clean? On `main`? `git pull --rebase origin main` to sync. If a previous SPEC just merged, the local main may be stale.
- **Dirty working tree?** If there are uncommitted unrelated changes, decide before Stage 1: (a) if the changes belong on `main` and are coherent, commit them on `main` first; (b) if they belong to a different scope, stash with `git stash push -u -m "<note>"` and `git stash pop` after the SPEC ships; (c) if they're work-in-progress for *this* spec, they belong on the new branch — `git checkout -b spec/SPEC-NNN-<slug>` carries them forward, then `git add` + commit on the branch. Don't start a SPEC on top of ambiguous state — the post-edit grep pass at Implementation can't distinguish your changes from pre-existing drift.
- **`git config branch.main.remote` / `branch.main.merge`** — if either is empty (typically after a `git filter-repo` run), `git branch --set-upstream-to=origin/main main` to restore tracking before any pull. SPEC-017 retro.

---

## Stage 1 — Branch creation

Branch name: `spec/SPEC-NNN-short-description` (kebab-case, lowercase, no spec ID inside the slug). One spec per branch.

**Slug convention:** ≤ 4 hyphenated words, action-noun form (`canonical-apex-migration`, `repo-scrub`, `sugarai-rebrand`, `how-this-site-was-built`). The slug becomes the spec filename, the branch name, and the PR title's identifying suffix — pick once, don't rename mid-flight. If you find yourself wanting two slugs, the scope is probably two specs.

```bash
git checkout -b spec/SPEC-NNN-short-description
```

Commit message convention: `[SPEC-NNN] description` as the subject prefix on every commit on this branch. The spec ID in the prefix is what `gh pr list --search` queries and what the post-completion retro looks for.

---

## Stage 2 — Spec Gate

Invoke `sdd/pm-spec` (Layer 1) to produce or audit the Feature Spec at `specs/SPEC-NNN-<slug>.md`. The decision about whether to bring `marketing-copywriter` in for this spec gets resolved HERE (as a Spec Gate Open Question if non-obvious); the copywriter actually executes at Arch Gate where they have the IG list and Pre-Implementation String Lock context to work against. This sequencing matches `.claude/development-workflow.md`'s "copywriter before implementation" rule while preserving Arch Gate's "specialists in parallel" pattern from the SPEC-015/-016 retros.

**Backlog-sourced specs:** if this SPEC's scope traces to a line in `specs/backlog.md`, reference the backlog item in the spec's Summary section and remove the backlog line in the same PR. The backlog is a holding queue, not a parallel record — leaving an item there after it ships causes future Spec-Gate walkthroughs to re-discover it. If only part of a backlog item is in scope, reword the backlog line to reflect what remains rather than deleting it whole.

### Spec content requirements

For **Trivial** tier (copy/content tweaks, single-file styling): Summary, Requirements, Acceptance Criteria, QA checklist may suffice. Skip Decision Rationale.

For **Standard / Complex / Critical** tier: include `## Decision Rationale` capturing alternatives considered, constraints, assumptions, trade-offs. This section is where the *why* lives. Recent retros (SPEC-015, SPEC-017) showed this section saved a re-review pass.

Always include:
- Tier selection with brief justification (see `governance/tier-selection-guidelines.md`)
- `## Open Questions — Spec Gate` numbered Q1, Q2, … with PM-Spec recommendation per question
- `## Risk + Reversibility` for any operator-tool or destructive spec
- Acceptance Criteria written as testable, observable Givens/Whens/Thens — not aspirational

### Walkthrough format

Walk the user through the spec section by section. For each Open Question, present PM-Spec's recommendation + alternatives + your read. Wait for resolution. Capture every resolution inline in a `## Spec Gate Resolutions (YYYY-MM-DD)` table — column 1 question ID, column 2 topic, column 3 resolution. *Why:* SPEC-017 retro showed Spec Gate's structured-question discipline catches things later stages won't (e.g., backup-branch retention vs visibility flip).

### Spec Gate close

Once every Open Question is resolved, ask the user explicitly: *"Approve Spec Gate?"* On their explicit yes, append:

```
**Spec Gate Decision:** Approved YYYY-MM-DD. <one-sentence why — what did the gate catch that mattered>
```

The "why" annotation is the experimental Gate Annotation mechanism per `CLAUDE.md`. Keep it to one sentence.

---

## Stage 3 — Arch Gate

Invoke `sdd/architect-review` (Layer 1). The default specialist invocation pattern is:

- **Always:** `architect-reviewer` (Layer 2) for design validation against patterns.
- **Security-relevant specs:** invoke `penetration-tester` in **parallel** with `architect-reviewer`. *Why:* SPEC-017 retro — pen-tester independently found G2 (closed PR body residues) that architect-reviewer's design-correctness threat model wouldn't have surfaced. Two-reviewer parallel is now the load-bearing pattern for any spec with both design and security surface.
- **Content-heavy specs:** invoke `marketing-copywriter` in parallel too. *Why:* SPEC-015 AG-1 — copywriter found a Pareto-dominant fourth option the architect alone would have missed. SPEC-016 hit the same pattern.

Run parallel specialists in a single tool-call batch, not sequentially.

### Implementation Guidance (IG) list

Arch Gate output includes a numbered IG list (`AG-IG-1`, `AG-IG-2`, …) that the implementer-tester binds against. Every IG should be:

- Concrete (specific files, specific tokens, specific commands — not "make sure it's correct")
- Independently verifiable (the QA checklist can grep / curl / inspect it later)
- Source-attributed (which specialist surfaced it)

### IG residual counts must be ranges, not singletons

For any IG that predicts a count (residual matches after a global rewrite, grep counts, link counts), write a **range with explicit assertion target**:

> "Expected 11–16 SugarCRM residual matches; assertion is **0 true-positive matches**, raw count is informational."

*Why:* SPEC-015 IG-1 predicted singleton "11" — actual was 15. The gap was benign (lock-stage additions architect couldn't anticipate) but read as a failure at QA. SPEC-017 R9 predicted 5–25; actual was 156 — all false positives in a docs-heavy repo, but the prediction noise made the result hard to read. Codified in memory as `feedback_ig_residual_counts_as_ranges.md` and `governance/stack-quirks.md` SDD-process entry. On docs/spec-heavy repos, predict raw counts ~10× wider than code-repo intuition would suggest.

### Pre-Implementation String Lock (content specs)

For any spec that ships specific copy/content text into multiple files (rebrands, meta-tag updates, multi-page wording changes): create a `## Pre-Implementation String Lock` section at Arch Gate that enumerates every byte-locked string with file + line + exact text. The implementer ships the lock verbatim. *Why:* SPEC-015 retro — 21 LOCKs in one spec; implementer ran straight through with zero re-wording. SDD-010 originated the pattern; SDD-015 confirmed it generalizes.

Give the marketing-copywriter authority to *extend* the lock at lock-time (e.g., spot a 4th sentence that fits the carve-out pattern). Lock-time is a real review pass, not a transcription pass.

### Arch Gate close

```
**Arch Gate Decision:** Approved YYYY-MM-DD with conditions absorbed — implementation may begin.
<one-sentence why — what design/security risk did this gate retire>
```

If Arch Gate surfaces conditions the user wants resolved *before* implementation, capture them in a `## Arch Gate Resolutions (YYYY-MM-DD)` table parallel to Spec Gate resolutions. The phrase "with conditions absorbed" means: every condition is now reflected in the IG list or spec body, and the implementer doesn't need to re-read the Arch Review separately to find them.

---

## Stage 4 — Implementation

Invoke `sdd/implementer-tester` (Layer 1). It coordinates Layer-2 specialists (`frontend-developer`, `ui-designer`, `graphic-artist`, `code-reviewer`, `test-automator`, `qa-expert`) per the IG list. Walk through IG items in order; some are independent and can ship in parallel.

### Post-edit grep verification — non-negotiable

Every `replace_all` edit, every multi-file find-and-replace, every history-touching rewrite gets a grep verification pass. The pattern:

```bash
# Before: predicted what should remain (informational raw count, asserted true-positive count)
grep -rn "<old-string>" --include="*.html" --include="*.css" --include="*.js" --include="*.md"
```

The result must match the IG residual range (raw) AND the asserted true-positive count (typically 0). If the count exceeds the predicted range, *don't* surface it as a finding without first checking whether the gap is benign (lock-stage additions, comments, historical references). If it's within range, log the count and move on.

For text in `*.md` spec files: the project convention is *not* to retroactively rewrite history in shipped specs. Residual mentions of pre-rewrite text in old specs are expected and correct — they are the historical record. SPEC-015 R3 codified this.

Indentation variants are a common miss: `<old-string>` may appear with different leading whitespace in different files. After `replace_all`, run a follow-up grep that strips leading whitespace from the search pattern to catch indentation-only variants. CLAUDE.md "SDD Pipeline Defaults" calls this out explicitly.

### Edit safety on structured documents

When editing R-numbered spec sections, gate decisions, governance docs: prefer targeted Edits over `replace_all`. After any edit on these documents, re-read the file (or at least the surrounding ±20 lines) to confirm no adjacent section got clobbered. *Why:* CLAUDE.md "Edit Safety" entry — adjacent-section clobber on R-numbered docs has happened.

### Author email consistency

Every commit on this branch must have author email `contact@robcparker.com`. If any commit needs to be amended (typo in spec ID, missing `[SPEC-NNN]` prefix, etc.), use `git commit --amend --reset-author --no-edit` after verifying local `git config user.email` is correct. The `--reset-author` flag is what re-applies the current `user.email` — without it, the amend keeps the old author.

### Findings during implementation

Implementation-time findings are **expected, not exceptional** on operator-tool specs (file-system state, tool versions, API quirks defeat spec determinism). For each finding:

1. Decide: resolve inline OR escalate to spec-scope expansion (back to Spec/Arch Gate)?
2. Resolve-inline criteria: doesn't change AC, doesn't change reversibility profile, doesn't add new surface area.
3. Log every finding in `## Implementation Notes (YYYY-MM-DD)` with **Finding 1**, **Finding 2** — even ones resolved trivially. These become retro inputs.

Site-implementation specs (CSS/HTML/JS) can hit "spec said exactly this" determinism. Operator-tool specs (history rewrites, deploy config) can't. Plan for findings on the latter.

### Lock-stage additions

The implementer may find content/lock-stage extensions that fit an existing carve-out pattern. Apply them and reflect them in residual counts. Lock-stage is a review pass, not a transcription pass — see SPEC-015 LOCK-6.

---

## Stage 5 — QA Gate

Invoke `sdd/implementer-tester` for the QA coordination, which invokes `qa-expert` and `code-reviewer` (Layer 2).

QA Gate checklist (`QA-SPEC-NNN`) generated per the spec. Source the items from `.claude/qa-checklist.md` filtered by change type (forms / content / visual / structural). The checklist must include:

- Every Acceptance Criterion as an observable test.
- Residual-count verifications (asserted true-positives = 0; raw count noted).
- Browser test of any user-facing change (not just curl).
- Console-error sweep on every page the change touches.
- Mobile responsive check at 768px and 375px breakpoints (project convention).
- Cross-page nav-baseline check if the change touched `<nav>` markup: sha1sum `<ul class="nav-links">` across 6 files — expect 5 matches + `resume.html` known-divergent.

### QA Gate close — never auto-approve

Surface the completed QA checklist results. State explicitly what passed, what's deferred (with rationale), what failed. Then ask: *"Approve QA Gate?"*

On explicit user approval only:

```
**QA Gate Decision:** Approved YYYY-MM-DD — <spec> implementation complete. <one-sentence on what's next, e.g., "PR opens next" or "operator visibility-flip per R11 unblocks SPEC-NNN">
```

If QA finds a real failure: surface it, propose remediation, and re-run QA on the fix. Do not approve through a failure.

---

## Stage 6 — PR open

Only after QA Gate Decision is written into the spec.

### gh auth recheck

If Stage 0's `gh auth status` was a while ago, run it again. PR operations on a stale auth token fail in unhelpful ways.

### Commits and push

Push the branch. `git push -u origin spec/SPEC-NNN-short-description` sets upstream tracking in the same step.

### PR title and body

Title: `[SPEC-NNN] <one-line description matching spec Summary line>` — under 70 characters.

Body must include **gate decision summary** as the first section. This is the load-bearing artifact for reviewers and for the future retro:

```markdown
## Gate Decisions

- **Spec Gate:** Approved YYYY-MM-DD. <one-line why>
- **Arch Gate:** Approved YYYY-MM-DD with conditions absorbed. <one-line why>
- **QA Gate:** Approved YYYY-MM-DD. <one-line why>

## Summary

<1-3 bullets — what shipped, written from the user-visible perspective>

## Acceptance Criteria

<bullet list, each AC with [x] if verified at QA Gate>

## Notable findings

<Implementation Notes findings worth flagging for the merge reviewer; link to retro if drafted>
```

Use a HEREDOC for the body — see `CLAUDE.md` "Creating pull requests."

### `gh` silent-failure trap

For programmatic PR body edits (not the initial create), prefer:

```bash
gh api repos/<owner>/<repo>/pulls/<N> -X PATCH -F body=@<file>
```

`gh pr edit --body-file` has a known silent-failure mode on PRs that touch Projects-classic metadata — exit code 0, body unchanged, only signal is a stray "Projects (classic) is being deprecated" warning. SPEC-017 R9c. After any PR body write, verify with `gh pr view <N> --json body` before declaring success.

---

## Stage 7 — Merge and Deploy Gate

Invoke `sdd/deployment` (Layer 1) once the PR is merged. The Deploy Gate is the first stage where the artifact meets the live host; SPEC-015's retro upgraded this gate from "dormant" to load-bearing because the apex/www mismatch surfaced HERE and nowhere earlier in the pipeline.

### Deploy sequence

1. **Watch the build.** Cloudflare Pages auto-deploys within ~1–2 minutes of the merge to `main`. Check the Cloudflare dashboard for the build-complete signal. Don't ask the user to test before the deploy is confirmed complete — pre-deploy "verification" tests the cached pre-merge site and is misleading.
2. **Apex-only live verification.** Always hit `https://robcparker.com/<path>`, never `www.robcparker.com`. `www` returns HTTP 522 (Cloudflare connection timeout) and is NOT a working alias. Codified in `governance/stack-quirks.md` Cloudflare section and `project_site_live.md` memory.
3. **Clean URL routing.** Live paths drop `.html` (`/resume`, not `/resume.html`). Cloudflare Pages issues a 308 from the `.html` form. Use `curl -L` to follow the 308. PDFs and other non-HTML assets keep their extensions.
4. **Byte-equality verification.** For content/meta-tag specs, the Deploy Gate verifies the live response matches the Pre-Implementation String Lock byte-identically (e.g., `curl -s https://robcparker.com/<path> | grep 'meta name="description"'`). For structural specs, verify each AC observably against the apex URL.
5. **Findings discovered post-deploy.** Log in the spec's `## Deployment` section as `Finding 1`, `Finding 2`. Decide: (a) blocker → rollback via `git revert` + new PR; (b) non-blocker → log to `specs/backlog.md` (or as a memory update if it's a project-state fact) and proceed with Deploy Gate approval. SPEC-015 surfaced two non-blocker findings post-deploy; both were logged and the gate was still approved.

### Rollback path

`git revert <merge-commit-sha>` on `main` → push → Cloudflare auto-deploys the revert within ~1–2 minutes. The merge commit's SHA is in the PR conversation. Don't `git reset --hard` on `main`; revert leaves history clean and the original PR remains queryable for the retro. If the revert itself fails the byte-equality check post-deploy, you have a deeper problem (deploy pipeline drift) — surface immediately rather than retrying.

### Deploy Gate close

```
**Deploy Gate Decision:** Approved YYYY-MM-DD — SPEC-NNN live at https://robcparker.com/<path>. <one-line on what was verified observably, e.g., "5 page canonicals byte-identical to lock; sitemap.xml apex-only; 0 www residuals on live host">
```

If verification fails: don't approve. Choose rollback OR fix-forward (new PR), document the choice in the spec's `## Deployment` section, and re-enter the Implementation stage of the *new* PR. The original spec's Deploy Gate remains open until a deploy verifies cleanly.

---

## Stage 8 — Post-Completion Retro

Per `CLAUDE.md` SDD experimental mechanisms — a 2–3 minute capture *if anything stood out*. Skip if nothing did.

Append `## Post-Completion Retro (YYYY-MM-DD)` to the spec file (not a separate file — recent specs keep retros inline). Four sub-sections, each kept short:

- **What went well** — patterns to repeat (parallel specialists, Pre-Implementation Lock, two-reviewer Arch, etc.)
- **What surprised** — gaps between the spec's mental model and reality
- **Process observations** — generalizable lessons; flag any that warrant a new `governance/stack-quirks.md` entry
- **Counterfactual** — what would have shipped wrong if a specific gate hadn't existed; positive evidence for the methodology

Stack-quirks follow-on: if any process observation deserves a stack-quirks entry, draft it inline in the retro AND open a follow-on commit on main (or include in the same PR if not yet merged).

Time-to-write target: 2–3 minutes. SPEC-015 hit 5; SPEC-017 hit 7. Future retros should land closer to budget — the constraint is what keeps them happening at all.

Tracking: `specs/why-capture-learning-log.md` records whether Decision Rationale / Gate Annotations / Retros / Stack Quirks are pulling their weight. Review monthly.

---

## Tier-specific shortcuts

| Tier | What's different |
|---|---|
| **Trivial** | Skip Decision Rationale. Spec Gate may be a single-question walkthrough. Arch Gate may be a single-reviewer pass (architect-reviewer only). Retro skipped unless something stood out. |
| **Standard** | Default flow above. |
| **Complex** | Two-reviewer parallel at Arch is default, not just security-relevant. Pre-Implementation String Lock if content-heavy. |
| **Critical** | Two-reviewer parallel at Arch is mandatory. External second reviewer required per `governance/solo-operator-model.md`. Retro is mandatory. No Trivial-style shortcuts anywhere. |

See `governance/tier-selection-guidelines.md` for the picker.

---

## Failure modes to avoid

These are the patterns the retros have already caught — don't re-introduce them:

- **Auto-approving any gate.** The user owns every gate decision. Surface, wait, write the decision only after explicit approval.
- **Singleton IG residual counts.** Always ranges, always with the "raw vs true-positive" framing.
- **`replace_all` without follow-up grep.** Indentation variants will be missed.
- **`git filter-repo --email-callback` without updating local `git config user.email`.** The very next commit re-introduces the old identity.
- **`gh pr edit --body-file` for closed-PR body edits.** Silently fails. Use `gh api ... -X PATCH -F body=@<file>` instead and verify after write.
- **Live verifying against `www.robcparker.com`.** Returns 522. Apex only.
- **Skipping marketing-copywriter for "small" public-facing content changes.** `.claude/development-workflow.md` is explicit: any user-visible text goes through copywriter, no exceptions.
- **Editing R-numbered spec sections with `replace_all`.** Targeted Edit + re-read the file; adjacent sections have been clobbered before.
- **Skipping `gh auth status` until PR-open time.** Catch auth issues in Stage 0, not Stage 6.

---

## When to break this skill's own rules

The methodology exists to be evaluated, not preserved. If a step is creating friction without producing signal across 3+ specs, that's a retro observation worth surfacing — `specs/why-capture-learning-log.md` is where these go. The mechanisms are flagged "experimental" in CLAUDE.md for exactly this reason.

If the user asks for a deliberate departure from the procedure (e.g., "skip the Arch Gate for this one — it's a one-line CSS fix"), confirm the tier dropped to Trivial and proceed with the Trivial-tier shortcuts. Don't silently expand the procedure beyond what the change merits.
