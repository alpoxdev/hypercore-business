---
name: product-detail-maker
description: "스마트스토어, 카페24, 쿠팡형 마켓플레이스, 한국형 자사몰, 소셜커머스 셀러를 위해 상세뚝딱(Sang-se)식 빠른 입력·카테고리 템플릿·편집 가능한 Figma MCP 산출을 지향하는 국내 자료 기반 한국형 상품 상세페이지를 전략, 한국어 카피, 카테고리별 섹션 구조, 이미지/컷 기획, 실제 생성·편집 이미지까지 끝-to-end로 만든다. 사용자가 한국형 상세페이지, 스마트스토어/쇼핑몰 상품 상세페이지, 피그마로 수정 가능한 상세페이지, 카테고리별 상세페이지 플레이북, 제품 페이지 카피+비주얼, 이미지 포함 이커머스 상세페이지를 요청할 때 사용하며, 명시 요청 없이는 HTML을 기본 산출물로 만들지 않는다."
compatibility: 국내 시장/플랫폼 리서치를 위한 라이브 검색, 로컬 파일 작성, 실제 래스터 이미지 생성이 필요할 때 로컬 `skills/image-maker` 스킬 폴더와 함께 동작한다.
metadata:
  author: Hypercore Business
  version: "0.1.0"
---

@rules/product-detail-maker-workflow.ko.md
@rules/platform-compliance.ko.md
@references/research-findings.ko.md
@references/section-templates.ko.md
@references/image-direction.ko.md
@references/image-maker-integration.ko.md
@references/browser-link-research.ko.md
@references/sangse-style-benchmark.ko.md
@references/figma-mcp-output.ko.md

# Product Detail Maker

<purpose>

한국 소비자와 국내 커머스 플랫폼에 맞는 이미지 중심·편집 가능 상품 상세페이지를 끝까지 만든다. 제품 정보, 타깃, 판매 채널, 레퍼런스, 카테고리를 분석해 상세페이지 전략, 한국어 카피, 카테고리별 섹션 구성, Figma MCP-ready 프레임/레이어 스펙 또는 실제 Figma 프레임, 이미지/컷 구성, 생성형 이미지 프롬프트, 실제 이미지 생성/편집, 시각 검증, 아카이브, 플랫폼 검수 체크리스트까지 산출한다.

</purpose>

<routing_rule>

다음 요청에는 이 스킬을 사용한다:

- 한국형 상세페이지, 스마트스토어 상세페이지, 쇼핑몰 상세페이지, 쿠팡/카페24/고도몰/자사몰 상품페이지
- 상세뚝딱(Sang-se)처럼 빠르게 만들되 Figma에서 수정 가능한 상세페이지, 템플릿형 상세페이지, 피그마 MCP 산출물
- 제품 상세페이지를 “이미지랑 같이”, “한국 셀러 스타일”, “구매전환형”, “국내 자료 기반”, “카테고리별 구조”로 만들기
- 상품 사진/간단 설명만 주고 상세페이지 구조, 카피, 컷 기획, 이미지 생성 프롬프트, 실제 생성 이미지까지 요청
- 국내 플랫폼 규격과 상품정보제공고시를 고려한 상세페이지 초안/검수

다음 경우에는 사용하지 않는다:

- 일반 랜딩페이지, 브랜드 웹사이트, 앱 UI, 비커머스 페이지 작업
- 상세페이지 구조나 한국 커머스 맥락 없이 순수 래스터 이미지만 생성하는 요청 → `image-maker` 사용
- 법률 자문만 원하는 요청 → 컴플라이언스 체크리스트와 전문가 검토 권고로 처리
- 한국 로컬라이즈가 아닌 Amazon US 같은 해외 마켓플레이스 전용 페이지

</routing_rule>

<output_language>

최종 사용자-facing 상세페이지 카피, 화면에 보이는 텍스트, copydeck, 일반 보고 문장은 사용자가 다른 언어를 명시하지 않는 한 한국어로 작성한다. 이미지 모델에 전달하는 창작 프롬프트는 `skills/image-maker` 계약에 따라 English JSON 값을 사용하되, 실제 노출 한국어 문구는 별도 필드나 Figma editable text layer로 보존한다.

</output_language>

<instruction_contract>

아래 제작 계약은 필수 지침이다. Figma MCP-ready 기본값, HTML 비기본 원칙, 한국어 커머스 산출물, browser-link research, image-maker 통합, 실제 래스터 생성/편집 요구사항을 약화하지 않는다. 사용자가 이미지를 요청하면 브리프나 원본 다운로드에서 멈추지 말고 생성/편집, 시각 검증, 아카이브까지 진행한다.

