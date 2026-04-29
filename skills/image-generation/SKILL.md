---
name: image-generation
description: "[HyperB][Codex Only] Generate or edit context-aware raster images with gpt-image-2 when HyperB work needs realistic, non-stock, non-AI-looking visuals for product, marketing, content, UI, or research-backed scene creation. Use when Codex should convert user requirements into an English JSON prompt, review the prompt before generation, run the Codex image generation path, and validate the output for plausibility, brand fit, artifacts, text accuracy, and saved asset readiness."
compatibility: Codex only; requires Codex image generation capability or an explicit gpt-image-2 API/CLI path.
metadata:
  author: HyperB
  version: "0.1.1"
---

@rules/natural-image-workflow.md
@references/gpt-image-2-research.md
@references/json-prompt-best-practices.md

# Image Generation

<purpose>

Create situation-appropriate bitmap images that feel photographed, designed, or illustrated for the actual HyperB context rather than obviously AI-generated. The skill turns a vague visual request into a researched image brief, converts it into an English JSON prompt, reviews the prompt, generates or edits with `gpt-image-2`, and validates the result before it is used in the project.

</purpose>

<routing_rule>

Use this skill when the user wants Codex to create, edit, or prepare a raster image asset and the result must be believable, brand-usable, or tailored to a concrete business/content situation.

Prefer this skill over generic image generation when the request mentions any of these:

- "AI 티 안 나게", "realistic", "natural", "authentic", "not stock", "not AI-looking"
- HyperB marketing, business, product, landing page, social, article, deck, ad, or UI imagery
- research-backed visual direction before image generation
- using `gpt-image-2` specifically

Do not use this skill when:

- the desired output is SVG/vector/code-native UI, not a raster image
- the user only wants prompt writing and explicitly says not to generate
- a deterministic edit to an existing local SVG, HTML/CSS, or design-token asset is clearly better
- the request is only generic web research with no image-generation deliverable

</routing_rule>

<execution_contract>

- Codex only: use the Codex image generation capability or the project-approved imagegen path.
- Model requirement: every API/CLI image-generation or image-editing call must use `gpt-image-2` unless the user explicitly changes the requirement in a later instruction.
- Prompt pipeline requirement: do not generate immediately from raw user wording. Always pass through `user requirements → English JSON prompt → prompt review → image generation`.
- JSON prompt language: all generated prompt values intended for the image model must be written in English, while notes to the user may be Korean or the user's language.
- Do not silently downgrade to another image model for convenience, transparency, cost, or compatibility.
- If transparent background is needed and `gpt-image-2` cannot provide native transparency in the available path, use an opaque/chroma-key workflow or ask for a requirement change before using another model.
- Treat the system `imagegen` skill as the execution helper when available; this skill owns the higher-level HyperB research, art direction, and naturalism checks.
- Artifact archive requirement: after every generation/edit, create `.hypercore/image-generation/<topic-slug>/`, write the reviewed prompt as `prompt.json`, and copy generated outputs from `~/.codex/generated-images` or the returned image path into that folder as `image1.png`, `image2.png`, `image3.png`, ... before reporting completion.

</execution_contract>

<trigger_examples>

Positive examples:

- "HyperB 랜딩 페이지 히어로 이미지를 AI 티 안 나게 만들어줘."
- "gpt-image-2로 B2B SaaS 고객 사례용 자연스러운 사무실 사진 느낌 이미지를 생성해줘."
- "이 제품 설명을 읽고 상황에 맞는 블로그 대표 이미지를 리서치 기반으로 만들어줘."
- "광고용 이미지를 만들되 스톡 사진처럼 과장되지 않고 실제 촬영한 느낌이 나게 해줘."

Negative examples:

- "이 아이콘을 기존 SVG 스타일에 맞게 수정해줘." → edit SVG directly.
- "이미지 생성은 하지 말고 Midjourney 프롬프트만 써줘." → prompt-writing task only.

Boundary example:

