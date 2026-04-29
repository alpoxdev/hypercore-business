---
name: image-generation
description: "[HyperB][Codex Only] HyperB 작업에서 제품, 마케팅, 콘텐츠, UI, 리서치 기반 장면 제작을 위해 현실적이고, 스톡 사진 같지 않고, AI 티가 나지 않는 맥락 맞춤형 래스터 이미지를 gpt-image-2로 생성하거나 편집한다. Codex가 사용자 요구사항을 영어 JSON 프롬프트로 변환하고, 생성 전 프롬프트를 검수한 뒤, Codex 이미지 생성 경로를 실행하고, 결과물을 현실성, 브랜드 적합성, 아티팩트, 텍스트 정확성, 저장 가능한 에셋 상태 기준으로 검증해야 할 때 사용한다."
compatibility: Codex 전용; Codex 이미지 생성 기능 또는 명시적인 gpt-image-2 API/CLI 경로가 필요하다.
metadata:
  author: HyperB
  version: "0.1.0"
---

@rules/natural-image-workflow.md
@references/gpt-image-2-research.md

# Image Generation

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

- 원하는 출력이 래스터 이미지가 아니라 SVG, 벡터, 코드 기반 UI인 경우
- 사용자가 이미지 생성 없이 프롬프트 작성만 명시적으로 원하는 경우
- 기존 로컬 SVG, HTML/CSS, 디자인 토큰 에셋을 결정론적으로 수정하는 편이 명확히 더 나은 경우
- 이미지 생성 산출물 없이 일반 웹 리서치만 필요한 경우

</routing_rule>

<execution_contract>

- Codex 전용: Codex 이미지 생성 기능 또는 프로젝트에서 승인된 imagegen 경로를 사용한다.
- 모델 요구사항: 이후 사용자 지시로 명시적으로 바뀌지 않는 한 모든 API/CLI 이미지 생성 또는 편집 호출은 반드시 `gpt-image-2`를 사용해야 한다.
- 프롬프트 파이프라인 요구사항: 원본 사용자 문구에서 즉시 생성하지 않는다. 항상 `사용자 요구사항 → 영어 JSON 프롬프트 → 프롬프트 검수 → 이미지 생성` 단계를 거친다.
- JSON 프롬프트 언어: 이미지 모델에 전달될 프롬프트 값은 모두 영어로 작성한다. 사용자에게 설명하는 메모는 한국어 또는 사용자의 언어로 작성해도 된다.
- 편의성, 투명 배경, 비용, 호환성 때문에 다른 이미지 모델로 조용히 다운그레이드하지 않는다.
- 투명 배경이 필요하지만 사용 가능한 경로에서 `gpt-image-2`가 네이티브 투명 배경을 제공하지 못하면, 불투명/크로마키 워크플로우를 사용하거나 다른 모델 사용 전에 요구사항 변경을 사용자에게 확인한다.
- 시스템 `imagegen` 스킬을 사용할 수 있으면 실행 helper로 취급한다. 이 스킬은 더 상위 수준의 HyperB 리서치, 아트 디렉션, 자연스러움 검수를 담당한다.

</execution_contract>

<trigger_examples>

긍정 예시:

- "HyperB 랜딩 페이지 히어로 이미지를 AI 티 안 나게 만들어줘."
- "gpt-image-2로 B2B SaaS 고객 사례용 자연스러운 사무실 사진 느낌 이미지를 생성해줘."
- "이 제품 설명을 읽고 상황에 맞는 블로그 대표 이미지를 리서치 기반으로 만들어줘."
- "광고용 이미지를 만들되 스톡 사진처럼 과장되지 않고 실제 촬영한 느낌이 나게 해줘."

부정 예시:

- "이 아이콘을 기존 SVG 스타일에 맞게 수정해줘." → SVG를 직접 수정한다.
- "이미지 생성은 하지 말고 Midjourney 프롬프트만 써줘." → 프롬프트 작성 작업만 수행한다.

경계 예시:

- "상품 페이지 이미지를 개선하고 싶어." 이미지 에셋 생성 또는 편집이 필요하면 이 스킬을 사용한다. UX 조언만 필요하면 리서치/디자인 가이드를 사용한다.

</trigger_examples>

<workflow>

