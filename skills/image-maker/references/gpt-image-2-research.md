# gpt-image-2 Research Notes for HyperB Image Maker

Last researched: 2026-04-29.

This reference summarizes the saved research report at `.hypercore/research/2026-04-29-image-maker-naturalism.md`.

## Operational facts

- OpenAI's image docs list `gpt-image-2` for image generation and edits and expose generation/edit endpoints through the Image API. Source: OpenAI Image Generation docs.
- `gpt-image-2` is the required model for this skill. OpenAI describes GPT Image 2 as its state-of-the-art image generation model for fast, high-quality generation and editing; the GPT Image 1.5 prompting guide remains useful for transferable production prompting patterns such as photorealism, text-heavy images, compositing, and identity-sensitive edits.
- Supported quality values are `low`, `medium`, `high`, and `auto`. Use `low` for quick drafts; use `medium` or `high` for final assets.
- `gpt-image-2` accepts custom sizes when constraints are satisfied: max edge up to 3840 px, both edges multiples of 16 px, long:short ratio no more than 3:1, and total pixels between 655,360 and 8,294,400. Outputs above 2560×1440 are more variable/experimental.
- `gpt-image-2` automatically processes image inputs at high fidelity; do not set `input_fidelity`.
- Native transparent background is not supported by `gpt-image-2` in the OpenAI Image API. Use an opaque or chroma-key workflow unless the user changes the model requirement.

## Naturalism principles

- Believable images rely on physical cues more than beauty words: camera behavior, lighting direction, material texture, exposure, and plausible context.
- Avoid generic stock-photo composition. Images should carry task-relevant information: use-context, scale, texture, compatibility, or a real customer/business moment.
- Lighting choices should be explicit. Natural vs artificial, light position, softness/hardness, and color temperature change the perceived realism and mood.
- AI-detection/artifact research highlights recurring suspicion cues: anatomical errors, stylistic inconsistencies, functional implausibilities, physics violations, and sociocultural mismatches. Validate against these categories.
- For HyperB usage, the operational prompt process is: convert user requirements into a valid English JSON prompt, review and repair the JSON, then generate with `gpt-image-2`. This reduces hidden assumptions and makes the pre-generation quality gate inspectable.

## Source map

- OpenAI Image Generation docs: https://developers.openai.com/api/docs/guides/image-generation
- OpenAI GPT Image 1.5 prompting guide: https://developers.openai.com/cookbook/examples/multimodal/image-gen-1.5-prompting_guide
- OpenAI ChatGPT Images 2.0 system card: https://deploymentsafety.openai.com/chatgpt-images-2-0/chatgpt-images-2-0.pdf
- Baymard Institute product image UX article: https://baymard.com/blog/ux-product-image-categories
- Nat Currier photorealism guide: https://nat.io/blog/achieving-photorealism-guide
- Shutterstock lighting guide: https://www.shutterstock.com/blog/lighting-in-photography
- Kamali et al. arXiv paper on AI image artifacts: https://arxiv.org/abs/2406.08651
