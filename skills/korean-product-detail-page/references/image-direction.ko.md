# 이미지 디렉션 가이드

## 기본 컷 리스트

1. 대표컷: 정방형, 제품 식별, 플랫폼 썸네일 안전 영역
2. 히어로 연출컷: 한국 소비자가 이해하는 실제 사용 장면
3. 문제 공감컷: 기존 불편, messy/real situation, 과장 금지
4. 베네핏컷: 기능별 1컷 또는 3-card 구성
5. 디테일컷: 소재, 마감, 성분, 포장, 구성품, 크기 비교
6. 사용 단계컷: 1-2-3 순서, 손/인물 포함 가능
7. 비교컷: 전후/경쟁/옵션 비교, 증거 없는 효과 과장 금지
8. 신뢰컷: 리뷰, 인증, 제조/검수 과정; 실제 자료 없으면 placeholder
9. 정책컷: 배송, 교환, A/S, 주의사항 정보표

## Prompt brief fields

For each image, write:

```json
{
  "section": "Hero",
  "job": "generate | edit | use_existing_photo | diagram | table",
  "purpose": "What belief this image must create",
  "subject": "Product/person/space/material",
  "korean_context": "Apartment kitchen, office desk, cafe, gift table, bathroom shelf, etc.",
  "composition": "Crop, angle, safe area, mobile readability",
  "lighting_style": "Natural daylight, soft studio, warm home, etc.",
  "text_overlay": {
    "verbatim_ko": "Exact Korean text or empty",
    "recommendation": "editable_text_layer_preferred | image_text_ok | no_text"
  },
  "must_preserve": ["product shape", "label", "color", "real dimensions"],
  "avoid": ["fake certification", "unreadable text", "AI gloss", "wrong usage"]
}
```

## Generated image caution

- Prefer no text inside generated images, or only very short Korean text after manual review.
- Product labels, certifications, reviews, and official marks should come from real assets.
- If editing a real product photo, state what must not change: label, shape, color, scale, packaging.
- For models, avoid implying real endorsement unless supplied.
- For regulated categories, do not visualize medical or impossible effects.

## Integrate skills/image-generation for actual assets

When actual image files are required, do not stop at this cut list and do not invent a parallel image workflow. Read `references/image-generation-integration.ko.md`, then use the local `skills/image-generation/` folder as the execution reference while this skill continues through generation:

1. Convert selected cut briefs into the `skills/image-generation` English JSON prompt pipeline.
2. Keep Korean visible text in `image_prompt.text.verbatim` only.
3. Use `skills/image-generation/rules/natural-image-workflow.md` for naturalism and visual validation.
4. Generate/edit the actual requested images via the available image generation path following `skills/image-generation/SKILL.md`.
5. Use `skills/image-generation/scripts/archive-generated-images.mjs` or the same archive contract to preserve `.hypercore/image-generation/<topic-slug>/prompt.json` and generated `imageN.*` files.
6. Copy final images into the 상세페이지 production folder only after archiving.
