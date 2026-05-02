---
name: elon-musk
description: "[Hyper] Apply Musk-style first-principles frameworks—not persona role-play—to break a problem into hard constraints, copied conventions, and unknowns; generate non-obvious breakthrough options; and save a sharp multi-file decision report under .hypercore/elon-musk/[topic-slug]/. Use when current answers feel copied from industry defaults or the user asks for first-principles, Musk-style, assumption-teardown, or breakthrough strategy thinking."
---

@rules/execution.md
@rules/idea-generation.md
@rules/report-synthesis.md
@rules/validation.md
@references/frameworks.md
@references/flow-schema.md

# Elon Musk

> Rebuild decisions from fundamentals, not from copied industry defaults. This skill applies public Musk-style thinking frameworks; it must not impersonate Elon Musk or treat him as an authority.

<purpose>

- Separate real constraints from conventions, defaults, and untested beliefs.
- Generate weird-but-plausible options by applying first-principles operators.
- Turn the analysis into a sharp, reusable decision report with phase tracking.

</purpose>

<run_contract>

- Intent: deconstruct a concrete decision from fundamentals and produce a decision-grade report.
- Scope: own `.hypercore/elon-musk/[topic-slug]/flow.json`, `research.md`, `assumptions.md`, `redesign.md`, and `execution.md`.
- Authority: user/project instructions outrank public Musk examples, competitors, and existing conventions.
- Evidence: use cited current facts when they affect the recommendation; otherwise label claims as assumptions or unknowns.
- Tools: use local files and lightweight research only when needed; do not require special runtimes, models, or parallel agents.
- Output: save the multi-file report and keep the thesis, bottleneck, metric, next test, and safety caveat visible.
- Verification: run the validation checklist in [rules/validation.md](rules/validation.md) before finishing.
- Stop condition: finish when all files exist, `flow.json` is `completed`, and unresolved unknowns have tests or source questions.

</run_contract>

<when_to_use>

Use this skill when:

- the available options all look like slight variations of the same default
- cost, go-to-market, product, operations, or strategy feels trapped by habit
- the user asks for first-principles analysis, Musk-style frameworks, assumption teardown, or a breakthrough report
- a problem needs a hard reset from fundamentals before normal planning

Do not use this skill when:

- the job is mostly factual research with no redesign or decision pressure
- the request is standard implementation planning or debugging
- the user needs startup readiness scoring rather than assumption teardown
- the user wants broad brainstorming without constraint analysis

Boundary routing:

- Use `startup-validator` when the main job is startup scoring, evidence grading, or readiness assessment.
- Use `genius-thinking` when the main job is open-ended idea generation without a concrete problem to deconstruct.
- Use `research` when the main job is source-backed fact-finding or trend comparison.

Positive examples:

```bash
/elon-musk 우리 SaaS 가격 전략이 경쟁사 복붙처럼 보여. 완전히 다시 생각해줘
/elon-musk first principles로 제조 원가를 뜯어보고 10배 낮출 방법을 찾아줘
/elon-musk 뻔하지 않은 시장 진입 리포트를 만들어줘. 기존 GTM 관행부터 의심해줘
```

Negative examples:

```bash
/research 이 뉴스 사실관계만 요약해줘
React hook 버그를 고쳐줘
```

Boundary example:

```bash
스타트업 점수 매겨줘
# Route to startup-validator unless the user explicitly asks to deconstruct assumptions first.
```

</when_to_use>

<input_check>

If the problem is missing, ask exactly one question:

`Which problem should we deconstruct from first principles?`

If the desired outcome is unclear but the problem is clear, proceed with a reasonable default: produce a decision report that identifies the best next experiment.

</input_check>

<core_guardrail>

This is a framework skill, not an impersonation skill.

- Say “applying Musk-style first-principles frameworks” rather than pretending to speak as Elon Musk.
- Challenge premises firmly but respectfully.
- Do not hero-worship, copy long external material, or treat any public figure’s view as proof.
- Speed and urgency must include human, legal, safety, trust, and quality guardrails.

</core_guardrail>

<owned_job>

For each run:

1. Restate the real decision, not just the surface request.
2. Gather only the facts needed to reason correctly; cite current facts when they matter.
3. Classify assumptions with the A/B/C model in [references/frameworks.md](references/frameworks.md).
4. Apply The Algorithm gate: question requirements, delete, simplify, accelerate, then automate.
5. Use breakthrough operators from [rules/idea-generation.md](rules/idea-generation.md) to create non-obvious options.
6. Synthesize the result with the Mars-shot brief from [rules/report-synthesis.md](rules/report-synthesis.md).
7. Stress-test the preferred path with inversion, pre-mortem, and a 24-hour reality test.
8. Run validation from [rules/validation.md](rules/validation.md) before finishing.

</owned_job>

<document_shape>

## Output Structure

```text
.hypercore/elon-musk/[topic-slug]/
├── flow.json           # phase tracking and validation state
├── research.md         # conventions, facts, source ledger, innovation cases
├── assumptions.md      # A/B/C matrix and Socratic premise attack
├── redesign.md         # Mars-shot brief, option portfolio, scoring
└── execution.md        # Algorithm gate, inversion, pre-mortem, 24h test
```

- Use ASCII kebab-case for `[topic-slug]`.
- If the folder exists, read existing files and resume from the last incomplete phase.
- Keep the four output files for compatibility; put the sharper brief inside `redesign.md` rather than adding a new top-level output file.

</document_shape>

<flow_tracking>

Write `flow.json` at the start and update it as each phase completes. See [references/flow-schema.md](references/flow-schema.md).

| Phase | Output file | Completion signal |
|---|---|---|
| `research` | `research.md` | copied conventions and required facts are separated |
| `deconstruct` | `assumptions.md` | A/B/C matrix includes evidence questions for unknowns |
| `redesign` | `redesign.md` | Mars-shot brief plus 3-5 scored options exists |
| `execute` | `execution.md` | preferred path has Algorithm gate, risks, and 24h test |

</flow_tracking>

<workflow>

| Phase | Task | Output file |
|---|---|---|
| 1 | Clarify the real decision and gather only necessary evidence | `research.md` |
| 2 | Attack premises and classify constraints, conventions, unknowns | `assumptions.md` |
| 3 | Generate weird-but-plausible options from surviving fundamentals | `redesign.md` |
| 4 | Pick the bottleneck, stress-test the path, and define next experiments | `execution.md` |

Research rule:

- If the problem depends on current facts, gather and cite them.
- If the problem is conceptual, do not force web, MCP, or team workflows.
- Unknowns should become either evidence questions or concrete experiments.

</workflow>

<output_contract>

Each output file must include:

- `research.md`: problem restatement, convention map, source ledger for current facts, and at least one innovation case when useful
- `assumptions.md`: A/B/C matrix, Socratic premise attack, deleted or defended conventions, and unknowns converted into questions/tests
- `redesign.md`: Mars-shot brief, magic-wand target, 3-5 alternatives, at least one non-obvious option, feasibility/impact/learning-speed scores
- `execution.md`: Algorithm order gate, bottleneck, inversion scenarios, pre-mortem, safety guardrails, and a 24-hour reality test or explicit reason it cannot be run

</output_contract>

<validation>

Before finishing, verify:

- at least one convention was deleted or explicitly defended
- at least one hard constraint remains visible
- at least one unknown became a research question or experiment
- the preferred option does not optimize or automate something that should be deleted
- the report has a thesis, metric, bottleneck, next experiment, and safety caveat
- all current factual claims are cited or marked as assumptions
- all output files are saved and `flow.json` is set to `completed`

</validation>
