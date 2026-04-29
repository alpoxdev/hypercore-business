---
name: image-generation
description: "[HyperB][Codex Only] HyperB 작업에서 제품, 마케팅, 콘텐츠, UI, 리서치 기반 장면 제작을 위해 현실적이고, 스톡 사진 같지 않고, AI 티가 나지 않는 맥락 맞춤형 래스터 이미지를 gpt-image-2로 생성하거나 편집한다. Codex가 사용자 요구사항을 영어 JSON 프롬프트로 변환하고, 생성 전 프롬프트를 검수한 뒤, Codex 이미지 생성 경로를 실행하고, 결과물을 현실성, 브랜드 적합성, 아티팩트, 텍스트 정확성, 저장 가능한 에셋 상태 기준으로 검증해야 할 때 사용한다."
compatibility: Codex 전용; Codex 이미지 생성 기능 또는 명시적인 gpt-image-2 API/CLI 경로가 필요하다.
metadata:
  author: HyperB
  version: "0.1.1"
---

@rules/natural-image-workflow.ko.md
@references/gpt-image-2-research.ko.md
@references/json-prompt-best-practices.ko.md

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
- 아카이브 요구사항: 생성/편집이 끝날 때마다 `.hypercore/image-generation/<topic-slug>/`를 만들고, 검수된 프롬프트를 `prompt.json`으로 저장한 뒤, `~/.codex/generated-images` 또는 반환된 이미지 경로의 결과물을 같은 폴더에 `image1.png`, `image2.png`, `image3.png`, ... 형식으로 복사한 다음에만 완료를 보고한다.

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
5. **요구사항을 영어 JSON 프롬프트로 변환한다.** 아래 스키마와 `references/json-prompt-best-practices.ko.md`를 사용한다. JSON을 단순 API payload가 아니라 검수 가능한 planning artifact로 취급한다. 프롬프트 값은 영어로 유지하고, 사용자가 요청한 정확한 표시 문구는 그대로 보존하며, 가정은 명시적으로 인코딩한다.
6. **생성 전 JSON 프롬프트를 검수한다.** JSON을 파싱하고, 필수 필드를 확인하고, 필요 시 source/reference role과 edit invariant를 검증하며, 상황에 구체적인지, 일관적인지, 상충되지 않는지, 안전한지, `gpt-image-2`와 호환되는지 확인한다. 실패 항목이 있으면 이미지 생성 전에 JSON을 수정한다.
7. **자연스러움 규칙을 적용한다.** `rules/natural-image-workflow.ko.md`를 로드하고, 선택한 촬영/디자인 스토리에 맞는 결함만 추가한다.
8. **`gpt-image-2`로 생성/편집한다.** 검수된 JSON 프롬프트를 단일 진실 공급원으로 사용한다. 초안은 `quality: low`, 최종 에셋은 `medium` 또는 `high`를 사용한다. 크기는 `gpt-image-2`에 유효해야 하며 `1024x1024`, `1536x1024`, `1024x1536`, 또는 배치 위치에 맞는 16의 배수 크기를 선호한다.
9. **전달 전 시각 검증을 수행한다.** 물리적 개연성, 조명, 해부학, 재질 반응, 텍스트, 브랜드 적합성, 아티팩트, generic/stock/AI 느낌 여부를 확인한다.
10. **좁게 반복한다.** 한 번에 하나의 실패 축만 변경한다: 기하, 조명, 재질, 촬영 아티팩트, 텍스트, 구도. 다음 생성 전에 JSON 프롬프트를 업데이트하고 다시 검수한다.
11. **의도적으로 아카이브한다.** 각 이미지 작업마다 설명적인 topic slug를 정하고 `.hypercore/image-generation/<topic-slug>/`를 만든다. 최종 검수된 JSON 프롬프트를 `.hypercore/image-generation/<topic-slug>/prompt.json`으로 저장한 뒤, 생성/편집된 모든 출력물을 `~/.codex/generated-images` 또는 이미지 생성 반환 경로에서 같은 폴더로 복사해 생성 순서대로 `image1.png`, `image2.png`, `image3.png`, ...로 저장한다. 로컬 파일 경로를 알 수 있으면 `scripts/archive-generated-images.mjs`를 사용한다. 반환 포맷이 실제로 `jpeg` 또는 `webp`이면 `.png`로 위장하지 말고 실제 확장자를 유지한다. 앱 코드나 커밋 대상 asset으로도 써야 하면 `.hypercore/image-generation/<topic-slug>/` 아카이브를 보존한 뒤 별도 프로젝트 asset 경로로 복사한다. 프로젝트에서 참조하는 에셋을 Codex/global generated-images 위치에만 남겨두지 않는다.
12. **아카이브를 검증한다.** 완료 보고 전 archive directory를 listing해서 `prompt.json`과 기대한 모든 `imageN.*` 파일이 존재하는지 확인한다.
13. **프롬프트와 근거를 보고한다.** 최종 archive 경로, 모델(`gpt-image-2`), 품질/크기(알 수 있으면), 최종 검수된 JSON 프롬프트/브리프, 사용한 출처, 앱/public asset 사본 경로를 포함한다.

