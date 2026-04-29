---
name: korean-product-detail-page
description: "Create research-backed Korean-style product detail pages from strategy, Korean copy, section structure, image/cut planning, and actual generated or edited raster images for SmartStore, Cafe24, Coupang-style marketplaces, Korean D2C stores, and social-commerce sellers. Use when the user asks in Korean or English for a Korean product detail page, SmartStore or shopping-mall product page, product page copy plus visuals, or image-inclusive e-commerce sales page based on Korean references and platform constraints."
compatibility: Works with live web search for Korean market references, local file writing, and the local `skills/image-generation` skill folder when raster assets must be generated.
metadata:
  author: Hypercore Business
  version: "0.1.0"
---

@rules/korean-product-detail-page-workflow.md
@rules/platform-compliance.md
@references/research-findings.ko.md
@references/section-templates.ko.md
@references/image-direction.ko.md
@references/image-generation-integration.ko.md

# Korean Product Detail Page

<purpose>

Create an image-led Korean e-commerce product detail page end to end. The skill researches the product, buyer, sales channel, and Korean references; produces the strategy, Korean-language copy, section structure, image/cut plan, generation prompts, actual generated or edited images, visual validation, asset archive, and platform checklist.

</purpose>

<routing_rule>

Use this skill when the user wants a reusable or one-off output such as:

- Korean-style product detail pages for SmartStore, shopping malls, Coupang-style marketplaces, Cafe24, Godomall, Korean D2C stores, or social commerce
- product detail pages with images, Korean seller style, conversion-oriented structure, or Korean-source research
- product-page structure, Korean copy, cut planning, image generation prompts, and actual generated images from sparse product inputs
- product detail drafts and checks that account for Korean platform specifications and the Korean e-commerce product information notice

Do not use this skill when:

- the task is only a generic landing page, brand website, app UI, or non-commerce page
- the user only wants raw raster image generation with no product-detail-page structure or Korean commerce context; use `image-generation`
- the user only wants legal advice; provide a compliance checklist and recommend professional review instead
- the target is clearly an overseas marketplace-only page such as Amazon US, unless the user asks for a Korean-localized adaptation

</routing_rule>

<execution_contract>

- Treat the output as a commerce conversion artifact, not just prose.
- Final user-facing product-page copy, visible detail-page text, copydeck content, and normal report prose must be in Korean unless the user explicitly requests another output language.
- Internal operator instructions in this English file stay English. Image-model creative prompts stay English because `skills/image-generation` requires English JSON prompt values.
- Research Korean sources before drafting unless the user explicitly disables research or supplies their own approved reference set.
- Prefer Korean platform help centers, domestic seller tools, domestic design templates, and Korean agency/operator materials over generic global UX articles.
- When product or category information is incomplete, infer safe assumptions and label them; ask only if the category, legal risk, or product identity is impossible to determine.
- When the request includes images, continue through actual raster asset generation or editing instead of stopping at briefs. Use the local `skills/image-generation/` folder as the required execution reference: read its `SKILL.md`, `rules/natural-image-workflow.md`, `references/json-prompt-best-practices.md`, and `scripts/archive-generated-images.mjs`; then perform English JSON prompt review, generation/edit execution, visual validation, and image archiving as part of this skill workflow.
- Never claim platform or legal compliance as final legal approval. Mark it as a production checklist.

</execution_contract>

<trigger_examples>

Positive examples:

- "Make a Korean-style product detail page for this cosmetics product, including images."
- "Find Korean references and create SmartStore page copy plus cut planning."
- "I only have one product photo; plan a Cafe24 or own-mall product page and generate visuals."
- "Create a conversion-oriented Coupang-style product detail page for Korean shoppers."
- "Include section-by-section image prompts and generated product-page visuals."

Negative examples:

- "Generate only a logo image that does not look AI-made." -> use `image-generation`.
- "Review only e-commerce law provisions." -> do legal/compliance research, not this skill.
- "Write a SaaS landing page hero." -> use a generic landing/copy workflow.

Boundary example:

- "Improve this product page." Use this skill if the product is sold in Korean e-commerce and the user expects product-detail-page copy, structure, or visual production. If the request is only UI usability feedback, use design/UX review instead.

</trigger_examples>

<support_file_read_order>

1. Read this `SKILL.md` to confirm routing and output scope.
2. Read `references/research-findings.ko.md` for baseline Korean-source findings and source links.
3. Read `rules/korean-product-detail-page-workflow.md` for the step-by-step production workflow.
4. Read `references/section-templates.ko.md` when choosing the product detail page structure.
5. Read `references/image-direction.ko.md` when producing image/cut briefs.
6. Read `references/image-generation-integration.ko.md` when the user wants actual generated/edited image files or prompt-ready JSON.
7. For real image creation, read `skills/image-generation/SKILL.md` plus the specific local support files named in the integration reference, then continue through generation, validation, and archive.
8. Read `rules/platform-compliance.md` before finalizing any SmartStore/Cafe24/Gmarket/Auction-oriented output.
9. Use `scripts/validate-korean-product-detail-page-skill.mjs` after editing this skill.

</support_file_read_order>

<workflow>

| Phase | Task | Output |
|---|---|---|
| 0 | Identify product, category, buyer, platform, assets, and risk level | Assumption log |
| 1 | Gather Korean references and platform constraints | Source-backed brief |
| 2 | Choose detail-page funnel and section order | Section map |
| 3 | Write Korean copy by section | Copydeck |
| 4 | Plan image cuts and generation/edit prompts | Image brief JSON/markdown |
| 5 | Generate/edit requested images using `skills/image-generation` rules, validate visually, and archive | Generated image archive + prompt JSON |
| 6 | Add Korean product information notice, shipping, exchange, A/S, warning, and platform checks | Compliance checklist |
| 7 | Package outputs for production | Files, generated assets, or final structured answer |

</workflow>

<default_deliverables>

For a full request, produce these artifacts unless the user asks for a shorter answer:

- `detail-page-brief.md`: audience, offer, claims, section order, assumptions, cited references
- `copydeck.ko.md`: final Korean headlines, body copy, labels, CTA text, FAQ
- `image-briefs.json`: section-by-section image/cut requirements and prompt-ready guidance
- `image-prompts/` or `.hypercore/image-generation/<topic-slug>/prompt.json`: reviewed English JSON prompts when generation is requested
- generated `imageN.*` files archived under `.hypercore/image-generation/<topic-slug>/` when image creation is requested
- `platform-checklist.md`: SmartStore/Cafe24/open-market, product information notice, image readability, and mobile checks

</default_deliverables>

<validation>

Before declaring completion:

- At least 4 Korean or Korea-specific sources are reviewed for new unfamiliar categories, or the baseline research file is explicitly reused.
- The section map includes hero, problem/benefit, evidence, usage, detail/spec, FAQ/objection, and policy/compliance blocks unless intentionally omitted.
- Every claim that sounds factual, legal, technical, medical, cosmetic, financial, or performance-related is either cited, softened, or flagged for seller verification.
- Image briefs specify purpose, subject, composition, text risk, platform crop/safe zone, and whether to generate, edit, or use existing product photos.
- If images are requested, actual image generation/editing is completed through the `skills/image-generation` JSON prompt review, `gpt-image-2` execution rules, visual validation, and `.hypercore/image-generation/<topic-slug>/` archiving before completion is claimed.
- Platform constraints and the Korean product information notice are checked for the target channel.
- Output is Korean by default, mobile-readable, and avoids one overly long unsegmented image.

</validation>
