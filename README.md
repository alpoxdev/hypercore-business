# Hypercore Business Agent Skills

> 비즈니스 · 마케팅 · 디자인 작업을 위한 한국어 우선 AI 에이전트 스킬 모음. Claude Code · Codex · Cursor · Antigravity 어디서나.

Hypercore Business는 코딩 외 영역 — 사업 전략 검증, 차별화된 아이디어 발산, 제1원칙 분해, 한국형 상세페이지, 로고/이미지 생성 — 을 한 묶음으로 제공하는 6개 스킬 패키지입니다. 각 스킬은 트리거, 워크플로, 검증 게이트가 명시되어 있어 어떤 CLI에서 호출해도 같은 의도로 동작합니다.

- **드롭인 설치**: Claude Code 마켓플레이스에 한 줄, 다른 CLI에는 `npx skills add` 한 줄.
- **다중 CLI**: Claude Code, Codex, Cursor, Antigravity 등 `npx skills`가 지원하는 에이전트.
- **한국어 우선**: 모든 스킬과 산출물이 한국어 사양으로 정렬되어 있습니다.
- **증거 중심 산출물**: 분석·검증 결과는 `.hypercore/<skill>/[topic-slug]/`에 다중 파일로 보존됩니다.

[`alpoxdev/hypercore`](https://github.com/alpoxdev/hypercore)의 구조를 따르되, 코딩/개발 스킬 대신 비즈니스/디자인 스킬을 담는 자매 패키지입니다. [Vercel Skills](https://github.com/vercel-labs/skills) 기반.

## 호환성

| 런타임 | 설치 경로 | 비고 |
|---|---|---|
| Claude Code | `/plugin marketplace add` + `/plugin install` | 1순위 호환 — Codex 전용 스킬은 별도 표시 |
| Codex CLI | `npx skills add ... -a codex` | `image-maker`·`logo-maker`의 정식 실행 환경 |
| Cursor | `npx skills add ... -a cursor` | Strategy 계열 스킬 사용 가능 |
| Antigravity 등 기타 | `npx skills add ...` (`-a` 생략 시 기본 대상 포함) | `npx skills`가 지원하는 에이전트 |

스킬별 호환은 아래 [스킬 카탈로그](#스킬-카탈로그)의 **호환** 컬럼 또는 각 `SKILL.md`의 `compatibility` 필드에서 확인합니다. `[HyperB][Codex Only]` 표시가 있는 스킬은 Codex 환경에서만 정상 동작합니다.

## 설치

### Claude Code 마켓플레이스 (권장)

Claude Code 안에서:

```bash
/plugin marketplace add https://github.com/alpoxdev/hypercore-business
/plugin install hypercore-business
```

설치 후 6개 스킬을 슬래시 명령으로 곧바로 호출할 수 있습니다 — 예: `/genius-thinking`, `/startup-validator`, `/elon-musk`.

### npx skills add (Codex / Cursor / Antigravity 등)

기본 대상에 한 번에 설치:

```bash
npx skills add alpoxdev/hypercore-business --skill '*' -g -y
```

특정 에이전트만 설치:

```bash
npx skills add alpoxdev/hypercore-business --skill '*' -a codex -g -y
npx skills add alpoxdev/hypercore-business --skill '*' -a cursor -g -y
```

특정 스킬만 골라서 설치:

```bash
npx skills add alpoxdev/hypercore-business --skill genius-thinking --skill startup-validator -g -y
```

옵션 요약:

- `--skill '*'` — 모든 스킬 설치. `--skill <이름>`을 반복하면 골라서 설치.
- `-g`, `--global` — 사용자 전역 위치에 설치. 생략하면 현재 프로젝트(`.claude/skills/` 등)에만 설치.
- `-a <agent>` — 특정 에이전트만 대상으로. 생략하면 기본 대상 모두.
- `-y` — 확인 프롬프트 건너뜀.

> `npx skills add`의 기본 설치 범위는 **프로젝트 로컬**입니다. 시스템 전역에 등록하려면 `-g`를 명시하세요.

### 소스에서 직접 사용

레포를 클론해 그대로 가져다 써도 됩니다. 스킬은 모두 마크다운이므로 별도 빌드가 필요 없습니다:

```bash
git clone https://github.com/alpoxdev/hypercore-business.git
cp -R hypercore-business/skills/genius-thinking your-project/.claude/skills/
```

## 빠른 사용 예시

설치 후 자연어로 호출하거나 슬래시 명령으로 시작합니다.

```text
/genius-thinking "<막힌 문제>"        # 차별화된 아이디어 발산 + 우선순위
/startup-validator "<아이디어>"       # 증거 사다리·신뢰도 점수·다음 검증 스프린트
/elon-musk "<업계 통념>"              # 제1원칙으로 가정 분해 → 비범한 옵션
/product-detail-maker "<상품 정보>"   # Sang-se 스타일 한국 상세페이지 (Figma MCP-ready)
/image-maker "<요구사항>"             # gpt-image-2 기반 이미지 생성/편집 (Codex)
/logo-maker "<브랜드 정보>"           # 투명 배경 로고 PNG + preview.html (Codex)
```

자연어로도 트리거됩니다 — 예: "제1원칙으로 다시 보자" → `elon-musk`, "이 아이디어 검증해 줘" → `startup-validator`.

## 스킬 카탈로그

용도별 분류입니다.

### 전략 · 검증

| 스킬 | 설명 | 호환 |
|------|------|------|
| `genius-thinking` | 막힌 제품·전략·혁신 문제에 대해 차별화된 아이디어를 발산하고 우선순위화. `.hypercore/genius-thinking/<slug>/`에 단계별 다중 파일로 저장 | All |
| `elon-musk` | 제1원칙 프레임워크로 문제를 hard constraint·복사된 관습·미지수로 분해하고 비범한 옵션을 도출. `.hypercore/elon-musk/<slug>/`에 의사결정 보고서 저장 | All |
| `startup-validator` | 증거 사다리·신뢰도 점수·고객 인터뷰 디스클로저로 스타트업 아이디어를 검증하고 다음 검증 스프린트 제안. `.hypercore/startup-validator/<slug>/` | All |

### 한국형 커머스

| 스킬 | 설명 | 호환 |
|------|------|------|
| `product-detail-maker` | 리서치 기반 한국 상세페이지를 카테고리별 섹션 전략·이미지/컷 기획과 함께 작성. SmartStore·Cafe24·Coupang 스타일·Korean D2C·소셜 커머스 대상. Figma MCP 편집 가능 산출물 우선, HTML은 명시 요청 시 | All |

### 이미지 · 브랜드 (Codex 전용)

| 스킬 | 설명 | 호환 |
|------|------|------|
| `image-maker` | `gpt-image-2`로 제품·마케팅·콘텐츠·UI·리서치 장면용 사실적 raster 이미지 생성/편집. 영문 JSON 프롬프트 검토 → 생성 → 검증 → 아카이브 → `preview.html` 생성 | Codex |
| `logo-maker` | 브랜드/제품/앱/파비콘/소셜 프로필용 로고 raster 자산을 영문 JSON brief 검토를 거쳐 생성·편집. 투명 배경 PNG + `preview.html` + Chrome 미리보기 옵션 | Codex |

총 6개 스킬. 새 스킬은 `skills/<이름>/` 디렉터리를 추가하기만 하면 됩니다 — 자세한 형태는 [스킬 만들기](#스킬-만들기) 참고.

## 시나리오 예시

**1) 막힌 전략 문제를 다른 각도로 보고 싶을 때**

```text
/genius-thinking "초기 SaaS 가격 정책이 시장 대비 너무 비싸 보임"
```

`genius-thinking`이 단계별로 차별화된 아이디어를 발산하고 우선순위를 매겨 `.hypercore/genius-thinking/<slug>/`에 저장합니다. 마음에 드는 분기를 골라 다음 단계로 갈 수 있습니다.

**2) 새 아이디어를 투자 전 검증**

```text
/startup-validator "B2B 회계팀 대상 AI 영수증 자동 분류 SaaS"
```

`startup-validator`가 evidence ladder, 신뢰도 점수, 고객 인터뷰 항목, 다음 1주 검증 스프린트를 정리해 줍니다.

**3) 업계 통념을 의심해야 할 때**

