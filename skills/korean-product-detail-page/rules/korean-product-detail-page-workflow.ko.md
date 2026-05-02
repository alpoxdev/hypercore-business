# 한국형 상품 상세페이지 워크플로우

## 1. 입력값 추출

다음을 수집하거나 추론한다:

- 제품: 제품명, 1차 카테고리, 세부 카테고리, 가격대, 옵션, 성분/소재, 인증, 원산지, 구성품
- 구매자: 구매자 유형, 구매 상황, 망설임, 비교 대안, 한국어 검색 키워드
- 채널: SmartStore, Cafe24, 쿠팡형 마켓플레이스, Gmarket/Auction, 자사몰, 소셜커머스, 크라우드펀딩
- 에셋: 제품 사진, 라이프스타일 사진, 로고, 브랜드 컬러, 리뷰, 테스트 결과, 매뉴얼, 기존 상세페이지, Figma file key 또는 디자인 시스템 레퍼런스
- 제공 링크: 제품 페이지, 경쟁사 페이지, 디자인 레퍼런스, 플랫폼 예시, 로그인/세션 필요 여부, 가벼운 DevTools/CDP 확인 적합 여부
- 리스크: 화장품/건강기능식품/의료/어린이/전자제품/식품/법적 민감 주장

누락된 정보가 있으면 `Assumptions` 블록에 가정을 쓰고 계속 진행한다. Figma-ready 스펙 생성은 멈추지 않는다. 제품 정체, 카테고리, 법적 리스크를 안전하게 추론할 수 없을 때만 질문한다.

## 2. 리서치 단계

한국 자료를 우선 검색하거나 사용자가 제공한 레퍼런스를 사용한다:

- 플랫폼 제약: 대상 마켓플레이스 고객센터 또는 판매자 문서
- 카테고리 레퍼런스: 국내 상위 셀러, 국내 템플릿, 대행사 사례, 제작자 가이드
- 구매자 언어: 한국 리뷰, Q&A, 커뮤니티 표현, 가능한 경우 네이버 쇼핑식 검색어
- 컴플라이언스: 상품정보제공고시, KC/식품/화장품 주의사항, 환불/A/S 기대치

사용자가 준 링크는 가능한 경우 가벼운 Chrome DevTools/CDP 우선 링크 리서치로 확인한다:

1. 정적 HTML 파싱을 시도하기 전에 사용자가 볼 수 있는 Chrome/Edge 브라우저 또는 기존 DevTools/CDP endpoint로 링크를 연다. 무거운 브라우저 자동화 프레임워크보다 직접 CDP 관찰을 우선한다.
2. URL, 확인 날짜, 캡처한 경우 스크린샷 경로, 보이는 헤드라인/카피, 섹션 순서, 이미지 리듬, 제품 증거, 차단/로그인 필요 상태를 기록한다.
3. 정적 HTML 파싱은 공개 단순 페이지의 폴백 또는 브라우저 관찰 보조 용도로만 사용한다.
4. 우회 자동화로 확대하지 않는다. 일반 사용자 화면에서 보이지 않으면 사용자가 제공한 스크린샷, PDF export, 복사 텍스트, 승인된 원자료로 폴백한다.
5. 쿠키, 토큰, 프로필 ID, CDP endpoint, 브라우저 상태 파일은 산출물과 git에 남기지 않는다.

DevTools/CDP 채널 우선순위, 캡처 체크리스트, profile browser 어댑터 메모, 안전한 폴백은 `references/browser-link-research.ko.md`를 읽는다.

카테고리 플레이북 선택, 섹션 순서, 이미지 컷, 주장 안전성을 근거로 설명할 수 있을 만큼 자료가 모이면 중단한다.

## 3. 카테고리 플레이북과 스타일/템플릿 선택

섹션 순서를 짜기 전에 제품을 1차 카테고리와 필요 시 2차 카테고리로 분류한다:

- 뷰티/스킨케어/화장품
- 식품/음료/건강기능식품
- 패션/의류
- 패션잡화/가방/주얼리
- 생활/홈/주방
- 전자제품/가전
- 유아/키즈/반려동물
- 디지털/서비스/B2B
- 기타/특수 규제 카테고리

각 카테고리에 대해 다음을 정의한다:

- `category_playbook`: 사용할 섹션 순서와 필수 증거 블록
- `category_required_facts`: 성분, 사이즈, 인증, 보증, 안전, 알레르기 등 최종 제작 전 필요한 사실
- `claim_risk_level`: low, medium, high, regulated
- `style_template`: clean, premium, playful, technical, natural, editorial, functional 등 명시적 톤
- `figma_block_library`: 해당 카테고리에 필요한 재사용 섹션

사용자가 상세뚝딱/Sang-se와 유사한 결과를 요청하면 `references/sangse-style-benchmark.ko.md`의 운영 패턴만 벤치마크한다. 상세뚝딱 브랜드 에셋, 문구, 캐릭터, 샘플 디자인, UI 트레이드드레스, 템플릿을 복제하지 않는다.

## 4. 오퍼와 내러티브 정의

다음을 정의한다:

- `one_line_offer`: 히어로에 들어갈 한 문장 약속
- `belief_shift`: 스크롤 후 구매자가 믿어야 하는 변화
- `primary_objection`: 구매를 막는 가장 큰 이유
- `proof_stack`: 리뷰, 테스트 데이터, 전후 비교, 소재, 제조, 제작자 스토리, 보증
- `visual_motif`: 반복될 이미지 스타일과 레이아웃 리듬

## 5. 섹션 맵

