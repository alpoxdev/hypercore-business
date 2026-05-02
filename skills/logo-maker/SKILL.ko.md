---
name: logo-maker
description: "[HyperB][Codex Only] 브랜드, 제품, 프로젝트, 앱, 파비콘, 소셜 프로필, 런칭 자료에 쓸 로고 래스터 에셋을 생성하거나 정리한다. Codex가 로고 요구사항을 영어 JSON 로고 브리프로 바꾸고, 생성 전 브리프를 검수하고, 프로젝트 승인 이미지 경로로 생성/편집한 뒤, 투명 배경 PNG 로고 파일을 아카이브하고 preview.html 및 필요 시 Chrome 미리보기까지 제공해야 할 때 사용한다."
compatibility: Codex 전용; 투명 배경 PNG 출력을 지원하는 Codex 이미지 생성/편집 기능과 archive/preview 근거를 위한 로컬 파일 접근이 필요하다.
metadata:
  author: HyperB
  version: "0.1.1"
---

@rules/logo-design-workflow.ko.md
@references/transparent-png-requirements.ko.md

# Logo Maker

<purpose>

임의의 배경 위에 바로 배치할 수 있는 독창적이고 단순하며 확장 가능한 로고 에셋을 만든다. 이 스킬은 브랜드/제품 요구사항을 검수 가능한 영어 JSON 로고 브리프로 바꾸고, 로고 후보를 생성 또는 편집한 뒤, 투명 배경 PNG 결과물과 로컬 미리보기/아카이브 근거가 있을 때만 완료로 본다.

</purpose>

<routing_rule>

사용자가 Codex에게 다음과 같은 로고형 래스터 에셋을 생성, 반복, 변형, 준비해 달라고 할 때 이 스킬을 사용한다:

- 브랜드 마크, 제품 마크, 앱 로고, 파비콘, 프로필 이미지, 런칭 배지, 워드마크, 모노그램, 심볼 마크
- 다크/라이트 배경, 정사각 crop, 소셜 avatar, 앱 아이콘, 마케팅 배치용 로고 variant
- 생성/편집된 이미지에서 투명 배경 PNG 로고 export
- generic AI emblem 또는 stock icon처럼 보이지 않아야 하는 로고 생성

주요 산출물이 장면/사진/일러스트/마케팅 이미지가 아니라 로고/마크라면 `image-maker`보다 이 스킬을 우선한다.

다음 경우에는 이 스킬을 사용하지 않는다:

- primary deliverable이 손으로 작성한 vector/SVG 로고인 경우
- 로고 asset 출력 없이 브랜드 전략, naming, critique만 필요한 경우
- 기존 HTML/CSS/SVG asset을 결정론적으로 수정하는 작업인 경우
- 사용자가 명시적으로 non-transparent JPG/WebP만 요청한 경우

</routing_rule>

<execution_contract>

- Codex 전용: Codex 이미지 생성/편집 기능 또는 프로젝트 승인 image path를 사용한다.
- 모델 기본값: 프로젝트 `image-maker` contract와 일치하고 사용 가능하면 `gpt-image-2`를 사용한다. 이후 사용자 지시가 있으면 그 지시를 따른다.
- 프롬프트 파이프라인 요구사항: 원본 사용자 문구에서 바로 생성하지 않는다. 항상 `사용자 요구사항 → 영어 JSON 로고 브리프 → 브리프 검수 → 생성/편집 → 투명 PNG 검증`을 거친다.
- 투명 PNG hard requirement: 최종 산출물은 반드시 Codex 이미지 경로에서 native transparent background로 생성/export된 `.png` 파일이어야 한다. 흰색, 검은색, checkerboard, 단색, chroma-key 배경은 최종 로고 에셋으로 인정하지 않는다.
- Native transparency 요구사항: 이미지 생성 설정과 model-facing prompt 양쪽에서 transparent output을 먼저 요청한다. Node script, chroma-key cleanup, background-removal 후처리를 첫 경로로 쓰지 않는다. 결과가 RGB 또는 채워진 배경이면 성공으로 받아들이지 말고 brief/prompt/settings를 다듬어 재생성한다.
- Success ladder 요구사항: 검증된 transparent PNG가 생길 때까지 반복한다. Native transparent Codex generation을 먼저 시도하고, 반복해서 RGB/filled background가 나오며 로고가 단순 geometric mark로 표현 가능하면 deterministic RGBA fallback renderer를 사용한 뒤 `prompt.json`과 최종 보고에 fallback 경로를 명시한다.
- 아카이브 요구사항: 완료된 모든 로고 작업은 `.hypercore/logo-maker/<topic-slug>/`를 만들고, 검수된 브리프를 `prompt.json`으로 저장하고, 최종 로고 파일을 `logo1.png`, `logo2.png`, `logo3.png`, ...로 복사하고, `preview.html`을 생성하고, 모든 파일을 검증해야 한다.
- 미리보기 요구사항: 사용자가 결과를 보여 달라고 하면 local helper로 생성된 `preview.html`을 새 Google Chrome 창/탭에서 연다. Chrome을 열 수 없으면 preview path와 정확한 command를 보고한다.