1. **먼저 추론으로 명확화한다.** 대상 고객, 배치 위치, 화면비, 브랜드 톤, 주제, 필요한 문구, 에셋이 미리보기용인지 프로젝트 반영용인지 파악한다. 누락 정보 때문에 이미지가 크게 잘못될 때만 질문한다.
2. **상황을 리서치한다.** 낯선 도메인, 최신 제품, 시각 레퍼런스, 시장, 문화, 장소, 사실 기반 장면이 있으면 프롬프트 작성 전에 집중 리서치를 수행한다. 공식/제품 출처와 최신 시각 레퍼런스를 우선하고, 최종 메모에 출처를 기록한다.
3. **이미지 작업 유형을 정한다.** `generate`, `edit`, `reference-guided generate`, `batch/variants` 중 하나로 분류한다.
4. **아트 디렉션 브리프를 작성한다.** job-to-be-done, 시청자가 믿어야 할 내용, 장면, 주제, 카메라/구도, 조명, 재질/질감의 진실성, 제약, avoid 목록을 정의한다.
5. **요구사항을 영어 JSON 프롬프트로 변환한다.** 아래 스키마를 사용한다. 프롬프트 값은 영어로 유지하고, 사용자가 요청한 정확한 표시 문구는 그대로 보존하며, 가정은 명시적으로 인코딩한다.
6. **생성 전 JSON 프롬프트를 검수한다.** 유효한 JSON인지, 상황에 구체적인지, 일관적인지, 상충되지 않는지, 안전한지, `gpt-image-2`와 호환되는지 확인한다. 실패 항목이 있으면 이미지 생성 전에 JSON을 수정한다.
7. **자연스러움 규칙을 적용한다.** `rules/natural-image-workflow.md`를 로드하고, 선택한 촬영/디자인 스토리에 맞는 결함만 추가한다.
8. **`gpt-image-2`로 생성/편집한다.** 검수된 JSON 프롬프트를 단일 진실 공급원으로 사용한다. 초안은 `quality: low`, 최종 에셋은 `medium` 또는 `high`를 사용한다. 크기는 `gpt-image-2`에 유효해야 하며 `1024x1024`, `1536x1024`, `1024x1536`, 또는 배치 위치에 맞는 16의 배수 크기를 선호한다.
9. **전달 전 시각 검증을 수행한다.** 물리적 개연성, 조명, 해부학, 재질 반응, 텍스트, 브랜드 적합성, 아티팩트, generic/stock/AI 느낌 여부를 확인한다.
10. **좁게 반복한다.** 한 번에 하나의 실패 축만 변경한다: 기하, 조명, 재질, 촬영 아티팩트, 텍스트, 구도. 다음 생성 전에 JSON 프롬프트를 업데이트하고 다시 검수한다.
11. **의도적으로 저장한다.** 프로젝트 반영용 이미지라면 최종 파일을 워크스페이스 안으로 이동/복사하고 경로를 보고한다. 프로젝트에서 참조하는 에셋을 Codex/global generated-images 위치에만 남겨두지 않는다.
12. **프롬프트와 근거를 보고한다.** 최종 저장 경로, 모델(`gpt-image-2`), 품질/크기(알 수 있으면), 최종 검수된 JSON 프롬프트/브리프, 사용한 출처를 포함한다.

</workflow>

<json_prompt_pipeline>

프롬프트는 먼저 JSON으로 만들어야 한다. 유효한 JSON만 사용한다: 큰따옴표 키/문자열, 주석 없음, trailing comma 없음.

