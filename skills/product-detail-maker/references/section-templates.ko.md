# 한국형 상세페이지 섹션 템플릿

## Default full funnel

| Section | Goal | Copy pattern | Visual pattern |
|---|---|---|---|
| Hero | 즉시 이해와 관심 | `[제품명]으로 [핵심 문제]를 [핵심 결과]로` | 대표 제품컷 + 사용 장면 + 짧은 베네핏 |
| Pain | 공감 | `혹시 이런 불편 없으셨나요?` | 한국 생활 맥락 컷, 체크리스트 |
| Promise | 해결 | `그래서 필요한 건…` | 3 benefit cards |
| Proof | 신뢰 | `말뿐이 아니라, 이렇게 확인하세요` | 소재/공정/테스트/리뷰/비교 |
| Usage | 상상 | `이럴 때 쓰면 좋아요` | 단계별 사용컷, 손/인물/공간 |
| Detail | 확신 | `작은 차이가 사용감을 만듭니다` | 디테일 클로즈업, 치수, 구성품 |
| Options | 선택 | `내게 맞는 옵션 고르기` | 컬러/사이즈/세트 비교표 |
| FAQ | 반박 처리 | `구매 전 많이 묻는 질문` | Q&A accordion-style blocks |
| Policy | 불안 제거 | `배송·교환·A/S 안내` | 정보표, 주의사항, 상품정보제공고시 |

## Fast MVP funnel

1. Hero
2. 핵심 베네핏 3개
3. 사용 장면 3개
4. 디테일/구성품
5. FAQ + 배송/교환

Use when product info is sparse or the user asks for a quick draft.

## Category modifiers

### Beauty / skincare

- Move concern and texture earlier.
- Include 사용 순서, 피부 타입, 전성분/주의사항 placeholders.
- Do not invent functional cosmetic claims.

### Food / health food

- Move origin, ingredient, taste, storage, expiration, allergy earlier.
- Avoid disease prevention/treatment wording unless legally verified.

### Fashion

- Start with fit, mood, styling, body-size references, size guide.
- Include fabric close-up, thickness, stretch, transparency, washing.

### Electronics / appliances

- Lead with compatibility, specs, safety, warranty, setup.
- Use diagrams/tables more than lifestyle-only imagery.

### Handmade / gift

- Emphasize maker story, packaging, customization, shipping schedule.
- State made-to-order and return limitations carefully.

## Sang-se-inspired category + style selection

상세페이지를 만들 때 제품명만 보지 말고 **카테고리 플레이북**과 **디자인 톤 템플릿**을 분리해 선택한다.

- `category_playbook`: 어떤 설득 순서와 필수 정보가 필요한가
- `style_template`: 어떤 시각 톤이 제품 가치를 잘 전달하는가
- `figma_blocks`: Figma에서 재사용 가능한 섹션 블록 목록
- `claim_guard`: 증거 없이는 쓰지 말아야 할 주장

예시:

```json
{
  "category_playbook": "beauty/skincare",
  "style_template": "clinical-clean",
  "figma_blocks": ["hero", "skin-concern", "texture", "routine", "ingredient", "caution", "faq"],
  "claim_guard": ["medical efficacy", "skin repair", "clinical result without proof"]
}
```

## Detailed category playbooks

### Beauty / skincare / cosmetics

- Front-load: 피부 고민, 제형/텍스처, 사용감, 루틴, 피부 타입 적합성
- Required facts: 전성분, 사용법, 사용 시 주의사항, 기능성/임상/저자극 증빙 여부
- Figma blocks: concern cards, texture macro, routine steps, ingredient cards, before/after placeholder only with proof, caution table
- Copy stance: 효능 단정 대신 “사용감”, “루틴”, “피부 타입에 따라 개인차” 중심
- Guardrails: 질병 치료, 피부 손상 복구, 다이어트, 발모, 의학적 효능 표현 금지

### Food / beverage / health food

- Front-load: 맛, 원재료, 원산지, 섭취/조리 장면, 선물성
- Required facts: 원재료, 알레르기 유발 물질, 영양성분, 보관법, 소비기한, HACCP/인증 실제 자료
- Figma blocks: taste hero, origin map, ingredient story, how-to-eat, storage card, allergy warning, gift package
- Copy stance: 미각/편의/선물 맥락을 강조하고 질병 예방·치료 주장은 피함
- Guardrails: 의약품 오인, 질병 예방/치료, 원재료·영양·성분 허위 주장 금지

### Fashion / apparel

- Front-load: 핏, 실루엣, 사이즈, 소재감, 착용 상황
- Required facts: 실측표, 모델 키/사이즈, 소재, 두께, 비침, 신축, 세탁법, 색상 옵션
- Figma blocks: fit gallery, front-side-back, body-size references, size table, fabric close-up, styling cards, wash care
- Copy stance: 체형·상황별 선택을 돕고 색상/사이즈 오차를 솔직히 안내
- Guardrails: 과도한 체형 보정, 이미지와 실제 색상/핏 불일치, 모델/이미지 권리 침해

### Fashion accessories / bags / jewelry

- Front-load: 착용 비율, 소재 광택, 수납/잠금/마감, 선물 포장
- Required facts: 소재, 도금/알러지 주의, 크기, 무게, 수납 구성, 구성품, 보증/관리법
- Figma blocks: scale-on-body, detail macro, storage diagram, option matrix, package/gift, care guide
- Copy stance: 착용 장면과 디테일 신뢰를 결합
- Guardrails: 귀금속 함량, 알러지, 원산지, 유명 브랜드 유사 표현 주의

### Living / home / kitchen

- Front-load: 사용 전후, 공간 적합성, 크기, 세척/보관, 매일 쓰는 맥락
- Required facts: 소재, 내열/내냉, 크기/무게, 구성품, 관리법, 안전 주의
- Figma blocks: room context, before-after, dimension diagram, care table, material close-up, use cases
- Copy stance: 생활 문제 해결과 관리 편의 중심
- Guardrails: 과장된 전후, 안전/친환경 인증 허위, 실제 공간과 맞지 않는 스케일

### Electronics / appliances

- Front-load: 호환성, 성능, 설치 난이도, 보증/A/S
- Required facts: 모델명, KC/전파/전기 인증, 스펙, 전원/배터리, 구성품, A/S, 보증 기간
- Figma blocks: spec table, compatibility matrix, setup steps, safety warning, warranty block, comparison table
- Copy stance: 감성보다 사양/호환/설치/안전 신뢰를 우선
- Guardrails: KC/성능/배터리/방수/안전 주장 검증 필요

### Baby / kids / pet

- Front-load: 안전성, 사용 연령/대상, 소재, 보호자 안심
- Required facts: KC/어린이제품/위생 인증 여부, 권장 연령/체중, 소재, 세탁/소독, 주의사항
- Figma blocks: safety badge area, age/size guide, caregiver context, material close-up, cleaning steps, warning table
- Copy stance: 과장보다 보호자 불안 해소와 사용 조건 명확화
- Guardrails: 안전 인증, 의료/발달 효과, 반려동물 건강 효과 과장 금지

### Digital / service / B2B

- Front-load: 문제, 프로세스, 시간/비용 절감, 사례, 도입 절차
- Required facts: 기능 범위, 플랜, 지원 범위, 실제 성과 근거, 환불/해지 조건
- Figma blocks: problem-solution, process diagram, ROI cards, plan table, case proof, FAQ
- Copy stance: 명확한 프로세스와 기대효과를 설명하되 보장성 표현을 피함
- Guardrails: 보장 매출, 과장된 성과 수치, 근거 없는 고객 로고/사례
