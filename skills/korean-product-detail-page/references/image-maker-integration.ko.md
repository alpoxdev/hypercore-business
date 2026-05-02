# skills/image-maker 통합 실행 가이드

`korean-product-detail-page`는 전략 / 카피 / 컷 기획에서 멈추지 않는다. 사용자가 상세페이지를 “이미지랑 같이” 원하면, 이 스킬이 실제 이미지 생성·편집·검증·아카이브까지 수행한다. 단, 이미지 제작 방식은 새로 만들지 않고 로컬 `skills/image-maker/` 폴더가 있으면 그 검증된 규칙을 우선 적용하고, 없으면 사용 가능한 런타임 이미지 생성 경로에 같은 계약을 적용한다.

## 역할 분리

- `korean-product-detail-page`: 한국형 상세페이지 리서치, 전략, 카피, 섹션 구성, 컷 기획, 이미지 생성 실행 관리, 최종 상세페이지 패키징을 책임진다.
- `skills/image-maker`: 실제 이미지 프롬프트 구조, 자연스러움 규칙, `gpt-image-2` 실행 계약, 시각 검증, 아카이브 규칙을 제공하는 로컬 참고/실행 규칙이다.

## 언제 이 파일을 읽는가

다음 중 하나라도 해당하면 읽는다:

- 사용자가 “이미지까지 만들어줘”, “실제 이미지 생성”, “컷도 뽑아줘”, “AI 티 안 나게”를 요청한다.
- 상세페이지 섹션별 실제 PNG/JPG/WebP 산출물이 필요하다.
- 제품 사진을 배경 합성, 모델컷, 라이프스타일컷, 썸네일, 히어로컷으로 편집해야 한다.
- `image-briefs.json`을 실제 생성용 English JSON prompt로 변환해야 한다.

## 참고할 이미지 생성 파일 또는 fallback

이미지 생성이 포함된 작업에서는 로컬 파일이 존재하는 경우 순서대로 읽는다. 없으면 같은 산출 계약으로 사용 가능한 런타임 image generation path를 사용하고 fallback을 기록한다:

1. `skills/image-maker/SKILL.md` — 이미지 생성 전체 실행 계약
2. `skills/image-maker/rules/natural-image-workflow.md` 또는 `.ko.md` — 자연스러운 이미지 제작/검수 규칙
3. `skills/image-maker/references/json-prompt-best-practices.md` 또는 `.ko.md` — English JSON prompt 구조와 리뷰 게이트
4. `skills/image-maker/scripts/archive-generated-images.mjs` — 생성 파일 아카이브 helper

## end-to-end 실행 순서

1. 상세페이지 전략과 섹션 맵을 확정한다.
2. 섹션별 한국어 카피와 이미지 컷 리스트를 작성한다.
3. 각 컷을 아래 `integrated_image_job` 형태로 정리한다.
4. `skills/image-maker`의 JSON prompt schema로 변환한다.
5. English JSON prompt를 생성 전 검수한다.
6. 사용 가능한 Codex/image generation 경로로 `gpt-image-2` 생성 또는 편집을 실행한다.
7. 결과 이미지를 실제로 보고 자연스러움, 제품 정확성, 텍스트, 권리/브랜드 리스크를 검증한다.
8. 실패하면 한 축만 좁게 수정해 다시 생성/편집한다.
9. 최종 이미지를 `.hypercore/image-maker/<topic-slug>/`에 `prompt.json`, `image1.*`, `image2.*` 형태로 보존한다.
10. 상세페이지 산출물 폴더가 있으면 아카이브 후 필요한 이미지를 복사하고 경로를 기록한다.

## integrated_image_job 형식

`image-briefs.json` 또는 이미지 생성 전 작업표에 각 컷을 이 형태로 기록한다:

```json
{
  "detail_page_section": "Hero",
  "commerce_goal": "첫 화면에서 제품과 핵심 베네핏을 2초 안에 이해시킨다.",
  "image_job": "generate | edit | reference-guided generate | batch/variants",
  "source_assets": [
    {
      "type": "local_file | url | none",
      "role": "product_reference | label_reference | style_reference | model_reference",
      "path_or_url": "",
      "must_preserve": ["product proportions", "label text", "brand color"]
    }
  ],
  "korean_visible_text": {
    "verbatim": "",
    "recommendation": "editable_text_layer_preferred | generated_text_allowed_after_review | no_text"
  },
  "placement": {
    "surface": "SmartStore detail body | representative thumbnail | Cafe24 own mall section",
    "aspect_ratio_or_size": "860px wide section | 1:1 thumbnail | 1536x1024 lifestyle cut",
    "safe_zone": "main product inside center 70%; leave top area clear for editable headline"
  },
  "visual_direction": {
    "subject": "",
    "korean_context": "",
    "composition": "",
    "lighting": "",
    "material_truth": "",
    "natural_imperfections": []
  },
  "claim_and_rights_risks": ["확인 필요: certification mark", "avoid fake review screenshots"],
  "image_generation_reference": "Convert this to the English JSON prompt schema in skills/image-maker and generate/edit the actual asset."
}
```

## 변환 규칙

- 이미지 모델에 전달되는 창작 지시는 `skills/image-maker` 규칙에 따라 영어 JSON으로 작성한다.
- 사용자가 요구한 정확한 한국어 표시 문구는 `image_prompt.text.verbatim`에만 보존한다.
- 상세페이지의 긴 한국어 카피, 성분표, 고시정보, FAQ는 이미지 생성으로 굽지 말고 HTML/디자인 툴의 editable text layer로 남기는 것을 기본값으로 한다.
- 제품 라벨, 인증마크, 리뷰 캡처, 연예인/인플루언서/브랜드 로고는 실제 권리와 원본 자산이 있을 때만 사용한다.
- 상세페이지 본문용 이미지는 모바일 가독성을 위해 섹션 단위로 분할하고, 대표 썸네일은 플랫폼별 정방형 규격을 별도 컷으로 다룬다.
- 이미지 생성 모델/경로/사이즈/품질/아카이브는 `skills/image-maker/SKILL.md`의 실행 계약을 따른다.

## 생성 후 검증 및 저장

이미지를 생성하거나 편집한 뒤에는 반드시:

1. 생성 전 English JSON prompt가 유효하고 리뷰 체크를 통과했는지 확인한다.
2. `gpt-image-2` 생성/편집 경로를 사용했는지 기록한다.
3. 결과를 실제로 시각 검증한다.
4. `skills/image-maker/scripts/archive-generated-images.mjs`를 사용하거나 동일 규칙으로 `.hypercore/image-maker/<topic-slug>/prompt.json`과 `image1.*`, `image2.*`를 보존한다.
5. 상세페이지 제작 폴더가 따로 있으면 아카이브 후 필요한 이미지만 복사한다.

## 최종 보고 형식

최종 보고에 포함한다:

- 상세페이지 산출물 경로
- 이미지 아카이브 경로
- 사용한 `skills/image-maker` 파일/규칙
- 생성 모델, 크기, 품질이 확인되면 그 값
- 생성된 이미지 파일 목록
- 사람이 확인해야 할 텍스트/권리/상품정보 리스크
