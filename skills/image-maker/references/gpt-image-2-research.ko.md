# HyperB 이미지 생성을 위한 gpt-image-2 리서치 노트

Last researched: 2026-04-29.

이 reference는 `.hypercore/research/2026-04-29-image-maker-naturalism.md`에 저장된 리서치 보고서를 요약한다.

## Operational facts

- OpenAI image docs는 `gpt-image-2`를 Image API의 image generation/edit endpoints에서 사용할 수 있는 모델로 문서화한다. Source: OpenAI Image Generation docs.
- 이 skill에서 요구하는 모델은 `gpt-image-2`다. OpenAI는 GPT Image 2를 빠르고 고품질인 generation/editing을 위한 state-of-the-art image generation model로 설명한다. GPT Image 1.5 prompting guide는 photorealism, text-heavy images, compositing, identity-sensitive edits 같은 production prompting pattern에 대해 여전히 이전 가능한 heuristic으로 유용하다.
- 지원되는 quality 값은 `low`, `medium`, `high`, `auto`다. 빠른 draft에는 `low`, final asset에는 `medium` 또는 `high`를 사용한다.
- `gpt-image-2`는 constraints를 만족하는 custom size를 받는다: max edge up to 3840 px, both edges multiples of 16 px, long:short ratio no more than 3:1, total pixels between 655,360 and 8,294,400. 2560×1440보다 큰 output은 더 variable/experimental하다.
- `gpt-image-2`는 image input을 자동으로 high fidelity 처리하므로 `input_fidelity`를 설정하지 않는다.
- OpenAI Image API에서 `gpt-image-2`는 native transparent background를 지원하지 않는다. 사용자가 모델 요구사항을 바꾸지 않는 한 opaque 또는 chroma-key workflow를 사용한다.

## Naturalism principles

- Believable image는 beauty words보다 physical cues에 의존한다: camera behavior, lighting direction, material texture, exposure, plausible context.
- generic stock-photo composition을 피한다. 이미지는 use-context, scale, texture, compatibility, real customer/business moment 같은 task-relevant information을 담아야 한다.
- Lighting choice는 명시적이어야 한다. Natural vs artificial, light position, softness/hardness, color temperature는 realism과 mood에 영향을 준다.
- AI-detection/artifact research는 의심을 만드는 반복 cue를 강조한다: anatomical errors, stylistic inconsistencies, functional implausibilities, physics violations, sociocultural mismatches. 이 category로 검증한다.
- HyperB usage에서 operational prompt process는 `user requirements → valid English JSON prompt → review and repair JSON → generate with gpt-image-2`다. 이 방식은 hidden assumption을 줄이고 generation 전 quality gate를 inspectable하게 만든다.

## Source map

- OpenAI Image Generation docs: https://developers.openai.com/api/docs/guides/image-generation
- OpenAI GPT Image 1.5 prompting guide: https://developers.openai.com/cookbook/examples/multimodal/image-gen-1.5-prompting_guide
- OpenAI ChatGPT Images 2.0 system card: https://deploymentsafety.openai.com/chatgpt-images-2-0/chatgpt-images-2-0.pdf
- Baymard Institute product image UX article: https://baymard.com/blog/ux-product-image-categories
- Nat Currier photorealism guide: https://nat.io/blog/achieving-photorealism-guide
- Shutterstock lighting guide: https://www.shutterstock.com/blog/lighting-in-photography
- Kamali et al. arXiv paper on AI image artifacts: https://arxiv.org/abs/2406.08651
