# HyperB 이미지 생성을 위한 JSON Prompt Best Practices

Last researched: 2026-04-29.

`gpt-image-2` generation 또는 editing 전에 사용자 요구사항을 필수 English JSON prompt로 변환할 때 이 reference를 사용한다.

## Core principle

JSON prompt는 단순한 API payload가 아니라 inspectable planning artifact다. 다음을 분리해야 한다:

1. **Generation settings**: model, task, size, quality, format, destination, canonical save path, archive directory, preview HTML path.
2. **User intent**: 사용자가 요청한 것, 추론한 것, 아직 모르는 것.
3. **Source grounding**: factual/visual anchor로 사용한 local files, URLs, reference images.
4. **Image direction**: subject, scene, composition, lighting, materials, text, invariants, avoid constraints를 포함한 하나의 coherent capture/design story.
5. **Review state**: machine-checkable checklist values와 unresolved risks.
6. **Model-facing prompt**: review 이후에만 조립되는 concise English `generation_prompt`.

## Researched best practices

### 1. 안정적인 schema를 사용하고 생성 전에 검증한다

OpenAI Structured Outputs guidance는 reliable JSON shape가 중요할 때 schema-backed output을 권장한다. valid JSON만으로는 schema adherence가 보장되지 않기 때문이다. 이 skill에서는 안정적인 hand-authored schema를 유지하고, generation 전에 JSON parser로 parse한 뒤 checklist를 실행하는 것을 practical fallback으로 삼는다.

Practical rule for this skill:

- double-quoted JSON만 사용한다. comments나 trailing comma를 쓰지 않는다.
- review가 빠르고 diff가 의미 있도록 key order를 안정적으로 유지한다.
- field 변경 시 `schema_version`을 compatibility marker로 사용한다.
- `task`, `quality`, `format`, `destination_intent` 같은 field에는 enum을 선호한다.
- 항상 `generation_settings.archive_dir`, `generation_settings.save_path`, `generation_settings.prompt_path`, `generation_settings.preview_html_path`를 포함한다. 기본값은 current repository root 기준 `.hypercore/image-maker/<topic-slug>/...`다.
- required field를 모르면 field를 조용히 생략하지 말고 explicit assumption 또는 `"unknown_but_non_blocking"`을 적는다.

### 2. API settings와 creative direction을 분리한다

OpenAI image docs는 model/output control(`model`, `size`, `quality`, `output_format`, supported compression/background)을 text prompt와 분리한다. JSON prompt에서도 같은 split을 유지하면 creative brief를 다시 쓰지 않고 cost/latency setting을 바꿀 수 있다.

Practical rule for this skill:

- `model`, `task`, `size`, `quality`, `format`, destination, `archive_dir`, `save_path`, `prompt_path`, `preview_html_path`는 `generation_settings` / `output` 아래에 둔다.
- `image_prompt`는 이미지가 무엇을 묘사해야 하는지에 집중한다.
- `gpt-image-2`에서는 documented size constraint를 지키고, 이 모델이 Image API에서 transparent background를 지원하지 않는다는 점을 기억한다.
- draft에는 `quality: "low"`, final asset에는 `"medium"`/`"high"`를 사용한다.

### 3. 반복 가능한 순서로 image prompt를 구조화한다

OpenAI의 GPT Image 1.5 prompting guide는 background/scene, subject, key details, constraints, intended use의 일관된 prompt order를 권장한다. 복잡한 요청에는 labeled segment도 권장한다. JSON은 이 segment를 field로 만들어 review 가능하게 하므로 유용하다.

Practical rule for this skill:

- stylistic detail보다 intended use를 먼저 설명한다.
- 하나의 coherent `capture_or_design_story`를 사용한다. phone snapshot, studio packshot, cinematic lighting, documentary realism을 한 prompt에 섞지 않는다.
- composition보다 placement와 safe-zone requirement를 먼저 포함한다.
- targeted quality cue만 추가한다. `8K, masterpiece, ultra realistic` 같은 generic stack은 피한다.

### 4. Reference image와 edit invariant를 명시적으로 encode한다

