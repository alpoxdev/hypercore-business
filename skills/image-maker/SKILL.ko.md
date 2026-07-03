---
name: image-maker
description: "[HyperB][Codex Only] HyperB 작업에서 제품, 마케팅, 콘텐츠, UI, 리서치 기반 장면 제작을 위해 현실적이고, 스톡 사진 같지 않고, AI 티가 나지 않는 맥락 맞춤형 래스터 이미지를 gpt-image-2로 생성하거나 편집한다. Codex가 사용자 요구사항을 영어 JSON 프롬프트로 변환하고, 생성 전 프롬프트를 검수한 뒤, Codex 이미지 생성 경로를 실행하고, 결과물을 검증하고, 안정적인 이미지 에셋을 아카이브하고, 로컬 preview.html을 만들고, 필요 시 새 Chrome 창에서 미리보기를 열어야 할 때 사용한다."
compatibility: Codex 전용; Codex 이미지 생성 기능 또는 명시적인 gpt-image-2 API/CLI 경로가 필요하다.
metadata:
  author: HyperB
  version: "0.1.2"
---

@rules/natural-image-workflow.ko.md
@references/gpt-image-2-research.ko.md
@references/json-prompt-best-practices.ko.md
@references/prompt-schema.ko.md

# Image Maker

<output_language>

계획 메모, 확인 질문, 최종 보고는 사용자의 언어로 답한다. 이미지 모델에 전달되는 JSON 프롬프트 값은 모두 영어로 유지하되, 사용자가 요청한 정확한 표시 문구는 `image_prompt.text.verbatim` 안에 원문 그대로 보존한다.

</output_language>

<purpose>

실제 HyperB 맥락에 맞게 촬영되었거나, 디자인되었거나, 의도적으로 일러스트레이션된 것처럼 보이는 상황 맞춤형 비트맵 이미지를 만든다. 이 스킬은 모호한 시각 요청을 리서치 기반 이미지 브리프로 바꾸고, 이를 영어 JSON 프롬프트로 변환한 뒤, 프롬프트를 검수하고, `gpt-image-2`로 생성 또는 편집하며, 프로젝트에 사용하기 전에 결과물을 검증한다.

</purpose>

<routing_rule>

사용자가 Codex에게 래스터 이미지 에셋을 생성, 편집, 준비해 달라고 요청하고, 결과물이 믿을 만하고 브랜드에 사용할 수 있으며 구체적인 비즈니스/콘텐츠 상황에 맞아야 할 때 이 스킬을 사용한다.

다음 표현이 요청에 포함되면 일반 이미지 생성보다 이 스킬을 우선한다:

- "AI 티 안 나게", "realistic", "natural", "authentic", "not stock", "not AI-looking"
- HyperB 마케팅, 비즈니스, 제품, 랜딩 페이지, 소셜, 아티클, 덱, 광고, UI 이미지
- 이미지 생성 전 리서치 기반 비주얼 디렉션
- `gpt-image-2`를 구체적으로 사용하라는 요청

다음 경우에는 이 스킬을 사용하지 않는다:

- 원하는 출력이 래스터 이미지가 아니라 SVG/벡터/코드 기반 UI인 경우
- 산출물이 주로 로고, favicon, 앱 아이콘, 투명 배경 브랜드 mark인 경우에는 `logo-maker`로 라우팅한다
- 사용자가 HyperB 리서치, JSON 검수, 아카이브, 미리보기 규율 없이 빠른 일반 이미지 생성을 원하면 `image-generation` 또는 일반 imagegen 경로를 사용한다
- 사용자가 이미지 생성 없이 프롬프트 작성만 명시적으로 원하는 경우
- 기존 로컬 SVG, HTML/CSS, 디자인 토큰 에셋을 결정론적으로 수정하는 편이 명확히 더 나은 경우
- 이미지 생성 산출물 없이 일반 웹 리서치만 필요한 경우

</routing_rule>

<instruction_contract>