</execution_contract>

<trigger_examples>

긍정 예시:

- "HyperB 새 제품 로고를 투명 배경 PNG로 만들어줘."
- "앱 아이콘처럼 쓸 수 있는 심플한 로고를 생성하고 크롬에서 미리보기 열어줘."
- "이 브랜드 설명 기반으로 AI 티 안 나는 모노그램 로고 후보 3개 만들어줘."
- "기존 로고 이미지를 투명 PNG로 정리하고 preview.html까지 만들어줘."

부정 예시:

- "로고 전략만 제안해줘. 이미지는 만들지 마." → strategy/advice only.
- "이 SVG path를 더 단순하게 리팩터링해줘." → logo raster generation이 아니라 deterministic SVG edit.

경계 예시:

- "브랜드 이미지를 만들어줘." 원하는 산출물이 투명 PNG 로고/마크이면 이 스킬을 사용하고, hero visual 또는 campaign scene이면 `image-maker`를 사용한다.

</trigger_examples>

<workflow>

1. **먼저 추론으로 명확화한다.** brand name, product/domain, audience, tone, symbol/wordmark 필요 여부, usage surface, aspect ratio, color constraints, text 필요 여부를 추론한다. 누락 정보 때문에 로고가 크게 잘못될 때만 질문한다.
2. **로고 작업 유형을 정한다.** `new logo`, `logo variant`, `transparent export`, `edit existing logo`, `favicon/app icon`, `batch concepts` 중 하나로 분류한다.
3. **로고 규칙을 로드한다.** 단순성, 확장성, silhouette, typography, anti-generic check를 위해 `rules/logo-design-workflow.ko.md`를 사용한다.
4. **영어 JSON 로고 브리프를 작성한다.** 아래 schema를 사용한다. Prompt-facing creative value는 영어로 쓰고, 정확한 브랜드/이름 text는 `logo_prompt.text.verbatim`에 원문 그대로 보존한다.
5. **생성 전 브리프를 검수한다.** JSON을 parse하고, 필수 field를 확인하고, coherent mark type인지 검증하고, `format: png`와 `background: transparent`를 확인하고, text/brand constraint가 inspectable한지 본다.
6. **Native transparent PNG 후보를 생성/편집한다.** 검수된 `generation_prompt`를 source of truth로 사용하고 Codex 이미지 생성 경로에서 직접 transparent-background PNG 출력을 요청한다. Prompt에는 isolated mark on transparent background, no background fill, no white square, no checkerboard pattern, no mockup, no scene을 명시한다.
7. **Alpha를 검사하고 반복한다.** 반환된 PNG에 `file`과 alpha-pixel check를 수행한다. RGB, fully opaque RGBA, filled-background, checkerboard, chroma-key, mockup scene, non-PNG이면 실패로 기록하고 JSON brief/prompt/settings를 다듬어 재생성한다.
8. **Native 시도가 실패한 뒤에만 fallback을 사용한다.** Native transparent generation이 반복 실패했지만 요청 로고가 simple geometric mark로 표현 가능하면 `scripts/render-simple-logo-rgba.mjs`로 deterministic transparent RGBA fallback을 렌더링하고, 이 fallback이 최종 transparent PNG를 만들었다고 archive와 보고에 명시한다. Photoreal/logo-generation 실패를 숨기기 위해 사용하지 않는다.
9. **로고로서 검증한다.** 작은 크기 silhouette, legibility, uniqueness, brand fit, geometry, text accuracy, edge cleanliness, light/dark/checkerboard 배경 작동 여부를 확인한다.
10. **의도적으로 아카이브한다.** 최종 verified transparent PNG를 `.hypercore/logo-maker/<topic-slug>/` 아래 `logo1.png`, `logo2.png`, ...로 복사하고 검수된 브리프를 `prompt.json`으로 저장한다. 선택적 archive helper는 파일 복사, alpha verification, preview에 사용할 수 있다.
11. **미리보기를 만들고 보여준다.** `assets/logo-preview-template.html` 또는 선택적 archive helper로 `preview.html`을 만든다. 사용자가 결과 확인을 원하면 새 Chrome 창에서 연다.
12. **완료를 검증한다.** Archive directory를 listing하고 `prompt.json`, `preview.html`, 기대한 모든 `logoN.png`가 있는지 확인한다. `RGBA`, `color_type: 6`, transparent pixel 존재 같은 alpha evidence를 요구한다. Checkerboard, white, black, brand-color surface 위에서 시각 확인한다.
13. **근거를 보고한다.** Archive path, preview path, Chrome open 여부, generation/fallback path, alpha verification output, 최종 brief 또는 요약, 정확한 text rendering/trademark similarity 같은 남은 risk를 포함한다.

