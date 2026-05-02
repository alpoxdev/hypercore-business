# 돌파 아이디어 생성 규칙

> 관행적 답을 장식하지 말고 제약을 바꿔 non-obvious option을 만듭니다.

## 전제 공격 루프

옵션을 만들기 전에:

1. 업계 기본 답을 한 문장으로 씁니다.
2. 그 답이 필연처럼 보이게 만드는 copied assumptions를 이름 붙입니다.
3. 각 assumption을 `A` hard constraint, `B` convention, `C` unknown으로 표시합니다.
4. 최소 하나의 `B` convention을 삭제하거나 뒤집습니다.
5. 최소 하나의 `C` unknown을 testable question으로 바꿉니다.

## Operator stack

복잡한 문제에는 최소 세 개, 단순한 문제에는 최소 한 개를 적용합니다.

| Operator | Prompt | Output |
|---|---|---|
| Algorithm gate | 어떤 requirement를 question, delete, simplify, accelerate, automate할 수 있는가? | optimization 전 waste 제거 |
| Magic-wand target | 완벽한 상태라면 무엇이 instant, free, invisible, effortless인가? | north-star gap |
| Idiot index | 어떤 cost가 fundamental input cost보다 지나치게 높은가? | waste/cost attack surface |
| Limits ladder | 10x, 100x, 1%, zero marginal cost에서 무엇이 깨지는가? | hidden bottleneck |
| Dimension shift | 2D에서 3D, sequential에서 parallel, product에서 system으로 바꿀 수 있는가? | new design space |
| Reuse loop | 어떤 expensive asset이 idle, single-use, duplicated, thrown away 상태인가? | utilization/reuse option |
| Bottleneck attack | 어떤 하나의 constraint가 전체 system을 막는가? | highest-leverage intervention |
| Reality feedback | 무엇이 prototype 또는 direct metric으로 빠르게 증명되는가? | learning loop |

## 삭제 램페이지

각 후보 옵션에 대해 묻습니다:

- 어떤 part, process, step, feature, policy, approval, handoff, dependency가 사라질 수 있는가?
- 삭제가 무섭다면 정확히 어떤 failure가 두려운가?
- 그 failure를 싸게 테스트할 수 있는가?
- 다시 추가할 것이 없다면 너무 보수적이었던 것은 아닌가?

## Weird-but-plausible option rule

Option portfolio에는 처음엔 이상하게 느껴지지만 fundamentals로 방어 가능한 옵션을 최소 하나 포함해야 합니다.

Weird option이 acceptable하려면:

- hard constraints와 safety boundaries를 지킵니다.
- 어떤 convention을 삭제하는지 밝힙니다.
- slogan이 아니라 plausible mechanism이 있습니다.
- small prototype, calculation, customer conversation, operational experiment로 테스트할 수 있습니다.

## Option scoring

각 옵션을 1-5점으로 평가합니다.

| Score | Meaning |
|---|---|
| Impact | 맞을 때 upside 크기 |
| Feasibility | 현재 resource로 시도 가능한가 |
| Learning speed | reality가 얼마나 빨리 증명/반증하는가 |
| Constraint fit | hard constraints와 guardrails를 지키는가 |
| Non-obviousness | fantasy가 되지 않으면서 convention을 깨는가 |

Impact, constraint fit, learning speed의 균형이 가장 좋은 옵션을 선호합니다. 이상하다는 이유만으로 weirdest option을 고르지 않습니다.

## Output cues

`redesign.md`에는 다음을 포함합니다:

- rejected or revised default answer
- breakthrough operators used
- 3-5 option cards
- one weird-but-plausible option
- scoring table
- recommendation with the single bottleneck it attacks
