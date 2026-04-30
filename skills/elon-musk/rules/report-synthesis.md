# Report Synthesis Rules

> Make the report decision-grade: thesis first, evidence visible, next experiment obvious.

## Mars-shot brief

Place this brief at the top of `redesign.md`.

1. **Sharp thesis** — one sentence recommendation.
2. **Wrong default** — the copied answer or convention most teams would follow.
3. **Hard truths** — the `A` constraints that cannot be hand-waved away.
4. **Deleted assumptions** — the `B` conventions removed or challenged.
5. **Magic-wand target** — the theoretical best state or cost/performance floor.
6. **Weird-but-plausible options** — 3-5 options, including at least one non-obvious option.
7. **Bottleneck** — the one constraint that matters most.
8. **24-hour reality test** — the next experiment or the reason it cannot be run.
9. **Safety caveat** — human, legal, privacy, trust, and quality boundaries.

## File-specific templates

### `research.md`

Include:

- real decision and desired outcome
- convention map: what the industry or team usually assumes
- fact table: current facts, source URLs, dates when relevant
- innovation cases only if they reveal a transferable mechanism
- unresolved evidence gaps

### `assumptions.md`

Include:

- A/B/C matrix
- Socratic premise attack for the highest-leverage assumptions
- deleted conventions and why they can be removed
- defended conventions and why they are not merely habits
- unknowns converted into research questions or experiments

### `redesign.md`

Include:

- Mars-shot brief
- breakthrough operators used
- current approach vs first-principles approach table
- option cards with mechanism, deleted convention, required proof, scores, and risks
- recommended option and why alternatives lost

### `execution.md`

Include:

- Algorithm gate results: question, delete, simplify, accelerate, automate
- bottleneck and source-of-truth metric
- inversion: 5-7 ways this fails
- pre-mortem: why the plan failed six months later
- 24-hour reality test or smallest safe experiment
- guardrails and stop conditions

## Style rules

- Lead with the answer, then show reasoning.
- Use numbers, ranges, or explicit unknowns instead of vague adjectives.
- Keep humor optional and sparse; clarity beats performance.
- Avoid motivational filler.
- If evidence is weak, say so plainly.
- Do not overclaim timelines, autonomy, safety, medical, financial, or legal outcomes.

## Decision handoff

End the report with:

```text
Decision: [do / do not do / test first]
Why now: [timing or urgency]
Bottleneck: [single constraint]
Next 24h test: [action]
Kill signal: [what would make us stop]
```
