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
9. Figma screenshot/context에서 한국어 텍스트 겹침, line-height 충돌, clipped text, auto-resize 실패, 카드/이미지 위의 본문 침범이 보이면 완료하지 말고 레이어 폭, font size, line height, section height, spacing을 수정한다.
10. 실제 이미지가 필요한 위치에 AI틱한 placeholder, 만화형 실루엣, 의미 없는 임시 박스를 최종 산출처럼 두지 않는다. 원격 이미지 import가 실패하면 `asset-needed` 블록으로 명시하거나 `references/image-maker-integration.ko.md`에 따라 실제 생성/편집 이미지를 만든다.
11. Figma MCP write 도구로 remote image import가 실패했더라도 원본 이미지 다운로드만으로 “이미지 생성 완료”라고 보고하지 않는다. 다운로드 이미지는 source/reference asset이며, 생성·편집 이미지는 image-maker 아카이브에 별도로 남아야 한다.
12. 제품 이미지를 배치하기 전 각 이미지의 배경/알파/crop/edge/조명/방향을 분석하고, 섹션 배경과 맞는 `placement_decision`을 기록한다. 어두운 섹션 위 흰 사각형 이미지 박스는 의도된 카드 디자인이 아니면 실패다.
13. 투명 배경이 필요한 컷은 background removal/edit 경로를 우선하고, 불가능하면 섹션 톤과 맞는 plate, mask, padding, radius, caption 위치를 설계한다.

## Figma visual QA gate

완료 전 다음 항목을 통과해야 한다:

- `screenshot/context` 또는 Figma screenshot을 확인했다.
- 제목, 서브카피, 카드 본문, 가격/옵션 chip, 소재/고시 텍스트가 서로 겹치지 않는다.
- 한국어 본문은 모바일 860px 폭에서 읽을 수 있고, 12px 이하 장문 본문을 남발하지 않는다.
- 텍스트 레이어는 `textAutoResize`, 충분한 width/height, 적절한 line-height를 갖는다.
- 이미지 슬롯은 existing/source, generated, edited, asset-needed 중 하나로 명확히 표시한다.
- 각 이미지 슬롯은 transparent extraction, matching plate, full-bleed crop, masked card, asset-needed 중 하나의 배경/배치 결정을 가진다.
- 어두운/프리미엄 배경 위에 흰 product image box가 부자연스럽게 떠 있지 않다.
- 최종처럼 보이는 조악한 AI placeholder가 없다.

## HTML 예외 규칙

HTML은 다음 경우에만 만든다:

- 사용자가 “HTML로 만들어줘”라고 명시했다.
- 플랫폼 업로드 테스트나 렌더링 검증에 HTML이 필요한 경우이고, 그 이유를 산출물에 기록했다.
- 기존 프로젝트가 이미 HTML 기반 상세페이지로 운영되고 사용자가 그 포맷을 요구했다.

HTML 예외에서도 Figma-ready 구조와 editable text 원칙을 버리지 않는다.
