# Transparent PNG Requirements

The logo-maker final deliverable is always a verified transparent-background PNG unless the user explicitly changes the output requirement later.

## Output contract

- Final logo files must use `.png` extension and PNG encoding.
- Native Codex transparent generation is the first path: set `generation_settings.format` to `png`, `generation_settings.background` to `transparent`, and `generation_settings.transparent_background` to `true` when the execution path supports it.
- The model-facing prompt must explicitly say: isolated logo mark, transparent background, PNG output, no background fill, no white square, no checkerboard pattern, no chroma-key background, no mockup, and no scene.
- RGB PNG, fully opaque RGBA PNG, white/black/colored square, baked-in checkerboard, or chroma-key backgrounds are failed attempts, not final deliverables.
- If native attempts repeatedly fail and the logo can be represented as a simple geometric mark, use the deterministic RGBA fallback renderer and disclose `generation_settings.api_path: "deterministic_rgba_fallback"` in `prompt.json`.

## Success ladder

1. Write the reviewed JSON logo brief.
2. Generate with native transparent PNG settings and strict anti-background prompt wording.
3. Inspect the returned PNG with `file` and an alpha-pixel check.
4. If alpha is missing or fully opaque, refine the brief/prompt/settings and regenerate.
5. After repeated native failures, use `scripts/render-simple-logo-rgba.mjs` only for simple geometric marks.
6. Archive with `scripts/archive-logo-assets.mjs` or equivalent evidence.
7. Open `preview.html` and inspect checkerboard, white, black, and brand-color surfaces.

## Prompt pattern

Use wording like this inside `generation_prompt` after the structured brief passes review:

```text
Create a clean, centered [mark type] logo for [brand]. Output as a transparent-background PNG logo asset. Isolated mark only. No background fill, no white square, no checkerboard pattern, no chroma-key background, no scene, no mockup, no drop shadow used as a background crutch. Keep edges clean and enough transparent padding for app icon and website header use.
```

## Verification evidence

Record evidence in the final response:

- `file logo1.png` includes `RGBA` or another alpha-capable PNG mode.
- Alpha-pixel check reports at least one transparent pixel and at least one visible/opaque pixel.
- Archive contains `prompt.json`, `logo1.png`, and `preview.html`.
- Preview was opened or the exact preview path/open command is reported.

## Common failure modes

- The runtime saves RGB PNG even after transparent prompt wording.
- The image contains a white square or colored tile behind the mark.
- A checkerboard pattern is baked into the image instead of actual transparency.
- The mark has matte halos from cleanup.
- The fallback renderer is used for a complex visual request it cannot faithfully represent.
