---
name: elon-musk
description: "[Hyper] 일론 머스크 역할극이 아니라 공개적으로 알려진 제1원칙 사고 프레임워크를 적용해 문제를 하드 제약, 관행, 미검증 가정으로 분해하고, 뻔하지 않은 돌파 옵션과 날카로운 다중 파일 리포트를 .hypercore/elon-musk/[topic-slug]/ 아래에 저장합니다. 기존 답이 업계 복붙처럼 보이거나 first-principles, Musk-style, 가정 해체, breakthrough 전략을 요청할 때 사용."
---

@rules/execution.md
@rules/idea-generation.md
@rules/report-synthesis.md
@rules/validation.md
@references/frameworks.md
@references/flow-schema.md

# Elon Musk

> 제1원칙으로 문제를 다시 짓습니다. 이 스킬은 일론 머스크를 흉내 내는 스킬이 아니라, 공개적으로 알려진 사고 프레임워크를 작업 도구로 적용하는 스킬입니다.

<output_language>

사용자가 별도로 요청하지 않으면 최종 답변과 생성 리포트 파일은 사용자의 언어로 작성합니다.

</output_language>

<purpose>

- 진짜 제약과 복사된 관행, 검증되지 않은 믿음을 분리합니다.
- 제1원칙 operator로 이상하지만 논리적인 돌파 옵션을 만듭니다.
- 의사결정에 바로 쓸 수 있는 다중 파일 리포트로 정리합니다.

</purpose>

<instruction_contract>

- Intent: 구체적인 의사결정을 기본 원리에서 해체하고 decision-grade 리포트를 만듭니다.
- Scope: `.hypercore/elon-musk/[topic-slug]/flow.json`, `research.md`, `assumptions.md`, `redesign.md`, `execution.md`를 책임집니다.
- Authority: 사용자/프로젝트 지시가 공개 Musk 사례, 경쟁사, 기존 관행보다 우선합니다.
- Evidence: 추천에 영향을 주는 현재 사실은 출처를 남기고, 그렇지 않은 주장은 assumption 또는 unknown으로 표시합니다.
- Tools: 필요한 경우에만 로컬 파일과 가벼운 조사를 사용하며, 특정 런타임/모델/병렬 에이전트를 요구하지 않습니다.
- Output: 다중 파일 리포트를 저장하고 thesis, bottleneck, metric, next test, safety caveat를 보이게 둡니다.
- Verification: 완료 전 [rules/validation.md](rules/validation.md)의 checklist를 실행합니다.
- Stop condition: 모든 파일이 존재하고 `flow.json`이 `completed`이며 남은 unknown이 테스트나 source question으로 전환되면 종료합니다.

</instruction_contract>

<routing_rule>

사용하세요:

- 선택지가 모두 경쟁사나 업계 기본값의 변형처럼 보일 때
- 비용, 가격, 제품, GTM, 운영, 조직 문제가 관행에 갇힌 느낌일 때
- 사용자가 제1원칙, Musk-style 프레임워크, 가정 해체, breakthrough report를 요청할 때
- 일반 계획 전에 문제를 근본부터 다시 정의해야 할 때

사용하지 마세요:

- 사실 조사나 뉴스 요약이 주목적일 때
- 일반 구현 계획, 코드 수정, 디버깅이 주목적일 때
- 스타트업 점수화/검증 리포트가 주목적일 때
- 구체 문제 없이 열린 브레인스토밍만 원하는 경우

경계 라우팅:

- 스타트업 점수화와 준비도 평가는 `startup-validator`.
- 제약 분석 없는 열린 아이디어 발산은 `genius-thinking`.
- 자료 조사와 비교 분석이 주목적이면 `research`.

</routing_rule>

<trigger_examples>

긍정 예시:

```bash
/elon-musk 우리 SaaS 가격 전략이 경쟁사 복붙처럼 보여. 완전히 다시 생각해줘
/elon-musk first principles로 제조 원가를 뜯어보고 10배 낮출 방법을 찾아줘
/elon-musk 뻔하지 않은 시장 진입 리포트를 만들어줘. 기존 GTM 관행부터 의심해줘
```

부정 예시:

```bash
/research 이 뉴스 사실관계만 요약해줘
React hook 버그를 고쳐줘
```

경계 예시:

```bash
스타트업 점수 매겨줘
# 가정 해체를 명시하지 않았다면 startup-validator로 라우팅합니다.
```

</trigger_examples>

<support_file_read_order>

1. 다중 파일 실행을 시작하거나 재개하기 전에 [rules/execution.md](rules/execution.md)를 읽습니다.
2. 가정 분류 또는 The Algorithm 적용 전에 [references/frameworks.md](references/frameworks.md)를 읽습니다.
3. 돌파 옵션 생성 전에 [rules/idea-generation.md](rules/idea-generation.md)를 읽습니다.
4. `redesign.md`와 `execution.md` 작성 전에 [rules/report-synthesis.md](rules/report-synthesis.md)를 읽습니다.
5. `flow.json` 생성 또는 갱신 전에 [references/flow-schema.md](references/flow-schema.md)를 읽습니다.
6. 완료를 주장하기 전에 [rules/validation.md](rules/validation.md)를 읽습니다.