</workflow>

<archive_helper>

이미지 생성 경로가 파일을 `~/.codex/generated-images` 아래에 저장하면, 수동 rename에 의존하지 말고 즉시 로컬 helper로 아카이브한다:

```bash
node skills/image-generation/scripts/archive-generated-images.mjs \
  --topic "descriptive topic" \
  --prompt /path/to/reviewed-prompt.json \
  --images ~/.codex/generated-images/generated-1.png ~/.codex/generated-images/generated-2.png
```

정확한 생성 파일 경로가 출력되지 않았지만 결과 개수를 알고 있으면, 생성 직후 `--latest <n>`을 사용해 최신 생성 파일을 `.hypercore/image-generation/<topic-slug>/` 안의 `image1.*`, `image2.*`, ...로 복사한다. 최종 응답 전 helper 출력과 directory listing을 반드시 확인한다.

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

```json
{
  "schema_version": "1.1",
  "model": "gpt-image-2",
  "task": "generate",
  "use_case": "landing hero",
  "generation_settings": {
    "api_path": "image_api",
    "size": "1536x1024",
    "quality": "medium",
    "format": "png",
    "background": "opaque",
    "destination_intent": "project-bound",
    "save_path": ".hypercore/image-generation/descriptive-topic/image1.png",
    "archive_dir": ".hypercore/image-generation/descriptive-topic",
    "prompt_path": ".hypercore/image-generation/descriptive-topic/prompt.json"
  },
  "artifact_archive": {
    "topic": "Human-readable topic for this generation job.",
    "topic_slug": "descriptive-topic",
    "prompt_path": ".hypercore/image-generation/descriptive-topic/prompt.json",
    "image_paths": [
      ".hypercore/image-generation/descriptive-topic/image1.png"
    ],
    "source_generated_images_dir": "~/.codex/generated-images"
  },
  "user_requirements_summary": "English summary of the user's requirements and inferred constraints.",
  "assumptions": [
    "Assumption made because the user did not specify a placement, audience, source image, or brand constraint."
  ],
  "source_inputs": [
    {
      "id": "image_1",
      "type": "local_file | url | generated_reference | none",
      "role": "subject_reference | style_reference | product_reference | background_reference | mask",
      "path_or_url": "",
      "must_preserve": [
        "Identity, geometry, label text, brand color, layout, or lighting invariant from this source."
      ]
    }
  ],
  "audience_and_belief": "Who must believe what after seeing the image.",
  "placement": {
    "surface": "Where the image will be used.",
    "aspect_ratio_or_safe_zone": "Placement constraints, crop tolerance, and negative-space needs."
  },
  "research_anchors": [
    {
      "claim": "Source-derived visual, factual, cultural, product, or market constraint.",
      "source": "URL or local file path"
    }
  ],
  "image_prompt": {
    "primary_request": "The actual image to create, in English.",
    "capture_or_design_story": "One coherent capture/design story; do not mix contradictory photo, studio, and illustration modes.",
    "subject": "Main subject and exact attributes.",
    "scene_context": "Where it happens, why this setting makes sense, and what is outside the frame.",
    "composition": "Camera position, crop, focal point, perspective, and negative space.",
    "lighting": "One dominant light source with direction, softness/hardness, and color temperature if relevant.",
    "surface_truth": "Skin, fabric, product, paper, glass, metal, screen, or environmental texture cues.",
    "natural_imperfections": [
      "One plausible capture flaw or real-world imperfection that fits the story.",
      "Optional second imperfection only if it supports realism rather than becoming an effect."
    ],
    "text": {
      "verbatim": "",
      "placement": "",
      "typography_notes": "",
      "text_risk": "none | low | medium | high"
    },
    "must_keep": [
      "Identity, product proportions, brand colors, factual details, layout invariants, or exact source-image details."
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
  "edit_plan": null,
  "review_checklist": {
    "valid_json": true,
    "schema_fields_complete": true,
    "english_prompt_values_except_verbatim_text": true,
    "single_coherent_capture_or_design_story": true,
    "generation_settings_gpt_image_2_compatible": true,
    "source_inputs_have_roles_and_invariants": true,
    "specific_to_user_context": true,
    "no_contradictory_lighting_lens_or_style_cues": true,
    "text_constraints_are_verbatim_and_inspectable": true,
    "safety_rights_and_brand_risks_checked": true,
    "naturalism_checks_encoded": true
  },
  "review_notes": {
    "prompt_strengths": [
      "Why this prompt is likely to produce a usable image."
    ],
    "unresolved_risks": [
      "Known risk such as exact text, layout precision, brand consistency, factual uncertainty, or likeness rights."
    ],
    "iteration_strategy_if_failed": "Change only one dimension next: geometry, lighting, material, text, composition, or edit invariant."
  },
  "generation_prompt": "A concise English prompt assembled from image_prompt, source inputs, edit invariants, and constraints after review."
}
```