```text
/elon-musk "OTA 업계는 호텔 수수료를 15-20% 받아야 한다"
```

`elon-musk`가 가정·제약·미지수로 분해하고, 복사된 관습을 제거했을 때 가능한 비범한 옵션을 제시합니다.

**4) 한국 커머스 상세페이지 초안**

```text
/product-detail-maker "@입력자료 기반으로 SmartStore용 헤어 에센스 상세페이지"
```

카테고리별 섹션 전략과 이미지/컷 기획을 포함한 Figma MCP-편집 가능 산출물을 만들어 냅니다.

**5) 로고/이미지 자산 (Codex)**

Codex 환경에서:

```text
/logo-maker "Hypercore Business — 미니멀, 다크/라이트 호환, 정사각형"
/image-maker "한국 D2C 화장품 브랜드의 라이프스타일 컷, 자연광"
```

영문 JSON brief 검토 → 생성 → `preview.html` 미리보기 → 아카이브.

## 프로젝트 구조

```text
hypercore-business/
├── .claude-plugin/        # Claude Code 마켓플레이스 매니페스트 (plugin.json, marketplace.json)
├── agents/                # 사용자 정의 에이전트 자리 (현재 비어 있음)
├── instructions/          # 프로젝트 LLM 작업 베이스 (context/harness/sourcing/validation)
├── scripts/               # 보조 스크립트
└── skills/                # 6개 스킬 (각 폴더에 SKILL.md / SKILL.ko.md)
    ├── elon-musk/
    ├── genius-thinking/
    ├── image-maker/
    ├── logo-maker/
    ├── product-detail-maker/
    └── startup-validator/
```