- "상품 페이지 이미지를 개선하고 싶어." If the user needs image asset generation or editing, use this skill; if they only need UX advice, use research/design guidance instead.

</trigger_examples>

<workflow>

1. **Clarify by inference first.** Identify audience, placement, aspect ratio, brand tone, subject, required copy, and whether the asset is preview-only or project-bound. Ask only when a missing detail would cause a materially wrong image.
2. **Research the situation.** For unfamiliar domains, current products, visual references, markets, cultures, places, or factual scenes, run focused research before writing the prompt. Prefer official/product sources and recent visual references; record sources in the final note.
3. **Pick the image job.** Classify as `generate`, `edit`, `reference-guided generate`, or `batch/variants`.
4. **Write an art-direction brief.** Define job-to-be-done, viewer belief, scene, subject, camera/composition, lighting, material/texture truth, constraints, and avoid list.
5. **Convert requirements into an English JSON prompt.** Use the schema below and `references/json-prompt-best-practices.md`. Treat the JSON as an inspectable planning artifact, not just an API payload. Keep prompt-facing values in English, preserve exact requested visible text verbatim, and encode assumptions explicitly.
6. **Review the JSON prompt before generation.** Parse the JSON, check required fields, confirm source/reference roles and edit invariants when relevant, and verify that it is situation-specific, coherent, non-contradictory, safe, and compatible with `gpt-image-2`. Fix the JSON before generation if any review item fails.
7. **Apply naturalism rules.** Load `rules/natural-image-workflow.md` and add only the imperfections that fit the chosen capture story.
8. **Generate/edit with `gpt-image-2`.** Use the reviewed JSON prompt as the source of truth. Use `quality: low` for drafts and `medium` or `high` for final assets. Keep sizes valid for `gpt-image-2`; prefer `1024x1024`, `1536x1024`, `1024x1536`, or a placement-specific multiple-of-16 size.
9. **Validate visually before shipping.** Check physical plausibility, lighting, anatomy, material behavior, text, brand fit, artifacts, and whether it looks generic/stock/AI.
10. **Iterate narrowly.** Change one failure dimension at a time: geometry, lighting, material, capture artifact, text, or composition. Update and re-review the JSON prompt before the next generation.
11. **Archive deliberately.** For each image job, choose a descriptive topic slug and create `.hypercore/image-generation/<topic-slug>/`. Save the final reviewed JSON prompt as `.hypercore/image-generation/<topic-slug>/prompt.json`, then copy every generated/edited output from `~/.codex/generated-images` or the image-generation return path into the same folder as `image1.png`, `image2.png`, `image3.png`, ... in generation order. Use `scripts/archive-generated-images.mjs` when local file paths are available. If the returned format is truly `jpeg` or `webp`, keep the real extension instead of lying with `.png`. If the asset must also be used by app code or committed, copy it separately to the project asset path after preserving the `.hypercore/image-generation/<topic-slug>/` archive. Do not leave a referenced asset only in a Codex/global generated-images location.
12. **Verify the archive.** Before reporting completion, list the archive directory and confirm `prompt.json` plus every expected `imageN.*` file exists.
13. **Report the prompt and evidence.** Include final archive path(s), model (`gpt-image-2`), quality/size if known, final reviewed JSON prompt/brief, sources used, and any app/public asset copies.

</workflow>

<archive_helper>

When the image-generation path saves files under `~/.codex/generated-images`, archive them immediately with the local helper instead of manually renaming files:

```bash
node skills/image-generation/scripts/archive-generated-images.mjs \
  --topic "descriptive topic" \
  --prompt /path/to/reviewed-prompt.json \
  --images ~/.codex/generated-images/generated-1.png ~/.codex/generated-images/generated-2.png
```

If the exact generated file paths are not printed but the number of outputs is known, use `--latest <n>` right after generation so the newest generated files are copied into `.hypercore/image-generation/<topic-slug>/` as `image1.*`, `image2.*`, ... . Always inspect the helper output and directory listing before final response.

</archive_helper>

<json_prompt_pipeline>