</instruction_contract>

<execution_contract>

- 결과물을 단순 문서가 아니라 구매전환용 커머스 산출물로 취급한다.
- 제작 레이아웃은 기본적으로 Figma MCP-ready 산출물로 만든다. `figma-frame-spec.json`을 만들고, Figma file key와 MCP write 경로가 있으면 편집 가능한 Figma frame/layer를 직접 생성한다. 사용자가 명시적으로 요청하지 않는 한 HTML을 기본 산출물로 만들지 않는다.
- 사용자가 Sang-se.com 또는 상세뚝딱과 유사한 결과를 원하면 빠른 입력, 카테고리/스타일 템플릿 선택, 재사용 섹션 블록, 편집 가능한 Figma 텍스트 레이어, 브랜드 컬러 적용, GIF/모션 후보, export-ready 구조 같은 운영 패턴만 벤치마크한다. 상세뚝딱의 브랜드, 캐릭터, 문구, 샘플 이미지, UI 트레이드드레스, 템플릿을 복제하지 않는다.
- 사용자가 리서치를 금지하거나 승인된 레퍼런스를 제공하지 않는 한, 작성 전 한국 자료를 조사한다. 낯선 카테고리에서는 먼저 카테고리 플레이북을 선택하고 카테고리별 자료를 추가 확인한 뒤 섹션과 주장 수위를 확정한다.
- 사용자가 제품 링크나 레퍼런스 링크를 주면 가능한 경우 가벼운 Chrome DevTools/CDP 우선 경로로 렌더링된 화면, 보이는 텍스트, 스크린샷, 이미지/레이아웃 흐름, 확인 날짜를 먼저 본다. 정적 HTML 파싱은 보조/폴백으로만 사용한다. 이 흐름은 소량 레퍼런스 조사/정보 취득이지 스크래핑이나 우회 자동화가 아니다.
- 일반 글로벌 UX 글보다 국내 플랫폼 고객센터, 셀러 도구, 국내 디자인 템플릿, 한국 운영자/대행사 자료를 우선한다.
- 제품/카테고리 정보가 부족하면 안전한 가정을 명시하고 계속 진행한다. 카테고리, 법적 리스크, 제품 정체를 판단할 수 없을 때만 질문한다.
- 이미지가 포함된 요청이면 브리프에서 멈추지 않는다. 로컬 `skills/image-maker/` 폴더가 있으면 preferred 실행 참고로 `SKILL.md`, `rules/natural-image-workflow.md`, `references/json-prompt-best-practices.md`, `scripts/archive-generated-images.mjs`를 읽는다. 해당 폴더가 없으면 사용 가능한 런타임 이미지 생성 skill/tool로 같은 English JSON prompt 검수, 생성/편집 실행, 시각 검증, 이미지 아카이브 계약을 수행하고 fallback을 기록한다.
- 원본 상품 이미지를 다운로드하는 것은 레퍼런스 수집일 뿐 실제 이미지 생성이 아니다. 사용자가 이미지를 “만들어” 달라고 한 경우 `.hypercore/image-maker/<topic-slug>/`에 생성/편집 이미지가 남기 전에는 완료를 주장하지 않는다. 기존 이미지만 쓰는 경우에는 반드시 existing/source asset으로 표시한다.
- 각 원본/생성 제품 이미지를 Figma에 넣기 전에 배경, 알파 채널, crop, 조명, 방향, edge 품질, 섹션 배경색을 하나씩 분석한다. 투명 배경 추출, 마스크, 톤이 맞는 이미지 plate를 선택하고, 어두운/프리미엄 섹션에 흰 사각형 product cutout을 그대로 붙이는 산출은 실패로 본다.
- Figma MCP 산출에서 제품 이미지를 대체한다며 AI틱한 placeholder, 만화형 실루엣, 임시 박스를 최종처럼 제시하지 않는다. 원격 이미지 import가 실패하면 image-maker 경로로 대체 비주얼을 생성/편집하거나, 완료가 아닌 neutral asset-needed block으로 명확히 표시한다.
- Figma 디자인 완료 전에는 screenshot/context를 확인해 텍스트 겹침, 한국어 잘림, 너무 작은 본문, 깨진 spacing, AI틱한 조악한 시각 요소를 수정한다.
- 플랫폼/법적 적합성을 최종 법률 승인으로 주장하지 않는다. 항상 제작 체크리스트로 표시한다.