| Field | Contract |
|---|---|
| Intent | 검수된 영어 JSON 프롬프트와 `gpt-image-2` 생성/편집 경로를 통해 믿을 만하고 맥락 맞춤형인 래스터 이미지 에셋을 만든다. |
| Scope | HyperB 이미지 에셋을 위한 래스터 이미지 생성, 이미지 편집, reference-guided generation, variant, archive 생성, local preview를 다룬다. 로고, SVG/vector/UI-code 수정, 프롬프트 작성만 하는 작업, archive와 preview 규율이 없는 일반 이미지 생성은 제외한다. |
| Authority | 사용자 요구사항 해석 후에는 검수된 JSON 프롬프트를 단일 진실 공급원으로 삼는다. 사용자 지시는 요구사항을 바꿀 수 있지만 `gpt-image-2`, archive, preview, validation 요구사항을 조용히 우회하지 않는다. |
| Evidence | 검수된 prompt, 생성 이미지 사본, helper output, archive listing, preview path, 알 수 있는 model/quality/size, 시각 검수 메모, 리서치가 필요했던 경우 source를 보존한다. |
| Tools | `gpt-image-2`에는 Codex 이미지 생성 기능 또는 프로젝트 승인 imagegen 경로를 사용한다. 로컬 생성 파일에는 `scripts/archive-generated-images.mjs`를 사용한다. 사용자가 결과 확인을 요청한 경우에만 helper를 통해 Chrome preview를 연다. |
| Loop | 생성 전 JSON을 검수하고, 시각 결과를 검증한 뒤, 실패한 한 가지 축만 좁게 수정해 반복한다. archive와 preview가 validation checklist를 만족하거나 blocker를 보고할 때까지 진행한다. |
| Output | 최종 archive path, preview path, Chrome open 여부, model, 알 수 있는 quality/size, 간결한 prompt/brief summary, 사용 source, 복사한 project asset path가 있으면 그 경로, 남은 risk를 보고한다. |
| Verification | 유효한 영어 JSON prompt, `gpt-image-2` model 사용, archive의 `prompt.json`, 기대한 `imageN.*` 파일, local `preview.html`, 생성 asset이 global/temp Codex 위치에만 남지 않았는지 확인한다. |
| Stop condition | 검수된 JSON prompt, 생성/편집 output, archive, preview, visual validation이 모두 통과하면 멈춘다. 그 전에는 권한 부족, 생성 경로 차단, unsafe request, 또는 사용자가 명시적으로 수용한 unresolved risk가 있을 때만 멈춘다. |

</instruction_contract>

<support_file_read_order>

1. 모델 동작, 지원 generation setting, quality/size 선택, provider-sensitive claim이 작업에 영향을 주면 `references/gpt-image-2-research.ko.md`를 읽는다.
2. 영어 JSON prompt 구조를 만들거나 바꾸기 전에 `references/prompt-schema.ko.md`와 `references/json-prompt-best-practices.ko.md`를 읽는다.
3. naturalism, realism, anti-AI-looking capture detail을 추가하기 전에 `rules/natural-image-workflow.ko.md`를 읽는다.
4. 생성/편집 후 로컬 generated image path 또는 latest-output count를 알 수 있으면 `scripts/archive-generated-images.mjs`를 사용하고, 최종 응답 전에 helper output과 archive listing을 검사한다.
5. Preview rendering을 디버깅하는 경우가 아니면 `assets/image-preview-template.html`은 archive helper를 통해서만 사용한다.
6. 간결한 reference를 넘어 더 깊은 근거 또는 source context가 필요하면 `.hypercore/research/2026-04-29-image-maker-naturalism.md`와 `.hypercore/research/2026-04-29-json-prompt-best-practices-for-image-maker.md`를 사용한다.

</support_file_read_order>

<execution_contract>