</support_file_read_order>

<input_check>

문제가 없으면 한 가지만 묻습니다:

`어떤 문제를 제1원칙으로 해체할까요?`

원하는 결과가 불명확하지만 문제는 명확하면, “최선의 다음 실험을 찾는 의사결정 리포트”를 기본값으로 진행합니다.

</input_check>

<core_guardrail>

프레임워크 스킬이지 인물 흉내 스킬이 아닙니다.

- “일론이 말하길”이 아니라 “Musk-style first-principles framework를 적용하면”처럼 표현합니다.
- 전제는 강하게 의심하되 사람을 공격하지 않습니다.
- 유명인의 관점, 경쟁사 행동, 업계 관행을 증거로 착각하지 않습니다.
- 속도와 긴급성을 제안할 때는 안전, 법률, 신뢰, 품질, 인간 비용의 가드레일을 반드시 둡니다.

</core_guardrail>

<owned_job>

각 실행에서 수행할 일:

1. 표면 질문이 아니라 진짜 의사결정을 재정의합니다.
2. 필요한 사실만 수집하고, 현재성이 중요한 사실은 출처를 남깁니다.
3. [references/frameworks.md](references/frameworks.md)의 A/B/C 모델로 가정을 분류합니다.
4. The Algorithm gate를 적용합니다: requirement 의심 → 삭제 → 단순화 → 가속 → 자동화.
5. [rules/idea-generation.md](rules/idea-generation.md)의 operator로 뻔하지 않은 옵션을 만듭니다.
6. [rules/report-synthesis.md](rules/report-synthesis.md)의 Mars-shot brief로 리포트를 정리합니다.
7. inversion, pre-mortem, 24시간 현실 테스트로 선호안을 검증합니다.
8. 완료 전에 [rules/validation.md](rules/validation.md)를 통과시킵니다.

</owned_job>

<document_shape>

## Output Structure

```text
.hypercore/elon-musk/[topic-slug]/
├── flow.json           # 단계 진행과 검증 상태
├── research.md         # 관행, 사실, 출처, 혁신 사례
├── assumptions.md      # A/B/C 매트릭스와 전제 공격
├── redesign.md         # Mars-shot brief, 옵션 포트폴리오, 점수화
└── execution.md        # Algorithm gate, inversion, pre-mortem, 24h test
```

- `[topic-slug]`는 ASCII kebab-case를 사용합니다.
- 기존 폴더가 있으면 완료된 단계를 반복하지 말고 이어서 진행합니다.
- 호환성을 위해 4개 출력 파일은 유지하고, 새 핵심 요약은 `redesign.md` 상단에 넣습니다.

</document_shape>

<workflow>

| Phase | Task | Output file |
|---|---|---|
| 1 | 진짜 의사결정 정의와 필요한 근거 수집 | `research.md` |
| 2 | 전제 공격과 A/B/C 분류 | `assumptions.md` |
| 3 | 살아남은 기본 진리에서 이상하지만 논리적인 옵션 생성 | `redesign.md` |
| 4 | 병목 선택, 리스크 검증, 다음 실험 정의 | `execution.md` |

Research rule:

- 현재 사실이 추천에 영향을 주면 조사하고 출처를 남깁니다.
- 개념적 문제라면 웹, MCP, 팀 워크플로우를 억지로 쓰지 않습니다.
- unknown은 반드시 조사 질문이나 실험으로 바꿉니다.

</workflow>

<output_contract>

각 파일은 다음을 포함해야 합니다:

- `research.md`: 문제 재정의, convention map, 현재 사실의 source ledger, 필요한 경우 혁신 사례
- `assumptions.md`: A/B/C matrix, Socratic premise attack, 삭제/방어한 관행, 테스트로 전환한 unknown
- `redesign.md`: Mars-shot brief, magic-wand target, 3-5개 대안, 최소 1개 non-obvious option, feasibility/impact/learning-speed score
- `execution.md`: Algorithm order gate, bottleneck, inversion, pre-mortem, safety guardrails, 24-hour reality test 또는 불가 사유

</output_contract>

<validation>

완료 전 확인:

- 최소 하나의 관행을 삭제하거나 명시적으로 방어했습니다.
- 최소 하나의 하드 제약이 보입니다.
- 최소 하나의 unknown이 조사 질문이나 실험으로 바뀌었습니다.
- 선호안이 삭제해야 할 것을 최적화/자동화하지 않습니다.
- 리포트에는 thesis, metric, bottleneck, next experiment, safety caveat가 있습니다.
- 현재 사실 주장은 출처가 있거나 assumption으로 표시되었습니다.
- 모든 출력 파일이 저장되고 `flow.json` status가 `completed`입니다.

</validation>