</execution_contract>

<trigger_examples>

긍정 예시:

- "이 화장품 제품으로 한국형 상세페이지 이미지까지 만들어줘."
- "스마트스토어용 상세페이지를 국내 레퍼런스 찾아서 카피랑 컷 구성까지 짜줘."
- "제품 사진 한 장밖에 없는데 카페24/자사몰용 상세페이지 기획해줘."
- "쿠팡에 올릴 구매전환형 상품 상세페이지를 한국 소비자 스타일로 만들어줘."
- "상세뚝딱 사이트처럼 만들 수 있게 해줘. HTML 말고 피그마 MCP로."
- "뷰티/식품/패션/생활/전자 카테고리별로 상세페이지 구조를 나눠줘."
- "상세페이지 섹션별 이미지 생성 프롬프트도 같이 줘."

부정 예시:

- "이 로고 이미지만 AI 티 안 나게 생성해줘." → `image-maker` 사용.
- "전자상거래법 조항만 찾아서 법률 검토해줘." → 법/컴플라이언스 리서치로 처리.
- "SaaS 랜딩페이지 히어로 카피 써줘." → 일반 랜딩/카피 작업.

경계 예시:

- "상품 페이지 개선해줘." 제품이 한국 이커머스에서 판매되고 사용자가 상세페이지 카피/비주얼 구조를 기대하면 이 스킬을 사용한다. 단순 UI 사용성 피드백이면 디자인/UX 리뷰로 처리한다.

</trigger_examples>

<support_file_read_order>

1. 이 `SKILL.ko.md`를 읽어 라우팅과 산출 범위를 확인한다.
2. `references/research-findings.ko.md`에서 기본 한국 자료 근거와 출처를 확인한다.
3. 사용자가 상세뚝딱/Sang-se식, 템플릿형, 빠른 AI 상세페이지 생성을 원하면 `references/sangse-style-benchmark.ko.md`를 읽는다.
4. `rules/product-detail-maker-workflow.ko.md`에서 단계별 제작 워크플로우를 확인한다.
5. 사용자가 URL 또는 기존 제품/레퍼런스 페이지를 제공하면 `references/browser-link-research.ko.md`를 읽는다.
6. 상세페이지 구조를 고를 때 `references/section-templates.ko.md`를 읽는다.
7. Figma, 피그마, MCP, 편집 가능한 디자인, HTML이 아닌 제작 레이아웃이 필요하면 `references/figma-mcp-output.ko.md`를 읽는다.
8. 이미지/컷 브리프를 만들 때 `references/image-direction.ko.md`를 읽는다.
9. 실제 생성/편집 이미지 파일 또는 prompt-ready JSON이 필요하면 `references/image-maker-integration.ko.md`를 읽는다.
10. 실제 이미지 제작 시 `skills/image-maker/SKILL.md`와 통합 가이드에 명시된 로컬 지원 파일이 있으면 읽고, 없으면 사용 가능한 런타임 이미지 생성 경로로 생성, 검증, 아카이브까지 계속 진행한다.
11. SmartStore/Cafe24/Gmarket/Auction 대상 산출물을 마무리하기 전 `rules/platform-compliance.ko.md`를 읽는다.
12. 이 스킬을 수정한 뒤 `scripts/validate-product-detail-maker-skill.mjs`를 실행한다.

</support_file_read_order>

<workflow>

| Phase | Task | Output |
|---|---|---|
| 0 | 제품, 카테고리, 구매자, 플랫폼, 보유 에셋, 리스크, Figma MCP 사용 가능 여부 확인 | 가정/확인 로그 |
| 1 | 한국 레퍼런스와 플랫폼 제약 조사; 사용자가 준 링크는 가능한 경우 가벼운 Chrome DevTools/CDP 캡처로 확인 | 출처 기반 브리프 |
| 2 | 카테고리 플레이북과 디자인 톤/템플릿 패턴 선택; 요청 시 Sang-se 벤치마크 패턴 반영 | 카테고리 + 스타일 계획 |
| 3 | 상세페이지 퍼널과 섹션 순서 선택 | 섹션 맵 |
| 4 | 섹션별 한국어 카피 작성 | 카피덱 |
| 5 | 편집 가능한 Figma 프레임/레이어와 이미지 컷/생성·편집 프롬프트 기획 | Figma frame spec + 이미지 브리프 JSON/Markdown |
| 6 | Figma file key/MCP 경로가 있으면 편집 가능한 Figma frame을 만들고, 없으면 HTML 대신 Figma-ready spec 저장 | Figma node ID 또는 `figma-frame-spec.json` |
| 7 | `skills/image-maker` 규칙으로 요청 이미지 생성/편집, 시각 검증, 아카이브 | 생성 이미지 아카이브 + prompt JSON |
| 8 | 상품정보제공고시, 배송, 교환, A/S, 주의사항, 플랫폼 체크 | 컴플라이언스 체크리스트 |
| 9 | 제작용 산출물 패키징 | 파일, 생성 에셋, Figma 참조, 최종 구조화 답변 |