</workflow>

<archive_helper>

Archive helper는 선택 사항이지만 verification과 preview에는 권장된다. Native Codex transparent generation 또는 명시적 deterministic fallback에서 final PNG가 나온 뒤 사용한다:

```bash
node skills/logo-maker/scripts/archive-logo-assets.mjs \
  --topic "descriptive logo topic" \
  --prompt /path/to/reviewed-logo-brief.json \
  --logos /path/to/logo-candidate-1.png /path/to/logo-candidate-2.png \
  --open-preview
```

Helper는 기존 PNG 파일을 복사하고 다음 archive/preview 파일을 작성한다:

- `.hypercore/logo-maker/<topic-slug>/prompt.json`
- `.hypercore/logo-maker/<topic-slug>/logo1.png`, `logo2.png`, ...
- `.hypercore/logo-maker/<topic-slug>/preview.html`

시각 확인이 필요 없는 automation에서만 `--no-preview`를 사용한다. Helper를 쓰지 않으면 동등한 archive, alpha-verification, preview evidence를 수동으로 만든다.

</archive_helper>

<fallback_renderer>

Native transparent generation 시도가 실패하고 요청 로고가 simple geometric mark로 표현 가능할 때만 deterministic fallback을 사용한다:

```bash
node skills/logo-maker/scripts/render-simple-logo-rgba.mjs \
  --out .hypercore/tmp-logo-final/logo.png \
  --size 1024
```

그 다음 `scripts/archive-logo-assets.mjs`로 archive한다. Fallback은 real RGBA PNG와 transparent pixels를 만들지만, clean geometric mark에만 제한된다. 이 경로를 쓰면 `prompt.json`에 `generation_settings.api_path: "deterministic_rgba_fallback"`을 기록한다.

</fallback_renderer>

<validation>

완료 전 다음 검사를 모두 통과한다:

- [ ] 요청이 일반 이미지 scene이 아니라 logo/mark 작업으로 올바르게 route되었다.
- [ ] 사용자 요구사항을 생성/편집 전에 유효한 영어 JSON logo brief로 변환했다.
- [ ] Brief가 `format: png`, `background: transparent`, native transparent Codex image generation을 첫 경로로 명시한다.
- [ ] Model-facing prompt가 isolated transparent-background PNG logo, no background fill, white box, checkerboard, chroma-key, mockup, scene을 명시한다.
- [ ] RGB, fully opaque RGBA, filled-background, checkerboard, chroma-key, mockup, non-PNG 시도는 거부하고 반복했다.
- [ ] Native generation이 반복 실패했다면 deterministic RGBA fallback은 simple geometric mark에만 사용했고 `prompt.json`에 명시했다.
- [ ] 최종 파일은 `.hypercore/logo-maker/<topic-slug>/` 아래 `logo1.png`, `logo2.png`, ...로 저장된 PNG다.
- [ ] 로고가 transparent checkerboard, white, black, expected brand background에서 작동한다.
- [ ] 로고가 작은 크기에서도 인식 가능하거나 known small-size risk를 보고했다.
- [ ] Text가 있으면 spelling, distortion, legibility를 검사했다.
- [ ] Brand mark의 trademark/confusing-similarity risk를 고려했다.
- [ ] Archive에 `prompt.json`, `preview.html`, 기대한 모든 `logoN.png`가 있다.
- [ ] 사용자가 결과를 보여 달라고 했다면 preview를 새 Chrome 창/탭에서 열었거나 failure/open command를 보고했다.
- [ ] 최종 응답에 saved paths, preview path, generation path/model, remaining risks를 포함했다.

</validation>

<reference_map>

- `rules/logo-design-workflow.ko.md`: 단순하고 확장 가능한 브랜드 사용 가능 로고 direction 실무 규칙.
- `references/transparent-png-requirements.ko.md`: transparent PNG prompt/settings contract와 visual validation notes.
- `scripts/archive-logo-assets.mjs`: final PNG alpha evidence를 검증하는 archive/preview helper.
- `scripts/render-simple-logo-rgba.mjs`: native transparent generation이 반복해서 RGB/filled-background를 반환할 때 simple geometric mark용 deterministic fallback renderer.
- `assets/logo-preview-template.html`: `.hypercore/logo-maker/<topic-slug>/preview.html`로 렌더링되는 local preview template.

</reference_map>
