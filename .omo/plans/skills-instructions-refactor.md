# Prometheus Skills Instructions Refactor Plan

## TL;DR
> Summary:      로컬 `skills/`의 여섯 개 skill 폴더를 저장소의 skill-authoring 계약에 맞게 정규화한다. 루트/orchestrator는 `skills/`를 직접 수정하지 않고, 검증 하네스와 폴더별 구현/QA를 분리된 하위 작업으로 위임한다.
> Deliverables:
> - `skills/validate-skills.mjs` 기반의 RED/GREEN 구조 검증 하네스와 `.omo/evidence/skills-instructions-refactor/` 증거
> - 여섯 canonical `SKILL.md`와 필요한 `SKILL.ko.md` mirror의 `<output_language>`, `<routing_rule>`, `<instruction_contract>`, `<support_file_read_order>`, validation 정규화
> - `product-detail-maker`의 한국어-only reference에 대한 영어 counterpart와 product-detail validator 회귀 보존
> - 범위 제한, adversarial class, script syntax, product-detail validator, 최종 QA 증거
> Effort:       Large
> Risk:         Medium - 여섯 skill 도메인, bilingual mirror, support-file discovery, validator 계약이 동시에 움직인다.

## Scope
### Must have
- 모든 구현 작업은 `skills/`와 `.omo/` 내부만 수정한다. ULW goal은 로컬 `skills/` refactor, domain logic 보존, routing/support/bilingual/validation evidence, global/home-directory 금지를 요구한다 (`.omo/ulw-loop/019f1ef1-a778-7050-8fda-4740917f5eb6/goals.json:11`, `.omo/ulw-loop/019f1ef1-a778-7050-8fda-4740917f5eb6/goals.json:13`).
- Canonical `SKILL.md`는 최소 계약의 `<output_language>`, `<purpose>`, `<routing_rule>`, `<instruction_contract>`, activation examples, workflow, validation 구조를 갖춘다 (`instructions/skill/SKILL_AUTHORING.md:61`, `instructions/skill/SKILL_AUTHORING.md:74`, `instructions/skill/SKILL_AUTHORING.md:86`, `instructions/skill/SKILL_AUTHORING.md:100`, `instructions/skill/SKILL_AUTHORING.md:108`).
- `instruction_contract`는 intent, scope, authority, evidence, tools, loop, output, verification, stop condition을 포함한다 (`instructions/skill/SKILL_AUTHORING.md:86`, `instructions/skill/SKILL_AUTHORING.md:97`, `instructions/skill/SKILL_AUTHORING.md:184`).
- `SKILL.md`는 얇게 유지하고 support files를 직접 참조한다. Core 파일은 가능하면 300줄 안팎을 목표로 하며 direct support reference가 필요하다 (`instructions/skill/references/progressive-disclosure.md:13`, `instructions/skill/references/progressive-disclosure.md:20`, `instructions/skill/references/progressive-disclosure.md:60`, `instructions/skill/references/progressive-disclosure.md:63`).
- Trigger는 positive, negative, boundary 예시와 유사 skill 간 route boundary를 갖춘다 (`instructions/skill/references/trigger-design.md:33`, `instructions/skill/references/trigger-design.md:43`, `instructions/skill/references/trigger-design.md:49`, `instructions/skill/references/trigger-design.md:97`).
- Script-backed validation은 deterministic하고 machine-readable해야 한다. Scripts는 반복 검증, machine-readable output, helpful failure에 유효하다 (`instructions/skill/references/resource-placement.md:46`, `instructions/skill/references/resource-placement.md:52`, `instructions/skill/references/resource-placement.md:56`).
- Instruction 변경은 eval/trace/regression gate를 가진다. Baseline case, current run, smallest patch, rerun, risk documentation 순서를 따른다 (`instructions/harness-engineering/HARNESS_ENGINEERING.md:7`, `instructions/harness-engineering/HARNESS_ENGINEERING.md:66`, `instructions/harness-engineering/HARNESS_ENGINEERING.md:77`).
- 병렬 구현은 disjoint write set에서만 수행하고, leader가 통합 검증을 소유한다 (`instructions/context-engineering/references/parallel-workflows.md:7`, `instructions/context-engineering/references/parallel-workflows.md:15`, `instructions/context-engineering/references/parallel-workflows.md:37`, `instructions/context-engineering/references/parallel-workflows.md:38`).
- `genius-thinking`, `elon-musk`, `startup-validator`의 전략 skill routing boundary를 분명히 보존한다. 현재 세 skill은 각각 ideation, first-principles teardown, startup validation으로 분화되어 있다 (`skills/genius-thinking/SKILL.md:42`, `skills/elon-musk/SKILL.md:54`, `skills/startup-validator/SKILL.md:42`).
- `image-maker`, `logo-maker`, `product-detail-maker`의 media/commerce 실행 계약과 기존 archive/preview/Figma/product-detail validation 흐름을 보존한다 (`skills/image-maker/SKILL.md:45`, `skills/image-maker/SKILL.md:94`, `skills/logo-maker/SKILL.md:41`, `skills/logo-maker/SKILL.md:49`, `skills/product-detail-maker/SKILL.md:47`, `skills/product-detail-maker/SKILL.md:91`).

### Must NOT have (guardrails, anti-slop, scope boundaries)
- 루트/orchestrator가 `skills/`, `instructions/`, product/app files를 직접 수정하지 않는다. 이 plan 작성 이후 구현은 subagent/worker에게 위임한다.
- `instructions/`는 구현 중 수정하지 않는다. 본 plan은 `instructions/`를 근거로만 사용한다.
- `~/.agents`, `~/.codex`, home-directory global skill/config, 외부 plugin cache를 읽거나 수정하지 않는다.
- 기존 skill의 domain logic, output paths, archive paths, Figma/product-detail assumptions, script behavior를 wholesale rewrite로 대체하지 않는다.
- 신규 dependency를 추가하지 않는다. Validator는 Node.js built-in modules만 사용한다.
- Network, browser, Figma write, image generation, deploy, git push, production side effect를 실행하지 않는다. 이 refactor는 local instruction/data surface만 검증한다.
- 자동 commit을 만들지 않는다. 사용자가 별도로 요청하기 전에는 `git add`와 `git commit`도 하지 않는다.
- `skills/genius-thinking/SKILL.ko.md`가 없다고 주장하지 않는다. 해당 Korean mirror는 존재한다 (`skills/genius-thinking/SKILL.ko.md:1`, `skills/genius-thinking/SKILL.ko.md:6`).

## Verification strategy
> Zero human intervention - all verification is agent-executed.
- Test decision: TDD + characterization-first for docs, Node.js deterministic validator, shell assertions, and existing product-detail validator.
- QA policy: every task has agent-executed CLI/data-surface scenarios, with RED proof before any production skill edit and GREEN proof after the scoped edit.
- Evidence: `.omo/evidence/skills-instructions-refactor/task-<N>-<slug>.<ext>`
- Required final ULW evidence:
  - C001: `node skills/validate-skills.mjs --json` exits 0 and writes `.omo/evidence/skills-instructions-refactor/validation-green.json` with `success=true`, zero missing canonical contract tags, zero missing support links, zero bilingual pair errors, and no line-budget violations (`.omo/ulw-loop/019f1ef1-a778-7050-8fda-4740917f5eb6/goals.json:17`, `.omo/ulw-loop/019f1ef1-a778-7050-8fda-4740917f5eb6/goals.json:20`).
  - C002: `git diff --name-only` and `git status --short` prove changed paths are limited to `skills/` and `.omo/`; `.omo/evidence/skills-instructions-refactor/adversarial-classes.json` covers prompt-injection/source-boundary and dirty-worktree classifications (`.omo/ulw-loop/019f1ef1-a778-7050-8fda-4740917f5eb6/goals.json:26`, `.omo/ulw-loop/019f1ef1-a778-7050-8fda-4740917f5eb6/goals.json:29`).
  - C003: `node skills/product-detail-maker/scripts/validate-product-detail-maker-skill.mjs` and `node --check` for every `.mjs` under `skills/` exit 0, with transcript at `.omo/evidence/skills-instructions-refactor/regression-product-detail-and-scripts.txt` (`.omo/ulw-loop/019f1ef1-a778-7050-8fda-4740917f5eb6/goals.json:35`, `.omo/ulw-loop/019f1ef1-a778-7050-8fda-4740917f5eb6/goals.json:38`).

## Execution strategy
### Parallel execution waves
> Target 5-8 tasks per wave. Wave 1 is intentionally single because all production skill edits depend on the shared RED validator baseline.
> Extract shared dependencies as Wave-1 tasks to maximize parallelism.

