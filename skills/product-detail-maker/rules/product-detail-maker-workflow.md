# Product Detail Maker Workflow

## 1. Inputs to extract

Collect or infer:

- Product: name, primary category, subcategory, price tier, variants, ingredients/materials, certifications, origin, package contents
- Buyer: who buys, buying occasion, hesitation, comparison alternatives, Korean search keywords
- Channel: SmartStore, Cafe24, Coupang-like marketplace, Gmarket/Auction, own mall, social commerce, crowdfunding
- Assets: product photos, lifestyle photos, logo, brand colors, reviews, test results, manuals, existing product detail page, Figma file key or design system references when available
- Supplied links: product pages, competitor pages, design references, platform examples, whether they need login/session, and whether lightweight DevTools/CDP review is appropriate
- Risk: cosmetics/health food/medical/children/electronics/food/legal-sensitive claims

If missing, state assumptions in an `Assumptions` block and continue. Do not ask for permission before creating a Figma-ready spec; ask only when product identity, category, or legal risk cannot be inferred safely.

## 2. Research pass

Run Korean-first searches or use supplied references:

- Platform constraints: target marketplace help center or seller docs
- Category references: top Korean sellers, domestic templates, agency examples, creator guides
- Buyer language: Korean reviews, Q&A, community phrasing, Naver shopping style terms when available
- Compliance: Korean e-commerce product information notice, KC/food/cosmetic warning needs, refund/A/S expectations

For user-supplied links, use lightweight Chrome DevTools/CDP-first link research when available:

1. Open the link in the user-visible Chrome/Edge browser or an existing DevTools/CDP endpoint before trying static HTML parsing. Prefer direct CDP observations over heavier browser automation frameworks.
2. Capture rendered evidence: URL, access date, screenshot path if captured, visible headline/copy, section order, image rhythm, product proof, and blocked/login-only state.
3. Use static HTML parsing only as a fallback for public simple pages or to supplement browser observations.
4. Do not escalate into bypass automation. If a normal user-visible browser cannot show the page, request user-provided screenshots, PDF export, copied text, or approved source materials.
5. Keep cookies, tokens, profile IDs, CDP endpoints, and browser state files out of deliverables and git.

Read `references/browser-link-research.ko.md` for DevTools/CDP channel priority, capture checklist, profile-browser adapter notes, and safe fallbacks.

Stop when you can justify category playbook selection, section order, image cuts, and claim safety with enough evidence.

## 3. Category playbook and style/template selection

Before drafting section order, classify the product into one primary category and optional secondary category:

- Beauty/skincare/cosmetics
- Food/beverage/health food
- Fashion/apparel
- Fashion accessories/bags/jewelry
- Living/home/kitchen
- Electronics/appliances
- Baby/kids/pet
- Digital/service/B2B
- Other/special-regulated

For each category, define:

- `category_playbook`: which section order and required proof blocks to use
- `category_required_facts`: ingredients, size, certifications, warranty, safety, allergy, or other facts needed before final production
- `claim_risk_level`: low, medium, high, regulated
- `style_template`: clean, premium, playful, technical, natural, editorial, functional, or another explicit tone
- `figma_block_library`: reusable sections needed for this category

When the user asks for a Sang-se-like result, use `references/sangse-style-benchmark.ko.md` for workflow patterns only. Do not copy Sang-se brand assets, copy, characters, sample designs, UI trade dress, or templates.

## 4. Offer and narrative

Define:

- `one_line_offer`: one sentence promise that can appear in the hero
- `belief_shift`: what the shopper should believe after scrolling
- `primary_objection`: the biggest reason not to buy
- `proof_stack`: reviews, test data, before/after, materials, manufacturing, creator story, guarantee
- `visual_motif`: repeated image style and layout rhythm

## 5. Section map

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

Adapt section order for category; read `references/section-templates.ko.md` for detailed category playbooks:

- Fashion: fit/size and styling earlier
- Food: taste/ingredient/origin/storage earlier
- Beauty: concern/texture/how-to-use and caution earlier
- Electronics: specs/compatibility/warranty earlier
- B2B/service: ROI/process/case proof earlier

## 6. Copy rules

