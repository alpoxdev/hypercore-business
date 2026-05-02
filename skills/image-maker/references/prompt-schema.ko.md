# Image Maker Prompt Schema

이 reference는 core `image-maker` workflow의 canonical inspectable JSON prompt schema다. `gpt-image-2` 생성 또는 편집 전에 영어 JSON prompt를 만들거나, 검수하거나, 변경할 때 로드한다.

이 schema는 API/output control을 creative direction과 분리하고, assumptions/source를 검수 가능하게 만들며, 생성 전에 archive/preview path를 기록한다.

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
    "save_path": ".hypercore/image-maker/descriptive-topic/image1.png",
    "archive_dir": ".hypercore/image-maker/descriptive-topic",
    "prompt_path": ".hypercore/image-maker/descriptive-topic/prompt.json",
    "preview_html_path": ".hypercore/image-maker/descriptive-topic/preview.html"
  },
  "artifact_archive": {
    "topic": "Human-readable topic for this generation job.",
    "topic_slug": "descriptive-topic",
    "prompt_path": ".hypercore/image-maker/descriptive-topic/prompt.json",
    "image_paths": [
      ".hypercore/image-maker/descriptive-topic/image1.png"
    ],
    "preview_path": ".hypercore/image-maker/descriptive-topic/preview.html",
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