Wave 1 (no dependencies):
- Task 1: Add all-skills validator and capture shared RED baseline.

Wave 2 (after Wave 1):
- Task 2: Normalize `genius-thinking` contract; depends [1].
- Task 3: Normalize `elon-musk` contract; depends [1].
- Task 4: Normalize `startup-validator` contract; depends [1].

Wave 3 (after Wave 1; can run alongside Wave 2 if worker capacity allows and no shared file edits occur):
- Task 5: Normalize `image-maker` contract; depends [1].
- Task 6: Normalize `logo-maker` contract; depends [1].
- Task 7: Normalize `product-detail-maker`, bilingual references, and product validator; depends [1].

Wave 4 (after Waves 2 and 3):
- Task 8: Integration evidence, scope boundary, regression commands, and cleanup receipt; depends [2, 3, 4, 5, 6, 7].

Critical path: Task 1 -> Task 7 -> Task 8 -> Final verification wave.

### Dependency matrix
| Task | Depends on | Blocks | Can parallelize with |
|------|------------|--------|----------------------|
| 1 | none | 2, 3, 4, 5, 6, 7, 8 | none |
| 2 | 1 | 8 | 3, 4, 5, 6, 7 |
| 3 | 1 | 8 | 2, 4, 5, 6, 7 |
| 4 | 1 | 8 | 2, 3, 5, 6, 7 |
| 5 | 1 | 8 | 2, 3, 4, 6, 7 |
| 6 | 1 | 8 | 2, 3, 4, 5, 7 |
| 7 | 1 | 8 | 2, 3, 4, 5, 6 |
| 8 | 2, 3, 4, 5, 6, 7 | F1, F2, F3, F4, F5 | none |

## Todos
> Implementation + Test = ONE task. Never separate.
> Every task MUST have: References + Acceptance Criteria + QA Scenarios + Commit.

- [x] 1. Shared validator와 RED baseline 만들기

  What to do: Subagent `validator-harness`가 `skills/validate-skills.mjs`를 새로 만든다. 먼저 현재 상태를 baseline으로 characterise하고, 그 다음 validator를 작성한 뒤 어떤 skill content도 수정하기 전에 RED evidence를 캡처한다. Validator는 Node.js built-in modules만 사용하고, `--json` 실행 시 `.omo/evidence/skills-instructions-refactor/validation-red.json` 또는 `validation-green.json`을 success 값에 따라 쓰며 stdout에도 같은 JSON을 출력한다. JSON schema는 `success`, `canonicalContract`, `supportLinks`, `bilingualPairs`, `lineBudgets`, `scriptChecks`, `adversarialClasses`, `filesChecked`, `cleanup` keys를 포함한다. `adversarial-classes.json`에는 최소 `prompt-injection-source-boundary`와 `dirty-worktree-scope` class가 `covered` 상태로 포함되어야 한다.
  Must NOT do: `SKILL.md` content, `instructions/`, product/app files, package files, global/home files를 수정하지 않는다. 신규 npm dependency를 추가하지 않는다.

  Parallelization: Can parallel: NO | Wave 1 | Blocks: [2, 3, 4, 5, 6, 7, 8] | Blocked by: []

  References (executor has NO interview context - be exhaustive):
  - Pattern:  `instructions/skill/SKILL_AUTHORING.md:61` - canonical `SKILL.md` minimum contract shape.
  - Pattern:  `instructions/skill/SKILL_AUTHORING.md:177` - final verification checklist requires direct support links, safety boundary, scripts, and handoff risk.
  - Pattern:  `instructions/skill/references/validation.md:5` - validation layers include anatomy, trigger, workflow, output, source, safety, regression.
  - Pattern:  `instructions/skill/references/validation.md:153` - safety eval must cover prompt injection, credential, destructive, production, arbitrary tool args.
  - Pattern:  `instructions/harness-engineering/HARNESS_ENGINEERING.md:66` - instruction change loop starts with success criteria and baseline cases.
  - Pattern:  `instructions/harness-engineering/HARNESS_ENGINEERING.md:99` - agent harness logs tool calls, files touched, permission boundaries, and adversarial retrieved content.
  - Existing validator: `skills/product-detail-maker/scripts/validate-product-detail-maker-skill.mjs:1` - local Node ESM validator style.
  - Existing validator: `skills/product-detail-maker/scripts/validate-product-detail-maker-skill.mjs:168` - failure aggregation and non-zero exit pattern.
  - Current scripts: `skills/image-maker/scripts/archive-generated-images.mjs`, `skills/logo-maker/scripts/archive-logo-assets.mjs`, `skills/logo-maker/scripts/render-simple-logo-rgba.mjs`, `skills/product-detail-maker/scripts/validate-product-detail-maker-skill.mjs` - script syntax command listing must include these and `skills/validate-skills.mjs`.
  - ULW: `.omo/ulw-loop/019f1ef1-a778-7050-8fda-4740917f5eb6/goals.json:17` - final all-skills validator success criterion.

  Acceptance criteria (agent-executable only):
  - [ ] `bash -lc 'test -f skills/validate-skills.mjs && node --check skills/validate-skills.mjs'` exits 0.
  - [ ] Before any Task 2-7 skill edit, `bash -lc 'mkdir -p .omo/evidence/skills-instructions-refactor; if node skills/validate-skills.mjs --json > .omo/evidence/skills-instructions-refactor/task-1-validator-red.stdout 2> .omo/evidence/skills-instructions-refactor/task-1-validator-red.stderr; then echo "UNEXPECTED GREEN before skill refactor" >> .omo/evidence/skills-instructions-refactor/task-1-validator-red.stdout; exit 1; else echo "EXPECTED RED before skill refactor" >> .omo/evidence/skills-instructions-refactor/task-1-validator-red.stdout; fi; test -f .omo/evidence/skills-instructions-refactor/validation-red.json'` exits 0.
  - [ ] `bash -lc 'node -e '\''const fs=require("fs"); const p=".omo/evidence/skills-instructions-refactor/validation-red.json"; const j=JSON.parse(fs.readFileSync(p,"utf8")); if(j.success!==false) throw new Error("expected RED success=false"); const miss=(j.canonicalContract&&j.canonicalContract.missingTags)||[]; if(!miss.some(x=>String(x.file).endsWith("SKILL.md") && String(x.tag).includes("output_language"))) throw new Error("missing output_language diagnostic not present"); if(!j.scriptChecks || !Array.isArray(j.scriptChecks.commands) || j.scriptChecks.commands.length < 5) throw new Error("script command listing incomplete"); console.log("validator RED schema ok");'\'''` exits 0.
  - [ ] `bash -lc 'node -e '\''const fs=require("fs"); const p=".omo/evidence/skills-instructions-refactor/adversarial-classes.json"; const j=JSON.parse(fs.readFileSync(p,"utf8")); const ids=new Set((j.classes||[]).map(c=>c.id+":"+c.status)); for (const id of ["prompt-injection-source-boundary:covered","dirty-worktree-scope:covered"]) if(!ids.has(id)) throw new Error("missing adversarial class "+id); console.log("adversarial classes covered");'\'''` exits 0.

  QA scenarios (MANDATORY - task incomplete without these):
  ```
  Scenario: baseline RED proves current contract gaps
    Tool:     bash
    Steps:    bash -lc 'mkdir -p .omo/evidence/skills-instructions-refactor; if node skills/validate-skills.mjs --json > .omo/evidence/skills-instructions-refactor/task-1-validator-red.stdout 2> .omo/evidence/skills-instructions-refactor/task-1-validator-red.stderr; then echo "FAIL unexpected green"; exit 1; else echo "PASS expected red"; fi'
    Expected: command exits 0, `.omo/evidence/skills-instructions-refactor/validation-red.json` exists, JSON has `success:false`, and stdout contains `PASS expected red`.
    Evidence: .omo/evidence/skills-instructions-refactor/task-1-validator-red.stdout

  Scenario: adversarial/data-surface report has required classes
    Tool:     bash
    Steps:    bash -lc 'node -e '\''const fs=require("fs"); const p=".omo/evidence/skills-instructions-refactor/adversarial-classes.json"; const j=JSON.parse(fs.readFileSync(p,"utf8")); const covered=(j.classes||[]).filter(c=>c.status==="covered").map(c=>c.id).sort(); if(!covered.includes("prompt-injection-source-boundary") || !covered.includes("dirty-worktree-scope")) process.exit(1); console.log(covered.join("\n"));'\'' > .omo/evidence/skills-instructions-refactor/task-1-adversarial-classes.txt'
    Expected: command exits 0 and evidence lists both `dirty-worktree-scope` and `prompt-injection-source-boundary`.
    Evidence: .omo/evidence/skills-instructions-refactor/task-1-adversarial-classes.txt
  ```

  Commit: NO | Message: `test(skills): add structural validator for skill contracts` | Files: [`skills/validate-skills.mjs`, `.omo/evidence/skills-instructions-refactor/validation-red.json`, `.omo/evidence/skills-instructions-refactor/adversarial-classes.json`, `.omo/evidence/skills-instructions-refactor/task-1-*`]

