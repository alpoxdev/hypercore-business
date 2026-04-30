# Logo Design Workflow Rules

로고 브리프를 작성하거나 검수할 때 이 규칙을 사용한다.

## 로고 전용 direction

- 모든 브랜드 속성을 한 번에 넣는 collage가 아니라 **One clear visual metaphor** 또는 기억하기 쉬운 하나의 concept에서 시작한다.
- Mark type을 먼저 정한다: symbol, wordmark, combination mark, monogram, badge, app icon.
- Deliverable이 raster PNG여도 vector-like하게 유지한다: clean edge, simple shape, intentional negative space, 제한된 detail.
- Scene language를 피한다: 사용자가 별도 presentation mockup을 요청하지 않는 한 책상, 제품 mockup, 종이 질감, photo lighting, 배경 환경을 넣지 않는다.
- 투명 배경 위에 1-3색을 우선한다. Gradient는 작은 크기에서도 깨끗할 때만 허용한다.
- Text가 있으면 짧고 inspection 가능한 크기로 둔다. 정확한 brand text는 `logo_prompt.text.verbatim`에 넣는다.

## Scalability checks

- Favicon/app-icon scale에서도 로고가 읽혀야 한다.
- Silhouette은 one color에서도 인식 가능해야 한다.
- 얇은 stroke, 작은 counter, detailed mascot, microtext는 high risk다.
- Common UI placement를 위해 중심 정렬과 충분한 transparent padding이 필요하다.

## Originality and brand risk

- Generic rocket, globe, leaf, shield, spark, neural node, swoosh, hexagon, abstract gradient blob 같은 AI-logo trope는 특별히 정당화되지 않으면 피한다.
- 알려진 브랜드의 protected mark, mascot, color blocking, trade dress를 모방하지 않는다. 완료 전 trademark/confusing-similarity risk를 명시적으로 확인한다.
- Brand domain이 흔한 symbol을 강하게 유도하면 차별화 constraint를 추가한다.

## Iteration rules

- 한 번에 하나만 바꾼다: symbol, geometry, typography, color, crop, transparency.
- Transparency가 실패하면 mark redesign 전에 export/background removal을 먼저 고친다.
- Text가 실패하면 unreadable microtext를 반복 생성하지 말고 text를 단순화하거나 symbol-only로 이동한다.