edit/reference-guided 작업에서는 `"edit_plan": null`을 다음 구조로 바꾼다:

```json
{
  "change_only": [
    "Specific object, background, text, garment, lighting, or composition element allowed to change."
  ],
  "preserve": [
    "Identity, pose, camera angle, product geometry, label text, surrounding objects, or layout that must remain unchanged."
  ],
  "allowed_drift": "none | minimal | moderate",
  "mask_or_selection_notes": "How mask/reference boundaries should be interpreted, if applicable."
}
```

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
- [ ] 모든 생성/편집 작업은 `.hypercore/image-generation/<topic-slug>/` 아래 안정적인 archive directory를 갖는다.
- [ ] archive에는 검수된 프롬프트가 `.hypercore/image-generation/<topic-slug>/prompt.json`으로 저장되어 있다.
- [ ] 생성/편집된 모든 이미지는 archive 안에 `image1.png`, `image2.png`, `image3.png`, ... 또는 non-PNG 출력의 실제 확장자로 안정적인 사본을 갖는다.
- [ ] 생성 이미지가 `~/.codex/generated-images` 또는 다른 Codex global/temp 위치에만 남아 있지 않다.
- [ ] 앱 코드에서 참조해야 하는 project-bound 이미지는 필요 시 적절한 tracked/public asset 경로로도 복사했다.
- [ ] 최종 응답에 저장 경로, 검수된 JSON 프롬프트 또는 간결한 프롬프트 요약, 출처, 남은 리스크를 포함했다.

</validation>

<reference_map>

- `rules/natural-image-workflow.ko.md`: AI 티가 덜 나는 맥락 맞춤 이미지 디렉션을 위한 한국어 실무 규칙.
- `references/gpt-image-2-research.ko.md`: 출처 기반 `gpt-image-2` 모델 사실과 링크의 한국어 mirror.
- `references/json-prompt-best-practices.ko.md`: 리서치 기반 JSON prompt schema, review gate, source map의 한국어 mirror.
- `scripts/archive-generated-images.mjs`: 검수된 prompt와 생성 이미지 파일을 `.hypercore/image-generation/<topic-slug>/prompt.json` 및 `imageN.*`로 복사하는 결정론적 helper.
- `.hypercore/research/2026-04-29-image-generation-naturalism.md`: 재사용 가능한 naturalism/model 리서치 보고서.
- `.hypercore/research/2026-04-29-json-prompt-best-practices-for-image-generation.md`: JSON prompt best-practice 리서치 보고서.

</reference_map>