- [x] 2. `genius-thinking` skill 계약 정규화

  What to do: Subagent `skill-genius-thinking` owns only `skills/genius-thinking/SKILL.md` and `skills/genius-thinking/SKILL.ko.md`. Baseline characterization first: capture the current file shape and RED proof for missing exact tags. Then add canonical `<output_language>`, `<purpose>`, `<routing_rule>`, `<instruction_contract>`, `<trigger_examples>`, `<support_file_read_order>`, `<workflow>`, and `<validation>` tags while preserving differentiated ideation, framework selection, output folder, flow tracking, and resume behavior. Korean mirror must track the same structure and not be treated as missing.
  Must NOT do: edit `rules/`, `references/`, `.hypercore/`, other skill folders, or change output files under `.hypercore/genius-thinking/[topic-slug]/`.

  Parallelization: Can parallel: YES | Wave 2 | Blocks: [8] | Blocked by: [1]

  References (executor has NO interview context - be exhaustive):
  - Current file: `skills/genius-thinking/SKILL.md:1` - frontmatter and existing description.
  - Current file: `skills/genius-thinking/SKILL.md:6` - direct support file annotations already exist.
  - Current gap: `skills/genius-thinking/SKILL.md:16` - uses heading-based "When to use" instead of canonical `<routing_rule>`.
  - Current behavior: `skills/genius-thinking/SKILL.md:42` - core job is differentiated idea generation and prioritization.
  - Current output: `skills/genius-thinking/SKILL.md:54` - document shape and `.hypercore/genius-thinking/[topic-slug]/` outputs to preserve.
  - Current validation: `skills/genius-thinking/SKILL.md:116` - validation content exists but not exact `<validation>` tag.
  - Korean mirror exists: `skills/genius-thinking/SKILL.ko.md:1` - do not repeat missing-file claim.
  - Contract: `instructions/skill/SKILL_AUTHORING.md:74` - output language tag required.
  - Contract: `instructions/skill/SKILL_AUTHORING.md:86` - instruction contract fields required.
  - Trigger: `instructions/skill/references/trigger-design.md:58` - trigger smoke set pattern.
  - Support files: `instructions/skill/references/progressive-disclosure.md:39` - support navigation must state when to read each file.

  Acceptance criteria (agent-executable only):
  - [ ] RED proof exists at `.omo/evidence/skills-instructions-refactor/task-2-genius-red.txt`, captured before editing these two files.
  - [ ] `bash -lc 'node -e '\''const fs=require("fs"); for (const p of ["skills/genius-thinking/SKILL.md","skills/genius-thinking/SKILL.ko.md"]) { const s=fs.readFileSync(p,"utf8"); const tags=["output_language","purpose","routing_rule","instruction_contract","trigger_examples","support_file_read_order","workflow","validation"]; const missing=tags.flatMap(t=>(["<"+t+">","</"+t+">"]).filter(x=>!s.includes(x))); if(missing.length) { console.error(JSON.stringify({file:p,missing})); process.exit(1); } } console.log("genius-thinking canonical tags ok");'\'' > .omo/evidence/skills-instructions-refactor/task-2-genius-green.txt'` exits 0.
  - [ ] `bash -lc 'node -e '\''const fs=require("fs"); const s=fs.readFileSync("skills/genius-thinking/SKILL.md","utf8"); for (const term of [".hypercore/genius-thinking/[topic-slug]","flow.json","frameworks.md","analysis.md","ideas.md","priorities.md","10+ ideas","Do not present near-duplicate ideas"]) if(!s.includes(term)) throw new Error(term); console.log("genius-thinking preserved output contract");'\'' >> .omo/evidence/skills-instructions-refactor/task-2-genius-green.txt'` exits 0.
  - [ ] `bash -lc 'node skills/validate-skills.mjs --json > .omo/evidence/skills-instructions-refactor/task-2-validator-after-genius.stdout 2> .omo/evidence/skills-instructions-refactor/task-2-validator-after-genius.stderr || true; node -e '\''const fs=require("fs"); const j=JSON.parse(fs.readFileSync(fs.existsSync(".omo/evidence/skills-instructions-refactor/validation-green.json")?".omo/evidence/skills-instructions-refactor/validation-green.json":".omo/evidence/skills-instructions-refactor/validation-red.json","utf8")); const misses=((j.canonicalContract&&j.canonicalContract.missingTags)||[]).filter(x=>String(x.file).includes("genius-thinking/SKILL")); if(misses.length) { console.error(JSON.stringify(misses)); process.exit(1); } console.log("no genius-thinking canonical misses");'\'' >> .omo/evidence/skills-instructions-refactor/task-2-validator-after-genius.stdout'` exits 0.
  - [ ] Cleanup receipt appended to `.omo/evidence/skills-instructions-refactor/task-2-cleanup.txt` with `git diff --name-only -- skills/genius-thinking .omo/evidence/skills-instructions-refactor`.

  QA scenarios (MANDATORY - task incomplete without these):
  ```
  Scenario: RED before edit catches exact missing canonical tags
    Tool:     bash
    Steps:    bash -lc 'mkdir -p .omo/evidence/skills-instructions-refactor; if node -e '\''const fs=require("fs"); const p="skills/genius-thinking/SKILL.md"; const s=fs.readFileSync(p,"utf8"); const tags=["output_language","purpose","routing_rule","instruction_contract","trigger_examples","support_file_read_order","workflow","validation"]; const missing=tags.flatMap(t=>(["<"+t+">","</"+t+">"]).filter(x=>!s.includes(x))); if(missing.length){console.error(JSON.stringify({file:p,missing})); process.exit(1)}'\'' > .omo/evidence/skills-instructions-refactor/task-2-genius-red.txt 2>&1; then echo "FAIL unexpected pass"; exit 1; else echo "PASS expected missing tags"; fi'
    Expected: command exits 0 and evidence contains missing canonical tags for `skills/genius-thinking/SKILL.md`.
    Evidence: .omo/evidence/skills-instructions-refactor/task-2-genius-red.txt

  Scenario: GREEN preserves ideation output data surface
    Tool:     bash
    Steps:    bash -lc 'node -e '\''const fs=require("fs"); const s=fs.readFileSync("skills/genius-thinking/SKILL.md","utf8"); const required=["<output_language>","<instruction_contract>","<support_file_read_order>",".hypercore/genius-thinking/[topic-slug]","10+ ideas","flow.json"]; const missing=required.filter(x=>!s.includes(x)); if(missing.length){console.error(missing); process.exit(1)} console.log("PASS genius-thinking");'\'' > .omo/evidence/skills-instructions-refactor/task-2-genius-green.txt'
    Expected: command exits 0 and evidence contains `PASS genius-thinking`.
    Evidence: .omo/evidence/skills-instructions-refactor/task-2-genius-green.txt
  ```

  Commit: NO | Message: `refactor(genius-thinking): normalize skill contract tags` | Files: [`skills/genius-thinking/SKILL.md`, `skills/genius-thinking/SKILL.ko.md`, `.omo/evidence/skills-instructions-refactor/task-2-*`]

