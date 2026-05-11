# SPEC-017: Repo Scrub Pass — Precondition for SPEC-016

**Status:** Implementation complete 2026-05-11 — repo scrubbed; awaiting operator visibility-flip per R11 (tracked in local OPERATOR-TODOS.md)
**Tier:** Standard (destructive git operation + visibility-change precondition; irreversible without backup; confirmed at Spec Gate; re-confirmed at Arch Gate)
**Author:** PM-Spec Agent (derived from SPEC-016 Q3 resolution 2026-05-08; decisions resolved with Rob in conversation 2026-05-11; Spec Gate walkthrough 2026-05-11; Arch Gate review 2026-05-11; implementation 2026-05-11)
**Date:** 2026-05-11 (Spec Gate approved 2026-05-11; Arch Gate approved 2026-05-11; Implementation 2026-05-11)
**Branch:** `spec/SPEC-017-repo-scrub` (to be created at implementation start)

---

## Summary

Prepare the `wizzbiff/robcparkerdotcom` repository for public visibility by removing three internal-audience files (`OPERATOR-TODOS.md`, `robcparker_com_audit.md`, `website_audit_prompt.md`) from both HEAD and full git history, while preserving the commit graph and the shipped-spec body of work that SPEC-016 will link to as methodology evidence.

The scrub is the operator precondition declared in SPEC-016 Q3 resolution. It is not site-build work; no HTML/CSS/JS is touched. The destructive surface is the git history rewrite via `git filter-repo` and the subsequent `--force` push to `origin/main`.

SPEC-017 ends with the repo scrubbed but **still PRIVATE**. The visibility flip (`gh repo edit --visibility public`) is a deliberately separated operator follow-on, captured in `OPERATOR-TODOS.md` and executed at Rob's discretion before SPEC-016 implementation begins.

## Context

### Why this spec exists

SPEC-016 ("How This Site Was Built") was approved at Spec Gate 2026-05-08 with implementation gated on a repo scrub pass (per Q3 resolution A3). The scrub-pass requirement was written into SPEC-016 itself (`specs/SPEC-016-how-this-site-was-built.md:315-334`) as a precondition table — but the work item was never propagated to `OPERATOR-TODOS.md` or promoted to its own spec. Rob surfaced this gap on 2026-05-11 when looking for the precondition.

The SPEC-016 page is a portfolio piece. Its hero CTA points anonymous readers at `https://github.com/wizzbiff/robcparkerdotcom`; its Section 6 closes with a link to the public `specs/` directory. Both require the repo to be public and not contain internal-voice material that would damage the very positioning the page is built to project.

### What's at stake if internal docs go public unscrubbed

- **`robcparker_com_audit.md`** (330 lines): direct critique of the site. Names specific credibility risks (`"home page says 30+ engineers led directly; resume says 26"`), labels advisory placement "actively hurts the primary goal," lists exact metric inconsistencies. A hiring manager reading it gets a roadmap of the site's flaws — some still in flight. **Public exposure: materially damaging to candidacy.**
- **`OPERATOR-TODOS.md`** (181 lines): operational notes. Not catastrophic if public — content is "submit sitemap to GSC," "source logos," "book headshot session" — but internal-voice texture, effort estimates, calendar choices, and references to private repo paths. **Public exposure: not damaging in itself, but degrades the polish the SPEC-016 page is built to demonstrate.**
- **`website_audit_prompt.md`** (78 lines): the meta-prompt that generated the audit. Less sensitive individually. Treated symmetrically for hygiene.

### What is intentionally NOT scrubbed

Per SPEC-016 Q3 resolution, the shipped specs (SPEC-001 → SPEC-015), `CLAUDE.md`, the `.claude/agents/` directory, the `governance/` directory, and the `specs/templates/` directory are **kept public**. They are the methodology evidence that gives the SPEC-016 page its credibility. SPEC-017 includes a light spot-check sweep for inadvertent secrets/PII in these surfaces (R9), but no blanket cleanup. Per-spec scrub of sensitive references is a per-spec responsibility, not SPEC-017's job.

## Decision Rationale

Four operator decisions were resolved with Rob in conversation 2026-05-11 (referenced as D1–D4 below):

- **D1: `OPERATOR-TODOS.md` → gitignore + keep local; remove from HEAD and history.** Rationale: content is operational-private, not damaging-private. A separate-repo approach is overhead-heavy for an actively maintained checklist; scrub-and-keep is impractical given the file's working-notes voice. Gitignore-local preserves utility, removes public surface, and is the standard treatment for operator-private notes.
- **D2: `robcparker_com_audit.md` + `website_audit_prompt.md` → same treatment as D1 (both gitignore + keep local).** Rationale: audit doc is the actually-damaging file; the prompt template is benign on its own. Symmetric treatment removes a coordination axis and matches D1's pattern. Both retain ongoing historical-reference value (SPEC-010 through SPEC-014 cite the audit by dimension; future specs may too) — keep local, don't delete.
- **D3: Git history rewrite → `git filter-repo` with full backup protocol.** Rationale: `git filter-repo` is the modern, git-recommended tool (BFG is older and less precise). The destructive force-push to main is bounded by a four-step backup protocol (R3, R4, R6, R8). The squash-everything alternative was rejected because it destroys the commit graph that SPEC-016 wants exposed as methodology evidence ("every spec is an artifact of this process").
- **D4: Public visibility flip is a SEPARATE operator action, not bundled into SPEC-017.** Rationale: stacking history-rewrite and visibility-flip in one session compresses two destructive moments. Separating them lets Rob sit with a scrubbed-but-still-private repo for hours-to-days, optionally re-verify, then flip on his own schedule. SPEC-016 QA Gate verifies public state independently (`gh repo view --json visibility`).

### Trade-offs accepted

- **The 3 files remain accessible to anyone with a current clone (pre-force-push).** Force-pushing rewrites origin, but anyone who cloned before the push retains the old history. Acceptable: the repo has been private throughout, so the only entity with a clone is Rob.
- **CI / GitHub integrations referencing old commit SHAs may break.** Currently the repo has no CI workflows beyond Cloudflare Pages auto-deploy, which builds against HEAD of main (not against historical SHAs). No PRs are open. Pre-flight check (R0) confirms.
- **Re-cloning is required for any other working copies.** Rob has a single working copy. Any additional clones (none currently) would need re-cloning post-rewrite.

