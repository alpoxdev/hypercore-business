# Hypercore Business Agent Skills

> CloakBrowser 기반 MCP 브라우징과 한국형 커머스·이미지·로고 제작을 위한 AI 에이전트 스킬 모음입니다.

Hypercore Business는 Claude Code 플러그인 매니페스트와 `skills/` 폴더를 함께 제공하는 스킬 패키지입니다. 현재 저장소에는 `cloak-browser`, `product-detail-maker`, `image-maker`, `logo-maker` 4개 스킬이 있으며, 각 스킬은 `SKILL.md` 영어 정본과 `SKILL.ko.md` 한국어 번역을 함께 둡니다.

## 핵심 구성

- **4개 스킬**: CloakBrowser + Playwright MCP 설정/운영, 한국형 상세페이지 제작, 래스터 이미지 생성/편집, 투명 PNG 로고 제작.
- **Claude Code 플러그인 지원**: `.claude-plugin/plugin.json`과 `.claude-plugin/marketplace.json`에 `hypercore-business` 플러그인이 선언되어 있습니다.
- **런타임 분리**: CloakBrowser 쿠키·프로필·증거는 기본적으로 `~/.hypercore-business/`에, 이미지·로고 산출물은 `.hypercore/` 아카이브에 저장됩니다.
- **검증 가능한 구조**: 스킬별 `rules/`, `references/`, `scripts/`, `assets/`가 실제 워크플로와 산출물 검증을 뒷받침합니다.
- **한국어 우선 문서**: README와 `.ko.md` 파일은 한국어 사용자가 바로 읽을 수 있도록 유지합니다.

## 설치

### Claude Code 플러그인

Claude Code 안에서 이 저장소를 marketplace로 추가한 뒤 플러그인을 설치합니다.

```bash
/plugin marketplace add https://github.com/alpoxdev/hypercore-business
/plugin install hypercore-business
```

설치 후 호스트가 노출하는 스킬 명령으로 호출합니다.

```text
/cloak-browser "CloakBrowser 설치하고 Playwright MCP에서 쓰게 설정해줘"
/product-detail-maker "스마트스토어용 헤어 에센스 상세페이지를 한국어 카피와 컷 기획까지 만들어줘"
```

### `npx skills add`

`skills` CLI를 사용하는 Codex, Cursor, Antigravity 계열 환경에서는 저장소의 `skills/` 폴더를 가져옵니다.

```bash
npx skills add alpoxdev/hypercore-business --skill '*' -g -y
```

특정 런타임이나 스킬만 설치할 수도 있습니다.

```bash
npx skills add alpoxdev/hypercore-business --skill '*' -a codex -g -y
npx skills add alpoxdev/hypercore-business --skill cloak-browser --skill product-detail-maker -g -y
```

## 빠른 사용 예시

```text
/cloak-browser "CloakBrowser 캐시된 Chromium 경로 찾아서 Codex MCP 설정 만들어줘"
/product-detail-maker "Cafe24용 화장품 상세페이지를 Figma MCP-ready 구조로 만들어줘"
/image-maker "한국 D2C 화장품 브랜드의 자연광 라이프스타일 컷을 AI 티 안 나게 만들어줘"
/logo-maker "새 앱 로고를 투명 배경 PNG로 만들고 preview.html까지 저장해줘"
```

`cloak-browser`는 Node.js, npm/npx, `cloakbrowser`, `playwright-core`, Playwright MCP, MCP-capable client가 필요합니다. `image-maker`와 `logo-maker`는 Codex 이미지 생성/편집 경로와 `gpt-image-2` 사용을 전제로 합니다.

## 스킬 카탈로그

