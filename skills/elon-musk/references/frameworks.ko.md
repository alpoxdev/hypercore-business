# Framework Reference

> 역할극이나 영웅화 없이 Musk-style first-principles frameworks를 적용하기 위한 operational reference입니다.

## 1. First-principles base

해결책을 제안하기 전에 이 구분을 사용합니다:

- `A` — hard constraints: physics, math, law, hard technical limits, hard dependencies, non-negotiable safety constraints
- `B` — conventions: defaults, habits, copied competitor behavior, inherited process, “this is how the industry works”
- `C` — unknowns: data, prototypes, user tests, expert calls, current research로 검증 가능한 claims

`A`는 design boundary로 다루고, `B`는 삭제하거나 도전하며, `C`는 evidence questions 또는 experiments로 전환합니다.

## 2. Socratic premise attack

가장 중요한 assumptions에 적용합니다:

- 이 claim은 정확히 무엇을 의미하는가?
- 우리는 무엇을 증거 없이 가정하는가?
- 무엇이 이를 prove 또는 falsify하는가?
- 이 requirement의 owner는 누구인가? 왜 필요한지 물을 수 있는가?
- 이 assumption이 false라면 무엇이 달라지는가?
- 왜 이것을 normal로 받아들였는가?
- 이것은 law, contract, user need인가, 아니면 habit인가?

## 3. The Algorithm

이 순서를 지킵니다. 뒤집지 않습니다.

1. **Question requirements** — requirement를 덜 틀리게 만들고 responsible person/source를 붙입니다.
2. **Delete** — 정말 필요하지 않은 part, step, feature, policy, dependency를 제거합니다.
3. **Simplify or optimize** — deletion을 통과한 것만 개선합니다.
4. **Accelerate** — 방향과 process가 맞은 뒤 cycle time을 높입니다.
5. **Automate** — automation은 마지막입니다. waste를 자동화하지 않습니다.

Gate: preferred option이 acceleration 또는 automation에서 시작하면 deletion과 simplification으로 되돌립니다.

## 4. Magic-wand number

현재 제약과 타협하기 전에 이론적 최선 상태를 정의합니다.

Magic-wand target 예시:

- zero marginal cost
- one-click onboarding
- instant delivery
- raw-material floor cost
- no handoff between teams
- no waiting time
- no duplicated data entry

오늘과 magic-wand state의 gap을 redesign space로 사용합니다.

## 5. Idiot index

Cost, complexity, operations가 부풀어 보일 때 사용합니다.

```text
idiot index = finished cost / fundamental input cost
```

Denominator는 raw materials, compute, labor minutes, attention, energy, distribution cost 또는 다른 irreducible input일 수 있습니다. 높은 ratio는 어리석음을 증명하지 않고, design/process/coordination/risk/market structure가 waste를 더하는 위치를 보여줍니다.

## 6. Limits test

문제를 extreme으로 밀어 숨은 구조를 드러냅니다:

- Volume이 10x 또는 100x가 되면?
- Price가 90% 내려가야 한다면?
- Cycle time이 weeks에서 hours로 줄어야 한다면?
- Marginal cost가 zero에 가까워져야 한다면?
- 한 사람이 전체 system을 운영해야 한다면?
- Meetings, handoffs, manual QA 없이 작동해야 한다면?

결과로 bottlenecks와 false requirements를 노출합니다.

## 7. Dimension shift

Design space를 다시 프레이밍합니다:

- 2D -> 3D: layers, parallel channels, new surfaces 추가
- sequential -> parallel: independent parts를 동시에 진행
- ownership -> utilization: idle capacity 또는 shared use monetization
- product -> production system: 제품이 만들어지고 팔리고 지원되고 학습되는 방식을 재설계
- component -> system: interface를 optimize하지 말고 제거
- service -> self-serve loop: 반복 human work를 user-operable workflow로 전환

## 8. Bottleneck attack

전체 system을 막는 하나의 constraint를 찾습니다.

묻기:

- 어떤 single queue, part, decision, supplier, team, belief가 throughput을 제한하는가?
- 다른 모든 것이 개선되어도 이것이 그대로면 outcome이 바뀌는가?
- 어떤 metric이 bottleneck임을 증명하는가?
- bottleneck을 delete, bypass, parallelize, own할 수 있는가?

## 9. Reality feedback

Reality contact로 끝냅니다:

- debate 대신 prototype
- opinion 대신 source-of-truth metric
- secondhand summaries 대신 direct user/customer/operator feedback
- 가능하면 24-hour experiment
- idea가 틀렸을 때의 explicit kill criteria

목표는 right가 아니라 빠르고 안전하게 less wrong이 되는 것입니다.

## 10. Rebuild sequence

1. Real decision을 다시 씁니다.
2. Assumptions를 나열하고 A/B/C로 분류합니다.
3. B conventions를 삭제하거나 도전합니다.
4. C unknowns를 evidence questions 또는 experiments로 전환합니다.
5. Algorithm, magic-wand, idiot-index, limits, dimension-shift, bottleneck operators를 적용합니다.
6. non-obvious option 최소 하나를 포함해 3-5 options를 만듭니다.
7. A constraints 안에서 impact, feasibility, learning speed를 극대화하는 path를 고릅니다.
8. inversion과 pre-mortem으로 stress-test합니다.
