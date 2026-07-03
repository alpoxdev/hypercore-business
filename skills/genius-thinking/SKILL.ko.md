---
name: genius-thinking
description: "[Hyper] 일반 브레인스토밍이 너무 얕을 때, 막힌 제품·전략·혁신 문제를 위해 차별화된 아이디어를 생성하고 우선순위를 정합니다. .hypercore/genius-thinking/[topic-slug]/ 아래에 구조화된 다중 파일 분석을 저장하고 phase tracking을 유지합니다."
---

@rules/execution-rules.ko.md
@rules/output-discipline.ko.md
@references/formula-guide.ko.md
@references/output-template.ko.md
@references/flow-schema.ko.md

# Genius Thinking Skill

> 검증된 혁신 프레임워크 몇 가지를 조합해 다양한 선택지를 만들고, 명시적 근거로 우선순위를 정합니다. 결과는 이후 참조할 수 있도록 다중 파일 폴더로 정리합니다.

<output_language>
사용자가 요청한 언어를 기본으로 사용합니다. 별도 언어 요청이 없으면 사용자-facing 출력은 한국어로 작성하되, machine-readable 파일명, JSON key, phase name, path는 문서에 적힌 그대로 유지합니다.
</output_language>

<purpose>
일반 브레인스토밍이 얕거나 서로 비슷한 선택지만 만들 때, 막힌 제품·전략·시장·혁신 문제를 위해 차별화된 아이디어를 생성하고 우선순위를 정합니다.
</purpose>

<routing_rule>
제품, 전략, 시장, 혁신 과제에서 넓고 차별화된 아이데이션과 우선순위화가 함께 필요할 때 이 skill을 사용합니다. 단순 요약, 근거 없는 무작위 아이디어 목록, 이미 강한 선택지 사이의 최종 의사결정, 이미 선택된 아이디어의 실행 계획에는 사용하지 않습니다.
</routing_rule>

<instruction_contract>
| Field | Contract |
|---|---|
| Intent | 막히거나 평범해진 기회를 다양하고 우선순위가 정해진 아이디어 세트로 전환합니다. |
| Scope | 과제를 재정의하고, 적합한 혁신 프레임워크 2-3개를 선택하며, 아이디어 10개 이상을 생성하고, 가장 강한 선택지를 우선순위화합니다. |
| Authority | `.hypercore/genius-thinking/[topic-slug]/` 아래 실행 폴더만 생성하거나 업데이트하며, 관련 없는 프로젝트 파일은 수정하지 않습니다. |
| Evidence | 분석과 우선순위화에서 관찰 근거, 사용자 제공 사실, 추론을 분리합니다. |
| Tools | 아래 support file 순서에 따라 읽고, 병렬 아이데이션은 다양성을 실제로 높일 때만 사용합니다. |
| Loop | `flow.json`으로 phase 진행을 추적하고, 마지막 미완료 phase부터 재개하며, 완료된 phase를 다시 시작하지 않습니다. |
| Output | `.hypercore/genius-thinking/[topic-slug]/` 아래에 `frameworks.md`, `analysis.md`, `ideas.md`, `priorities.md`, 완료된 `flow.json`을 저장합니다. |
| Verification | 완료 전 프레임워크 적합성, 아이디어 다양성, 중복 방지, 근거 기반 순위, 다음 저비용 테스트를 점검합니다. |
| Stop condition | 모든 출력 파일이 존재하고, `flow.json`이 completed이며, 우선순위가 정해진 아이디어 세트가 사용자 검토 가능한 상태가 되면 멈춥니다. |
</instruction_contract>

<trigger_examples>

| Type | Example | Expected routing |
|---|---|---|
| Positive | `직장인을 위한 차별화된 AI 교육 아이디어를 생성해줘.` | 이 skill을 사용합니다. |
| Positive | `우리 스타트업의 고객 확보가 계속 평범한 SaaS 전술만 반복해. 완전히 다시 생각해줘.` | 이 skill을 사용합니다. |
| Positive | `경쟁사와 비슷해 보이는 헬스케어 앱의 과감한 제품 방향을 찾아줘.` | 이 skill을 사용합니다. |
| Negative | `새 아이디어를 더하지 말고 기존 제품 아이디어만 요약해줘.` | 사용하지 않고 요약합니다. |
| Negative | `우선순위나 근거 없이 무작위 아이디어 열 개만 줘.` | 우선순위와 근거가 허용되지 않으면 사용하지 않습니다. |
| Boundary | `이미 세 가지 강한 선택지가 있고 최종 결정만 필요해.` | 실제 문제가 약한 아이디어 생성이나 재프레이밍이 아니라면 의사결정 리뷰를 사용합니다. |

</trigger_examples>

<support_file_read_order>

