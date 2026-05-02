# Validation Experiment Rules (Korean)

> 다음 action은 가장 큰 uncertainty를 가장 싸게 줄여야 합니다.

## Experiment ladder

riskiest assumption을 검증할 수 있는 가장 낮은 비용의 experiment를 선택합니다.

| Level | Experiment | Tests |
|---|---|---|
| X1 | problem interviews | problem이 real and urgent인지 |
| X2 | concierge/manual MVP | automation 전에 workflow value가 생기는지 |
| X3 | smoke test / landing page | 특정 ICP가 promise와 CTA에 반응하는지 |
| X4 | qualified waitlist or booked calls | intent가 qualification 후에도 남는지 |
| X5 | data commitment or integration access | customer가 setup effort를 투자하는지 |
| X6 | LOI, pre-order, deposit, paid pilot | buyer commitment가 있는지 |
| X7 | retention / referral / PMF survey | active users가 pull을 보이는지 |

## Smoke test design

유효한 smoke test에는 다음이 있습니다:

- one ICP or buyer segment
- one concrete pain or job
- one promise
- real intent를 나타내는 one CTA
- qualification questions
- source/channel tracking
- product가 완전히 없을 때 ethical disclosure
- launch 전 decision threshold

약한 smoke test는 curiosity를, 강한 smoke test는 qualified intent를 측정합니다.

## Concierge/manual MVP

software 없이 manual delivery로 value를 검증할 수 있을 때 사용합니다.

포함할 것:

- customer success condition
- manual service steps
- delivery time and cost
- automation 전 학습해야 할 것
- willingness-to-pay or repeat-use signal
- poor demand 또는 impossible unit economics가 드러날 때 stop condition

## B2B commitment tests

강한 B2B test:

- paid pilot with success criteria
- timeline/data access가 있는 design partner agreement
- budget owner, decision date, conditions가 있는 LOI
- 필요 시 security/procurement discovery
- real artifacts로 workflow shadowing

buyer identity, timeline, conversion condition 없는 non-binding LOI를 과대평가하지 않습니다.

## PMF survey readiness

Sean Ellis / Superhuman-style survey는 다음 조건에서만 사용합니다:

- users are active enough to miss the product
- sample is qualified and segmentable
- product delivers core value at least once
- retention or repeat behavior can be observed

survey는 retention, payment, referral, usage evidence를 대체하지 않습니다.

## Kill criteria

모든 sprint에는 kill or pivot criteria가 있어야 합니다. 예:

- qualified customers 중 N명 미만만 repeated urgent pain을 보고
- targeted outreach 후 buyer commitment 없음
- waitlist는 전환되지만 qualification 결과 wrong ICP
- price/timeline이 concrete해지자 paid pilot interest 소멸
- core value event 후 retention/repeat use 실패
- CAC가 monetization potential보다 구조적으로 높음

## 7-day validation sprint

`verdict.md`를 다음으로 끝냅니다:

```text
Sprint goal: [uncertainty to reduce]
Target segment: [ICP/persona]
Experiment: [method]
Success metric: [specific threshold]
Kill signal: [specific threshold]
What we will do next if it passes: [...]
What we will do next if it fails: [...]
```
