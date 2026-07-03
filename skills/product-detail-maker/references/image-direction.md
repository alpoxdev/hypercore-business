# Image Direction Reference Map

English counterpart for `references/image-direction.ko.md`. Use this file to orient image/cut planning, then read the Korean original for the detailed cut list and production wording.

## Core Cut Types

Plan representative thumbnail, hero scene, problem scene, benefit cuts, detail cuts, usage steps, comparison/proof cuts, trust material, and policy or notice sections.

## Prompt Brief Fields

Each image brief should state section, job, purpose, subject, Korean context, composition, lighting style, text-overlay risk, product details that must be preserved, and things to avoid.

## Source Image Placement QA

Before placing existing or generated product imagery into Figma, record:

- `background_type`
- `edge_quality`
- `placement_decision`
- `section_fit`
- `action`

Use transparent extraction, matching plates, full-bleed crops, masked cards, or `asset_needed` deliberately. Do not paste a raw white product square onto a dark or premium section unless it is clearly designed as a framed card.

## Generated Image Guardrails

Prefer no text inside generated raster images. Keep exact Korean copy as editable Figma text when possible. Downloaded source images are reference or existing assets only; they do not count as generated or edited outputs. Do not present rough placeholder silhouettes as finished product imagery.

## Image-Maker Handoff

When actual image files are required, read `references/image-maker-integration.md` and `references/image-maker-integration.ko.md`, then follow `skills/image-maker` for English JSON prompts, generation or editing, visual validation, and archive.