1. 실행 폴더를 만들거나 업데이트하기 전에 `rules/execution-rules.ko.md`를 읽어 side effect를 문서화된 output path로 제한합니다.
2. 산출물을 작성하기 전에 `rules/output-discipline.ko.md`를 읽어 보고서가 구체적이고 구조적이며 근거를 구분하도록 합니다.
3. 프레임워크를 선택하고 아이디어 다양성을 점검할 때 `references/formula-guide.ko.md`를 읽습니다.
4. `frameworks.md`, `analysis.md`, `ideas.md`, `priorities.md`를 쓰기 전에 `references/output-template.ko.md`를 읽습니다.
5. `flow.json`을 생성, 업데이트, 재개하기 전에 `references/flow-schema.ko.md`를 읽습니다.

</support_file_read_order>

<workflow>

## 필수 입력

수집하거나 추론합니다:

- 문제 또는 기회 진술
- 대상 사용자 또는 시장
- 필요한 결정 또는 산출물
- 예산, 팀, 일정, 규제 같은 의미 있는 제약

## 핵심 작업

1. 문제를 다시 진술합니다.
2. 선택 근거와 함께 2-3개 프레임워크를 고릅니다.
3. 아이디어를 만들기 전에 기회를 재정의합니다.
4. 겉모습만 다른 변형이 아니라 실제로 다양한 아이디어 10개 이상을 생성합니다.
5. 근거 기반 우선순위로 최선의 선택지를 순위화합니다.

## 프레임워크 선택

작업에 맞는 프레임워크만 사용합니다. 일반 조합과 다양성 점검은 [references/formula-guide.ko.md](references/formula-guide.ko.md)에 있습니다.

<document_shape>

## 출력 구조

```text
.hypercore/genius-thinking/[topic-slug]/
├── flow.json           # phase tracking
├── frameworks.md       # 선택 공식 + 근거 + HMW 재정의
├── analysis.md         # 심층 분석(SCAMPER, TRIZ, JTBD 적용)
├── ideas.md            # 평가가 포함된 아이디어 10개 이상(제목, 설명, 점수)
└── priorities.md       # ERRC 검증 + 순위 + 다음 단계
```

- `[topic-slug]`에는 ASCII kebab-case를 사용합니다(예: `ai-education-service`).
- 각 phase는 정리된 참조를 위해 자체 파일을 생성합니다.
- `flow.json`은 phase 진행을 추적합니다. 스키마는 `references/flow-schema.ko.md`를 참고합니다.
- 이전 실행 폴더가 이미 있으면 업데이트하기 전에 기존 파일을 읽습니다.

</document_shape>

<flow_tracking>

## Flow Tracking

시작할 때 `flow.json`을 작성하고 각 phase가 완료될 때마다 업데이트합니다.

### Phase 진행

| Phase | Output file | Next |
|-------|-------------|------|
| `select` | `frameworks.md` — 선택 공식 + 근거 + HMW 재정의 | `analyze` |
| `analyze` | `analysis.md` — 깊이 있는 프레임워크 적용 | `ideate` |
| `ideate` | `ideas.md` — 평가가 포함된 아이디어 10개 이상 | `prioritize` |
| `prioritize` | `priorities.md` — ERRC 검증 + 순위 + 다음 단계 | done |

### 재개 지원

`flow.json`이 이미 있으면 읽고 마지막 미완료 phase부터 계속합니다. 완료된 phase를 다시 시작하지 않습니다.

</flow_tracking>

## 워크플로

| Phase | Goal | Output file |
|------|------|-------------|
| 1 | 과제 명확화 | (inline) |
| 2 | 프레임워크 선택 | `frameworks.md` |
| 3 | 심층 분석 + 기회 재정의 | `analysis.md` |
| 4 | 뚜렷하게 다른 방향의 아이디어 10개 이상 생성 | `ideas.md` |
| 5 | ERRC 검증으로 우선순위화 | `priorities.md` |

병렬 아이데이션은 선택 사항입니다. 커버리지를 실제로 높일 때만 사용합니다.

## 출력 요구사항

- 선택한 프레임워크의 근거를 포함합니다.
- 아이디어 세트의 다양성을 보여줍니다.
- 관찰된 근거와 추론을 분리합니다.
- 상위 아이디어가 다른 아이디어보다 앞서는 이유를 설명합니다.

전체 보고서와 아이디어 형식은 [references/output-template.ko.md](references/output-template.ko.md)를 사용합니다.

</workflow>

<validation>

- 딱딱한 글자 수 할당량을 강요하지 않습니다.
- 답을 바꾸지 않는 프레임워크 잡학을 쏟아내지 않습니다.
- 거의 중복인 아이디어를 별도 성과처럼 제시하지 않습니다.
- 가정과 다음 저비용 테스트 없이 아이디어를 우선순위화하지 않습니다.
- 모든 출력 파일은 `.hypercore/genius-thinking/[topic-slug]/` 아래에 저장해야 합니다.
- `flow.json` status는 `completed`로 설정해야 합니다.

</validation>