- Codex 전용: Codex 이미지 생성 기능 또는 프로젝트에서 승인된 imagegen 경로를 사용한다.
- 모델 요구사항: 이후 사용자 지시로 명시적으로 바뀌지 않는 한 모든 API/CLI 이미지 생성 또는 편집 호출은 반드시 `gpt-image-2`를 사용해야 한다.
- 프롬프트 파이프라인 요구사항: 원본 사용자 문구에서 즉시 생성하지 않는다. 항상 `사용자 요구사항 → 영어 JSON 프롬프트 → 프롬프트 검수 → 이미지 생성` 단계를 거친다.
- JSON 프롬프트 언어: 이미지 모델에 전달될 프롬프트 값은 모두 영어로 작성한다. 사용자에게 설명하는 메모는 한국어 또는 사용자의 언어로 작성해도 된다.
- 편의성, 투명 배경, 비용, 호환성 때문에 다른 이미지 모델로 조용히 다운그레이드하지 않는다.
- 투명 배경이 필요하지만 사용 가능한 경로에서 `gpt-image-2`가 네이티브 투명 배경을 제공하지 못하면, 불투명/크로마키 워크플로우를 사용하거나 다른 모델 사용 전에 요구사항 변경을 사용자에게 확인한다.
- 시스템 `imagegen` 스킬을 사용할 수 있으면 실행 helper로 취급한다. 이 스킬은 더 상위 수준의 HyperB 리서치, 아트 디렉션, 자연스러움 검수를 담당한다.
- 아카이브 요구사항: 생성/편집이 끝날 때마다 `.hypercore/image-maker/<topic-slug>/`를 만들고, 검수된 프롬프트를 `prompt.json`으로 저장한 뒤, `~/.codex/generated-images` 또는 반환된 이미지 경로의 결과물을 같은 폴더에 `image1.png`, `image2.png`, `image3.png`, ... 형식으로 복사한 다음에만 완료를 보고한다.
- 미리보기 요구사항: 완료된 모든 archive에는 로컬 preview template로 생성한 `.hypercore/image-maker/<topic-slug>/preview.html`이 있어야 한다. 사용자가 결과 확인을 원하거나 결과를 보여 달라고 한 작업에서는 로컬 helper로 해당 preview를 새 Google Chrome 창/탭에서 연다. 현재 환경에서 Chrome을 열 수 없으면 실패를 숨기지 말고 `preview.html` 경로와 open command를 보고한다.

</execution_contract>

<trigger_examples>

긍정 예시:

- "HyperB 랜딩 페이지 히어로 이미지를 AI 티 안 나게 만들어줘."
- "gpt-image-2로 B2B SaaS 고객 사례용 자연스러운 사무실 사진 느낌 이미지를 생성해줘."
- "이 제품 설명을 읽고 상황에 맞는 블로그 대표 이미지를 리서치 기반으로 만들어줘."
- "광고용 이미지를 만들되 스톡 사진처럼 과장되지 않고 실제 촬영한 느낌이 나게 해줘."
- "이미지를 생성한 다음 preview.html로 저장하고 크롬에서 바로 보여줘."

부정 예시:

- "이 아이콘을 기존 SVG 스타일에 맞게 수정해줘." → SVG를 직접 수정한다.
- "이미지 생성은 하지 말고 Midjourney 프롬프트만 써줘." → 프롬프트 작성 작업만 수행한다.
- "투명 배경 로고 PNG를 만들어줘." → 로고/favicon/브랜드 mark는 `logo-maker`를 사용한다.
- "빠르게 아무 이미지나 하나 생성해줘." → HyperB급 리서치, 아카이브, preview가 필요하지 않으면 일반 `image-generation`/imagegen을 사용한다.

경계 예시:

- "상품 페이지 이미지를 개선하고 싶어." 이미지 에셋 생성 또는 편집이 필요하면 이 스킬을 사용한다. UX 조언만 필요하면 리서치/디자인 가이드를 사용한다.

</trigger_examples>

<workflow>

