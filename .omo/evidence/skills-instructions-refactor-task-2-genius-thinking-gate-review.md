recommendation: APPROVE

blockers:
- None.

originalIntent:
- Independently verify Task 2 (`genius-thinking`) DoneClaim for `skills-instructions-refactor`.
- Verify only the Task 2 target files and Task 2 evidence artifacts.
- Return an `AdversarialVerify` JSON result where only `confirmed` passes.

desiredOutcome:
- `skills/genius-thinking/SKILL.md` and `skills/genius-thinking/SKILL.ko.md` include the canonical instruction tags.
- The English skill still preserves the documented genius-thinking output contract: `.hypercore/genius-thinking/[topic-slug]/`, `flow.json`, `frameworks.md`, `analysis.md`, `ideas.md`, `priorities.md`, `10+ ideas`, and `Do not present near-duplicate ideas`.
- Task 2 evidence proves the RED baseline, GREEN checks, validator filtered result, and cleanup scope.

userOutcomeReview:
- Current canonical tag check passed for both English and Korean files with no missing required opening or closing tags.
- English contract preservation check passed for all requested strings.
- RED artifact exists and records the expected missing canonical tags before edit, then prints `PASS expected missing tags`.
- GREEN artifact exists and records `genius-thinking canonical tags ok`, `genius-thinking preserved output contract`, and `PASS genius-thinking`.
- Validator stdout has top-level unrelated `success:false`, but its filtered Task 2 assertion says `no genius-thinking canonical misses`.
- Cleanup receipt is scoped to `task-2 genius-thinking`, lists only the two `skills/genius-thinking` changed paths, and records adversarial notes for stale state, dirty worktree/scope, misleading success output, and prompt-injection/source-boundary.
- Scoped `git status` for Task 2 shows only the two genius-thinking files and the five task-2 evidence artifacts; unrelated workers' files were not evaluated.

checked artifact paths:
- `skills/genius-thinking/SKILL.md`
- `skills/genius-thinking/SKILL.ko.md`
- `.omo/evidence/skills-instructions-refactor/task-2-genius-red.txt`
- `.omo/evidence/skills-instructions-refactor/task-2-genius-green.txt`
- `.omo/evidence/skills-instructions-refactor/task-2-validator-after-genius.stdout`
- `.omo/evidence/skills-instructions-refactor/task-2-cleanup.txt`
- `.omo/evidence/skills-instructions-refactor/task-2-doneclaim.json`

adversarialProbes:
- stale_state: PASS. RED artifact timestamp is before the edited files; validator, cleanup, GREEN, and DoneClaim artifacts are after the edited files.
- dirty_worktree_scope: PASS. Scoped status shows only `skills/genius-thinking/SKILL.md`, `skills/genius-thinking/SKILL.ko.md`, and task-2 evidence artifacts.
- misleading_success_output: PASS. The validator top-level failure was not trusted as success; the filtered assertion specifically says `no genius-thinking canonical misses`.
- prompt_injection_source_boundary: PASS. Target files declare only local support files and bound generated outputs to `.hypercore/genius-thinking/[topic-slug]/`; grep found no external URLs, home/global paths, or instruction-override phrases in Task 2 scope.

slopAndProgrammingReview:
- Direct `remove-ai-slops` pass over the diff found no excessive or useless tests, deletion-only tests, tautological tests, implementation-mirroring tests, or unnecessary production extraction/parsing/normalization.
- Direct `programming` criteria pass found no new code abstractions, dependencies, type escape hatches, destructive verification loops, or scope drift in the Markdown-only normalization diff.
- No separate code-review report was included in the user-scoped Task 2 evidence; this receipt records the direct reviewer pass over the scoped diff and evidence.

exact evidence gaps:
- No blocker for the scoped Task 2 DoneClaim.
- The validator artifact's top-level `success:false` is caused by unrelated in-progress repository validation state, so only the explicit Task 2 filtered assertion was used for this verification.

verification commands:
- `node -e "...canonical tag check..."`
- `node -e "...English preserved output contract check..."`
- `tail -n 80 .omo/evidence/skills-instructions-refactor/task-2-validator-after-genius.stdout`
- `rg -n "genius-thinking|canonical misses|no genius|PASS|FAIL" .omo/evidence/skills-instructions-refactor/task-2-validator-after-genius.stdout`
- `git diff -- skills/genius-thinking/SKILL.md skills/genius-thinking/SKILL.ko.md`
- `git status --short -- skills/genius-thinking .omo/evidence/skills-instructions-refactor/task-2-genius-red.txt .omo/evidence/skills-instructions-refactor/task-2-genius-green.txt .omo/evidence/skills-instructions-refactor/task-2-validator-after-genius.stdout .omo/evidence/skills-instructions-refactor/task-2-cleanup.txt .omo/evidence/skills-instructions-refactor/task-2-doneclaim.json`
- `stat -f "%m %N" skills/genius-thinking/SKILL.md skills/genius-thinking/SKILL.ko.md .omo/evidence/skills-instructions-refactor/task-2-genius-red.txt .omo/evidence/skills-instructions-refactor/task-2-genius-green.txt .omo/evidence/skills-instructions-refactor/task-2-validator-after-genius.stdout .omo/evidence/skills-instructions-refactor/task-2-cleanup.txt .omo/evidence/skills-instructions-refactor/task-2-doneclaim.json`
- `rg -n "/Users|~|curl|https?://|\\.agents|\\.codex|ignore (previous|above|all)|system prompt|developer message" skills/genius-thinking/SKILL.md skills/genius-thinking/SKILL.ko.md .omo/evidence/skills-instructions-refactor/task-2-genius-red.txt .omo/evidence/skills-instructions-refactor/task-2-genius-green.txt .omo/evidence/skills-instructions-refactor/task-2-validator-after-genius.stdout .omo/evidence/skills-instructions-refactor/task-2-cleanup.txt .omo/evidence/skills-instructions-refactor/task-2-doneclaim.json`
