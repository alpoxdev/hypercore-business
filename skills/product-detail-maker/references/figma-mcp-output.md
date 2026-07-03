# Figma MCP Output Reference Map

English counterpart for `references/figma-mcp-output.ko.md`. Use this as the navigation layer, then read the Korean original for the full production contract.

## Default Output

This skill does not default to HTML. Unless the user explicitly asks for HTML, produce either editable Figma frames/layers through Figma MCP or a structured `figma-frame-spec.json` that is ready for MCP execution.

Core artifacts are:

- `figma-frame-spec.json`
- editable Figma page/frame/layers when a file key and write path are available
- `copydeck.ko.md`
- `image-briefs.json`
- `platform-checklist.md`

## Figma Rules

- Keep long Korean copy, notices, FAQ, tables, prices, and option text as editable text layers.
- Use image slots with clear status: existing/source, generated, edited, or `asset-needed`.
- If remote import fails, do not treat downloaded source images as generated assets. Run the image-maker path or mark the slot incomplete.
- Before placing product images, record background, alpha/crop/edge quality, lighting, orientation, and `placement_decision`.
- Avoid raw white product boxes on dark or premium sections unless they are intentional framed cards.

## Visual QA Gate

Before completion, inspect a Figma screenshot or context. Fail and fix the design when there is text overlap, clipped Korean copy, unreadable small text, broken spacing, final-looking placeholder art, missing image status, or mismatched product-image backgrounds.

## HTML Exception

Create HTML only when the user explicitly requests it, when a documented upload/rendering validation need requires it, or when the existing project already operates in HTML and the user asks for that format.
