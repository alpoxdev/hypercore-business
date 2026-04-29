# Hypercore Business Agent Skills

Claude Code, Codex, Cursor에서 사용할 수 있는 비즈니스 중심 AI 에이전트 스킬 모음입니다.

이 저장소는 [`alpoxdev/hypercore`](https://github.com/alpoxdev/hypercore)의 구조를 기반으로 하되, 코딩/개발 스킬 대신 사업, 마케팅, 디자인 업무에 맞춘 스킬을 담기 위한 별도 컬렉션입니다.

[Vercel Skills](https://github.com/vercel-labs/skills) 기반 구조를 따릅니다.

## 설치

### Claude Code Marketplace

```bash
/plugin marketplace add https://github.com/alpoxdev/hypercore-business
/plugin install hypercore-business
```

### npx skills add

```bash
npx skills add alpoxdev/hypercore-business --skill '*' -g -y
```

## 에이전트

`agents/` 디렉터리에 에이전트를 정의할 수 있습니다. YAML frontmatter + 프롬프트 본문 형태의 `.md` 파일을 추가하면 플러그인 설치 시 자동으로 등록됩니다.

## 스킬

`skills/` 디렉터리는 의도적으로 비워 두었습니다.

향후 이 저장소에는 코딩/개발 스킬이 아니라 다음 영역의 스킬을 추가합니다.

- 사업 전략 및 검증
- 마케팅, 포지셔닝, 카피라이팅
- 브랜드, 디자인, UX 리서치
- 영업, 운영, 고객 조사
- 문서화, 리포트, 의사결정 지원

## 로컬 구조

원본 저장소 구조를 기반으로 하되, 이 비즈니스용 저장소에서는 `skills/`와 `agents/`를 중심으로 확장합니다. 현재 `skills/`는 의도적으로 비어 있습니다.
