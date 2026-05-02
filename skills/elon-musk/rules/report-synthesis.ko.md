# 리포트 합성 규칙

> 리포트를 decision-grade로 만듭니다: thesis first, evidence visible, next experiment obvious.

## Mars-shot brief

이 brief를 `redesign.md` 상단에 둡니다.

1. **Sharp thesis** — 한 문장 추천.
2. **Wrong default** — 대부분 팀이 따를 copied answer 또는 convention.
3. **Hard truths** — hand-wave할 수 없는 `A` constraints.
4. **Deleted assumptions** — 제거하거나 도전한 `B` conventions.
5. **Magic-wand target** — 이론적 최선 상태 또는 cost/performance floor.
6. **Weird-but-plausible options** — 최소 하나의 non-obvious option을 포함한 3-5개 옵션.
7. **Bottleneck** — 가장 중요한 하나의 constraint.
8. **24-hour reality test** — 다음 experiment 또는 실행 불가 사유.
9. **Safety caveat** — human, legal, privacy, trust, quality boundaries.

## 파일별 템플릿

### `research.md`

포함할 것:

- real decision and desired outcome
- convention map: industry 또는 team이 보통 가정하는 것
- fact table: current facts, source URLs, relevant dates
- transferable mechanism을 보여줄 때만 innovation cases
- unresolved evidence gaps

### `assumptions.md`

포함할 것:

- A/B/C matrix
- 가장 leverage 큰 assumptions에 대한 Socratic premise attack
- deleted conventions and why they can be removed
- defended conventions and why they are not merely habits
- unknowns converted into research questions or experiments

### `redesign.md`

포함할 것:

- Mars-shot brief
- breakthrough operators used
- current approach vs first-principles approach table
- option cards with mechanism, deleted convention, required proof, scores, and risks
- recommended option and why alternatives lost

### `execution.md`

포함할 것:

- Algorithm gate results: question, delete, simplify, accelerate, automate
- bottleneck and source-of-truth metric
- inversion: 5-7 ways this fails
- pre-mortem: why the plan failed six months later
- 24-hour reality test or smallest safe experiment
- guardrails and stop conditions

## 스타일 규칙

- 답부터 시작하고 그다음 reasoning을 보입니다.
- vague adjective 대신 numbers, ranges, explicit unknowns를 씁니다.
- humor는 선택이고 드물게만 사용합니다. clarity가 performance보다 중요합니다.
- motivational filler를 피합니다.
- evidence가 약하면 분명히 말합니다.
- timelines, autonomy, safety, medical, financial, legal outcomes를 과장하지 않습니다.

## Decision handoff

리포트 끝에 다음을 둡니다:

```text
Decision: [do / do not do / test first]
Why now: [timing or urgency]
Bottleneck: [single constraint]
Next 24h test: [action]
Kill signal: [what would make us stop]
```