## Requirements

### R0: Pre-flight checks

Before any destructive operation:

- `git status` returns clean (no uncommitted changes, no untracked files outside expected gitignored patterns).
- **Explicit target-file check:** `git status -- OPERATOR-TODOS.md robcparker_com_audit.md website_audit_prompt.md` returns clean. Uncommitted edits to any target file would be irrecoverable past R5 (filter-repo's working-tree update is destructive). (Per Arch Gate.)
- `git branch -a` shows no in-flight PR branches that would conflict with the rewrite.
- `gh pr list --state open` returns empty (no open PRs against `wizzbiff/robcparkerdotcom`).
- **Server-side branch enumeration:** `gh api repos/wizzbiff/robcparkerdotcom/branches --jq '.[].name'` returns only `main`. Any other server-side branch carries un-rewritten history of the target files and would defeat the scrub. If non-`main` branches exist, list them, decide per-branch (delete vs rewrite), and add the action to R5/R11 scope. (Per Arch Gate / Pen-test G1.)
- **Fork check:** `gh api repos/wizzbiff/robcparkerdotcom/forks --jq 'length'` returns 0. A fork holds independent commit objects that the rewrite cannot reach. None should exist (repo has been private), but verify. (Per Arch Gate.)
- **GitHub email verification:** `gh api user/emails --jq '.[] | select(.email == "contact@robcparker.com") | .verified'` returns `true`. The R5 email-rewrite normalizes all author/committer emails to `contact@robcparker.com`; if that address is not verified on Rob's GitHub account, post-flip commits will display without an avatar / profile link, degrading the SPEC-016 portfolio narrative. **If `false` or empty, pause R0 and complete GitHub email verification at `https://github.com/settings/emails` (verification email routes through Formspree to Rob's inbox).** Once verified, re-run this check and continue. (Per Arch Gate / Pen-test G3.)
- `git filter-repo --version` returns a version (tool installed). Install via `pip install git-filter-repo` or distro package if missing.
- The implementer confirms no other clones exist that would lose history continuity.

If any check fails, stop and resolve before proceeding.

### R1: Update `.gitignore` to include the three target files + settings.local.json

Add the following lines to `.gitignore`, grouped with the existing `# WHY:` comment convention:

```
# WHY: Internal operator + audit docs. Kept local for reference; removed from
# public repo per SPEC-017. Local copies live alongside the working tree but
# are not tracked.
OPERATOR-TODOS.md
robcparker_com_audit.md
website_audit_prompt.md

# WHY: Claude Code per-session settings (approved bash commands, MCP state).
# Currently gitignored at user-global level; moving to repo-level for
# defense-in-depth so the file cannot be accidentally committed from a
# different machine or by a future contributor (Pen-test G5).
.claude/settings.local.json
```

This change lands on the `spec/SPEC-017-repo-scrub` branch and merges to main BEFORE the history rewrite, so the gitignore precedence is established in the rewritten history's HEAD.

**After PR merge, the implementer must `git checkout main && git pull --rebase origin main` before proceeding to R2** so the local main reflects the merged gitignore commit. (Per Arch Gate.)

### R2: Preserve local copies outside the repository

Before any history-rewrite operation, copy the three files to a location outside the repo working tree:

```
mkdir -p ~/Documents/local-only/robcparker-private/
cp OPERATOR-TODOS.md robcparker_com_audit.md website_audit_prompt.md ~/Documents/local-only/robcparker-private/
```

Rationale: `git filter-repo` rewrites the working tree to match the new HEAD, which removes the files from the working directory. The off-tree copies preserve them. After the rewrite, the files are restored into the working tree (R7), where they are now gitignored.

### R3: Push backup branch to origin

```
git push origin main:backup/pre-scrub-2026-05-11
```

This preserves the pre-rewrite state on the remote as a recoverable reference, independent of the local backup. The branch is retained until SPEC-016 ships and Rob confirms the rewritten history is acceptable; cleanup is captured as a follow-on operator todo.

### R4: Local `.git` directory tarball backup

```
tar -czf ~/Documents/robcparkerdotcom-git-backup-2026-05-11.tar.gz -C ~/Documents/dev/robcparkerdotcom .git
```

A complete local backup of the pre-rewrite `.git` directory. If anything goes wrong mid-rewrite, restoring is `tar -xzf` over the corrupted `.git`.

### R5: Run `git filter-repo` to remove the three files AND normalize author emails

```
git filter-repo --force --invert-paths \
  --path OPERATOR-TODOS.md \
  --path robcparker_com_audit.md \
  --path website_audit_prompt.md \
  --email-callback 'return b"contact@robcparker.com"'
```

**Flag rationale:**

- `--force` — required because filter-repo refuses to run on a non-fresh clone by default; we operate on the live working clone deliberately (creating a fresh clone for the rewrite would orphan the local R4 tarball as our recovery artifact). Per Arch Gate finding #2.
- `--invert-paths` + three `--path` entries — "keep everything except these paths."
- `--email-callback 'return b"contact@robcparker.com"'` — normalizes every author and committer email to `contact@robcparker.com`. Eliminates the `robparker@robparker.attlocal.net` residential-router-hostname residue on early commits AND collapses the wizzbiff-merge-commit duplicate-identity texture. Requires R0's email-verification pre-step to have succeeded so the post-flip commit log links to Rob's GitHub profile. Per Arch Gate / Pen-test G3.

**Empty-commit behavior:** `--prune-empty=auto` (default) is correct. Pre-walkthrough check confirmed neither of the two touching commits (`ae0d2c6`, `c328f8a`) becomes empty — both retain non-scrubbed content. Per Spec Gate Q5.

**Implementer notes:**

- `git filter-repo` removes the `origin` remote by default as a safety measure. R8 re-adds it.
- `git filter-repo` rewrites the working tree to match the new HEAD. The three target files are removed from the working directory after R5; R2's off-tree copies are how R7 restores them.
- filter-repo writes a `.git/filter-repo/` directory with rewrite metadata. Harmless; can be removed with `rm -rf .git/filter-repo/` after R10.5 verification passes.