| 스킬 | 용도 | 주요 산출물·상태 | 런타임 요구 |
|---|---|---|---|
| [`cloak-browser`](skills/cloak-browser/SKILL.md) | CloakBrowser를 Playwright MCP 브라우저 실행 경로로 설치·설정·운영하고, 인가된 브라우저 작업을 수행 | `~/.hypercore-business/cookie.yml`, `profiles/`, `downloads/`, `evidence/`, `logs/`, MCP command/config, helper script 출력 | Node.js >= 20, npm/npx, `cloakbrowser`, `playwright-core`, `@playwright/mcp`, MCP-capable client |
| [`product-detail-maker`](skills/product-detail-maker/SKILL.md) | SmartStore, Cafe24, Coupang형 마켓플레이스, 한국 D2C용 상세페이지 전략·카피·컷 기획 | `detail-page-brief.md`, `copydeck.ko.md`, `figma-frame-spec.json`, `image-briefs.json`, `platform-checklist.md` | 한국 시장 리서치, 로컬 파일 작성, Figma MCP 선택, 이미지 생성 시 `image-maker` |
| [`image-maker`](skills/image-maker/SKILL.md) | 제품·마케팅·콘텐츠·UI용 자연스러운 래스터 이미지 생성/편집 | `.hypercore/image-maker/<topic-slug>/prompt.json`, `imageN.*`, `preview.html` | Codex only, `gpt-image-2`, 로컬 아카이브 |
| [`logo-maker`](skills/logo-maker/SKILL.md) | 브랜드·앱·파비콘·소셜 프로필용 투명 배경 PNG 로고 생성/정리 | `.hypercore/logo-maker/<topic-slug>/prompt.json`, `logoN.png`, `preview.html` | Codex only, 투명 PNG 생성/검증, 로컬 아카이브 |

## CloakBrowser 런타임 메모

`cloak-browser`는 자동화 흔적 은폐가 아니라 사용자가 권한을 가진 브라우저 작업을 CloakBrowser-backed MCP 표면으로 수행하기 위한 스킬입니다. CAPTCHA 우회, 계정 대량 생성, 제한 데이터 스크래핑, 금융·정부·의료 인증 자동화 같은 요청은 스킬 범위가 아닙니다.

주요 helper는 다음과 같습니다.

| Helper | 역할 |
|---|---|
| [`skills/cloak-browser/scripts/resolve-cloak-mcp.mjs`](skills/cloak-browser/scripts/resolve-cloak-mcp.mjs) | `~/.cloakbrowser` 아래 Chromium executable 후보를 찾고 Playwright MCP command/config를 출력 |
| [`skills/cloak-browser/scripts/browser-utils.mjs`](skills/cloak-browser/scripts/browser-utils.mjs) | `~/.hypercore-business/` 초기화, `humanize: true` launch wrapper, human-like move/click/type/scroll 유틸 제공 |
| [`skills/cloak-browser/scripts/cookie.mjs`](skills/cloak-browser/scripts/cookie.mjs) | `cookie.yml`, Chrome cookie export JSON, Playwright cookie array를 정규화·검사·redact |
| [`skills/cloak-browser/assets/cookie.yml.example`](skills/cloak-browser/assets/cookie.yml.example) | 사용자 런타임 cookie jar 예시. 실제 쿠키는 저장소에 넣지 않습니다. |

대표 확인 명령:

```bash
node skills/cloak-browser/scripts/resolve-cloak-mcp.mjs --help
node skills/cloak-browser/scripts/browser-utils.mjs init
node skills/cloak-browser/scripts/cookie.mjs --help
```

## 프로젝트 구조

```text
hypercore-business/
├── .claude-plugin/        # Claude Code plugin 및 marketplace manifest
├── instructions/          # 공통 LLM 작업 원칙, 검증, 소싱, 스킬 작성 가이드
├── scripts/               # 저장소 보조 스크립트
└── skills/                # 4개 스킬과 각 스킬의 rules/references/scripts/assets
    ├── cloak-browser/
    ├── image-maker/
    ├── logo-maker/
    └── product-detail-maker/
```

스킬 폴더는 다음 구조를 따릅니다.

```text
skills/<name>/
├── SKILL.md               # 영어 정본
├── SKILL.ko.md            # 한국어 번역
├── rules/                 # 워크플로와 검증 규칙
├── references/            # 재사용 가능한 프레임워크·스키마·배경 자료
├── scripts/               # 결정적 보조 스크립트
└── assets/                # preview template, cookie example, static resource
```

공통 작업 원칙은 [`instructions/README.md`](instructions/README.md)에서 시작합니다. 스킬을 새로 만들거나 리팩터링할 때는 [`instructions/skill/SKILL_AUTHORING.md`](instructions/skill/SKILL_AUTHORING.md)를 먼저 읽습니다.

