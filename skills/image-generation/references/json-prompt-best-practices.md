# JSON Prompt Best Practices for HyperB Image Generation

Last researched: 2026-04-29.

Use this reference when converting user requirements into the required English JSON prompt before `gpt-image-2` generation or editing.

## Core principle

The JSON prompt is an inspectable planning artifact, not just an API payload. It should separate:

1. **Generation settings**: model, task, size, quality, format, destination.
2. **User intent**: what the user asked for, what was inferred, and what remains unknown.
3. **Source grounding**: local files, URLs, or reference images used as factual/visual anchors.
4. **Image direction**: one coherent capture/design story with subject, scene, composition, lighting, materials, text, invariants, and avoid constraints.
5. **Review state**: machine-checkable checklist values plus unresolved risks.
6. **Model-facing prompt**: one concise English `generation_prompt` assembled only after review.

## Researched best practices

### 1. Use a stable schema and validate it before generation

OpenAI Structured Outputs guidance recommends schema-backed outputs when reliable JSON shape matters, because valid JSON alone does not guarantee schema adherence. If the runtime cannot enforce a JSON Schema, do the next best thing: keep a stable hand-authored schema, parse it with a JSON parser, and run a checklist before generation.

Practical rule for this skill:

- Use double-quoted JSON only; no comments or trailing commas.
- Keep key order stable so reviews are fast and diffs are meaningful.
- Treat `schema_version` as a compatibility marker when changing fields.
- Prefer enums for fields like `task`, `quality`, `format`, and `destination_intent`.
- If a required field is unknown, write an explicit assumption or `"unknown_but_non_blocking"`; do not silently omit it.

### 2. Separate API settings from creative direction

OpenAI image docs separate model/output controls (`model`, `size`, `quality`, `output_format`, compression/background where supported) from the text prompt. Keep the same split in the JSON prompt so operators can change cost/latency settings without rewriting the creative brief.

Practical rule for this skill:

- Put `model`, `task`, `size`, `quality`, `format`, and destination under `generation_settings` / `output`.
- Keep `image_prompt` focused on what the image should depict.
- For `gpt-image-2`, enforce documented size constraints and remember that transparent backgrounds are not supported by this model in the Image API.
- Use `quality: "low"` for drafts and `"medium"`/`"high"` for final assets.

### 3. Structure image prompts in a repeatable order

OpenAI's image prompting guide for GPT Image 1.5 recommends a consistent prompt order: background/scene, subject, key details, constraints, and intended use. It also recommends labeled segments for complex requests. JSON is useful because it makes those segments explicit and reviewable.

Practical rule for this skill:

- Describe the intended use before stylistic details.
- Use one coherent `capture_or_design_story`; do not combine phone snapshot, studio packshot, cinematic lighting, and documentary realism in one prompt.
- Include placement and safe-zone requirements before composition.
- Add only targeted quality cues; avoid generic stacks like `8K, masterpiece, ultra realistic`.

### 4. Encode reference images and edit invariants explicitly

OpenAI image docs and cookbook examples show that generation/editing can use multiple image inputs. The prompting guide recommends naming references by index and describing each reference's role. For edits, it repeatedly stresses what must remain unchanged.

Practical rule for this skill:

- Use `source_inputs[]` for reference images/local files and give each one a `role` such as `subject_reference`, `style_reference`, `product_reference`, `background_reference`, or `mask`.
- For edits, populate `edit_plan.change_only`, `edit_plan.preserve`, and `edit_plan.allowed_drift` before writing `generation_prompt`.
- When compositing, specify what moves where, scale/perspective matching, and lighting/shadow integration.
- Restate invariants on every iteration to avoid drift.

### 5. Treat visible text as a high-risk field

OpenAI image docs list text rendering as improved but still limited, and the image prompting guide recommends exact verbatim copy, placement, typography, contrast, and iteration for in-image text.

Practical rule for this skill:

- Put exact visible text only in `image_prompt.text.verbatim`.
- Preserve the user's original language and spelling for visible text even if other prompt values are English.
- State whether text should appear once, be omitted, or be corrected.
- Prefer short text; if text fidelity is essential, mark it as a review risk and inspect output manually.

### 6. Use physical evidence for realism

The OpenAI image prompting guide recommends photography language for natural photorealism: lens/framing, lighting, real texture, imperfections, and avoiding over-staged polish. Translate that into structured fields instead of style-word soup.

Practical rule for this skill:

- Require one lighting story: source, direction, softness/hardness, color temperature when relevant.
- Add material evidence: fabric weave, glass smudges, paper grain, skin pores, product seams, or other scene-specific textures.
- Use at most one or two natural imperfections that fit the capture story.
- Add `avoid` constraints only for likely failure modes in the current request.

### 7. Keep review separate from generation

The JSON should make it obvious whether the prompt is ready to spend generation cost. The final `generation_prompt` should be assembled after review, not before.

Practical rule for this skill:

- Keep `review_checklist` booleans false until checked.
- Add `review_notes.unresolved_risks` for text, layout precision, brand/legal rights, or factual uncertainty.
- Do not generate while required checklist fields are false.
- On iteration, update only the failing dimension and re-run the checklist.

## Minimal JSON schema shape

The core skill owns the canonical example. This reference defines the required field groups:

```text
schema_version
model
task
use_case
generation_settings
user_requirements_summary
assumptions
source_inputs
placement
research_anchors
image_prompt
edit_plan
review_checklist
review_notes
generation_prompt
```

`edit_plan` can be `null` for fresh generation. `source_inputs` and `research_anchors` can be empty arrays only when the scene is simple, non-factual, and not reference-guided.

## Source map

- OpenAI GPT Image 2 model page: https://developers.openai.com/api/docs/models/gpt-image-2
- OpenAI Image Generation docs: https://developers.openai.com/api/docs/guides/image-generation
- OpenAI Images API reference: https://developers.openai.com/api/reference/resources/images
- OpenAI Structured Outputs docs: https://developers.openai.com/api/docs/guides/structured-outputs
- OpenAI Prompting docs: https://developers.openai.com/api/docs/guides/prompting
- OpenAI GPT Image 1.5 prompting guide: https://developers.openai.com/cookbook/examples/multimodal/image-gen-1.5-prompting_guide
- OpenAI Generate Images with GPT Image cookbook: https://developers.openai.com/cookbook/examples/generate_images_with_gpt_image
