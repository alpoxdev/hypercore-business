# Framework Reference (Korean)

> 이 framework들은 ritual checklist가 아니라 lens로 사용합니다. Evidence quality를 tagging한 뒤 score를 냅니다.

## 1. Thiel 7 Questions: venture-scale lens

의미 있는 startup이 될 수 있는지 판단합니다.

| Question | What to test | Common failure |
|---|---|---|
| Engineering | 고객이 중요하게 여기는 metric에서 10x better인가 | switching reason 없는 incremental improvement |
| Timing | 왜 지금인가: technology, regulation, behavior, cost, distribution 변화 | too early/late |
| Monopoly | 작은 market에서 시작해 dominant해질 수 있는가 | wedge 없는 broad market |
| People | founder-market fit과 credibility가 있는가 | trend-chasing generic team |
| Distribution | buyers에 반복적/경제적으로 도달 가능한가 | channel 없는 product obsession |
| Durability | 10년 이상 보호되는 것은 무엇인가 | easy clone/platform dependency |
| Secret | 팀이 아는 non-obvious truth는 무엇인가 | insight 없는 consensus idea |

## 2. YC / Paul Graham lenses

- Who wants this urgently right now?
- founder가 직접 보거나 가까이 산 문제인가?
- small, reachable wedge가 있는가?
- early users를 학습/감동시키기 위해 do things that do not scale을 할 수 있는가?
- users가 product를 pull하는가, 회사가 uphill push하는가?

## 3. Customer Development

idea를 outside the building에서 검증할 hypotheses로 봅니다:

- customer hypothesis
- problem hypothesis
- value hypothesis
- channel hypothesis
- revenue hypothesis
- growth hypothesis

output은 riskiest hypothesis를 prove/falsify할 next milestone을 식별해야 합니다.

## 4. Mom Test interview quality

좋은 validation은 past behavior, current workaround, real constraints를 봅니다.
나쁜 validation은 고객에게 미래 사용/구매를 예측하게 합니다.

## 5. Lean / Running Lean

1. Problem/segment fit
2. Problem/solution fit
3. Product/market fit
4. Scale readiness

## 6. Value Proposition Canvas

- Jobs: functional, social, emotional jobs
- Pains: costs, risks, frustrations, blockers
- Gains: outcomes, status, speed, savings, upside
- Pain relievers
- Gain creators

약점: customer가 높게 평가하지 않는 pain을 해결하는 offer.

## 7. JTBD Forces of Progress

```text
Push of current pain + Pull of new solution > Habit of old way + Anxiety of switching
```

네 forces를 모두 score합니다. pain과 product appeal이 강해도 habit/anxiety가 더 크면 실패합니다.

## 8. PMF Engine / Sean Ellis lens

qualified active users가 있을 때만 사용합니다. Signals:

- target active users 중 큰 비율이 product가 사라지면 very disappointed
- disappointed users가 clear core benefit 공유
- retention/repeat behavior가 survey를 뒷받침
- demand/support/usage pressure가 capacity 초과
- target segment에서 organic referrals or word-of-mouth

waitlist, investor interest, one-time usage로 PMF를 주장하지 않습니다.

## 9. B2B validation lens

B2B scoring은 role clarity가 필요합니다:

- user pain
- buyer value
- budget owner
- procurement/security path
- decision timeline
- current workflow cost
- paid pilot or design-partner path

강한 B2B evidence: paid pilots, budgeted projects, data access, workflow artifacts, executive/business owner urgency.

## 10. Consumer validation lens

Consumer idea는 다음 evidence가 필요합니다:

- frequent 또는 emotionally intense use case
- retention or repeat behavior
- share/referral motive
- acquisition channel and cost realism
- willingness to pay, attention, or data exchange

## 11. Marketplace validation lens

Marketplace idea에는 다음이 필요합니다:

- clear initial side to seed
- liquidity wedge
- supply/demand sequencing
- 한쪽이 먼저 참여할 reason
- take-rate and trust/safety assumptions

## 12. Deeptech or regulated validation lens

Deeptech, healthcare, fintech, education, regulated idea는 다음이 필요합니다:

- technical feasibility milestone
- regulatory path
- capital intensity estimate
- relevant buyer/reimbursement path
- safety, privacy, compliance constraints

## 13. AI-assisted validation guardrail

AI can help with:

- question design
- transcript clustering
- competitor and market desk research
- hypothesis generation
- draft experiment design

AI cannot replace:

- real customer behavior
- willingness to pay
- procurement friction
- retention
- lived customer context

AI-generated personas와 synthetic user responses는 최대 E0/E1 evidence로 분류합니다.

## 14. Synthesis sequence

1. idea, customer, current alternative, stage, decision을 frame합니다.
2. riskiest hypotheses를 추출합니다.
3. evidence inventory를 만들고 E-level을 태깅합니다.
4. Thiel 7Q로 venture-scale potential을 score합니다.
5. JTBD, VPC, PMF stage, customer pull을 평가합니다.
6. confidence gates와 false-positive penalties를 적용합니다.
7. verdict와 next 7-day validation sprint를 선택합니다.
