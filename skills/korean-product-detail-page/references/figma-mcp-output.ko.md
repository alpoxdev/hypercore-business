# Figma MCP 상세페이지 산출 가이드

이 스킬은 상세페이지를 HTML 파일로 먼저 만들지 않는다. 사용자가 명시적으로 HTML을 요청하지 않는 한 기본 산출은 **Figma MCP로 만들거나, Figma MCP 실행이 가능한 구조화 스펙**으로 만든다.

## 언제 읽는가

다음 중 하나라도 해당하면 이 파일을 읽는다:

- 사용자가 “Figma”, “피그마”, “MCP”, “수정 가능한 상세페이지”, “디자인 파일”을 요청한다.
- 상세페이지를 실제 시각 프레임으로 제작해야 하지만 HTML을 원하지 않는다.
- Sang-se.com처럼 템플릿 기반·편집 가능한 상세페이지 생성 경험을 원한다.
- 섹션별 PNG/JPG/PDF export가 필요한 운영 산출물을 만들어야 한다.

## 기본 산출물

- `figma-frame-spec.json`: MCP 실행 전/후 모두 저장하는 구조화 스펙
- Figma page/frame/layer: Figma file key가 있고 MCP write tool이 사용 가능할 때 직접 생성
- `copydeck.ko.md`: Figma text layer에 들어갈 한국어 원문
- `image-briefs.json`: 생성/편집/사용할 이미지 컷 목록
- `platform-checklist.md`: 채널별 export, 업로드, 고시, 주장 검수

## Figma frame spec 최소 구조

```json
{
  "page_name": "Korean Detail Page - <product>",
  "frame": {
    "name": "<product> detail page / mobile-first",
    "width": 860,
    "layout": "vertical",
    "background": "brand_or_category_background",
    "export_targets": ["section_png", "full_pdf_optional"]
  },
  "design_tokens": {
    "brand_colors": [],
    "font_intent": "clean | premium | playful | technical | natural",
    "corner_radius": "none | soft | rounded",
    "image_style": "studio | lifestyle | editorial | diagram | mixed"
  },
  "sections": [
    {
      "id": "hero",
      "category_role": "first-impression",
      "layout_pattern": "image-led | split | card-stack | editorial",
      "editable_text_layers": [
        { "name": "headline", "ko": "" },
        { "name": "subhead", "ko": "" }
      ],
      "image_layers": [
        { "name": "hero_product", "source": "existing | generate | edit", "safe_zone": "center 70%" }
      ],
      "proof_or_claim_risk": []
    }
  ]
}
```

## Figma MCP 실행 규칙

1. 사용자가 Figma file key 또는 Figma URL을 제공하면 해당 file key를 사용한다.
2. file key가 없으면 HTML을 만들지 말고 `figma-frame-spec.json`을 먼저 생성한 뒤, “Figma file key가 있으면 이 스펙으로 MCP 생성 가능”이라고 표시한다.
3. MCP write tool이 가능하면 section frame, text layer, image placeholder, table layer, component-like frame을 직접 만든다.
4. 긴 한국어 본문, FAQ, 고시정보, 사이즈표, 성분표는 editable text layer로 둔다.
5. 이미지 생성이 필요한 컷은 Figma placeholder를 먼저 만들고, 실제 이미지 생성은 `references/image-maker-integration.ko.md` 흐름을 따른다.
6. 생성 이미지에 한국어 긴 문구를 굽지 않는다. 텍스트는 Figma layer로 얹는다.
7. export는 섹션 단위가 기본이다. 전체 페이지 단일 초장문 이미지는 피한다.
8. Figma 작업 후 가능하면 screenshot/context를 확인하고, 레이어 누락·텍스트 overflow·모바일 가독성을 점검한다.

## HTML 예외 규칙

HTML은 다음 경우에만 만든다:

- 사용자가 “HTML로 만들어줘”라고 명시했다.
- 플랫폼 업로드 테스트나 렌더링 검증에 HTML이 필요한 경우이고, 그 이유를 산출물에 기록했다.
- 기존 프로젝트가 이미 HTML 기반 상세페이지로 운영되고 사용자가 그 포맷을 요구했다.

HTML 예외에서도 Figma-ready 구조와 editable text 원칙을 버리지 않는다.