- Write final visible product-page copy in natural Korean; avoid machine-translated slogans.
- Use short mobile headlines and scannable bullets.
- Separate hard facts from emotional copy.
- Do not invent reviews, certifications, clinical results, awards, origin, manufacturing process, or before/after outcomes.
- Mark claims requiring seller proof with a Korean localized seller-verification marker in the final output.
- Make CTA/channel text fit the platform; many marketplaces own the actual buy button.

## 7. Figma layout and Image/cut planning

For the production layout, do not default to HTML.
Create `figma-frame-spec.json` first, or use Figma MCP write tools directly when a Figma file key is available.
Read `references/figma-mcp-output.ko.md` for the Figma contract.
If no Figma file key is available, save Figma-ready spec rather than HTML and record the missing key/tool limitation.

Before placing images in Figma, build an `image_asset_analysis` ledger for each image. Include `background_type`, `alpha_available`, `edge_quality`, `crop_fit`, `lighting_match`, `section_background`, `placement_decision`, and `required_action`. Choose transparent extraction, matching tonal plate, full-bleed crop, masked card, regenerate/edit, or asset-needed before final layout. A raw white product square on a dark or premium section is a visual QA failure unless it is intentionally framed as a balanced card.

For each Figma section, specify:

- `frame_name`: stable section/layer name
- `layout_pattern`: image-led, split, card-stack, editorial, table, diagram, FAQ, policy
- `editable_text_layers`: Korean copy that must remain editable
- `image_placeholders`: generated, edited, or existing image placements
- `asset_status`: existing/source, generated, edited, or asset-needed; never present downloaded source images as generated outputs
- `export_target`: section PNG/JPG/PDF or design-only

For each image cut, specify:

- `job`: generate, edit, product-photo required, diagram, table, text block, or existing asset
- `subject`: product, person, hand, space, package, ingredient/material, comparison object
- `composition`: crop, angle, negative space, mobile safe zone
- `copy_overlay`: exact text if any; mark text risk high for generated raster images and prefer editable Figma text layers
- `proof_role`: what belief the image supports
- `avoid`: over-polished AI gloss, fake certification, unreadable microcopy, impossible use scene

Prefer exact visible text in editable Figma design layers over generated image text. Use HTML only if the user explicitly requests HTML or a documented validation need requires it.

Before completing Figma work, capture or inspect a screenshot/context and fix text overlap, clipped Korean copy, unreadable small text, broken spacing, and AI-looking placeholder visuals. If image import fails, mark the slot as `asset-needed` or run the image-maker generation/editing path; do not leave cartoon silhouettes or rough placeholders as final product imagery.
Also inspect every source-image placement for background mismatch, raw white boxes on dark sections, haloed cutout edges, awkward padding, poor border/radius fit, and product scale that feels pasted rather than designed.

## 8. Actual image generation/editing

When images are requested, continue into real asset production instead of stopping at briefs:

1. Read `references/image-maker-integration.ko.md`.
2. Reference `skills/image-maker/SKILL.md`, `rules/natural-image-workflow.md`, `references/json-prompt-best-practices.md`, and `scripts/archive-generated-images.mjs`.
3. Convert cut briefs into English JSON prompts.
4. Review the JSON prompt before generation.
5. Generate or edit actual images through the available image generation/editing path.
6. Inspect the result for product accuracy, naturalism, text, and rights risk.
7. If a result fails, iterate narrowly on one failure dimension at a time.
8. Archive final images under `.hypercore/image-maker/<topic-slug>/` as `prompt.json`, `image1.*`, `image2.*`.
9. Treat downloaded source product images as reference/existing assets only; they do not satisfy a generate/edit request.

## 9. Output packaging

For chat-only output, return Korean user-facing content in this order:

1. Research-backed strategy summary
2. Category playbook and style/template selection
3. Section-by-section product detail page wireframe
4. Korean copydeck
5. Figma frame spec or Figma node references
6. Image cut list / prompt briefs
7. Generated image paths and archive paths when images were generated
8. Platform and legal checklist
9. Open risks and required seller-provided facts

For project-bound output, create files under a clear directory such as `.hypercore/detail-pages/<product-slug>/`. Include `figma-frame-spec.json` by default. Do not create `index.html` unless HTML was explicitly requested or justified as a validation artifact.
