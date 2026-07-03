# Image-Maker Integration Reference Map

English counterpart for `references/image-maker-integration.ko.md`. Use this as the quick integration map, then read the Korean original for the full Korean production contract.

## Contract

`product-detail-maker` owns the Korean commerce strategy, copy, section structure, image planning, image generation execution management, and final package. When the user asks for images, it must continue through actual raster generation or editing, visual validation, and archive. Downloaded source images are source/reference assets only.

## Preferred Local References

When present, read:

1. `skills/image-maker/SKILL.md`
2. `skills/image-maker/rules/natural-image-workflow.md` or `.ko.md`
3. `skills/image-maker/references/json-prompt-best-practices.md` or `.ko.md`
4. `skills/image-maker/scripts/archive-generated-images.mjs`

If those files are absent, use the available runtime image generation path while preserving the same prompt review, generation/editing, validation, and archive contract.

## End-to-End Flow

Create the detail-page strategy and section map, write Korean copy, define the cut list, convert selected cuts into `integrated_image_job` entries, transform them into the `skills/image-maker` English JSON prompt schema, run `gpt-image-2` generation or editing, visually inspect results, iterate narrowly on failures, and archive under `.hypercore/image-maker/<topic-slug>/`.

## No Download-Only Completion

If an image job is `generate`, `edit`, `reference-guided generate`, or `batch/variants`, completion requires `.hypercore/image-maker/<topic-slug>/prompt.json` plus at least one generated or edited image file. Existing product photos must be labeled as existing/source assets, not generated images.

## Final Report Fields

Report detail-page artifact paths, image archive path, image-maker files/rules used, generation model/size/quality when known, generated image filenames, and human-review risks for text, rights, claims, and product information.