- [x] 3. `elon-musk` skill 계약 정규화

  What to do: Subagent `skill-elon-musk` owns only `skills/elon-musk/SKILL.md` and `skills/elon-musk/SKILL.ko.md`. Baseline characterization first, then convert `<run_contract>` to exact `<instruction_contract>`, replace `<when_to_use>` with exact `<routing_rule>`, add `<output_language>`, exact `<trigger_examples>`, and `<support_file_read_order>`. Preserve the non-impersonation guardrail, first-principles teardown, output files, flow tracking, and validation checklist.
  Must NOT do: make the skill persona role-play, change `.hypercore/elon-musk/[topic-slug]/` output filenames, edit rules/references, or add external research requirements.

  Parallelization: Can parallel: YES | Wave 2 | Blocks: [8] | Blocked by: [1]

  References (executor has NO interview context - be exhaustive):
  - Current frontmatter: `skills/elon-musk/SKILL.md:1` - existing skill name and description.
  - Current support annotations: `skills/elon-musk/SKILL.md:6` - support files already directly listed.
  - Current gap: `skills/elon-musk/SKILL.md:25` - has `<run_contract>` instead of `<instruction_contract>`.
  - Current gap: `skills/elon-musk/SKILL.md:38` - has `<when_to_use>` instead of `<routing_rule>`.
  - Guardrail: `skills/elon-musk/SKILL.md:94` - must not impersonate Elon Musk.
  - Output shape: `skills/elon-musk/SKILL.md:120` - `.hypercore/elon-musk/[topic-slug]/` files to preserve.
  - Validation: `skills/elon-musk/SKILL.md:180` - existing validation checks to preserve.
  - Contract: `instructions/skill/SKILL_AUTHORING.md:86` - exact instruction contract tag.
  - Safety: `instructions/skill/references/validation.md:153` - safety eval boundary cases.
  - Routing: `instructions/skill/references/trigger-design.md:85` - scope overlap requires routing-rule repair.

  Acceptance criteria (agent-executable only):
  - [ ] RED proof exists at `.omo/evidence/skills-instructions-refactor/task-3-elon-red.txt`, captured before editing these two files.
  - [ ] `bash -lc 'node -e '\''const fs=require("fs"); for (const p of ["skills/elon-musk/SKILL.md","skills/elon-musk/SKILL.ko.md"]) { const s=fs.readFileSync(p,"utf8"); const required=["<output_language>","</output_language>","<purpose>","</purpose>","<routing_rule>","</routing_rule>","<instruction_contract>","</instruction_contract>","<trigger_examples>","</trigger_examples>","<support_file_read_order>","</support_file_read_order>","<workflow>","</workflow>","<validation>","</validation>"]; const forbidden=["<when_to_use>","</when_to_use>","<run_contract>","</run_contract>"]; const missing=required.filter(x=>!s.includes(x)); const presentForbidden=forbidden.filter(x=>s.includes(x)); if(missing.length || presentForbidden.length) { console.error(JSON.stringify({file:p,missing,presentForbidden})); process.exit(1); } } console.log("elon-musk canonical tags ok");'\'' > .omo/evidence/skills-instructions-refactor/task-3-elon-green.txt'` exits 0.
  - [ ] `bash -lc 'node -e '\''const fs=require("fs"); const s=fs.readFileSync("skills/elon-musk/SKILL.md","utf8"); for (const term of ["not impersonate Elon Musk",".hypercore/elon-musk/[topic-slug]","research.md","assumptions.md","redesign.md","execution.md","rules/validation.md"]) if(!s.includes(term)) throw new Error(term); console.log("elon-musk preserved output and guardrail");'\'' >> .omo/evidence/skills-instructions-refactor/task-3-elon-green.txt'` exits 0.
  - [ ] Cleanup receipt appended to `.omo/evidence/skills-instructions-refactor/task-3-cleanup.txt` with `git diff --name-only -- skills/elon-musk .omo/evidence/skills-instructions-refactor`.

  QA scenarios (MANDATORY - task incomplete without these):
  ```
  Scenario: RED before edit catches non-canonical routing and contract tags
    Tool:     bash
    Steps:    bash -lc 'mkdir -p .omo/evidence/skills-instructions-refactor; if node -e '\''const fs=require("fs"); const s=fs.readFileSync("skills/elon-musk/SKILL.md","utf8"); if(!s.includes("<instruction_contract>")) throw new Error("missing instruction_contract"); if(s.includes("<when_to_use>")) throw new Error("when_to_use still present");'\'' > .omo/evidence/skills-instructions-refactor/task-3-elon-red.txt 2>&1; then echo "FAIL unexpected pass"; exit 1; else echo "PASS expected red"; fi'
    Expected: command exits 0 and evidence records missing `<instruction_contract>` or non-canonical `<when_to_use>`.
    Evidence: .omo/evidence/skills-instructions-refactor/task-3-elon-red.txt

  Scenario: GREEN confirms first-principles report surface remains intact
    Tool:     bash
    Steps:    bash -lc 'node -e '\''const fs=require("fs"); const s=fs.readFileSync("skills/elon-musk/SKILL.md","utf8"); const required=["<routing_rule>","<instruction_contract>","<support_file_read_order>","not impersonate Elon Musk",".hypercore/elon-musk/[topic-slug]","execution.md"]; const missing=required.filter(x=>!s.includes(x)); if(missing.length){console.error(missing); process.exit(1)} console.log("PASS elon-musk");'\'' > .omo/evidence/skills-instructions-refactor/task-3-elon-green.txt'
    Expected: command exits 0 and evidence contains `PASS elon-musk`.
    Evidence: .omo/evidence/skills-instructions-refactor/task-3-elon-green.txt
  ```

  Commit: NO | Message: `refactor(elon-musk): normalize routing and instruction contract` | Files: [`skills/elon-musk/SKILL.md`, `skills/elon-musk/SKILL.ko.md`, `.omo/evidence/skills-instructions-refactor/task-3-*`]

- [x] 4. `startup-validator` skill 계약 정규화

  What to do: Subagent `skill-startup-validator` owns only `skills/startup-validator/SKILL.md` and `skills/startup-validator/SKILL.ko.md`. Baseline characterization first, then replace `<when_to_use>` with `<routing_rule>`, add `<output_language>`, `<instruction_contract>`, exact `<trigger_examples>`, and `<support_file_read_order>`. Preserve evidence ladder, confidence-adjusted scoring, PMF/go-no-go verdicts, output files, and weak-evidence guardrails.
  Must NOT do: convert validation scoring into ideation, first-principles redesign, market research only, or implementation planning.

  Parallelization: Can parallel: YES | Wave 2 | Blocks: [8] | Blocked by: [1]

  References (executor has NO interview context - be exhaustive):
  - Current frontmatter: `skills/startup-validator/SKILL.md:1` - existing skill name and description.
  - Current support annotations: `skills/startup-validator/SKILL.md:6` - support files already listed.
  - Current gap: `skills/startup-validator/SKILL.md:26` - uses `<when_to_use>` instead of `<routing_rule>`.
  - Routing boundary: `skills/startup-validator/SKILL.md:42` - distinguishes genius-thinking, elon-musk, research, and plan.
  - Core job: `skills/startup-validator/SKILL.md:83` - frame, hypotheses, evidence ladder, scoring, discovery, experiments, verdict.
  - Output shape: `skills/startup-validator/SKILL.md:98` - `.hypercore/startup-validator/[topic-slug]/` outputs.
  - Validation: `skills/startup-validator/SKILL.md:159` - weak evidence and verdict checks to preserve.
  - Contract: `instructions/skill/SKILL_AUTHORING.md:181` - completion checks include frontmatter, description, examples, instruction contract.
  - Trigger: `instructions/skill/references/trigger-design.md:77` - boundary routing table pattern.
  - Validation: `instructions/skill/references/validation.md:187` - completion gate blocks missing trigger boundary, support links, side-effect gates, eval breadth.

  Acceptance criteria (agent-executable only):
  - [ ] RED proof exists at `.omo/evidence/skills-instructions-refactor/task-4-startup-red.txt`, captured before editing these two files.
  - [ ] `bash -lc 'node -e '\''const fs=require("fs"); for (const p of ["skills/startup-validator/SKILL.md","skills/startup-validator/SKILL.ko.md"]) { const s=fs.readFileSync(p,"utf8"); const required=["<output_language>","</output_language>","<purpose>","</purpose>","<routing_rule>","</routing_rule>","<instruction_contract>","</instruction_contract>","<trigger_examples>","</trigger_examples>","<support_file_read_order>","</support_file_read_order>","<workflow>","</workflow>","<validation>","</validation>"]; const forbidden=["<when_to_use>","</when_to_use>"]; const missing=required.filter(x=>!s.includes(x)); const presentForbidden=forbidden.filter(x=>s.includes(x)); if(missing.length || presentForbidden.length) { console.error(JSON.stringify({file:p,missing,presentForbidden})); process.exit(1); } } console.log("startup-validator canonical tags ok");'\'' > .omo/evidence/skills-instructions-refactor/task-4-startup-green.txt'` exits 0.
  - [ ] `bash -lc 'node -e '\''const fs=require("fs"); const s=fs.readFileSync("skills/startup-validator/SKILL.md","utf8"); for (const term of ["E0-E2 evidence cannot produce high-confidence Go",".hypercore/startup-validator/[topic-slug]","thesis.md","thiel-scores.md","pmf-forces.md","verdict.md","kill criteria"]) if(!s.includes(term)) throw new Error(term); console.log("startup-validator preserved validation contract");'\'' >> .omo/evidence/skills-instructions-refactor/task-4-startup-green.txt'` exits 0.
  - [ ] Cleanup receipt appended to `.omo/evidence/skills-instructions-refactor/task-4-cleanup.txt` with `git diff --name-only -- skills/startup-validator .omo/evidence/skills-instructions-refactor`.

  QA scenarios (MANDATORY - task incomplete without these):
  ```
  Scenario: RED before edit catches non-canonical routing tag
    Tool:     bash
    Steps:    bash -lc 'mkdir -p .omo/evidence/skills-instructions-refactor; if node -e '\''const fs=require("fs"); const s=fs.readFileSync("skills/startup-validator/SKILL.md","utf8"); if(!s.includes("<routing_rule>")) throw new Error("missing routing_rule"); if(s.includes("<when_to_use>")) throw new Error("when_to_use still present");'\'' > .omo/evidence/skills-instructions-refactor/task-4-startup-red.txt 2>&1; then echo "FAIL unexpected pass"; exit 1; else echo "PASS expected red"; fi'
    Expected: command exits 0 and evidence records missing `<routing_rule>` or present `<when_to_use>`.
    Evidence: .omo/evidence/skills-instructions-refactor/task-4-startup-red.txt

  Scenario: GREEN confirms validation-scoring data surface
    Tool:     bash
    Steps:    bash -lc 'node -e '\''const fs=require("fs"); const s=fs.readFileSync("skills/startup-validator/SKILL.md","utf8"); const required=["<routing_rule>","<instruction_contract>","<support_file_read_order>","E0-E2 evidence cannot produce high-confidence Go","confidence-adjusted verdict","verdict.md"]; const missing=required.filter(x=>!s.includes(x)); if(missing.length){console.error(missing); process.exit(1)} console.log("PASS startup-validator");'\'' > .omo/evidence/skills-instructions-refactor/task-4-startup-green.txt'
    Expected: command exits 0 and evidence contains `PASS startup-validator`.
    Evidence: .omo/evidence/skills-instructions-refactor/task-4-startup-green.txt
  ```

  Commit: NO | Message: `refactor(startup-validator): normalize validation skill contract` | Files: [`skills/startup-validator/SKILL.md`, `skills/startup-validator/SKILL.ko.md`, `.omo/evidence/skills-instructions-refactor/task-4-*`]

