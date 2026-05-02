---
name: product-detail-maker
description: "Create research-backed, Sang-se-inspired Korean product detail pages as editable Figma MCP-ready commerce artifacts, with Korean copy, category-specific section strategy, image/cut planning, and optional generated or edited raster assets for SmartStore, Cafe24, Coupang-style marketplaces, Korean D2C stores, and social-commerce sellers. Use when the user asks for a Korean product detail page, SmartStore/shopping-mall product page, Figma-editable detail page, category-specific product page playbook, or image-inclusive e-commerce sales page based on Korean references and platform constraints; do not default to HTML unless explicitly requested."
compatibility: Works with live web search for Korean market references, local file writing, Figma MCP/write tools for editable detail-page layouts when a Figma file key is available, and the local `skills/image-maker` skill folder when raster assets must be generated.
metadata:
  author: Hypercore Business
  version: "0.1.0"
---

@rules/product-detail-maker-workflow.md
@rules/platform-compliance.md
@references/research-findings.ko.md
@references/section-templates.ko.md
@references/image-direction.ko.md
@references/image-maker-integration.ko.md
@references/browser-link-research.ko.md
@references/sangse-style-benchmark.ko.md
@references/figma-mcp-output.ko.md

# Product Detail Maker

<purpose>

Create an image-led, editable Korean e-commerce product detail page end to end. The skill researches the product, buyer, sales channel, Korean references, and product category; produces the strategy, Korean-language copy, category-specific section structure, image/cut plan, Figma MCP-ready frame/layer spec or actual Figma frame, generation prompts, optional generated or edited images, visual validation, asset archive, and platform checklist.

</purpose>

<routing_rule>

Use this skill when the user wants a reusable or one-off output such as:

- Korean-style product detail pages for SmartStore, shopping malls, Coupang-style marketplaces, Cafe24, Godomall, Korean D2C stores, or social commerce
- Sang-se-inspired or Figma-editable Korean detail pages that need template-like blocks, editable text layers, or Figma MCP output
- product detail pages with images, Korean seller style, conversion-oriented structure, category-specific strategy, or Korean-source research
- product-page structure, Korean copy, cut planning, image generation prompts, and actual generated images from sparse product inputs
- product detail drafts and checks that account for Korean platform specifications and the Korean e-commerce product information notice

Do not use this skill when:

- the task is only a generic landing page, brand website, app UI, or non-commerce page
- the user only wants raw raster image generation with no product-detail-page structure or Korean commerce context; use `image-maker`
- the user only wants legal advice; provide a compliance checklist and recommend professional review instead
- the target is clearly an overseas marketplace-only page such as Amazon US, unless the user asks for a Korean-localized adaptation

</routing_rule>

<execution_contract>