OpenAI image docs와 cookbook examples는 multiple image input을 사용한 generation/editing을 보여준다. prompting guide는 reference를 index와 role로 명명하고, edit에서는 무엇이 바뀌어야 하고 무엇이 유지되어야 하는지를 분리하라고 강조한다.

Practical rule for this skill:

- reference images/local files는 `source_inputs[]`에 넣고 각 항목에 `subject_reference`, `style_reference`, `product_reference`, `background_reference`, `mask` 같은 `role`을 부여한다.
- edit에서는 `generation_prompt`를 쓰기 전에 `edit_plan.change_only`, `edit_plan.preserve`, `edit_plan.allowed_drift`를 채운다.
- compositing에서는 무엇을 어디로 옮기는지, scale/perspective matching, lighting/shadow integration을 명시한다.
- drift를 피하기 위해 모든 iteration에서 invariant를 다시 적는다.

### 5. Visible text는 high-risk field로 취급한다

OpenAI image docs는 text rendering이 개선되었지만 여전히 limitation이 있다고 설명한다. image prompting guide는 in-image text에 대해 exact verbatim copy, placement, typography, contrast, iteration을 권장한다.

Practical rule for this skill:

- 정확한 visible text는 `image_prompt.text.verbatim`에만 넣는다.
- 다른 prompt value가 영어여도 visible text에서는 사용자의 원래 언어와 spelling을 보존한다.
- text가 한 번만 나타나야 하는지, 생략되어야 하는지, 수정되어야 하는지 명시한다.
- 짧은 text를 선호한다. text fidelity가 필수라면 review risk로 표시하고 output을 수동 inspect한다.

### 6. Realism은 physical evidence로 표현한다

OpenAI image prompting guide는 natural photorealism을 위해 lens/framing, lighting, real texture, imperfections, over-staged polish 회피 같은 photography language를 권장한다. 이를 style-word soup가 아니라 structured field로 옮긴다.

Practical rule for this skill:

- 하나의 lighting story를 요구한다: source, direction, softness/hardness, relevant color temperature.
- material evidence를 추가한다: fabric weave, glass smudges, paper grain, skin pores, product seams, 기타 scene-specific texture.
- capture story에 맞는 natural imperfection을 최대 한두 개만 사용한다.
- `avoid` constraint는 현재 요청에서 실제로 발생할 가능성이 높은 failure mode에만 추가한다.

### 7. Review와 generation을 분리한다

JSON은 generation cost를 쓰기 전에 prompt가 준비됐는지 분명히 보여줘야 한다. 최종 `generation_prompt`는 review 이후에 조립한다.

Practical rule for this skill:

- check가 끝나기 전에는 `review_checklist` boolean을 false로 둔다.
- text, layout precision, brand/legal rights, factual uncertainty에는 `review_notes.unresolved_risks`를 추가한다.
- required checklist field가 false인 동안에는 generate하지 않는다.
- iteration에서는 실패한 dimension 하나만 업데이트하고 checklist를 다시 실행한다.

## Minimal JSON schema shape

`references/prompt-schema.ko.md`가 canonical full example을 소유한다. 이 reference는 required field group을 정의한다:

```text
schema_version
model
task
use_case
generation_settings
artifact_archive
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

fresh generation에서는 `edit_plan`이 `null`일 수 있다. `source_inputs`와 `research_anchors`는 scene이 simple, non-factual, not reference-guided일 때만 empty array일 수 있다.

## Source map

- OpenAI GPT Image 2 model page: https://developers.openai.com/api/docs/models/gpt-image-2
- OpenAI Image Generation docs: https://developers.openai.com/api/docs/guides/image-generation
- OpenAI Images API reference: https://developers.openai.com/api/reference/resources/images
- OpenAI Structured Outputs docs: https://developers.openai.com/api/docs/guides/structured-outputs
- OpenAI Prompting docs: https://developers.openai.com/api/docs/guides/prompting
- OpenAI GPT Image 1.5 prompting guide: https://developers.openai.com/cookbook/examples/multimodal/image-gen-1.5-prompting_guide
- OpenAI Generate Images with GPT Image cookbook: https://developers.openai.com/cookbook/examples/generate_images_with_gpt_image
