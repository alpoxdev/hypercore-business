# 자연스러운 이미지 워크플로우 규칙

core skill이 에셋을 생성하거나 편집해야 한다고 판단한 뒤 이 규칙을 사용한다. 이미지 생성 전에 영어 JSON 프롬프트를 만들고 검수할 때 적용한다.

## 1. 스타일 형용사가 아니라 이미지의 일부터 시작한다

프롬프트를 쓰기 전에 이미지의 일을 정의한다:

- 보는 사람이 무엇을 이해하거나, 신뢰하거나, 느껴야 하는가?
- 이미지는 어디에 배치되는가?
- 사실적 또는 상업적으로 정확해야 하는 것은 무엇인가?
- 스톡 이미지나 AI filler처럼 느껴져서 의도적으로 없어야 하는 것은 무엇인가?

`ultra realistic, masterpiece, 8K, award winning` 같은 빈 quality stack을 피한다. 대신 관찰 가능한 촬영/디자인 제약으로 바꾼다.

## 1.1 생성 전에 영어 JSON으로 요구사항을 변환한다

모든 실행은 이 gate를 따른다:

```text
user requirements → English JSON prompt → prompt review → gpt-image-2 generation/edit → visual validation
```

규칙:

- `references/json-prompt-best-practices.ko.md`의 schema와 review gate를 따른다.
- 사용자 요구사항을 영어로 요약해 `user_requirements_summary`에 넣는다.
- API/output control은 `generation_settings`에 두고, creative direction은 `image_prompt`에 분리한다.
- prompt-facing JSON 값은 모두 영어로 유지한다.
- 실제 표시 문구는 원래 요청된 언어 그대로 `image_prompt.text.verbatim`에 보존한다.
- assumptions, source-input role, research anchor, edit invariant를 prose에 숨기지 말고 JSON에 넣는다.
- JSON review를 통과한 뒤에만 `generation_prompt`를 조립한다.
- 이후 iteration에서 이미지 방향이 바뀌면 JSON을 업데이트하고, 다음 생성 전에 prompt review를 다시 실행한다.

## 1.2 프롬프트 작성 전에 배치 기준으로 화면비를 고른다

화면비와 pixel size는 generic aesthetics가 아니라 intended placement에서 고른다. 사용자가 ratio를 지정하지 않으면 placement family를 추론하고 그 가정을 JSON prompt에 기록한다.

| Placement family | Default aspect ratio | Recommended `gpt-image-2` size | Safe-zone rule |
|---|---:|---|---|
| Landing or web hero | 3:2 or 16:9 | `1536x1024` or `1792x1008` | copy용 negative space를 25-40% 확보하고 subject는 text side를 피한다. |
| Editorial/article cover | 3:2 | `1536x1024` | card crop에 안전하도록 focal subject를 중앙 70% 안에 둔다. |
| Social portrait/story | 4:5 or 9:16 | `1024x1280` or `1024x1792` | faces, product, required text를 middle 80% 안에 두고 edge-critical detail을 피한다. |
| Social square/card thumbnail | 1:1 | `1024x1024` | main subject가 작은 크기에서도 읽히고 네 모서리에서 떨어지게 한다. |
| Ad banner or wide UI slot | 2:1 to 3:1 | `1536x768` or `1920x640` | subject를 단순하게 두고 focal path를 하나만 만든다. tiny text는 피한다. |
| Product context/detail | 4:3 or 3:2 | `1360x1024` or `1536x1024` | product proportions를 보존하고 scale reference를 포함한다. |

Custom size는 `gpt-image-2`와 호환되어야 한다: 각 edge는 16의 배수, long:short ratio는 3:1 이하, intended use에 충분한 pixel 수를 가져야 한다. destination에서 crop될 출력이면 crop tolerance note를 추가하고 safe zone 안에 반드시 남아야 하는 것을 설명한다.

## 2. 하나의 capture 또는 design story를 선택한다

이미지마다 primary story를 정확히 하나만 고른다:

| Story | Use when | Helpful cues |
|---|---|---|
| Candid phone/documentary | Human, UGC, event, social proof | phone camera, ambient light, slight motion blur, imperfect framing |
| Editorial business photo | B2B/company/content imagery | real office context, purposeful subject, natural posture, one believable light source |
| Product context/lifestyle | Product or service needs use-context | product proportions, scale reference, material texture, real surface, plausible props |
| Clean product studio | Catalog, ad, app store, marketplace | controlled softbox/window light, accurate shadows, consistent background, no fake reflections |
| Designed illustration | Blog/brand/editorial abstraction | original composition, consistent style system, limited palette, no fake-photo cues |
| UI/mockup visual | Screen/product concept | legible layout, realistic device or browser frame, exact text only where needed |

raw phone snapshot과 flawless cinematic studio lighting처럼 서로 모순되는 cue를 섞지 않는다.

## 3. generic realism 대신 physical evidence를 추가한다

관련 있는 evidence type을 두세 개 사용한다:

- Lighting evidence: direction, hardness/softness, color temperature, shadow logic.
- Optical evidence: lens perspective, depth of field, edge softness, sensor noise, mild motion blur.
- Material evidence: fabric weave, skin pores, glass smudges, metal fingerprints, paper grain, dust, product seams.
- Context evidence: believable clutter, scale reference, seasonal cues, location-specific details.
- Social evidence: natural posture, non-performative expressions, real task interaction.

imperfection은 하나 또는 둘만 사용한다. 결함이 너무 많으면 의도적인 effect처럼 보인다.

## 4. 과적합하지 않게 context를 구체화한다

각 에셋에는 다음을 포함한다:

- 사용자의 business/content situation
- target audience 또는 user state
- frame에 담기는 정확한 moment
- frame 안에 있는 것과 밖에 있는 것
- 이 setting이 말이 되는 이유 하나

상황에 current products, locations, cultural symbols, public events, specialized equipment, regulated claims가 포함되면 생성 전에 research한다.

## 5. 흔한 AI tell을 피한다

관련 있을 때만 avoid constraint를 추가한다:

- waxy or over-smoothed skin
- perfect stock-photo smiles and staged pointing-at-laptop scenes
- impossible shadows or multiple unexplained light sources
- extra fingers, fused hands, distorted teeth, asymmetrical eyes
- warped logos, fake UI text, fake signage, pseudo-writing
- repeated background patterns or clone-like people
- over-saturated HDR, excessive sharpening, plastic materials
- generic futuristic blue gradients when no such tone is requested

## 6. 이 순서로 검증한다

1. Geometry: perspective, body/product proportions, scale, focal length.
2. Lighting: one dominant light source explains highlights and shadows.
3. Materials: skin, fabric, product surfaces, glass, metal, paper react believably.
4. Context: scene details match the business/content situation.
5. Text: only requested text appears, spelled exactly, with sufficient contrast.
6. Brand/use fit: image works in the target placement and does not feel generic.
7. Provenance risk: 명시적으로 허용되지 않은 recognizable unlicensed logos, trademarks, real-person likenesses가 없는지 확인한다.

## 7. Iteration prompts

좁은 follow-up을 사용한다:

- "Keep the composition and subject unchanged; adjust only the lighting to a single overcast window-light source."
- "Keep the product proportions unchanged; add only subtle material texture and reduce the plastic sheen."
- "Keep the scene unchanged; remove the generic stock-photo smiles and make the people focused on the actual task."
- "Keep all visual elements unchanged; correct only the text to read exactly: '<text>'."
