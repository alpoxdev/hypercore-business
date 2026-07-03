---
name: startup-validator
description: "[Hyper] 스타트업/제품 아이디어를 evidence ladder, confidence-adjusted scoring, 고객 발견 규칙, 다음 검증 sprint로 냉정하게 검증합니다. .hypercore/startup-validator/[topic-slug]/ 아래에 다중 파일 리포트를 저장합니다. 아이디어 검증, PMF/수요 판단, pivot/go/no-go 결정, 투자 전 리스크 점검에 사용하고, 아이디어 발산/구현 계획/제1원칙 재설계에는 사용하지 않습니다."
---

@rules/evidence-and-scoring.md
@rules/customer-discovery.md
@rules/validation-experiments.md
@rules/verdict-and-reporting.md
@references/frameworks.md
@references/flow-schema.md

# Startup Validator

> 낙관이 아니라 증거로 스타트업 리스크를 줄입니다. 점수와 확신도를 분리하고, 가장 싼 다음 학습 행동으로 끝냅니다.

<purpose>

- 스타트업/제품 아이디어를 evidence quality, uncertainty, framework scoring으로 평가합니다.
- raw score와 evidence confidence를 분리해 약한 근거가 high-confidence Go로 둔갑하지 않게 합니다.
- 가장 큰 unknown을 고객 인터뷰, 수요 실험, kill criteria로 바꿉니다.
- 나중에 이어서 볼 수 있는 다중 파일 검증 리포트를 저장합니다.

</purpose>

<output_language>

사용자의 언어로 응답합니다. 파일명, JSON key, evidence level, score label, framework name은 사용자가 달리 요청하지 않는 한 영어로 유지합니다.

</output_language>

<routing_rule>

사용하세요:

- 새로운 스타트업, 제품, 기능 wedge, 시장 진입 아이디어를 검증할 때
- proceed / narrow / pivot / stop / 추가 검증 중 무엇을 할지 정해야 할 때
- customer discovery, paid pilot, design partner, 투자 미팅 전 약점을 찾을 때
- traction signal이 진짜 PMF인지 단순 호기심인지 판단해야 할 때

사용하지 마세요:

- 새 아이디어를 많이 뽑는 것이 목적일 때
- 구현 계획, 코드 작업, 기술 설계가 주목적일 때
- 제1원칙으로 사업모델을 다시 설계하는 것이 목적일 때
- go/no-go나 validation decision 없이 시장 조사만 원할 때

경계 라우팅:

- 구체 아이디어 없는 발산은 `genius-thinking`.
- 가정 해체와 제1원칙 재설계는 `elon-musk`.
- 스타트업 verdict 없는 시장/트렌드 조사는 `research`.
- 이미 검증된 아이디어의 구현 계획은 `plan`.

</routing_rule>

<trigger_examples>

긍정 trigger:

```bash
/startup-validator 중견기업 재무팀을 위한 B2B 구매 자동화
/startup-validator 이 아이디어가 진짜 고객 돈을 받을 수 있는지 검증해줘
/startup-validator PMF인지 아닌지 evidence 기준으로 평가해줘
```

부정 trigger:

```bash
새 스타트업 아이디어 50개 뽑아줘
이 기능 구현 계획 짜줘
```

경계 trigger:

```bash
제1원칙으로 사업모델을 완전히 다시 설계해줘
# validation scoring이나 go/no-go 판단을 요청하지 않았다면 elon-musk로 라우팅합니다.
```

</trigger_examples>

<support_file_read_order>

필요한 support file만 아래 순서로 읽습니다:

1. evidence inventory, E0-E7 level 지정, confidence 조정 전 [rules/evidence-and-scoring.md](rules/evidence-and-scoring.md)를 읽습니다.
2. venture-scale potential, PMF forces, go/no-go tradeoff를 점수화하기 전 [references/frameworks.md](references/frameworks.md)를 읽습니다.
3. interview question, discovery quality gate, customer signal caveat 작성 전 [rules/customer-discovery.md](rules/customer-discovery.md)를 읽습니다.
4. 다음 validation sprint, metric, experiment sequence 설계 전 [rules/validation-experiments.md](rules/validation-experiments.md)를 읽습니다.
5. verdict, kill criteria, "what would change my mind" 섹션 작성 전 [rules/verdict-and-reporting.md](rules/verdict-and-reporting.md)를 읽습니다.
6. `flow.json` 생성 또는 갱신 전 [references/flow-schema.md](references/flow-schema.md)를 읽습니다.

</support_file_read_order>

<input_check>

아이디어가 없으면 한 가지만 묻습니다:

`어떤 스타트업 또는 제품 아이디어를 검증할까요?`

창업자, 시장, 고객, traction evidence가 부족하면 확신을 만들지 말고 assumption과 low confidence로 진행합니다.

</input_check>

<instruction_contract>

- Intent: 구체적인 스타트업, 제품, wedge, 시장 진입 아이디어를 검증하고 evidence-weighted decision을 만듭니다.
- Scope: problem, customer, value, distribution, monetization, defensibility, PMF readiness, next validation step을 평가합니다. 빈 페이지 ideation, 제1원칙 재설계, 시장 조사만 수행, 구현 계획은 하지 않습니다.
- Authority: 사용자가 준 사실과 저장된 `.hypercore/startup-validator/[topic-slug]/` 파일은 working input으로 쓰되, verdict에 반영하기 전 모든 claim을 evidence quality로 등급화합니다.
- Evidence: signal을 E0-E7 ladder로 분류하고, 각 score change의 source나 assumption을 명명하며, raw attractiveness와 confidence를 분리합니다.
- Tools: 사용자가 달리 요청하지 않는 한 현재 topic의 startup-validator output folder만 읽고 씁니다. scoring, discovery, experiment, verdict, flow state에는 support file을 사용합니다.
- Loop: idea framing, evidence inventory, framework scoring, PMF forces 평가, confidence gate 적용, next sprint 설계, phase별 `flow.json` 갱신 순서로 진행합니다.
- Output: `.hypercore/startup-validator/[topic-slug]/` 아래에 `flow.json`, `thesis.md`, `thiel-scores.md`, `pmf-forces.md`, `verdict.md`를 저장합니다.
- Verification: validation checklist를 실행하고, weak evidence가 high-confidence Go를 만들지 않는지 확인하며, verdict에 success metric, kill criteria, decision을 바꿀 조건이 들어갔는지 점검합니다.
- Stop condition: 모든 output file이 존재하고, `flow.json`이 `completed`이며, 사용자가 Go / Validate First / Narrow / Pivot / Stop decision과 다음 7-day validation sprint를 받으면 종료합니다.

</instruction_contract>

<owned_job>

각 실행에서 할 일:

1. 아이디어, 고객, 단계, 현재 대안, 원하는 의사결정을 정의합니다.
2. problem, customer, value, distribution, monetization, defensibility의 가장 위험한 가설을 추출합니다.
3. 증거를 inventory로 만들고 [rules/evidence-and-scoring.md](rules/evidence-and-scoring.md)의 E0-E7 evidence ladder로 태깅합니다.
4. [references/frameworks.md](references/frameworks.md)의 프레임워크로 점수화하되 raw score와 evidence confidence를 분리합니다.
5. [rules/customer-discovery.md](rules/customer-discovery.md)의 고객 발견 품질 기준을 적용합니다.
6. [rules/validation-experiments.md](rules/validation-experiments.md)로 다음 validation sprint를 설계합니다.
7. [rules/verdict-and-reporting.md](rules/verdict-and-reporting.md)에 따라 confidence-adjusted verdict를 냅니다.
8. 완료 전에 validation checklist를 통과시키고 `flow.json`을 완료 상태로 갱신합니다.

</owned_job>

<document_shape>

## Output Structure