- Treat the output as a commerce conversion artifact, not just prose.
- Default to Figma MCP-ready outputs for production layout: create `figma-frame-spec.json` and, when a Figma file key/MCP write path is available, create editable Figma frames/layers directly. Do not create HTML by default; use HTML only when the user explicitly requests it or a documented validation need requires it.
- When the user references Sang-se.com or asks for a similar result, benchmark the workflow patterns only: fast input, category/style template selection, reusable section blocks, editable Figma text layers, brand color application, optional motion/GIF candidates, and export readiness. Do not copy Sang-se branding, characters, copy, sample images, UI trade dress, or templates.
- Final user-facing product-page copy, visible detail-page text, copydeck content, and normal report prose must be in Korean unless the user explicitly requests another output language.
- Internal operator instructions in this English file stay English. Image-model creative prompts stay English because `skills/image-maker` requires English JSON prompt values.
- Research Korean sources before drafting unless the user explicitly disables research or supplies their own approved reference set. For unfamiliar categories, classify the category first and add category-specific references before final section and claim decisions.
- When the user supplies product or reference links, use a lightweight Chrome DevTools/CDP-first review path when available: inspect the rendered page, visible text, screenshots, image/layout rhythm, and source date before falling back to static HTML parsing. Treat this as small-scale reference research, not scraping or bypass automation.
- Prefer Korean platform help centers, domestic seller tools, domestic design templates, and Korean agency/operator materials over generic global UX articles.
- When product or category information is incomplete, infer safe assumptions and label them; ask only if the category, legal risk, or product identity is impossible to determine.
- When the request includes images, continue through actual raster asset generation or editing instead of stopping at briefs. Use the local `skills/image-maker/` folder as the preferred execution reference when it exists: read its `SKILL.md`, `rules/natural-image-workflow.md`, `references/json-prompt-best-practices.md`, and `scripts/archive-generated-images.mjs`. If that folder is absent, use the available runtime image-generation skill/tool with the same English JSON prompt review, generation/edit execution, visual validation, and image archiving contract, and record the fallback.
- Downloading source product images is reference collection only, not image creation. If the user asked to make images, do not claim completion until generated or edited assets exist in the image-maker archive; if only existing assets are used, label them as existing/source assets.
- Before placing each source or generated product image into Figma, analyze the image background, alpha channel, crop, lighting, orientation, edge quality, and section background. Use transparent extraction, masking, or a deliberate matching image plate; never paste a raw white-box product cutout into a dark or premium section unless the white plate is an intentional framed design choice.
- For Figma MCP output, avoid AI-looking placeholder art as a substitute for product imagery. If remote image import fails, either run the image-maker path for replacement visuals or mark the image slot as unfinished with a neutral asset-needed block; do not present cartoon silhouettes as finished product images.
- Before reporting a Figma design complete, capture or inspect the frame and fix visible text overlap, clipped Korean copy, unreadable small text, broken spacing, and obvious low-quality AI design artifacts.
- Never claim platform or legal compliance as final legal approval. Mark it as a production checklist.

</execution_contract>

<trigger_examples>

Positive examples:

- "Make a Korean-style product detail page for this cosmetics product, including images."
- "Find Korean references and create SmartStore page copy plus cut planning."
- "I only have one product photo; plan a Cafe24 or own-mall product page and generate visuals."
- "Create a conversion-oriented Coupang-style product detail page for Korean shoppers."
- "Make it similar to Sang-se.com, but as an editable Figma detail page, not HTML."
- "Create category-specific detail page structures for beauty, food, fashion, living, and electronics."
- "Include section-by-section image prompts and generated product-page visuals."

Negative examples:

- "Generate only a logo image that does not look AI-made." -> use `image-maker`.
- "Review only e-commerce law provisions." -> do legal/compliance research, not this skill.
- "Write a SaaS landing page hero." -> use a generic landing/copy workflow.

Boundary example:

- "Improve this product page." Use this skill if the product is sold in Korean e-commerce and the user expects product-detail-page copy, structure, or visual production. If the request is only UI usability feedback, use design/UX review instead.

</trigger_examples>

<support_file_read_order>

1. Read this `SKILL.md` to confirm routing and output scope.
2. Read `references/research-findings.ko.md` for baseline Korean-source findings and source links.
3. Read `references/sangse-style-benchmark.ko.md` when the user asks for Sang-se-like, template-like, or fast AI detail-page generation.
4. Read `rules/product-detail-maker-workflow.md` for the step-by-step production workflow.
5. Read `references/browser-link-research.ko.md` when the user supplies URLs or existing product/reference pages.
6. Read `references/section-templates.ko.md` when choosing category-specific product detail page structure.
7. Read `references/figma-mcp-output.ko.md` when Figma, editable design, MCP output, or non-HTML production layout is requested.
8. Read `references/image-direction.ko.md` when producing image/cut briefs.
9. Read `references/image-maker-integration.ko.md` when the user wants actual generated/edited image files or prompt-ready JSON.
10. For real image creation, read `skills/image-maker/SKILL.md` plus the specific local support files named in the integration reference when present; if absent, use the available runtime image-generation path and continue through generation, validation, and archive.
11. Read `rules/platform-compliance.md` before finalizing any SmartStore/Cafe24/Gmarket/Auction-oriented output.
12. Use `scripts/validate-product-detail-maker-skill.mjs` after editing this skill.