스킬 한 개의 표준 구조:

```text
skills/<name>/
├── SKILL.md               # 영어 정본 — 트리거, 워크플로, 검증
├── SKILL.ko.md            # 한국어 번역
├── rules/                 # 재사용 가능한 정책/체크리스트 (옵션)
├── references/            # 외부 도큐먼트, 스키마, 깊은 디테일 (옵션)
├── scripts/               # 결정적 실행 헬퍼 (옵션)
└── assets/                # 출력 템플릿/리소스 (옵션)
```

## 인스트럭션 베이스

`instructions/` 폴더에는 모든 스킬이 따르는 공통 작업 원칙이 정리되어 있습니다.

| 영역 | 위치 | 목적 |
|---|---|---|
| Context Engineering | [`instructions/context-engineering/`](instructions/context-engineering/) | 프롬프트·컨텍스트·도구 지시를 런타임 중립으로 설계 |
| Harness Engineering | [`instructions/harness-engineering/`](instructions/harness-engineering/) | 프롬프트·에이전트·도구 사용을 테스트 가능한 하네스로 관리 |
| Sourcing | [`instructions/sourcing/`](instructions/sourcing/) | 자료 조사·검색·출처 검증 기준 |
| Validation | [`instructions/validation/`](instructions/validation/) | 작업 완료 전 검증 기준 |

자세한 적용 순서는 [`instructions/README.md`](instructions/README.md).

## 스킬 만들기

자매 프로젝트 [`alpoxdev/hypercore`](https://github.com/alpoxdev/hypercore)의 `skill-maker`와 `autoresearch-skill`을 사용하면 같은 형식의 비즈니스 스킬을 빠르게 추가할 수 있습니다.

1. `skill-maker`로 `skills/<이름>/` 폴더 생성 (SKILL.md + 한국어 번역).
2. `autoresearch-skill`로 baseline-first 반복 최적화.
3. PR로 올리면 자동으로 마켓플레이스 카탈로그에 합류합니다.

영어 정본(`SKILL.md`)과 한국어 번역(`SKILL.ko.md`)을 함께 유지해 주세요.

## 개발

스킬은 모두 마크다운이라 빌드 단계가 없습니다. 다음만 권장합니다:

- 새 스킬을 추가하면 [README의 스킬 카탈로그](#스킬-카탈로그)와 매니페스트(`.claude-plugin/marketplace.json`)의 `tags`/`description`을 동기화.
- `skills/<name>/SKILL.md`를 변경하면 `SKILL.ko.md`도 함께 업데이트.
- 가능한 경우 `skill-tester`(`alpoxdev/hypercore`)로 트리거 검증.

## 기여

PR 환영합니다. 작업 흐름:

1. 이슈를 열거나 기존 이슈에 의도를 적습니다 (한국어/영어 모두 환영).
2. 새 브랜치에서 변경 후 Conventional Commits로 커밋합니다.
3. 스킬 변경은 `SKILL.md`(영어 정본)와 `SKILL.ko.md`(한국어 번역)을 함께 갱신합니다.
4. 큰 구조 변경은 [AGENTS.md](AGENTS.md)의 작업 원칙(작은 변경, 되돌리기 쉬움, 전역 환경 비의존)을 따릅니다.

## 라이선스

[MIT](LICENSE) © alpoxdev. `.claude-plugin/plugin.json`에도 선언되어 있습니다.

## 감사

- [`alpoxdev/hypercore`](https://github.com/alpoxdev/hypercore) — 자매 프로젝트, 코딩/개발 스킬 28개 + 본 저장소 구조의 원본.
- [Vercel Skills](https://github.com/vercel-labs/skills) — 패키지 구조와 `npx skills add` 워크플로의 기반.
- Claude Code · Codex · Cursor · Antigravity 팀의 스킬/플러그인 표면.
- 모든 컨트리뷰터 — 자세한 목록은 [GitHub Contributors](https://github.com/alpoxdev/hypercore-business/graphs/contributors).
