# Evidence and Scoring Rules (Korean)

## Evidence discipline

- 사실, assumption, founder claim, AI-generated hypothesis, customer behavior를 분리합니다.
- evidence가 부족하면 점수를 provisional로 표시하고 Evidence confidence를 낮춥니다.
- hypothetical enthusiasm보다 behavior, traction, payment, retention, qualified commitment를 우선합니다.
- market report와 competitor scan은 context일 뿐 demand proof가 아닙니다.
- AI persona, synthetic user, model-generated market claim은 E0/E1 hypothesis input으로만 취급합니다.

## Evidence ladder

| Level | Evidence | Use |
|---|---|---|
| E0 | founder intuition, AI/persona simulation, friends' opinions | hypothesis generation only |
| E1 | desk research, market reports, competitor scans | market context, weak demand signal |
| E2 | Mom-Test-style problem interviews with target customers | problem reality signal |
| E3 | repeated organic problem language, workarounds, forum pain, manual spend | behavior/proxy demand signal |
| E4 | qualified waitlist, booked calls, data sharing, strong outbound replies | intent signal; ICP fit에 따라 품질 판단 |
| E5 | LOI, pre-order, deposit, paid pilot, design partner with success criteria | commitment signal |
| E6 | repeat usage, retention, expansion, referrals, willingness to pay | solution evidence |
| E7 | PMF pull: 40%+ very disappointed, demand exceeds capacity, organic growth | scale/go candidate |

Highest evidence level과 dominant evidence level을 모두 기록합니다. 고립된 E5 하나가 대부분 E1인 evidence base를 가리면 안 됩니다.

## Raw score vs confidence

```text
Raw score: 0-100
Evidence confidence: very_low | low | medium | high
Highest evidence level: E0-E7
Confidence-adjusted verdict: Go | Validate First | Narrow | Pivot | Stop
```

Raw score는 매력도를, Evidence confidence는 그 점수를 믿을 수 있는 근거 품질을 의미합니다.

## Confidence gates

- highest evidence가 E0-E2이면 high-confidence Go를 내지 않습니다.
- 실제 customer behavior나 commitment가 없으면 raw score가 높아도 `Validate First`가 기본입니다.
- active users, retention, survey, demand pressure 없이 PMF를 주장하면 `pre-PMF`로 낮춥니다.
- B2B buyer, user, budget owner가 분리되지 않으면 distribution confidence를 low로 제한합니다.
- marketplace는 supply/demand sequencing thesis 없이는 high confidence를 주지 않습니다.
- regulated/deeptech는 regulatory 또는 technical proof milestone이 필요합니다.

## Scoring discipline

- framework score는 decision aid이지 false precision이 아닙니다.
- 각 score를 올리거나 내린 evidence를 설명합니다.
- 주요 score마다 “what would change this score”를 작성합니다.
- critical distribution/demand failure를 평균으로 숨기지 않습니다.
- evidence gap은 idea quality와 별개로 confidence를 낮춥니다.

## False positive penalties

confidence를 낮춰야 하는 evidence:

- compliments: “great idea”
- hypotheticals: “I would use this”
- pain/behavior 없는 feature wishlist
- friends/family feedback
- unqualified waitlists
- qualified conversion 없는 vanity clicks
- reachable wedge 없는 TAM excitement
- AI persona 또는 synthetic-user responses
- customer evidence 전 investor interest

## Roadmap discipline

- generic advice가 아니라 next cheapest learning step으로 끝냅니다.
- riskiest assumption을 먼저 검증하는 experiment를 선호합니다.
- success criteria와 kill criteria를 포함합니다.
- 같은 uncertainty를 줄일 수 있는 작은 proof가 있으면 full product build를 권하지 않습니다.

## Anti-patterns

- obsolete task API나 model name을 hardcode하지 않습니다.
- evidence가 얇은데 confident grade를 제시하지 않습니다.
- 아이디어가 흥미롭다는 이유로 weakness를 생략하지 않습니다.
- research, TAM, AI simulation을 customer buying proof로 취급하지 않습니다.
- Stop/Pivot recommendation을 예의상 흐리지 않습니다.
