# Logo Design Workflow Rules

Use these rules when writing or reviewing a logo brief.

## Logo-specific direction

- Start from **One clear visual metaphor** or one memorable concept, not a collage of every brand attribute.
- Choose a mark type early: symbol, wordmark, combination mark, monogram, badge, or app icon.
- Keep the design vector-like even when the deliverable is raster PNG: clean edges, simple shapes, intentional negative space, and limited detail.
- Avoid scene language: no desks, product mockups, paper texture, photo lighting, or background environments unless the user asks for a separate presentation mockup.
- Prefer 1-3 colors plus transparency. Gradients are allowed only when they remain clean at small sizes.
- If text appears, keep it short and large enough to inspect. Exact brand text belongs in `logo_prompt.text.verbatim`.

## Scalability checks

- The logo should still read at favicon/app-icon scale.
- The silhouette should be recognizable in one color.
- Thin strokes, tiny counters, detailed mascots, and microtext are high risk.
- The mark should be centered with enough transparent padding for common UI placements.

## Originality and brand risk

- Avoid default AI-logo tropes: generic rocket, globe, leaf, shield, spark, neural node, swoosh, hexagon, and abstract gradient blob unless they are specifically justified.
- Do not imitate a known brand's protected mark, mascot, color blocking, or trade dress; explicitly check trademark/confusing-similarity risk before shipping.
- If the brand domain strongly implies a common symbol, add a differentiating constraint.

## Iteration rules

- Change one dimension at a time: symbol, geometry, typography, color, crop, or transparency.
- When transparency fails, fix export/background removal before redesigning the mark.
- When text fails, simplify text or move to symbol-only rather than repeatedly generating unreadable microtext.