```json
{
  "model": "gpt-image-2",
  "task": "generate",
  "use_case": "landing hero | product context | editorial | social | UI mock | ad | illustration",
  "output": {
    "size": "1536x1024",
    "quality": "medium",
    "format": "png",
    "destination_intent": "preview | project-bound"
  },
  "user_requirements_summary": "English summary of the user's requirements and inferred constraints.",
  "audience_and_belief": "Who must believe what after seeing the image.",
  "placement": {
    "surface": "Where the image will be used.",
    "aspect_ratio_or_safe_zone": "Placement constraints and negative-space needs."
  },
  "research_anchors": [
    {
      "claim": "Source-derived visual or factual constraint.",
      "source": "URL or local file path"
    }
  ],
  "image_prompt": {
    "primary_request": "The actual image to create, in English.",
    "capture_or_design_story": "One coherent capture/design story.",
    "subject": "Main subject and exact attributes.",
    "scene_context": "Where it happens and why this setting makes sense.",
    "composition": "Camera position, crop, focal point, and negative space.",
    "lighting": "One dominant light source; optional secondary source only if needed.",
    "surface_truth": "Skin/fabric/product/material/environment texture cues.",
    "natural_imperfections": [
      "One plausible capture flaw or real-world imperfection.",
      "Optional second imperfection only if it fits the story."
    ],
    "text": {
      "verbatim": "",
      "placement": "",
      "typography_notes": ""
    },
    "must_keep": [
      "Identity, product proportions, brand colors, factual details, or layout invariants."
    ],
    "avoid": [
      "over-polished AI gloss",
      "generic stock-photo smiles",
      "impossible lighting",
      "waxy skin",
      "extra fingers",
      "warped logos",
      "unreadable text",
      "watermark"
    ]
  },
  "review_checklist": {
    "valid_json": true,
    "english_prompt_values": true,
    "single_coherent_capture_story": true,
    "gpt_image_2_compatible": true,
    "specific_to_user_context": true,
    "no_contradictory_lighting_or_lens_cues": true,
    "text_constraints_are_verbatim": true,
    "safety_and_rights_checked": true,
    "naturalism_checks_encoded": true
  },
  "generation_prompt": "A concise English prompt assembled from image_prompt after review."
}
```

프롬프트 검수 규칙:

- `review_checklist.valid_json`이 false이면 무엇보다 먼저 JSON을 고친다.
- 프롬프트에 전달될 값이 영어가 아니면 영어로 번역한다. 단, 사용자가 요청한 실제 표시 문구는 `image_prompt.text.verbatim`에 원문 그대로 보존한다.
- JSON이 여러 촬영/디자인 스토리를 섞고 있으면, 변형으로 분리하거나 가장 강한 단일 스토리를 선택한 뒤 생성한다.
- 사실 기반/최신/전문 장면인데 리서치 앵커가 없다면 먼저 리서치하거나, 리서치가 불필요한 이유를 표시한다.
- 모든 review checklist 값이 true이거나, 남은 리스크를 사용자가 명시적으로 수용하기 전에는 생성하지 않는다.

</json_prompt_pipeline>

<validation>

완료 전 다음 검사를 모두 통과한다:

- [ ] 모델 요구사항을 충족했다: 생성 경로에서 `gpt-image-2`를 사용했거나 명시적으로 지정했다.
- [ ] 사용자 요구사항을 생성 전에 유효한 영어 JSON 프롬프트로 변환했다.
- [ ] 이미지 생성 전에 JSON 프롬프트를 검수하고 수정했다.
- [ ] 이미지 브리프가 상황에 구체적이며 generic style-word soup가 아니다.
- [ ] 장면이 단순하고 비사실적이라 리서치를 생략한 경우를 제외하고, 리서치를 수행했다.
- [ ] 프롬프트가 상충되는 조명/렌즈 단서 없이 하나의 일관된 촬영/디자인 스토리를 사용한다.
- [ ] 자연스러움이 렌즈, 노출, 조명, 재질 질감, 맥락 연속성 같은 물리적 근거를 사용한다.
- [ ] 출력물을 일반적인 AI 티 기준으로 검사했다: 해부학, 손, 치아, 눈, 텍스트, 반복 패턴, 불가능한 그림자, 왜곡된 제품 디테일, 과도한 대칭, 스톡 사진 포즈.
- [ ] 프로젝트 반영용 이미지는 워크스페이스 안에 안정적이고 설명적인 파일명으로 저장했다.
- [ ] 최종 응답에 저장 경로, 검수된 JSON 프롬프트 또는 간결한 프롬프트 요약, 출처, 남은 리스크를 포함했다.

</validation>

<reference_map>

- `rules/natural-image-workflow.md`: AI 티가 덜 나는 맥락 맞춤 이미지 디렉션을 위한 실무 규칙.
- `references/gpt-image-2-research.md`: 출처 기반 리서치 종합과 링크.
- `.hypercore/research/2026-04-29-image-generation-naturalism.md`: 재사용 가능한 전체 리서치 보고서.

</reference_map>
