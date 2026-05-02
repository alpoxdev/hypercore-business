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

## Source image extraction and placement QA

원본 상품 이미지를 그대로 Figma에 붙이기 전에 각 컷마다 다음을 기록한다:

- `background_type`: transparent alpha, white studio, gray studio, lifestyle, noisy, unknown
- `edge_quality`: clean, halo/fringe, jagged, cropped limb/product, needs retouch
- `placement_decision`: transparent_extraction, matching_plate, full_bleed_crop, masked_card, asset_needed
- `section_fit`: light section, dark section, premium editorial, proof card, spec table
- `action`: use as-is, remove background, crop tighter, add tone-matched plate, regenerate/edit via image-maker

Visual rules:

- On dark or premium sections, do not paste a raw white square around a product. Either remove the background to transparent PNG, place it on an intentional light card with balanced padding/radius, or regenerate/edit the product asset.
- If the original has a white studio background and transparency cannot be produced quickly, use a deliberate plate: matching corner radius, optical padding, caption spacing, and section-aligned color.
- Product cutouts must be sized to the section rhythm: no tiny floating product, no accidental white border, no harsh square unless the layout uses a clear framed card language.
- Use `source asset` labels only as small production notes; do not let labels compete with product-page copy.
- Screenshot every section where source images are placed and fail the layout if a product image looks pasted, mismatched, blurry, haloed, or visually unrelated to the background.

## Generated image caution

- Prefer no text inside generated images, or only very short Korean text after manual review.
- Mark text risk high for any generated raster image that contains visible copy.
- When Figma output is requested, keep exact Korean copy as an editable Figma text layer.
- Product labels, certifications, reviews, and official marks should come from real assets.
- If editing a real product photo, state what must not change: label, shape, color, scale, packaging.
- For models, avoid implying real endorsement unless supplied.
- Downloaded source images are reference/existing assets only; do not count them as generated or edited outputs.
- Do not use rough AI-looking placeholder silhouettes as final product imagery. If a real image is unavailable, mark the slot `asset-needed` or run the image-maker generation/editing path.
- For regulated categories, do not visualize medical or impossible effects.

## Integrate skills/image-maker for actual assets

When actual image files are required, do not stop at this cut list and do not invent a parallel image workflow. Read `references/image-maker-integration.ko.md`, then use the local `skills/image-maker/` folder as the execution reference when present; if absent, use the available runtime image generation path while this skill continues through generation:

1. Convert selected cut briefs into the `skills/image-maker` English JSON prompt pipeline.
2. Keep Korean visible text in `image_prompt.text.verbatim` only.
3. Use `skills/image-maker/rules/natural-image-workflow.md` for naturalism and visual validation.
4. Generate/edit the actual requested images via the available image generation path following `skills/image-maker/SKILL.md`.
5. Use `skills/image-maker/scripts/archive-generated-images.mjs` or the same archive contract to preserve `.hypercore/image-maker/<topic-slug>/prompt.json` and generated `imageN.*` files.
6. Copy final images into the 상세페이지 production folder only after archiving.
7. Verify the final layout screenshot: no text overlap, clipped Korean copy, unreadable tiny labels, or placeholder art presented as final.