- [x] 5. `image-maker` skill 계약 정규화

  What to do: Subagent `skill-image-maker` owns only `skills/image-maker/SKILL.md` and `skills/image-maker/SKILL.ko.md`. Baseline characterization first, then add `<output_language>`, `<instruction_contract>`, and `<support_file_read_order>` while preserving the existing `<routing_rule>`, `<execution_contract>`, JSON prompt pipeline, `gpt-image-2` requirement, archive helper, preview contract, reference map, and validation. Convert no media behavior; this is structural normalization.
  Must NOT do: change image generation model defaults, archive paths, Chrome preview semantics, JSON prompt schema, helper scripts, or references.

  Parallelization: Can parallel: YES | Wave 3 | Blocks: [8] | Blocked by: [1]

  References (executor has NO interview context - be exhaustive):
  - Current frontmatter: `skills/image-maker/SKILL.md:1` - existing metadata and compatibility.
  - Current support annotations: `skills/image-maker/SKILL.md:10` - current support files.
  - Current routing: `skills/image-maker/SKILL.md:23` - routing rule already exists.
  - Current execution contract: `skills/image-maker/SKILL.md:45` - Codex/gpt-image-2, prompt pipeline, archive, preview requirements.
  - Current workflow: `skills/image-maker/SKILL.md:82` - 14-step workflow to preserve.
  - Current archive helper: `skills/image-maker/SKILL.md:101` - helper command and preview semantics.
  - Current JSON pipeline: `skills/image-maker/SKILL.md:117` - JSON prompt schema/review gates.
  - Current validation: `skills/image-maker/SKILL.md:149` - model, JSON, archive, preview checks.
  - Current reference map: `skills/image-maker/SKILL.md:174` - support map exists but not exact `<support_file_read_order>`.
  - Contract: `instructions/skill/SKILL_AUTHORING.md:74` - output language tag required.
  - Resource placement: `instructions/skill/references/resource-placement.md:129` - scripts without usage conditions and unsupported assets are forbidden patterns.

  Acceptance criteria (agent-executable only):
  - [ ] RED proof exists at `.omo/evidence/skills-instructions-refactor/task-5-image-red.txt`, captured before editing these two files.
  - [ ] `bash -lc 'node -e '\''const fs=require("fs"); for (const p of ["skills/image-maker/SKILL.md","skills/image-maker/SKILL.ko.md"]) { const s=fs.readFileSync(p,"utf8"); const required=["<output_language>","</output_language>","<purpose>","</purpose>","<routing_rule>","</routing_rule>","<instruction_contract>","</instruction_contract>","<trigger_examples>","</trigger_examples>","<support_file_read_order>","</support_file_read_order>","<workflow>","</workflow>","<validation>","</validation>"]; const missing=required.filter(x=>!s.includes(x)); if(missing.length) { console.error(JSON.stringify({file:p,missing})); process.exit(1); } } console.log("image-maker canonical tags ok");'\'' > .omo/evidence/skills-instructions-refactor/task-5-image-green.txt'` exits 0.
  - [ ] `bash -lc 'node -e '\''const fs=require("fs"); const s=fs.readFileSync("skills/image-maker/SKILL.md","utf8"); for (const term of ["gpt-image-2","English JSON prompt","scripts/archive-generated-images.mjs",".hypercore/image-maker/<topic-slug>/prompt.json","preview.html","assets/image-preview-template.html"]) if(!s.includes(term)) throw new Error(term); console.log("image-maker preserved media contract");'\'' >> .omo/evidence/skills-instructions-refactor/task-5-image-green.txt'` exits 0.
  - [ ] Cleanup receipt appended to `.omo/evidence/skills-instructions-refactor/task-5-cleanup.txt` with `git diff --name-only -- skills/image-maker .omo/evidence/skills-instructions-refactor`.

  QA scenarios (MANDATORY - task incomplete without these):
  ```
  Scenario: RED before edit catches missing output language and support read order
    Tool:     bash
    Steps:    bash -lc 'mkdir -p .omo/evidence/skills-instructions-refactor; if node -e '\''const fs=require("fs"); const s=fs.readFileSync("skills/image-maker/SKILL.md","utf8"); for (const tag of ["<output_language>","<instruction_contract>","<support_file_read_order>"]) if(!s.includes(tag)) throw new Error("missing "+tag);'\'' > .omo/evidence/skills-instructions-refactor/task-5-image-red.txt 2>&1; then echo "FAIL unexpected pass"; exit 1; else echo "PASS expected red"; fi'
    Expected: command exits 0 and evidence records missing canonical tags.
    Evidence: .omo/evidence/skills-instructions-refactor/task-5-image-red.txt

  Scenario: GREEN confirms gpt-image-2 and archive workflow are unchanged
    Tool:     bash
    Steps:    bash -lc 'node -e '\''const fs=require("fs"); const s=fs.readFileSync("skills/image-maker/SKILL.md","utf8"); const required=["<output_language>","<instruction_contract>","<support_file_read_order>","gpt-image-2",".hypercore/image-maker/<topic-slug>/","scripts/archive-generated-images.mjs","preview.html"]; const missing=required.filter(x=>!s.includes(x)); if(missing.length){console.error(missing); process.exit(1)} console.log("PASS image-maker");'\'' > .omo/evidence/skills-instructions-refactor/task-5-image-green.txt'
    Expected: command exits 0 and evidence contains `PASS image-maker`.
    Evidence: .omo/evidence/skills-instructions-refactor/task-5-image-green.txt
  ```

  Commit: NO | Message: `refactor(image-maker): add canonical instruction contract` | Files: [`skills/image-maker/SKILL.md`, `skills/image-maker/SKILL.ko.md`, `.omo/evidence/skills-instructions-refactor/task-5-*`]