### R6: Verify history is clean

Three commands must each return empty output:

```
git log --all -- OPERATOR-TODOS.md
git log --all -- robcparker_com_audit.md
git log --all -- website_audit_prompt.md
```

Additionally:

```
git log --all --oneline | head -20
```

This confirms the commit graph above is preserved (SPEC-* commit messages, dates, authors intact). Spot-check a recent SPEC-015 commit by SHA-prefix to confirm it still exists.

### R7: Restore local copies into the working tree

```
cp ~/Documents/local-only/robcparker-private/*.md ~/Documents/dev/robcparkerdotcom/
git status
```

`git status` must show the working tree as clean — the three files exist on disk but are gitignored per R1, so they do not appear as untracked. If they appear as untracked, R1 did not land correctly; abort and resolve.

### R8: Re-add origin remote and force-push to main

```
git remote add origin git@github.com:wizzbiff/robcparkerdotcom.git
git remote -v   # verify
git fetch origin   # refresh the --force-with-lease reference (Arch Gate)
git push origin main --force-with-lease
```

`--force-with-lease` is preferred over raw `--force`: it refuses to push if the remote has moved since the last fetch, providing a final guard against an unexpected concurrent push. Acceptable in this solo-operator context where the only push source is Rob.

**`git fetch origin` before the push is required** (per Arch Gate / Pen-test G6) so the lease reference is fresh. If a long pause occurred between R3 (backup-branch push) and R8 (force-push), the lease value would be stale and the push could be refused for benign reasons — fetch keeps it current.

### R8a: Post-push API-level verification (per Arch Gate / Pen-test G3)

After R8 succeeds, verify the rewrite landed correctly on origin:

```
gh api repos/wizzbiff/robcparkerdotcom/contents/OPERATOR-TODOS.md       # expect 404
gh api repos/wizzbiff/robcparkerdotcom/contents/robcparker_com_audit.md # expect 404
gh api repos/wizzbiff/robcparkerdotcom/contents/website_audit_prompt.md # expect 404
gh api repos/wizzbiff/robcparkerdotcom/branches --jq '.[].name'          # expect only "main"
```

Each `contents/*` call must return HTTP 404 (file does not exist at HEAD). The `branches` call confirms no other server-side branches snuck in. Run AFTER force-push and BEFORE R10.5 (which closes the irreversibility threshold on origin-side recovery).

### R9: Spot-check sweep of public-bound surfaces — HEAD + history + closed PRs

Per SPEC-016 Q3 resolution, the shipped specs (SPEC-001 → SPEC-015), `CLAUDE.md`, `.claude/agents/`, `governance/`, and `specs/templates/` are kept public. SPEC-017 does NOT scrub their content — but a three-pass spot-check confirms no inadvertent secrets/PII leaked in.

