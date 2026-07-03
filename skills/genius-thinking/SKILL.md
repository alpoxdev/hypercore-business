---
name: genius-thinking
description: "[Hyper] Generate and prioritize differentiated ideas for stuck product, strategy, or innovation problems when ordinary brainstorming is too shallow. Saves structured multi-file analysis under .hypercore/genius-thinking/[topic-slug]/ with phase tracking."
---

@rules/execution-rules.md
@rules/output-discipline.md
@references/formula-guide.md
@references/output-template.md
@references/flow-schema.md

# Genius Thinking Skill

> Combine a small number of validated innovation frameworks to generate diverse options and rank them with explicit reasoning. Organize results as a multi-file folder for future reference.

<output_language>
Default to the user's requested language. If no language is specified, write user-facing outputs in English while preserving machine-readable filenames, JSON keys, phase names, and paths exactly as documented.
</output_language>

<purpose>
Generate and prioritize differentiated ideas for stuck product, strategy, or innovation problems when ordinary brainstorming would produce shallow or interchangeable options.
</purpose>

<routing_rule>
Use this skill when the user needs broad, differentiated ideation plus prioritization for a product, strategy, market, or innovation challenge. Do not use it for simple summarization, random idea lists without ranking, final decision review among already-strong options, or implementation planning after the idea has already been chosen.
</routing_rule>

<instruction_contract>
| Field | Contract |
|---|---|
| Intent | Turn a stuck or generic opportunity into a diverse, ranked set of ideas. |
| Scope | Reframe the challenge, select 2-3 fitting innovation frameworks, generate 10+ ideas, and prioritize the strongest options. |
| Authority | Create or update only the run folder under `.hypercore/genius-thinking/[topic-slug]/`; do not modify unrelated project files. |
| Evidence | Separate observed evidence, user-provided facts, and inference in the analysis and prioritization. |
| Tools | Read the required support files in the order below; use parallel ideation only when it materially improves diversity. |
| Loop | Track phase progress in `flow.json`, resume from the last incomplete phase, and do not restart completed phases. |
| Output | Save `frameworks.md`, `analysis.md`, `ideas.md`, `priorities.md`, and completed `flow.json` under `.hypercore/genius-thinking/[topic-slug]/`. |
| Verification | Check framework fit, idea diversity, non-duplication, evidence-backed ranking, and next cheap tests before finishing. |
| Stop condition | Stop when all output files exist, `flow.json` is completed, and the prioritized idea set is ready for user review. |
</instruction_contract>

<trigger_examples>

| Type | Example | Expected routing |
|---|---|---|
| Positive | `Generate differentiated AI education ideas for working professionals.` | Trigger this skill. |
| Positive | `Rethink customer acquisition for a startup that keeps repeating generic SaaS tactics.` | Trigger this skill. |
| Positive | `Find bold product directions for a healthcare app that looks interchangeable with competitors.` | Trigger this skill. |
| Negative | `Summarize these existing product ideas without adding new ones.` | Do not trigger; summarize instead. |
| Negative | `Give me ten random ideas with no prioritization or rationale.` | Do not trigger unless prioritization and reasoning are accepted. |
| Boundary | `We already have three strong options and only need a final decision.` | Use decision review unless the real problem is weak idea generation or reframing. |

</trigger_examples>

<support_file_read_order>

1. Read `rules/execution-rules.md` before creating or updating the run folder so side effects stay limited to the documented output path.
2. Read `rules/output-discipline.md` before drafting outputs so the report remains concrete, structured, and evidence-aware.
3. Read `references/formula-guide.md` when selecting frameworks and checking idea diversity.
4. Read `references/output-template.md` before writing `frameworks.md`, `analysis.md`, `ideas.md`, or `priorities.md`.
5. Read `references/flow-schema.md` before creating, updating, or resuming from `flow.json`.

</support_file_read_order>

<workflow>

## Required inputs

Collect or infer:

- the problem or opportunity statement
- the target user or market
- the decision or output needed
- meaningful constraints such as budget, team, timing, or regulation

## Core job

1. Restate the problem.
2. Choose 2-3 frameworks with a brief selection rationale.
3. Reframe the opportunity before ideation.
4. Generate 10+ ideas with real diversity, not cosmetic variations.
5. Rank the best options with evidence-backed prioritization.

## Framework choice

Use only the frameworks that fit the task. Common pairings and diversity checks live in [references/formula-guide.md](references/formula-guide.md).

<document_shape>

## Output Structure

```text
.hypercore/genius-thinking/[topic-slug]/
├── flow.json           # phase tracking
├── frameworks.md       # selected formulas + rationale + HMW reframing
├── analysis.md         # deep analysis (SCAMPER, TRIZ, JTBD application)
├── ideas.md            # 10+ ideas with evaluations (title, description, score)
└── priorities.md       # ERRC validation + ranking + next steps
```

- Use ASCII kebab-case for `[topic-slug]` (e.g., `ai-education-service`).
- Each phase produces its own file for organized reference.
- `flow.json` tracks progress through phases. See `references/flow-schema.md` for the schema.
- If the folder exists from a prior run, read existing files before updating.

</document_shape>

<flow_tracking>

## Flow Tracking

Write `flow.json` at the start and update as each phase completes.

### Phase progression

| Phase | Output file | Next |
|-------|-------------|------|
| `select` | `frameworks.md` — selected formulas + rationale + HMW reframing | `analyze` |
| `analyze` | `analysis.md` — deep framework application (1500+ chars) | `ideate` |
| `ideate` | `ideas.md` — 10+ ideas with evaluations | `prioritize` |
| `prioritize` | `priorities.md` — ERRC validation + ranking + next steps | done |

### Resume support

If `flow.json` already exists, read it and continue from the last incomplete phase. Do not restart completed phases.

</flow_tracking>

## Workflow

| Phase | Goal | Output file |
|------|------|-------------|
| 1 | Clarify the challenge | (inline) |
| 2 | Choose frameworks | `frameworks.md` |
| 3 | Deep analysis + reframe the opportunity | `analysis.md` |
| 4 | Generate 10+ ideas across distinct directions | `ideas.md` |
| 5 | Prioritize with ERRC validation | `priorities.md` |

Parallel ideation is optional. Use it only when it materially improves coverage.

## Output requirements

- include a selection rationale for the chosen frameworks
- show diversity across the idea set
- separate observed evidence from inference
- explain why the top ideas outrank the others

Use the full report and idea format in [references/output-template.md](references/output-template.md).

</workflow>

<validation>

- Do not force hard character quotas.
- Do not dump framework trivia that does not change the answer.
- Do not present near-duplicate ideas as separate wins.
- Do not prioritize ideas without naming the assumption and next cheap test.
- All output files must be saved under `.hypercore/genius-thinking/[topic-slug]/`.
- `flow.json` status must be set to `completed`.

</validation>