1. **먼저 추론으로 명확화한다.** 대상 고객, 배치 위치, 화면비, 브랜드 톤, 주제, 필요한 문구, 에셋이 미리보기용인지 프로젝트 반영용인지 파악한다. 누락 정보 때문에 이미지가 크게 잘못될 때만 질문한다.
2. **상황을 리서치한다.** 낯선 도메인, 최신 제품, 시각 레퍼런스, 시장, 문화, 장소, 사실 기반 장면이 있으면 프롬프트 작성 전에 집중 리서치를 수행한다. 공식/제품 출처와 최신 시각 레퍼런스를 우선하고, 최종 메모에 출처를 기록한다.
3. **이미지 작업 유형을 정한다.** `generate`, `edit`, `reference-guided generate`, `batch/variants` 중 하나로 분류한다.
4. **아트 디렉션 브리프를 작성한다.** job-to-be-done, 시청자가 믿어야 할 내용, 장면, 주제, 카메라/구도, 조명, 재질/질감의 진실성, 제약, avoid 목록을 정의한다.
5. **요구사항을 영어 JSON 프롬프트로 변환한다.** `references/prompt-schema.ko.md`와 `references/json-prompt-best-practices.ko.md`를 사용한다. JSON을 단순 API payload가 아니라 검수 가능한 planning artifact로 취급한다. 프롬프트 값은 영어로 유지하고, 사용자가 요청한 정확한 표시 문구는 그대로 보존하며, 가정은 명시적으로 인코딩한다.
6. **생성 전 JSON 프롬프트를 검수한다.** JSON을 파싱하고, 필수 필드를 확인하고, 필요 시 source/reference role과 edit invariant를 검증하며, 상황에 구체적인지, 일관적인지, 상충되지 않는지, 안전한지, `gpt-image-2`와 호환되는지 확인한다. 실패 항목이 있으면 이미지 생성 전에 JSON을 수정한다.
7. **자연스러움 규칙을 적용한다.** `rules/natural-image-workflow.ko.md`를 로드하고, 선택한 촬영/디자인 스토리에 맞는 결함만 추가한다.
8. **`gpt-image-2`로 생성/편집한다.** 검수된 JSON 프롬프트를 단일 진실 공급원으로 사용한다. 초안은 `quality: low`, 최종 에셋은 `medium` 또는 `high`를 사용한다. 크기는 `gpt-image-2`에 유효해야 하며 `1024x1024`, `1536x1024`, `1024x1536`, 또는 배치 위치에 맞는 16의 배수 크기를 선호한다.
9. **전달 전 시각 검증을 수행한다.** 물리적 개연성, 조명, 해부학, 재질 반응, 텍스트, 브랜드 적합성, 아티팩트, generic/stock/AI 느낌 여부를 확인한다.
10. **좁게 반복한다.** 한 번에 하나의 실패 축만 변경한다: 기하, 조명, 재질, 촬영 아티팩트, 텍스트, 구도. 다음 생성 전에 JSON 프롬프트를 업데이트하고 다시 검수한다.
11. **의도적으로 아카이브한다.** 각 이미지 작업마다 설명적인 topic slug를 정하고 `.hypercore/image-maker/<topic-slug>/`를 만든다. 최종 검수된 JSON 프롬프트를 `.hypercore/image-maker/<topic-slug>/prompt.json`으로 저장한 뒤, 생성/편집된 모든 출력물을 `~/.codex/generated-images` 또는 이미지 생성 반환 경로에서 같은 폴더로 복사해 생성 순서대로 `image1.png`, `image2.png`, `image3.png`, ...로 저장한다. 로컬 파일 경로를 알 수 있으면 `scripts/archive-generated-images.mjs`를 사용한다. 반환 포맷이 실제로 `jpeg` 또는 `webp`이면 `.png`로 위장하지 말고 실제 확장자를 유지한다. 앱 코드나 커밋 대상 asset으로도 써야 하면 `.hypercore/image-maker/<topic-slug>/` 아카이브를 보존한 뒤 별도 프로젝트 asset 경로로 복사한다. 프로젝트에서 참조하는 에셋을 Codex/global generated-images 위치에만 남겨두지 않는다.
12. **미리보기를 만들고 보여준다.** Archive에 `assets/image-preview-template.html`에서 렌더링된 `preview.html`이 있는지 확인한다. 사용자가 완성 결과를 보길 원하면 `--open-preview`를 사용해 새 Google Chrome 창을 로컬 preview로 연다. Chrome 열기에 실패하면 preview 파일은 유지하고 정확한 경로와 열기 command를 포함한다.
13. **아카이브와 미리보기를 검증한다.** 완료 보고 전 archive directory를 listing해서 `prompt.json`, `preview.html`, 기대한 모든 `imageN.*` 파일이 존재하는지 확인한다.
14. **프롬프트와 근거를 보고한다.** 최종 archive 경로, preview 경로, Chrome을 열었는지 여부, 모델(`gpt-image-2`), 품질/크기(알 수 있으면), 최종 검수된 JSON 프롬프트/브리프, 사용한 출처, 앱/public asset 사본 경로를 포함한다.

</workflow>

