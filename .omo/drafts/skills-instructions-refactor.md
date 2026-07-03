---
slug: skills-instructions-refactor
status: awaiting-approval
intent: unclear
pending-action: write .omo/plans/skills-instructions-refactor.md
approach: Normalize all local skill folders against the repo instruction contract while preserving each skill's domain logic, outputs, and existing support files.
---

# Draft: skills-instructions-refactor

## Components (topology ledger)
<!-- Lock the SHAPE before depth. One row per top-level component that can succeed or fail independently. -->
<!-- id | outcome (one line) | status: active|deferred | evidence path -->
| id | outcome | status | evidence path |
| --- | --- | --- | --- |
| skill-contracts | Every canonical `skills/*/SKILL.md` exposes output language, routing, instruction contract, support loading, workflow, validation, and stop condition. | active | `skills/*/SKILL.md` |
| trigger-boundaries | Neighboring skills route cleanly without overlap: ideation, first-principles, validation, image, logo, product-detail. | active | `skills/*/SKILL.md` trigger sections |
| support-files | Rules/references/scripts remain directly discoverable from each `SKILL.md`; no deep reference chain is introduced. | active | `skills/*/{rules,references,scripts}/` |
| bilingual-mirrors | English/Korean Markdown pairing remains intact or explicit exceptions are removed. | active | `skills/**/*.md` |
| validation-harness | A deterministic structural check proves the before/after contract state and script syntax. | active | `.omo/evidence/` plus existing `skills/*/scripts/` |

## Open assumptions (announced defaults)
<!-- Intent is UNCLEAR: research resolves ambiguity, defaults are adopted (not asked), and each is surfaced in the plan's human TL;DR for veto. -->
<!-- assumption | adopted default | rationale | reversible? -->
| assumption | adopted default | rationale | reversible? |
| --- | --- | --- | --- |
| "skills 폴더 싹 수정" scope | Refactor all six local skill folders, not global skill/config folders. | Project AGENTS limits work to this repository and the request points at local `skills/`. | Yes |
| Rewrite depth | Preserve existing skill logic and output contracts; normalize missing contract/routing/validation structure instead of replacing content wholesale. | Existing skills already contain useful domain-specific rules and scripts. | Yes |
| Language policy | Keep canonical English files and Korean mirrors aligned; add missing English counterparts for Korean-only product-detail references if the implementation touches that cluster. | Local instructions require bilingual/mirror cleanup when refactoring skills. | Yes |
| Test strategy | Use tests-after with a failing structural precheck captured as RED evidence, then rerun after edits as GREEN evidence. | Current task is instruction/skill refactor rather than executable product behavior. | Yes |
| Automation | Add or extend a small local validator only if it reduces manual checking of contract tags, bilingual pairs, support links, and script syntax. | The repo currently has one product-detail validator but no all-skills structural check. | Yes |

