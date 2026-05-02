# Verdict and Reporting Rules (Korean)

## Verdict format

`verdict.md`에는 이 형식을 사용합니다:

```text
Verdict: Go | Validate First | Narrow | Pivot | Stop
Raw score: X/100
Evidence confidence: very_low | low | medium | high
Highest evidence level: E0-E7
Dominant evidence level: E0-E7
Riskiest assumption: ...
Next 7-day validation sprint: ...
Kill signal: ...
What would change my mind: ...
```

## Verdict meanings

| Verdict | Meaning | Allowed evidence state |
|---|---|---|
| Go | focused execution으로 진행 | strong behavior/commitment evidence와 unresolved fatal risk 없음 |
| Validate First | 크게 만들지 말고 next sprint 실행 | idea는 매력적이나 evidence 부족 |
| Narrow | segment, wedge, use case를 좁힘 | broad idea with weak target clarity |
| Pivot | customer, problem, channel, business model 변경 | evidence가 current thesis와 충돌 |
| Stop | 이 방향 중단 | critical assumption failed or structurally unacceptable risk |

## Confidence-adjusted reporting

- high raw score + low confidence는 “promising but unproven”으로 표현합니다.
- low raw score + high confidence는 “stop or pivot할 강한 evidence”로 표현합니다.
- decimal precision으로 uncertainty를 숨기지 않습니다.
- verdict를 가장 크게 바꿀 single evidence를 설명합니다.

## File-specific report cues

### `thesis.md`

다음으로 시작합니다:

- one-line thesis
- customer/ICP/persona
- current alternative
- why now
- riskiest assumptions
- evidence inventory

### `thiel-scores.md`

각 question에는 다음을 포함합니다:

- score
- evidence level
- confidence
- rationale
- score-up evidence
- score-down evidence

### `pmf-forces.md`

포함할 것:

- JTBD story
- Push/Pull/Habit/Anxiety
- jobs/pains/gains fit
- PMF stage
- active user / retention / survey readiness caveat
- B2B, consumer, marketplace, regulated idea별 segment-specific notes

### `verdict.md`

포함할 것:

- verdict block
- severity별 critical weaknesses
- next 7-day validation sprint
- sprint 이후에만 30-day and 90-day roadmap
- kill criteria
- what would change the recommendation

## Tone

- founder-friendly but unsentimental.
- cheerleading을 피합니다.
- uncertainty language를 정확히 씁니다.
- generic advice보다 “what must be true”와 “what to test next”를 우선합니다.
- evidence가 약하면 분명히 말합니다.