기본 한국형 커머스 퍼널:

1. Hero: 제품 + 핵심 약속 + 대표 비주얼
2. Problem: 한국 생활 맥락, 불편, 비교 상황
3. Benefit: 3개 가치 축과 작은 증거
4. Proof: 리뷰/테스트/인증/공정/소재 디테일
5. Usage: 언제/어떻게/누가 쓰는지, 단계별 사용
6. Detail: 클로즈업, 치수, 성분/소재, 구성품
7. Options: 컬러/사이즈/세트/수량 비교
8. FAQ: 반박 처리와 불안 제거
9. Policy: 배송, 교환/환불, A/S, 상품정보제공고시

카테고리별로 조정한다. 자세한 카테고리 플레이북은 `references/section-templates.ko.md`를 읽는다:

- 패션: 핏/사이즈와 스타일링을 앞쪽으로 이동
- 식품: 맛/성분/원산지/보관을 앞쪽으로 이동
- 뷰티: 고민/제형/사용법/주의사항을 앞쪽으로 이동
- 전자제품: 사양/호환성/보증/설치를 앞쪽으로 이동
- B2B/서비스: ROI/프로세스/사례 증거를 앞쪽으로 이동

## 6. 카피 규칙

- 자연스러운 한국어로 쓴다. 번역투 슬로건을 피한다.
- 모바일에서 읽기 쉬운 짧은 헤드라인과 스캔 가능한 bullet을 사용한다.
- 감성 카피와 하드 팩트를 분리한다.
- 리뷰, 인증, 임상 결과, 수상, 원산지, 제조 공정, 전후 효과를 지어내지 않는다.
- 판매자 증빙이 필요한 주장은 `확인 필요`로 표시한다.
- CTA와 채널 문구는 플랫폼에 맞춘다. 많은 마켓플레이스에서는 실제 구매 버튼을 플랫폼이 소유한다.

## 7. Figma 레이아웃과 이미지/컷 기획

제작 레이아웃은 HTML을 기본값으로 만들지 않는다. 먼저 `figma-frame-spec.json`을 만들거나, Figma file key가 있고 MCP write 도구가 가능하면 Figma frame/layer를 직접 생성한다. Figma 계약은 `references/figma-mcp-output.ko.md`를 읽는다.

각 Figma 섹션마다 다음을 명시한다:

- `frame_name`: 안정적인 섹션/레이어 이름
- `layout_pattern`: image-led, split, card-stack, editorial, table, diagram, FAQ, policy
- `editable_text_layers`: 수정 가능해야 하는 한국어 카피
- `image_placeholders`: 생성/편집/기존 이미지 배치
- `export_target`: 섹션 PNG/JPG/PDF 또는 디자인 전용

각 이미지 컷마다 다음을 명시한다:

- `job`: generate, edit, product-photo required, diagram, table, text block, existing asset
- `subject`: 제품, 인물, 손, 공간, 패키지, 성분/소재, 비교 물체
- `composition`: crop, angle, negative space, mobile safe zone
- `copy_overlay`: 정확한 표시 문구가 있으면 기록하고, 생성 이미지 텍스트 리스크를 표시하며 가능한 경우 editable Figma text layer를 우선
- `proof_role`: 해당 이미지가 만들어야 하는 믿음
- `avoid`: 과도한 AI 광택, 가짜 인증, 읽기 어려운 작은 글자, 불가능한 사용 장면

정확한 한국어 문구는 가능하면 생성 이미지 안에 굽지 말고 editable Figma design layer로 남긴다. HTML은 사용자가 명시 요청했거나 검증 필요성이 산출물에 기록된 경우에만 사용한다.

## 8. 실제 이미지 생성/편집

이미지가 요청되면 여기서 멈추지 않고 실제 에셋을 만든다:

1. `references/image-maker-integration.ko.md`를 읽는다.
2. `skills/image-maker/SKILL.md`, `rules/natural-image-workflow.md`, `references/json-prompt-best-practices.md`, `scripts/archive-generated-images.mjs`를 참고한다.
3. 컷 브리프를 English JSON prompt로 변환한다.
4. 생성 전 JSON prompt를 검수한다.
5. 사용 가능한 이미지 생성/편집 경로로 실제 이미지를 생성하거나 편집한다.
6. 결과 이미지를 보고 제품 정확성, 자연스러움, 텍스트, 권리 리스크를 검증한다.
7. 실패하면 한 축만 좁게 수정해 반복한다.
8. 최종 이미지를 `.hypercore/image-maker/<topic-slug>/`에 `prompt.json`, `image1.*`, `image2.*` 형식으로 아카이브한다.

## 9. 산출물 패키징

채팅만 필요한 경우 다음 순서로 반환한다:

1. 리서치 기반 전략 요약
2. 카테고리 플레이북과 스타일/템플릿 선택
3. 섹션별 상세페이지 와이어프레임
4. 한국어 카피덱
5. Figma frame spec 또는 Figma node 참조
6. 이미지 컷 리스트 / 프롬프트 브리프
7. 생성 이미지 경로와 아카이브 경로(이미지 생성 시)
8. 플랫폼 및 법적 체크리스트
9. 열린 리스크와 판매자가 제공해야 할 사실

프로젝트 산출물이 필요하면 `.hypercore/detail-pages/<product-slug>/` 같은 명확한 디렉터리에 파일을 생성한다. 기본으로 `figma-frame-spec.json`을 포함하고, HTML이 명시 요청되었거나 검증 아티팩트로 필요한 경우가 아니면 `index.html`을 만들지 않는다.
