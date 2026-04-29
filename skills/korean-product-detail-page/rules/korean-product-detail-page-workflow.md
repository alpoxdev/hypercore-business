# Korean Product Detail Page Workflow

## 1. Inputs to extract

Collect or infer:

- Product: name, category, price tier, variants, ingredients/materials, certifications, origin, package contents
- Buyer: who buys, buying occasion, hesitation, comparison alternatives, Korean search keywords
- Channel: SmartStore, Cafe24, Coupang-like marketplace, Gmarket/Auction, own mall, social commerce, crowdfunding
- Assets: product photos, lifestyle photos, logo, brand colors, reviews, test results, manuals, existing product detail page
- Risk: cosmetics/health food/medical/children/electronics/food/legal-sensitive claims

If missing, state assumptions in an `Assumptions` block and continue.

## 2. Research pass

Run Korean-first searches or use supplied references:

- Platform constraints: target marketplace help center or seller docs
- Category references: top Korean sellers, domestic templates, agency examples, creator guides
- Buyer language: Korean reviews, Q&A, community phrasing, Naver shopping style terms when available
- Compliance: Korean e-commerce product information notice, KC/food/cosmetic warning needs, refund/A/S expectations

Stop when you can justify section order, image cuts, and claim safety with enough evidence.

## 3. Offer and narrative

Define:

- `one_line_offer`: one sentence promise that can appear in the hero
- `belief_shift`: what the shopper should believe after scrolling
- `primary_objection`: the biggest reason not to buy
- `proof_stack`: reviews, test data, before/after, materials, manufacturing, creator story, guarantee
- `visual_motif`: repeated image style and layout rhythm

## 4. Section map

Use this default Korean commerce funnel:

1. Hero: product + key promise + main visual
2. Problem: everyday Korean context, pain, comparison
3. Benefit: 3 value pillars with small proof
4. Proof: review/test/certification/process/material details
5. Usage: when/how/who uses it, step-by-step
6. Detail: close-ups, dimensions, ingredients/materials, package contents
7. Options: color/size/set/quantity comparison
8. FAQ: objections and risk reduction
9. Policy: shipping, exchange/refund, A/S, Korean product information notice

Adapt section order for category:

- Fashion: fit/size and styling earlier
- Food: taste/ingredient/origin/storage earlier
- Beauty: concern/texture/how-to-use and caution earlier
- Electronics: specs/compatibility/warranty earlier
- B2B/service: ROI/process/case proof earlier

## 5. Copy rules

- Write final visible product-page copy in natural Korean; avoid machine-translated slogans.
- Use short mobile headlines and scannable bullets.
- Separate hard facts from emotional copy.
- Do not invent reviews, certifications, clinical results, awards, origin, manufacturing process, or before/after outcomes.
- Mark claims requiring seller proof with a Korean localized seller-verification marker in the final output.
- Make CTA/channel text fit the platform; many marketplaces own the actual buy button.

## 6. Image/cut planning

For each section, specify:

- `job`: generate, edit, product-photo required, diagram, table, text block, or existing asset
- `subject`: product, person, hand, space, package, ingredient/material, comparison object
- `composition`: crop, angle, negative space, mobile safe zone
- `copy_overlay`: exact Korean text if any; mark text risk high for generated raster images
- `proof_role`: what belief the image supports
- `avoid`: over-polished AI gloss, fake certification, unreadable microcopy, impossible use scene

Prefer exact Korean text in editable design layers or HTML over generated image text when possible.

## 7. Actual image generation/editing

When images are requested, continue into real asset production instead of stopping at briefs:

1. Read `references/image-generation-integration.ko.md`.
2. Reference `skills/image-generation/SKILL.md`, `rules/natural-image-workflow.md`, `references/json-prompt-best-practices.md`, and `scripts/archive-generated-images.mjs`.
3. Convert cut briefs into English JSON prompts.
4. Review the JSON prompt before generation.
5. Generate or edit actual images through the available image generation/editing path.
6. Inspect the result for product accuracy, naturalism, text, and rights risk.
7. If a result fails, iterate narrowly on one failure dimension at a time.
8. Archive final images under `.hypercore/image-generation/<topic-slug>/` as `prompt.json`, `image1.*`, `image2.*`.

## 8. Output packaging

For chat-only output, return Korean user-facing content in this order:

1. Research-backed strategy summary
2. Section-by-section product detail page wireframe
3. Korean copydeck
4. Image cut list / prompt briefs
5. Generated image paths and archive paths when images were generated
6. Platform and legal checklist
7. Open risks and required seller-provided facts

For project-bound output, create files under a clear directory such as `.hypercore/detail-pages/<product-slug>/`.