- [x] 6. `logo-maker` skill 계약 정규화

  What to do: Subagent `skill-logo-maker` owns only `skills/logo-maker/SKILL.md` and `skills/logo-maker/SKILL.ko.md`. Baseline characterization first, then add `<output_language>`, `<instruction_contract>`, and `<support_file_read_order>` while preserving transparent PNG hard requirement, native alpha validation, deterministic RGBA fallback rules, archive helper, preview behavior, and reference map.
  Must NOT do: change transparent PNG acceptance, add postprocessing as default, edit scripts, or weaken alpha evidence.

  Parallelization: Can parallel: YES | Wave 3 | Blocks: [8] | Blocked by: [1]

  References (executor has NO interview context - be exhaustive):
  - Current frontmatter: `skills/logo-maker/SKILL.md:1` - existing metadata and compatibility.
  - Current support annotations: `skills/logo-maker/SKILL.md:10` - current support files.
  - Current routing: `skills/logo-maker/SKILL.md:21` - routing rule already exists.
  - Current execution contract: `skills/logo-maker/SKILL.md:41` - transparent PNG, prompt pipeline, native transparency, archive, preview.
  - Current workflow: `skills/logo-maker/SKILL.md:74` - logo workflow and alpha checks.
  - Current archive helper: `skills/logo-maker/SKILL.md:92` - helper command and archive files.
  - Current fallback renderer: `skills/logo-maker/SKILL.md:114` - deterministic RGBA fallback boundaries.
  - Current validation: `skills/logo-maker/SKILL.md:245` - logo validation checks.
  - Current reference map: `skills/logo-maker/SKILL.md:264` - support map exists but not exact `<support_file_read_order>`.
  - Contract: `instructions/skill/SKILL_AUTHORING.md:181` - script and support link completion checks.
  - Validation: `instructions/skill/references/validation.md:166` - script-backed skill validation requirements.

  Acceptance criteria (agent-executable only):
  - [ ] RED proof exists at `.omo/evidence/skills-instructions-refactor/task-6-logo-red.txt`, captured before editing these two files.
  - [ ] `bash -lc 'node -e '\''const fs=require("fs"); for (const p of ["skills/logo-maker/SKILL.md","skills/logo-maker/SKILL.ko.md"]) { const s=fs.readFileSync(p,"utf8"); const required=["<output_language>","</output_language>","<purpose>","</purpose>","<routing_rule>","</routing_rule>","<instruction_contract>","</instruction_contract>","<trigger_examples>","</trigger_examples>","<support_file_read_order>","</support_file_read_order>","<workflow>","</workflow>","<validation>","</validation>"]; const missing=required.filter(x=>!s.includes(x)); if(missing.length) { console.error(JSON.stringify({file:p,missing})); process.exit(1); } } console.log("logo-maker canonical tags ok");'\'' > .omo/evidence/skills-instructions-refactor/task-6-logo-green.txt'` exits 0.
  - [ ] `bash -lc 'node -e '\''const fs=require("fs"); const s=fs.readFileSync("skills/logo-maker/SKILL.md","utf8"); for (const term of ["Transparent PNG hard requirement","native transparent","scripts/archive-logo-assets.mjs","scripts/render-simple-logo-rgba.mjs",".hypercore/logo-maker/<topic-slug>/","RGBA","transparent pixel"]) if(!s.includes(term)) throw new Error(term); console.log("logo-maker preserved alpha contract");'\'' >> .omo/evidence/skills-instructions-refactor/task-6-logo-green.txt'` exits 0.
  - [ ] Cleanup receipt appended to `.omo/evidence/skills-instructions-refactor/task-6-cleanup.txt` with `git diff --name-only -- skills/logo-maker .omo/evidence/skills-instructions-refactor`.

  QA scenarios (MANDATORY - task incomplete without these):
  ```
  Scenario: RED before edit catches missing instruction contract and support order
    Tool:     bash
    Steps:    bash -lc 'mkdir -p .omo/evidence/skills-instructions-refactor; if node -e '\''const fs=require("fs"); const s=fs.readFileSync("skills/logo-maker/SKILL.md","utf8"); for (const tag of ["<output_language>","<instruction_contract>","<support_file_read_order>"]) if(!s.includes(tag)) throw new Error("missing "+tag);'\'' > .omo/evidence/skills-instructions-refactor/task-6-logo-red.txt 2>&1; then echo "FAIL unexpected pass"; exit 1; else echo "PASS expected red"; fi'
    Expected: command exits 0 and evidence records missing canonical tags.
    Evidence: .omo/evidence/skills-instructions-refactor/task-6-logo-red.txt

  Scenario: GREEN confirms transparent PNG data surface
    Tool:     bash
    Steps:    bash -lc 'node -e '\''const fs=require("fs"); const s=fs.readFileSync("skills/logo-maker/SKILL.md","utf8"); const required=["<output_language>","<instruction_contract>","<support_file_read_order>","Transparent PNG hard requirement","RGBA","transparent pixel","scripts/archive-logo-assets.mjs"]; const missing=required.filter(x=>!s.includes(x)); if(missing.length){console.error(missing); process.exit(1)} console.log("PASS logo-maker");'\'' > .omo/evidence/skills-instructions-refactor/task-6-logo-green.txt'
    Expected: command exits 0 and evidence contains `PASS logo-maker`.
    Evidence: .omo/evidence/skills-instructions-refactor/task-6-logo-green.txt
  ```

  Commit: NO | Message: `refactor(logo-maker): add canonical instruction contract` | Files: [`skills/logo-maker/SKILL.md`, `skills/logo-maker/SKILL.ko.md`, `.omo/evidence/skills-instructions-refactor/task-6-*`]

