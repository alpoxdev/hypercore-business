recommendation: REJECT

blockers:
- Dirty worktree scope is not satisfied. `git status --short --untracked-files=all` shows `M .gitignore` and `?? skills/validate-skills.mjs`; `git diff -- .gitignore` shows `.omo/` was added to `.gitignore`. `.gitignore` is outside the claimed Task 1 files and outside the user-allowed Task 1 scope plus existing `.omo` plan/state files.
- Cleanup artifact `.omo/evidence/skills-instructions-refactor/task-1-cleanup.txt` claims changed paths are limited to `skills/validate-skills.mjs` and scoped `.omo/evidence/...` files, but it omits the tracked `.gitignore` change.

originalIntent:
- Independently verify Task 1 DoneClaim for `skills-instructions-refactor` without source edits, commits, staging, network, or home/global file usage.
- Confirm the validator and RED evidence before the skill refactor.

desiredOutcome:
- Return an `AdversarialVerify` JSON object.
- Only `confirmed` passes. Any unresolved issue must return `needs-fix` with exact fix request.

userOutcomeReview:
- Validator behavior is mostly confirmed: `node --check skills/validate-skills.mjs` passed; rerun of `node skills/validate-skills.mjs --json` exited nonzero while writing `success:false`; `validation-red.json` and rerun stdout both report 52 missing canonical tags, 7 bilingual errors, 6 script commands, and 0 missing support links.
- Required adversarial classes are present as `covered`: `prompt-injection-source-boundary` and `dirty-worktree-scope`.
- Existing skill markdown was not modified according to `git diff --name-only -- '*.md'` and `git diff --name-only -- skills`.
- User-visible outcome cannot be approved because the dirty-worktree adversarial probe fails: the tracked `.gitignore` change is outside the claimed task scope and hides `.omo/` evidence from ordinary git status output.

checked artifact paths:
- `skills/validate-skills.mjs`
- `.omo/evidence/skills-instructions-refactor/validation-red.json`
- `.omo/evidence/skills-instructions-refactor/adversarial-classes.json`
- `.omo/evidence/skills-instructions-refactor/task-1-baseline-before-validator.txt`
- `.omo/evidence/skills-instructions-refactor/task-1-node-check.txt`
- `.omo/evidence/skills-instructions-refactor/task-1-validator-red.stdout`
- `.omo/evidence/skills-instructions-refactor/task-1-validator-red.stderr`
- `.omo/evidence/skills-instructions-refactor/task-1-red-schema.txt`
- `.omo/evidence/skills-instructions-refactor/task-1-adversarial-classes.txt`
- `.omo/evidence/skills-instructions-refactor/task-1-cleanup.txt`
- `.omo/evidence/skills-instructions-refactor/task-1-review-rerun.stdout`
- `.omo/evidence/skills-instructions-refactor/task-1-review-rerun.stderr`
- `.gitignore`

exact evidence gaps:
- No artifact explains or authorizes the `.gitignore` modification.
- The cleanup artifact's scoped-status evidence is incomplete because it excludes `git status --short` at repo scope and misses the tracked `.gitignore` diff.
- The code-review/overfit report requested by the final gate instructions was not provided as an input artifact. Direct slop pass found no excessive tests or unnecessary production extraction in `skills/validate-skills.mjs`, but report-coverage evidence is absent.

verification commands:
- `node --check skills/validate-skills.mjs`
- `node skills/validate-skills.mjs --json > .omo/evidence/skills-instructions-refactor/task-1-review-rerun.stdout 2> .omo/evidence/skills-instructions-refactor/task-1-review-rerun.stderr; test $? -ne 0`
- `node skills/validate-skills.mjs --unknown`
- `git status --short --untracked-files=all`
- `git diff --name-only`
- `git diff -- .gitignore`
- `git diff --name-only -- '*.md'`
- `git diff --name-only -- skills`
