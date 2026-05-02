# Natural Image Workflow Rules

Use these rules after the core skill decides the asset should be generated or edited. Apply them while creating and reviewing the English JSON prompt, before image generation.

## 1. Start from the job, not from style adjectives

Define the image's job before prompting:

- What should the viewer understand, trust, or feel?
- Where will the image appear?
- What must be factually or commercially accurate?
- What should be deliberately absent because it would feel like stock or AI filler?

Avoid empty quality stacks such as `ultra realistic, masterpiece, 8K, award winning`. Replace them with observable capture/design constraints.

## 1.1 Convert requirements into English JSON before generating

Every run must follow this gate:

```text
user requirements → English JSON prompt → prompt review → gpt-image-2 generation/edit → visual validation
```

Rules:

- Follow the schema and review gates in `references/json-prompt-best-practices.md`.
- Summarize user requirements in English in `user_requirements_summary`.
- Keep API/output controls in `generation_settings`, separate from creative direction in `image_prompt`.
- Keep all prompt-facing JSON values in English.
- Preserve exact visible text in the original requested language under `image_prompt.text.verbatim`.
- Put assumptions, source-input roles, research anchors, and edit invariants in the JSON rather than hiding them in prose.
- Assemble `generation_prompt` only after the JSON has passed review.
- If a later iteration changes the image direction, update the JSON and rerun the prompt review before generating again.

## 1.2 Select aspect ratio from placement before writing the prompt

Choose the aspect ratio and pixel size from the intended placement, not from
generic aesthetics. If the user does not specify a ratio, infer the placement
family and record the assumption in the JSON prompt.

| Placement family | Default aspect ratio | Recommended `gpt-image-2` size | Safe-zone rule |
|---|---:|---|---|
| Landing or web hero | 3:2 or 16:9 | `1536x1024` or `1792x1008` | Keep the subject outside the text side; reserve 25-40% negative space for copy. |
| Editorial/article cover | 3:2 | `1536x1024` | Keep the focal subject inside the center 70% so cards can crop safely. |
| Social portrait/story | 4:5 or 9:16 | `1024x1280` or `1024x1792` | Keep faces, product, and required text inside the middle 80%; avoid edge-critical details. |
| Social square/card thumbnail | 1:1 | `1024x1024` | Keep the main subject readable at small sizes and away from all four edges. |
| Ad banner or wide UI slot | 2:1 to 3:1 | `1536x768` or `1920x640` | Use a simple subject and one clear focal path; avoid tiny text. |
| Product context/detail | 4:3 or 3:2 | `1360x1024` or `1536x1024` | Preserve product proportions and include scale references. |

Custom sizes must remain compatible with `gpt-image-2`: each edge is a
multiple-of-16, the long:short ratio is no more than 3:1, and the image has
enough pixels for the intended use. If the requested output will be cropped by
the destination, add a crop tolerance note and describe what must stay inside
the safe zone.

## 2. Choose one capture or design story

Pick exactly one primary story per image:

| Story | Use when | Helpful cues |
|---|---|---|
| Candid phone/documentary | Human, UGC, event, social proof | phone camera, ambient light, slight motion blur, imperfect framing |
| Editorial business photo | B2B/company/content imagery | real office context, purposeful subject, natural posture, one believable light source |
| Product context/lifestyle | Product or service needs use-context | product proportions, scale reference, material texture, real surface, plausible props |
| Clean product studio | Catalog, ad, app store, marketplace | controlled softbox/window light, accurate shadows, consistent background, no fake reflections |
| Designed illustration | Blog/brand/editorial abstraction | original composition, consistent style system, limited palette, no fake-photo cues |
| UI/mockup visual | Screen/product concept | legible layout, realistic device or browser frame, exact text only where needed |

Do not mix contradictory cues such as raw phone snapshot + flawless cinematic studio lighting.

## 3. Add physical evidence instead of generic realism

Use two or three relevant evidence types:

- Lighting evidence: direction, hardness/softness, color temperature, shadow logic.
- Optical evidence: lens perspective, depth of field, edge softness, sensor noise, mild motion blur.
- Material evidence: fabric weave, skin pores, glass smudges, metal fingerprints, paper grain, dust, product seams.
- Context evidence: believable clutter, scale reference, seasonal cues, location-specific details.
- Social evidence: natural posture, non-performative expressions, real task interaction.

Use only one or two imperfections. Too many flaws become a visible effect.

## 4. Make context specific without overfitting

For each asset, include:

- the user's business/content situation
- target audience or user state
- the exact moment being shown
- what is in frame and what is outside the frame
- one reason the setting makes sense

If the situation includes current products, locations, cultural symbols, public events, specialized equipment, or regulated claims, research before generating.

## 5. Avoid common AI tells

Add avoid constraints only when relevant:

- waxy or over-smoothed skin
- perfect stock-photo smiles and staged pointing-at-laptop scenes
- impossible shadows or multiple unexplained light sources
- extra fingers, fused hands, distorted teeth, asymmetrical eyes
- warped logos, fake UI text, fake signage, pseudo-writing
- repeated background patterns or clone-like people
- over-saturated HDR, excessive sharpening, plastic materials
- generic futuristic blue gradients when no such tone is requested

## 6. Validate in this order

1. Geometry: perspective, body/product proportions, scale, focal length.
2. Lighting: one dominant light source explains highlights and shadows.
3. Materials: skin, fabric, product surfaces, glass, metal, paper react believably.
4. Context: scene details match the business/content situation.
5. Text: only requested text appears, spelled exactly, with sufficient contrast.
6. Brand/use fit: image works in the target placement and does not feel generic.
7. Provenance risk: no recognizable unlicensed logos, trademarks, or real-person likenesses unless explicitly permitted.

## 7. Iteration prompts

Use narrow follow-ups:

- "Keep the composition and subject unchanged; adjust only the lighting to a single overcast window-light source."
- "Keep the product proportions unchanged; add only subtle material texture and reduce the plastic sheen."
- "Keep the scene unchanged; remove the generic stock-photo smiles and make the people focused on the actual task."
- "Keep all visual elements unchanged; correct only the text to read exactly: '<text>'."