- [x] 7. `product-detail-maker` contract, bilingual references, and validator 정규화

  What to do: Subagent `skill-product-detail-maker` owns `skills/product-detail-maker/SKILL.md`, `skills/product-detail-maker/SKILL.ko.md`, seven new English counterpart references, and `skills/product-detail-maker/scripts/validate-product-detail-maker-skill.mjs`. Baseline characterization first: prove missing `<output_language>` and `<instruction_contract>`, and prove Korean-only references. Then add canonical contract tags to both SKILL files, preserve Korean user-facing commerce content, create concise English counterpart files for the seven `.ko.md` references, and update the product-detail validator to require the new bilingual counterparts while keeping its existing Korean-content regression checks. English counterparts must summarize/navigation-map the existing Korean files; do not translate away or replace Korean commerce reference content.
  Must NOT do: copy Sang-se protected assets, default to HTML, remove Figma MCP preference, remove actual image generation requirement, weaken Korean output default, or rewrite Korean reference content wholesale.

  Parallelization: Can parallel: YES | Wave 3 | Blocks: [8] | Blocked by: [1]

  References (executor has NO interview context - be exhaustive):
  - Current frontmatter: `skills/product-detail-maker/SKILL.md:1` - English canonical file metadata.
  - Current Korean-only support annotations: `skills/product-detail-maker/SKILL.md:12` - references point to `.ko.md` files.
  - Current routing: `skills/product-detail-maker/SKILL.md:28` - routing rule exists.
  - Current execution contract: `skills/product-detail-maker/SKILL.md:47` - Figma default, Korean output, research, image generation, platform checks.
  - Current support order: `skills/product-detail-maker/SKILL.md:91` - support-file read order exists and must be preserved/updated.
  - Current workflow: `skills/product-detail-maker/SKILL.md:108` - product-detail phases.
  - Current deliverables: `skills/product-detail-maker/SKILL.md:125` - default deliverables to preserve.
  - Current validation: `skills/product-detail-maker/SKILL.md:140` - product-detail validation checks.
  - Korean mirror support order: `skills/product-detail-maker/SKILL.ko.md:89` - Korean support-file read order.
  - Product validator required files: `skills/product-detail-maker/scripts/validate-product-detail-maker-skill.mjs:7` - existing required file list.
  - Product validator Korean required files: `skills/product-detail-maker/scripts/validate-product-detail-maker-skill.mjs:20` - existing Korean required list.
  - Product validator no-Hangul rule: `skills/product-detail-maker/scripts/validate-product-detail-maker-skill.mjs:64` - update carefully if English counterparts are added.
  - Product validator image/Figma regressions: `skills/product-detail-maker/scripts/validate-product-detail-maker-skill.mjs:118`, `skills/product-detail-maker/scripts/validate-product-detail-maker-skill.mjs:148` - preserve regression checks.
  - Contract: `instructions/skill/SKILL_AUTHORING.md:44` - Korean user-facing output default with machine keys preserved.
  - Resource placement: `instructions/skill/references/resource-placement.md:141` - every support file needs a reason and discoverability.

  Files in scope:
  - `skills/product-detail-maker/SKILL.md`
  - `skills/product-detail-maker/SKILL.ko.md`
  - `skills/product-detail-maker/references/browser-link-research.md`
  - `skills/product-detail-maker/references/figma-mcp-output.md`
  - `skills/product-detail-maker/references/image-direction.md`
  - `skills/product-detail-maker/references/image-maker-integration.md`
  - `skills/product-detail-maker/references/research-findings.md`
  - `skills/product-detail-maker/references/sangse-style-benchmark.md`
  - `skills/product-detail-maker/references/section-templates.md`
  - `skills/product-detail-maker/scripts/validate-product-detail-maker-skill.mjs`

  Acceptance criteria (agent-executable only):
  - [ ] RED proof exists at `.omo/evidence/skills-instructions-refactor/task-7-product-red.txt`, captured before editing scoped files.
  - [ ] `bash -lc 'node -e '\''const fs=require("fs"); for (const p of ["skills/product-detail-maker/SKILL.md","skills/product-detail-maker/SKILL.ko.md"]) { const s=fs.readFileSync(p,"utf8"); const required=["<output_language>","</output_language>","<purpose>","</purpose>","<routing_rule>","</routing_rule>","<instruction_contract>","</instruction_contract>","<trigger_examples>","</trigger_examples>","<support_file_read_order>","</support_file_read_order>","<workflow>","</workflow>","<validation>","</validation>"]; const missing=required.filter(x=>!s.includes(x)); if(missing.length) { console.error(JSON.stringify({file:p,missing})); process.exit(1); } } console.log("product-detail-maker canonical tags ok");'\'' > .omo/evidence/skills-instructions-refactor/task-7-product-green.txt'` exits 0.
  - [ ] `bash -lc 'node -e '\''const fs=require("fs"); const refs=["browser-link-research","figma-mcp-output","image-direction","image-maker-integration","research-findings","sangse-style-benchmark","section-templates"]; for (const r of refs) { for (const suffix of [".md",".ko.md"]) { const p="skills/product-detail-maker/references/"+r+suffix; if(!fs.existsSync(p)) throw new Error("missing "+p); } } console.log("product-detail bilingual references ok");'\'' >> .omo/evidence/skills-instructions-refactor/task-7-product-green.txt'` exits 0.
  - [ ] `bash -lc 'node skills/product-detail-maker/scripts/validate-product-detail-maker-skill.mjs > .omo/evidence/skills-instructions-refactor/task-7-product-validator.txt 2>&1'` exits 0.
  - [ ] `bash -lc 'node --check skills/product-detail-maker/scripts/validate-product-detail-maker-skill.mjs >> .omo/evidence/skills-instructions-refactor/task-7-product-validator.txt 2>&1'` exits 0.
  - [ ] Cleanup receipt appended to `.omo/evidence/skills-instructions-refactor/task-7-cleanup.txt` with `git diff --name-only -- skills/product-detail-maker .omo/evidence/skills-instructions-refactor`.

  QA scenarios (MANDATORY - task incomplete without these):
  ```
  Scenario: RED before edit catches missing product contract and Korean-only references
    Tool:     bash
    Steps:    bash -lc 'mkdir -p .omo/evidence/skills-instructions-refactor; if node -e '\''const fs=require("fs"); const skill=fs.readFileSync("skills/product-detail-maker/SKILL.md","utf8"); const refs=["browser-link-research","figma-mcp-output","image-direction","image-maker-integration","research-findings","sangse-style-benchmark","section-templates"]; const missing=[]; for (const tag of ["<output_language>","<instruction_contract>"]) if(!skill.includes(tag)) missing.push(tag); for (const r of refs) if(!fs.existsSync("skills/product-detail-maker/references/"+r+".md")) missing.push(r+".md"); if(missing.length){console.error(JSON.stringify({missing})); process.exit(1)}'\'' > .omo/evidence/skills-instructions-refactor/task-7-product-red.txt 2>&1; then echo "FAIL unexpected pass"; exit 1; else echo "PASS expected red"; fi'
    Expected: command exits 0 and evidence records missing tags and seven English counterpart references.
    Evidence: .omo/evidence/skills-instructions-refactor/task-7-product-red.txt

  Scenario: GREEN confirms Korean commerce surface and validator regression
    Tool:     bash
    Steps:    bash -lc 'node skills/product-detail-maker/scripts/validate-product-detail-maker-skill.mjs > .omo/evidence/skills-instructions-refactor/task-7-product-validator.txt 2>&1 && node -e '\''const fs=require("fs"); const s=fs.readFileSync("skills/product-detail-maker/SKILL.md","utf8"); const required=["<output_language>","<instruction_contract>","Figma MCP-ready","Korean product information notice","skills/image-maker/SKILL.md","actual raster asset generation or editing"]; const missing=required.filter(x=>!s.includes(x)); if(missing.length){console.error(missing); process.exit(1)} console.log("PASS product-detail-maker");'\'' >> .omo/evidence/skills-instructions-refactor/task-7-product-validator.txt'
    Expected: command exits 0, product-detail validator passes, and evidence contains `PASS product-detail-maker`.
    Evidence: .omo/evidence/skills-instructions-refactor/task-7-product-validator.txt
  ```

  Commit: NO | Message: `refactor(product-detail-maker): normalize bilingual commerce skill contract` | Files: [`skills/product-detail-maker/SKILL.md`, `skills/product-detail-maker/SKILL.ko.md`, `skills/product-detail-maker/references/browser-link-research.md`, `skills/product-detail-maker/references/figma-mcp-output.md`, `skills/product-detail-maker/references/image-direction.md`, `skills/product-detail-maker/references/image-maker-integration.md`, `skills/product-detail-maker/references/research-findings.md`, `skills/product-detail-maker/references/sangse-style-benchmark.md`, `skills/product-detail-maker/references/section-templates.md`, `skills/product-detail-maker/scripts/validate-product-detail-maker-skill.mjs`, `.omo/evidence/skills-instructions-refactor/task-7-*`]