```text
.hypercore/startup-validator/[topic-slug]/
├── flow.json           # 단계, 증거 확신도, 다음 sprint 상태
├── thesis.md           # 아이디어, ICP/persona, 가설, evidence inventory
├── thiel-scores.md     # 7Q 점수, confidence, caveat
├── pmf-forces.md       # PMF stage, JTBD forces, VPC fit, customer pull
└── verdict.md          # raw score, confidence-adjusted verdict, sprint, kill criteria
```

- `[topic-slug]`는 ASCII kebab-case를 사용합니다.
- 기존 폴더가 있으면 마지막 미완료 단계부터 재개합니다.
- 호환성을 위해 4개 output file은 유지하고, 강화 섹션은 기존 파일 안에 넣습니다.

</document_shape>

<flow_tracking>

실행 시작 시 `flow.json`을 작성하고 각 phase가 끝날 때 갱신합니다. 자세한 schema는 [references/flow-schema.md](references/flow-schema.md)를 봅니다.

| Phase | Output file | Completion signal |
|---|---|---|
| `frame` | `thesis.md` | target customer, current alternative, hypotheses, evidence inventory가 존재 |
| `score` | `thiel-scores.md` | 7Q raw score에 confidence와 score-change evidence가 포함 |
| `pmf` | `pmf-forces.md` | JTBD/PMF forces와 customer-pull signals가 평가됨 |
| `verdict` | `verdict.md` | verdict, next 7-day validation sprint, kill criteria가 명시됨 |

</flow_tracking>

<workflow>

| Phase | Task | Output file |
|---|---|---|
| 1 | 아이디어, ICP/persona, 단계, 현재 대안, riskiest hypotheses 정의 | `thesis.md` |
| 2 | venture-scale potential과 전략 리스크를 evidence confidence와 함께 점수화 | `thiel-scores.md` |
| 3 | customer pull, switching forces, VPC fit, PMF stage 평가 | `pmf-forces.md` |
| 4 | confidence gate 적용, verdict 선택, sprint/kill criteria 정의 | `verdict.md` |

Scoring rule:

- raw score는 매력도, confidence는 근거 품질입니다.
- E0-E2 evidence만으로 high-confidence Go를 내지 않습니다.
- PMF 주장은 active user behavior, retention, survey, demand pressure 없이는 금지합니다.
- 빈 근거는 낙관적 assumption으로 채우지 말고 confidence를 낮춥니다.

</workflow>

<output_contract>

각 파일은 다음을 포함해야 합니다:

- `thesis.md`: one-line thesis, target customer/ICP, buyer/user split, current alternative, value/growth/monetization hypotheses, top 5 riskiest assumptions, E-level evidence inventory
- `thiel-scores.md`: Engineering, Timing, Monopoly, People, Distribution, Durability, Secret score와 evidence confidence, score-change evidence, venture-scale caveats
- `pmf-forces.md`: JTBD story, Push/Pull/Habit/Anxiety, jobs/pains/gains fit, PMF stage, active-user가 있을 때 Sean Ellis/Superhuman readiness, B2B/marketplace/deeptech caveat
- `verdict.md`: Go / Validate First / Narrow / Pivot / Stop, raw score, confidence-adjusted verdict, highest evidence level, critical weaknesses, next 7-day validation sprint, kill criteria, what would change my mind

</output_contract>

<validation>

완료 전 확인:

- evidence quality가 의견, 열광, AI simulation과 분리되었습니다.
- raw score와 confidence-adjusted verdict가 모두 보입니다.
- 약한 근거가 high-confidence Go로 이어지지 않습니다.
- 점수가 named framework와 named evidence에 연결됩니다.
- 고객 인터뷰 질문이 칭찬, 가정, solution-first pitching을 피합니다.
- 다음 검증 action, success metric, kill criteria가 구체적입니다.
- 모든 output file이 `.hypercore/startup-validator/[topic-slug]/`에 저장되었습니다.
- `flow.json` status가 `completed`입니다.

</validation>
