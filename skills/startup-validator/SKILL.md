---
name: startup-validator
description: "[Hyper] Validate startup and product ideas with an evidence ladder, confidence-adjusted scoring, customer-discovery discipline, and a concrete next validation sprint. Saves structured multi-file analysis under .hypercore/startup-validator/[topic-slug]/. Use when the job is startup validation, PMF/demand assessment, pivot/go/no-go judgment, or investor-readiness risk review—not ideation, implementation planning, or first-principles redesign."
---

@rules/evidence-and-scoring.md
@rules/customer-discovery.md
@rules/validation-experiments.md
@rules/verdict-and-reporting.md
@references/frameworks.md
@references/flow-schema.md

# Startup Validator

> Reduce startup risk with evidence, not optimism. Score the idea, grade confidence separately, and end with the cheapest next learning step.

<purpose>

- Evaluate startup or product ideas with explicit evidence quality, uncertainty, and framework-backed scoring.
- Separate raw attractiveness from confidence so weak evidence cannot produce a high-confidence Go.
- Convert the biggest unknowns into customer-discovery questions, demand experiments, and kill criteria.
- Save a reusable multi-file validation report that can be resumed later.

</purpose>

<output_language>

Respond in the user's language. Use English for file names, JSON keys, evidence levels, score labels, and framework names unless the user explicitly asks otherwise.

</output_language>

<routing_rule>

Use this skill when:

- validating a new startup, product, feature wedge, or market entry idea
- deciding whether to proceed, narrow, pivot, stop, or run another validation sprint
- preparing for customer discovery, paid pilots, design partners, or fundraising conversations
- checking whether traction signals actually indicate PMF or only curiosity

Do not use this skill when:

- the main job is generating many new ideas
- the request is technical implementation planning or code work
- the user wants first-principles redesign rather than validation scoring
- the user only wants market research with no go/no-go, pivot, or validation decision

Boundary routing:

- Use `genius-thinking` for broad ideation without a concrete idea to evaluate.
- Use `elon-musk` for assumption teardown and first-principles redesign.
- Use `research` for source-backed market or trend research without a startup verdict.
- Use `plan` when the idea is already validated and the user wants implementation planning.

</routing_rule>

<trigger_examples>

Positive triggers:

```bash
/startup-validator B2B purchasing automation for mid-market finance teams
/startup-validator 이 아이디어가 진짜 고객 돈을 받을 수 있는지 검증해줘
/startup-validator PMF인지 아닌지 evidence 기준으로 평가해줘
```

Negative triggers:

```bash
새 스타트업 아이디어 50개 뽑아줘
이 기능 구현 계획 짜줘
```

Boundary trigger:

```bash
제1원칙으로 사업모델을 완전히 다시 설계해줘
# Route to elon-musk unless the user asks for validation scoring or go/no-go judgment.
```

</trigger_examples>

<support_file_read_order>

Read support files only as needed, in this order:

1. [rules/evidence-and-scoring.md](rules/evidence-and-scoring.md) before inventorying evidence, assigning E0-E7 levels, or adjusting confidence.
2. [references/frameworks.md](references/frameworks.md) before scoring venture-scale potential, PMF forces, or go/no-go tradeoffs.
3. [rules/customer-discovery.md](rules/customer-discovery.md) before writing interview questions, discovery quality gates, or customer signal caveats.
4. [rules/validation-experiments.md](rules/validation-experiments.md) before designing the next validation sprint, metrics, and experiment sequence.
5. [rules/verdict-and-reporting.md](rules/verdict-and-reporting.md) before producing the verdict, kill criteria, and "what would change my mind" section.
6. [references/flow-schema.md](references/flow-schema.md) before creating or updating `flow.json`.

</support_file_read_order>

<input_check>

If the startup idea is missing, ask exactly one question:

`Which startup or product idea should we validate?`

If founder, market, customer, or traction evidence is missing, continue with explicit assumptions and low confidence instead of inventing certainty.

</input_check>

<instruction_contract>

- Intent: validate a concrete startup, product, wedge, or market-entry idea and produce an evidence-weighted decision.
- Scope: assess problem, customer, value, distribution, monetization, defensibility, PMF readiness, and next validation steps; do not ideate from a blank page, redesign from first principles, perform market research only, or plan implementation.
- Authority: treat user-provided facts and saved `.hypercore/startup-validator/[topic-slug]/` files as working inputs, but grade every claim by evidence quality before using it in a verdict.
- Evidence: classify signals on the E0-E7 ladder, name the source or assumption behind each score change, and keep raw attractiveness separate from confidence.
- Tools: read and write only the startup-validator output folder for the current topic unless the user requests otherwise; use support files for scoring, discovery, experiments, verdicts, and flow state.
- Loop: frame the idea, inventory evidence, score frameworks, assess PMF forces, apply confidence gates, design the next sprint, and update `flow.json` after each phase.
- Output: save `flow.json`, `thesis.md`, `thiel-scores.md`, `pmf-forces.md`, and `verdict.md` under `.hypercore/startup-validator/[topic-slug]/`.
- Verification: run the validation checklist, confirm weak evidence cannot produce a high-confidence Go, and ensure the verdict includes success metrics, kill criteria, and what would change the decision.
- Stop condition: finish when all output files exist, `flow.json` is `completed`, and the user has a concrete Go / Validate First / Narrow / Pivot / Stop decision with the next 7-day validation sprint.