- [x] 8. 통합 GREEN evidence, scope boundary, regression, cleanup receipt 만들기

  What to do: Subagent `integration-qa` runs after all skill implementation tasks. It does not edit `skills/` except to fix issues found by Tasks 1-7 owners through their scoped files; if a scoped fix is needed, return it to the owning subagent and rerun this task. Capture final validator GREEN, script syntax, product-detail validator, scope-boundary report, adversarial class report, line-budget report, bilingual pair report, and cleanup receipt.
  Must NOT do: silently patch unrelated files, remove tests/validator checks to pass, commit, stage files, or claim complete without all evidence paths.

  Parallelization: Can parallel: NO | Wave 4 | Blocks: [F1, F2, F3, F4, F5] | Blocked by: [2, 3, 4, 5, 6, 7]

  References (executor has NO interview context - be exhaustive):
  - Final C001: `.omo/ulw-loop/019f1ef1-a778-7050-8fda-4740917f5eb6/goals.json:17` - validator green requirement.
  - Final C002: `.omo/ulw-loop/019f1ef1-a778-7050-8fda-4740917f5eb6/goals.json:26` - scope-boundary and adversarial report.
  - Final C003: `.omo/ulw-loop/019f1ef1-a778-7050-8fda-4740917f5eb6/goals.json:35` - product-detail validator and script syntax regression.
  - Harness: `instructions/harness-engineering/HARNESS_ENGINEERING.md:107` - parallel/subagent trace rules require bounded spawn, ownership, evidence, parent verification.
  - Parallel workflow: `instructions/context-engineering/references/parallel-workflows.md:97` - integration checklist.
  - Completion gate: `instructions/skill/references/validation.md:187` - not complete if trigger boundary, support links, side-effect gate, validation result, or eval breadth fails.

  Acceptance criteria (agent-executable only):
  - [ ] `bash -lc 'mkdir -p .omo/evidence/skills-instructions-refactor; node skills/validate-skills.mjs --json > .omo/evidence/skills-instructions-refactor/validation-green.stdout 2> .omo/evidence/skills-instructions-refactor/validation-green.stderr'` exits 0.
  - [ ] `bash -lc 'node -e '\''const fs=require("fs"); const p=".omo/evidence/skills-instructions-refactor/validation-green.json"; const j=JSON.parse(fs.readFileSync(p,"utf8")); if(j.success!==true) throw new Error("success not true"); const counts=[j.canonicalContract?.missingTags?.length||0,j.supportLinks?.missing?.length||0,j.bilingualPairs?.errors?.length||0,j.lineBudgets?.violations?.length||0]; if(counts.some(Boolean)) throw new Error("nonzero validator counts "+counts.join(",")); console.log("validation green counts zero");'\'' > .omo/evidence/skills-instructions-refactor/task-8-validation-green-check.txt'` exits 0.
  - [ ] `bash -lc '{ echo "$ node skills/product-detail-maker/scripts/validate-product-detail-maker-skill.mjs"; node skills/product-detail-maker/scripts/validate-product-detail-maker-skill.mjs; echo "$ find skills -name '\''*.mjs'\'' -type f -print0 | xargs -0 -n1 node --check"; find skills -name '\''*.mjs'\'' -type f -print0 | xargs -0 -n1 node --check; } > .omo/evidence/skills-instructions-refactor/regression-product-detail-and-scripts.txt 2>&1'` exits 0.
  - [ ] `bash -lc '{ echo "$ git diff --name-only"; git diff --name-only; echo "$ git status --short"; git status --short; node -e '\''const {execSync}=require("child_process"); const out=execSync("git status --short",{encoding:"utf8"}).trim().split(/\n/).filter(Boolean).map(l=>l.slice(3).replace(/^"|"$/g,"")); const bad=out.filter(p=>!(p.startsWith("skills/")||p.startsWith(".omo/"))); if(bad.length){console.error("out-of-scope paths: "+bad.join(",")); process.exit(1)} console.log("scope ok");'\''; } > .omo/evidence/skills-instructions-refactor/scope-boundary.txt 2>&1'` exits 0.
  - [ ] `bash -lc 'node -e '\''const fs=require("fs"); const p=".omo/evidence/skills-instructions-refactor/adversarial-classes.json"; const j=JSON.parse(fs.readFileSync(p,"utf8")); const classes=new Set((j.classes||[]).map(c=>c.id+":"+c.status)); for (const need of ["prompt-injection-source-boundary:covered","dirty-worktree-scope:covered"]) if(!classes.has(need)) throw new Error("missing "+need); console.log("adversarial classes ok");'\'' > .omo/evidence/skills-instructions-refactor/task-8-adversarial-check.txt'` exits 0.
  - [ ] `bash -lc '{ echo "cleanup_receipt"; date -u; echo "$ pgrep -fl node"; pgrep -fl node || true; echo "$ git diff --name-only"; git diff --name-only; } > .omo/evidence/skills-instructions-refactor/task-8-cleanup-receipt.txt'` exits 0.

  QA scenarios (MANDATORY - task incomplete without these):
  ```
  Scenario: final happy path validator GREEN
    Tool:     bash
    Steps:    bash -lc 'mkdir -p .omo/evidence/skills-instructions-refactor; node skills/validate-skills.mjs --json > .omo/evidence/skills-instructions-refactor/validation-green.stdout 2> .omo/evidence/skills-instructions-refactor/validation-green.stderr && node -e '\''const fs=require("fs"); const j=JSON.parse(fs.readFileSync(".omo/evidence/skills-instructions-refactor/validation-green.json","utf8")); if(j.success!==true) process.exit(1); console.log("PASS validation green");'\'' >> .omo/evidence/skills-instructions-refactor/validation-green.stdout'
    Expected: command exits 0, `validation-green.json` exists, and stdout contains `PASS validation green`.
    Evidence: .omo/evidence/skills-instructions-refactor/validation-green.json

  Scenario: scope/adversarial edge case stays bounded
    Tool:     bash
    Steps:    bash -lc '{ echo "$ git diff --name-only"; git diff --name-only; echo "$ git status --short"; git status --short; node -e '\''const {execSync}=require("child_process"); const out=execSync("git status --short",{encoding:"utf8"}).trim().split(/\n/).filter(Boolean).map(l=>l.slice(3)); const bad=out.filter(p=>!(p.startsWith("skills/")||p.startsWith(".omo/"))); if(bad.length){console.error(bad.join("\n")); process.exit(1)} console.log("PASS scope bounded");'\''; } > .omo/evidence/skills-instructions-refactor/scope-boundary.txt 2>&1'
    Expected: command exits 0 and evidence contains `PASS scope bounded`; no changed path outside `skills/` or `.omo/`.
    Evidence: .omo/evidence/skills-instructions-refactor/scope-boundary.txt
  ```

  Commit: NO | Message: `test(skills): capture refactor validation evidence` | Files: [`.omo/evidence/skills-instructions-refactor/validation-green.json`, `.omo/evidence/skills-instructions-refactor/scope-boundary.txt`, `.omo/evidence/skills-instructions-refactor/adversarial-classes.json`, `.omo/evidence/skills-instructions-refactor/regression-product-detail-and-scripts.txt`, `.omo/evidence/skills-instructions-refactor/task-8-*`]

## Final verification wave (MANDATORY - after all implementation tasks)
> Runs in PARALLEL. ALL must APPROVE. Surface results to the caller and wait for an explicit "okay" before declaring complete.
- [ ] F1. Plan compliance audit - verify tasks 1-8 are checked only after evidence exists; compare each acceptance criterion against `.omo/evidence/skills-instructions-refactor/`; command: `bash -lc 'node -e '\''const fs=require("fs"); const required=["validation-green.json","scope-boundary.txt","adversarial-classes.json","regression-product-detail-and-scripts.txt","task-1-validator-red.stdout","task-2-genius-green.txt","task-3-elon-green.txt","task-4-startup-green.txt","task-5-image-green.txt","task-6-logo-green.txt","task-7-product-validator.txt","task-8-cleanup-receipt.txt"]; const missing=required.filter(f=>!fs.existsSync(".omo/evidence/skills-instructions-refactor/"+f)); if(missing.length){console.error(missing); process.exit(1)} console.log("F1 APPROVE");'\'' > .omo/evidence/skills-instructions-refactor/f1-plan-compliance.txt'`.
- [ ] F2. Code quality review - inspect validator/scripts and instruction diffs for idioms, no dead checks, no suppressed failures; command: `bash -lc '{ echo "$ node --check skills/validate-skills.mjs"; node --check skills/validate-skills.mjs; echo "$ git diff -- skills/validate-skills.mjs skills/product-detail-maker/scripts/validate-product-detail-maker-skill.mjs"; git diff -- skills/validate-skills.mjs skills/product-detail-maker/scripts/validate-product-detail-maker-skill.mjs; echo "F2 APPROVE"; } > .omo/evidence/skills-instructions-refactor/f2-code-quality.txt 2>&1'`.
- [ ] F3. Real manual QA / data-surface QA - rerun final CLI surfaces exactly, not inferred from task notes; command: `bash -lc '{ node skills/validate-skills.mjs --json; node skills/product-detail-maker/scripts/validate-product-detail-maker-skill.mjs; find skills -name '\''*.mjs'\'' -type f -print0 | xargs -0 -n1 node --check; echo "F3 APPROVE"; } > .omo/evidence/skills-instructions-refactor/f3-real-data-surface-qa.txt 2>&1'`.
- [ ] F4. Scope fidelity - verify Must-Have shipped and Must-NOT-Have avoided; command: `bash -lc '{ git diff --name-only; git status --short; node -e '\''const {execSync}=require("child_process"); const out=execSync("git status --short",{encoding:"utf8"}).trim().split(/\n/).filter(Boolean).map(l=>l.slice(3)); const bad=out.filter(p=>!(p.startsWith("skills/")||p.startsWith(".omo/"))); if(bad.length){console.error("out of scope: "+bad.join(",")); process.exit(1)} console.log("F4 APPROVE");'\''; } > .omo/evidence/skills-instructions-refactor/f4-scope-fidelity.txt 2>&1'`.
- [ ] F5. ULW evidence recording/checkpoint preparation - prepare but do not commit or mutate global state; command: `bash -lc '{ echo "goal=G001-refactor-the-local-skills-folder-acc"; echo "criteria=C001,C002,C003"; echo "evidence_dir=.omo/evidence/skills-instructions-refactor"; ls -1 .omo/evidence/skills-instructions-refactor | sort; echo "F5 APPROVE"; } > .omo/evidence/skills-instructions-refactor/f5-ulw-checkpoint-prep.txt'`.

## Commit strategy
- No auto-commit rule: this session requested a plan and did not separately request commits. Do not run `git add`, `git commit`, `git push`, or publish commands during execution.
- Each task includes a draft Conventional Commit message only for a later user-approved commit.
- If the user later asks to commit, use one logical commit after all final verification tasks pass: `refactor(skills): normalize local skill instruction contracts`.
- Atomic commit body must mention validator RED/GREEN evidence, product-detail regression evidence, and scope-boundary evidence.
- Final commit footer, if a commit is later requested: `Plan: .omo/plans/skills-instructions-refactor.md`.

## Success criteria
- All Must-Have items are implemented and all Must-NOT-Have guardrails remain true.
- `node skills/validate-skills.mjs --json` exits 0 and writes `.omo/evidence/skills-instructions-refactor/validation-green.json` with `success=true` and zero failures for canonical tags, support links, bilingual pairs, and line budgets.
- `git diff --name-only` plus `git status --short` show only `skills/` and `.omo/` paths.
- `.omo/evidence/skills-instructions-refactor/adversarial-classes.json` covers prompt-injection/source-boundary and dirty-worktree classifications.
- `node skills/product-detail-maker/scripts/validate-product-detail-maker-skill.mjs` exits 0.
- `find skills -name '*.mjs' -type f -print0 | xargs -0 -n1 node --check` exits 0.
- Every task has RED proof, GREEN proof, exact evidence path, adversarial/data-surface coverage where applicable, and cleanup receipt.
- F1-F5 all write `APPROVE` evidence and the caller receives the results before any complete declaration.
- No commit exists unless the user separately asks for one.
