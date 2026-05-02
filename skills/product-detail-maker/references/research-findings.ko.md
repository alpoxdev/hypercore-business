# 한국형 상세페이지 리서치 요약

Baseline report: `.hypercore/research/2026-04-29-product-detail-maker-skill-research.md`

## 핵심 근거

- 스마트스토어 상세페이지는 이미지 형식으로 주요 정보를 강조하는 방식이 일반적이며, 860px 폭과 섹션 분할이 실무적으로 자주 권장된다. Source: https://gruuz.com/ko-kr/smart-store-product-detail-page/
- 네이버 스마트스토어 대표/추가 상품 이미지는 1000×1000px 권장, JPG/JPEG/GIF/PNG/BMP 정지 이미지 등록 가능. Source: https://help.sell.smartstore.naver.com/faq/content.help?faqId=3378
- SmartEditorONE 상세설명은 4000px 초과 시 접힘/펼침 표시가 생길 수 있고, 외부링크·스크립트·태그에 제약이 있다. Source: https://help.sell.smartstore.naver.com/faq/content.help?faqId=3923
- 상품정보제공고시는 계약 전 재화 정보와 거래조건을 알기 쉽게 제공하도록 요구한다. Source: https://www.law.go.kr/LSW/lbook/lbFileDownload.do?flExt=pdf&lbookConflSeq=46241&lbookSeq=52824
- 카페24 에디봇/에디봇핏은 이미지 분석, 상품 카테고리 인식, 템플릿 자동 적용, 색상·사이즈·세탁법 등 정보 입력, 자동번역을 제공한다. Source: https://www.cafe24.com/commerce/manage/productdetail.html
- 카페24는 상세페이지를 구매전환율과 매출에 영향을 주는 긴 이미지 중심 콘텐츠로 설명한다. Source: https://news.cafe24.com/kr/edibot-ai-contents/
- 국내 레퍼런스는 GDWEB, 무신사/쿠팡 베스트, 디자인키트, 미리캔버스, 노트폴리오, 핀터레스트 등을 함께 보며 실제 판매 페이지와 템플릿을 비교하는 접근이 좋다. Source: https://draph.ai/detail-page-design-reference-sites/
- 의류/패션 카테고리는 피팅컷, 전신·측면·후면·디테일컷, 스타일링, 컬러 옵션, 사이즈 추천이 신뢰를 만든다. Source: https://www.godo.co.kr/main/blog/32/%EC%9D%98%EB%A5%98-%EC%87%BC%ED%95%91%EB%AA%B0-%EC%A0%9C%ED%92%88-%EC%82%AC%EC%A7%84-%EC%B4%AC%EC%98%81-%ED%8C%81-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%A0%88%ED%8D%BC%EB%9F%B0%EC%8A%A4-%EC%B4%9D%EC%A0%95%EB%A6%AC-4915
- 국내 AI 상세페이지 도구들은 제품 정보와 기본 제품 사진을 입력으로 기획, 카피, 연출 이미지, 자동 레이아웃을 만든다는 방향을 공유한다. Sources: https://store.cafe24.com/kr/apps/25247, https://blog.gency.ai/how-to-create-product-detail-page, https://appsweb.kr/2435/?bmode=view&idx=50527063
- G마켓&옥션은 상품과 동일한 실사 이미지, 저작권 주의, 이미지 규격 같은 기본 검수를 요구한다. Source: https://doc.gmarket.co.kr/esm/%EC%83%81%ED%92%88%EC%9D%B4%EB%AF%B8%EC%A7%80_%EA%B0%80%EC%9D%B4%EB%93%9C.pdf

## Reuse rule

Use this baseline for generic Korean detail-page work. For a specific product category, add fresh category-specific Korean sources before finalizing claims or image direction.

## 2026-05-02 Sang-se/Figma/category update

Update report: `.hypercore/research/2026-05-02-sangse-figma-category-detail-page-skill-research.md`

- 상세뚝딱(Sang-se)은 제품 정보 입력, 템플릿 선택, 생성 버튼이라는 빠른 3단계 흐름과 업종·스타일별 템플릿, Figma 기반 수정 가능성, PNG/JPG/PDF export를 강조한다. Source: https://www.sang-se.com/
- 이 스킬은 상세뚝딱의 브랜드/캐릭터/카피/샘플 디자인을 복제하지 않고, 빠른 입력·카테고리/스타일 템플릿·재사용 블록·Figma editable layer·export-ready workflow 같은 운영 패턴만 벤치마크한다. Source: https://www.sang-se.com/
- 카페24 에디봇은 이미지 자동 분류/배치와 상품 카테고리·색상 인식, 필요한 정보 추천을 제공한다. 따라서 상세페이지 스킬도 제품 단위 카피만 쓰지 말고 먼저 카테고리 플레이북을 선택해야 한다. Source: https://support.cafe24.com/hc/ko/articles/7738920902041-%EC%97%90%EB%94%94%EB%B4%87
- 카페24 에디봇핏은 자주 올리는 카테고리 상품 정보 템플릿, 디자인, 국가별 번역, 착용정보/상세정보/사이즈정보/텍스트 순서 변경을 지원한다. 이는 카테고리별 정보 블록과 editable text layer를 분리해야 한다는 근거다. Source: https://support.cafe24.com/hc/ko/articles/25214194458777-%ED%8E%B8%EC%A7%91-%EB%A7%88%EC%8A%A4%ED%84%B0%ED%95%98%EA%B8%B0
- 카페24 에디봇 전시관은 식품/베이커리, 패션의류, 패션잡화, 생활용품, 스포츠레저 같은 제품군과 심플한/화려한/로맨틱/기능성 같은 스타일을 함께 분류한다. Source: https://edibot.cafe24.com/
- 쿠팡 패션 대표 이미지 가이드는 본문 상세 이미지와 별도로 대표 이미지 기준을 둔다. 흰 배경, 실제 촬영 사진, 1개 제품, 텍스트/로고/장식 제거, 상품 크기 95% 같은 조건은 대표 이미지와 상세본문 컷을 분리 설계해야 한다는 근거다. Source: https://imgs.coupangcdn.com/image/partner/documents/2016/04/11/18/4/5f388006-edea-4c7a-8ab0-1c6c33e564c8.pdf
- 식약처는 식품의 질병 예방·치료 효능 표방, 화장품의 의학적 효능·피부 손상 복구·다이어트·발모 표현, 가짜 체험단 후기 등을 온라인 불법유통 신고 대상으로 안내한다. 카테고리별 claim guard가 필요하다. Source: https://www.mfds.go.kr/wpge/m_661/de010410l001.do
- 전기/전자 카테고리는 KC 마크, 인증번호, 모델명, 제조자/수입업체명, 제조년월, 국내 A/S 연락처, 주의경고 문구 등 표시사항 검증이 중요하다. Source: https://customer.ktl.re.kr/web/contents/K101010200.do

## Category reuse rule

For generic requests, reuse this baseline plus the 2026-05-02 update. For category-specific requests, choose a category playbook from `references/section-templates.ko.md` and add fresh Korean/category sources before finalizing factual claims, regulated wording, or image direction.