</instruction_contract>

<owned_job>

For each run:

1. Frame the idea, customer, stage, current alternative, and desired decision.
2. Extract the riskiest hypotheses: problem, customer, value, distribution, monetization, defensibility.
3. Inventory evidence and tag each signal with the E0-E7 evidence ladder in [rules/evidence-and-scoring.md](rules/evidence-and-scoring.md).
4. Score the idea with the framework set in [references/frameworks.md](references/frameworks.md), keeping raw score and evidence confidence separate.
5. Apply customer-discovery quality gates from [rules/customer-discovery.md](rules/customer-discovery.md).
6. Design the next validation sprint using [rules/validation-experiments.md](rules/validation-experiments.md).
7. Produce a confidence-adjusted verdict with [rules/verdict-and-reporting.md](rules/verdict-and-reporting.md).
8. Run the validation checklist before marking `flow.json` complete.

</owned_job>

<document_shape>

## Output Structure

```text
.hypercore/startup-validator/[topic-slug]/
├── flow.json           # phase tracking, evidence confidence, next sprint state
├── thesis.md           # idea framing, ICP/persona, hypotheses, evidence inventory
├── thiel-scores.md     # venture-scale 7Q scoring with confidence and caveats
├── pmf-forces.md       # PMF stage, JTBD forces, VPC fit, customer pull signals
└── verdict.md          # raw score, confidence-adjusted verdict, sprint, kill criteria
```

- Use ASCII kebab-case for `[topic-slug]`.
- If the folder exists, read existing files and resume from the last incomplete phase.
- Keep the four output files for compatibility; place richer sections inside the existing files instead of adding new top-level outputs.

</document_shape>

<flow_tracking>

Write `flow.json` at the start and update it as each phase completes. See [references/flow-schema.md](references/flow-schema.md).

| Phase | Output file | Completion signal |
|---|---|---|
| `frame` | `thesis.md` | target customer, current alternative, hypotheses, and evidence inventory exist |
| `score` | `thiel-scores.md` | 7Q raw scores include confidence and score-change evidence |
| `pmf` | `pmf-forces.md` | JTBD/PMF forces and customer-pull signals are assessed |
| `verdict` | `verdict.md` | verdict, next 7-day sprint, and kill criteria are explicit |

</flow_tracking>

<workflow>

| Phase | Task | Output file |
|---|---|---|
| 1 | Frame idea, ICP/persona, stage, current alternative, and riskiest hypotheses | `thesis.md` |
| 2 | Score venture-scale potential and strategic risk with evidence confidence | `thiel-scores.md` |
| 3 | Evaluate customer pull, switching forces, VPC fit, and PMF stage | `pmf-forces.md` |
| 4 | Apply confidence gates, choose verdict, define sprint and kill criteria | `verdict.md` |

Scoring rule:

- Raw score estimates attractiveness; confidence estimates evidence quality.
- E0-E2 evidence cannot produce high-confidence Go.
- PMF claims require qualified user behavior, not founder intuition or AI-generated personas.
- Missing evidence should lower confidence, not be filled with optimistic assumptions.

</workflow>

<output_contract>

Each output file must include:

- `thesis.md`: one-line thesis, target customer/ICP, buyer/user split when relevant, current alternative, value/growth/monetization hypotheses, top 5 riskiest assumptions, evidence inventory with E-levels
- `thiel-scores.md`: Engineering, Timing, Monopoly, People, Distribution, Durability, Secret scores; evidence confidence for each; score-change evidence; venture-scale caveats
- `pmf-forces.md`: JTBD story, Push/Pull/Habit/Anxiety, jobs/pains/gains fit, PMF stage, Sean Ellis/Superhuman readiness when active users exist, B2B/marketplace/deeptech caveats when relevant
- `verdict.md`: Go / Validate First / Narrow / Pivot / Stop, raw score, confidence-adjusted verdict, highest evidence level, critical weaknesses, next 7-day validation sprint, kill criteria, and “what would change my mind”

</output_contract>

<validation>

Before finishing, verify:

- evidence quality is separated from opinion, enthusiasm, and AI-generated simulation
- raw score and confidence-adjusted verdict are both visible
- weak evidence cannot produce a high-confidence Go
- the score ties back to named frameworks and named evidence
- customer discovery questions avoid compliments, hypotheticals, and solution-first pitching
- the output includes concrete next validation actions, success metrics, and kill criteria
- all output files are saved under `.hypercore/startup-validator/[topic-slug]/`
- `flow.json` status is set to `completed`

</validation>