</workflow>

<default_deliverables>

전체 요청에서는 사용자가 더 짧은 답변을 요구하지 않는 한 다음을 산출한다:

- `detail-page-brief.md`: 타깃, 오퍼, 주장, 섹션 순서, 가정, 인용 출처
- `copydeck.ko.md`: 최종 한국어 헤드라인, 본문, 라벨, CTA, FAQ
- `figma-frame-spec.json`: 편집 가능한 Figma page/frame/layer 계획, 카테고리 템플릿 선택, 디자인 토큰, export 대상
- Figma MCP write 도구와 file key가 있으면 생성된 Figma page/frame/node ID
- `image-briefs.json`: 섹션별 이미지/컷 요구사항과 prompt-ready 가이드
- `image-prompts/` 또는 `.hypercore/image-maker/<topic-slug>/prompt.json`: 이미지 생성 요청 시 검수된 English JSON prompt
- 이미지 생성 요청 시 `.hypercore/image-maker/<topic-slug>/` 아래 보존된 `imageN.*` 파일
- `platform-checklist.md`: SmartStore/Cafe24/오픈마켓, 상품정보제공고시, 이미지 가독성, 모바일 체크

</default_deliverables>

<validation>

완료를 보고하기 전에 확인한다:

- 새로운/낯선 카테고리에서는 한국 또는 한국 특화 자료를 최소 4개 검토했거나, 기본 리서치 파일을 명시적으로 재사용했다.
- 제품 단위 카피뿐 아니라 카테고리 플레이북 선택과 카테고리별 증거/컴플라이언스 계획을 포함했다.
- 사용자가 준 URL은 가능한 경우 가벼운 Chrome DevTools/CDP 경로로 확인했고, 차단/로그인 필요/정적 폴백인 경우 캡처 방법과 불확실성을 표시했다.
- 섹션 맵에는 의도적으로 생략하지 않는 한 hero, problem/benefit, evidence, usage, detail/spec, FAQ/objection, policy/compliance 블록이 포함된다.
- 사실, 법률, 기술, 의료, 화장품, 금융, 성능 관련으로 들리는 주장은 인용, 완화, 또는 판매자 확인 필요 표시 중 하나로 처리한다.
- 이미지 브리프는 목적, 주제, 구도, 텍스트 리스크, 플랫폼 crop/safe zone, generate/edit/use existing 여부를 명시한다.
- 모든 이미지 배치는 투명 배경 추출, 톤이 맞는 plate, full-bleed crop, asset-needed 중 하나의 이미지 배경 결정을 포함한다. 어두운/프리미엄 섹션 위의 흰 사각형 원본 이미지 박스는 의도된 프레임 디자인이 아니면 visual QA 실패다.
- HTML보다 Figma 산출을 우선했다. MCP로 편집 가능한 프레임/레이어를 만들었거나, Figma file key/tool 한계를 기록한 `figma-frame-spec.json`을 저장했다.
- 이미지가 요청된 경우 `skills/image-maker` JSON prompt 검수, `gpt-image-2` 실행 규칙, 시각 검증, `.hypercore/image-maker/<topic-slug>/` 아카이브까지 완료한 뒤에만 완료를 주장한다.
- 원본 이미지 다운로드만으로 생성 이미지 완료를 주장하지 않았고, 생성/편집 이미지가 필요하면 실제 파일이 image-maker 아카이브에 존재한다.
- Figma screenshot/context 검수에서 텍스트 겹침, 한국어 잘림, 읽기 어려운 작은 글자, 최종물처럼 보이는 AI틱한 placeholder가 없다.
- 대상 채널의 플랫폼 제약과 상품정보제공고시를 확인한다.
- 모바일에서 읽을 수 있고, 지나치게 긴 단일 이미지로 구성하지 않는다.

</validation>