<archive_helper>

이미지 생성 경로가 파일을 `~/.codex/generated-images` 아래에 저장하면, 수동 rename에 의존하지 말고 즉시 로컬 helper로 아카이브한다:

```bash
node skills/image-maker/scripts/archive-generated-images.mjs \
  --topic "descriptive topic" \
  --prompt /path/to/reviewed-prompt.json \
  --images ~/.codex/generated-images/generated-1.png ~/.codex/generated-images/generated-2.png \
  --open-preview
```

Helper는 기본적으로 `assets/image-preview-template.html`에서 `preview.html`을 작성한다. 완성 이미지를 즉시 보여줘야 하면 `--open-preview`로 새 Google Chrome 창/탭에서 연다. 시각 확인이 필요 없는 batch, CI, Chrome이 없는 환경에서는 생략한다. 정확한 생성 파일 경로가 출력되지 않았지만 결과 개수를 알고 있으면, 생성 직후 `--latest <n>`을 사용해 최신 생성 파일을 `.hypercore/image-maker/<topic-slug>/` 안의 `image1.*`, `image2.*`, ...로 복사한다. 최종 응답 전 helper 출력과 directory listing을 반드시 확인한다.

</archive_helper>

<json_prompt_pipeline>

프롬프트는 먼저 JSON으로 만들어야 한다. 유효한 JSON만 사용한다: 큰따옴표 키/문자열, 주석 없음, trailing comma 없음. JSON은 최종 모델-facing prompt의 검수된 source of truth이며, 단순한 Image API request body가 아니다.

이 구조를 만들거나 변경할 때는 `references/json-prompt-best-practices.ko.md`를 로드한다. Best-practice gate:

- API/output settings와 creative direction을 분리한다.
- 안정적인 `schema_version`을 사용하고, 검수하기 쉽도록 key order를 유지한다.
- assumptions, unknowns, source inputs, research anchors를 명시적으로 기록한다.
- edit/reference-guided generation에서는 각 input의 role과 바뀌면 안 되는 invariant를 적는다.
- 정확한 표시 문구는 `image_prompt.text.verbatim`에만 넣고, 그 안에서는 사용자가 요청한 언어를 보존한다.
- `generation_prompt`는 review checklist가 통과된 뒤에만 조립한다.

`references/prompt-schema.ko.md`를 canonical prompt schema로 사용한다. Core review contract는 다음과 같다:

- 필수 field group: `schema_version`, `model`, `task`, `use_case`, `generation_settings`, `artifact_archive`, `user_requirements_summary`, `assumptions`, `source_inputs`, `placement`, `research_anchors`, `image_prompt`, `edit_plan`, `review_checklist`, `review_notes`, `generation_prompt`.
- 새 생성 작업에서는 `edit_plan`을 `null`로 둘 수 있다. edit/reference-guided 작업에서는 `edit_plan.change_only`, `edit_plan.preserve`, `edit_plan.allowed_drift`, 그리고 필요 시 mask/selection note를 채운다.
- `source_inputs`는 생성 전에 각 reference의 role과 invariant를 명명해야 한다.
- `generation_prompt`는 review checklist가 통과된 뒤에만 조립한다.

프롬프트 검수 규칙:

- `review_checklist.valid_json`이 false이면 무엇보다 먼저 JSON을 고친다.
- 필수 필드가 비어 있으면 구체적인 assumption으로 채우거나, 그 공백이 non-blocking인 이유를 적는다.
- 프롬프트에 전달될 값이 영어가 아니면 영어로 번역한다. 단, 사용자가 요청한 실제 표시 문구는 `image_prompt.text.verbatim`에 원문 그대로 보존한다.
- JSON이 여러 촬영/디자인 스토리를 섞고 있으면, 변형으로 분리하거나 가장 강한 단일 스토리를 선택한 뒤 생성한다.
- 사실 기반/최신/전문 장면인데 `research_anchors`가 없다면 먼저 리서치하거나, 리서치가 불필요한 이유를 표시한다.
- source image가 있는데 `source_inputs`에 role/invariant가 없다면 생성 전에 추가한다.
- 모든 review checklist 값이 true이거나, 남은 리스크를 사용자가 명시적으로 수용하기 전에는 생성하지 않는다.