## Findings (cited - path:lines)
- The local instruction index says prompt/skill work must separate `scope`, `authority`, `required/forbidden`, and `verification`, and keep root docs short with deeper references split out (`instructions/README.md:21`, `instructions/README.md:25`, `instructions/README.md:44`).
- Skill authoring rules define skills as folder-shaped execution contracts and require intent, scope, authority, evidence, output, verification, and stop condition before persona or style (`instructions/skill/SKILL_AUTHORING.md:7`, `instructions/skill/SKILL_AUTHORING.md:38`).
- The minimum skill contract explicitly includes `<output_language>` and the checklist requires `instruction_contract` with intent/scope/authority/evidence/tools/loop/output/verification/stop condition (`instructions/skill/SKILL_AUTHORING.md:61`, `instructions/skill/SKILL_AUTHORING.md:74`, `instructions/skill/SKILL_AUTHORING.md:184`).
- Progressive disclosure says `SKILL.md` should keep trigger/scope, authority/evidence, loop/stop summary, validation, and direct support-file references; core files should stay near 300 lines and support files should be directly referenced (`instructions/skill/references/progressive-disclosure.md:13`, `instructions/skill/references/progressive-disclosure.md:60`, `instructions/skill/references/progressive-disclosure.md:63`).
- Trigger validation requires positive/negative/boundary cases and route boundaries for similar skills (`instructions/skill/references/trigger-design.md:28`, `instructions/skill/references/trigger-design.md:31`, `instructions/skill/references/trigger-design.md:92`, `instructions/skill/references/trigger-design.md:100`).
- Resource placement says repeated policy belongs in `rules/`, detailed knowledge in `references/`, deterministic helpers in `scripts/`, and support files must be discoverable from `SKILL.md` (`instructions/skill/references/resource-placement.md:10`, `instructions/skill/references/resource-placement.md:25`, `instructions/skill/references/resource-placement.md:35`, `instructions/skill/references/resource-placement.md:142`).
- Validation guidance requires purpose/scope/authority/output/verification discoverability, stop conditions, and prompt-injection/source safety cases for skill/instruction changes (`instructions/skill/references/validation.md:49`, `instructions/skill/references/validation.md:110`, `instructions/skill/references/validation.md:159`).
- Harness guidance treats instruction changes as eval work with trace/regression gates and says every instruction change needs fast smoke eval coverage (`instructions/harness-engineering/HARNESS_ENGINEERING.md:7`, `instructions/harness-engineering/HARNESS_ENGINEERING.md:128`).
- Current diagnostics found six skill folders and 69 Markdown files. All canonical `SKILL.md` files currently lack `<output_language>` and `<instruction_contract>`. `genius-thinking` also lacks the canonical routing/validation tags.
- Current bilingual diagnostics found no missing Korean mirrors for English Markdown, but seven Korean-only product-detail references have no English counterpart.
- Existing script checks passed with `node --check` for `image-maker`, `logo-maker`, and `product-detail-maker`; the product-detail validator also passed and reported 20 research URLs.

## Decisions (with rationale)
- Treat this as a structural skill-refactor plan, not a content replacement plan. Rationale: the current skills already encode domain-specific workflows, outputs, and helper scripts that should be preserved.
- Normalize canonical `SKILL.md` files around a shared contract vocabulary: `<output_language>`, `<purpose>`, `<routing_rule>`, `<instruction_contract>`, trigger examples, support-file read order, workflow, validation, and stop condition.
- Keep each skill's domain boundary explicit:
  - `genius-thinking`: differentiated ideation and prioritization only.
  - `elon-musk`: first-principles assumption teardown and breakthrough strategy only.
  - `startup-validator`: evidence ladder, scoring, PMF/go-no-go validation only.
  - `image-maker`: raster image generation/editing and archive/preview only.
  - `logo-maker`: transparent PNG logo/mark generation and preview only.
  - `product-detail-maker`: Korean commerce detail-page strategy, Figma-ready structure, image direction, and marketplace constraints only.
- Use local evidence and deterministic validation before claiming completion. The implementation should create RED evidence from the current missing contract state and GREEN evidence after the edits.
- Defer any global skill/config changes. They are outside this repository's AGENTS scope and outside the user's local `skills/` target.

## Scope IN
- Refactor all local folders under `skills/`: `elon-musk`, `genius-thinking`, `image-maker`, `logo-maker`, `product-detail-maker`, `startup-validator`.
- Update canonical `SKILL.md` files and Korean mirrors where materially changed.
- Update local `rules/` and `references/` only where needed to keep the contract lean, directly linked, and non-duplicative.
- Add missing English counterpart references for product-detail Korean-only docs if that cluster is edited in the implementation plan.
- Add or extend a local validation script if it materially improves repeatable checking.
- Produce `.omo/evidence/` outputs for structural RED/GREEN, script syntax, product-detail validator, and support-link/bilingual checks.

## Scope OUT (Must NOT have)
- No changes to `~/.agents`, `~/.codex`, global skills, or other home-directory configuration.
- No wholesale rewrite that discards existing domain workflows, archive paths, scripts, or output artifacts.
- No new runtime dependencies unless the execution plan explicitly proves they are necessary.
- No production, network, deploy, Git push, or external publishing side effects.
- No editing product app code outside `instructions/`, `skills/`, and `.omo/` planning/evidence artifacts for this task.

## Open questions
- Approval needed: write the detailed `.omo/plans/skills-instructions-refactor.md` work plan from this draft.
- After the plan is approved, execution still needs an explicit start/approval because `ulw-plan` is planner-only.

## Approval gate
status: awaiting-approval
<!-- When exploration is exhausted and unknowns are answered, set status: awaiting-approval. -->
<!-- That durable record is the loop guard: on a later turn read it and resume at the gate instead of re-running exploration. -->