</support_file_read_order>

<workflow>

| Phase | Task | Output |
|---|---|---|
| 0 | Identify product, category, buyer, platform, assets, risk level, and whether Figma MCP output is possible | Assumption log |
| 1 | Gather Korean references and platform constraints; review user-supplied links through lightweight Chrome DevTools/CDP capture when available | Source-backed brief |
| 2 | Select category playbook and design tone/template pattern; use Sang-se benchmark patterns when requested without copying protected assets | Category + style plan |
| 3 | Choose detail-page funnel and section order | Section map |
| 4 | Write Korean copy by section | Copydeck |
| 5 | Plan editable Figma frames/layers plus image cuts and generation/edit prompts | Figma frame spec + image brief JSON/markdown |
| 6 | If a Figma file key/MCP path is available, create or update editable Figma frames; otherwise save Figma-ready spec rather than HTML | Figma node IDs or `figma-frame-spec.json` |
| 7 | Generate/edit requested images using `skills/image-maker` rules, validate visually, and archive | Generated image archive + prompt JSON |
| 8 | Add Korean product information notice, shipping, exchange, A/S, warning, and platform checks | Compliance checklist |
| 9 | Package outputs for production | Files, generated assets, Figma references, or final structured answer |

</workflow>

<default_deliverables>

For a full request, produce these artifacts unless the user asks for a shorter answer:

- `detail-page-brief.md`: audience, offer, claims, section order, assumptions, cited references
- `copydeck.ko.md`: final Korean headlines, body copy, labels, CTA text, FAQ
- `figma-frame-spec.json`: editable Figma page/frame/layer plan, category template selection, design tokens, and export targets
- Figma page/frame/node IDs when Figma MCP write tools and a Figma file key are available
- `image-briefs.json`: section-by-section image/cut requirements and prompt-ready guidance
- `image-prompts/` or `.hypercore/image-maker/<topic-slug>/prompt.json`: reviewed English JSON prompts when generation is requested
- generated `imageN.*` files archived under `.hypercore/image-maker/<topic-slug>/` when image creation is requested
- `platform-checklist.md`: SmartStore/Cafe24/open-market, product information notice, image readability, and mobile checks

</default_deliverables>

<validation>

Before declaring completion:

- At least 4 Korean or Korea-specific sources are reviewed for new unfamiliar categories, or the baseline research file is explicitly reused.
- The output includes category playbook selection and a category-specific proof/compliance plan, not only product-level copy.
- User-supplied URLs are reviewed with a lightweight Chrome DevTools/CDP path when available; blocked, login-only, or static-fallback cases are labeled with capture method and uncertainty.
- The section map includes hero, problem/benefit, evidence, usage, detail/spec, FAQ/objection, and policy/compliance blocks unless intentionally omitted.
- Every claim that sounds factual, legal, technical, medical, cosmetic, financial, or performance-related is either cited, softened, or flagged for seller verification.
- Image briefs specify purpose, subject, composition, text risk, platform crop/safe zone, and whether to generate, edit, or use existing product photos.
- Every image placement includes an image-background decision: transparent extraction, matching tonal plate, full-bleed crop, or explicit asset-needed; raw white rectangles on dark/premium sections fail visual QA unless intentionally framed.
- Figma output is preferred over HTML: either MCP-created editable frames/layers are produced or `figma-frame-spec.json` is saved with the missing Figma file key/tool limitation recorded.
- If images are requested, actual image generation/editing is completed through the `skills/image-maker` JSON prompt review, `gpt-image-2` execution rules, visual validation, and `.hypercore/image-maker/<topic-slug>/` archiving before completion is claimed.
- Source-image downloads alone are not counted as generated images; generated/edited files must be present when the request asks for image creation.
- Figma screenshot/context review shows no text overlap, no clipped Korean copy, no unreadable body text, and no AI-looking placeholder art being presented as final.
- Platform constraints and the Korean product information notice are checked for the target channel.
- Output is Korean by default, mobile-readable, and avoids one overly long unsegmented image.

</validation>