</json_prompt_pipeline>

<validation>

완료 전 다음 검사를 모두 통과한다:

- [ ] 모델 요구사항을 충족했다: 생성 경로에서 `gpt-image-2`를 사용했거나 명시적으로 지정했다.
- [ ] 사용자 요구사항을 생성 전에 유효한 영어 JSON 프롬프트로 변환했다.
- [ ] JSON 프롬프트를 성공적으로 파싱했고 `references/json-prompt-best-practices.ko.md`의 안정적인 schema를 따른다.
- [ ] 이미지 생성 전에 JSON 프롬프트를 검수하고 수정했다.
- [ ] reference-guided 또는 edit 작업에는 source-input role, edit invariant, 명시적인 preserve/change-only constraint가 있다.
- [ ] 이미지 브리프가 상황에 구체적이며 generic style-word soup가 아니다.
- [ ] 장면이 단순하고 비사실적이라 리서치를 생략한 경우를 제외하고, 리서치를 수행했다.
- [ ] 프롬프트가 상충되는 조명/렌즈 단서 없이 하나의 일관된 촬영/디자인 스토리를 사용한다.
- [ ] 자연스러움이 렌즈, 노출, 조명, 재질 질감, 맥락 연속성 같은 물리적 근거를 사용한다.
- [ ] 출력물을 일반적인 AI 티 기준으로 검사했다: 해부학, 손, 치아, 눈, 텍스트, 반복 패턴, 불가능한 그림자, 왜곡된 제품 디테일, 과도한 대칭, 스톡 사진 포즈.
- [ ] 모든 생성/편집 작업은 `.hypercore/image-maker/<topic-slug>/` 아래 안정적인 archive directory를 갖는다.
- [ ] archive에는 검수된 프롬프트가 `.hypercore/image-maker/<topic-slug>/prompt.json`으로 저장되어 있다.
- [ ] 생성/편집된 모든 이미지는 archive 안에 `image1.png`, `image2.png`, `image3.png`, ... 또는 non-PNG 출력의 실제 확장자로 안정적인 사본을 갖는다.
- [ ] archive에는 `assets/image-preview-template.html`에서 생성된 `preview.html`이 있고, local relative path로 archive 이미지를 렌더링한다.
- [ ] 사용자가 결과를 보여 달라고 했다면 `preview.html`을 새 Google Chrome 창/탭에서 열었거나, 실패와 정확한 open command를 보고했다.
- [ ] 생성 이미지가 `~/.codex/generated-images` 또는 다른 Codex global/temp 위치에만 남아 있지 않다.
- [ ] 앱 코드에서 참조해야 하는 project-bound 이미지는 필요 시 적절한 tracked/public asset 경로로도 복사했다.
- [ ] 최종 응답에 저장 경로, 검수된 JSON 프롬프트 또는 간결한 프롬프트 요약, 출처, 남은 리스크를 포함했다.

</validation>

<reference_map>

- `rules/natural-image-workflow.ko.md`: AI 티가 덜 나는 맥락 맞춤 이미지 디렉션을 위한 한국어 실무 규칙.
- `references/gpt-image-2-research.ko.md`: 출처 기반 `gpt-image-2` 모델 사실과 링크의 한국어 mirror.
- `references/json-prompt-best-practices.ko.md`: 리서치 기반 JSON prompt schema, review gate, source map의 한국어 mirror.
- `references/prompt-schema.ko.md`: full JSON prompt example과 edit/reference-guided `edit_plan` 구조의 한국어 mirror.
- `scripts/archive-generated-images.mjs`: 검수된 prompt와 생성 이미지 파일을 `.hypercore/image-maker/<topic-slug>/prompt.json` 및 `imageN.*`로 복사하는 결정론적 helper.
- `assets/image-preview-template.html`: archive helper가 `.hypercore/image-maker/<topic-slug>/preview.html`로 렌더링하는 로컬 self-contained preview template.
- `.hypercore/research/2026-04-29-image-maker-naturalism.md`: 재사용 가능한 naturalism/model 리서치 보고서.
- `.hypercore/research/2026-04-29-json-prompt-best-practices-for-image-maker.md`: JSON prompt best-practice 리서치 보고서.

</reference_map>