**Expected-residual framing (per Arch Gate finding #9 / stack-quirks IG-residual-ranges rule):** raw-match counts are inherently noisy on a content-rich documentation repo. Each check below predicts a **range** of raw matches with **zero true positives** as the relevant assertion. Implementer documents false-positive count and one-line rationale per cluster in the QA checklist.

**R9a — HEAD sweep:**

- **Common secret-pattern grep:** `grep -rEn '(api[_-]?key|secret|token|password|bearer)' --include='*.md' --include='*.html' --include='*.js' --include='*.css' .` — expect 5–25 raw matches (CLAUDE.md security section, governance docs, SPEC-004's contact-form discussion); expect **0 true positives**.
- **Formspree references:** `grep -rn 'formspree.io' .` — expect 1–4 matches (contact.html action, SPEC-004, SPEC-014, possibly stack-quirks.md); all legitimate.
- **Email-address grep:** `grep -rEn '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' --include='*.md' --include='*.html' .` — expect 3–15 matches of `contact@robcparker.com` and `rob.c.parker@gmail.com`; expect **0 matches of any other address**.
- **Tracked secret-file paths:** `git ls-files | grep -E '(\.env|\.secret|\.key|secrets/)'` — expect empty.
- **Turnstile site key:** `grep -rEn '0x4AAAA[A-Za-z0-9_]+' .` — expect 2–4 matches across `contact.html`, `js/main.js`, SPEC-004; all legitimate (site keys are designed for public exposure). Per Pen-test G3.
- **AI / cloud API key patterns:** `grep -rEn '(AKIA|sk-[a-zA-Z0-9]{20,}|sk_live_|sk_test_|claude-[a-z0-9])' --include='*.md' --include='*.html' --include='*.js'` — expect 0 matches. Per Pen-test G3.
- **Absolute home paths:** `grep -rn '/home/robparker' .` — expect 0–1 matches post-scrub (the few historical instances were in OPERATOR-TODOS.md, removed by R5; one allowed self-reference in this very pattern description). Per Pen-test G3.

**R9b — History-wide sweep:**

Catches secrets committed to non-target files and later removed/replaced. Cheap (~30s on a repo this size):

- Secret-pattern grep over full diff history: `git log -p --all | grep -Ein '(api[_-]?key|secret|token|password|bearer)' | head -100` — expect 30–200 raw matches; expect **0 true positives**.
- Formspree grep over history: `git log -p --all -- '*.html' '*.js' | grep -in 'formspree.io' | head -50` — expect only the legitimate `formspree.io/f/mvzdrbnk` references from SPEC-004 R-series commits.

### R9c: Closed-PR and issue body audit (per Pen-test G2)

Closed PR and issue bodies survive a history rewrite — they live in GitHub's metadata layer, not in git refs. PR #17's body, for example, references `OPERATOR-TODOS.md:72` in plaintext. After visibility flip, these become public and surface the scrubbed-file paths by name.

```
gh pr list --state closed --limit 50 --json number,title,body,comments \
  --jq '.[] | select(.body + (.comments[]?.body // "") | test("OPERATOR-TODOS|robcparker_com_audit|website_audit_prompt"; "i")) | {number, title}'

gh issue list --state all --limit 50 --json number,title,body,comments \
  --jq '.[] | select(.body + (.comments[]?.body // "") | test("OPERATOR-TODOS|robcparker_com_audit|website_audit_prompt"; "i")) | {number, title}'
```

For each PR/issue hit:

1. Read the full body and comments: `gh pr view <N> --json body,comments` (or `gh issue view <N>`).
2. PATCH the body via `gh api repos/wizzbiff/robcparkerdotcom/pulls/<N> -X PATCH -f body='<redacted body>'`, replacing path references with a neutral form ("internal operator file" or just omission). Comments use `gh api repos/wizzbiff/robcparkerdotcom/issues/comments/<COMMENT_ID> -X PATCH -f body='<redacted>'`.
3. Document the redaction in the QA checklist: PR/issue number, line redacted, replacement form.

**Expected hits:** 1–5 PRs reference the file paths in summaries / test-plan checklists. PR #17 is a known hit. Effort: ~15–30 minutes depending on count.

**Escalation:** if R9a / R9b find a true positive **outside** the SPEC-017 target list, the implementer pauses before R8 (force-push) and surfaces the finding. Options at that point: (a) expand R5's filter-repo invocation to include the additional file/path and re-run from R3; (b) if a single string needs scrubbing rather than a whole file, use `git filter-repo --replace-text` with a patterns file. Either path is a spec-scope expansion — surface to Rob, do not absorb silently.

Routine HEAD-only false positives (the word "secrets" in a security section, `OPERATOR-TODOS` references inside SPEC-011's text describing the SPEC-011 R7 work, etc.) are documented in the QA checklist with a one-line explanation each. No code edits made to neutralize them.

### R10: Verify already-gitignored items have no git history

Sanity-check that `specs/scratch/` and `.claude/settings.local.json` were never historically committed (current recon confirms no entries — re-verify post-rewrite):

```
git log --all -- specs/scratch/
git log --all -- .claude/settings.local.json
```

Both must return empty. If non-empty, extend R5's filter-repo invocation to include those paths and re-run from R3 — but only after surfacing the finding to Rob, since this changes the spec's destructive scope.

### R10.5: Cloudflare Pages active verification (per Arch Gate finding #7)

After R8 force-push, the Cloudflare Pages integration should detect the new HEAD SHA and deploy. Verify actively rather than passively:

1. Within ~5 minutes of R8, open the Cloudflare Pages dashboard for `robcparkerdotcom` and check for a new deployment matching the post-rewrite main SHA.
2. If a deploy is triggered: wait for green, then `curl -s -o /dev/null -w '%{http_code}' https://robcparker.com/` returns 200 and spot-check one page renders correctly.
3. If no deploy triggered by force-push (Cloudflare may suppress webhooks on force-push): make a trivial no-op commit (e.g., trailing newline to `README.md`), push, and verify the resulting deploy succeeds.

Either path confirms the integration survived the rewrite.

### R10.7: Delete origin-side backup branch — point of no return (per Spec Gate Q1)

Once R6, R7, R8, R8a, R9 (a/b/c), R10, and R10.5 verifications ALL pass and are recorded in the QA checklist, delete the backup branch from origin:

```
git push origin --delete backup/pre-scrub-2026-05-11
```

**Rationale (Spec Gate Q1):** the backup branch contains the un-scrubbed history. If retained on origin when the repo is flipped to public, anyone can `git clone --branch backup/pre-scrub-2026-05-11` and retrieve the three files this spec just removed — defeating the entire scrub. The local R4 tarball remains as the sole recovery path.

**This is the irreversibility threshold for origin-side recovery.** Beyond R10.7, restoring origin to the pre-rewrite state requires reconstructing it from the local R4 tarball.

**Origin-side recovery procedure (if needed post-R10.7):**

1. `cd ~/Documents/dev/robcparkerdotcom`
2. `rm -rf .git`
3. `tar -xzf ~/Documents/robcparkerdotcom-git-backup-2026-05-11.tar.gz -C .`
4. Verify: `git log -1` shows the pre-rewrite HEAD.
5. `git push origin main --force` to restore origin to the pre-rewrite state. (Note: `--force` here, not `--force-with-lease`, since the lease reference is no longer valid after the scrubbed force-push.)

Local recovery (no origin restore needed) remains available via the same R4 tarball or via reflog (~90-day retention) for the foreseeable future regardless of R10.7.

**Do not execute R10.7 until ALL prior verification steps pass and are documented.**

## Out of Scope

- **Visibility flip to public.** Deliberately separated per D4. Captured as a follow-on operator action in `OPERATOR-TODOS.md` (R11 in this spec scope), executed at Rob's discretion before SPEC-016 implementation.
- **Content scrub of public-bound surfaces.** SPEC-001 through SPEC-015, `CLAUDE.md`, `.claude/`, `governance/`, `specs/templates/` are kept as-is per SPEC-016 Q3 resolution. R9 is a sanity sweep, not a rewrite.
- **GitHub repo settings beyond visibility.** Default branch, branch protection, issue templates, security advisories, GitHub Pages config, etc. are out of scope. If SPEC-016 or a future spec wants any of these, they get their own treatment.
- **Cloudflare Pages deploy hook reconfiguration.** Cloudflare Pages builds from HEAD of main; the rewrite changes commit SHAs but the integration tracks branch name, not SHA. No reconfiguration needed; QA verifies the next push triggers a successful build.
- **Migration of `OPERATOR-TODOS.md` content into auto-memory.** D1 chose gitignore-local, not memory-migration. The file remains a working checklist locally. Future durable-facts items may individually migrate to memory at Rob's discretion; that is not SPEC-017's job.
- **GitHub repo description, topics, README polish for public-readiness.** If desired, captured as a separate trivial spec or as a SPEC-016 R0 step.

## Implementation Plan

Sequenced steps for the implementer. **This numbered order is authoritative — follow it, not the R-ID ordering** (R-IDs were assigned to match logical grouping, not strict execution order; the Arch Gate added R-IDs out-of-sequence to preserve traceability).

1. **Pre-flight** (R0): verify clean tree, no open PRs, `git filter-repo` installed, target files have no uncommitted edits, server-side branches enumerated, fork count is 0, `contact@robcparker.com` verified on GitHub.
2. **Spec branch** (R1): create `spec/SPEC-017-repo-scrub`, update `.gitignore` (adds 4 lines for the 3 target files + `.claude/settings.local.json`), commit, push, PR to main, merge. After merge: `git checkout main && git pull --rebase origin main`.
3. **Local copy preservation** (R2): copy 3 files outside the working tree.
4. **Remote backup** (R3): push `backup/pre-scrub-2026-05-11` branch to origin.
5. **Local backup** (R4): tar the `.git` directory.
6. **History rewrite** (R5): run `git filter-repo --force --invert-paths` for the 3 paths + `--email-callback` for author-email normalization to `contact@robcparker.com`.
7. **Verify clean history** (R6): all three `git log --all -- <path>` calls return empty; spot-check recent SPEC-* commits still exist; verify author emails normalized via `git log --all --pretty=format:'%ae' | sort -u`.
8. **Restore working-tree copies** (R7): copy 3 files back into the repo working dir; `git status` is clean.
9. **Re-add origin, fetch, force-push** (R8): `git remote add origin`, `git fetch origin`, then `git push --force-with-lease`.
10. **Post-push API-level verification** (R8a): `gh api repos/.../contents/<path>` returns 404 for each scrubbed file; `gh api repos/.../branches` returns only `main`.
11. **Spot-check sweep — HEAD + history** (R9a + R9b): run the grep checks; address any true-positive findings inline or escalate per R9 policy.
12. **Closed-PR / issue audit** (R9c): enumerate closed PRs and issues for path references; PATCH each via gh API to redact; document.
13. **Verify scratch / settings history** (R10): confirm both return empty `git log --all`.
14. **Cloudflare Pages active verification** (R10.5): watch dashboard for deploy within 5 min of R8; if no deploy triggered, push a trivial no-op commit; confirm `https://robcparker.com/` returns 200.
15. **Delete origin-side backup branch — POINT OF NO RETURN** (R10.7): only after ALL prior steps pass and are documented; `git push origin --delete backup/pre-scrub-2026-05-11`. Origin-side recovery from here requires the local R4 tarball.
16. **Document follow-on operator action** (R11): add the visibility-flip todo to `OPERATOR-TODOS.md` (local-only post-scrub).
17. **Post-completion cleanup** (optional): `rm -rf .git/filter-repo/` (rewrite metadata directory).

### R11: Document the visibility-flip operator follow-on

After SPEC-017 closes, append to the local-only `OPERATOR-TODOS.md` under a new "## SDD pipeline preconditions" section:

```
- [ ] **Flip wizzbiff/robcparkerdotcom to public visibility.** Precondition for SPEC-016 implementation. Run `gh repo edit wizzbiff/robcparkerdotcom --visibility public` (gh will prompt interactively for confirmation). After flip, verify `gh repo view --json visibility` returns "PUBLIC" and an anonymous browser can reach `https://github.com/wizzbiff/robcparkerdotcom` with HTTP 200. Source: SPEC-017 R11.
  - **Priority:** Critical (blocks SPEC-016 implementation start).
  - **Effort:** <2 minutes.
  - **Note:** if anything looks wrong post-flip (e.g., a missed sensitive file surfaces), `gh repo edit --visibility private` reverses immediately. The rewritten history is already in place; flipping back to private retains the scrubbed state. Be aware GitHub-side residual-object retention applies — see SPEC-017 Risk section.
```

The implementer makes this entry in the local OPERATOR-TODOS.md (which is gitignored post-scrub, so the entry is local-only and travels with the file, not with the repo).

## QA Verification

Standard tier requires a QA checklist. The implementer-tester agent completes `governance/qa-checklist.md` adapted for this spec. The unique-to-SPEC-017 verifications:

**Pre-flight (R0):**
- [ ] `git status` clean (general + explicit target-file check).
- [ ] No open PRs (`gh pr list --state open` empty).
- [ ] Server-side branches enumerated; only `main` exists (or non-main branches addressed per R0 escalation).
- [ ] Fork count is 0.
- [ ] `contact@robcparker.com` verified on GitHub account.
- [ ] `git filter-repo --version` returns a version.

**Backup protocol (R3, R4):**
- [ ] Local off-tree copies at `~/Documents/local-only/robcparker-private/` for all three files.
- [ ] Remote backup branch `backup/pre-scrub-2026-05-11` exists on origin during the rewrite (created in R3).
- [ ] Local `.git` tarball backup exists at `~/Documents/robcparkerdotcom-git-backup-2026-05-11.tar.gz`.

**History rewrite verification (R6, R8a):**
- [ ] `git log --all -- OPERATOR-TODOS.md` returns empty.
- [ ] `git log --all -- robcparker_com_audit.md` returns empty.
- [ ] `git log --all -- website_audit_prompt.md` returns empty.
- [ ] Recent SPEC-* commits still resolvable on main by SHA-prefix (sample: 3 commits — note SHAs change due to email-rewrite, so verify by commit message instead).
- [ ] Author emails normalized: `git log --all --pretty=format:'%ae' | sort -u` returns exactly one address (`contact@robcparker.com`).
- [ ] `git status` clean after R7.
- [ ] `git remote -v` shows origin as `git@github.com:wizzbiff/robcparkerdotcom.git`.
- [ ] R8a: `gh api repos/wizzbiff/robcparkerdotcom/contents/<each-of-3-paths>` returns 404 for all three.
- [ ] R8a: `gh api repos/wizzbiff/robcparkerdotcom/branches --jq '.[].name'` returns only `main` post-push.

**Spot-check sweep (R9a, R9b, R9c):**
- [ ] R9a HEAD sweep completed; match counts within predicted ranges; 0 true positives confirmed; false-positive clusters documented one-line each.
- [ ] R9b history-wide sweep completed; same.
- [ ] R9c closed-PR / issue audit completed; all hits PATCHed via gh API; redactions documented (PR/issue #, what was redacted, replacement form).

**Already-gitignored items (R10):**
- [ ] `git log --all -- specs/scratch/` and `git log --all -- .claude/settings.local.json` both return empty.

**Cloudflare integration (R10.5):**
- [ ] Cloudflare Pages dashboard observed within 5 min of R8 force-push; either (a) auto-deploy triggered and went green, or (b) trivial no-op commit pushed and that deploy went green.
- [ ] `curl -s -o /dev/null -w '%{http_code}' https://robcparker.com/` returns 200.
- [ ] Spot-check one page renders correctly in a browser.

**Point of no return (R10.7):**
- [ ] All prior verifications above are checked and documented BEFORE R10.7 executes.
- [ ] `git push origin --delete backup/pre-scrub-2026-05-11` succeeded.
- [ ] `git ls-remote origin backup/pre-scrub-2026-05-11` returns empty.

**Operator follow-on (R11):**
- [ ] OPERATOR-TODOS.md (local-only) contains the visibility-flip follow-on entry, with `gh repo edit --visibility public` invocation (no fictitious flag).

**SPEC-017 close-state:**
- [ ] Repo visibility is **still PRIVATE** at SPEC-017 close (per D4; visibility flip is the next operator action, not part of this spec).

## Dependencies

- **`git filter-repo`** installed locally. Install via `pip install git-filter-repo` if missing.
- **GitHub CLI (`gh`)** for repo metadata checks (already installed per project convention).
- **No new third-party services.** No external integrations.
- **No new code paths.** Only `.gitignore` is modified in the tracked tree.

## Risk + Reversibility

**Destructive operations:** R5 (`git filter-repo`) and R8 (`git push --force-with-lease`).

**Reversibility:**
- R5 is reversible locally via the R4 tarball backup.
- R8 is reversible on origin via the R3 backup branch (`git push origin backup/pre-scrub-2026-05-11:main --force`).
- The two backups are independent: R4 protects against local corruption, R3 protects against an irreversible remote state.

**Risks:**
- **Implementer-tester runs steps out of order** (e.g., force-push before verification, or R10.7 backup-branch deletion before all other steps pass). Mitigated by the sequenced Implementation Plan (steps 1–17, authoritative order), the QA checklist's explicit "ALL prior verifications above are checked and documented BEFORE R10.7 executes" gate, and the Standard-tier gate depth requiring inline arch review of the rewrite invocation.
- **A pre-existing sensitive file surfaces during R9 spot-check.** R9a (HEAD), R9b (history-wide), and R9c (closed-PR audit) are designed exactly to catch this. If found, address inline before R8 (force-push); if discovered after R8 but before R10.7 (backup-branch deletion), the visibility flip in R11 has not yet occurred, so public exposure has not happened — re-scope SPEC-017 to include the additional file and re-run from R3.
- **GitHub-side residual-object retention (per Spec Gate Q2).** After force-push, GitHub retains "unreachable" objects until garbage collection — typically days-to-weeks. A researcher who knows or guesses an old commit SHA can retrieve historical file content via the GitHub API (`/repos/{owner}/{repo}/git/blobs/{sha}` or `git fetch <sha>`) during this window, even after R10.7 deletes the backup branch and the repo is flipped to public. **Content sensitivity assessment (independently verified at Arch Gate by pen-tester):** the three scrubbed files contain operator notes and a candid audit — no API keys, no PII, no credentials. Attack profile: motivated-researcher-with-guessed-SHA, not opportunistic. Pre-flip exposure is impossible (repo private throughout SPEC-017). Post-flip, the realistic SHA-knowledge attack is a researcher who clones the repo immediately after visibility flip and inspects local history — but the rewritten history is the only history on origin after R10.7, so even an immediate-post-flip clone retrieves only the scrubbed state. The unreachable-objects-by-SHA vector requires the attacker to already know an old SHA, which they cannot derive from the public repo. Accepted risk per Spec Gate Q2. If post-flip a more sensitive file surfaces in history, mitigations available are (a) `gh repo edit --visibility private` immediately reverses public exposure, (b) [GitHub Support](https://support.github.com/contact) can expedite GC, (c) repo deletion + recreation eliminates the window entirely.
- **filter-repo behavior differs across versions.** Mitigated by `git filter-repo --version` check in R0 and by the fact that the invocation uses only stable, documented flags.
- **An unexpected GitHub integration depends on old SHAs.** Pre-flight check confirms only Cloudflare Pages exists, which tracks branch-name not SHA. No further mitigation needed.
- **A new fork appears on origin between R0 fork-check and R10.7.** Repo is private throughout SPEC-017, and forks of private repos require explicit invitation. Effectively zero risk; R0 check is defense-in-depth.
- **Working tree has uncommitted edits to a target file at R5 time.** R0 explicit target-file check catches this. Past R5, modifications are irrecoverable.

The destructive-action rule from `CLAUDE.md` applies: backups are mandatory before R5 and R8. The implementer does NOT proceed past R4 if any backup step fails. R10.7 (origin-side backup branch deletion) is the irreversibility threshold for **origin-side** recovery — beyond R10.7, the local R4 tarball is the sole origin-restoration artifact. Local recovery (no origin restore) remains available via R4 or reflog (~90-day default retention) regardless of R10.7.

## Open Questions

None. Pre-spec decisions (D1–D4) were resolved with Rob in conversation 2026-05-11. Spec Gate walkthrough resolutions (Q1–Q5) are captured below.

## Spec Gate Resolutions (2026-05-11)

| Q | Topic | Resolution |
|---|-------|------------|
| Q1 | **Origin-side backup branch vs. visibility flip** — gap caught at gate. Original draft said "retain until SPEC-016 ships"; but visibility flip happens BEFORE SPEC-016, so retained backup branch would defeat the scrub. | **Delete `backup/pre-scrub-2026-05-11` from origin BEFORE visibility flip.** Added R8.5 step; local R4 tarball is sole recovery path past R8.5. QA checklist verifies `git ls-remote origin backup/pre-scrub-2026-05-11` returns empty. |
| Q2 | **GitHub-side residual-object exposure window.** Post-force-push, unreachable objects remain accessible via SHA for days-to-weeks until GitHub GC. | **Acknowledge in Risk section, accept the window.** Content profile (no secrets/PII, only operator notes + audit) does not justify GitHub Support escalation or repo-recreation. Documented mitigations if a more-sensitive file later surfaces. |
| Q3 | **R9 spot-check sweep scope** — HEAD only vs. history-wide. | **Add history-wide grep (R9b) using `git log -p --all`.** Cheap (~30s), catches secrets-in-deleted-files outside the SPEC-017 target list. Findings escalate per R9 policy. R9 split into R9a (HEAD) + R9b (history). |
| Q4 | **Tier confirmation.** | **Standard confirmed.** Destructive surface + irreversibility-without-backup justify full Standard gate depth. Complex is overreach (no new pattern); Trivial is underspec'd for the destructive operation. |
| Q5 | **filter-repo empty-commit policy + `ae0d2c6` commit-message rewrite.** | **Default `--prune-empty=auto`; no message rewrite.** Pre-gate check confirmed neither of the two touching commits (`ae0d2c6`, `c328f8a`) becomes empty — both retain non-scrubbed content. Cosmetic message-rewrite of `ae0d2c6` deferred as marginal. |

**Additional draft fixes caught at gate:**
- R11 originally cited `gh repo edit --visibility public --accept-visibility-change-consequences` — that flag does not exist in `gh`. Corrected to plain `gh repo edit --visibility public` (gh prompts interactively). QA checklist verifies the corrected invocation in the local OPERATOR-TODOS.md entry.

**Spec Gate Decision:** Approved 2026-05-11.

**Spec Gate annotation:** Pre-spec conversation (2026-05-11) resolved the four substantive operator decisions D1–D4 (treatment of OPERATOR-TODOS.md, audit docs, history-rewrite tool/protocol, visibility-flip cadence). Gate walkthrough caught one real gap (Q1: origin-side backup branch retention vs. visibility flip) and one draft error (R11 fictitious `gh` flag), expanded R9 to a history-wide pass (Q3), confirmed tier (Q4) and filter-repo defaults (Q5), and accepted the GitHub-side residual-exposure window as proportionate to content sensitivity (Q2). Standard tier confirmed at Spec Gate.

## Arch Gate Resolutions (2026-05-11)

Architect Review stage invoked `architect-reviewer` (Layer 2 design validation) and `penetration-tester` (Layer 2 security review) in parallel. Both returned **Approve with conditions**. Conditions consolidated below; spec amended to absorb all must-fix items and the should-fix items with confirmed operator decisions.

**Mandatory fixes absorbed (architect-reviewer):**

| # | Finding | Action |
|---|---------|--------|
| A | R8.5 placement ambiguity (numbered ID didn't match Implementation Plan step) | Renumbered to R10.7 (matches step-15 execution order); R10.5 reserved for Cloudflare verification step (was missing) |
| B | R5 missing `--force` flag (required on non-fresh clones) | Added `--force` to R5 invocation with rationale comment |
| C | Recovery procedure compressed in original draft | Inlined 5-step origin-side recovery procedure into R10.7 |
| D | R9 outcomes written as singletons, not ranges (violates stack-quirks IG-residual rule) | Reframed R9a/R9b as range predictions with "0 true positives" as the relevant assertion |
| L | Cloudflare verification was passive ("next commit triggers a build") | Made active (R10.5) — observe dashboard within 5 min of R8; fallback to no-op commit if no auto-deploy |

**Mandatory fixes absorbed (penetration-tester):**

| # | Finding | Action |
|---|---------|--------|
| G1 | Server-side branches other than `main` could carry un-rewritten history | Verified at gate: `git ls-remote --heads origin` returns only `main`. Defensive R0 enumeration added for future-proofing. |
| G2 | Closed-PR / issue bodies reference scrubbed file paths in plaintext (e.g. PR #17 cites `OPERATOR-TODOS.md:72`) | **CONFIRMED real.** New R9c: enumerate closed PRs/issues, PATCH bodies via gh API to redact path references. Per Rob's decision (Arch Gate Q1). |
| G3 | Author email `.attlocal.net` residue leaks residential router hostname | R5 `--email-callback` normalizes ALL author/committer emails to `contact@robcparker.com`. **Operator pre-step added to R0:** verify `contact@robcparker.com` on Rob's GitHub account before R5 runs, or post-flip commit log will lose profile-avatar linkage. Per Rob's decision (Arch Gate Q2). |
| G5 | `.claude/settings.local.json` only gitignored at user-global level | Added to repo `.gitignore` in R1 (defense-in-depth) |
| G6 | `--force-with-lease` could refuse on stale fetch-state | Added `git fetch origin` immediately before R8 |
| G3-extension | R9a grep patterns missed Turnstile, AI API keys, home paths | Added three pattern groups to R9a |

**Should-fix absorbed:**

| # | Finding | Action |
|---|---------|--------|
| Arch #4 | R7 `git filter-repo` working-tree behavior unclear | Documented in R5 implementer notes (filter-repo DOES update working tree; R2 + R7 are necessary not redundant) |
| Arch #10a | `.git/filter-repo/` metadata cleanup | Added optional step 17 in Implementation Plan |
| Arch #10c / Pen | Fork detection at R0 | Added |
| Pen R8a | Post-push API-level verification | Added new R8a step |

**Items considered, not absorbed:**

| # | Topic | Decision |
|---|-------|----------|
| Q1-clarify | "Closed PR audit — Audit + edit vs. accept-and-document" | Audit + edit chosen by Rob; codified as R9c |
| Q2-clarify | "Author-email normalization target — gmail vs. contact@" | `contact@robcparker.com` chosen by Rob (site-aligned); requires R0 email-verification pre-step |
| Tier escalation to Complex | Arch flagged this was a "close call" between Standard and Complex | Stayed Standard. Inline arch review at this gate is the substitute for Complex's separate ARCH-SPEC-017 checklist. Gate annotation acknowledges the close-call nature. |
| Stack-quirks entries for filter-repo behavior | Arch finding #5, #10b | Deferred to Post-Completion Retro per project convention |

**Arch Gate Decision:** Approved 2026-05-11 with conditions absorbed — implementation may begin.

**Arch Gate annotation:** Two-reviewer parallel invocation pattern (architect-reviewer + penetration-tester) for a destructive operator-tool spec. Pen-tester independently verified the spec's "no API keys, no PII, no credentials" assertion by reading all three target files — confirmed. Architect-reviewer caught the R8.5-numbering execution-order ambiguity that would have caused R10.7 to execute prematurely. The two reviewers converged on the same conclusion via independent paths: Approve, with mandatory fixes that are mechanical not scope-changing. The two operator decisions (G2 closed-PR audit; G3 author-email normalization target) were resolved with Rob in conversation; the Arch Gate did not surface any decision that required a return to Spec Gate. Per `feedback_ig_residual_counts_as_ranges.md` memory and the stack-quirks rule, R9 outcomes were re-framed as ranges at this gate. The destructive-action protocol from `CLAUDE.md` is fully internalized through three explicit verification layers: R3/R4 backups, R6/R8a verification, R10.7 explicit irreversibility threshold.

## Implementation Notes (2026-05-11)

Implementation executed step-by-step over a single session with operator confirmation at each destructive threshold (R5, R8, R10.7). The procedure ran cleanly; no R4-tarball recovery was needed. Three in-flight findings emerged during execution and were resolved without scope expansion.

### In-flight findings resolved during implementation

**Finding 1 (during R9a.7 spot-check): SPEC-017 itself contained 4 absolute `/home/robparker/...` paths in operator-procedure documentation.** The same kind of operator-private texture the spec was designed to remove. Resolved by sanitizing 3 of the 4 paths to `~/...` form (R4 tar target, R7 restore path, R10.7 recovery `cd`) and updating R9a.7's expected range from "0 matches" to "0–1 matches" to allow the one remaining self-reference (the literal grep pattern description). Required one additional commit-and-push on main (`79a166e`, later amended). Per Rob's decision in R9 walkthrough.

**Finding 2 (during R10.5 verification, retrospectively visible in R9b): R9 raw-match counts substantially exceeded predicted ranges.** Predicted vs. actual: secret-pattern HEAD 5–25 vs. 156; Formspree 1–4 vs. ~15; emails 3–15 vs. ~22; history-wide secrets 30–200 vs. 233. The relevant assertion ("0 true positives") held in every case. The prediction ranges were too narrow for a content-rich documentation repo with extensive policy/security/CSS-token text. **For retro:** the IG-residual-ranges rule worked as intended (asserting on "0 true positives" not raw count), but the predicted raw-count ranges should be wider on docs-heavy repos. Suggest adding to `governance/stack-quirks.md`: "for spec-rich repos, expect R9-style grep counts in the hundreds rather than the dozens; the relevant assertion is true-positive count, not raw count."

**Finding 3 (during final author-email verification): post-R5 commit `79a166e` re-introduced `rob.c.parker@gmail.com` as author email.** The R5 `--email-callback` normalized all PRIOR commits to `contact@robcparker.com`, but the path-sanitization commit made AFTER R5 used the unchanged local `git config user.email`, which still pointed at the gmail address. Resolved by: (a) `git config user.email contact@robcparker.com` to update local config, (b) `git commit --amend --reset-author --no-edit` on the affected commit, (c) `git push origin main --force-with-lease`. Final state: ONE author email (`contact@robcparker.com`) across all history; commit SHAs `79a166e` → `9a81725`. **For retro / stack-quirks:** "after `git filter-repo --email-callback` rewrites history, update local `git config user.email` BEFORE making any new commits, or new commits will re-introduce the previous author identity. Add to operator procedure for any future history-rewrite spec."

### Other implementation notes

**`gh pr edit --body-file` failed silently** when applying R9c PR-body redactions (likely tied to the Projects-classic GraphQL deprecation surfacing as warnings). Direct REST API call via `gh api repos/.../pulls/<N> -X PATCH -F body=@<file>` worked. **For stack-quirks:** "prefer `gh api ... -X PATCH -F body=@<file>` over `gh pr edit --body-file` for programmatic PR body edits; the latter has a fragile dependency on Projects-classic metadata that may fail silently."

**Local `refs/remotes/origin/spec/SPEC-015-sugarai-rebrand` stale tracking ref** existed at R0 but pointed at a server-side branch that had already been deleted at PR-merge time. Harmless (won't push), cleaned via `git remote prune origin` post-R10.7.

**Cloudflare Pages auto-deploy** triggered automatically on every push (R8 force-push, path-sanitization push, amend force-push). No manual no-op-commit fallback needed. Each deploy produced byte-identical site output since no site assets changed. R10.5 verification confirmed `https://robcparker.com/` returns 200 with intact rendering after R8.

### Final implementation state (2026-05-11)

- **Local main HEAD:** `9a81725` (after the amend-and-force-push fix for Finding 3)
- **Origin main HEAD:** matches local; backup branch deleted (R10.7)
- **Origin branches:** only `main`
- **Author email across all history:** `contact@robcparker.com` (single identity)
- **Three scrubbed files:** absent from HEAD, all history, all server-side refs, all PR bodies, all PR/issue comments
- **Local-only artifacts:** three files restored to working tree (gitignored); R4 tarball at `~/Documents/robcparkerdotcom-git-backup-2026-05-11.tar.gz` (2.0 MB); off-tree copies at `~/Documents/local-only/robcparker-private/`
- **Repo visibility:** PRIVATE (per D4; visibility flip is the next operator action, tracked in local OPERATOR-TODOS.md R11 entry)
- **`.git/filter-repo/` metadata:** cleaned (step 17)

### QA Checklist status (2026-05-11)

All items from the QA Verification section above passed. Notable:

- Pre-flight: ALL 6 checks passed (target-file edit check empty, no open PRs, only `main` server-side, fork count 0, `contact@robcparker.com` GitHub-verified, `git filter-repo --version` returns a version).
- Backup protocol: 3 backups verified (off-tree copies + origin backup branch + local tarball).
- History rewrite verification: 3 target-file `git log` calls empty; 73 commits rewritten cleanly; author email normalized; recent SPEC-* messages preserved.
- Spot-check sweep: R9a/R9b/R9c all clean (0 true positives; 1 known self-reference in R9a.7 documented; 2 PR bodies redacted).
- Gitignored items: `specs/scratch/` and `.claude/settings.local.json` confirmed never historically committed.
- Cloudflare integration: site returns 200; rendering intact.
- Point of no return: backup branch deleted from origin; `gh api .../branches` returns only `main`.
- Operator follow-on: visibility-flip entry added to local OPERATOR-TODOS.md under new "SDD pipeline preconditions" section.
- Close state: repo still PRIVATE — as designed per D4.

**QA Gate Decision:** Approved 2026-05-11 — SPEC-017 implementation complete. The next operator action is the visibility flip per R11 (local OPERATOR-TODOS.md), which unblocks SPEC-016 implementation.