## 개발과 검증

이 저장소에는 `package.json`이나 lockfile이 없습니다. 스킬 본문은 Markdown이고, 보조 검증은 Node.js/Bash 스크립트로 실행합니다.

| 작업 | 명령 | 근거 파일 |
|---|---|---|
| 새 스킬 골격 생성 | `bash scripts/new-skill.sh market-researcher` | [`scripts/new-skill.sh`](scripts/new-skill.sh) |
| 외부 skills-ref 검증 | `bash scripts/validate-skills.sh` | [`scripts/validate-skills.sh`](scripts/validate-skills.sh) |
| product-detail-maker 구조 검증 | `node skills/product-detail-maker/scripts/validate-product-detail-maker-skill.mjs` | [`skills/product-detail-maker/scripts/validate-product-detail-maker-skill.mjs`](skills/product-detail-maker/scripts/validate-product-detail-maker-skill.mjs) |
| CloakBrowser MCP helper 문법 확인 | `node --check skills/cloak-browser/scripts/resolve-cloak-mcp.mjs` | [`skills/cloak-browser/scripts/resolve-cloak-mcp.mjs`](skills/cloak-browser/scripts/resolve-cloak-mcp.mjs) |
| 이미지 아카이브 helper 문법 확인 | `node --check skills/image-maker/scripts/archive-generated-images.mjs` | [`skills/image-maker/scripts/archive-generated-images.mjs`](skills/image-maker/scripts/archive-generated-images.mjs) |
| 로고 아카이브 helper 문법 확인 | `node --check skills/logo-maker/scripts/archive-logo-assets.mjs` | [`skills/logo-maker/scripts/archive-logo-assets.mjs`](skills/logo-maker/scripts/archive-logo-assets.mjs) |

이미지·로고 스킬의 아카이브 helper는 생성된 파일을 `.hypercore/` 아래로 복사하고 `preview.html`을 만듭니다.

| Helper | 역할 |
|---|---|
| [`skills/image-maker/scripts/archive-generated-images.mjs`](skills/image-maker/scripts/archive-generated-images.mjs) | 검수된 이미지 JSON prompt와 생성 이미지 파일을 `.hypercore/image-maker/<topic-slug>/`로 아카이브 |
| [`skills/logo-maker/scripts/archive-logo-assets.mjs`](skills/logo-maker/scripts/archive-logo-assets.mjs) | 검수된 로고 brief와 최종 투명 PNG 파일을 `.hypercore/logo-maker/<topic-slug>/`로 아카이브 |
| [`skills/logo-maker/scripts/render-simple-logo-rgba.mjs`](skills/logo-maker/scripts/render-simple-logo-rgba.mjs) | native transparent generation 반복 실패 시 단순 geometric mark용 RGBA fallback 렌더링 |

## 스킬 추가 체크리스트

1. `skills/<name>/SKILL.md`와 `skills/<name>/SKILL.ko.md`를 함께 작성합니다.
2. 반복해서 쓰는 워크플로 규칙은 `rules/`, 긴 배경 자료와 스키마는 `references/`에 둡니다.
3. 결정적 파일 처리나 검증이 필요할 때만 `scripts/`를 추가하고, `--help` 또는 usage를 제공합니다.
4. 새 스킬을 공개 카탈로그에 넣을 때는 이 README의 [스킬 카탈로그](#스킬-카탈로그)와 `.claude-plugin/marketplace.json` 설명·태그를 같이 점검합니다.
5. 언어 쌍, support file 링크, helper script 문법이 깨지지 않았는지 검증합니다.

## 라이선스

[MIT](LICENSE) © alpoxdev. 플러그인 매니페스트에도 `MIT`로 선언되어 있습니다.

## 관련 프로젝트

- [`alpoxdev/hypercore`](https://github.com/alpoxdev/hypercore) — 코딩·개발 스킬 중심의 자매 프로젝트.
- [`vercel-labs/skills`](https://github.com/vercel-labs/skills) — `skills/` 패키지 구조와 `npx skills add` 워크플로의 기반.