The prompt must be created as JSON first. Use valid JSON only: double-quoted keys/strings, no comments, no trailing commas. The JSON is the reviewed source of truth for the final model-facing prompt; it is not merely a raw Image API request body.

Load `references/json-prompt-best-practices.md` when creating or changing this structure. Best-practice gates:

- Keep API/output settings separate from creative direction.
- Use a stable `schema_version` and preserve key order for reviewability.
- Record assumptions, unknowns, source inputs, and research anchors explicitly.
- For edits/reference-guided generation, name each input by role and state what must not change.
- Put exact visible text only in `image_prompt.text.verbatim`; preserve the user's requested language there.
- Assemble `generation_prompt` only after the review checklist passes.

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

For edit/reference-guided jobs, replace `"edit_plan": null` with:

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

Prompt review rules:

- If `review_checklist.valid_json` is false, repair the JSON before doing anything else.
- If required fields are empty, fill them with a concrete assumption or mark why the gap is non-blocking.
- If any prompt-facing value is not English, translate it while preserving exact user-requested visible text in `image_prompt.text.verbatim`.
- If the JSON mixes multiple capture/design stories, split into variants or choose the strongest single story before generation.
- If factual/current/specialized scenes lack `research_anchors`, research first or mark why research was unnecessary.
- If source images are present but `source_inputs` lacks roles/invariants, add them before generation.
- Generate only after every review checklist value is true or the unresolved risk is explicitly accepted by the user.

</json_prompt_pipeline>

<validation>

Before completion, pass all checks:

- [ ] The model requirement is satisfied: `gpt-image-2` used or explicitly specified for the generation path.
- [ ] User requirements were converted into a valid English JSON prompt before generation.
- [ ] The JSON prompt was parsed successfully and follows the stable schema from `references/json-prompt-best-practices.md`.
- [ ] The JSON prompt was reviewed and corrected before image generation.
- [ ] Reference-guided or edit jobs include source-input roles, edit invariants, and explicit preserve/change-only constraints.
- [ ] The image brief is situation-specific, not generic style-word soup.
- [ ] Research was performed or consciously skipped because the scene was simple and non-factual.
- [ ] The prompt uses one coherent capture/design story without contradictory lighting or lens cues.
- [ ] Naturalism uses physical evidence: lens, exposure, lighting, material texture, or context continuity.
- [ ] The output is checked for common AI tells: anatomy, hands, teeth, eyes, text, repeated patterns, impossible shadows, warped product details, excess symmetry, and stock-photo posing.
- [ ] Every generation/edit job has a stable archive directory under `.hypercore/image-generation/<topic-slug>/`.
- [ ] The archive contains the reviewed prompt at `.hypercore/image-generation/<topic-slug>/prompt.json`.
- [ ] Every generated/edited image has a stable copy in the archive as `image1.png`, `image2.png`, `image3.png`, ... or the matching real extension for non-PNG outputs.
- [ ] No generated image remains only in `~/.codex/generated-images` or another global/temp Codex location.
- [ ] Project-bound images that app code must reference are additionally copied to the appropriate tracked/public asset path if needed.
- [ ] Final response includes saved paths, reviewed JSON prompt or concise prompt summary, sources, and remaining risks if any.

</validation>

<reference_map>

- `rules/natural-image-workflow.md`: practical rules for non-AI-looking, context-aware image direction.
- `references/gpt-image-2-research.md`: source-backed `gpt-image-2` model facts and links.
- `references/json-prompt-best-practices.md`: researched JSON prompt schema, review gates, and source maps.
- `scripts/archive-generated-images.mjs`: deterministic helper that copies reviewed prompts and generated image files into `.hypercore/image-generation/<topic-slug>/prompt.json` and `imageN.*`.
- `.hypercore/research/2026-04-29-image-generation-naturalism.md`: full naturalism/model research report saved for reuse.
- `.hypercore/research/2026-04-29-json-prompt-best-practices-for-image-generation.md`: JSON prompt best-practice research report.

</reference_map>
